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
            const otherbtn = document.querySelectorAll('.other-btn');
            openbtn === null || openbtn === void 0 ? void 0 : openbtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (panel)
                    panel.classList.remove('translate-x-full');
            });
            closebtn === null || closebtn === void 0 ? void 0 : closebtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (panel)
                    panel.classList.add('translate-x-full');
            });
            otherbtn === null || otherbtn === void 0 ? void 0 : otherbtn.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (panel && !panel.classList.contains('translate-x-full')) {
                        e.preventDefault();
                        panel.classList.add('translate-x-full');
                    }
                });
            });
            document.addEventListener('click', (e) => {
                if (panel && !panel.contains(e.target))
                    panel.classList.add('translate-x-full');
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
// 			const panel = document.getElementById('friends-panel');
// 			const otherbtn = document.querySelectorAll('.other-btn') as NodeListOf<HTMLAnchorElement> | null;
// 			openbtn?.addEventListener('click', (e) =>
// 			{
// 				e.stopPropagation();
// 				if (panel)
// 					panel.classList.remove('translate-x-full');
// 			});
// 			closebtn?.addEventListener('click', (e) =>
// 			{
// 				e.stopPropagation();
// 				if (panel)
// 					panel.classList.add('translate-x-full');
// 			});
// 			otherbtn?.forEach(btn => {
// 				btn.addEventListener('click', (e) => {
// 					if (panel && !panel.classList.contains('translate-x-full')) {
// 						e.preventDefault();
// 						panel.classList.add('translate-x-full');
// 					}
// 				});
// 			});
// 			document.addEventListener('click', (e) => {
// 				if (panel && !panel.contains(e.target as Node))
// 					panel.classList.add('translate-x-full');
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
// 	navBtn.forEach(button =>
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
