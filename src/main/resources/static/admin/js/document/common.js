$(document).ready(function () {
   getAllDocumentCategory();
})

 function getAllDocumentCategory() {

        $.ajax({
            url: '/api/admin/document-category',
            type:'GET',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            dataType:'json',
            contentType: "application/json"
            ,
            success: function (res){
               let row=` <option value="">-Choose option category-</option>`
                $.each(res, function (index, value) {

                     row+=` <option value="${value.id}">${value.name}</option>`
                });
                $('#categoryId').html(row);
            },
            error: function (e) {
                console.log(e);
            }
        })
    }