$(function() {
	$('#submit').on('click', function() {
		var userInput = $('input[name="question"]').val();
		
		if (userInput == "") {
			$("#gmapresult").text("Grandpy: Vous n'avez rien mis dans la barre de recherche!");
			$("#map").css({display:"none"})
			$("#wikireuslt").css({display:"none"})
		}
		else {
			$.getJSON(			
				//url
				'/_get_json',				
				//data
				{question: userInput},  	
				//func
				function (data) {			

					if (typeof data.failure_msg !== 'undefined') {	
						$("#gmapresult").text(data.failure_msg)
						$("#map").css({display:"none"})
					}
					else {
						$("#gmapresult").text(data.message1);
						$("#wikireuslt").text(data.message2);
						$("#wikireuslt").css({display:"block"})

						var lat = parseFloat(data.lat)
						var lng = parseFloat(data.lng)

	                	initMap(lat, lng);
	                	$("#map").css({display:"block"})				
					}
				}
			);
		}
	});		
});


function initMap(lat, lng) {

	var pos = {lat: +lat, lng: +lng};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: pos
    });

    var marker = new google.maps.Marker({
        position: pos,
        map: map
    })
};
