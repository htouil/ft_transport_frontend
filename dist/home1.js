"use strict";
var updateTransheadermain3 = function () {
    var tag = [{
            logo: '../public/logos/add_person_logo.svg',
            tagTitle: 'Open an Account',
            tagText: ' Join the community, track your progress, and compete with players worldwide. Signing up is quick, easy, and your first step to becoming a ping pong champion!'
        },
        {
            logo: '../public/logos/pingpong_racket.png',
            tagTitle: 'PingPong.io Online',
            tagText: 'Compete with players from around the world, showcase your skills in real-time matches. The ultimate Ping Pong challenge is just a click away!'
        },
        {
            logo: '../public/logos/chat_box_logo.svg',
            tagTitle: 'Chat',
            tagText: 'Talk strategy, challenge friends, and celebrate your victories. Our chat feature keeps you connected with the Ping Pong community in real-time!'
        },
        {
            logo: '../public/logos/calendar_logo.svg',
            tagTitle: 'Tournaments',
            tagText: 'Join tournaments, compete with top players, and prove your dominance. Climb the ranks and become a Ping Pong champion!'
        }
    ];
    var htmlGen = '';
    tag.forEach(function (tag) {
        htmlGen += "\n        <div class=\"tag1\">\n            <div class=\"pic-tag\">\n                <img class=\"add-acc\" src=\"".concat(tag.logo, "\">\n                </div>\n            <p class=\"tag-text\">\n                ").concat(tag.tagTitle, "\n            </p>\n            <p class=\"tag-text1\">\n            ").concat(tag.tagText, "\n            </p>\n            </div>\n            ");
    });
    var element = document.querySelector('.js-tag');
    if (element) {
        element.innerHTML = htmlGen;
    }
};
module.exports = { updateTransheadermain3: updateTransheadermain3 };
//# sourceMappingURL=home1.js.map