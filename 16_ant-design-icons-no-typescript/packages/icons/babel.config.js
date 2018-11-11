module.exports = {
    presets: ['@babel/env',
        [
            "@babel/preset-react",
            {
                useBuiltIns: true,
                pragma: "React.createElement",
            },
        ]
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        '@babel/plugin-syntax-class-properties',
        '@babel/plugin-syntax-object-rest-spread',
        '@babel/plugin-transform-runtime'
    ]
};
