module.exports = function (moduleRoot) {

    var moduleSettings = {
        isTheme: true
    };

    var assetsDir = moduleRoot + "assets/";
    var distDir = assetsDir + "dist/"
    var configDir = moduleRoot + "config/";

    var assetDirs = {
        images: assetsDir + "images/",
        js: assetsDir + "js/",
        languages: assetsDir + "languages/",
        sass: assetsDir + "sass/",
        tasks: assetsDir + "tasks/"
    }

    var distDirs = {
        root: moduleRoot,
        css: distDir + "css/",
        themeCss: moduleSettings.isTheme ? moduleRoot : distDir + "css/",
        scripts: distDir + "js/"
    }

    var paths = {
        scss: assetDirs.sass + "**/*.scss",
        js: assetDirs.js + "**/*.js"
    }

    var stylesSettings = {
        sassCompile: {
            file: assetDirs.sass + "style.scss",
            outputStyle: "expanded",
            sourceMap: true,
            outFile: distDirs.css + "style.css",
            mapFile: distDirs.css + "style.css.map"
        },
        postCss: {
            cssFile: distDirs.css + "style.css",
            cssFileMin: distDirs.css + "style.css.min"
        },
        clean: {
            dist: [
                distDirs.css + "*",
                distDirs.css + "style.css",
                distDirs.css + "style.css.min"
            ]
        },
        stylelint: {
            configFile: configDir + "stylelintrc.json"
        }
    }

    var scriptsSettings = {
        eslint: {
            configFile: configDir + ".eslintrc.js"
        }
    }

    return {
        module: moduleSettings,
        assetsDir: assetsDir,
        assetDirs: assetDirs,
        distDir: distDir,
        distDirs: distDirs,
        configDir: configDir,
        styles: stylesSettings,
        scripts: scriptsSettings,
        paths: paths,
    }
};