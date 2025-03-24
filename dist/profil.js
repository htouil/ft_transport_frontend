import { loadnhistory } from './app.js';
let friendsBtn;
let historyBtn;
let friendsList;
let historyList;
export async function setupProfilPage() {
    try {
        const playerName = await fetchPlayerName();
        const iPlayerName = document.getElementById('iPlayerName');
        if (iPlayerName)
            iPlayerName.textContent = playerName;
    }
    catch (error) {
        console.error("Failed to fatch for Player's name2: ", error);
    }
}
;
async function fetchPlayerName() {
    try {
        // const test = {
        // 	'email' : 'glmo7@gjjjjjjlmo7.com',
        // 	'password':'glmo7'
        // };
        // const response1 = await fetch('http://10.11.2.4:3000/login', {
        // 	method:'POST',
        // 	body: JSON.stringify(test),
        // });
        // console.log('hna trip ',response1)
        const response = await fetch('http://10.11.2.4:3000/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        console.log("response:", response);
        if (!response.ok)
            throw new Error("Failed to fetch for yhe player's Data");
        const data = await response.json();
        return (data.name);
    }
    catch (error) {
        console.error("Failed to fetch for the player's name1: ", error);
        return ('Player');
    }
}
;
export function setupProfilButtons() {
    const homeBtn = document.querySelector('.home-btn');
    const notifsBtn = document.getElementById('notifsBtn');
    const notifs = document.getElementById('notifs');
    const notifsAccRejBtn = document.getElementById('notifsAccRejBtn');
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
    const playWFriendsBtn = document.getElementById('playWFriendsBtn');
    const tournTitle = document.getElementById('tournTitle');
    const createTournPageBtn = document.getElementById('createTournPageBtn');
    const hostTournPageBtn = document.getElementById('hostTournPageBtn');
    homeBtn.addEventListener('click', () => loadnhistory('home'));
    notifsBtn.addEventListener('click', (event) => showNotifications(event, notifs));
    notifsAccRejBtn.addEventListener('click', (event) => showNotifsAccRej(event, notifs, notifsAccRejBtn));
    settingsBtn.addEventListener('click', () => loadnhistory('settings'));
    addNewFriendShowBtn?.addEventListener('click', () => showAddNewFriendPopup(sidePanel));
    addNewFriendCloseBtn?.addEventListener('click', () => closeAddNewFriendPopup(sidePanel));
    messagesBtn?.addEventListener('click', () => loadnhistory('messages'));
    openSidePanelBtn?.addEventListener('click', (event) => openSidePanel(event, sidePanel));
    closeSidePanelBtn?.addEventListener('click', (event) => closeSidePanel(event, sidePanel));
    document.addEventListener('click', (event) => panelOutsideClick(event, sidePanel));
    friendsBtn?.forEach((element) => {
        element.addEventListener('click', showFriendsList);
    });
    historyBtn?.forEach((element) => {
        element.addEventListener('click', showHistoryList);
    });
    localBtn?.addEventListener('click', () => selectLocal(localBtn, onlineBtn, tournTitle, createTournPageBtn, hostTournPageBtn));
    onlineBtn?.addEventListener('click', () => selectOnline(localBtn, onlineBtn, tournTitle, createTournPageBtn, hostTournPageBtn));
    createTournPageBtn?.addEventListener('click', () => loadnhistory('createtourn'));
    hostTournPageBtn?.addEventListener('click', () => loadnhistory('hosttourn'));
    playWFriendsBtn?.addEventListener('click', () => loadnhistory('localgame'));
}
;
function showNotifications(event, notifs) {
    event?.stopPropagation();
    if (notifs.classList.contains('hidden')) {
        notifs.classList.remove('hidden');
        notifs.classList.add('flex');
        document.addEventListener('click', (event) => notifsOutsideClick(event, notifs));
        document.addEventListener('scroll', (event) => {
            if (!notifs.contains(event.target)) {
                notifs.classList.remove('flex');
                notifs.classList.add('hidden');
            }
        });
    }
    else {
        notifs.classList.remove('flex');
        notifs.classList.add('hidden');
    }
}
;
function notifsOutsideClick(event, notifs) {
    event?.stopPropagation();
    if (!notifs.contains(event.target)) {
        notifs.classList.remove('flex');
        notifs.classList.add('hidden');
    }
}
;
function showNotifsAccRej(event, notifs, notifsAccRejBtn) {
    event?.stopPropagation();
    const notifsaccRejBox = document.getElementById('notifsaccRejBox');
    const notifsText = document.getElementById('notifsText');
    if (notifsaccRejBox.classList.contains('translate-x-full')) {
        notifsaccRejBox.classList.remove('translate-x-full', 'opacity-0');
        notifsText.classList.add('opacity-0');
        notifsAccRejBtn.classList.add('rotate-180');
        notifs.addEventListener('scroll', () => {
            notifsaccRejBox.classList.add('translate-x-full', 'opacity-0');
            notifsText.classList.remove('opacity-0');
            notifsAccRejBtn.classList.remove('rotate-180');
        });
    }
    else {
        notifsaccRejBox.classList.add('translate-x-full', 'opacity-0');
        notifsText.classList.remove('opacity-0');
        notifsAccRejBtn.classList.remove('rotate-180');
    }
}
;
function showAddNewFriendPopup(sidePanel) {
    const toBlur = document.getElementById('toBlur');
    const toPop = document.getElementById('toPop');
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
function selectLocal(localBtn, onlineBtn, tournTitle, createTournPageBtn, hostTournPageBtn) {
    localBtn?.classList.add('bg-gray-600');
    localBtn?.classList.remove('hover:bg-gray-500');
    onlineBtn?.classList.add('hover:bg-gray-500');
    onlineBtn?.classList.remove('bg-gray-600');
    tournTitle.classList.add('opacity-30');
    createTournPageBtn.inert = true;
    hostTournPageBtn.inert = true;
    createTournPageBtn.classList.add('opacity-30');
    hostTournPageBtn.classList.add('opacity-30');
}
;
function selectOnline(localBtn, onlineBtn, tournTitle, createTournPageBtn, hostTournPageBtn) {
    onlineBtn?.classList.add('bg-gray-600');
    onlineBtn?.classList.remove('hover:bg-gray-500');
    localBtn?.classList.add('hover:bg-gray-500');
    localBtn?.classList.remove('bg-gray-600');
    tournTitle.classList.remove('opacity-30');
    createTournPageBtn.inert = false;
    hostTournPageBtn.inert = false;
    createTournPageBtn.classList.remove('opacity-30');
    hostTournPageBtn.classList.remove('opacity-30');
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
function panelOutsideClick(event, sidePanel) {
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
export function handleScroll() {
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
