var firstJoke = true;
greet = `
  _  _                          ___           
 | || |__ _ _ _  ___ ___ _ _   \/ __|_  _ _ _  
 | __ \/ _\` | ' \\(_-</ _ \\ ' \\  \\__ \\ || | ' \\ 
 |_||_\\__,_|_||_\/__\/\\___\/_||_| |___\/\\_,_|_||_|     

https://github.com/Hanson-Sun    https://linkedin.com/in/hanson-sun/
.....................................................................
 Welcome to my terminal, enter "help" for the documentation of all commands. 
 `

help = `
+=============+===============================================+
|  Function   |                     Use                       |
+=============+===============================================+
| help        | Displays a list of all the commands           |
+-------------+-----------------------------------------------+
| about       | A brief introduction of who I am              |
+-------------+-----------------------------------------------+
| experience  | My experiences and what I've accomplished     |
+-------------+-----------------------------------------------+
| projects    | A showcase of some of my programming projects |
+-------------+-----------------------------------------------+
| skills      | My skills and abilities                       |
+-------------+-----------------------------------------------+
| education   | A summary of my education journey             |
+-------------+-----------------------------------------------+
| awards      | My achievements recognized by others          |
+-------------+-----------------------------------------------+
| contact     | My contact info                               |
+-------------+-----------------------------------------------+
| download_cv | Download a pdf version of my CV               |
+-------------+-----------------------------------------------+
| all         | A concatenated list of everything             |
+-------------+-----------------------------------------------+
| clear       | Clears terminal                               |
+-------------+-----------------------------------------------+
| joke        | A very random joke                            |
+-------------+-----------------------------------------------+
|             | May have other easter eggs!                   |
+-------------+-----------------------------------------------+
`
about = `
Hi! I'm Hanson, a honours computer science student at UBC with a minor in data science! 
I am passionate about technology, education, and research. If I'm not grinding assignments, 
I enjoy making fun programming projects and learning new skills. Take a look around this website to know me better!
<br>
<br>
Hobbies:
<ul class = "awards">
	<li>Programming</li>
	<li>Cycling</li>
	<li>Playing the saxophone</li>
	<li>Tinkering embedded systems</li>
	<li>Sleep enthusiast</li>
	<li>Amateur food critic (with very low standards)</li>
</ul> 
`
skills = `
<table class = 'skills'>
	<tr>
		Programming Languages: C/C++, JavaScript, Python, Java, HTML/CSS, R, Unity C# <br>
	</tr>
	<tr>
		Frameworks / Libraries: QT, QML, AWS, Jupyter, Django, Node.js, JUnit, Scikit-learn, NumPy, TensorFlow <br>
	</tr>
	<tr>
		Developer Tools: Git, Docker, Valgrind, MPLAB, GDB, GPROF, WSL, Makefile, Unity <br>
	</tr>
	</table>
<br>
`

education = `
	<ul class = "awards">
		<li>UBC Bachelor of Science (2022 - present)</li>
		<li>International Baccalaureate Diploma Programme (2018 - 2022)</li>
	</ul>
`

experience = `
	I'm getting lazy updating this website, so check out my <a target = "_blank" href = "./pdfs/Hanson_s_Resume.pdf">resume</a> instead! Or maybe my linkedin...
`

awards = `
	General Awards
	<ul class = "awards">
		<li>UBC Trek Excellence Scholarship</li>
		<li>J Fred Muir Memorial Scholarship</li>
		<li>UBC Science Scholar</li>
		<li>Governor General's Bronze Medal</li>
		<li>BC Achievement scholarship</li>
	</ul>
`

projects = `
	For the best list, please visit my github! <a target = "_blank" href = "https://github.com/Hanson-Sun">github.com/Hanson-Sun</a>! <br> Heres a quick list of topics I've worked on
	<ul class = "awards">
		<li>Computational physics and physics simulations!</li>
		<li>Computational biology research</li>
		<li>Data science and statistical analysis</li>
		<li>Data processing and computer vision</li>
		<li>Full-stack web applications</li>
		<li>Game development</li>
		<li>and a bunch of random stuff ....</li>
	</ul>
`

contact = `
Email: <a target = "_blank" href = "./html/contact.html">hansonsun.school@gmail.com</a><br>
LinkedIn: <a target = "_blank" href = "https://linkedin.com/in/hanson-sun/">linkedin.com/in/hanson-sun/</a><br>
Github: <a target = "_blank" href = "https://github.com/Hanson-Sun">github.com/Hanson-Sun</a><br>
repl.it: <a target = "_blank" href = "https://replit.com/@HansonSun">replit.com/@HansonSun</a>
`

mobile = `
Oof, should check out this website on a computer sometime.
`

function pb(start, max, delay, flavtext, first = true) {
	return new Promise((resolve) => {
		let empty = "·";
		let done = "#";
		if (first) {
			term.echo(flavtext + "[" + done.repeat(start) + empty.repeat(max - start) + "] " + (start / max * 100).toFixed(1) + "%");
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
		this.echo(asciiHanson, { raw: true });
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
		this.echo(contact, { raw: true });
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
		this.echo(contact, { raw: true });

	},
	download_cv: function () {
		this.echo("Opening CV. . .")
		window.open("./pdfs/Hanson_s_Resume.pdf", '_blank').focus();
	},
	joke: async function () {
		if (firstJoke) {
			this.echo("These jokes are from a javscript joke API and I am NOT responsible for any questionable content that may appear. \n")
			firstJoke = false;
		}
		this.pause();
		const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
		let response = await fetch(url).then(res => {
			return res.json();
		}).then(data => {
			if (data.joke) { return data.joke } else {
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
	greetings: ""
});


pb(0, 25, 45, "Loading Data    ", projects).then(function () {
	term.update(-1, greet);
});