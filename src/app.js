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
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const navBtn = document.querySelectorAll('.nav-btn');
    const navBar = document.querySelector('nav');
    const loadPage = (page) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`pages/${page}.html`);
            const content = yield response.text();
            app.innerHTML = content;
            hideNav(page);
            const openbtn = document.getElementById('open-btn');
            const closebtn = document.getElementById('close-btn');
            const side_panel = document.getElementById('friends-panel');
            const frs_btn = document.getElementById('friends-btn');
            const htr_btn = document.getElementById('history-btn');
            const frs_list = document.getElementById('friends-list');
            const htr_list = document.getElementById('history-list');
            openbtn === null || openbtn === void 0 ? void 0 : openbtn.addEventListener('click', (e) => {
                e.stopPropagation();
                side_panel === null || side_panel === void 0 ? void 0 : side_panel.classList.remove('translate-x-full');
                document.body.classList.add('overflow-hidden');
                frs_list === null || frs_list === void 0 ? void 0 : frs_list.classList.remove('hidden');
                htr_list === null || htr_list === void 0 ? void 0 : htr_list.classList.add('hidden');
            });
            closebtn === null || closebtn === void 0 ? void 0 : closebtn.addEventListener('click', (e) => {
                e.stopPropagation();
                side_panel === null || side_panel === void 0 ? void 0 : side_panel.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
            });
            document.addEventListener('click', (e) => {
                if (side_panel && !side_panel.contains(e.target) && e.target !== openbtn) {
                    side_panel === null || side_panel === void 0 ? void 0 : side_panel.classList.add('translate-x-full');
                    document.body.classList.remove('overflow-hidden');
                }
            });
            frs_btn === null || frs_btn === void 0 ? void 0 : frs_btn.addEventListener('click', () => {
                frs_list === null || frs_list === void 0 ? void 0 : frs_list.classList.remove('hidden');
                htr_list === null || htr_list === void 0 ? void 0 : htr_list.classList.add('hidden');
            });
            htr_btn === null || htr_btn === void 0 ? void 0 : htr_btn.addEventListener('click', () => {
                htr_list === null || htr_list === void 0 ? void 0 : htr_list.classList.remove('hidden');
                frs_list === null || frs_list === void 0 ? void 0 : frs_list.classList.add('hidden');
            });
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
    navBtn.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.dataset.page;
            console.log(`Navigating to: ${page}`);
            loadPage(page);
        });
    });
    loadPage('home');
});
// document.addEventListener('click', (e) =>
// {
// 	const otherbtn = (e.target as HTMLElement).closest('.other-btn');
// 	const activeButton = document.querySelector('.other-btn:focus, .other-btn:hover, .other-btn:active') as HTMLElement | null;
// 	if (panel && !panel.contains(e.target as Node))
// 	{
// 		if (!otherbtn)
// 			panel.classList.add('translate-x-full');
// 		else
// 		{
// 			if (!(panel?.classList.contains('translate-x-full')))
// 			{
// 				e.preventDefault();
// 			}
// 			panel?.classList.add('translate-x-full');
// 		}
// 		if (activeButton)
// 		{
// 			activeButton.blur();
// 			activeButton.style.pointerEvents = 'none';
// 			setTimeout(() => {
// 				activeButton.style.pointerEvents = '';
// 			}, 10);
// 			// activeButton.classList.remove('hover', 'focus', 'active');
// 		}
// 	}
// });
// history.replaceState()
