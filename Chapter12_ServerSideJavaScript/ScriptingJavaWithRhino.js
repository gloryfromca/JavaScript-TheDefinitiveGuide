"use strict";

// import java module
var Lang = Packages.java.lang;

importClass(java.util.HashMap);

importPackage(java.util);

// java io
var f = new java.io.File("/tmp/ScriptingJavaWithRhinoTest");
var out = new java.io.FileWriter(f);
// console not supported
print(f instanceof java.io.File);
print(out instanceof java.io.Closeable);
print(!(f instanceof java.io.Reader));

// java static method
var version = java.lang.System.getProperty("java.version");
// var `version` is a java string, `String` function can get it's javascript string.
print(String(version) === "1.8.0_151");

var isDigit = java.lang.Character.isDigit;
print(isDigit("2"));

out.write("Hello World!\n");
out.close();
print(f.length() === 13);

// java getter setter
print(f.name == "ScriptingJavaWithRhinoTest");
print(f.directory === false);

// for in class' property and method
print("=== java.lang.System ===");
importClass(java.lang.System);
for (var m in System) print(m);
print("=== java.lang.System ===");

// new java array by reflect
var words = java.lang.reflect.Array.newInstance(java.lang.String, 10);
var bytes = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 128);
for (var i = 0; i < bytes.length; i++) bytes[i] = i;
print(bytes[1] === 1);
