
const projmodal = document.getElementById("projectdialog");
const modaltitle = document.getElementById("dialogtitle");
const modalbody = document.getElementById("dialogbody");
const projects = document.getElementById("projects");

const projectsbutton = document.getElementById("breakoutbutton");

const brickscontent = [
	{
		name: "Shape Shooter",
		url: "https://shape-shooter.ohno17.repl.co/",
		html: "<p>Shape Shooter is a 2D top-down shooter roguelike that I made to learn Javascript. It uses procedural generation to create levels, and it has a chunk system to support many enemies at once on the screen. This game is also at a bigger scale compared to my other projects, with many considerations for organization and future proof code.</p>"
	},
	{
		name: "Flappy Square",
		url: "https://github.com/Ohno17/Flappy-Square",
		html: "<p>Flappy Square is a Flappy Bird clone written in C++. I used a library called SDL2 for handling graphics and input. This game represents my experiences in OOP (Object Oriented Programming) as well as lower level concepts like pointers.</p>"
	},
	{
		name: "Wordform",
		url: "https://github.com/Ohno17/Wordform",
		html: "<p>Wordform is a C++ program that takes a given number and outputs it's word form. (Ex: 134 to 'One-hundred thirty four') This program represents my C++ experience as well as my skill to solve engineering problems with simple algorithms.</p>"
	},
	{
		name: "Greenism",
		url: "https://greenism.the-green-team.repl.co/",
		html: "<p>Greenism is a project that I made with <a href='https://replit.com/@krithiks'>Krithik Senthilkumar</a>. It contains one of our past projects, Bobux Clicker, except expanded with online features such as cloud saving, leaderboards, and chatting. We used technologies like React to develop this website. The backend is written in python and uses Flask, Websockets and MongoDB for real-time communication and data storage.</p>"
	},
	{
		name: "Bobux Clicker",
		url: "https://bobux-clicker.krithiks.repl.co/",
		html: "<p>This is a clicker game that I made with <a href='https://replit.com/@krithiks'>Krithik Senthilkumar</a>. It has a leveling system along with some powerups.</p>"
	},
	{
		name: "VEX Robotics",
		url: "https://github.com/Ohno17/Robotics",
		html: "<p>In our school's VEX Robotics competition, I was the programmer. I used python to make this program.</p>"
	},
	{
		name: "Metroidvania",
		url: "https://github.com/hackclub/sprig/pull/2781",
		html: "<p>This is a contribution to the library of games for Hackclub's Sprig. (Hackclub is an organization dedicated to programming for high schoolers.) This project taught me more about Javascript and creating generic systems that can be reused for multiple purposes.</p>"
	},
	{
		name: "JTracer",
		url: "https://github.com/Ohno17/JTracer",
		html: "<p>This is a project representing my knowledge of Java, a well-known programming language as well as systems design as I also wrote a system to read in text files describing create 3D scenes.</p>"
	}
];

function openProjectModal(id) {
	const integerid = parseInt(id);

	modaltitle.innerHTML = "<a target='_blank' rel='noopener noreferrer' href='" + brickscontent[integerid].url + "'>" + brickscontent[integerid].name + "</a>";
	modalbody.innerHTML = brickscontent[integerid].html;

	projmodal.showModal();
}

function closeProjectModal() {
	projmodal.close();
}

projmodal.addEventListener("click", function (event) {
  const rect = projmodal.getBoundingClientRect();
  const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
  if (!isInDialog) {
    projmodal.close();
  }
}, false);

function disableBrickButtons() {
	const brickButtons = document.querySelectorAll(".brick .front");
	for (let i = 0; i < brickButtons.length; i++) {
		brickButtons[i].setAttribute("tabindex", "-1");
	}
	projectsbutton.setAttribute("tabindex", "-1");
}

function enableBrickButtons() {
	const brickButtons = document.querySelectorAll(".brick .front");
	for (let i = 0; i < brickButtons.length; i++) {
		brickButtons[i].setAttribute("tabindex", "0");
	}
	projectsbutton.setAttribute("tabindex", "0");
}

function stringToColour(str) {
    let hash = 0;
    str.split('').forEach(function(char) {
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });

    let colour = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += value.toString(16).padStart(2, '0');
    }
    
    return colour;
}

for (var i = 0; i < brickscontent.length; i++) {
	projects.innerHTML += "<div id='brick" + i + "' class='brick' style='animation-delay: " + i * (1000 / brickscontent.length) + "ms;'><button class='front' alt='" + brickscontent[i].name + "' title='" + brickscontent[i].name + "' tabindex='0' onclick='openProjectModal(" + i + ")'></button><div class='back' style='background-color:" + stringToColour(brickscontent[i].name) + ";'></div></div>";
}
projects.innerHTML += "<div id='gamespace'></div>";
