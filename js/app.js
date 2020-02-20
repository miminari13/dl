$(document).ready(function() {
	$('#apply-phone').mask("+7 (999) 999-99-99");

	var menu = $('.pre-header__menu');
	$('.js-show-menu').click(function(){
		if (!menu.hasClass('open')) {
			menu.addClass('open');
		} else {
			menu.removeClass('open');
		}
	});


	$('.js-show-programm').click(function(){
		$('.programm__fulllist').addClass('open');
		$('.programm__pre-title--spec').removeClass('programm__pre-title--last');
		$('.programm__info--spec').removeClass('programm__info--last');

		$(this).hide();
	});
});