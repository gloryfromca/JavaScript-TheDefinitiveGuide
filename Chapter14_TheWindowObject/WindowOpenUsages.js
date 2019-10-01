"use strict";

// create new window and manipulate it.
var newWindow = window.open("https://www.baidu.com", "nananan", "width=400,height=350,status=true,resizable=yes");
newWindow.alert("message from window.opener");
newWindow.location = "https://aliyun.com";

// window can be closed by window creating it.
newWindow.close();

// access opener in window opened.
window.opener.location = "https://aliyun.com";

