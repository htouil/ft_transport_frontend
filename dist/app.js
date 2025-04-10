import { notificationHeader, simpleHeader, newFriendRequestTag, oldFriendTag, matchScoreTag, sideNewFriendRequestTag, sideOldFriendTag, sideMatchScoreTag, friendToTournamentTag, } from './components.js';
import { updateHomeHeadermain3 } from "./home1.js";
import { updateHomeHeadermain5, setupLoginPage } from "./home2.js";
// import { setupLoginPage } from "./login.js";
import { setupProfilButtons, } from "./profil.js";
import { setupHostTournamentPage } from './hosttourn.js';
// import { localGameHandling } from "./localgame.js";
import { updateSettingsPage } from "./settings.js";
import { rakmanchat } from "./chat.js";
import { GameAi } from "./GameAI.js";
import { GameLocal } from "./GameLocal.js";
import { GameMulti } from "./GameMulti.js";
// home page:
let app;
let navBar;
let navBtns;
//profil page:
// let homeBtn: HTMLButtonElement | null;
// let settingsBtn: HTMLButtonElement | null;
// let addNewFriendShowBtn: HTMLButtonElement | null;
// let addNewFriendCloseBtn: HTMLButtonElement | null;
// let messagesBtn: HTMLButtonElement | null;
// let sidePanel: HTMLElement | null;
// let openSidePanelBtn: HTMLButtonElement | null;
// let closeSidePanelBtn: HTMLButtonElement | null;
// let localBtn: HTMLButtonElement | null;
// let onlineBtn: HTMLButtonElement | null;
// let playWFriendsBtn: HTMLButtonElement | null;
// let hostTournPageBtn: HTMLButtonElement | null;
//messages page:
// let rtnProfilBtn: HTMLButtonElement | null;
//host tournament page:
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = urlParams.get('page') || 'home';
    app = document.getElementById('app');
    navBar = document.querySelector('nav');
    navBtns = document.querySelectorAll('.nav-btn');
    // console.log(`here:`);
    initiateCustomTags();
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
        // console.log(`load: ${event.state?.page}`);
        if (event.state?.page) {
            loadPage(event.state.page);
        }
    };
});
function initiateCustomTags() {
    customElements.define('notification-header', notificationHeader);
    customElements.define('simple-header', simpleHeader);
    customElements.define('newfriendrequest-tag', newFriendRequestTag);
    customElements.define('oldfriend-tag', oldFriendTag);
    customElements.define('matchscore-tag', matchScoreTag);
    customElements.define('sidenewfriendrequest-tag', sideNewFriendRequestTag);
    customElements.define('sideoldfriend-tag', sideOldFriendTag);
    customElements.define('sidematchscore-tag', sideMatchScoreTag);
    customElements.define('friendtotournament-tag', friendToTournamentTag);
}
;
async function loadPage(page) {
    try {
        const response = await fetch(`pages/${page}.html`);
        const content = await response.text();
        app.innerHTML = content;
        // console.log(`nav to: ${page}`);
        hideNav(page);
        if (page === 'home') {
            setupHomePage();
        }
        if (page === 'login') {
            setupLoginPage();
        }
        if (page === 'profil') {
            // setupProfilPage();
            setupProfilButtons();
            // handleScroll();
        }
        if (page === 'messages') {
            // setupMessagesButtons();
            rakmanchat();
        }
        if (page === 'hosttourn') {
            setupHostTournamentPage();
        }
        if (page === 'settings') {
            updateSettingsPage();
        }
        if (page === 'game_ai') {
            GameAi();
        }
        if (page === 'game_local') {
            GameLocal();
        }
        if (page === 'game_multi') {
            GameMulti();
        }
    }
    catch (error) {
        app.innerHTML = `<p class="text-red-500">Page not found.</p>`;
    }
}
;
function hideNav(page) {
    if (navBar) {
        if (page === 'home1')
            navBar.classList.remove('hidden');
        else
            navBar.classList.add('hidden');
    }
}
;
export function loadnhistory(toLoad) {
    loadPage(toLoad);
    history.pushState({ page: toLoad }, '', `?page=${toLoad}`);
}
;
//Home page:
function setupHomePage() {
    updateHomeHeadermain3();
    updateHomeHeadermain5();
}
;
//Profil page:
//Messages page:
function setupMessagesButtons() {
    const rtnProfilBtn = document.querySelector('.rtnProfilBtn');
    rtnProfilBtn?.addEventListener('click', () => loadnhistory('profil'));
}
;
//Host Tournament page:
//////////////////////////////////////////////////////////////
// figure out how to link .js files together in app.ts
// import * as home1 from "./home1";
// import * as home2 from "./home2";
// import * as login from "./login";
// import * as profile from "./TS/Profile_ts/profile";
// import { updateHomeHeadermain3 } from "./home1";
// import { updateHomeHeadermain5 } from "./home2";
//Settings page:
function setupSettingsButtons() {
    const rtnProfilBtn = document.querySelector('.rtnProfilBtn');
    rtnProfilBtn?.addEventListener('click', () => loadnhistory('profil'));
}
;
// //Signup page:
// const setupLoginPage = () => {
// };
