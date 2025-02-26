let app: HTMLElement;
let navBar: HTMLElement | null;
let navBtn: NodeListOf<HTMLElement> | null;
let onlineBtn: HTMLElement | null;
let localBtn: HTMLElement | null;
let sidePanel: HTMLElement | null;
let openBtn: HTMLElement | null;
let closeBtn: HTMLElement | null;
let friendsBtn: HTMLElement | null;
let historyBtn: HTMLElement | null;
let friendsList: HTMLElement | null;
let historyList: HTMLElement | null;

document.addEventListener('DOMContentLoaded', () => {
	app = document.getElementById('app')!;
	navBar = document.querySelector('nav');
	navBtn = document.querySelectorAll('.nav-btn') as NodeListOf<HTMLElement>;
	
	loadPage('profil');
	navBtn.forEach((button) =>
	{
		button.addEventListener('click', () =>
		{
			const page = (button as HTMLElement).dataset.page!;
			// console.log(`Navigating to: ${page}`);
			loadPage(page);
		});
	});
});

const loadPage = async (page: string) => {
	try {
		const response = await fetch(`pages/${page}.html`);
		const content = await response.text();
		app.innerHTML = content;
		hideNav(page);
		setupButtons();
	}
	catch (error)
	{
		app.innerHTML = `<p class="text-red-500">Page not found.</p>`;
	}
};

const hideNav = (page: string) =>
{
	if (navBar && page === 'profil')
	{
		navBar.classList.remove('flex');
		navBar.classList.add('hidden');
	}
};

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

	localBtn?.addEventListener('click', selectLocal);
	onlineBtn?.addEventListener('click', selectOnline);
	openBtn?.addEventListener('click', openSidePanel);
	closeBtn?.addEventListener('click', closeSidePanel);
	document.addEventListener('click', handleOutsideClick);
	friendsBtn?.addEventListener('click', showFriendsList);
	historyBtn?.addEventListener('click', showHistoryList);
};

const selectLocal = () => {
	localBtn?.classList.add('game-btn');
	localBtn?.classList.remove('hover:bg-gray-500');
	onlineBtn?.classList.remove('game-btn');
};
//remove focus when game mode button selected
const selectOnline = () => {
	onlineBtn?.classList.add('game-btn');
	onlineBtn?.classList.remove('hover:bg-gray-500');
	localBtn?.classList.remove('game-btn');
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
	friendsList?.classList.remove('hidden');
	historyList?.classList.add('hidden');
	friendsBtn?.classList.remove('panel-btn');
	friendsBtn?.classList.add('selected-panel-btn');
	historyBtn?.classList.add('panel-btn');
	historyBtn?.classList.remove('selected-panel-btn');
};

const showHistoryList = () => {
	historyList?.classList.remove('hidden');
	friendsList?.classList.add('hidden');
	historyBtn?.classList.remove('panel-btn');
	historyBtn?.classList.add('selected-panel-btn');
	friendsBtn?.classList.add('panel-btn');
	friendsBtn?.classList.remove('selected-panel-btn');
}

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
