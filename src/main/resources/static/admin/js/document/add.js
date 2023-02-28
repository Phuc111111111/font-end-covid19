    $(document).ready(function() {
        $("#txtEditor").Editor();

    });

    function readURL(input) {
        if (input.files && input.files[0]) {
                let ele =$('#upload_image')
                uploadFile(input.files[0],ele)
        }
    }


    function add() {
            if(confirm("Do you want add ?")) {
                let id = $('.idDocument').val();
                var formData = $('#formEditDocument').serializeArray();
                        var data = {};
                        $.each(formData,function(i,v) {
                            if (v.name!='imageFile') {
                                data[v.name] = v.value;
                            }
                        });
                        data['content'] =$("#txtEditor").Editor("getText")
                        data['image'] = $('#upload_image').attr('nameFile');

                        $.ajax({
                            url: '/api/admin/documents',
                            type: 'POST',
                            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                            data: JSON.stringify(data),
                            dataType: "json",
                            contentType: "application/json",
                            success: function (res) {

                            },
                            error:function (e) {
                                if (e.status == 200) {
                                   alert("Add success !")
                                   window.location.replace("/admin/documents");
                                } else  alert(e.responseJSON.message)

                            }
                        });
            }
        }