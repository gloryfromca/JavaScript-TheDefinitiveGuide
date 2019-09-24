"use strict";

// regular expressions match func
var a = "22";
var a_e = /\d+/;
var aMatchResult = a.match(a_e);
console.assert(aMatchResult[0] === "22");
console.assert(aMatchResult.index === 0);

// greedy match
var b = "1abcc";
var b_e = /[abc]+?/;
var bMatchResult = b.match(b_e);
console.assert(bMatchResult[0] === "a");
console.assert(bMatchResult.index === 1);

// non-greedy match
var c = "aaaab";
var c_e = /a+?b/;
var cMatchResult = c.match(c_e);
console.assert(cMatchResult[0] === "aaaab");
console.assert(cMatchResult.index === 0);

// select |
var d = "java";
var d_e = /java(script)?/;
var dMatchResult = d.match(d_e);
console.assert(dMatchResult[0] === "java");
console.assert(dMatchResult.index === 0);

var e = "javascript";
var e_e = /java(script)?/;
var eMatchResult = e.match(e_e);
console.assert(eMatchResult[0] === "javascript");
console.assert(eMatchResult[1] === "script");
console.assert(eMatchResult.index === 0);

// group ()
var f = "abcdef";
var f_e = /(ab|cd)+ef/;
var fMatchResult = f.match(f_e);
console.assert(fMatchResult[0] === "abcdef");
console.assert(fMatchResult[1] === "cd");
console.assert(fMatchResult.index === 0);

// ref /1
var g = '"12"';
var g_e = /(["'])[^"']*\1/;
var gMatchResult = g.match(g_e);
console.assert(gMatchResult[0] === "\"12\"");
console.assert(gMatchResult[1] === "\"");
console.assert(gMatchResult.index === 0);

var h = '"12\'';
var hMatchResult = h.match(g_e);
console.assert(hMatchResult === null);

// anchor character
var k = 'javaScript';
var k_e = /\B[sS]cript/;
var kMatchResult = k.match(k_e);
console.assert(kMatchResult[0] === "Script");
console.assert(kMatchResult.index === 4);

var l = "Script";
var lMatchResult = l.match(k_e);
console.assert(lMatchResult === null);

var m = 'JavaScript';
var m_e = /Java(?!Script)[A-Z]\w*/;
var mMatchResult = m.match(m_e);
console.assert(mMatchResult === null);

var n = "JavaBeans";
var nMatchResult = n.match(m_e);
console.assert(nMatchResult[0] === "JavaBeans");
console.assert(nMatchResult.index === 0);

// decorator
var o = "Java\nis Fun";
var o_e = /java$/im;
var oMatchResult = o.match(o_e);
console.assert(oMatchResult[0] === "Java");
console.assert(oMatchResult.index === 0);

// `String` function of regular expressions
// search
console.assert("Java".search(/java/i) === 0);

// replace
var p = "'12'";
var p_e = /'(\d+)'/;
console.assert(p.replace(p_e, "\"$1\"") === "\"12\"");

// match
var url = "visit http://baidu.com/search";
var url_e = /(\w+):\/\/([\w.]+)\/(\S*)/;
var urlMatchResult = url.match(url_e);
console.assert(urlMatchResult[0] === "http://baidu.com/search");
console.assert(urlMatchResult[1] === "http");
console.assert(urlMatchResult[2] === "baidu.com");
console.assert(urlMatchResult[3] === "search");
console.assert(urlMatchResult.index === 6);

// split
var split_text = "1, 2, 3, 6";
console.assert(split_text.split(/\s*,\s*/)[3] === "6");

// `RegExp` function of regular expressions
var q = new RegExp("\\\\", "g");
console.assert(q.global);
console.assert(!q.ignoreCase);
console.assert(!q.multiline);

// exec
var r = "\\\\";
var result;
var count = 0;
while ((result = q.exec(r)) != null) {
    console.assert(result[0] === "\\");
    count++;
}
console.assert(count === 2);
console.assert(q.lastIndex === 0);

// test
var s = "al\\";
console.assert(q.test(s));
console.assert(q.lastIndex === 3);
console.assert(!q.test(s));
console.assert(q.lastIndex === 0);
