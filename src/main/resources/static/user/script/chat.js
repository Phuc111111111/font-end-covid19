$(document).ready(function () {
    showConversations();
})
var page = 1;

function showConversations() {

    $.ajax({
        url:"/api/user/conversation-users",
        type:'GET',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        contentType: "application/json",
        success: function (res){
            let row=``;
            $.each(res, function (index, value) {
                row+=` <li onclick="chatWith(this)" class="clearfix conversations" userId="`+value.user.id+`" conversationId="`+value.conversationId+`" name="`+value.user.fullName+`">`;
                if(value.user.image) {
                    row+=` <img src="/user/public/image/`+value.user.image+`" alt="avatar">`;
                } else {
                    row+=` <img src="/user/static/user/image/default-user-image.png" alt="avatar">`;
                }

                row+=`<div class="about d-flex">

                                    <div class="name">`+value.user.fullName+`</div>`;
                        if(value.isRead == 1) {
                            row+=`<div><i class="fa fa-commenting" style="color: red" aria-hidden="true"></i></div>`;
                        }

                    row+=`</div>
                        </li>`;
            });
            $('.list-unstyled').html(row);
        },
        error: function (e) {
            alert(e.responseJSON.message)
        }
    })
}


function chatWith(btn) {
    page = 1;
    let conversationId =  $(btn).attr("conversationId");
    let userId = $(btn).attr("userId");
    let name = $(btn).attr("name");

    showChatWith(page, conversationId, userId, name, true)

}



function showChatWith(page, conversationId, userId, name, isScrollTop) {
    $.ajax({
        url:"/api/user/messages/"+conversationId+"?page="+page,
        type:'GET',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        contentType: "application/json",
        success: function (res){
            let row=` <ul class="m-b-0">`;
            if (res.content ) {
                $.each(res.content.reverse(), function (index, value) {
                    let date = new Date(value.createdDate);
                    if (value.currentId == value.userId) {
                        row+=`<li class="clearfix">
                            <div class="message-data text-right">
                                <span class="message-data-time">`+date.toLocaleString('vi')+`</span>
                            </div>
                            <div class="message other-message float-right">`+value.content+`</div>
                        </li>`
                    } else {
                        row+=`<li class="clearfix">
                            <div class="message-data">
                                <span class="message-data-time">`+date.toLocaleString('vi')+`</span>
                            </div>
                            <div class="message other-message">`+value.content+`</div>
                        </li>`
                    }

                });
                row+=` </ul>`;
                if (isScrollTop) {
                    $('.chat-history').html(row);
                } else  $('.chat-history').prepend(row);
            }
            $('#conversationId').val(conversationId);
            $('.chat-about').html(` <h6 class="m-b-0 sendToUser" userId="`+userId+`" name="`+name+`" style="font-weight: bold">`+name+`</h6>`);

            if (isScrollTop) {
                $(".chat-history").scrollTop($(".chat-history")[0].scrollHeight);
            }

        },
        error: function (e) {
            alert(e.responseJSON.message)
        }, complete :function (res) {
            pushActiveSubscriber($('#conversationId').val());
        }
    })
}
function messageLeft(value) {
    let date = new Date(value.createdDate);
    let row = ``;
    row+=`<li class="clearfix">
                            <div class="message-data">
                                <span class="message-data-time">`+date.toLocaleString('vi')+`</span>
                            </div>
                            <div class="message other-message">`+value.content+`</div>
                        </li>`
    return row;
}
function messageRight(value) {
    let date = new Date(value.createdDate);
    let row = ``;
    row+=`<li class="clearfix">
                            <div class="message-data text-right">
                                <span class="message-data-time">`+date.toLocaleString('vi')+`</span>
                            </div>
                            <div class="message other-message float-right">`+value.content+`</div>
                        </li>`
    return row;
}

$('.chat-history ul').scroll(function () {
    if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        console.log("1")
    }
});

$('.chat-history').on('scroll', function() {
    let div = $(this).get(0);
    if(div.scrollTop == 0) {
        page++;
        let conversationId = $("#conversationId").val();
        let userId = $('.sendToUser').attr("userId")
        let name = $('.sendToUser').attr("name")
        showChatWith(page, conversationId, userId, name, false)
    }
});