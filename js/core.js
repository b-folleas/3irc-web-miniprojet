/* Adding clone elements */

let registerUname;
let registerEmail;
let registerPasswd;
let registerConfirmation;
let registerBtn;
let loginUname;
let loginEmail;
let loginBtn;
let registerCheck;
let registerCheckIcon;
let profileBtn;

window.addEventListener("load", function () {
	document.getElementById("title").innerHTML = `<h1>Sogni de Scapari - Agence de voyage</h1>`

	document.getElementById("topnav").innerHTML =
		`<a href="./index.html"><i class="home fa fa-home"></i></a>
	<a href="./cart.html"><i class="fa fa-shopping-cart"></i>Panier</a>
	<a href="./booking.html"><i class="fa fa-check"></i>Réservations</a>
	<a href="./index.html"><i class="fa fa-map"></i>Destinations</a>
	<a href="#" id="modal-btn" onclick="openModalFunction()"><i class="fa fa-window-restore"></i>Ouvrir Modal</a>
  	<a class="profile" id="profile-btn"><img id="img-icon"
			src="./assets/images/ghost.png" alt="Photo de profil">Mon Profil</a>
	<a href="javascript:void(0);" class="icon" onclick="displayResponsiveFunction()">
		<i class="fa fa-bars"></i>
	</a>`;

	document.getElementById("footer").innerHTML =
		`<div class="footer-links">
        <a class="facebook-link" href="#"><i class="fa fa-facebook" title="Retrouvez-nous sur Facebook !"></i></a>
        <a class="twitter-link" href="#"><i class="fa fa-twitter" title="Retrouvez-nous sur Twitter !"></i></a>
        <a class="linkedin-link" href="#"><i class="fa fa-linkedin" title="Retrouvez-nous sur Linkedin !"></i></a>
        <a class="github-link" href="https://github.com/AmazingBrice/miniprojet"><i class="fa fa-github"
            title="Retrouvez-nous sur Github !"></i></a>
    </div>
    <div class="footer-left">
        <span>
            <a class="footer-a" href="./about.html">À propos</a>
            <a class="footer-a" href="./about.html">Plus d'infos</a>
        </span>
        <p>miniprojet &copy; 2020</p>
    </div>`;

	document.getElementById("connection-modal").innerHTML =
		`<div class="login">
		<span class="close" onclick="closeModalFunction()">&times;</span>
		<h1>Vous devez d'abord vous connecter !</h1>
		<div class="tabs">
			<div class="tab active" id="register_btn" onclick="switchLoginFunction(this)">s'enregistrer</div>
			<div class="tab" id="login_btn" onclick="switchLoginFunction(this)">se connecter</div>
		</div>
		<!-- Register form -->
		<form id="register-tabs">
			<div class="input">
				<input class="uname" id="register-username" type="text" name="register-username" required title="Votre nom d'utilisateur doit contenir au minimum 4 caractères."/>
				<label for="register-username">nom d'utilisateur</label>
			</div>
			<div class="input">
				<input class="email" id="register-email" type="email" name="register-email" required title="Votre adresse email doit être valide (exemple@domaine.com)."/>
				<label for="register-email">email</label>
			</div>
			<div class="input">
				<input class="input-passwd" id="register-password" type="password" name="password" required title="Votre mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial (#, !, ?, @, etc...)"/>
				<label for="register-password">mot de passe</label>
			</div>
			<div class="input">
				<input class="input-passwd" id="confirm-password" type="password" name="confirm-password" required />
				<label for="password">validation mot de passe</label>
			</div>
			<div class="checking">
				<input id="register-check" type="checkbox" class="check" checked>
				<label for="register-check"><span id="register-check-icon" class="icon"></span>J'accepte et certifie avoir lu les conditions
					d'utilisation.</label>
			</div>
			<button class="btn" id="register-btn">Créer un compte</button>
			<a id="member">Déjà membre ?</a>
		</form>
		<!-- Login form -->
		<form id="login-tabs">
			<div class="input">
				<input id="login-email" type="text" name="login-username" required />
				<label for="login-username">nom d'utilisateur ou email</label>
			</div>
			<div class="input">
				<input id="login-password" type="password" name="login-password" required />
				<label for="login-password">mot de passe</label>
			</div>
			<div class="checking">
				<input id="login-check" type="checkbox" class="check" checked>
				<label for="login-check"><span class="icon"></span>Rester connecté</label>
			</div>
			<button class="btn" id="login-btn">se connecter</button>
			<a class="forgot">Mot de passe oublié ?</a>
		</form>
	</div>`

	// Get the login form fields once they are loaded
	registerUname = document.getElementById("register-username");
	registerEmail = document.getElementById("register-email");
	registerCheck = document.getElementById("register-check");
	registerPasswd = document.getElementById("register-password");
	registerConfirmation = document.getElementById("confirm-password");
	registerCheckIcon = document.getElementById("register-check-icon");
	registerBtn = document.getElementById("register-btn");
	loginEmail = document.getElementById("login-email");
	loginBtn = document.getElementById("login-btn");
	profileBtn = document.getElementById("profile-btn");

	// Display the value if not null to user
	if (localStorage.getItem("email")) {
		loginEmail.setAttribute("value", localStorage.getItem("email"));
	}

	// Add user general data to localStorage
	registerBtn.addEventListener("click", function (event) {

		console.log(registerCheck.checked);
		if (registerCheck.checked == false) {
			console.log("Les conditions d'utilisations n'ont pas été acceptées");
			registerCheckIcon.style.border = "2px solid red";
		}
		else if (!registerUname.value) {
			registerUname.style.border = "2px solid red";
			console.log("Le nom d'utilisateur est manquant");
		}
		else if (!registerEmail.value) {
			registerEmail.style.border = "2px solid red";
			console.log("L'adresse email est manquante");
		}
		else if (!registerPasswd.value) {
			registerPasswd.style.border = "2px solid red";
			console.log("Le mot de passe est manquant");
		}
		else if (!registerConfirmation.value) {
			registerConfirmation.style.border = "2px solid red";
			console.log("La confirmation du mot de passe est manquante");
		}
		else {
			localStorage.setItem("uname", registerUname.value);
			console.log("Mis à jour username : " + localStorage.getItem("uname"));
			localStorage.setItem("email", registerEmail.value);
			console.log("Mis à jour email : " + localStorage.getItem("email"));
			window.location.assign("./profile.html");

		}
	});

loginBtn.addEventListener("click", function () {
	localStorage.setItem("email", loginEmail.value);
	window.location.assign("./profile.html");
});


profileBtn.addEventListener("click", function () {
	if (localStorage.getItem("email")) {
		window.location.assign("./profile.html");
	}
	else {
		openModalFunction();
	}
});
});

// Get general elements of the modal
const modal = document.getElementById("connection-modal");
const login_btn = document.getElementById("modal-btn");
const register_content = document.getElementById("register-tabs");
const login_content = document.getElementById("login-tabs");

// Open / close modal 
function openModalFunction() {
	modal.style.display = "block";
}

function closeModalFunction() {
	modal.style.display = "none";
}

// Switch modal display
function switchLoginFunction(event) {
	if (!event.classList.contains("active")) {
		if (event.id === "login_btn") {
			document.getElementById("register-tabs").style.display = "none";
			document.getElementById("login-tabs").style.display = "block";
			document.getElementById("register_btn").classList.remove("active");
		}
		else if (event.id === "register_btn") {
			document.getElementById("login-tabs").style.display = "none";
			document.getElementById("register-tabs").style.display = "block";
			document.getElementById("login_btn").classList.remove("active");
		}
		event.classList.add("active");
	}
}

function displayResponsiveFunction() {
	var x = document.getElementById("topnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}


