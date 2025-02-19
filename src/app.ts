document.addEventListener('DOMContentLoaded', () =>
{
	const app = document.getElementById('app')!;
	const navBtn = document.querySelectorAll('.nav-btn');
	const navBar = document.querySelector('nav');
	
	const loadPage = async (page: string) =>
	{
		try {
			const response = await fetch(`pages/${page}.html`);
			const content = await response.text();
			app.innerHTML = content;
			hideNav(page);
			document.getElementById('open-btn')?.addEventListener('click', openPanel);
			document.getElementById('close-btn')?.addEventListener('click', closePanel);
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

	navBtn.forEach(button =>
	{
		button.addEventListener('click', () =>
		{
			const page = (button as HTMLElement).dataset.page!;
			console.log(`Navigating to: ${page}`);
			loadPage(page);
		});	
	});	
	loadPage('profil');
});	

function openPanel(): void {
	const panel = document.getElementById('friends-panel');
	if (panel) {
	  panel.classList.remove('translate-x-full');
	}
}
  
function closePanel(): void {
	const panel = document.getElementById('friends-panel');
	if (panel) {
	  panel.classList.add('translate-x-full');
	}
}
