const timerName = 'Startup';
console.time(timerName);
console.log('Starting...');

const webpackConfig = require('./webpack.config');
const clientConfig = webpackConfig[0];
const serverConfig = webpackConfig[1];
const clientCompiler = require('webpack')(clientConfig);
const serverCompiler = require('webpack')(serverConfig);

const stats = {
    builtAt: false,
    colors: true,
    hash: false,
    modules: false,
    performance: false,
    entrypoints: false
};

const clientWebpackDevMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    stats,
    publicPath: '/',
});

const serverWebpackDevMiddleware = require('webpack-dev-middleware')(serverCompiler, {
    stats,
    serverSideRender: true,
});

const express = require('express');
const app = express();
app.disable('etag');
app.disable('x-powered-by');

app.use(clientWebpackDevMiddleware);
app.use(serverWebpackDevMiddleware);

app.use(require('webpack-hot-middleware')(clientCompiler));
app.use(require('webpack-hot-middleware')(serverCompiler));

let serverHash = "";
let server = null;

const domain = require('domain');
const runtimeModule = require('module');

app.use((req, res) => {
    if (serverHash !== res.locals.webpackStats.hash) {
        const memoryServer = new runtimeModule();
        memoryServer._compile(res.locals.fs.readFileSync(res.locals.webpackStats.toJson().outputPath + '/server.js', 'utf8'), '');
        server = memoryServer.exports.default;
        serverHash = res.locals.webpackStats.hash;
    }

    const d = domain.create();
    d.enter();
    try
    {
        return server(req, res);
    }
    catch (e)
    {
        console.error(`Unhandled exception: ${e}`);
        res.status(500).send('{}');
    }
});

const originalEmitWarning = process.emitWarning;
process.emitWarning = function(warning, type, code, ctor, now) {
    if (code === 'DEP0097') {
        return;
    }

    originalEmitWarning(warning, type, code, ctor, now);
}

clientWebpackDevMiddleware.waitUntilValid(() =>
    serverWebpackDevMiddleware.waitUntilValid(() => {
        const port = 3000;
        app.listen(port, () =>{
            console.log(`Startup complete, listening on port ${port}.`);
            console.timeEnd(timerName);
        });
    })
);
