


/* Adding clone elements */

document.body.onload = function navig() {
    document.getElementById("topnav").innerHTML = 
    `<a href="./index.html"><i class="home fa fa-home"></i></a>
	<a href="./cart.html"><i class="cart fa fa-shopping-cart"></i>Panier</a>
	<a href="#booking"><i class="cart fa fa-check"></i>Réservations</a>
	<a href="./about.html"><i class="cart fa fa-map"></i>Destinations</a>
	<form class="search-form">
		<input class="search" type="text" placeholder=" Recherchez.."></input>
  </form>
  <a href="#" id="loginBtn" onclick="openModalFunction()" >profil</a>
  <a href="./profile.html" class="profile" id="profileBtn"><img id="img-icon"
			src="./assets/images/ghost-jira-removebg-preview.png" alt="Ghost">Mon Profil</a>
	<a href="javascript:void(0);" class="icon" onclick="displayResponsiveFunction()">
		<i class="fa fa-bars"></i>
	</a>`;
    
    document.getElementById("footer").innerHTML = 
    `<div class="footer-social">
        <a class="facebook-link" href="#"><i class="fa fa-facebook" title="Retrouvez-nous sur Facebook !"></i></a>
        <a class="twitter-link" href="#"><i class="fa fa-twitter" title="Retrouvez-nous sur Twitter !"></i></a>
        <a class="linkedin-link" href="#"><i class="fa fa-linkedin" title="Retrouvez-nous sur Linkedin !"></i></a>
        <a class="github-link" href="https://github.com/AmazingBrice/miniprojet"><i class="fa fa-github"
            title="Retrouvez-nous sur Github !"></i></a>
    </div>
    <div class="footer-left">
        <p class="footer-links">
            <a href="#">A propos</a>
            <a href="#">Contactez-nous</a>
            <a href="#">Plus d'infos</a>
        </p>
        <p>miniprojet &copy; 2020</p>
    </div>`;

    document.getElementById("backToTopDiv").innerHTML = 
    `<button onclick="topFunction()" class="btn" id="backToTopBtn" title="Go to top"><i class="fa fa-arrow-up"></i></button>`;

    document.getElementById("myModal").innerHTML =
    `<div class="login">
		<span class=" close" onclick="closeModalFunction()">&times;</span>
		<h1>Vous devez d'abord vous connecter !</h1>
		<div class="tabs">
			<div class="tab active" id="register_btn" onclick="switchLoginFunction(this)">s'enregistrer</div>
			<div class="tab" id="sign_in_btn" onclick="switchLoginFunction(this)">se connecter</div>
		</div>
		<!-- Register form -->
		<form id="register-tabs">
			<div class="input">
				<input id="register-username" type="text" name="username" required />
				<label for="register-username">nom d'utilisateur</label>
			</div>
			<div class="input">
				<input id="email" type="email" name="email" required />
				<label for="email">email</label>
			</div>
			<div class="input">
				<input id="register-password" type="password" name="password" required />
				<label for="register-password">mot de passe</label>
			</div>
			<div class="input">
				<input id="password-validation" type="password" name="password-validation" required />
				<label for="password">validation mot de passe</label>
			</div>
			<div class="checking">
				<input id="register-check" type="checkbox" class="check" checked>
				<label for="register-check"><span class="icon"></span>J'accepte et certifie avoir lu les conditions
					d'utilisation.</label>
			</div>
			<button class="btn" id="sign-up-btn">Créer un compte</button>
			<a id="member">Déjà membre ?</a>
		</form>
		<!-- Sign in form -->
		<form id="sign_in-tabs">
			<div class="input">
				<input id="username" type="text" name="username" required />
				<label for="username">nom d'utilisateur ou email</label>
			</div>
			<div class="input">
				<input id="password" type="password" name="password" required />
				<label for="password">mot de passe</label>
			</div>
			<div class="checking">
				<input id="checksignin" type="checkbox" class="check" checked>
				<label for="checksignin"><span class="icon"></span>Rester connecté</label>
			</div>
			<button class="btn" id="sign-in-btn">se connecter</button>
			<a class="forgot">Mot de passe oublié ?</a>
		</form>
	</div>`

}






















/* Modal Display */

		// Récupère le body
		let body = document.getElementsByTagName("body");

		// Récupère modal
		let modal = document.getElementById("myModal");

		// Récupère bouton profile
		let login_btn = document.getElementById("loginBtn");


    // Ouverture/fermeture du modal 
    
    function openModalFunction() {
      modal.style.display = "block";
    }

    function closeModalFunction() {
			modal.style.display = "none";
    }
    /*
		login_btn.onclick = function () {
			modal.style.display = "block";
		}
*/


		// Quand l'utilisateur clique en dehors de la fenêtre modal, cette dernière se ferme
/*		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}

		}
*/
		/* Changer de 'SE CONNECTER' à 'S'ENREGISTRER' */
		let register_content = document.getElementById("register-tabs");
		let sign_in_content = document.getElementById("sign_in-tabs");

	
    
    function switchLoginFunction(event) {
      console.log(event);
      if(!event.classList.contains("active")){
        if(event.id==="sign_in_btn"){
          document.getElementById("register-tabs").style.display = "none";
          document.getElementById("sign_in-tabs").style.display = "block";
          document.getElementById("register_btn").classList.remove("active");
        }
        else if(event.id==="register_btn"){
          document.getElementById("sign_in-tabs").style.display = "none";
          document.getElementById("register-tabs").style.display = "block";
          document.getElementById("sign_in_btn").classList.remove("active");
        }
        event.classList.add("active");
      }
    }

		/* Redirecton membre */
/*
		let member_redirect = document.getElementById("member");
		member_redirect.onclick = function () {
		}
*/
		/* Vérification formulaire */

		let login = document.getElementById("loginButton");
		let create = document.getElementById("createButton");
		let password = document.getElementById("password");
		let password_validation = document.getElementById("password-validation");

		/*login.onclick() = function() {
			/* là on fait appel à la fausse base de données
		}

		create.onclick() = function() {
			if (password.ge)
		}
		*/


























/* Scroll back to top button script */

//Get the button:
backToTopBtn = document.getElementById("backToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}