module.exports = {

    "coverageDirectory": "coverage",

   "coveragePathIgnorePatterns": [
     "/node_modules/"
   ],
   "moduleFileExtensions": [
    "js",
    "ts"
  ],
  "rootDir": "./tests",
  "testEnvironment": "node",
  "transform": {
    "\\.ts$": "ts-jest"
  }

}