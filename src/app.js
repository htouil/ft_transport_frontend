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
        var _a, _b;
        try {
            const response = yield fetch(`pages/${page}.html`);
            const content = yield response.text();
            app.innerHTML = content;
            hideNav(page);
            (_a = document.getElementById('open-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', openPanel);
            (_b = document.getElementById('close-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', closePanel);
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
    loadPage('profil');
});
function openPanel() {
    const panel = document.getElementById('friends-panel');
    if (panel) {
        panel.classList.remove('translate-x-full');
    }
}
function closePanel() {
    const panel = document.getElementById('friends-panel');
    if (panel) {
        panel.classList.add('translate-x-full');
    }
}
