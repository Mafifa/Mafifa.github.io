module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["plugin:astro/recommended", "standard-with-typescript"],
    "overrides": [
        {
            "parser": "astro-eslint-parser",
            "env": {
                "node": true
            },
            "files": [
                "*.astro"
            ],
            "parserOptions": {
                "parser": "@typescript-eslint/parser",
                "extraFileExtensions": [".astro"],
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
