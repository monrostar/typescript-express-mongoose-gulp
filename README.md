# typescript-express-mongodb-gulp
Example putting TypeScript, MongoDB, Mongoose, Express, Pug, Gulp all together in a Node.JS app

# Install dependencies
Run `npm install` in project folder

## NODE_ENV configs
Run for lin `export NODE_ENV=development` To use the environment or: "production", "test".
Run for win `set NODE_ENV=development` To use the environment or: "production", "test".

## Development server
Run `npm run start` for a dev server. Navigate to `http://localhost:{ServerConfig->Port}/`. The app will automatically reload if you change any of the source files.

## Build
Run `gulp build-serve` to build the project. The build artifacts will be stored in the `dist/*` directory.

## Running unit tests
Run `gulp test` to execute the unit tests via Mocha.
