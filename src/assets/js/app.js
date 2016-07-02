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

// Initialize form
// create an error element on top of form
$('form#contact').parent().before("<div id='contact-error' class='row' style='display:none'></div>");
$('form#contact').submit(function(event){
	event.preventDefault();
	$('#contact-error').hide();
	$('#contact-error')
		.removeClass('callout')
		.removeClass('success')
		.removeClass('warning');
		
	
	$.ajax(
		this.action + "?" + $(this).serialize(),
		{
			success: function(data){
				if (data.status === "success"){
					$('#contact-error')
						.html("Message sent!")
						.addClass("callout")
						.addClass("success")
						.show();
					
					$('form#contact').fadeOut();
				} else {
					$('#contact-error')
						.addClass("callout")
						.addClass("warning");
					if (data.message){
						$('#contact-error').html(data.message).show();
					} else {
						$('#contact-error').html("Hm, something went wrong with sending this message.").show();
					}
				}
			}
		}
	);
});


// Initialize gallery
var galleryBeforeContent = function(){
			// remove any existing captions and add the caption
			// for the current slide
			
			// get number of existing captions
			var numExistingCaptions = 
				this.$instance.find(".caption").length;
			// duplicate new caption
			var caption = this.$currentTarget
				.find(".caption")
				.clone();
			caption.hide(); // make it initially invisible
			// fade out and remove old captions
			this.$instance
				.find(".caption")
				.fadeOut(this.closeSpeed, 
					function() { this.remove(); });
			// add new caption
			this.$instance
				.children(".featherlight-content")
				.append(caption);
			// animate new caption in
			if (numExistingCaptions > 0) {
				caption.delay(this.closeSpeed).fadeIn(this.openSpeed);
			} else {
				caption.fadeIn(this.openSpeed);
			}
		};
var gallery = $('.gallery').featherlightGallery({
    openSpeed: 300,
		previousIcon: '&#12296;',
		nextIcon: '&#12297;',
		beforeContent: galleryBeforeContent
});
var gallery = $('.gallery2').featherlightGallery({
    openSpeed: 300,
		previousIcon: '&#12296;',
		nextIcon: '&#12297;',
		beforeContent: galleryBeforeContent
});
// special case for duplicate pictures on soft dev
// one appears on small breakpoint and the other appears
// on other sizes
// gallery should only show one of them
$('#small-soft-dev-pic').click( function(event) {
	event.preventDefault();
	$('#medium-soft-dev-pic').click();
});

// format gallery after all images are loaded
$(document).load(function() {
	// Create a stackup object.
	// activate required css if javascript is enabled
	$('#grid-container').addClass('active'); 
	var stackup = new StackUp({
		containerSelector: '#grid-container',
		itemsSelector: '.grid-item',
		columnWidth: 320,
		isFluid: true,
		boundary: $('#grid-boundary').get(0)
	});
	stackup.initialize();
});
