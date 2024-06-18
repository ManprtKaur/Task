$(document).ready(function() {
    
    $('.btnRun').click(function() {
        $('#errorMessage').html('');
        $('#txtElevation').html('');
        $('#txtElevation2').html('');
        $('#txtOcean').html('');

        let lat, lng, apiType;
        apiType = $(this).data('api');

        if (apiType === 'ocean') {
            lat = $('#selLat').val();
            lng = $('#selLng').val();
        } else if (apiType === 'srtm1') {
            lat = $('#latInput').val();
            lng = $('#lngInput').val();
        } else if (apiType === 'gtopo30') {
            lat = $('#lat').val();
            lng = $('#lng').val();
        }

        let url = "";
        let dataKey = "";

        if (apiType === "ocean") {
            url = "libs/php/getOceanInfo.php";
            dataKey = "ocean";
        } else if (apiType === "srtm1") {
            url = "libs/php/getSRTM1Info.php";
            dataKey = "srtm1";
        } else if (apiType === "gtopo30") {
            url = "libs/php/getGTOPO30Info.php";
            dataKey = "gtopo30";
        }
        
        // First AJAX request (SRTM1)
        $.ajax({
            url: "libs/php/getSRTM1Info.php",
            type: 'POST',
            dataType: 'json',
            data: {
                lat: $('#latInput').val(),
                lng: $('#lngInput').val()
            },
            success: function(result) {
                console.log(JSON.stringify(result));
                if (result.status.name == "ok") {
                    $('#txtElevation2').html(result['data']['srtm1']);
                    console.log(result);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error: " + textStatus + ", " + errorThrown);
                $('#errorMessage').html("An error occurred: " + textStatus + ", " + errorThrown);
            }
        });
        
        // Second AJAX request (Ocean)
        $.ajax({
            url: "libs/php/getOceanInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                lat: $('#selLat').val(),
                lng: $('#selLng').val()
            },
            success: function(result) {
                console.log(JSON.stringify(result));
                console.log(result);
                if (result.status.name == "ok") {
                    if (result.data && result.data.ocean && result.data.ocean.name) {
                        $('#txtOcean').html(result.data.ocean.name);
                    } else {
                        $('#errorMessage').html("Expected data is missing in the response.");
                        console.error("Error: Expected data is missing in the response.");
                    }
                } else {
                    $('#errorMessage').html("An error occurred: " + result.status.name);
                    console.error("Error: " + result.status.name);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error: " + textStatus + ", " + errorThrown);
                console.log(jqXHR);
                $('#errorMessage').html("An error occurred: " + textStatus + ", " + errorThrown);
            }
        });

        // Third AJAX request (GTOPO30)
        $.ajax({
            url: "libs/php/getGTOPO30Info.php",
            type: 'POST',
            dataType: 'json',
            data: {
                lat: $('#lat').val(),
                lng: $('#lng').val()
            },
            success: function(result) {
                console.log(JSON.stringify(result));
                if (result.status.name == "ok") {
                    $('#txtElevation').html(result['data']['gtopo30']);
                    console.log(result);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error: " + textStatus + ", " + errorThrown);
                $('#errorMessage').html("An error occurred: " + textStatus + ", " + errorThrown);
            }
        });
    });
});
