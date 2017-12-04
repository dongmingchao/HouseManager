module.exports = {
    "env": {
        "node":true,
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars":[
            1,
            {
                 "vars": "all",
                 "args": "none"
            }
        ],
        "no-console":[0]
    }
};