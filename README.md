# Node - Webpack - Hot Module Replacement - TypeScript

This is a _very_ simple template to provide the minimal infrastructure for use with any of today's Node/JavaScript-based web frameworks.
It's intended to be useful for beginners and experts alike.

## Features

- Add any front-end framework you want, the template includes nothing
- Build & run configuration included for Visual Studio Code
- JS bundles are assembled by Webpack
- Hot module replacement enabled for both server-side and client-side JS bundles
- TypeScript-enabled
- Modern browsers receive ES2019 code, legacy ones receive ES5, meaning Internet Explorer 11 can work
- Production builds use Node's cluster API for higher concurrency and resilience to faults.

## Getting Started

A recent version of Node is required.
Visual Studio Code is not required, but everything is pre-configured for it.

1. Clone this repository
1. From the repo root, run `npm install`
1. Use Visual Studio Code to "Open Folder" on the repo root
1. Run the project via Debug -> Start Debugging (or Start Without Debugging)
1. Access the running site at http://localhost:3000/

Note: Running without debugging will improve the performance of Node but will disable IDE-integrated debugging of the server code.

## Structure

Source code is in the /src folder.

- During development, edits to files referenced via entry/client.ts and entry/server.ts are "hot"--the client JS is reloaded and it is re-run in-place without refreshing the page.  Server edits are apparent on the next HTTP request.
- package.json is the NPM package list.  The included items are the bare minimum.
- start.js is the Node entry point for development.  It creates two webpack middleware instances--one for the client bundle, and one for the server bundle--and runs them simultaneously.
- productionStart.ts is the entry point for production builds.
- webpack.config.js is the script file that configures webpack.

## Extending

As with any Node-based project, edit package.json to add new dependencies.
Webpack and TypeScript support ES6-style `import` statements, allowing you to access the contents of any package using standard syntax.

The included configuration supports JavaScript (.js), TypeScript (.ts) and TypeScript with React JSX (.tsx) source files.
.js files are processed directly by Webpack, with minimal transpilation support.
To use newer JS syntax in a way compatible with older browsers, you'll need to use TypeScript's "allowJs" feature or integrate Babel.
.ts/.tsx files are processed by TypeScript and initially configured to produce Internet Explorer 11-compatible "ES5" output syntax.

To support additional file formats, they'll need to be configured in webpack.config.js, which will likely require adding new loaders to the package.json.

## Contributing

This project is not ambitious, it aims to provide a solid starting point and nothing more.
