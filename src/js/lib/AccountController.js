var AccountController = AccountController || {};

AccountController = {
	model: {
		avatar: "",
	},
	init: function() {
		Array.from(document.querySelectorAll('.btn-google')).forEach(function(btn) {
			gapi.load('auth2', function() {
				// Retrieve the singleton for the GoogleAuth library and set up the client.
				auth2 = gapi.auth2.init({
					client_id: '261187886088-5o0va8g8ujg60pbd1r0mobfsc7jijjfj.apps.googleusercontent.com',
					cookiepolicy: 'single_host_origin',
				});
				AccountController.events.attachSignin(btn);
			});
		});

		window.fbAsyncInit = function() {
			FB.init({
				appId: '1260704607376976',
				cookie: true, // Enable cookies to allow the server to access the session.
				xfbml: true, // Parse social plugins on this webpage.
				version: 'v4.0' // Use this Graph API version for this call.
			});
		};

		(function(d, s, id) { // Load the SDK asynchronously
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s);
			js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		$(".btn-facebook").click(AccountController.events.attachFBSignin);
	},
	events: {
		attachFBSignin: function() {
			FB.login(function(response) {
				// handle the response 
				if (response.status === 'connected') {
					// Logged into your webpage and Facebook.
					AccountController.events.facebook({
						id: response.authResponse.userID,
						token: response.authResponse.accessToken,
						name: "",
						email: "octopuzecontact@gmail.com",
						image: "",
						provider: "FACEBOOK",
					});
				} else {
					// The person is not logged into your webpage or we are unable to tell. 
				}
			}, {
				scope: 'email',
				return_scopes: true
			});
		},
		attachSignin(element) {
			auth2.attachClickHandler(element, {},
				function(googleUser) {
					var profile = googleUser.getBasicProfile();
					AccountController.events.google({
						id: profile.getId(),
						name: profile.getName(),
						email: profile.getEmail(),
						token: googleUser.getAuthResponse().id_token,
						image: profile.getImageUrl(),
						provider: "",
					});
				},
				function(error) {
					console.log(JSON.stringify(error, undefined, 2));
				});
		},
		google: function(googleUser) {
			googleUser.provider = "GOOGLE";
			if (googleUser != null) {
				var auth2 = gapi.auth2.getAuthInstance();
				auth2.signOut().then(function() {
					$.ajax({
						url: "/external-login",
						type: "POST",
						data: JSON.stringify(googleUser),
						contentType: "application/json",
						success: function(response) {
							alert(response.Message);
							if (response.Code == 200) {
								window.location.reload();
							}
						},
					});
				});
			}
		},
		facebook: function(user) {
			FB.api('/' + user.id + '/picture', 'GET', {
				"redirect": "false"
			}, function(response) {
				if (response && !response.error) {
					user.image = response.data.url;
					FB.api('/me', function(response) {
						if (response && !response.error) {
							user.name = response.name;
							$.ajax({
								url: "/external-login",
								type: "POST",
								data: JSON.stringify(user),
								contentType: "application/json",
								success: function(response) {
									alert(response.Message);
									if (response.Code == 200) {
										window.location.reload();
									}
								},
							});
						}
					})
				}
			});
		}
	}
}


function RegisterSuccess(response) {
	alert(response.Message);
	if (response.Code == 200) {
		window.location.reload();
	}
}

function LogonSuccess(response) {
	alert(response.Message);
	if (response.Code == 200) {
		window.location.reload();
	}
}