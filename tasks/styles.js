var fs = require('fs');
var sass = require('node-sass');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var stylelint = require('stylelint');

module.exports = function(config) {

    var result = sass.renderSync({
        file: config.styles.sassCompile.file,
        outputStyle: config.styles.sassCompile.outputStyle,
        sourceMap: config.styles.sassCompile.sourceMap,
        outFile: config.styles.sassCompile.outFile,
    });

    try {
        console.time("Compiling Sass finished");

        fs.writeFileSync(
            config.styles.sassCompile.outFile,
            result.css
        );

        fs.writeFileSync(
            config.styles.sassCompile.mapFile,
            result.map
        );

        console.timeEnd("Compiling Sass finished");

        autoprefix(result.css, config);
    }
    catch (error) {
        throw new Error("Compiling Sass failed! " + error.message);
    }
}

function autoprefix (css, config) {
    console.time("Autoprefixing CSS finished");

    postcss([autoprefixer({})])
    .process(css, { from: config.styles.postCss.cssFile, to: config.styles.postCss.cssFile })
    .then(
        result => {
            var warnings = result.warnings();
            warnings.forEach(function(warning) {
                console.warn(warning.toString());
            })

            fs.writeFileSync(
                config.styles.postCss.cssFile,
                result.css
            );

            fs.copyFileSync(
                config.styles.postCss.cssFile,
                config.distDirs.themeCss + "style.css"
            );

            console.timeEnd("Autoprefixing CSS finished");

            minify(result.css, config);
        },

        error => {
            throw new Error("Autoprefixing CSS failed! There was an error writing CSS to " + config.styles.postCss.cssFile + " or copying CSS file to " + config.distDirs.themeCss + error.message + ".");
        }
    )
    .catch(
        error => {
            console.log(error);
        }
    )
}

function minify(css, config) {
    console.time("Minifying CSS finished");

    postcss([cssnano({})])
    .process(css, { from: config.styles.postCss.cssFile , to: config.styles.postCss.cssFileMin })
    .then(
        result => {
            fs.writeFileSync(
                config.styles.postCss.cssFileMin,
                result.css
            );

            fs.copyFileSync(
                config.styles.postCss.cssFileMin,
                config.distDirs.themeCss + "style.css.min"
            );

            console.timeEnd("Minifying CSS finished");

            lint(config);
        },

        error => {
            throw new Error("Minifying CSS failed! There was an error writing minified CSS to " + config.styles.postCss.cssFileMin + " or copying minified CSS file to " + config.distDirs.themeCss + error.message + ".");
        }
    )
    .catch (
        error => {
            console.log(error);
        }
    )
}

function lint(config) {
    console.time("Linting CSS finished");

    stylelint.lint({
        configFile: config.styles.stylelint.configFile,
        files: config.paths.scss,
        formatter: "string",
        maxWarnings: 0,
        ignorePath: config.styles.stylelint.configFile
    })
    .then(
        data => {
            console.timeEnd("Linting CSS finished");
            console.log(data.output);

            if (data.maxWarningsExceeded !== undefined) {
                if (data.maxWarningsExceeded.foundWarnings > 0) {
                    throw new Error("Warning! Broken stylelint rule(s) detected. Fix the listed issues in order for sass to be properly compiled.");
                }
            }
        },

        error => {
            throw new Error("Stylelint error! " + error.message);
        }
    )
    .catch(
        error => {
            console.log(error);
        }
    )
}