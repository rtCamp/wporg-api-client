module.exports = {
    printWidth: 100,
    bracketSpacing: true,
    singleQuote: true,
    trailingComma: 'all',
    parenSpacing: true,
    arrowParens: 'always',
    tabWidth: 4,
    semi: true,
    overrides: [
        {
            files: ['*.yml', '*.yaml'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
