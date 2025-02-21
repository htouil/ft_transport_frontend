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
			const closebtn = document.getElementById('close-btn');
			const panel = document.getElementById('friends-panel');
			// const otherbtn = document.querySelectorAll('.other-btn') as NodeListOf<HTMLAnchorElement>;

			openbtn?.addEventListener('click', (e) =>
			{
				e.stopPropagation();
				panel?.classList.remove('translate-x-full');
			});

			closebtn?.addEventListener('click', (e) =>
			{
				e.stopPropagation();
				panel?.classList.add('translate-x-full');
			});

			document.addEventListener('click', (e) =>
			{
				if (panel && !panel.contains(e.target as Node) && e.target !== openbtn)
					panel?.classList.add('translate-x-full');
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
