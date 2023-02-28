    $(document).ready(function() {
        $("#txtEditor").Editor();
        show();
    });

    function edit() {
        if(confirm("Do you want edit ?")) {
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
                        url: '/api/admin/documents/'+id,
                        type: 'PUT',
                        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                        data: JSON.stringify(data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (res) {

                        },
                        error:function (e) {
                            if (e.status == 200) {
                               alert("Update success !")
                                location.reload();
                            } else  alert(e.responseJSON.message)

                        }
                    });
        }
    }

     function show() {
             let id = $('.idDocument').val();
            $.ajax({
                url: '/api/admin/documents/'+id,
                type: 'GET',
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                dataType: "json",
                contentType: "application/json",
                success: function (res) {
                    $('#title').val(res.title);
                    $('#statusDocument').val(res.status);
                    $('#txtEditor').Editor('setText',res.content);
                    $('#categoryId').val(res.categoryId);

                    $("#upload_image").attr("src","/admin/public/image/"+res.image)
                    $("#upload_image").attr("nameFile",res.image)
                },
                error:function (e) {
                    console.log(e);
                }
            });
      }

      function readURL(input) {
          if (input.files && input.files[0]) {
                  let ele =$('#upload_image')
                  uploadFile(input.files[0],ele)
          }
      }



