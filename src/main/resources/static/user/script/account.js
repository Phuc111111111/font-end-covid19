$(document).ready(function () {
    getInfoAccount()
})

function getInfoAccount() {

    let idUser = $(".idUser").val()
    $.ajax({
        url:"/api/user/accounts/"+idUser,
        type:'GET',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        dataType:'json',
        contentType: "application/json"
        ,
        success: function (res){
            console.log(res)
            showInfor(res)
        },
        error: function (e) {
            alert(e.responseJSON.message)
        }

    })
};

function showInfor(res){
    $("#fullname").val(res.fullName)
    $("#address").val(res.address)
    $("#email").val(res.email)
    $("#phone").val(res.phone)
    $("#description").val(res.description ? res.description : "")
    $("#image_user").attr("src","/user/public/image/"+res.image)
}