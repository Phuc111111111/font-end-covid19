jQuery(function ($) {
    $(document).ready(function () {
        let url = "/api/admin/document-category"
        getAllDocumentCategory(url);

        function getAllDocumentCategory(url){

            $.ajax({
                url:url,
                type:'GET',
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                // data: JSON.stringify(data),
                dataType:'json',
                contentType: "application/json"
                ,
                success: function (res){
                    console.log(res)
                    showData(res);
                },
                error: function (e) {
                    console.log(e);
                }
            })
        }

    })

});

function showData(data) {

    var s = '';
    if (data.length === 0) {
        var s1 = `<div class="alert alert-warning text-center w-100 mt-3" style="color: #f6821f;  background-color: #fff3cd; border-color: #ffeeba; margin-top: 200px;">
             <i class="fa fa-exclamation-triangle"></i> Not record ! `;
        s += `   <tr style="background-color: white">
                <td colspan="100">` + s1 + `</td>
                </tr> `;
        $("#list_document_cates").html(s1);
    }
    $.each(data, function (i, v) {
    s+=`   <tr>
                 <td class="font_text" style="color: rgb(20, 78, 140);">${(i + 1)}</td>
                 <td class="font_text" style="color: rgb(20, 78, 140);">${v.name}</td>
                 <td class="">
                    <i class="fa fa-edit" onclick="showDetailDocumentCategory(${v.id})"></i>&nbsp; &nbsp; 
                    <i class="fas fa-trash-alt" style="color:red" onclick="deleteDocumentCategory(${v.id})"></i>
                 </td>
            </tr>
         

` ;

    });

    $('#list_document_cates').html(s);

}
function addDocumentCategory() {

    let data = $("#addDocumentCate").getFormData();
    // add_new_document-cate
    $.ajax({
        url:"/api/admin/document-category",
        type:'POST',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        data: JSON.stringify(data),
        dataType:'json',
        contentType: "application/json"
        ,
        success: function (res){
            alert("Add Fail !")
           location.reload()
        },
        error: function (e) {
            console.log(e)
            if (e.status == 200) {
                alert("Add Success !")
                location.reload()
            } else alert(e.responseJSON.message)
        }
    })
}


searchDocumentCategory = ()=>{
    let data = {}
    data["keyword"] = $("#key_document_cate").val()
    $.ajax({
        url:"/api/admin/document-category",
        type:'GET',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        data: data,
        dataType:'json',
        contentType: "application/json"
        ,
        success: function (res){
            console.log(res)
            showData(res);

        },
        error: function (e) {
            console.log(e)
        }
    })
}

$('#key_document_cate').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        searchDocumentCategory()
    }
});

deleteDocumentCategory =(id)=>{
    if(confirm("Do you want delete Document Category?")){

        $.ajax({
            url:"/api/admin/document-category/"+id,
            type:'DELETE',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},

            dataType:'json',
            contentType: "application/json"
            ,
            success: function (res){
                alert("Delete Fail !")
                location.reload()
            },
            error: function (e) {
               alert("Delete Success!")
            }
        })
    }
}

showDetailDocumentCategory =(id)=>{
    $.ajax({
        url:"/api/admin/document-category/"+id,
        type:'GET',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},

        dataType:'json',
        contentType: "application/json"
        ,
        success: function (res){
            $("#name_").val(res.name)
            $("#idDocumentCate").val(res.id)
            $("#edit_document-cate").modal("show")
        },
        error: function (e) {
            console.log(e)

        }
    })
}


editDocumentCategory = ()=>{
    //edit_document-cate
    let data = $("#editDocumentCategory").getFormData();

    $.ajax({
        url:"/api/admin/document-category/"+ $("#idDocumentCate").val(),
        type:'PUT',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        data: JSON.stringify(data),
        dataType:'json',
        contentType: "application/json"
        ,
        success: function (res){
            alert("Update Fail !")
            location.reload()
        },
        error: function (e) {
            console.log(e)
            if (e.status == 200) {
                alert("Update Success !")
                location.reload()
            } else alert(e.responseJSON.message)
        }
    })
}



(function($){
    $.fn.getFormData = function(){
        var data = {};
        var dataArray = $(this).serializeArray();
        for(var i=0;i<dataArray.length;i++){
            data[dataArray[i].name] = dataArray[i].value;
        }
        return data;
    }
})(jQuery);

