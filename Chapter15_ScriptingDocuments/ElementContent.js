"use strict";

// inner html
// <span id="spanA"><text id="textA">T_T</text></span>
// span innerHTML => <text id="textA">T_T</text>
span.innerHTML;
// span outerHTML => <span id="spanA"><text id="textA">T_T</text></span>
span.outerHTML;
// beforebegin afterbegin beforeend afterend
span.insertAdjacentElement();

// inner content
span.innerText = "Another Text";
span.textContent = "Another Text";