# typescript-webpack-express-mongodb-gulp
Example putting TypeScript, MongoDB, Express, WebPack, Pug, Gulp all together in a Node.JS app

# Install dependencies
Run `npm install` in project folder

## Development server
Run `npm run start` for a dev server. Navigate to `http://localhost:{ServerConfig->Port}/`. The app will automatically reload if you change any of the source files.

## Build
Run `gulp build-serve` to build the project. The build artifacts will be stored in the `dist/*` directory.

## Running unit tests
Run `gulp test` to execute the unit tests via Mocha.
