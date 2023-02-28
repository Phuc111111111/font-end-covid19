    $(document).ready(function () {
        getDetailDocument();
        call_api_load_comment(1);
    });

    function getDetailDocument() {
        let idDocument = $(".idDocument").val()
        let url = "/api/user/documents/"+idDocument
        $.ajax({
            url:url,
            type:'GET',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            contentType: "application/json"
            ,
            success: function (res){
                console.log("info_document",res)
                showDataInfo(res)
            },
            error: function (e) {
                console.log(e);
            }
        })
    }


    $( ".load_more_comment").click(function() {
        let page =  parseInt($('.load_more_comment').attr("page")) + 1;
        call_api_load_comment(page)
    });

    function call_api_load_comment(page) {
        let idDocument = $(".idDocument").val()
        let url = "/api/user/comments/"+idDocument+"?page="+page
        $.ajax({
            url:url,
            type:'GET',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            contentType: "application/json"
            ,
            success: function (res){
                showComment(res, page)
                $( ".load_more_comment").attr("page", page);
            },
            error: function (e) {
                alert(e.responseJSON.message)
            }
        })
    }

    function showDataInfo(res) {
        let date = new Date(res.createdDate);
        $(".main__detail-blog-title").html(res.title)
        $(".main__post-time").html(date.toLocaleString('vi'))
        $(".main__detail-blog-content").html(res.content)
    }

    function sendComment() {
        let text_comment = $("#txtComment").val()
        if(!text_comment) alert("Vui lòng nhập bình luận")

        else {
            let idDocument = $(".idDocument").val()
            let object = {}
            object["documentId"] = idDocument
            object["content"] = text_comment

            $.ajax({
                url:"/api/user/comments",
                type:'POST',
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                data: JSON.stringify(object),
                contentType: "application/json"
                ,
                success: function (res){
                    $("#txtComment").val("")
                    call_api_load_comment(1);
                },
                error: function (e) {
                      alert(e.responseJSON.message)
                }
            })

        }
    }

    function showComment(res, page) {
       let datas = ``
       if(res.content.length>0){
             $.each(res.content, function (i, v) {
                    let date = new Date(v.createdDate);
                     let s=`
                         <div class="comment_ele d-flex">
                             <div class="img_parent_comment " style="width: 6%;">
                                 <img src="/user/public/image/${v.userDTO.image}" style="width: 36px; height: 36px;border-radius: 50%;">
                             </div>
                             <div class="parent_comment_container" style="width: 94%;">
                                 <div class="main_comment_parent">
                                     <div class="content_parent_comment">
                                         <b class="name_author">${v.userDTO.fullName}</b> &nbsp;
                                         ${v.content}
                                     </div>
                                     <div class="navbar_reply d-flex mt-3">
                                         <div>
                                             <p  class="time_reply_comment text_common_for_comment">`+date.toLocaleString('vi')+`</p>
                                         </div>
                                     </div>
                                 </div>
    
                             </div>
                         </div>`
                         datas+=s

              });
                if (page == 1)   $(".list_comments").html(datas)
                else   $(".list_comments").append(datas)

        } else {
          $(".list_comments").append("")
          $(".more_comment").css("display","none")
        }

    }







