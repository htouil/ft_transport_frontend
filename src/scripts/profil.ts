import { constrainedMemory } from 'process';
import { loadnhistory } from './app.js';

let friendsBtn: NodeListOf<HTMLButtonElement> | null;
let historyBtn: NodeListOf<HTMLButtonElement> | null;
let friendsList: NodeListOf<HTMLElement> | null;
let historyList: NodeListOf<HTMLElement> | null;

export async function	setupProfilPage() {
	try
	{
		const playerName = await fetchPlayerName();
		const iPlayerName = document.getElementById('iPlayerName') as HTMLSpanElement;

		if (iPlayerName)
			iPlayerName.textContent = playerName;
	}
	catch(error)
	{
		console.error("Failed to fatch for Player's name2: ", error);
	}
};

async function	fetchPlayerName() {
	try
	{
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
			credentials : 'include'
		});

		console.log("response:", response);
		if (!response.ok)
			throw new Error("Failed to fetch for yhe player's Data");
		const data = await response.json();

		return (data.name);
	}
	catch (error)
	{
		console.error("Failed to fetch for the player's name1: ", error);
		return ('Player');
	}
};

export function	setupProfilButtons() {
	const homeBtn = document.querySelector('.home-btn') as HTMLButtonElement;
	const notifsBtn = document.getElementById('notifsBtn') as HTMLButtonElement;
	const notifsPanel = document.getElementById('notifsPanel') as HTMLElement
	const notifs = document.getElementById('notifs') as HTMLElement;
	const notifsAccRejBtn = document.getElementById('notifsAccRejBtn') as HTMLButtonElement;
	const settingsBtn = document.querySelector('.settings-btn') as HTMLButtonElement;
	const addNewFriendShowBtn = document.getElementById('addNewFriendShowBtn') as HTMLButtonElement;
	const addNewFriendCloseBtn = document.getElementById('addNewFriendCloseBtn') as HTMLButtonElement;
	const messagesBtn = document.getElementById('messagesBtn') as HTMLButtonElement;
	const sidePanel = document.getElementById('sidePanel') as HTMLElement;
	const openSidePanelBtn = document.getElementById('openSidePanelBtn') as HTMLButtonElement;
	const closeSidePanelBtn = document.getElementById('closeSidePanelBtn') as HTMLButtonElement;
	friendsBtn = document.querySelectorAll('.friends-btn') as NodeListOf<HTMLButtonElement>;
	historyBtn = document.querySelectorAll('.history-btn') as NodeListOf<HTMLButtonElement>;
	friendsList = document.querySelectorAll('.friends-list') as NodeListOf<HTMLElement>;
	historyList = document.querySelectorAll('.history-list') as NodeListOf<HTMLElement>;
	const localBtn = document.getElementById('local-btn') as HTMLButtonElement;
	const onlineBtn = document.getElementById('online-btn') as HTMLButtonElement;
	const playWFriendsBtn = document.getElementById('playWFriendsBtn') as HTMLButtonElement;
	const tournTitle = document.getElementById('tournTitle') as HTMLElement;
	const createTournPageBtn = document.getElementById('createTournPageBtn') as HTMLButtonElement;
	const hostTournPageBtn = document.getElementById('hostTournPageBtn') as HTMLButtonElement;
	
	homeBtn.addEventListener('click', () => loadnhistory('home'));
	notifsBtn.addEventListener('click', (event) => showNotifications(event, notifsPanel));
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
};

function	showNotifications(event: Event, notifsPanel: HTMLElement) {
	event?.stopPropagation();

	if (notifsPanel.classList.contains('hidden'))
	{
		notifsPanel.classList.remove('hidden');
		notifsPanel.classList.add('flex');
		document.addEventListener('click', (event) => notifsOutsideClick(event, notifsPanel));
		document.addEventListener('scroll', (event) => {
			if (!notifsPanel.contains(event.target as Node))
			{
				notifsPanel.classList.remove('flex');
				notifsPanel.classList.add('hidden');
			}
		});
	}
	else
	{
		notifsPanel.classList.remove('flex');
		notifsPanel.classList.add('hidden');
	}
};

function	notifsOutsideClick(event: Event, notifsPanel: HTMLElement) {
	event?.stopPropagation();
	if (!notifsPanel.contains(event.target as Node))
	{
		notifsPanel.classList.remove('flex');
		notifsPanel.classList.add('hidden');
	}
};

