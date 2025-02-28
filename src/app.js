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
let app;
let navBar;
let navBtn;
let onlineBtn;
let localBtn;
let sidePanel;
let openBtn;
let closeBtn;
let friendsBtn;
let historyBtn;
let friendsList;
let historyList;
document.addEventListener('DOMContentLoaded', () => {
    app = document.getElementById('app');
    navBar = document.querySelector('nav');
    navBtn = document.querySelectorAll('.nav-btn');
    loadPage('profil');
    navBtn.forEach((button) => {
        button.addEventListener('click', () => {
            const page = button.dataset.page;
            // console.log(`Navigating to: ${page}`);
            loadPage(page);
        });
    });
});
const loadPage = (page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`pages/${page}.html`);
        const content = yield response.text();
        app.innerHTML = content;
        hideNav(page);
        setupButtons();
        handleScroll();
    }
    catch (error) {
        app.innerHTML = `<p class="text-red-500">Page not found.</p>`;
    }
});
const hideNav = (page) => {
    if (navBar && page === 'profil') {
        navBar.classList.remove('flex');
        navBar.classList.add('hidden');
    }
};
//BUTTONS:
const setupButtons = () => {
    localBtn = document.getElementById('local-btn');
    onlineBtn = document.getElementById('online-btn');
    sidePanel = document.getElementById('friends-panel');
    openBtn = document.getElementById('open-btn');
    closeBtn = document.getElementById('close-btn');
    friendsBtn = document.getElementById('friends-btn');
    historyBtn = document.getElementById('history-btn');
    friendsList = document.getElementById('friends-list');
    historyList = document.getElementById('history-list');
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.addEventListener('click', selectLocal);
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.addEventListener('click', selectOnline);
    openBtn === null || openBtn === void 0 ? void 0 : openBtn.addEventListener('click', openSidePanel);
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', closeSidePanel);
    document.addEventListener('click', handleOutsideClick);
    friendsBtn === null || friendsBtn === void 0 ? void 0 : friendsBtn.addEventListener('click', showFriendsList);
    historyBtn === null || historyBtn === void 0 ? void 0 : historyBtn.addEventListener('click', showHistoryList);
};
const selectLocal = () => {
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.classList.add('game-btn');
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.classList.remove('hover:bg-gray-500');
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.classList.remove('game-btn');
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.classList.add('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.classList.remove('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
};
//remove focus when game mode button selected
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
    friendsList === null || friendsList === void 0 ? void 0 : friendsList.classList.remove('hidden');
    historyList === null || historyList === void 0 ? void 0 : historyList.classList.add('hidden');
    friendsBtn === null || friendsBtn === void 0 ? void 0 : friendsBtn.classList.remove('panel-btn');
    friendsBtn === null || friendsBtn === void 0 ? void 0 : friendsBtn.classList.add('selected-panel-btn');
    historyBtn === null || historyBtn === void 0 ? void 0 : historyBtn.classList.add('panel-btn');
    historyBtn === null || historyBtn === void 0 ? void 0 : historyBtn.classList.remove('selected-panel-btn');
};
const showHistoryList = () => {
    historyList === null || historyList === void 0 ? void 0 : historyList.classList.remove('hidden');
    friendsList === null || friendsList === void 0 ? void 0 : friendsList.classList.add('hidden');
    historyBtn === null || historyBtn === void 0 ? void 0 : historyBtn.classList.remove('panel-btn');
    historyBtn === null || historyBtn === void 0 ? void 0 : historyBtn.classList.add('selected-panel-btn');
    friendsBtn === null || friendsBtn === void 0 ? void 0 : friendsBtn.classList.add('panel-btn');
    friendsBtn === null || friendsBtn === void 0 ? void 0 : friendsBtn.classList.remove('selected-panel-btn');
};
//SCROLLABLES:
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
////////////////////////////////////////////////////////////
// document.addEventListener('DOMContentLoaded', () =>
// {
// 	const app = document.getElementById('app')!;
// 	const navBtn = document.querySelectorAll('.nav-btn');
// 	const navBar = document.querySelector('nav');
// 	const loadPage = async (page: string) =>
// 	{
// 		try {
// 			const response = await fetch(`pages/${page}.html`);
// 			const content = await response.text();
// 			app.innerHTML = content;
// 			hideNav(page);
// 			const openbtn = document.getElementById('open-btn');
// 			const closebtn = document.getElementById('close-btn');
// 			const side_panel = document.getElementById('friends-panel');
// 			const frs_btn = document.getElementById('friends-btn');
// 			const htr_btn = document.getElementById('history-btn');
// 			const frs_list = document.getElementById('friends-list');
// 			const htr_list = document.getElementById('history-list');
// 			openbtn?.addEventListener('click', (e) =>
// 			{
// 				e.stopPropagation();
// 				side_panel?.classList.remove('translate-x-full');
// 				document.body.classList.add('overflow-hidden');
// 				frs_list?.classList.remove('hidden');
// 				htr_list?.classList.add('hidden');
// 			});
// 			closebtn?.addEventListener('click', (e) =>
// 			{
// 				e.stopPropagation();
// 				side_panel?.classList.add('translate-x-full');
// 				document.body.classList.remove('overflow-hidden');
// 			});
// 			document.addEventListener('click', (e) =>
// 			{
// 				if (side_panel && !side_panel.contains(e.target as Node) && e.target !== openbtn)
// 				{
// 					side_panel?.classList.add('translate-x-full');
// 					document.body.classList.remove('overflow-hidden');
// 				}
// 			});
// 			frs_btn?.addEventListener('click', () =>
// 			{
// 				frs_list?.classList.remove('hidden');
// 				htr_list?.classList.add('hidden');
// 			});
// 			htr_btn?.addEventListener('click', () =>
// 			{
// 				htr_list?.classList.remove('hidden');
// 				frs_list?.classList.add('hidden');
// 			});
// 		}	
// 		catch (error)
// 		{
// 			app.innerHTML = `<p class="text-red-500">Page not found.</p>`;
// 		}
// 	};	
// 	const hideNav = (page: string) =>
// 	{
// 		if (navBar && page === 'profil')
// 		{
// 			navBar.classList.remove('flex');
// 			navBar.classList.add('hidden');
// 		}
// 	};
// 	navBtn.forEach((button) =>
// 	{
// 		button.addEventListener('click', () =>
// 		{
// 			const page = (button as HTMLElement).dataset.page!;
// 			console.log(`Navigating to: ${page}`);
// 			loadPage(page);
// 		});
// 	});
// 	loadPage('home');
// });
// history.replaceState()
