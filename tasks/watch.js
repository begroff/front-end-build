var chokidar = require('chokidar');

module.exports = function(config) {
    var clean = require(config.assetDirs.tasks + 'clean');
    var styles = require(config.assetDirs.tasks + 'styles');
    var scripts = require(config.assetDirs.tasks + 'scripts');

    var watchOptions = {
        persistent: true
    };

    var watcher = chokidar.watch(
        [
            config.paths.scss,
            config.paths.js
        ],
        watchOptions
    );

    watcher.on('change', () => {
        clean(config);
        styles(config);
        scripts(config);
    });
};
