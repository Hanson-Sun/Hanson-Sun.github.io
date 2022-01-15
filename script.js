var firstJoke = true;
greet = `
  _  _                          ___           
 | || |__ _ _ _  ___ ___ _ _   \/ __|_  _ _ _  
 | __ \/ _\` | ' \\(_-</ _ \\ ' \\  \\__ \\ || | ' \\ 
 |_||_\\__,_|_||_\/__\/\\___\/_||_| |___\/\\_,_|_||_|     


.....................................................................
 Welcome to my terminal, enter "help" for the documentation of all commands. 
 
`

help = `
+=============+===============================================+
|  Function   |                      Use                      |
+=============+===============================================+
| help        | displays a list of all the commands           |
+-------------+-----------------------------------------------+
| about       | A brief introduction of who I am              |
+-------------+-----------------------------------------------+
| skills      | My skills and abilities                       |
+-------------+-----------------------------------------------+
| experience  | my experiences and what I've accomplished     |
+-------------+-----------------------------------------------+
| projects    | a showcase of some of my programming projects |
+-------------+-----------------------------------------------+
| awards      | my achievements recognized by others          |
+-------------+-----------------------------------------------+
| education   | a summary of my education journey             |
+-------------+-----------------------------------------------+
| contact     | my contact info                               |
+-------------+-----------------------------------------------+
| download_cv | download a pdf version of my CV               |
+-------------+-----------------------------------------------+
| all         | a concatenated list of everything             |
+-------------+-----------------------------------------------+
| clear       | clears terminal                               |
+-------------+-----------------------------------------------+
| joke        | a very random joke                            |
+-------------+-----------------------------------------------+
|             | may have other easter eggs                    |
+-------------+-----------------------------------------------+
`
about = `
Hello! I'm Hanson Sun, an IB Diploma student at Richmond Secondary School. I am passionate
about programming and technology. In my free time, I enjoy making fun
programming projects and learning new skills. Other than that, I also have experience leading clubs and applying programming knowledge to real-world projects.
<br>
<br>
Hobbies:
	<ul class = "awards">
		<li>Programming</li>
		<li>Cycling</li>
		<li>Playing the saxophone</li>
		<li>Arduino Robotics</li>
		<li>Sleep enthusiast</li>
		<li>Amateur food critic (with very low standards)</li>
	</ul>
`
skills = `
Programming

	<table class = 'skills'>
	<tr>
		<td>+ HTML,CSS</td>
		<td>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░</td>
	</tr>
	<tr>
		<td>+ Javascript</td>
		<td>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ </td>
	</tr>
	<tr>
		<td>+ Python</td>
		<td>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░</td>
	</tr>
	<tr>
		<td>+ LaTeX</td>
		<td>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░</td>
	</tr>
	<tr>
		<td>+ Julia</td>
		<td>▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░</td>
	</tr>
	<tr>
		<td>+ Git</td>
		<td>▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░</td>
	</tr>
	<tr>
		<td>+ C++</td>
		<td>▓▓▓▓▓▓▓▓░░░░░░░░░░░░ </td>
	</tr>
	</table>
Academics

	<table class = 'skills'>
	<tr>
		<td>+ Mathematics</td>
		<td>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░</td>
	</tr>
	<tr>
		<td>+ Physics</td>
		<td>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ </td>
	</tr>
	<tr>
		<td>+ Chemistry</td>
		<td>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░</td>
	</tr>
	<tr>
		<td>+ English</td>
		<td>▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░</td>
	</tr>

	</table>
General

	<table class = 'skills'>
	<tr>
		<td>+ Chinese</td>
		<td>▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░</td>
	</tr>
	<tr>
		<td>+ Communication</td>
		<td>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░</td>
	</tr>
	<tr>
		<td>+ Leadership</td>
		<td>▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░</td>
	</tr>
	<tr>
		<td>+ Teamwork</td>
		<td>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░</td>
	</tr>

	</table>
<br>
`
education = `
	<ul class = "awards">
		<li>Richmond Secondary School IB Diploma Student (hopefully grad soon)</li>
		<li>More to come!</li>
	</ul>

`
experience = `
	<ul class = "awards">
		<li>
			Co-founder of a non-profit math tutoring organization, Math Connect. (2020 - present)
			<ul class = "awards">
				<li>Planned, designed, and launched a free NPO, Math Connect</li>
				<li>Interviewed high school students as potential tutors</li>
				<li>Managed tutors, students, and classes</li>
				<li>Created website, mathconnect.ca</li>
			</ul>
		</li>
		<li>
			Co-founder of the RHS Programming Club (2020 - present)
			<ul class = "awards">
				<li>Created interactive programming curriculum and lessons every week</li>
				<li>Teaches creative programming lessons every week</li>
				<li>Organized school-wide programming competitions and hackathons</li>
				<li>Implemented large scale hackathons (Hack the North) and competitions (CCC)</li>
			</ul>
		</li>
		<li>
			Co-president of the RHS Math Club (2019 - present)
			<ul class = "awards">
				<li>Organized large scale math competitions such as the COMC, CSMC/CIMC, and Euclid</li>
				<li>Managed finances from student payments</li>
			</ul>
		</li>
		<li>
			Member of the RHS Science Team (2018 - present)
			<ul class = "awards">
				<li>Competes in various different science competitions</li>
				<li>Plan and design pe-build events</li>
				<li>Work collaboratively with other teammates</li>
			</ul>
		</li>
		<li>
			Executive of Homework Help Club (2018 - 2019)
			<ul class = "awards">
				<li>Tutored students for a range of subjects</li>
			</ul>
		</li>
	</ul>
`

