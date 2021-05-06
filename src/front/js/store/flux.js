import jwt_decode from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		// -- INSTRUCTIONS FOR FETCHING FROM XENO-CANTO API --
		// Heroku app running needed for Authorization Control protocols with the external API
		// Create a heroku app, log in an run the app, next append it to the beginning of the URL
		// If herokuApp already created, then run it from console or
		// go the Heroku Web > into your account > Dashboard > click on the app > an then press on the button that says OPEN
		store: {
			message: null,
			isPending: true,
			error: null,
			birdsRaw: [],
			birdSounds: [],
			publicBirdCaptures: [],
			privateBirdCaptures: [],
			favorites: [],
			url: "https://www.xeno-canto.org/api/2/recordings?query=cnt%3A%22Costa%20Rica%22",
			heroku: "https://mighty-plateau-65231.herokuapp.com/",
			newURL: process.env.BACKEND_URL,
			login: false,
			email: "",
			register: false,
			token: null,
			activeUser: null
		},
		actions: {
			syncTokenFromSessionStore: () => {
				const store = getStore();
				const token = sessionStorage.getItem("token");
				console.log("Application jus loaded, synching the session storage token");
				if (token && token != "" && token != undefined) setStore({ token: token });
				console.log("current token on SYNC: ", store.token);
			},

			addFavorite: (sound, id) => {
				const store = getStore();
				//setStore({ favorites: store.favorites.concat(sound) });
				console.log("Favorites [] on addFavorites: ", store.favorites);

				const token = sessionStorage.getItem("token");
				console.log("Item passed as parameter to addFavorite(): ", sound);

				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token
					},
					body: JSON.stringify({
						url_sound: sound,
						bird_id: id,
						user_id: token
					})
				};

				fetch(`${store.newURL}/favorites`, opts)
					.then(res => {
						if (!res.ok) {
							// the "the throw Error will send the erro to the "catch"
							throw Error("Could not fetch the data for FAVORITES RESOURSE");
						}
						console.log("Succesfull https code adding favorite", res);
						return res.json();
					})
					.then(data => {
						// Restore the state for the error once the data is fetched.
						// Once you receive the data change the state of isPending and the message vanish
						console.log("This came from API, add FAVORITE POST: ", data);

						getActions().getFavorites();
					})
					.catch(err => {
						console.error(err.message);
						setStore({ favorites: [] });
					});
			},

			getFavorites: () => {
				const store = getStore();
				const token = store.token;
				console.log("Token inside getFavorites(): ", token);
				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token
					}
				};

				fetch(`${store.newURL}/favorites`, opts)
					.then(res => {
						if (!res.ok) {
							// the "the throw Error will send the erro to the "catch"
							throw Error("Could not fetch the data for FAVORITES RESOURCE");
						}
						return res.json();
					})
					.then(data => {
						// Restore the state for the error once the data is fetched.
						// Once you receive the data change the state of isPending and the message vanish
						console.log("This came from API, FAVORITES GET: ", data);

						setStore({ favorites: data, isPending: false, error: null });
						console.log("Favorites [] on getFavorites: ", store.favorites);
					})
					.catch(err => {
						console.error(err.message);
						setStore({ favorites: [], isPending: true, error: err });
					});
			},

			deleteFavorite: id => {
				const store = getStore();
				const token = sessionStorage.getItem("token");

				const opts = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token
					}
				};

				fetch(`${store.newURL}/favorites/${id}`, opts)
					.then(res => {
						if (!res.ok) {
							// the "the throw Error will send the erro to the "catch"
							throw Error("Could not fetch the data for DELETE RESOURSE");
						}
						console.log("Succesfull https code DELETING favorite", res);
						return res.json();
					})
					.then(data => {
						// Restore the state for the error once the data is fetched.
						// Once you receive the data change the state of isPending and the message vanish
						console.log("This came from API, DELETE FAVORITE: ", data);
						getActions().getFavorites();
					})
					.catch(err => {
						console.error(err.message);
						setStore({ favorites: [] });
					});
			},

			addBirdCapture: (pais, nombreave, localizacion, descripcion, tiempo, privacy) => {
				const store = getStore();
				const token = store.token;

				fetch(`${store.newURL}/bird_captures`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token
					},
					body: JSON.stringify({
						cnt: pais,
						en: nombreave,
						loc: localizacion,
						privacy: privacy,
						rmk: descripcion,
						time: tiempo
					})
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						console.log("POST from Birdcapture", data);
						getActions().getPrivateBirdCaptures();
					})

					.catch(err => {
						console.log("error", err);
					});
			},

			deleteBirdCapture: id => {
				const store = getStore();
				const token = sessionStorage.getItem("token");

				const opts = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token
					}
				};

				fetch(`${store.newURL}/bird_captures/${id}`, opts)
					.then(res => {
						if (!res.ok) {
							// the "the throw Error will send the erro to the "catch"
							throw Error("Could not fetch the data for DELETE RESOURSE");
						}
						console.log("Succesfull https code DELETING Bird Capture", res);
						return res.json();
					})
					.then(data => {
						// Restore the state for the error once the data is fetched.
						// Once you receive the data change the state of isPending and the message vanish
						console.log("This came from API, DELETE Bird Capture: ", data);
						getActions().getPrivateBirdCaptures();
					})
					.catch(err => {
						console.error(err.message);
						setStore({ favorites: [] });
					});
			},

			getBirds: async () => {
				const store = getStore();

				try {
					// Await for the fetch

					const resp = await fetch(store.heroku + store.url);
					if (resp.status !== 200) {
						alert("There has been some error");
						return false;
					}

					// Await for the response
					const data = await resp.json();
					console.log("This came from the backend", data);

					setStore({ birdsRaw: data.recordings });
					getActions().getSounds();
					return true;
				} catch {
					console.error("There has been an error login in");
				}
			},

			getSounds: () => {
				const store = getStore();
				let arrayDeCadenas, uri, encodeFileName, mp3;

				let soundsArray = store.birdsRaw.map(bird => {
					arrayDeCadenas = bird.sono["small"].split("ffts");
					uri = bird["file-name"];
					encodeFileName = encodeURI(uri);
					mp3 = arrayDeCadenas[0] + encodeFileName;

					return { url_sound: mp3, id: bird.id };
				});
				console.log("Bird sounds: ", soundsArray);
				setStore({ birdSounds: soundsArray, isPending: false });
			},
			loginValidation: (user, password) => {
				const store = getStore();

				fetch(`${store.newURL}/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: user,
						password: password
					})
				})
					.then(resp => {
						if (!resp.ok) {
							alert("Bad email or password");
							return false;
						}
						return resp.json();
					})
					.then(data => {
						setStore({ activeUser: data });
						setStore({ token: data.access_token });
						sessionStorage.setItem("token", data.access_token);
						sessionStorage.setItem("activeUser", JSON.stringify(data));
						console.log("ActiveUser from flux", store.activeUser);
					})

					.catch(err => {
						console.log("error", err);
					});
			},

			logout: () => {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("activeUser");
				console.log("Loging out");
				setStore({ token: null });
				setStore({ activeUser: null });
			},

			registerValidation: (firstname, lastname, email, password, bio) => {
				const store = getStore();

				fetch(`${store.newURL}/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						first_name: firstname,
						last_name: lastname,
						email: email,
						password: password,
						bio: bio
					})
				})
					.then(resp => {
						if (!resp.ok) {
							return false;
						}

						return resp.json();
					})
					.then(data => {
						console.log(data);
						setStore({ register: true });
					})

					.catch(err => {
						console.log("error", err);
					});
			},

			setRegister: () => {
				setStore({ register: false });
			},

			reset_Password: (pass, token) => {
				const store = getStore();
				fetch(`${store.newURL}/newPassword`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						password: pass,
						token: token
					})
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						console.log("this came from password", data);
					})

					.catch(err => {
						console.log("error", err);
					});
			},

			getPublicBirdCaptures: () => {
				const store = getStore();
				const token = sessionStorage.getItem("token");
				console.log("Token inside publicCaptures", token);

				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token
					}
				};

				fetch(`${store.newURL}/bird_captures/public`, opts)
					.then(res => {
						if (!res.ok) {
							// the "the throw Error will send the error to the "catch"
							throw Error("Could not fetch the data for that resource");
						}
						return res.json();
					})
					.then(data => {
						// Restore the state for the error once the data is fetched.
						// Once you receive the data change the state of isPending and the message vanish
						// specify on data
						console.log("This came from /bird_captures/public: ", data);
						setStore({ publicBirdCaptures: data, isPending: false, error: null });
						// getActions().getSounds();
					})
					.catch(err => {
						console.error(err.message);
						setStore({ publicBirdCaptures: [], isPending: true, error: true });
					});
			},

			getPrivateBirdCaptures: () => {
				const store = getStore();
				const token = sessionStorage.getItem("token");
				console.log("Token inside publicCaptures", token);

				const opts = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token
					}
				};

				fetch(`${store.newURL}/bird_captures`, opts)
					.then(res => {
						if (!res.ok) {
							// the "the throw Error will send the error to the "catch"
							throw Error("Could not fetch the data for that resource");
						}
						return res.json();
					})
					.then(data => {
						// Restore the state for the error once the data is fetched.
						// Once you receive the data change the state of isPending and the message vanish
						// specify on data
						console.log("This came from /bird_captures: ", data);
						setStore({ privateBirdCaptures: data, isPending: false, error: null });
						// getActions().getSounds();
					})
					.catch(err => {
						console.error(err.message);
						setStore({ privateBirdCaptures: [], isPending: true, error: true });
					});
			}
		}
	};
};

export default getState;
