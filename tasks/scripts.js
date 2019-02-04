var CLIEngine = require('eslint').CLIEngine;

module.exports = function(config) {
    console.time("Linting JavaScript finished");

    var cli = new CLIEngine({
        configFile: config.scripts.eslint.configFile,
        fix: true
    });

    var report = cli.executeOnFiles([config.assetDirs.js]);
    var formatter = cli.getFormatter("stylish");

    console.timeEnd("Linting JavaScript finished");
    console.log(formatter(report.results));
};

