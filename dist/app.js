import { setupLoginPage } from "./login.js";
import { updateHomeHeadermain3 } from "./home1.js";
import { updateHomeHeadermain5 } from "./home2.js";
import { notificationHeader, newFriendRequestTag, oldFriendTag, matchScoreTag, sideNewFriendRequestTag, sideOldFriendTag, sideMatchScoreTag, friendToTournamentTag, } from './components.js';
import { localGameHandling } from "./localgame.js";
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
let friendsBtn;
let historyBtn;
let friendsList;
let historyList;
// let localBtn: HTMLButtonElement | null;
// let onlineBtn: HTMLButtonElement | null;
// let playWFriendsBtn: HTMLButtonElement | null;
// let hostTournBtn: HTMLButtonElement | null;
//messages page:
let rtnProfilBtn;
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
export function initiateCustomTags() {
    customElements.define('notification-header', notificationHeader);
    customElements.define('newfriendrequest-tag', newFriendRequestTag);
    customElements.define('oldfriend-tag', oldFriendTag);
    customElements.define('matchscore-tag', matchScoreTag);
    customElements.define('sidenewfriendrequest-tag', sideNewFriendRequestTag);
    customElements.define('sideoldfriend-tag', sideOldFriendTag);
    customElements.define('sidematchscore-tag', sideMatchScoreTag);
    customElements.define('friendtotournament-tag', friendToTournamentTag);
}
;
export async function loadPage(page) {
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
            setupProfilPage();
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
        if (page === 'localgame') {
            localGameHandling();
        }
    }
    catch (error) {
        app.innerHTML = `<p class="text-red-500">Page not found.</p>`;
    }
}
;
export function hideNav(page) {
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
function setupProfilPage() {
}
;
function setupProfilButtons() {
    const homeBtn = document.querySelector('.home-btn');
    const settingsBtn = document.querySelector('.settings-btn');
    const addNewFriendShowBtn = document.getElementById('addNewFriendShowBtn');
    const addNewFriendCloseBtn = document.getElementById('addNewFriendCloseBtn');
    const messagesBtn = document.getElementById('messagesBtn');
    const sidePanel = document.getElementById('sidePanel');
    const openSidePanelBtn = document.getElementById('openSidePanelBtn');
    const closeSidePanelBtn = document.getElementById('closeSidePanelBtn');
    friendsBtn = document.querySelectorAll('.friends-btn');
    historyBtn = document.querySelectorAll('.history-btn');
    friendsList = document.querySelectorAll('.friends-list');
    historyList = document.querySelectorAll('.history-list');
    const localBtn = document.getElementById('local-btn');
    const onlineBtn = document.getElementById('online-btn');
    const hostTournBtn = document.getElementById('hostTournBtn');
    const playWFriendsBtn = document.getElementById('playWFriendsBtn');
    homeBtn?.addEventListener('click', () => loadnhistory('home'));
    settingsBtn?.addEventListener('click', () => loadnhistory('settings'));
    addNewFriendShowBtn?.addEventListener('click', () => showAddNewFriendPopup(sidePanel));
    addNewFriendCloseBtn?.addEventListener('click', () => closeAddNewFriendPopup(sidePanel));
    messagesBtn?.addEventListener('click', () => loadnhistory('messages'));
    openSidePanelBtn?.addEventListener('click', (event) => openSidePanel(event, sidePanel));
    closeSidePanelBtn?.addEventListener('click', (event) => closeSidePanel(event, sidePanel));
    document.addEventListener('click', (event) => handleOutsideClick(event, sidePanel));
    friendsBtn?.forEach((element) => {
        element.addEventListener('click', showFriendsList);
    });
    historyBtn?.forEach((element) => {
        element.addEventListener('click', showHistoryList);
    });
    localBtn?.addEventListener('click', () => selectLocal(localBtn, onlineBtn));
    onlineBtn?.addEventListener('click', () => selectOnline(localBtn, onlineBtn));
    hostTournBtn?.addEventListener('click', () => loadnhistory('hosttourn'));
    playWFriendsBtn?.addEventListener('click', () => loadnhistory('localgame'));
}
;
function showAddNewFriendPopup(sidePanel) {
    const toBlur = document.getElementById('toBlur');
    const toPop = document.getElementById('toPop');
    // const main = document.getElementById('app') as HTMLElement;
    toBlur.inert = true;
    toBlur.classList.add('blur-sm');
    toPop.classList.remove('hidden');
    toPop.classList.add('flex');
    sidePanel?.classList.remove('block');
    sidePanel?.classList.add('hidden');
}
;
function closeAddNewFriendPopup(sidePanel) {
    const toBlur = document.getElementById('toBlur');
    const toPop = document.getElementById('toPop');
    toBlur.inert = false;
    toBlur.classList.remove('blur-sm');
    toPop.classList.add('hidden');
    toPop.classList.remove('flex');
    sidePanel?.classList.add('block');
    sidePanel?.classList.remove('hidden');
}
function selectLocal(localBtn, onlineBtn) {
    localBtn?.classList.add('bg-gray-600');
    onlineBtn?.classList.remove('bg-gray-600', 'hover:bg-gray-500');
}
;
function selectOnline(localBtn, onlineBtn) {
    onlineBtn?.classList.add('bg-gray-600');
    localBtn?.classList.remove('bg-gray-600', 'hover:bg-gray-500');
}
;
function openSidePanel(event, sidePanel) {
    event?.stopPropagation();
    sidePanel?.classList.remove('translate-x-full');
    // document.body.classList.add('overflow-hidden');
    showFriendsList();
}
;
function closeSidePanel(event, sidePanel) {
    event?.stopPropagation();
    sidePanel?.classList.add('translate-x-full');
    // document.body.classList.remove('overflow-hidden');
}
;
function handleOutsideClick(event, sidePanel) {
    if (sidePanel && !sidePanel.contains(event.target))
        closeSidePanel(event, sidePanel);
}
;
function showFriendsList() {
    friendsList?.forEach((element) => {
        element?.classList.remove('hidden');
    });
    friendsBtn?.forEach((element) => {
        element?.classList.remove('panel-btn');
        element?.classList.add('selected-panel-btn');
    });
    historyList?.forEach((element) => {
        element?.classList.add('hidden');
    });
    historyBtn?.forEach((element) => {
        element?.classList.add('panel-btn');
        element?.classList.remove('selected-panel-btn');
    });
}
;
function showHistoryList() {
    historyList?.forEach((element) => {
        element?.classList.remove('hidden');
    });
    historyBtn?.forEach((element) => {
        element?.classList.remove('panel-btn');
        element?.classList.add('selected-panel-btn');
    });
    friendsList?.forEach((element) => {
        element?.classList.add('hidden');
    });
    friendsBtn?.forEach((element) => {
        element?.classList.add('panel-btn');
        element?.classList.remove('selected-panel-btn');
    });
}
;
function handleScroll() {
    const scrollables = document.querySelectorAll('.scrollable');
    scrollables?.forEach((element) => {
        let timeout = setTimeout(() => { }, 0);
        element.addEventListener('scroll', () => showScrollbar(element, timeout));
        hideScrollbar(element);
    });
}
;
function showScrollbar(element, timeout) {
    element.classList.remove('scrollbar-none');
    clearTimeout(timeout);
    timeout = setTimeout(() => hideScrollbar(element), 1500);
}
;
function hideScrollbar(element) {
    element.classList.add('scrollbar-none');
}
;
//Messages page:
function setupMessagesButtons() {
    rtnProfilBtn = document.querySelector('.rtnProfilBtn');
    rtnProfilBtn?.addEventListener('click', () => loadnhistory('profil'));
}
;
//Host Tournament page:
function setupHostTournamentPage() {
    const images = ["../public/images/cover_1.jpeg", "../public/images/cover_2.jpeg", "../public/images/cover_3.png",
        "../public/images/cover_4.jpeg"];
    const coverImage = document.getElementById("coverImage");
    const coverImageInput = document.getElementById("coverImageInput");
    let currIndex = 0;
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    setupTournamentForm();
    updateImage(currIndex, coverImage, coverImageInput, images);
    rtnProfilBtn = document.querySelector('.rtnProfilBtn');
    rtnProfilBtn?.addEventListener('click', () => loadnhistory('profil'));
    prevBtn?.addEventListener('click', () => {
        currIndex = (currIndex - 1 + images.length) % images.length;
        updateImage(currIndex, coverImage, coverImageInput, images);
    });
    nextBtn?.addEventListener('click', () => {
        currIndex = (currIndex + 1) % images.length;
        updateImage(currIndex, coverImage, coverImageInput, images);
    });
}
;
function setupTournamentForm() {
    const form = document.getElementById('tournamentForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const input = form.querySelector('input[required]');
    const inviteFriendsMode = document.getElementById('inviteFriendsMode');
    const invitedFriendsList = document.getElementById('invitedFriendsList');
    const checkBoxes = form.querySelectorAll('input[type="checkbox"]');
    if (!submitBtn || !inviteFriendsMode || !form)
        return;
    form.addEventListener("input", () => updateStartButton(input, submitBtn, inviteFriendsMode, invitedFriendsList, checkBoxes));
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (updateStartButton(input, submitBtn, inviteFriendsMode, invitedFriendsList, checkBoxes)) {
            alert("Form submitted successfully! 🎉");
            //   form.submit();
        }
    });
}
;
function updateStartButton(input, submitBtn, inviteFriendsMode, invitedFriendsList, checkBoxes) {
    let allValid = true;
    const txtErrMsg = document.createElement('p');
    const boxErrMsg = document.createElement('p');
    txtErrMsg.className = 'max-550:mt-1 mt-2 text-red-500 max-550:text-3xs xs:text-3xs sm:text-2xs text-xs lg:text-xs 2xl:text-sm';
    txtErrMsg.textContent = 'Please provide a name for the tournament.';
    boxErrMsg.className = 'max-550:mt-1 mt-2 text-red-500 max-550:text-3xs xs:text-3xs sm:text-2xs text-xs lg:text-xs 2xl:text-sm';
    boxErrMsg.textContent = 'Please select at least 3 players.';
    submitBtn.style.backgroundColor = "#8a8a92";
    if (!input.value.trim()) {
        allValid = false;
        input.classList.add('ring', 'ring-red-500');
        if (!input.nextElementSibling?.classList.contains('text-red-500'))
            input.after(txtErrMsg);
        // console.log(`here: '${input.value}'`);
    }
    else {
        input.classList.remove('ring', 'ring-red-500');
        if (input.nextElementSibling?.classList.contains('text-red-500'))
            input.nextElementSibling.remove();
    }
    const checkedCount = Array.from(checkBoxes).filter(checkbox => checkbox.checked).length;
    // console.log(`total: `);
    if (checkedCount < 3) {
        allValid = false;
        inviteFriendsMode.style.setProperty('border-color', '#ef4444');
        if (!invitedFriendsList.nextElementSibling?.classList.contains('text-red-500'))
            invitedFriendsList.after(boxErrMsg);
    }
    else {
        inviteFriendsMode.style.setProperty('border-color', '#5487a8');
        if (invitedFriendsList.nextElementSibling?.classList.contains('text-red-500'))
            invitedFriendsList.nextElementSibling.remove();
    }
    submitBtn.style.setProperty('background-color', allValid ? '#4b7694' : '#8a8a92');
    return (allValid);
}
;
function updateImage(index, coverImage, coverImageInput, images) {
    coverImage.style.backgroundImage = `url('${images[index]}')`;
    coverImageInput.value = images[index];
}
;
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
    rtnProfilBtn = document.querySelector('.rtnProfilBtn');
    rtnProfilBtn?.addEventListener('click', () => loadnhistory('profil'));
}
;
// //Signup page:
// const setupLoginPage = () => {
// };
