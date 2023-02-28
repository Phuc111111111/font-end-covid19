
$(document).ready(function () {
    getInfoDoctor()
})

function getInfoDoctor() {

    let idDoctor = $(".idDoctor").val()
    $.ajax({
        url:"/api/user/accounts/"+idDoctor,
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
}

$('.btn-chat-doctor').on('click', function (e) {
    e.preventDefault();
    let idDoctor = $(".idDoctor").val()
    $.ajax({
        url:"/api/user/conversations/doctor/"+idDoctor,
        type:'POST',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        contentType: "application/json"
        ,
        success: function (res){

            window.location.href ="/user/chat";
        },
        error: function (e) {
            alert(e.responseJSON.message)
        }, complete: function (e) {

            window.location.href ="/user/chat";
        }

    })
});

function showInfor(res){
    $("#fullname").val(res.fullName)
    $("#address").val(res.address)
    $("#email").val(res.email)
    $("#phone").val(res.phone)
    $("#description").val(res.description ? res.description : "Là một bác sĩ tâm huyết tuyệt vời !")
    $("#image_user").attr("src","/user/public/image/"+res.image)
}







