function uploadFile (inputFile , ele){
    var formData = new FormData();
    formData.append('file',  inputFile);
    $.ajax({
        url : '/api/admin/images/upload',
        type : 'POST',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        enctype: 'multipart/form-data',
        data : formData,
        processData: false,  // Important!
        contentType: false,
        cache: false,
        success : function(result) {
            if(result){
                ele.attr("src","/admin/public/image/"+result);
                ele.attr("nameFile", result);
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log( 'The following error occured: ' + textStatus, errorThrown );
        }
    });
}


