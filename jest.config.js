module.exports = {

    "coverageDirectory": "coverage",

   "coveragePathIgnorePatterns": [
     "/node_modules/"
   ],
   "unmockedModulePathPatterns":["jasmine-expect"],
   "moduleFileExtensions": [
    "js",
    "ts"
  ],
  "rootDir": "./tests",
  "testEnvironment": "node",
  "transform": {
    
    '\\.js$': 'babel-jest',
    "\\.tsx?$": "ts-jest"
    
  }

}