function	showNotifsAccRej(event: Event, notifs: HTMLElement, notifsAccRejBtn: HTMLButtonElement) {
	event?.stopPropagation();
	const notifsaccRejBox = document.getElementById('notifsaccRejBox') as HTMLElement;
	const notifsText = document.getElementById('notifsText') as HTMLParagraphElement

	if (notifsaccRejBox.classList.contains('translate-x-full'))
	{
		notifsaccRejBox.classList.remove('translate-x-full', 'opacity-0');
		notifsText.classList.add('opacity-0');
		notifsAccRejBtn.classList.add('rotate-180');
		notifs.addEventListener('scroll', () => {
			// event.stopPropagation();
			// event.preventDefault();
			notifsaccRejBox.classList.add('translate-x-full', 'opacity-0');
			notifsText.classList.remove('opacity-0');
			notifsAccRejBtn.classList.remove('rotate-180');
		});
	}
	else
	{
		notifsaccRejBox.classList.add('translate-x-full', 'opacity-0');
		notifsText.classList.remove('opacity-0');
		notifsAccRejBtn.classList.remove('rotate-180');
	}
};

function	showAddNewFriendPopup(sidePanel: HTMLElement) {
	const toBlur = document.getElementById('toBlur') as HTMLElement;
	const toPop = document.getElementById('toPop') as HTMLElement;

	toBlur.inert = true;
	toBlur.classList.add('blur-sm');
	toPop.classList.remove('hidden');
	toPop.classList.add('flex');
	sidePanel?.classList.remove('block');
	sidePanel?.classList.add('hidden');
};

function	closeAddNewFriendPopup(sidePanel: HTMLElement) {
	const toBlur = document.getElementById('toBlur') as HTMLElement;
	const toPop = document.getElementById('toPop') as HTMLElement;

	toBlur.inert = false;
	toBlur.classList.remove('blur-sm');
	toPop.classList.add('hidden');
	toPop.classList.remove('flex');
	sidePanel?.classList.add('block');
	sidePanel?.classList.remove('hidden');
}

function	selectLocal(localBtn: HTMLButtonElement, onlineBtn: HTMLButtonElement, tournTitle:HTMLElement, createTournPageBtn: HTMLButtonElement, hostTournPageBtn: HTMLButtonElement) {
	localBtn?.classList.add('bg-gray-600');
	localBtn?.classList.remove('hover:bg-gray-500');
	onlineBtn?.classList.add('hover:bg-gray-500');
	onlineBtn?.classList.remove('bg-gray-600');
	tournTitle.classList.add('opacity-30');
	createTournPageBtn.inert = true;
	hostTournPageBtn.inert = true;
	createTournPageBtn.classList.add('opacity-30');
	hostTournPageBtn.classList.add('opacity-30');
};

function	selectOnline(localBtn: HTMLButtonElement, onlineBtn: HTMLButtonElement, tournTitle:HTMLElement, createTournPageBtn: HTMLButtonElement, hostTournPageBtn: HTMLButtonElement) {
	onlineBtn?.classList.add('bg-gray-600');
	onlineBtn?.classList.remove('hover:bg-gray-500');
	localBtn?.classList.add('hover:bg-gray-500');
	localBtn?.classList.remove('bg-gray-600');
	tournTitle.classList.remove('opacity-30');
	createTournPageBtn.inert = false;
	hostTournPageBtn.inert = false;
	createTournPageBtn.classList.remove('opacity-30');
	hostTournPageBtn.classList.remove('opacity-30');
};

function	openSidePanel(event: Event, sidePanel: HTMLElement) {
	event?.stopPropagation();
	sidePanel?.classList.remove('translate-x-full');
	// document.body.classList.add('overflow-hidden');
	showFriendsList();
};

function	closeSidePanel(event: Event, sidePanel: HTMLElement) {
	event?.stopPropagation();
	sidePanel?.classList.add('translate-x-full');
	// document.body.classList.remove('overflow-hidden');
};

function	panelOutsideClick(event: Event, sidePanel: HTMLElement) {
	if (sidePanel && !sidePanel.contains(event.target as Node))
		closeSidePanel(event, sidePanel);
};

function	showFriendsList() {
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

function	showHistoryList() {
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

export function	handleScroll() {
	const scrollables = document.querySelectorAll('.scrollable') as NodeListOf<HTMLElement>;
	
	scrollables?.forEach((element) => {
		let timeout: NodeJS.Timeout = setTimeout(() => {}, 0);
		
		element.addEventListener('scroll', () => showScrollbar(element as HTMLElement, timeout));
		hideScrollbar(element as HTMLElement);
	});
};

function	showScrollbar(element: HTMLElement, timeout: NodeJS.Timeout) {
	element.classList.remove('scrollbar-none');
	clearTimeout(timeout);
	timeout = setTimeout(() => hideScrollbar(element), 1500);
};

function	hideScrollbar(element: HTMLElement) {
	element.classList.add('scrollbar-none');
};