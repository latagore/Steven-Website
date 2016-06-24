$(document).foundation();

var header = $(".header-name");
$('.top-bar-container').on('sticky.zf.stuckto:top', function(){
	if(header.is(":visible")) {
		MotionUI.animateOut(header, 'fade-out');
	} else {
		header.one("transitionend", function(){
			MotionUI.animateOut(header, 'fade-out');
		});
	}
}).on('sticky.zf.unstuckfrom:top', function(){
	if(header.is(":visible")) {
		header.one("transitionend", function(){
			MotionUI.animateIn(".header-name", 'fade-in');
		});
	} else {
		MotionUI.animateIn(".header-name", 'fade-in');
	}
});

// Initialize gallery
$('.gallery').featherlightGallery({
    openSpeed: 300,
		previousIcon: '&#12296;',
		nextIcon: '&#12297;'
});
// Create a stackup object.
var stackup = new StackUp({
	containerSelector: '#grid-container',
	itemsSelector: '.grid-item',
	columnWidth: 320,
	isFluid: true,
	boundary: $('#grid-boundary').get(0)
});
// Initialize once you are done configurating.
stackup.initialize();