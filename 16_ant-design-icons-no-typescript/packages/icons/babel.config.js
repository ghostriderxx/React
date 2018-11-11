module.exports = {
    presets: ['@babel/env', '@babel/react'],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-syntax-class-properties',
        '@babel/plugin-syntax-object-rest-spread',
        '@babel/plugin-transform-runtime'
    ]
};
