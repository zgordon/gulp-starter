An example Gulp setup taken from the [JavaScript for WordPress Master Course](https://javascriptforwp.com) unit on Gulp as a JavaScript development tool.

## Getting Started
To get started, simply clone this project and run

```
npm install
```

This will pull down all of the project dependencies.

Also, make sure you have gulp installed globally as well.  This will let you run gulp commands in the command line.

```
npm i -g gulp
```

Once this is done you can kick of the server and watch commands with the following in the command line.

```
npm start
```

Likewise you can also call "gulp" directly to kick off the same default task that npm start does.

## Packages Included

This starter file includes the following Gulp plugins:

- https://www.npmjs.com/package/gulp-connect
- https://www.npmjs.com/package/gulp-plumber
- https://www.npmjs.com/package/gulp-concat
- https://www.npmjs.com/package/gulp-uglify
- https://www.npmjs.com/package/gulp-eslint
- https://www.npmjs.com/package/gulp-rename
- https://www.npmjs.com/package/gulp-sourcemaps
- https://www.npmjs.com/package/gulp-sass
- https://www.npmjs.com/package/gulp-load-plugins

## Example Project - VanillaPress

There is an example file used in the project called VanillaPress ([find out more about VanillaPress](http://zgordon.github.io/vanillapress/)).  This is used simply to demonstrate the different plugins in use with a real project.

## Applying to Your Projects

For your project's specific purpose you may want to or need to update the path object at the top of the gulpfile.js.

This path object should have correct links for your project HTML, SASS, and JS.
