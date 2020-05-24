// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// A lot of ESLint rules are disabled due to type information limitations in 3rd party libraries or for Node compatibility.
const timerName = "Startup";
console.time(timerName);
console.log("Starting...");

const webpackConfig = require("../webpack.config");
const modernConfig = webpackConfig[0];
const legacyConfig = webpackConfig[1];
const serverConfig = webpackConfig[2];
const webpack = require("webpack");
const modernCompiler = webpack(modernConfig);
const legacyCompiler = webpack(legacyConfig);
const serverCompiler = webpack(serverConfig);

/** @type { import('webpack').Options.Stats} */
const stats = {
  builtAt: false,
  colors: true,
  hash: false,
  modules: false,
  performance: false,
  entrypoints: false,
  timings: false,
  version: false,
};

const webpackDevMiddleware = require("webpack-dev-middleware");

const modernWebpackDevMiddleware = webpackDevMiddleware(modernCompiler, {
  stats,
  publicPath: "/",
});

const legacyWebpackDevMiddleware = webpackDevMiddleware(legacyCompiler, {
  stats,
  publicPath: "/",
});

const serverWebpackDevMiddleware = webpackDevMiddleware(serverCompiler, {
  publicPath: "/", // Not actually needed but the current version of the types require it.
  stats,
  serverSideRender: true,
});

const app = require("express")().disable("etag").disable("x-powered-by");

const webpackHotMiddleware = require("webpack-hot-middleware");

app
  .use(modernWebpackDevMiddleware)
  .use(legacyWebpackDevMiddleware)
  .use(serverWebpackDevMiddleware)
  .use(webpackHotMiddleware(modernCompiler))
  .use(webpackHotMiddleware(legacyCompiler))
  .use(webpackHotMiddleware(serverCompiler));
let serverHash = "";

/** @type {(req: import("express").Request, res: import("express").Response) => (Promise<void> | void)} */
let server = null;

const domain = require("domain");
const runtimeModule = require("module");

app.use(async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (serverHash !== res.locals.webpackStats.hash) {
    // @ts-expect-error: At the time of writing, `runtimeModule` incorrectly required the "id" parameter.
    const memoryServer = new runtimeModule();
    // @ts-expect-error: At the time of writing, the `_compile` wasn't included in the definition.
    memoryServer._compile(res.locals.fs.readFileSync(`${res.locals.webpackStats.toJson().outputPath}/server.js`, "utf8"), "");
    server = memoryServer.exports.default;
    serverHash = res.locals.webpackStats.hash;
  }

  const d = domain.create();
  d.enter();
  try {
    try {
      return await server(req, res);
    } catch (reason) {
      console.warn(reason);
      res.status(500).send(reason);
    }
  } catch (e) {
    console.warn(e);
    res.status(500).contentType("text/plain").send("An error occurred while processing this request.");
  }
});

modernWebpackDevMiddleware.waitUntilValid(() =>
  legacyWebpackDevMiddleware.waitUntilValid(() =>
    serverWebpackDevMiddleware.waitUntilValid(() => {
      const port = 3000;
      app.listen(port, () => {
        console.log(`Startup complete, listening on port ${port}.`);
        console.timeEnd(timerName);
      });
    })
  ));