awards = `
	<ul class = "awards">
		<li>1st place in district for 2021 Waterloo's Sir Isaac Newton Physics Exam</li>
		<li>82nd place in Canada for 2021 Waterloo's Avogadro Contest</li>
		<li>9th place during 2021 UBC Physics Olympics, placing 3rd for the Speed of Sound Event (the event I was mainly responsible for)</li>
		<li>Provincial placement for 2019 Math Challengers Competition</li>
		<li>3rd place during the 2019 Kwantlen Science Competition</li>
		<li>4th place during the 2018 Kwantlen Science Competition</li>
		<li>Top 25% for COMC, CSMC, and Euclid Math contests</li>
		<li>Principal's Award throughout highschool</li>
		<li>Mathematics HL 11 Award, Chemistry SL 11 Award, Physics 11 Award, Web Development 9/10 Award, English 10 Award. </li>
	</ul>
`

projects = `

A list of notable cool things I've made, some for fun, some a bit less fun
<br><br>
<table>
	<tr>
		Formal Analysis of Constrained Dynamic Systems with Mathematics and Programming
		<ul>
			<li>A formal mathematics paper written for the IB Program that analyzes constrained systems. </li>
			<li><a target = "_blank" href = "HansonS_Math_EE.pdf">PDF Link</a> (Will be updated in the future)</li>
			<li><a target = "_blank" href = "https://hanson-sun.github.io/Math-EE/">Live Demo</a></li>
		</ul>
	</tr>
	<tr>
		Informal Analysis of Evolutionary Genetic Algorithms in Javascript
		<ul>
			<li>A fun investigation of genetic algorithms that I decided to write for the Programming Club.</li>
			<li><a target = "_blank" href="https://evolutionary-genetic-algorithms.hansonsun.repl.co">Demo</a>
			</li>
		</ul>
	</tr>	
	<tr>
		4D Perspective Rendering Method
		<ul>
			<li>A mathematical analysis on visualizing 4D polygons with a threejs javaScript implementation</li>
			<li><a target = "_blank"href="https://hanson-sun.github.io/4d-rendering/">Demo Link</a></li>
			<li><a target = "_blank"href="https://github.com/Hanson-Sun/4d-rendering/blob/main/math_ia.pdf">Math paper</a> (work in progress)</li>
		</ul>
	</tr>
	<tr>
		My Journey of Programmatic Physics
		<ul>
			<li>A big passion of mine, also influenced my formal analysis of constrained dynamics</li>
			<li><a target = "_blank" href = "https://bounce.hansonsun.repl.co">Projectile Motion</a></li>
			<li><a target = "_blank" href = "https://Charge-Simulation.hansonsun.repl.co">Charge Simulation</a></li>
			<li><a target = "_blank" href = "https://Gravity-Simulation.hansonsun.repl.co">Gravity Simulation</a></li>
			<li><a target = "_blank" href = "https://metaballs.hansonsun.repl.co">Isosurfaces</a></li>
			<li><a target = "_blank" href = "https://sad-cloth-simulation.hansonsun.repl.co/hmmm.html">Cloth Simulation</a></li>
			<li><a target = "_blank" href = "https://sph-fluid.hansonsun.repl.co">Simple Particle Hydrodynamics</a>(Interactive on a non-IOS smart phone)</li>
			<li>and many others on my repl page.</li>

		</ul>
	</tr>
	<tr>
		Math Connect Website
		<ul>
			<li>A complete and fully functional website for my co-founded NPO, Math Connect.</li>
			<li><a target = "_blank"href="https://mathconnect.ca/">Website Link</a></li>
		</ul>
	</tr>

	<tr>
		Interactive Periodic Table
		<ul>
			<li>A creative approach to a mundane chemistry 11 project.</li>
			<li><a target = "_blank" href = "https://Periodic-Table.hansonsun.repl.co">Periodic Table</a></li>
		</ul>
	</tr>

	<tr>
		Exhibition of Javascript Art 
		<ul>
			<li>My first attempt at digital art</li>
			<li><a target = "_blank" href = "https://javascript-compendium.hansonsun.repl.co">Javascript Interpretation of Process Compendium by Casey Reas</a></li>
			<li><a target = "_blank" href = "https://JavascriptArt.hansonsun.repl.co">Compilation of Javascript Art</a></li>
		</ul>
	</tr>

</table>

`

