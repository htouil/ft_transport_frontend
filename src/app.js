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
let msgBtn;
let homeBtn;
let onlineBtn;
let localBtn;
let sidePanel;
let openBtn;
let closeBtn;
let friendsBtn;
let historyBtn;
let friendsList;
let historyList;
//messages page:
let returnBtn;
//host tournament page:
let hostTournBtn;
document.addEventListener('DOMContentLoaded', () => {
    app = document.getElementById('app');
    navBar = document.querySelector('nav');
    navBtns = document.querySelectorAll('.nav-btn');
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = urlParams.get('page') || 'home';
    console.log(`here: ${initialPage}`);
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
        // console.log(`nav to: ${page}`);
        hideNav(page);
        if (page === 'profil') {
            setupProfilButtons();
            handleScroll();
        }
        if (page === 'messages') {
            setupMessagesButtons();
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
        else if (page === 'profil' || page === 'messages' || page === 'hosttourn')
            navBar.classList.add('hidden');
    }
};
//BUTTONS:
const setupProfilButtons = () => {
    localBtn = document.getElementById('local-btn');
    onlineBtn = document.getElementById('online-btn');
    sidePanel = document.getElementById('friends-panel');
    openBtn = document.getElementById('open-btn');
    closeBtn = document.getElementById('close-btn');
    friendsBtn = document.querySelectorAll('.friends-btn');
    historyBtn = document.querySelectorAll('.history-btn');
    friendsList = document.querySelectorAll('.friends-list');
    historyList = document.querySelectorAll('.history-list');
    msgBtn = document.querySelector('.msg-btn');
    homeBtn = document.querySelector('.home-btn');
    hostTournBtn = document.querySelector('.host-tourn-btn');
    msgBtn === null || msgBtn === void 0 ? void 0 : msgBtn.addEventListener('click', () => {
        loadPage('messages');
        history.pushState({ page: 'messages' }, '', '?page=messages');
    });
    homeBtn === null || homeBtn === void 0 ? void 0 : homeBtn.addEventListener('click', () => {
        loadPage('home');
        history.pushState({ page: 'home' }, '', '?page=home');
    });
    hostTournBtn === null || hostTournBtn === void 0 ? void 0 : hostTournBtn.addEventListener('click', () => {
        loadPage('hosttourn');
        history.pushState({ page: 'hosttourn' }, '', '?page=hosttourn');
    });
    localBtn === null || localBtn === void 0 ? void 0 : localBtn.addEventListener('click', selectLocal);
    onlineBtn === null || onlineBtn === void 0 ? void 0 : onlineBtn.addEventListener('click', selectOnline);
    openBtn === null || openBtn === void 0 ? void 0 : openBtn.addEventListener('click', openSidePanel);
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', closeSidePanel);
    document.addEventListener('click', handleOutsideClick);
    friendsBtn === null || friendsBtn === void 0 ? void 0 : friendsBtn.forEach((element) => {
        element.addEventListener('click', showFriendsList);
    });
    historyBtn === null || historyBtn === void 0 ? void 0 : historyBtn.forEach((element) => {
        element.addEventListener('click', showHistoryList);
    });
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
const setupMessagesButtons = () => {
    returnBtn = document.querySelector('.return-btn');
    returnBtn === null || returnBtn === void 0 ? void 0 : returnBtn.addEventListener('click', () => {
        loadPage('profil');
        history.pushState({ page: 'profil' }, '', '?page=profil');
    });
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
