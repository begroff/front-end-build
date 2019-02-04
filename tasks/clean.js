var fs = require('fs');
var del = require('del');

module.exports = function(config) {

    console.time("Cleaning dist directory finished");

    var directoryExists = fs.existsSync(config.distDir);
    if (directoryExists) {
        del.sync(
            config.styles.clean.dist,
            { force: true }
        );

        console.timeEnd("Cleaning dist directory finished");
    }
    else {
        console.log("Unable to clean, dist directory does not exist!");
    }

}