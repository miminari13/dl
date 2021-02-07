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

	function widget(prefillSurname, prefillName, prefillEmail, prefillOrg, prefillPos) {
		var datawidget = '<script type="text/javascript" async="async" defer="defer" charset="UTF-8" ' +
		    'src="https://timepad.ru/js/tpwf/loader/min/loader.js" ' +
		    'data-timepad-customized="46980" data-twf2s-event--id="1540062" ' +
		    'data-timepad-widget-v2="event_register">' +
		      '(function() {' +
		        'return {' +
		          '"prefill": {' +
		            '"attendees": [' +
		              '{' +
		                '"surname": "' + prefillSurname + '",' +
		                '"name": "' + prefillName + '",' +
		                '"mail": "' + prefillEmail + '",' +
		                '"5050684": "' + prefillOrg + '",' +
		                '"5050685": "' + prefillPos + '",' +
		              '}' +
		            ']' +
		          '}' +
		        '};' +
		      '})();' +
		    '</script>';

		$('.timepad-widget').append(datawidget);

		$('.conference__form').addClass('d-none');
		$('.timepad-widget').removeClass('d-none');
	};

	function formFilled() { 
	    if (localStorage.getItem('5sgDNK_f') == 'true') {

	    	var surnameData = localStorage.getItem('5sgDNK_s'),
	    		nameData = localStorage.getItem('5sgDNK_n'),
	            emailData = localStorage.getItem('5sgDNK_e'),
	    		orgData = localStorage.getItem('5sgDNK_o'),
	            posData = localStorage.getItem('5sgDNK_p');
	      
			if (surnameData !== null && nameData !== null && emailData !== null && orgData !== null && posData !== null) {
				widget(surnameData, nameData, emailData, orgData, posData);
			} else {
				widget("", "", "");
			}     
		};
	};
	formFilled();

	$('#submit').click(function(e) {

    	e.preventDefault();
        var name      = $('#apply-name').val(),
        	surname   = $('#apply-surname').val(),
        	email     = $('#apply-email').val(),
        	org       = $('#apply-org').val(),
        	position  = $('#apply-position').val(),
            phone     = $('#apply-phone').val()
            urlAdr    = './server/contact.php';

        if (!name || !surname || !email || !org || !position || !phone) {

        	$('.alert-danger').removeClass('d-none');

        } else {

        	$('.alert-danger').addClass('d-none');

        	var data = {
	            name : name,
	            surname : surname,
	            email : email,
	            org : org,
	            position : position,
	            phone : phone
	        };

	        $.ajax({
	            type     : "POST",
	            url      : urlAdr,
	            data     : data,
	            dataType : "JSON",
	            success: function(xhr) {

	            	if (xhr.status == '200') {
	            		$('.conference__form').addClass('d-none');
	            		$('.alert-success').removeClass('d-none');

	            		localStorage.setItem('5sgDNK_n', name);
	            		localStorage.setItem('5sgDNK_s', surname);
				        localStorage.setItem('5sgDNK_e', email);
				        localStorage.setItem('5sgDNK_o', org);
				        localStorage.setItem('5sgDNK_p', position);
				        localStorage.setItem('5sgDNK_f', 'true');

				        widget(
				        	localStorage.getItem('5sgDNK_n'), 
				        	localStorage.getItem('5sgDNK_s'), 
				        	localStorage.getItem('5sgDNK_e'), 
				        	localStorage.getItem('5sgDNK_o'), 
				        	localStorage.getItem('5sgDNK_p'));

	            	} else if (xhr.status == '422') {
	            		$('.alert-danger').removeClass('d-none');
	            	}
		        }
	        });
        }
    });
});