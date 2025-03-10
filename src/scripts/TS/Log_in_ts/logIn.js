const newHtmlUp = `
<div class="email_tag">
<div class="names">
  <p class="email_text">
      First Name
    </p>
    <p class="email_text1">
      Last Name
    </p>
</div>
<div class="info">
  <input class="email_input">
  <input class="email_input">
</div>
</div>
<div class="email_tag">
  <p class="email_text">
    Username
  </p>
  <input class="email_input">
</div>
<div class="email_tag">
  <p class="email_text">
    Email
  </p>
  <input class="email_input">
</div>
<div class="password_tag">
<p class="passwordl_text">
  Password
</p>
<div class="password_container">
    <input class="password_input" type="password"">
    <button class="show_ps">
      <img class="visibility_off" src="../public/logos/visibility_eye_off.svg">
    </button>
</div>
</div>
<div class="password_tag">
<p class="passwordl_text">
Confirm Password
</p>
<div class="password_container">
  <input class="password_input" type="password">
  <button class="show_ps">
    <img class="visibility_off" src="../public/logos/visibility_eye_off.svg">
  </button>
</div>
</div>
<button class="sign_bt">
SIGN IN
</button>
</div>`;

const newHtmlIn = `
<div class="email_tag">
<p class="email_text">
  Email
</p>
<input class="email_input">
</div>
<div class="password_tag">
<p class="passwordl_text">
  Password
</p>
<div class="password_container">
    <input class="password_input" type="password">
    <button class="show_ps">
      <img class="visibility_off" src="../public/logos/visibility_eye_off.svg">
    </button>
</div>
</div>
<div class="check">
<input class="check_box" type="checkbox">
<p class="remember_me">
Remember me
</p>
<p class="forgot_ps">
Forgot your password?
</p>
</div>
<button class="sign_bt">
SIGN IN
</button>
<p class="back">
OR USE
</p>
<button class="google_bt">
<img class="google_logo" src="../public/logos/google_logo.svg">
</button>
<div class="creat_acc">
<p class="new">
New to <span class="name_page">PingPong.io</span>
</p>
<p class="creat">
Creat an account 
</p>
</div>
`;

const updateSignupForm = () => {
	function visibility()
	{
		const on = '<img class="visibility_off" src="../public/logos/visibility_eye_on.svg">'
		const off = '<img class="visibility_off" src="../public/logos/visibility_eye_off.svg">'
		const input = document.querySelector('.password_input');

		let btval = document.querySelector('.show_ps');
		
		if(btval.innerHTML === off && input.type === "password")
			{
				btval.innerHTML = on;
				input.type = "text";
			}
			else
			{
				btval.innerHTML = off;
				input.type = "password";
			}
		}
		
		document.querySelector('.show_ps').addEventListener('click', () => {
		visibility();
	});

	document.querySelectorAll('.SIGN_INBT, .SIGN_UPBT').forEach(button => {
		button.addEventListener('click', () => {
			document.querySelectorAll('.SIGN_INBT, .SIGN_UPBT').forEach(btn => {
				btn.classList.remove('line');
			});
			button.classList.add('line');
		});
	});
	
	const leet = document.querySelector('.segv2');
	leet.innerHTML = newHtmlIn; 
	
	document.querySelector('.SIGN_UPBT').addEventListener('click', () =>{
		leet.innerHTML = newHtmlUp;
	});
	
	document.querySelector('.SIGN_INBT').addEventListener('click', () =>{
		leet.innerHTML = newHtmlIn;
	});	
};

module.exports = { newHtmlUp, newHtmlIn, updateSignupForm };
