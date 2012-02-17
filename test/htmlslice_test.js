/*global require:true */
var HtmlSlice = require('../lib/htmlslice.js').HtmlSlice;

// Create non-capitalized version so JSHint doesn't complain (justifiably) when
// being used without "new"
var htmlSlice = HtmlSlice;

exports['htmlslice'] = {
  'instanceof': function(test) {
    // "new"
    var h1 = new HtmlSlice('foo');
    test.ok(h1 instanceof HtmlSlice, 'should be an instance.');
    test.ok('html' in h1, 'should have an html property.');
    test.ok('length' in h1, 'should have a length property.');
    test.ok('slice' in h1, 'should have a slice property.');
    test.ok('toString' in h1, 'should have a slice property.');
    // No "new"
    var h2 = htmlSlice('foo');
    test.ok(h2 instanceof HtmlSlice, 'should be an instance.');
    test.ok('html' in h2, 'should have an html property.');
    test.ok('length' in h2, 'should have a length property.');
    test.ok('slice' in h2, 'should have a slice property.');
    test.ok('toString' in h2, 'should have a slice property.');
    test.done();
  },
  'html': function(test) {
    var str = '<a href="#"><i>foo</i> bar</a>';
    var h = htmlSlice(str);
    test.equal(h.html, str, 'should report the correct html.');
    test.done();
  },
  'toString': function(test) {
    var str = '<a href="#"><i>foo</i> bar</a>';
    var h = htmlSlice(str);
    test.equal(h.toString(), str, 'should stringify to the specified html.');
    test.equal(String(h), str, 'should stringify to the specified html.');
    test.done();
  },
  'length': function(test) {
    var h;
    h = htmlSlice('sample foo');
    test.equal(h.length, 10, 'should report the correct length.');
    h = htmlSlice('<a href="#">link</a>foobar');
    test.equal(h.length, 10, 'should report the correct length.');
    h = htmlSlice('foobar<a href="#"><i>link</i></a>');
    test.equal(h.length, 10, 'should report the correct length.');
    h = htmlSlice('sample <a href="#">link <i>test</i></a> foo');
    test.equal(h.length, 20, 'should report the correct length.');
    h = htmlSlice('sample <a href="#">link <br/><i>test</i></a> foo<br/>bar');
    test.equal(h.length, 25, 'should report the correct length.');
    test.done();
  },
  'slice (basic)': function(test) {
    var str = 'abcd';
    var h = htmlSlice(str);
    var i, j;
    test.equal(h.slice(), str.slice(), 'should behave like String#slice.');
    for (i = -5; i <= 5; i++) {
     test.equal(h.slice(i), str.slice(i), 'should behave like String#slice.');
      for (j = -5; j <= 5; j++) {
       test.equal(h.slice(i, j), str.slice(i, j), 'should behave like String#slice.');
      }
    }
    test.done();
  },
  'slice (complex)': function(test) {
    var h;

    h = htmlSlice('<a href="#">test</a>');
    test.equal(h.slice(), h.html, 'should return the full string.');
    test.equal(h.slice(0), h.html, 'should return the full string.');
    test.equal(h.slice(0, h.length), h.html, 'should return the full string.');

    test.equal(h.slice(0, 1), '<a href="#">t</a>', 'should return the proper substring.');
    test.equal(h.slice(0, 4), '<a href="#">test</a>', 'should return the proper substring.');

    h = htmlSlice('<a href="#"><i>foo</i> bar</a>');
    test.equal(h.slice(0, 1), '<a href="#"><i>f</i></a>', 'should return the proper substring.');
    test.equal(h.slice(0, 3), '<a href="#"><i>foo</i></a>', 'should return the proper substring.');
    test.equal(h.slice(0, 4), '<a href="#"><i>foo</i> </a>', 'should return the proper substring.');
    test.equal(h.slice(0, 7), '<a href="#"><i>foo</i> bar</a>', 'should return the proper substring.');
    test.equal(h.slice(1, 3), '<a href="#"><i>oo</i></a>', 'should return the proper substring.');
    test.equal(h.slice(1, 4), '<a href="#"><i>oo</i> </a>', 'should return the proper substring.');
    test.equal(h.slice(1, 7), '<a href="#"><i>oo</i> bar</a>', 'should return the proper substring.');
    test.equal(h.slice(2, 4), '<a href="#"><i>o</i> </a>', 'should return the proper substring.');
    test.equal(h.slice(2, 7), '<a href="#"><i>o</i> bar</a>', 'should return the proper substring.');
    test.equal(h.slice(3, 4), '<a href="#"> </a>', 'should return the proper substring.');
    test.equal(h.slice(3, 7), '<a href="#"> bar</a>', 'should return the proper substring.');

    h = htmlSlice('<a href="#">foo <b>bar</b></a>');
    test.equal(h.slice(0, 1), '<a href="#">f</a>', 'should return the proper substring.');
    test.equal(h.slice(0, 3), '<a href="#">foo</a>', 'should return the proper substring.');
    test.equal(h.slice(0, 4), '<a href="#">foo </a>', 'should return the proper substring.');
    test.equal(h.slice(0, 5), '<a href="#">foo <b>b</b></a>', 'should return the proper substring.');
    test.equal(h.slice(0, 7), '<a href="#">foo <b>bar</b></a>', 'should return the proper substring.');
    test.equal(h.slice(1, 3), '<a href="#">oo</a>', 'should return the proper substring.');
    test.equal(h.slice(1, 4), '<a href="#">oo </a>', 'should return the proper substring.');
    test.equal(h.slice(1, 5), '<a href="#">oo <b>b</b></a>', 'should return the proper substring.');
    test.equal(h.slice(1, 7), '<a href="#">oo <b>bar</b></a>', 'should return the proper substring.');
    test.equal(h.slice(2, 3), '<a href="#">o</a>', 'should return the proper substring.');
    test.equal(h.slice(2, 4), '<a href="#">o </a>', 'should return the proper substring.');
    test.equal(h.slice(2, 5), '<a href="#">o <b>b</b></a>', 'should return the proper substring.');
    test.equal(h.slice(2, 7), '<a href="#">o <b>bar</b></a>', 'should return the proper substring.');
    test.equal(h.slice(3, 4), '<a href="#"> </a>', 'should return the proper substring.');
    test.equal(h.slice(3, 5), '<a href="#"> <b>b</b></a>', 'should return the proper substring.');
    test.equal(h.slice(3, 7), '<a href="#"> <b>bar</b></a>', 'should return the proper substring.');
    test.equal(h.slice(4, 5), '<a href="#"><b>b</b></a>', 'should return the proper substring.');
    test.equal(h.slice(4, 7), '<a href="#"><b>bar</b></a>', 'should return the proper substring.');
    test.equal(h.slice(5, 7), '<a href="#"><b>ar</b></a>', 'should return the proper substring.');
    test.equal(h.slice(6, 7), '<a href="#"><b>r</b></a>', 'should return the proper substring.');

    h = htmlSlice('sample <a href="#">link <br/><i>test</i></a> foo<br/>bar');
    test.equal(h.slice(0, 1), 's', 'should return the proper substring.');
    test.equal(h.slice(0, 7), 'sample ', 'should return the proper substring.');
    test.equal(h.slice(0, 8), 'sample <a href="#">l</a>', 'should be the correct substring.');
    test.equal(h.slice(0, 12), 'sample <a href="#">link </a>', 'should be the correct substring.');
    test.equal(h.slice(0, 13), 'sample <a href="#">link <br/></a>', 'should be the correct substring.');
    test.equal(h.slice(0, 14), 'sample <a href="#">link <br/><i>t</i></a>', 'should be the correct substring.');
    test.equal(h.slice(0, 17), 'sample <a href="#">link <br/><i>test</i></a>', 'should be the correct substring.');
    test.equal(h.slice(0, 18), 'sample <a href="#">link <br/><i>test</i></a> ', 'should be the correct substring.');
    test.equal(h.slice(0, 21), 'sample <a href="#">link <br/><i>test</i></a> foo', 'should be the correct substring.');
    test.equal(h.slice(0, 22), 'sample <a href="#">link <br/><i>test</i></a> foo<br/>', 'should be the correct substring.');
    test.equal(h.slice(0, 23), 'sample <a href="#">link <br/><i>test</i></a> foo<br/>b', 'should be the correct substring.');

    test.equal(h.slice(6, 7), ' ', 'should return the proper substring.');
    test.equal(h.slice(6, 8), ' <a href="#">l</a>', 'should be the correct substring.');
    test.equal(h.slice(6, 12), ' <a href="#">link </a>', 'should be the correct substring.');
    test.equal(h.slice(6, 13), ' <a href="#">link <br/></a>', 'should be the correct substring.');
    test.equal(h.slice(6, 14), ' <a href="#">link <br/><i>t</i></a>', 'should be the correct substring.');
    test.equal(h.slice(6, 17), ' <a href="#">link <br/><i>test</i></a>', 'should be the correct substring.');
    test.equal(h.slice(6, 18), ' <a href="#">link <br/><i>test</i></a> ', 'should be the correct substring.');
    test.equal(h.slice(6, 21), ' <a href="#">link <br/><i>test</i></a> foo', 'should be the correct substring.');
    test.equal(h.slice(6, 22), ' <a href="#">link <br/><i>test</i></a> foo<br/>', 'should be the correct substring.');
    test.equal(h.slice(6, 23), ' <a href="#">link <br/><i>test</i></a> foo<br/>b', 'should be the correct substring.');

    test.equal(h.slice(7, 8), '<a href="#">l</a>', 'should be the correct substring.');
    test.equal(h.slice(7, 12), '<a href="#">link </a>', 'should be the correct substring.');
    test.equal(h.slice(7, 13), '<a href="#">link <br/></a>', 'should be the correct substring.');
    test.equal(h.slice(7, 14), '<a href="#">link <br/><i>t</i></a>', 'should be the correct substring.');
    test.equal(h.slice(7, 17), '<a href="#">link <br/><i>test</i></a>', 'should be the correct substring.');
    test.equal(h.slice(7, 18), '<a href="#">link <br/><i>test</i></a> ', 'should be the correct substring.');
    test.equal(h.slice(7, 21), '<a href="#">link <br/><i>test</i></a> foo', 'should be the correct substring.');
    test.equal(h.slice(7, 22), '<a href="#">link <br/><i>test</i></a> foo<br/>', 'should be the correct substring.');
    test.equal(h.slice(7, 23), '<a href="#">link <br/><i>test</i></a> foo<br/>b', 'should be the correct substring.');

    test.equal(h.slice(8, 12), '<a href="#">ink </a>', 'should be the correct substring.');
    test.equal(h.slice(8, 13), '<a href="#">ink <br/></a>', 'should be the correct substring.');
    test.equal(h.slice(8, 14), '<a href="#">ink <br/><i>t</i></a>', 'should be the correct substring.');
    test.equal(h.slice(8, 17), '<a href="#">ink <br/><i>test</i></a>', 'should be the correct substring.');
    test.equal(h.slice(8, 18), '<a href="#">ink <br/><i>test</i></a> ', 'should be the correct substring.');
    test.equal(h.slice(8, 21), '<a href="#">ink <br/><i>test</i></a> foo', 'should be the correct substring.');
    test.equal(h.slice(8, 22), '<a href="#">ink <br/><i>test</i></a> foo<br/>', 'should be the correct substring.');
    test.equal(h.slice(8, 23), '<a href="#">ink <br/><i>test</i></a> foo<br/>b', 'should be the correct substring.');

    test.equal(h.slice(11, 12), '<a href="#"> </a>', 'should be the correct substring.');
    test.equal(h.slice(11, 13), '<a href="#"> <br/></a>', 'should be the correct substring.');
    test.equal(h.slice(11, 14), '<a href="#"> <br/><i>t</i></a>', 'should be the correct substring.');
    test.equal(h.slice(11, 17), '<a href="#"> <br/><i>test</i></a>', 'should be the correct substring.');
    test.equal(h.slice(11, 18), '<a href="#"> <br/><i>test</i></a> ', 'should be the correct substring.');
    test.equal(h.slice(11, 21), '<a href="#"> <br/><i>test</i></a> foo', 'should be the correct substring.');
    test.equal(h.slice(11, 22), '<a href="#"> <br/><i>test</i></a> foo<br/>', 'should be the correct substring.');
    test.equal(h.slice(11, 23), '<a href="#"> <br/><i>test</i></a> foo<br/>b', 'should be the correct substring.');

    test.equal(h.slice(12, 13), '<a href="#"><br/></a>', 'should be the correct substring.');
    test.equal(h.slice(12, 14), '<a href="#"><br/><i>t</i></a>', 'should be the correct substring.');
    test.equal(h.slice(12, 17), '<a href="#"><br/><i>test</i></a>', 'should be the correct substring.');
    test.equal(h.slice(12, 18), '<a href="#"><br/><i>test</i></a> ', 'should be the correct substring.');
    test.equal(h.slice(12, 21), '<a href="#"><br/><i>test</i></a> foo', 'should be the correct substring.');
    test.equal(h.slice(12, 22), '<a href="#"><br/><i>test</i></a> foo<br/>', 'should be the correct substring.');
    test.equal(h.slice(12, 23), '<a href="#"><br/><i>test</i></a> foo<br/>b', 'should be the correct substring.');

    test.equal(h.slice(13, 14), '<a href="#"><i>t</i></a>', 'should be the correct substring.');
    test.equal(h.slice(13, 17), '<a href="#"><i>test</i></a>', 'should be the correct substring.');
    test.equal(h.slice(13, 18), '<a href="#"><i>test</i></a> ', 'should be the correct substring.');
    test.equal(h.slice(13, 21), '<a href="#"><i>test</i></a> foo', 'should be the correct substring.');
    test.equal(h.slice(13, 22), '<a href="#"><i>test</i></a> foo<br/>', 'should be the correct substring.');
    test.equal(h.slice(13, 23), '<a href="#"><i>test</i></a> foo<br/>b', 'should be the correct substring.');

    test.equal(h.slice(16, 17), '<a href="#"><i>t</i></a>', 'should be the correct substring.');
    test.equal(h.slice(16, 18), '<a href="#"><i>t</i></a> ', 'should be the correct substring.');
    test.equal(h.slice(16, 21), '<a href="#"><i>t</i></a> foo', 'should be the correct substring.');
    test.equal(h.slice(16, 22), '<a href="#"><i>t</i></a> foo<br/>', 'should be the correct substring.');
    test.equal(h.slice(16, 23), '<a href="#"><i>t</i></a> foo<br/>b', 'should be the correct substring.');

    test.equal(h.slice(17, 18), ' ', 'should be the correct substring.');
    test.equal(h.slice(17, 21), ' foo', 'should be the correct substring.');
    test.equal(h.slice(17, 22), ' foo<br/>', 'should be the correct substring.');
    test.equal(h.slice(17, 23), ' foo<br/>b', 'should be the correct substring.');

    test.equal(h.slice(20, 22), 'o<br/>', 'should be the correct substring.');
    test.equal(h.slice(20, 23), 'o<br/>b', 'should be the correct substring.');

    test.equal(h.slice(21, 22), '<br/>', 'should be the correct substring.');
    test.equal(h.slice(21, 23), '<br/>b', 'should be the correct substring.');

    test.equal(h.slice(22, 23), 'b', 'should be the correct substring.');

    test.done();
  }
};
