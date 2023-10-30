const path = require('path');


const rootDirectory = path.resolve(__dirname, '..', '..');
const appDirectory = path.resolve(__dirname, '..', '..', 'src');
const resolveRoot = relativePath => path.resolve(rootDirectory, relativePath);
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


module.exports = {
  appSrc: resolveApp(''),
  appBuild: resolveRoot('build'),
  //appFavicon: resolveApp('client-src/public/favicon.ico'),
  appEntry: resolveApp('index.tsx'),
  appHtml: resolveApp('index.html'),
  appManifest: resolveRoot('manifest'),
  appNodeModules: resolveApp('node_modules'),
  appPackageJson: resolveApp('package.json'),
};