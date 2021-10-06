module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 4],
        'react/jsx-props-no-spreading': [0],
        indent: ['warn', 4],
        'linebreak-style': [
            'warn',
            'unix',
        ],
        quotes: [
            'warn',
            'single',
            {
                allowTemplateLiterals: true,
            },
        ],
        semi: [
            'warn',
            'always',
        ],
        'no-unused-vars': [
            'warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
        ],
        'react/prop-types': 'off',
    },
};
