export class notificationHeader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML =
            `<header class="header_notif max-635:px-14 px-24 lg:px-32">
			<button data-page="home" title="Home" class="home-btn logo_notif transition-transform duration-300 hover:scale-110">
				<img class="logo-pic_notif" src="../public/logos/pingpong_racket.png">
				<div class="logo-name_notif">
					<p class="logo-name1_notif">
						PingPong.io
					</p>
					<p class="hero_notif">
						Table Heroes
					</p>
				</div>
			</button data-page="home" title="Home">
			<div class="center_notif">
			</div>
			<div class="sign-bt_notif">
				<button class="log-in-bt1_notif">
					<img class="user_header_pic" src="../public/profile_pictures/htouil.jpeg">
					<p class="user_name_header">
						alotfi
					</p>
					<img class="user_notification_header" src="../public/logos/bell.svg">
				</button>
			</div>
		</header>`;
    }
}
;
