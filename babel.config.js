module.exports = function (api) {

    api.cache(true);

    const presets = [
        ["@vue/babel-preset-jsx"],
        ["@babel/preset-env", {

            "useBuiltIns": "usage",
            "corejs": 3,

            "targets": {
                "edge": "17",
                "firefox": "60",
                "chrome": "67",
                "safari": "11.1",
                "ie": "11"
            }

        }]
    ];
    const plugins = [
        "@babel/plugin-transform-classes",
        "@babel/plugin-transform-runtime" ,
        "@babel/plugin-transform-shorthand-properties",
        "@babel/plugin-transform-destructuring",
        "@babel/plugin-transform-template-literals",
        "@babel/plugin-proposal-class-properties" 
       

    ];

    return {

        presets,

        plugins

    };

};
