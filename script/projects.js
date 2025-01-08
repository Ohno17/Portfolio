
const projmodal = document.getElementById("projectdialog");
const modaltitle = document.getElementById("dialogtitle");
const modalbody = document.getElementById("dialogbody");
const hexcontainer = document.getElementById("honeycomb");

const hexagoncontent = [
	{
		name: "Shape Shooter",
		url: "https://shape-shooter.ohno17.repl.co/",
		html: "<p>Shape Shooter is a 2D top-down shooter roguelike that I made to learn Javascript. It uses procedural generation to create levels, and it has a chunk system to support many enemies at once on the screen.</p>"
	},
	{
		name: "Flappy Square",
		url: "https://replit.com/@Ohno17/Flappy-Square?v=1",
		html: "<p>Flappy Square is a Flappy Bird clone written in C++. I used a library called SDL2 for handling graphics and input.</p>"
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
	}
];

function openProjectModal(id) {

	const integerid = parseInt(id);

	modaltitle.innerHTML = "<a target='_blank' rel='noopener noreferrer' href='" + hexagoncontent[integerid].url + "'>" + hexagoncontent[integerid].name + "</a>";
	modalbody.innerHTML = hexagoncontent[integerid].html;

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

function disableHexagons() {

	var i;
	for (i = 0; i < hexcontainer.children.length; i++) {

		hexcontainer.children[i].setAttribute("tabindex", "-1");
		
	}
	
}

function enableHexagons() {

	var i;
	for (i = 0; i < hexcontainer.children.length; i++) {

		hexcontainer.children[i].setAttribute("tabindex", "0");
		
	}
	
}

for (var i = 0; i < hexagoncontent.length; i++) {
	honeycomb.innerHTML += "<div id='hex" + i + "' class='hexagon' alt='" + hexagoncontent[i].name + "' title='" + hexagoncontent[i].name + "' tabindex='0' role='button' onclick='openProjectModal(" + i + ")'></div>";
}

document.querySelectorAll("[role=\"button\"]").forEach(function(hex) {
  hex.addEventListener("keydown", function(event) {
    if (event.keyCode === 13 || event.keyCode === 32 || event.key === "Enter" || event.key === " ") {
			event.preventDefault();
      hex.click();
    }
  })
});
