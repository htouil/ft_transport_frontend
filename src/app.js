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
            const panel = document.getElementById('friends-panel');
            // const otherbtn = document.querySelectorAll('.other-btn') as NodeListOf<HTMLAnchorElement>;
            openbtn === null || openbtn === void 0 ? void 0 : openbtn.addEventListener('click', (e) => {
                e.stopPropagation();
                panel === null || panel === void 0 ? void 0 : panel.classList.remove('translate-x-full');
            });
            closebtn === null || closebtn === void 0 ? void 0 : closebtn.addEventListener('click', (e) => {
                e.stopPropagation();
                panel === null || panel === void 0 ? void 0 : panel.classList.add('translate-x-full');
            });
            document.addEventListener('click', (e) => {
                if (panel && !panel.contains(e.target) && e.target !== openbtn)
                    panel === null || panel === void 0 ? void 0 : panel.classList.add('translate-x-full');
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
