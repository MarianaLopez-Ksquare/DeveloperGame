"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
/**
 * npm install sequelize pg pg-hstore;
Hay dos maneras de conectarse a una db,

**Primera manera un URI
URI: postgres://test1:raspberry@localhost:5432/testdb1;
     postgres://user:password@server:port/database;
*/
const dotenv = require("dotenv");
dotenv.config();
//ES5 import;
const sequelize_1 = require("sequelize");
const firebase_1 = require("../firebase");
const Admins_model_1 = require("../models/Admins.model");
const Categories_model_1 = require("../models/Categories.model");
const Histories_model_1 = require("../models/Histories.model");
const Levels_model_1 = require("../models/Levels.model");
const Players_model_1 = require("../models/Players.model");
const Questions_model_1 = require("../models/Questions.model");
//ES6
// import { Sequelize } from 'sequelize';
/**
 * First method URI
 */
//const uriConnection = "postgres://test1:raspberry@localhost:5432/test1db"
//const sequelize = new Sequelize(uriConnection,{dialect: "postgres"});
/**
 * Second method with constructor
 */
const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const HOST = process.env.HOST;
const DB_PORT = process.env.DB_PORT;
const DIALECT = process.env.DIALECT;
class Sequelize extends sequelize_1.Sequelize {
    constructor(DB_NAME, DB_USER, DB_PASS, DB_OPTIONS) {
        super(DB_NAME, DB_USER, DB_PASS, DB_OPTIONS);
    }
    seedData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Admins_model_1.Admins.create({
                    name: "admin",
                    uid: "MTMo29yzYfhWSgGb0IS2POmxocv1",
                });
                // Levels //
                yield Levels_model_1.Levels.create({
                    name: "Easy"
                });
                yield Levels_model_1.Levels.create({
                    name: "Intermidiate"
                });
                yield Levels_model_1.Levels.create({
                    name: "Hard"
                });
                // Categories // 111
                yield Categories_model_1.Categories.create({
                    name: "Variables and Collections",
                    description: "In this section you will put in practice questions like let, var, const and basic object on Javascript."
                });
                yield Categories_model_1.Categories.create({
                    name: "Async",
                    description: ""
                });
                yield Categories_model_1.Categories.create({
                    name: "Class and Objects",
                    description: "In this section you will put in practice questions like let, var, const and basic object on Javascript."
                });
                yield Categories_model_1.Categories.create({
                    name: "Server-Side",
                    description: "In this section you will put in practice questions like let, var, const and basic object on Javascript."
                });
                // 10 easy questions
                yield Questions_model_1.Questions.create({
                    categoryId: 1,
                    levelId: 1,
                    description: "Ways to Declare a JavaScript Variable:",
                    a: "Var, Let, Const",
                    b: "Var, Float, Int32",
                    c: "Lets, Const, int",
                    d: "All of them",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 1,
                    levelId: 1,
                    description: "Which variable is undefined?",
                    a: "var year;",
                    b: "var year =10; year = 7",
                    c: "var ;",
                    d: "var year = 7 ;",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 1,
                    levelId: 1,
                    description: "To declare a JavaScript variable, you should NOT use?",
                    a: "var year;",
                    b: "var year =10; year = 7",
                    c: "var ;",
                    d: "Int",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 1,
                    levelId: 1,
                    description: "What are Variables?",
                    a: "are containers for storing data",
                    b: "var year =10; year = 7",
                    c: "var ;",
                    d: "var year = 7 ;",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 1,
                    levelId: 1,
                    description: "When to Use JavaScript var?",
                    a: "var year;",
                    b: "If you want your code to run in older browsers",
                    c: "var ;",
                    d: "var year = 7 ;",
                    answer: "b",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 1,
                    levelId: 1,
                    description: "When to Use JavaScript const?",
                    a: "var year;",
                    b: "If you want a general rule",
                    c: "var ;",
                    d: "var year = 7 ;",
                    answer: "b",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 1,
                    levelId: 1,
                    description: "Which variable is undefined?",
                    a: "var year;",
                    b: "var year =10; year = 7",
                    c: "var ;",
                    d: "var year = 7 ;",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 1,
                    levelId: 1,
                    description: "Which variable is undefined?",
                    a: "var year;",
                    b: "var year =10; year = 7",
                    c: "var ;",
                    d: "var year = 7 ;",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 1,
                    levelId: 1,
                    description: "Which variable is undefined?",
                    a: "var year;",
                    b: "var year =10; year = 7",
                    c: "var ;",
                    d: "var year = 7 ;",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 1,
                    levelId: 1,
                    description: "Which variable is undefined?",
                    a: "var year;",
                    b: "var year =10; year = 7",
                    c: "var ;",
                    d: "var year = 7 ;",
                    answer: "c",
                });
                // 10 easy questions
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 1,
                    description: "Which ECMAScrip introduced the classes in JavaScript?",
                    a: "ES6",
                    b: "ES7",
                    c: "ES5",
                    d: "ES5.2",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 1,
                    description: "What keyword is used to create a class?",
                    a: "NewClass",
                    b: "const = class",
                    c: "Class",
                    d: "class",
                    answer: "",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 1,
                    description: "What is the method called that is always included when creating a class?",
                    a: "constructor",
                    b: "constructor()",
                    c: "Constructor",
                    d: "constructor;",
                    answer: "b",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 1,
                    description: "How can you define a class in JavaScript?",
                    a: "An object",
                    b: "A keyword",
                    c: "A template",
                    d: "A method",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 1,
                    description: "The constructor method is called automatically when a new object is created?",
                    a: "True",
                    b: "False",
                    c: "",
                    d: "",
                    answer: "True",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 1,
                    description: "The constructor method is a special method because ...?",
                    a: "",
                    b: "",
                    c: "",
                    d: "It is used to initialize object properties.",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 1,
                    description: "The behaviour of the instances present of a class inside a method is defined by ..",
                    a: "Classes",
                    b: "Method",
                    c: "Interfaces",
                    d: "Classes and Interfaces",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 1,
                    description: "The keyword or the property that you use to refer to an object through which they were invoked is ..",
                    a: "from",
                    b: "to",
                    c: "object",
                    d: "this",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 1,
                    description: "Once you create an object, you can add, remove or change properties of that object at any time.",
                    a: "False",
                    b: "True",
                    c: "",
                    d: "",
                    answer: "b",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 1,
                    description: "Name two ways two change the context of a JavaScript method",
                    a: "Call or Apply",
                    b: "",
                    c: "",
                    d: "",
                    answer: "a",
                });
                // 10 intermediate questions
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 2,
                    description: " The basic difference between JavaScript and Java is ... ",
                    a: "There is no difference",
                    b: "Functions are considered as fields",
                    c: "Variables are specific",
                    d: "Functions are values, and there is no hard distinction between methods and fields",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 2,
                    description: "The meaning for Augmenting classes is that",
                    a: "objects inherit prototype properties even in a dynamic state",
                    b: "objects inherit prototype properties only in a dynamic state",
                    c: "objects inherit prototype properties in the static state",
                    d: "object doesn’t inherit prototype properties in the static state",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 2,
                    description: "The property of JSON() method is",
                    a: "it can be invoked manually as object.JSON()",
                    b: "it will be automatically invoked by the compiler",
                    c: "it is invoked automatically by the JSON.stringify() method",
                    d: "it cannot be invoked in any form",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 2,
                    description: "When a class B can extend another class A, we say that?",
                    a: "A is the superclass and B is the subclass",
                    b: "B is the superclass and A is the subclass",
                    c: "Both A and B are the superclass",
                    d: "Both A and B are the subclass",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 2,
                    description: "If A is the superclass and B is the subclass, then subclass inheriting the superclass can be represented as",
                    a: "B=inherit(A);",
                    b: " B=A.inherit();",
                    c: "B.prototype=inherit(A);",
                    d: "B.prototype=inherit(A.prototype);",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 2,
                    description: "The method that can be used to create new properties and also to modify the attributes of existing properties is",
                    a: " Object.defineProperty()",
                    b: "Object.defineProperties()",
                    c: "Both Object.defineProperty() and Object.defineProperties()",
                    d: "Object.inherit()",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 2,
                    description: "What is the name of the property that allows you to add properties and methods to an object, as well as every object that inherits from it?",
                    a: "The ‘prototype’ property.",
                    b: "",
                    c: "",
                    d: "",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 2,
                    description: "An object literal can be used to create private variables.",
                    a: "True",
                    b: "False",
                    c: "",
                    d: "",
                    answer: "b",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 2,
                    description: "What is the name of the object that refers to the application used to view a web page?",
                    a: "",
                    b: "",
                    c: "",
                    d: "navigator",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 2,
                    description: "Which object.property combination provides a reference to the protocol used to view the current web page?",
                    a: "",
                    b: "",
                    c: "location.protocol",
                    d: "",
                    answer: "c",
                });
                //10 hard questions
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 3,
                    description: "The snippet that filters the filtered set is",
                    a: "var t=new FilteredSet(s, {function(s) {return !(x instanceof Set);});",
                    b: "var t=new FilteredSet{function(s) {return !(x instanceof Set);});",
                    c: "var t=new FilteredSet(s, {function(s) {return (x instanceof Set);});",
                    d: "var t=new FilteredSet(s, {function(s) {return x;});",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 3,
                    description: "When using the addEventListener() method to create a click-handler for a DOM element, what is the value of “this” inside of the callback you specify?.",
                    a: "",
                    b: "",
                    c: "",
                    d: "The DOM element that was clicked.",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 3,
                    description: "A JavaScript array is not an object",
                    a: "False",
                    b: "True",
                    c: "",
                    d: "",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 3,
                    description: "What are JavaScript objects?",
                    a: "Are data structures that contain both properties and methods.",
                    b: "",
                    c: "",
                    d: "",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 3,
                    description: "How do you check if an object is empty or not in Javascript?",
                    a: "",
                    b: "",
                    c: "using the Object.keys() method",
                    d: "",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 3,
                    description: "What are some of the common mistakes that developers make when using objects in JavaScript?",
                    a: "",
                    b: "",
                    c: "",
                    d: "assume that all objects are mutable.",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 3,
                    description: "what prototypal inheritance is?",
                    a: "",
                    b: "is a way of creating objects that inherit from other objects",
                    c: "",
                    d: "",
                    answer: "b",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 3,
                    description: "Why are closures important in JavaScript?",
                    a: "they allow you to create variables that are only accessible within the scope of a function",
                    b: "",
                    c: "",
                    d: "",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 3,
                    description: "What are Arrow Functions?",
                    a: "",
                    b: "",
                    c: "",
                    d: "a new way to define functions in JavaScript.",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 3,
                    levelId: 3,
                    description: "What is Object Destructuring?",
                    a: "is a clean way to assign array entries or object properties into their own variables.",
                    b: "",
                    c: "",
                    d: "",
                    answer: "a",
                });
                // 10 easy questions
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 1,
                    description: "What are the events generated by the Node objects called?",
                    a: "generators",
                    b: "emitters",
                    c: "dispatchers",
                    d: "highevents",
                    answer: "b",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 1,
                    description: "What is the function used to deregister event handler ‘f’?",
                    a: "deleteAllListeners(name)",
                    b: "deleteListener(name,f)",
                    c: "removeListener(name,f)",
                    d: "removeAllListeners(name)",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 1,
                    description: "What is the function used to remove all handlers for name events?",
                    a: "deleteAllListeners(name)",
                    b: "deleteListener(name,f)",
                    c: "removeListener(name,f)",
                    d: "removeAllListeners(name)",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 1,
                    description: "Which function is a synonym for on()?",
                    a: "addListener()",
                    b: "listeners()",
                    c: "once()",
                    d: "add()",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 1,
                    description: "Which of the following is an event emitter?",
                    a: "once",
                    b: "process",
                    c: "listeners",
                    d: "on",
                    answer: "b",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 1,
                    description: "When do uncaught exceptions generate events?",
                    a: "When handlers are registered",
                    b: "When handlers are deregistered",
                    c: "When handler functions are called",
                    d: "When handlers do not have a matching catch clause",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 1,
                    description: "Which among the following POSIX signals generate events?",
                    a: "SIGDOWN",
                    b: "SIGFLOAT",
                    c: "SIGINT",
                    d: "SIGSHORT",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 1,
                    description: "What is the method used to pause “data” events?",
                    a: "s.pause();",
                    b: "s.stop();",
                    c: "s.halt();",
                    d: "s.wait();",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 1,
                    description: "When the “end” event fires on EOF when no more data will arrive, which function is called?",
                    a: "s.on(“data”,f);",
                    b: "s.on(“end”,f);",
                    c: "s.on(“error”,f);",
                    d: "s.on(“default”,f);",
                    answer: "b",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 1,
                    description: "What will be the return value of the write() method when the Node cannot write the data immediately and has to buffer it internally?",
                    a: "0",
                    b: "1",
                    c: "True",
                    d: "False",
                    answer: "d",
                });
                //10 intermediate questions
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 2,
                    description: "What is BOM?",
                    a: "Browser Object Model",
                    b: "",
                    c: "",
                    d: "",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 2,
                    description: "What is DOM? ",
                    a: "",
                    b: "",
                    c: "Document Object Model",
                    d: "",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 2,
                    description: "What is the use of window object?",
                    a: "",
                    b: "",
                    c: "",
                    d: "is created automatically by the browser that represents a window of a browser",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 2,
                    description: "What is the use of history object?",
                    a: "can be used to switch to history pages such as back and forward from the current page or another page.",
                    b: "",
                    c: "",
                    d: "",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 2,
                    description: "How to write normal text code using JavaScript dynamically?",
                    a: "",
                    b: "",
                    c: "The innerText property is used to write the simple text using JavaScript dynamically.",
                    d: "",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 2,
                    description: "What does the isNaN() function?",
                    a: "",
                    b: "",
                    c: "returns true if the variable value is not a number.",
                    d: "",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 2,
                    description: "How to handle exceptions in JavaScript?",
                    a: "",
                    b: "try/catch block",
                    c: "",
                    d: "",
                    answer: "b",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 2,
                    description: "What is the use of a Set object in JavaScript?",
                    a: "",
                    b: "",
                    c: "",
                    d: "is used to store the elements with unique values.",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 2,
                    description: "What is the use of a Map object in JavaScript?",
                    a: "is used to map keys to values.",
                    b: "",
                    c: "",
                    d: "",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 2,
                    description: "Define anonymous function",
                    a: "",
                    b: "",
                    c: "It is a function that has no name.",
                    d: "",
                    answer: "c",
                });
                //10 hard questions
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 3,
                    description: "Can an anonymous function be assigned to a variable?",
                    a: "True",
                    b: "False",
                    c: "",
                    d: "",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 3,
                    description: "In JavaScript what is an argument object?",
                    a: "",
                    b: "",
                    c: "",
                    d: "The variables of JavaScript represent the arguments that are passed to a function.",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 3,
                    description: "If we want to return the character from a specific index which method is used?",
                    a: "",
                    b: "",
                    c: "",
                    d: "charAt()",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 3,
                    description: "While developing a server application using node, a developer realizes that she needs to be able to read from and write to a file. Which core module should she load in order to accomplish this?",
                    a: "fs",
                    b: "http",
                    c: "path",
                    d: "dns",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 3,
                    description: "A developer has written a simple JavaScript file to be used in node (app.js). However, there seems to be an issue and the developer wants to identify the problem. What two commands can the developer use to enter the debugger and advance to line 2 in the code execution?",
                    a: "node app.js, debug next",
                    b: "node debug app.js, n",
                    c: "node inspect app.js, next",
                    d: "node app.js, debug",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 3,
                    description: "Which of the following is a core Node.js module that provides methods for debugging?",
                    a: "console",
                    b: "stream",
                    c: "util",
                    d: "debug",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 3,
                    description: "Method used to cerate a new instance of http.Server in Node.js",
                    a: "http.creteServer()",
                    b: "",
                    c: "",
                    d: "",
                    answer: "a",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 3,
                    description: "npm command can be used to install the webpack library as a development dependency",
                    a: "",
                    b: "",
                    c: "npm install webpack --save-dev",
                    d: "",
                    answer: "c",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 3,
                    description: "Types of modules that can be included in a Node.js application",
                    a: "",
                    b: "Third-party, core, local",
                    c: "",
                    d: "",
                    answer: "b",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 3,
                    description: "Third-party module can be used to handle incoming HTTP request in Node.js",
                    a: "",
                    b: "",
                    c: "",
                    d: "Express",
                    answer: "d",
                });
                yield Questions_model_1.Questions.create({
                    categoryId: 4,
                    levelId: 3,
                    description: "Command used to step into the next line of code",
                    a: "",
                    b: "",
                    c: "next",
                    d: "",
                    answer: "c",
                });
                // await Categories.create({
                //   name: "Hardcode mode",
                //   description: "In this section you will put in practice questions like let, var, const and basic object on Javascript.",
                //   isHiden: true,
                // })
            }
            catch (error) {
            }
        });
    }
    syncFireBase() {
        return __awaiter(this, void 0, void 0, function* () {
            const firebaseUsers = yield (0, firebase_1.getAllUser)();
            firebaseUsers.forEach((user) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (user.role === "admin") {
                    yield Admins_model_1.Admins.findOrCreate({
                        where: {
                            uid: user.uid,
                        },
                        defaults: {
                            uid: user.uid,
                            name: (_a = user.name) !== null && _a !== void 0 ? _a : "",
                        }
                    });
                }
                else {
                    yield Players_model_1.Players.findOrCreate({
                        where: {
                            uid: user.uid,
                        },
                        defaults: {
                            uid: user.uid,
                            name: (_b = user.name) !== null && _b !== void 0 ? _b : "",
                        }
                    });
                }
            }));
        });
    }
    association() {
        Questions_model_1.Questions.belongsTo(Categories_model_1.Categories, {
            as: "category"
        });
        Questions_model_1.Questions.belongsTo(Levels_model_1.Levels, {
            as: "level"
        });
        Levels_model_1.Levels.hasMany(Questions_model_1.Questions, {
            foreignKey: {
                name: "levelId",
                allowNull: false,
            }
        });
        Categories_model_1.Categories.hasMany(Questions_model_1.Questions, {
            foreignKey: {
                name: "categoryId",
                allowNull: false,
            }
        });
        Histories_model_1.Histories.belongsTo(Players_model_1.Players, {
            as: "player"
        });
        Histories_model_1.Histories.belongsTo(Questions_model_1.Questions, {
            as: "question"
        });
        Players_model_1.Players.hasMany(Histories_model_1.Histories, {
            foreignKey: {
                name: "playerId",
                allowNull: false,
            }
        });
        Questions_model_1.Questions.hasMany(Histories_model_1.Histories, {
            foreignKey: {
                name: "questionId"
            }
        });
    }
}
exports.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: HOST,
    port: DB_PORT,
    dialect: DIALECT,
});
const models = [Admins_model_1.Admins.initModel, Levels_model_1.Levels.initModel, Categories_model_1.Categories.initModel, Histories_model_1.Histories.initModel, Players_model_1.Players.initModel, Questions_model_1.Questions.initModel];
for (const ModelInit of models) {
    ModelInit(exports.sequelize);
}
