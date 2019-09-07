// declare array
var df = [1, 2, , 4];
console.assert(df[2] === undefined);

// declare object's attribute by string
var ma = {
    "df": function () {
        return 1;
    }
};
console.assert(ma.df() == 1);

//a access object's attribute
console.assert(ma['df']() == 1);

// if function has no return statements, it will return undefined
var noReturnFunc = function () {
};
console.assert(noReturnFunc() === undefined);

// new object without left and right parenthesis.
var date = new Date;

// constructor function
var ntf = new noReturnFunc();
console.assert(typeof ntf == typeof {});

