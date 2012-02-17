# htmlslice

An HTML-aware String#slice.

## Getting Started
### On the server
Install the module with: `npm install htmlslice`

```javascript
var HtmlSlice = require('htmlslice').HtmlSlice;

var h = new HtmlSlice('sample <a href="#">link <br/><i>test</i></a> foo<br/>bar');
h.length        // 25
h.slice(0, 13)  // 'sample <a href="#">link <br/></a>'
h.slice(8, 14)  // '<a href="#">ink <br/><i>t</i></a>'
h.slice(12, 22) // '<a href="#"><br/><i>test</i></a> foo<br/>'
h.slice(16, 23) // '<a href="#"><i>t</i></a> foo<br/>b'
```

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/cowboy/javascript-htmlslice/master/dist/htmlslice.min.js
[max]: https://raw.github.com/cowboy/javascript-htmlslice/master/dist/htmlslice.js

In your web page:

```html
<script src="dist/htmlslice.min.js"></script>
<script>
var h = new HtmlSlice('sample <a href="#">link <br/><i>test</i></a> foo<br/>bar');
h.length        // 25
h.slice(0, 13)  // 'sample <a href="#">link <br/></a>'
h.slice(8, 14)  // '<a href="#">ink <br/><i>t</i></a>'
h.slice(12, 22) // '<a href="#"><br/><i>test</i></a> foo<br/>'
h.slice(16, 23) // '<a href="#"><i>t</i></a> foo<br/>b'
</script>
```

In your code, you can attach htmlslice's methods to any object.

```html
<script>
this.exports = Bocoup.utils;
</script>
<script src="dist/htmlslice.min.js"></script>
<script>
var h = new Bocoup.utils.HtmlSlice('sample <a href="#">link <br/><i>test</i></a> foo<br/>bar');
h.length        // 25
h.slice(0, 13)  // 'sample <a href="#">link <br/></a>'
h.slice(8, 14)  // '<a href="#">ink <br/><i>t</i></a>'
h.slice(12, 22) // '<a href="#"><br/><i>test</i></a> foo<br/>'
h.slice(16, 23) // '<a href="#"><i>t</i></a> foo<br/>b'
</script>
```

## Documentation
Create a `new HtmlSlice(htmlString)` object. Use its `.length` property and `.slice(begin [, end])` method.

## Examples
You can take a look at the [unit tests](https://github.com/cowboy/javascript-htmlslice/blob/master/test/htmlslice_test.js), or this [animated jQuery example](http://jsfiddle.net/cowboy/2SCRK/).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "lib" subdirectory!_

## Release History

* 0.1.1 - 2012/02/17 - Fixing minor issue with \n characters.
* 0.1.0 - 2012/02/17 - Initial Release

## License
Copyright (c) 2012 "Cowboy" Ben Alman  
Licensed under the MIT license.
