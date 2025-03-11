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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var app;
var navBar;
var navBtns;
var homeBtn;
var settingsBtn;
var msgBtn;
var sidePanel;
var openBtn;
var closeBtn;
var friendsBtn;
var historyBtn;
var friendsList;
var historyList;
var localBtn;
var onlineBtn;
var hostTournBtn;
var returnBtn;
document.addEventListener('DOMContentLoaded', function () {
    app = document.getElementById('app');
    navBar = document.querySelector('nav');
    navBtns = document.querySelectorAll('.nav-btn');
    var urlParams = new URLSearchParams(window.location.search);
    var initialPage = urlParams.get('page') || 'signup';
    history.replaceState({ page: initialPage }, '', "?page=".concat(initialPage));
    loadPage(initialPage);
    navBtns.forEach(function (button) {
        button.addEventListener('click', function () {
            var page = button.dataset.page;
            loadPage(page);
            history.pushState({ page: page }, '', "?page=".concat(page));
        });
    });
    window.onpopstate = function (event) {
        var _a;
        if ((_a = event.state) === null || _a === void 0 ? void 0 : _a.page) {
            loadPage(event.state.page);
        }
    };
});
var loadPage = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var response, content, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4, fetch("pages/".concat(page, ".html"))];
            case 1:
                response = _a.sent();
                return [4, response.text()];
            case 2:
                content = _a.sent();
                app.innerHTML = content;
                console.log("nav to: ".concat(page));
                hideNav(page);
                if (page === 'profil') {
                    setupProfilButtons();
                    handleScroll();
                }
                if (page === 'messages') {
                    setupMessagesButtons();
                }
                if (page === 'hosttourn') {
                    setupHostTournamentPage();
                }
                if (page === 'settings') {
                    setupSettingsButtons();
                }
                if (page === 'signup') {
                }
                return [3, 4];
            case 3:
                error_1 = _a.sent();
                app.innerHTML = "<p class=\"text-red-500\">Page not found.</p>";
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
var hideNav = function (page) {
    if (navBar) {
        if (page === 'home')
            navBar.classList.remove('hidden');
        else if (page === 'profil' || page === 'messages' || page === 'hosttourn' || page === 'settings')
            navBar.classList.add('hidden');
    }
};
var loadnhistory = function (toLoad) {
    loadPage(toLoad);
    history.pushState({ page: toLoad }, '', "?page=".concat(toLoad));
};
var setupProfilButtons = function () {
    homeBtn = document.querySelector('.home-btn');
    settingsBtn = document.querySelector('.settings-btn');
    msgBtn = document.querySelector('.msg-btn');
    sidePanel = document.getElementById('friends-panel');
    openBtn = document.getElementById('open-btn');
    closeBtn = document.getElementById('close-btn');
    friendsBtn = document.querySelectorAll('.friends-btn');
    historyBtn = document.querySelectorAll('.history-btn');
    friendsList = document.querySelectorAll('.friends-list');
    historyList = document.querySelectorAll('.history-list');
    localBtn = document.getElementById('local-btn');
    onlineBtn = document.getElementById('online-btn');
    hostTournBtn = document.querySelector('.host-tourn-btn');
    homeBtn === null || homeBtn === void 0 ? void 0 : homeBtn.addEventListener('click', function () { return loadnhistory('home'); });
    settingsBtn === null || settingsBtn === void 0 ? void 0 : settingsBtn.addEventListener('click', function () { return loadnhistory('settings'); });
    msgBtn === null || msgBtn === void 0 ? void 0 : msgBtn.addEventListener('click', function () { return loadnhistory('messages'); });
    openBtn === null || openBtn === void 0 ? void 0 : openBtn.addEventListener('click', openSidePanel);
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', closeSidePanel);
    document.addEventListener('click', handleOutsideClick);
    friendsBtn === null || friendsBtn === void 0 ? void 0 : friendsBtn.forEach(function (element) {
        element.addEventListener('click', showFriendsList);
    });
    historyBtn === null || historyBtn === void 0 ? void 0 : historyBtn.forEach(function (element) {
        element.addEventListener('click', showHistoryList);
    });
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.addEventListener('click', selectLocal);
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.addEventListener('click', selectOnline);
    hostTournBtn === null || hostTournBtn === void 0 ? void 0 : hostTournBtn.addEventListener('click', function () { return loadnhistory('hosttourn'); });
};
var selectLocal = function () {
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.classList.add('game-btn');
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.classList.remove('hover:bg-gray-500');
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.classList.remove('game-btn');
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.classList.add('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.classList.remove('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
};
var selectOnline = function () {
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.classList.add('game-btn');
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.classList.remove('hover:bg-gray-500');
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.classList.remove('game-btn');
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.classList.add('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.classList.remove('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
};
var openSidePanel = function (e) {
    e.stopPropagation();
    sidePanel === null || sidePanel === void 0 ? void 0 : sidePanel.classList.remove('translate-x-full');
    document.body.classList.add('overflow-hidden');
    showFriendsList();
};
var closeSidePanel = function (e) {
    e === null || e === void 0 ? void 0 : e.stopPropagation();
    sidePanel === null || sidePanel === void 0 ? void 0 : sidePanel.classList.add('translate-x-full');
    document.body.classList.remove('overflow-hidden');
};
var handleOutsideClick = function (e) {
    if (sidePanel && !sidePanel.contains(e.target) && e.target !== openBtn)
        closeSidePanel();
};
var showFriendsList = function () {
    friendsList === null || friendsList === void 0 ? void 0 : friendsList.forEach(function (element) {
        element === null || element === void 0 ? void 0 : element.classList.remove('hidden');
    });
    friendsBtn === null || friendsBtn === void 0 ? void 0 : friendsBtn.forEach(function (element) {
        element === null || element === void 0 ? void 0 : element.classList.remove('panel-btn');
        element === null || element === void 0 ? void 0 : element.classList.add('selected-panel-btn');
    });
    historyList === null || historyList === void 0 ? void 0 : historyList.forEach(function (element) {
        element === null || element === void 0 ? void 0 : element.classList.add('hidden');
    });
    historyBtn === null || historyBtn === void 0 ? void 0 : historyBtn.forEach(function (element) {
        element === null || element === void 0 ? void 0 : element.classList.add('panel-btn');
        element === null || element === void 0 ? void 0 : element.classList.remove('selected-panel-btn');
    });
};
var showHistoryList = function () {
    historyList === null || historyList === void 0 ? void 0 : historyList.forEach(function (element) {
        element === null || element === void 0 ? void 0 : element.classList.remove('hidden');
    });
    historyBtn === null || historyBtn === void 0 ? void 0 : historyBtn.forEach(function (element) {
        element === null || element === void 0 ? void 0 : element.classList.remove('panel-btn');
        element === null || element === void 0 ? void 0 : element.classList.add('selected-panel-btn');
    });
    friendsList === null || friendsList === void 0 ? void 0 : friendsList.forEach(function (element) {
        element === null || element === void 0 ? void 0 : element.classList.add('hidden');
    });
    friendsBtn === null || friendsBtn === void 0 ? void 0 : friendsBtn.forEach(function (element) {
        element === null || element === void 0 ? void 0 : element.classList.add('panel-btn');
        element === null || element === void 0 ? void 0 : element.classList.remove('selected-panel-btn');
    });
};
var handleScroll = function () {
    var scrollables = document.querySelectorAll('.scrollable');
    scrollables === null || scrollables === void 0 ? void 0 : scrollables.forEach(function (element) {
        var timeout = setTimeout(function () { }, 0);
        element.addEventListener('scroll', function () { return showScrollbar(element, timeout); });
        hideScrollbar(element);
    });
};
var showScrollbar = function (element, timeout) {
    element.classList.remove('scrollbar-none');
    clearTimeout(timeout);
    timeout = setTimeout(function () { return hideScrollbar(element); }, 1500);
};
var hideScrollbar = function (element) {
    element.classList.add('scrollbar-none');
};
var setupMessagesButtons = function () {
    returnBtn = document.querySelector('.rtn-profil-btn');
    returnBtn === null || returnBtn === void 0 ? void 0 : returnBtn.addEventListener('click', function () { return loadnhistory('profil'); });
};
var setupHostTournamentPage = function () {
    returnBtn = document.querySelector('.rtn-profil-btn');
    returnBtn === null || returnBtn === void 0 ? void 0 : returnBtn.addEventListener('click', function () { return loadnhistory('profil'); });
    var form = document.getElementById('tournamentForm');
    var images = ["../public/images/cover_1.jpeg", "../public/images/cover_2.jpeg", "../public/images/cover_3.png",
        "../public/images/cover_4.jpeg"];
    var currIndex = 0;
    var coverImage = document.getElementById("coverImage");
    var coverImageInput = document.getElementById("coverImageInput");
    var prevBtn = document.getElementById("prevBtn");
    var nextBtn = document.getElementById("nextBtn");
    updateImage(currIndex, coverImage, coverImageInput, images);
    if (form)
        form.addEventListener("submit", validateForm);
    prevBtn === null || prevBtn === void 0 ? void 0 : prevBtn.addEventListener('click', function () {
        currIndex = (currIndex - 1 + images.length) % images.length;
        updateImage(currIndex, coverImage, coverImageInput, images);
    });
    nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.addEventListener('click', function () {
        currIndex = (currIndex + 1) % images.length;
        updateImage(currIndex, coverImage, coverImageInput, images);
    });
};
var updateImage = function (index, coverImage, coverImageInput, images) {
    coverImage.style.backgroundImage = "url('".concat(images[index], "')");
    coverImageInput.value = images[index];
};
var validateForm = function (event) {
    event.preventDefault();
    var form = event.target;
    var inputs = form.querySelectorAll("input[required]");
    var allValid = true;
    inputs.forEach(function (input) {
        if (!input.value.trim()) {
            allValid = false;
            input.classList.remove("active:ring-2");
            input.classList.remove("active:ring-gray-300");
            input.classList.add("ring");
            input.classList.add("ring-red-500");
            console.log("here: '".concat(input.value, "'"));
        }
        else {
            input.classList.remove("ring");
            input.classList.remove("ring-red-500");
            input.classList.add("active:ring-2");
            input.classList.add("active:ring-gray-300");
        }
    });
    if (allValid) {
        alert("Form submitted successfully! 🎉");
    }
};
var setupSettingsButtons = function () {
    returnBtn = document.querySelector('.rtn-profil-btn');
    returnBtn === null || returnBtn === void 0 ? void 0 : returnBtn.addEventListener('click', function () { return loadnhistory('profil'); });
};
//# sourceMappingURL=app.js.map