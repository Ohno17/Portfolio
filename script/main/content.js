
const content = document.getElementById("content");

const index = document.getElementById("index");
const project = document.getElementById("project");

const indexbutton = document.getElementById("indexbutton");
const projectbutton = document.getElementById("projectbutton");

const NavigationState = {INDEX: 0, PROJECT: 1};
var navstate = NavigationState.INDEX;

function switchToIndex(disable) {

	if (typeof disable === 'undefined') {

		if (navstate != NavigationState.PROJECT) return;

	}

	window.location.hash = "/home";
	document.title = "CS Portfolio - Home";
	enableIndexAnimation();
	enableIndexLinks()
	disableBrickButtons();

	content.setAttribute("data-active", "index");
	
	index.setAttribute("aria-hidden", "false");
	project.setAttribute("aria-hidden", "true");
	
	project.setAttribute("aria-hidden", "true");

	projectbutton.classList.remove("active");
	indexbutton.classList.add("active");

	navstate = NavigationState.INDEX;
	
}

function switchToProject(disable) {

	if (typeof disable === 'undefined') {

		if (navstate != NavigationState.INDEX) return;
		
	}

	window.location.hash = "/projects";
	document.title = "CS Portfolio - Projects";
	disableIndexAnimation();
	disableIndexLinks();
	enableBrickButtons();

	content.setAttribute("data-active", "project");
	
	index.setAttribute("aria-hidden", "true");
	project.setAttribute("aria-hidden", "false");

	projectbutton.classList.add("active");
	indexbutton.classList.remove("active");

	navstate = NavigationState.PROJECT;
	
}

function contentSwitchEnd() {

	if (navstate == NavigationState.INDEX) {

		project.scrollTop = 0;
		if (activated) deactivateBreakout();
		
	} else {

		index.scrollTop = 0;
		resizeCanvas();
		
	}
	
}

function hashChanged() {
	if (window.location.hash === "#/home") {
		switchToIndex(true);
	} else if (window.location.hash === "#/projects") {
		switchToProject(true);
	}
}

content.addEventListener('transitionend', contentSwitchEnd, false);
content.addEventListener('webkitTransitionEnd', contentSwitchEnd, false);
window.addEventListener("hashchange", hashChanged, false);

document.body.onload = function() {
	
	switch (window.location.hash) {

		default:
		case "#/home":
			switchToIndex(true);
			break;
		case "#/projects":
			switchToProject(true);
			break;
		
	}

}
	