"use strict";
var updateTransheadermain5 = function () {
    var main5 = [{
            title: 'Get started',
            key1: 'Play Online',
            key2: 'Invite friends'
        },
        {
            title: 'Account',
            key1: 'Join',
            key2: 'Play & explore'
        },
        {
            title: 'PingPong.io',
            key1: 'Support',
            key2: 'Sign up'
        }];
    var htmlGen1 = '';
    main5.forEach(function (main5) {
        htmlGen1 += "\n        <div class=\"wq1\">\n        <p class=\"xp1\">\n        ".concat(main5.title, "\n        </p>\n        <p class=\"xr1\">\n        ").concat(main5.key1, "\n        </p>\n        <p class=\"xr1\">\n        ").concat(main5.key2, "\n        </p>\n        </div>\n        ");
    });
    var element = document.querySelector('.js-wq1');
    if (element) {
        element.innerHTML = htmlGen1;
    }
};
module.exports = { updateTransheadermain5: updateTransheadermain5 };
//# sourceMappingURL=home2.js.map