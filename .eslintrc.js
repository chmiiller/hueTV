module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 4],
        'react/jsx-props-no-spreading': [0],
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        indent: ['warn', 4],
        'linebreak-style': [
            'warn',
            'unix',
        ],
        semi: [
            'warn',
            'always',
        ],
        'no-unused-vars': [
            'warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
        ],
    }
};