contact = `
Email: <a target = "_blank" href = "contact.html">hansonsun.school@gmail.com</a><br>
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
            term.echo(flavtext + "[" + done.repeat(start) + empty.repeat(max - start) + "] " + (start / max * 100).toFixed(1) + "%")
            first = false;
        }
        term.pause();
        setTimeout(function() {
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

    hello: function() {
        this.echo('Hello, welcome to this terminal. Have fun looking around!');
    },
    help: function() {
        this.echo(help, { raw: false });
    },
    about: function() {
        this.echo(about, { raw: true });
    },
    skills: function() {
        this.echo(skills, { raw: true });
    },

    projects: async function() {
        // time = 42;
        // size = 20;

        // pb(0, size, time, "Loading Projects    ", projects).then(function () {
        // 	term.update(-1, projects, { raw: true });
        // })
        this.echo(projects, { raw: true });

    },

    progress: function() {
        pb(0, 20, 50, "Loading Data    ");
    },
    awards: function() {
        this.echo(awards, { raw: true });
    },
    education: function() {
        this.echo(education, { raw: true });
    },
    experience: function() {
        this.echo(experience, { raw: true });
    },
    contact: function() {
        this.echo(contact, { raw: true });
    },
    mobile: function() {

    },
    all: function() {
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
    download_cv: function() {
        this.echo("Opening CV. . .")
        window.open("resume.pdf", '_blank').focus();
    },
    joke: async function() {
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
    bored: async function() {
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
    bruh: function() {
        this.echo("Bruh, you really gonna think bruh is a command");
    }

}, {
    greetings: "",

});


pb(0, 25, 45, "Loading Data    ", projects).then(function() {
    term.update(-1, greet);
});