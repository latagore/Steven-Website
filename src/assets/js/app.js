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
})