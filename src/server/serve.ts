const HTTP = require('http');
const Path = require('path');
const Chalk = require('chalk');
const Express = require('express');
const HistoryFallback = require('connect-history-api-fallback');


// unhandled errors should crash the process
process.on('unhandledRejection', error => {
  /* eslint-disable no-console */
  console.error(error);
  console.error(JSON.stringify(error, null, 2));
  if (error) {
    console.error(error.toString());
    /* eslint-enable no-console */
    throw error;
  }
});

const expressApp = Express();
expressApp.use(Express.json());

if (process.env.NODE_ENV === 'development') {
  expressApp.use(HistoryFallback());
} else {
  expressApp.use(Express.static(Path.join(__dirname, '..', '..', 'build')));1  
}



const httpServer = HTTP.createServer(expressApp);


const port = process.env.PORT;
httpServer.listen(port, err => {
  if (err) {
    console.log(Chalk.red(err));// eslint-disable-line no-console
    return;
  }
  console.log(Chalk.cyan(`Listening for connections on port ${port}`));// eslint-disable-line no-console
});
