jQuery(function ($) {
    $(document).ready(function () {
        let url = "/api/admin/accounts"
        getAllAccount(url);

        function getAllAccount(url){

            $.ajax({
                url:url,
                type:'GET',
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                // data: JSON.stringify(data),
                dataType:'json',
                contentType: "application/json"
               ,
                success: function (res){

                    showData(res.content,res.pageable.pageNumber);
                   if(res.totalPages){
                       paging(res.totalPages,res.pageable.pageNumber)
                   }
                },
                error: function (e) {
                    console.log(e);
                }
            })
        }

    })

});
function paging(totalPage,currentPage) {
    totalPage = totalPage ? totalPage : 0
    currentPage = currentPage? currentPage+1 : 1
    $('#pagination-test').twbsPagination({
        totalPages: totalPage,
        startPage: currentPage,
        visiblePages: 10,
        last:'LAST',
        next:'NEXT',
        first:'FIRST',
        prev:'PREV',
        onPageClick: function (event, page) {
            if (currentPage != page) {
                var url =   "/api/admin/accounts";
                url += "?page=" + page;
                getAllAccount(url);
            }
        }
    });
}

function showData(data,pageNumber) {
    console.log(data)

    var s = '';
    if (data.length === 0) {
        var s1 = `<div class="alert alert-warning text-center w-100 mt-3" style="color: #f6821f;  background-color: #fff3cd; border-color: #ffeeba; margin-top: 200px;">
             <i class="fa fa-exclamation-triangle"></i> Not record ! `;
        s += `   <tr style="background-color: white">
                <td colspan="100">` + s1 + `</td>
                </tr> `;
        $("#list_accounts").html(s1);
    }
    $.each(data, function (i, v) {
        s+=`   <tr>
                            <td class="font_text" style="color: rgb(20, 78, 140);">${pageNumber * 10 + (i + 1)}</td>
                            <td class="font_text" style="color: rgb(20, 78, 140);">${v.fullName}</td>
                            <td class="font_text" style="color: rgb(20, 78, 140);">${v.email} </td>
                            <td class="font_text" style="color: rgb(20, 78, 140);">${v.phone}</td>
                            <td class="font_text" style="color: rgb(20, 78, 140);">${v.address}</td> `;
        if(v.status==='ACTIVE') s+=` <td class="text-align-center-cls"><label style="color: green">ACTIVE</label></td>`
        else s+=` <td class="text-align-center-cls"><label style="color: red">INACTIVE</label></td>`
        s+=`
                           
                            <td class="">
                                <i class="fa fa-edit" onclick="showDetailAccount(${v.id})"></i>&nbsp; &nbsp; 
                                <i class="fas fa-trash-alt" style="color:red" onclick="deleteAccount(${v.id})"></i>
                            </td>
                            
                        </tr>`

    });

    $('#list_accounts').html(s);

}

function addAccount() {

    let data = $("#addAccount").getFormData();

    data["image"]  =  $('#upload_image').attr("nameFile");
    console.log(data)

    $.ajax({
        url:"/api/admin/accounts",
        type:'POST',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        data: JSON.stringify(data),
        dataType:'json',
        contentType: "application/json"
        ,
        success: function (res){
            console.log(res.message)
           // location.reload()
        },
        error: function (e) {
            if (e.status == 200) {
                alert("Add Success !")
                location.reload()
            } else alert(e.responseJSON.message)
        }
    })
}


searchAccount = ()=>{
    let data = {}
    data["keyword"] = $("#key_account").val()
    $.ajax({
        url:"/api/admin/accounts",
        type:'GET',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        data: data,
        dataType:'json',
        contentType: "application/json"
        ,
        success: function (res){
            showData(res.content,res.pageable.pageNumber);
            paging(res.totalPages,res.pageable.pageNumber)
        },
        error: function (e) {
            console.log(e)
        }
    })
}

$('#key_account').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        searchAccount()
    }
});

deleteAccount =(id)=>{
    if(confirm("Do you want delete account ?")){

        $.ajax({
            url:"/api/admin/accounts/"+id,
            type:'DELETE',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},

            dataType:'json',
            contentType: "application/json"
            ,
            success: function (res){
                alert(res.message)
                location.reload()
            },
            error: function (e) {
               if (e.status == 200) {
                   alert("Delete Success !")
                   location.reload()
               } else alert(e.responseJSON.message)

            }
        })
    }
}

showDetailAccount =(id)=>{
    $.ajax({
        url:"/api/admin/accounts/"+id,
        type:'GET',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},

        dataType:'json',
        contentType: "application/json"
        ,
        success: function (res){
            $("#idAccount").val(id)
            $("#username_").val(res.username)
            $("#fullName_").val(res.fullName)
            $("#address_").val(res.address)
            $("#phone_").val(res.phone)
            $("#email_").val(res.email)
            $("#upload_image_edit").attr("src","/admin/public/image/"+res.image)
            $("#edit_account").modal("show")
            let role = getRole(fethcRole(),res.role)
            $("#role_").html(role)
            let status = getStatus(res.status)
            $("#status_").html(status)


        },
        error: function (e) {
            console.log(e)

        }
    })
}

fethcRole = ()=>{
    return  arr = [
       'USER',
       'ADMIN',
       'DOCTOR'
    ];
}

getRole = (array,role)=>{
    let s =``
    $(array).each(function( index,val ) {
        if(val===role)  s+=`<option value=${val} selected>${val}</option>`
        else s+=`<option value=${val}>${val}</option>`
    });
    return s
}

getStatus = (status)=>{
    let s =``

    if(status==="INACTIVE")  s+=`<option value="INACTIVE" selected> INACTIVE</option>
                             <option value="ACTIVE">ACTIVE</option>`
    else s+=`<option value="INACTIVE" > INACTIVE</option>
         <option value="ACTIVE" selected>ACTIVE</option>`
    return s
}


editAccount = ()=>{

    let data = $("#editAccount").getFormData();
    console.log("Data",data)
    data['image'] = $('#upload_image_edit').attr("nameFile");

    $.ajax({
        url:"/api/admin/accounts/"+ $("#idAccount").val(),
        type:'PUT',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        data: JSON.stringify(data),
        dataType:'json',
        contentType: "application/json"
        ,
        success: function (res){
            console.log(res.message)
            // location.reload()
        },
        error: function (e) {
            if (e.status == 200) {
                alert("Update Success !")
                location.reload();
            } else  alert(e.responseJSON.message)
        }
    })
}

function readURL(input,edit) {
    if (input.files && input.files[0]) {
            if(edit){
                let ele = $('#upload_image_edit')
                uploadFile(input.files[0],ele)
            }else{

                let ele =$('#upload_image')
                uploadFile(input.files[0],ele)
            }
    }
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


function uploadFile (inputFile , ele){
    var formData = new FormData();
    formData.append('file',  inputFile);
    $.ajax({
        url : '/api/admin/images/upload',

        type : 'POST',
        enctype: 'multipart/form-data',
        data : formData,
        processData: false,  // Important!
        contentType: false,
        cache: false,
        success : function(result) {

            console.log(result);
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
