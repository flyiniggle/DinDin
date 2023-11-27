const path = require('path');


const rootDirectory = path.resolve(__dirname, '..', '..');
const appDirectory = path.resolve(__dirname, '..', '..', 'src', 'app');
const serverDirectory = path.resolve(__dirname, '..', '..', 'src', 'server');
const resolveRoot = relativePath => path.join(rootDirectory, relativePath);
const resolveApp = relativePath => path.join(appDirectory, relativePath);
const resolveServer = relativePath => path.join(serverDirectory, relativePath);


module.exports = {
  appSrc: resolveApp(''),
  //appFavicon: resolveApp('client-src/public/favicon.ico'),
  appEntry: resolveApp('index.tsx'),
  appHtml: resolveApp('index.html'),
  appManifest: resolveRoot('manifest'),
  build: resolveRoot('build'),
  nodeModules: resolveRoot('node_modules'),
  packageJson: resolveRoot('package.json'),
  secrets: resolveRoot('dev-secrets'),
  server: resolveServer(''),
};
