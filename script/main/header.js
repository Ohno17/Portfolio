
const header = document.querySelector("header");

var lastScroll = 0;
var currentScroll = 0;
var lastUpScroll = 0;

document.addEventListener("scroll", function() {

	lastScroll = currentScroll;
	currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
	
	if (lastScroll > currentScroll || currentScroll < 80) {

		lastUpScroll = currentScroll;

		header.setAttribute("data-active", "true");
		
	} else {

		header.setAttribute("data-active", "false");
		
	}
	
}, false);

document.addEventListener("mousemove", function(event) {

	if (event.clientY < 100) {

		header.setAttribute("data-active", "true");
	
	}
	
}, false);
