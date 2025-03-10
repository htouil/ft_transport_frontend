var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// home page:
let app;
let navBar;
let navBtns;
//profil page:
let homeBtn;
let settingsBtn;
let msgBtn;
let sidePanel;
let openBtn;
let closeBtn;
let friendsBtn;
let historyBtn;
let friendsList;
let historyList;
let localBtn;
let onlineBtn;
let hostTournBtn;
//messages page:
let returnBtn;
//host tournament page:
document.addEventListener('DOMContentLoaded', () => {
    app = document.getElementById('app');
    navBar = document.querySelector('nav');
    navBtns = document.querySelectorAll('.nav-btn');
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = urlParams.get('page') || 'signup';
    // console.log(`here:`);
    history.replaceState({ page: initialPage }, '', `?page=${initialPage}`);
    loadPage(initialPage);
    navBtns.forEach((button) => {
        button.addEventListener('click', () => {
            const page = button.dataset.page;
            loadPage(page);
            history.pushState({ page }, '', `?page=${page}`);
        });
    });
    window.onpopstate = (event) => {
        var _a;
        // console.log(`load: ${event.state?.page}`);
        if ((_a = event.state) === null || _a === void 0 ? void 0 : _a.page) {
            loadPage(event.state.page);
        }
    };
});
const loadPage = (page) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield fetch(`pages/${page}.html`);
        const content = yield response.text();
        app.innerHTML = content;
        console.log(`nav to: ${page}`);
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
            // setupSignupPage();
        }
    }
    catch (error) {
        app.innerHTML = `<p class="text-red-500">Page not found.</p>`;
    }
});
const hideNav = (page) => {
    if (navBar) {
        if (page === 'home')
            navBar.classList.remove('hidden');
        else if (page === 'profil' || page === 'messages' || page === 'hosttourn' || page === 'settings')
            navBar.classList.add('hidden');
    }
};
const loadnhistory = (toLoad) => {
    loadPage(toLoad);
    history.pushState({ page: toLoad }, '', `?page=${toLoad}`);
};
//Profil page:
const setupProfilButtons = () => {
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
    homeBtn === null || homeBtn === void 0 ? void 0 : homeBtn.addEventListener('click', () => loadnhistory('home'));
    settingsBtn === null || settingsBtn === void 0 ? void 0 : settingsBtn.addEventListener('click', () => loadnhistory('settings'));
    msgBtn === null || msgBtn === void 0 ? void 0 : msgBtn.addEventListener('click', () => loadnhistory('messages'));
    openBtn === null || openBtn === void 0 ? void 0 : openBtn.addEventListener('click', openSidePanel);
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', closeSidePanel);
    document.addEventListener('click', handleOutsideClick);
    friendsBtn === null || friendsBtn === void 0 ? void 0 : friendsBtn.forEach((element) => {
        element.addEventListener('click', showFriendsList);
    });
    historyBtn === null || historyBtn === void 0 ? void 0 : historyBtn.forEach((element) => {
        element.addEventListener('click', showHistoryList);
    });
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.addEventListener('click', selectLocal);
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.addEventListener('click', selectOnline);
    hostTournBtn === null || hostTournBtn === void 0 ? void 0 : hostTournBtn.addEventListener('click', () => loadnhistory('hosttourn'));
};
const selectLocal = () => {
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.classList.add('game-btn');
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.classList.remove('hover:bg-gray-500');
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.classList.remove('game-btn');
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.classList.add('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.classList.remove('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
};
const selectOnline = () => {
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.classList.add('game-btn');
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.classList.remove('hover:bg-gray-500');
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.classList.remove('game-btn');
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.classList.add('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.classList.remove('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
};
const openSidePanel = (e) => {
    e.stopPropagation();
    sidePanel === null || sidePanel === void 0 ? void 0 : sidePanel.classList.remove('translate-x-full');
    document.body.classList.add('overflow-hidden');
    showFriendsList();
};
const closeSidePanel = (e) => {
    e === null || e === void 0 ? void 0 : e.stopPropagation();
    sidePanel === null || sidePanel === void 0 ? void 0 : sidePanel.classList.add('translate-x-full');
    document.body.classList.remove('overflow-hidden');
};
const handleOutsideClick = (e) => {
    if (sidePanel && !sidePanel.contains(e.target) && e.target !== openBtn)
        closeSidePanel();
};
const showFriendsList = () => {
    friendsList === null || friendsList === void 0 ? void 0 : friendsList.forEach((element) => {
        element === null || element === void 0 ? void 0 : element.classList.remove('hidden');
    });
    friendsBtn === null || friendsBtn === void 0 ? void 0 : friendsBtn.forEach((element) => {
        element === null || element === void 0 ? void 0 : element.classList.remove('panel-btn');
        element === null || element === void 0 ? void 0 : element.classList.add('selected-panel-btn');
    });
    historyList === null || historyList === void 0 ? void 0 : historyList.forEach((element) => {
        element === null || element === void 0 ? void 0 : element.classList.add('hidden');
    });
    historyBtn === null || historyBtn === void 0 ? void 0 : historyBtn.forEach((element) => {
        element === null || element === void 0 ? void 0 : element.classList.add('panel-btn');
        element === null || element === void 0 ? void 0 : element.classList.remove('selected-panel-btn');
    });
};
const showHistoryList = () => {
    historyList === null || historyList === void 0 ? void 0 : historyList.forEach((element) => {
        element === null || element === void 0 ? void 0 : element.classList.remove('hidden');
    });
    historyBtn === null || historyBtn === void 0 ? void 0 : historyBtn.forEach((element) => {
        element === null || element === void 0 ? void 0 : element.classList.remove('panel-btn');
        element === null || element === void 0 ? void 0 : element.classList.add('selected-panel-btn');
    });
    friendsList === null || friendsList === void 0 ? void 0 : friendsList.forEach((element) => {
        element === null || element === void 0 ? void 0 : element.classList.add('hidden');
    });
    friendsBtn === null || friendsBtn === void 0 ? void 0 : friendsBtn.forEach((element) => {
        element === null || element === void 0 ? void 0 : element.classList.add('panel-btn');
        element === null || element === void 0 ? void 0 : element.classList.remove('selected-panel-btn');
    });
};
const handleScroll = () => {
    let scrollables = document.querySelectorAll('.scrollable');
    scrollables === null || scrollables === void 0 ? void 0 : scrollables.forEach((element) => {
        let timeout = setTimeout(() => { }, 0);
        element.addEventListener('scroll', () => showScrollbar(element, timeout));
        hideScrollbar(element);
    });
};
const showScrollbar = (element, timeout) => {
    element.classList.remove('scrollbar-none');
    clearTimeout(timeout);
    timeout = setTimeout(() => hideScrollbar(element), 1500);
};
const hideScrollbar = (element) => {
    element.classList.add('scrollbar-none');
};
//Messages page:
const setupMessagesButtons = () => {
    returnBtn = document.querySelector('.rtn-profil-btn');
    returnBtn === null || returnBtn === void 0 ? void 0 : returnBtn.addEventListener('click', () => loadnhistory('profil'));
};
//Host Tournament page:
const setupHostTournamentPage = () => {
    returnBtn = document.querySelector('.rtn-profil-btn');
    returnBtn === null || returnBtn === void 0 ? void 0 : returnBtn.addEventListener('click', () => loadnhistory('profil'));
    const form = document.getElementById('tournamentForm');
    const images = ["../public/images/cover_1.jpeg", "../public/images/cover_2.jpeg", "../public/images/cover_3.png",
        "../public/images/cover_4.jpeg"];
    let currIndex = 0;
    const coverImage = document.getElementById("coverImage");
    const coverImageInput = document.getElementById("coverImageInput");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    updateImage(currIndex, coverImage, coverImageInput, images);
    if (form)
        form.addEventListener("submit", validateForm);
    // console.log(`here: ${coverImageInput.value}`);
    prevBtn === null || prevBtn === void 0 ? void 0 : prevBtn.addEventListener('click', () => {
        currIndex = (currIndex - 1 + images.length) % images.length;
        updateImage(currIndex, coverImage, coverImageInput, images);
    });
    nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.addEventListener('click', () => {
        currIndex = (currIndex + 1) % images.length;
        updateImage(currIndex, coverImage, coverImageInput, images);
    });
};
const updateImage = (index, coverImage, coverImageInput, images) => {
    coverImage.style.backgroundImage = `url('${images[index]}')`;
    coverImageInput.value = images[index];
};
const validateForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const inputs = form.querySelectorAll("input[required]");
    let allValid = true;
    inputs.forEach((input) => {
        // fix input field style for error state:
        if (!input.value.trim()) {
            allValid = false;
            input.classList.remove("active:ring-2");
            input.classList.remove("active:ring-gray-300");
            input.classList.add("ring");
            input.classList.add("ring-red-500");
            console.log(`here: '${input.value}'`);
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
        //   form.submit();
    }
};
//////////////////////////////////////////////////////////////
// figure out how to link .js files together in app.ts
// import * as main3 from "./TS/Home_ts/main3";
// import * as main5 from "./TS/Home_ts/main5";
// import * as login from "./TS/Log_in_ts/login";
// import * as profile from "./TS/Profile_ts/profile";
// import { updateTransheadermain3 } from "./TS/Home_ts/main3";
// import { updateTransheadermain5 } from "./TS/Home_ts/main5";
// import { newHtmlUp, newHtmlIn, updateSignupForm } from "../../TS/Log_in_ts/login";
// //Signup page:
// const setupSignupPage = () => {
// 	updateSignupForm();
// 	// updateTransheadermain3();
// };
//Settings page:
const setupSettingsButtons = () => {
    returnBtn = document.querySelector('.rtn-profil-btn');
    returnBtn === null || returnBtn === void 0 ? void 0 : returnBtn.addEventListener('click', () => loadnhistory('profil'));
};
