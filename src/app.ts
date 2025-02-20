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
			const openbtn = document.getElementById('open-btn');
			const panel = document.getElementById('friends-panel');
			const otherbtn = document.querySelectorAll('.other-btn') as NodeListOf<HTMLAnchorElement>;

			openbtn?.addEventListener('click', (e) =>
			{
				e.stopPropagation();
				if (panel)
					panel.classList.remove('translate-x-full');
			});

			document.addEventListener('click', (e) =>
			{
				const clicked = (e.target as HTMLElement).closest('.other-btn');

				if (panel && !panel.contains(e.target as Node) && !clicked)
					panel.classList.add('translate-x-full');
				if (clicked)
				{
					e.preventDefault();
					panel?.classList.add('translate-x-full');
				}
			});

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
	loadPage('home');
});	
