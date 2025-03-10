// home page:
let app: HTMLElement;
let navBar: HTMLElement | null;
let navBtns: NodeListOf<HTMLElement> | null;
//profil page:
let homeBtn: HTMLElement | null;
let settingsBtn: HTMLElement | null;
let msgBtn: HTMLElement | null;
let sidePanel: HTMLElement | null;
let openBtn: HTMLElement | null;
let closeBtn: HTMLElement | null;
let friendsBtn: NodeListOf<Element> | null;
let historyBtn: NodeListOf<Element> | null;
let friendsList: NodeListOf<Element> | null;
let historyList: NodeListOf<Element> | null;
let localBtn: HTMLElement | null;
let onlineBtn: HTMLElement | null;
let hostTournBtn: HTMLElement | null;
//messages page:
let returnBtn: HTMLElement | null;
//host tournament page:

document.addEventListener('DOMContentLoaded', () => {
	app = document.getElementById('app')!;
	navBar = document.querySelector('nav');
	navBtns = document.querySelectorAll('.nav-btn');

	const urlParams = new URLSearchParams(window.location.search);
    const initialPage = urlParams.get('page') || 'signup';

	// console.log(`here:`);
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
		console.log(`nav to: ${page}`);
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
		if (page === 'hosttourn')
		{
			setupHostTournamentPage();
		}
		if (page === 'settings')
		{
			setupSettingsButtons();
		}
		if (page === 'signup')
		{
			// setupSignupPage();
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
		else if (page === 'profil' || page === 'messages' || page === 'hosttourn' || page === 'settings')
			navBar.classList.add('hidden');
	}
};

const loadnhistory = (toLoad: string) => {
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
	
	homeBtn?.addEventListener('click', () => loadnhistory('home'));
	settingsBtn?.addEventListener('click', () => loadnhistory('settings'));
	msgBtn?.addEventListener('click', () => loadnhistory('messages'));
	openBtn?.addEventListener('click', openSidePanel);
	closeBtn?.addEventListener('click', closeSidePanel);
	document.addEventListener('click', handleOutsideClick);
	friendsBtn?.forEach((element) => {
		element.addEventListener('click', showFriendsList);
	});
	historyBtn?.forEach((element) => {
		element.addEventListener('click', showHistoryList);
	});
	localBtn?.addEventListener('click', selectLocal);
	onlineBtn?.addEventListener('click', selectOnline);
	hostTournBtn?.addEventListener('click', () => loadnhistory('hosttourn'));
};

const selectLocal = () => {
	localBtn?.classList.add('game-btn');
	localBtn?.classList.remove('hover:bg-gray-500');
	onlineBtn?.classList.remove('game-btn');
	onlineBtn?.classList.add('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
	localBtn?.classList.remove('active:bg-gray-700 active:outline-none active:ring active:ring-gray-950');
};

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

//Messages page:
const setupMessagesButtons = () => {
	returnBtn = document.querySelector('.rtn-profil-btn');
	
	returnBtn?.addEventListener('click', () => loadnhistory('profil'));
};

//Host Tournament page:
const setupHostTournamentPage = () => {
	returnBtn = document.querySelector('.rtn-profil-btn');

	returnBtn?.addEventListener('click', () => loadnhistory('profil'));
	
	const form = document.getElementById('tournamentForm') as HTMLFormElement;
	
	const images = ["../public/images/cover_1.jpeg", "../public/images/cover_2.jpeg", "../public/images/cover_3.png",
		"../public/images/cover_4.jpeg"];
		let currIndex = 0;
		
		const coverImage = document.getElementById("coverImage");
		const coverImageInput = document.getElementById("coverImageInput") as HTMLInputElement;
		const prevBtn = document.getElementById("prevBtn");
		const nextBtn = document.getElementById("nextBtn");
		
		updateImage(currIndex, coverImage, coverImageInput, images);
		if (form)
			form.addEventListener("submit", validateForm);
		// console.log(`here: ${coverImageInput.value}`);
		prevBtn?.addEventListener('click', () => {
			currIndex = (currIndex - 1 + images.length) % images.length;
			updateImage(currIndex, coverImage, coverImageInput, images);
		});
	nextBtn?.addEventListener('click', () => {
		currIndex = (currIndex + 1) % images.length;
		updateImage(currIndex, coverImage, coverImageInput, images);
	});
};

const updateImage = (index: number, coverImage: HTMLElement, coverImageInput: HTMLInputElement, images: string[]) => {
	coverImage.style.backgroundImage = `url('${images[index]}')`;
	coverImageInput.value = images[index];
};

const validateForm = (event: Event) => {
	event.preventDefault();
	
	const form = event.target as HTMLFormElement;
	const inputs = form.querySelectorAll("input[required]");
	
	let allValid = true;
	inputs.forEach((input: HTMLInputElement) => {
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
	
	returnBtn?.addEventListener('click', () => loadnhistory('profil'));
};
