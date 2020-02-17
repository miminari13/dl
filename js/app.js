$(document).ready(function() {
	$('#apply-phone').mask("+7 (999) 999-99-99");

	 $('#submit').click(function(e) {

    	e.preventDefault();
        var name      = $('#apply-name').val(),
        	email     = $('#apply-email').val(),
        	org       = $('#apply-org').val(),
        	position  = $('#apply-position').val(),
            phone     = $('#apply-phone').val()
            urlAdr    = './server/contact.php';

        if (!name || !email || !org || !position || !phone) {

        	$('.alert-danger').removeClass('d-none');

        } else {

        	$('.alert-danger').addClass('d-none');

        	var data = {
	            name : name,
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
	            	console.log(xhr);
	            	if (xhr.status == '200') {
	            		$('.conference__form').addClass('d-none');
	            		$('.alert-success').removeClass('d-none');
	            	} else if (xhr.status == '422') {
	            		$('.alert-danger').removeClass('d-none');
	            	}
		        }
	        });
        }
    });
});