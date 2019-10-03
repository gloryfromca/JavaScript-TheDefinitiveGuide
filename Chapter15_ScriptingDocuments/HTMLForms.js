"use strict";

// select form element
var fields = document.getElementById("address").getElementsByTagName("input");

// element which is `shipping`'s child, and type is radio, name is method.
document.querySelectorAll('#shipping input[type="radio"][name="method"]');

// access `form` element
// not dependable
window.address;
// form which name is address
document.address;
// access by document.forms, name or id is address
document.forms.address;
document.forms[0];

// access element of form by name or id
// street is name.
document.forms.address.elements[0];
document.forms.address.elements.street;

// `name` attribute is shared by option
var methods = document.forms.shipping.elements.method;
