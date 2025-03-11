"use strict";
var updateSignupForm = function () {
    var newHtmlUp = "<div class=\"email_tag\">\n\t<div class=\"names\">\n\t<p class=\"email_text\">\n\t\tFirst Name\n\t\t</p>\n\t\t<p class=\"email_text1\">\n\t\tLast Name\n\t\t</p>\n\t</div>\n\t<div class=\"info\">\n\t<input class=\"email_input\">\n\t<input class=\"email_input\">\n\t</div>\n\t</div>\n\t<div class=\"email_tag\">\n\t<p class=\"email_text\">\n\t\tUsername\n\t</p>\n\t<input class=\"email_input\">\n\t</div>\n\t<div class=\"email_tag\">\n\t<p class=\"email_text\">\n\t\tEmail\n\t</p>\n\t<input class=\"email_input\">\n\t</div>\n\t<div class=\"password_tag\">\n\t<p class=\"passwordl_text\">\n\tPassword\n\t</p>\n\t<div class=\"password_container\">\n\t\t<input class=\"password_input\" type=\"password\"\">\n\t\t<button class=\"show_ps\">\n\t\t<img class=\"visibility_off\" src=\"../public/logos/visibility_eye_off.svg\">\n\t\t</button>\n\t</div>\n\t</div>\n\t<div class=\"password_tag\">\n\t<p class=\"passwordl_text\">\n\tConfirm Password\n\t</p>\n\t<div class=\"password_container\">\n\t<input class=\"password_input\" type=\"password\">\n\t<button class=\"show_ps\">\n\t\t<img class=\"visibility_off\" src=\"../public/logos/visibility_eye_off.svg\">\n\t</button>\n\t</div>\n\t</div>\n\t<button class=\"sign_bt\">\n\tSIGN IN\n\t</button>\n\t</div>";
    var newHtmlIn = "<div class=\"email_tag\">\n\t<p class=\"email_text\">\n\tEmail\n\t</p>\n\t<input class=\"email_input\">\n\t</div>\n\t<div class=\"password_tag\">\n\t<p class=\"passwordl_text\">\n\tPassword\n\t</p>\n\t<div class=\"password_container\">\n\t\t<input class=\"password_input\" type=\"password\">\n\t\t<button class=\"show_ps\">\n\t\t<img class=\"visibility_off\" src=\"../public/logos/visibility_eye_off.svg\">\n\t\t</button>\n\t</div>\n\t</div>\n\t<div class=\"check\">\n\t<input class=\"check_box\" type=\"checkbox\">\n\t<p class=\"remember_me\">\n\tRemember me\n\t</p>\n\t<p class=\"forgot_ps\">\n\tForgot your password?\n\t</p>\n\t</div>\n\t<button class=\"sign_bt\">\n\tSIGN IN\n\t</button>\n\t<p class=\"back\">\n\tOR USE\n\t</p>\n\t<button class=\"google_bt\">\n\t<img class=\"google_logo\" src=\"../public/logos/google_logo.svg\">\n\t</button>\n\t<div class=\"creat_acc\">\n\t<p class=\"new\">\n\tNew to <span class=\"name_page\">PingPong.io</span>\n\t</p>\n\t<p class=\"creat\">\n\tCreat an account \n\t</p>\n\t</div>\n\t";
    var leet = document.querySelector('.segv2');
    var btval = document.querySelector('.show_ps');
    var signBtns = document.querySelectorAll('.SIGN_INBT, .SIGN_UPBT');
    btval === null || btval === void 0 ? void 0 : btval.addEventListener('click', function () { return visibility; });
    signBtns === null || signBtns === void 0 ? void 0 : signBtns.forEach(function (button) {
        button.addEventListener('click', function () {
            signBtns.forEach(function (btn) {
                btn.classList.remove('line');
            });
            button.classList.add('line');
        });
    });
    leet.innerHTML = newHtmlIn;
    var signupBtn = document.querySelector('.SIGN_UPBT');
    var signinBtn = document.querySelector('.SIGN_INBT');
    signupBtn === null || signupBtn === void 0 ? void 0 : signupBtn.addEventListener('click', function () {
        leet.innerHTML = newHtmlUp;
    });
    signinBtn === null || signinBtn === void 0 ? void 0 : signinBtn.addEventListener('click', function () {
        leet.innerHTML = newHtmlIn;
    });
    var visibility = function () {
        var on = '<img class="visibility_off" src="../public/logos/visibility_eye_on.svg">';
        var off = '<img class="visibility_off" src="../public/logos/visibility_eye_off.svg">';
        var input = document.querySelector('.password_input');
        if (btval.innerHTML === off && input.type === "password") {
            btval.innerHTML = on;
            input.type = "text";
        }
        else {
            btval.innerHTML = off;
            input.type = "password";
        }
    };
};
module.exports = { updateSignupForm: updateSignupForm };
//# sourceMappingURL=login.js.map