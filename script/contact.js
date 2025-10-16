
greet = `
   ___         _           _     __  __      
  / __|___ _ _| |_ __ _ __| |_  |  \/  |___  
 | (__/ _ \ ' \  _/ _` / _|  _| | |\/| / -_) 
  \___\___/_||_\__\__,_\__|\__| |_|  |_\___| 
                                               


.....................................................................
 Welcome to my terminal, enter "help" for the documentation of all commands. 
`


function pb(start, max, delay, flavtext, first = true) {
	return new Promise((resolve) => {
		let empty = "·";
		let done = "#";
		if (first) {
			term.echo(flavtext + "[" + done.repeat(start) + empty.repeat(max - start) + "] " + (start / max * 100).toFixed(1) + "%")
			first = false;
		}
		term.pause();
		setTimeout(function () {
			start++;

			bar = flavtext + "[" + done.repeat(start) + empty.repeat(max - start) + "] " + (start / max * 100).toFixed(1) + "%";
			term.update(term.last_index(), bar).resume();
			if (start >= max) {
				return resolve(true);

			} else {
				return resolve(pb(start, max, delay, flavtext, false));
			}
		}, delay);
	});

}

function fetchURL(url) {
	return new Promise((resolve) => {
		let response = fetch(url, { credentials: 'omit' }).then(res => {
			if (!res.ok) {
				throw new Error('Network response was not OK');
			}
			return res.json();
		}).then(data => {
			return resolve(data.joke)
		});
	})
}




var term = $('#content').terminal({
	//this.echo("<a href = 'youtube.com'>I don't want to use a terminal</a>", {raw:true})

	hello: function () {
		this.echo('Hello, welcome to this terminal. Have fun looking around!');
	},
	help: function () {
		this.echo(help, { raw: false });
	},
	about: function () {
		this.echo(about, { raw: true });
	},
	skills: function () {
		this.echo(skills, { raw: true });
	},

	projects: async function () {
		// time = 42;
		// size = 20;

		// pb(0, size, time, "Loading Projects    ", projects).then(function () {
		// 	term.update(-1, projects, { raw: true });
		// })
		this.echo(projects, { raw: true });

	},

	progress: function () {
		pb(0, 20, 50, "Loading Data    ");
	},
	awards: function () {
		this.echo(awards, { raw: true });
	},
	education: function () {
		this.echo(education, { raw: true });
	},
	experience: function () {
		this.echo(experience, { raw: true });
	},
	contact: function () {
		this.echo(contact, {raw: true});
	},
	mobile: function () {

	},
	all: function () {
		this.echo("<h1>About</h1><br>", { raw: true });
		this.echo(about, { raw: true })
		this.echo("<h1>Skills</h1><br>", { raw: true });
		this.echo(skills, { raw: true });
		this.echo("<h1>Experience</h1>", { raw: true });
		this.echo(experience, { raw: true });
		this.echo("<h1>Awards</h1>", { raw: true });
		this.echo(awards, { raw: true });
		this.echo("<h1>Projects</h1><br>", { raw: true });
		this.echo(projects, { raw: true });
		this.echo("<h1>Education</h1>", { raw: true });
		this.echo(education, { raw: true });
		this.echo("<h1>Contact</h1>", { raw: true });
		this.echo(contact, {raw: true});

	},
	download_cv: function () {
		this.echo("Coming soon . . .")
	},
	joke: async function () {
		this.pause();
		const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
		let response = await fetch(url).then(res => {
			return res.json();
		}).then(data => {
			if (data.joke) { return data.joke }
			else {
				return data.setup + "\n" + data.delivery
			}


		});
		console.log(response)
		this.echo(response).resume();
		// response = fetchURL("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");
		// console.log(response)
		// this.echo(response);
	},
	bored: async function () {
		this.pause();
		const url = "https://www.boredapi.com/api/activity";
		let response = await fetch(url).then(res => {
			return res.json();
		}).then(data => {
			if (data.activity) { return data.activity }
	});
		console.log(response)
		this.echo(response).resume();

		// response = fetchURL("https://www.boredapi.com/api/activity");

		// console.log(response)
		// this.echo(response);
	},
	bruh: function () {
		this.echo("Bruh, you really gonna think bruh is a command");
	}

}, {
		greetings: "",

	});


term.echo