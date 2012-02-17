/*
 * htmlslice
 * https://github.com/cowboy/htmlslice
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

(function(exports) {

  // Match a tag or character in such a way that open tags, close tags, self-
  // closing tags or characters can be differentiated from one another.
  var matchComplex = /<(\/)?([^ \/>]*).*?(\/)?>|[\s\S]/;

  // Match a tag in such a way that self-closing tags can be differentiated from
  // open or close tags.
  var matchSimple = /<.*?(\/)?>/g;

  // Get the number of "characters" (including self-closing tags) in an HTML
  // string.
  function getLength(html) {
    return (html || '').replace(matchSimple, function(_, selfClosing) {
      // Self-closing tags should count as characters, but open and close tags
      // should not.
      return selfClosing ? ' ' : '';
    }).length;
  }

  // Constructor function.
  function HtmlSlice(html) {
    if (!(this instanceof HtmlSlice)) {
      return new HtmlSlice(html);
    }
    this.html = html;
    this.length = getLength(html);
  }

  // Expose the constructor function.
  exports.HtmlSlice = HtmlSlice;

  // General utility.
  HtmlSlice.prototype.toString = function() {
    return this.html;
  };

  // The HTML-aware slice function.
  HtmlSlice.prototype.slice = function(begin, end) {
    // Normalize begin to behave like String#slice.
    if (begin == null) {
      begin = 0;
    } else if (begin < 0) {
      begin += this.length;
    }
    begin = Math.min(Math.max(begin, 0), this.length);

    // Normalize end to behave like String#slice.
    if (end == null) {
      end = this.length;
    } else if (end < 0) {
      end += this.length;
    }
    end = Math.min(Math.max(end, 0), this.length);

    // Keep track of opening tags.
    var opentags = [];
    // And closing tags.
    var closetags = [];
    // The current actual character position.
    var pos = 0;
    // The current html-aware character position.
    var hpos = 0;
    // The current result string (sans any remaining closing tags).
    var result = '';
    // Matches!
    var matches;

    while (hpos < end && (matches = this.html.slice(pos).match(matchComplex))) {
      // Update the actual position.
      pos += matches[0].length;

      if (matches[1]) {
        // Close tag.
        if (hpos <= begin) { opentags.pop(); }
        closetags.shift();
      } else if (matches[2] && !matches[3]) {
        // Open tag.
        if (hpos <= begin) { opentags.push(matches[0]); }
        closetags.unshift('</' + matches[2] + '>');
      } else {
        // Character or self-closing tag.
        if (hpos++ === begin) {
          result += opentags.join('');
        }
      }
      // Add matched tag or character to result if begun.
      if (hpos > begin) {
        result += matches[0];
      }
    }
    return result + closetags.join('');
  };

}(typeof exports === 'object' && exports || this));
