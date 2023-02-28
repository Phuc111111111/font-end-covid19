var stompClient = null;
const  domain = ""
var activeSubscribers = []
$( document ).ready(function() {
    disconnect();
    connect();
})

    function connect() {
        let socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            let userId = $("#userId").val();
            let username = $("#username").val();
            stompClient.subscribe('/list-chat/message/'+userId, onMessageSendEvent);
        });

    }

    function subscribe() {
        let conversationId = $("#conversationId").val();
        stompClient.subscribe('/topic/message/'+conversationId, onMessageReceived);
    }

    function onMessageReceived(payload) {

        let username = $("#username").val();
        let message = JSON.parse(payload.body);
        if (message.type === 'CHAT') {
            if(username == message.username) {
                let row = messageRight(message)
                $('.chat-history').append(row);

            } else {
                let row = messageLeft(message)
                $('.chat-history').append(row);
            }
            showConversations();
        }
        $(".chat-history").scrollTop($(".chat-history")[0].scrollHeight);
    }

    function onMessageSendEvent(payload) {
        showConversations();
    }

    function sendEvent(event) {

        if (stompClient != null) {

            let messageContent = $('.messages').val();
            let userId = $('#userId').val();
            let conversationId =  $("#conversationId").val();
            let username = $("#username").val();
            let sendToUserId = $(".sendToUser").attr("userId");
            if(messageContent && stompClient) {
                var chatMessage = {
                    userId: userId,
                    content: messageContent,
                    conversationId: conversationId,
                    username: username,
                    token: localStorage.getItem("eln_token"),
                    type: 'CHAT'
                };

                stompClient.send('/app/chat/'+conversationId,{} , JSON.stringify(chatMessage));
                stompClient.send('/app/sendToUser/'+sendToUserId,{} , {});
                $('.messages').val("");
            }

        }
    }

    function disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
            stompClient = null;
        }
        console.log("Disconnected");
    }
// CHOOSE DOCTER
    function pushActiveSubscriber(conversationId) {
        if (!activeSubscribers.includes(conversationId)) {
            activeSubscribers.push(conversationId);
            subscribe();
        }
    }
