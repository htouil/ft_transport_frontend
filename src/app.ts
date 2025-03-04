let app: HTMLElement;
let navBar: HTMLElement | null;
let navBtns: NodeListOf<HTMLElement> | null;
let msgBtn: HTMLElement | null;
let homeBtn: HTMLElement | null;
let onlineBtn: HTMLElement | null;
let localBtn: HTMLElement | null;
let sidePanel: HTMLElement | null;
let openBtn: HTMLElement | null;
let closeBtn: HTMLElement | null;
let friendsBtn: NodeListOf<Element> | null;
let historyBtn: NodeListOf<Element> | null;
let friendsList: NodeListOf<Element> | null;
let historyList: NodeListOf<Element> | null;
let returnBtn: HTMLElement | null;

document.addEventListener('DOMContentLoaded', () => {
	app = document.getElementById('app')!;
	navBar = document.querySelector('nav');
	navBtns = document.querySelectorAll('.nav-btn');

	const urlParams = new URLSearchParams(window.location.search);
    const initialPage = urlParams.get('page') || 'home';

	console.log(`here: ${initialPage}`);
	history.replaceState({ page: initialPage }, '', `?page=${initialPage}`);
	loadPage(initialPage);
	navBtns.forEach((button: HTMLElement) =>
	{
		button.addEventListener('click', () =>
		{
			const page = button.dataset.page!;
			loadPage(page);
			history.pushState({ page }, '', `?page=${page}`);
		});
	});
	window.onpopstate = (event: PopStateEvent) => {
		// console.log(`load: ${event.state?.page}`);
		if (event.state?.page) {
			loadPage(event.state.page);
		}
	};
});

const loadPage = async (page: string) => {
	try {
		const response = await fetch(`pages/${page}.html`);
		const content = await response.text();
		app.innerHTML = content;
		// console.log(`nav to: ${page}`);
		hideNav(page);
		if (page === 'profil')
		{
			setupProfilButtons();
			handleScroll();
		}
		if (page === 'messages')
		{
			setupMessagesButtons();
		}
	}
	catch (error)
	{
		app.innerHTML = `<p class="text-red-500">Page not found.</p>`;
	}
};

const hideNav = (page: string) =>
{
	if (navBar)
	{
		if (page === 'home')
			navBar.classList.remove('hidden');
		else if (page === 'profil' || page === 'messages')
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

	msgBtn?.addEventListener('click', () => {
		loadPage('messages');
		history.pushState({ page: 'messages' }, '', '?page=messages');
	});
	homeBtn?.addEventListener('click', () => {
		loadPage('home');
		history.pushState({ page: 'home' }, '', '?page=home');
	});
	localBtn?.addEventListener('click', selectLocal);
	onlineBtn?.addEventListener('click', selectOnline);
	openBtn?.addEventListener('click', openSidePanel);
	closeBtn?.addEventListener('click', closeSidePanel);
	document.addEventListener('click', handleOutsideClick);
	friendsBtn?.forEach((element) => {
		element.addEventListener('click', showFriendsList);
	});
	historyBtn?.forEach((element) => {
		element.addEventListener('click', showHistoryList);
	});
};

const selectLocal = () => {
	localBtn?.classList.add('game-btn');
	localBtn?.classList.remove('hover:bg-gray-500');
	onlineBtn?.classList.remove('game-btn');
	onlineBtn?.classList.add('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
	localBtn?.classList.remove('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
};
//remove focus when game mode button selected
const selectOnline = () => {
	onlineBtn?.classList.add('game-btn');
	onlineBtn?.classList.remove('hover:bg-gray-500');
	localBtn?.classList.remove('game-btn');
	localBtn?.classList.add('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
	onlineBtn?.classList.remove('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
};

const openSidePanel = (e: Event) => {
	e.stopPropagation();
	sidePanel?.classList.remove('translate-x-full');
	document.body.classList.add('overflow-hidden');
	showFriendsList();
};

const closeSidePanel = (e?: Event) => {
	e?.stopPropagation();
	sidePanel?.classList.add('translate-x-full');
	document.body.classList.remove('overflow-hidden');
};

const handleOutsideClick = (e: Event) => {
	if (sidePanel && !sidePanel.contains(e.target as Node) && e.target !== openBtn)
	closeSidePanel();
};

const showFriendsList = () => {
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
};

const showHistoryList = () => {
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
};

//SCROLLABLES:
const handleScroll = () => {
	let scrollables = document.querySelectorAll('.scrollable');
	
	scrollables?.forEach((element) => {
		let timeout: NodeJS.Timeout = setTimeout(() => {}, 0);

		element.addEventListener('scroll', () => showScrollbar(element as HTMLElement, timeout));
		hideScrollbar(element as HTMLElement);
	});
};

const showScrollbar = (element: HTMLElement, timeout: NodeJS.Timeout) => {
	element.classList.remove('scrollbar-none');
	clearTimeout(timeout);
	timeout = setTimeout(() => hideScrollbar(element), 1500);
};

const hideScrollbar = (element: HTMLElement) => {
	element.classList.add('scrollbar-none');
};

const setupMessagesButtons = () => {
	returnBtn = document.querySelector('.return-btn');

	returnBtn?.addEventListener('click', () => {
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
