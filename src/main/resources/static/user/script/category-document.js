    $(document).ready(function () {
        getListDocumentSameAs(1)
    })


    function getListDocumentSameAs(page) {
        let idCate = $(".idCate").val()
        let data = {}
        data["categoryId"] = idCate
        data["size"] = 5
        console.log(data)
        $.ajax({
            url: "/api/user/documents?status=ACTIVE&page="+page,
            type:'GET',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            data :data ,
            dataType:'json',
            contentType: "application/json"
            ,
            success: function (res){
                showDocumentSameAs(res, page);
                $('.main__viewmore-btn').attr("page", page);

            },
            error: function (e) {
                alert(e.responseJSON.message)
            }
        })
    }

    function showDocumentSameAs(res, page){
        let datas = ``
        if(res.content.length>0){
            $.each(res.content, function (i, v) {
                let s=`
                         <div class="main__news-listing-item d-flex">
                             <div class="main__nl-item-img">
                                 <a href="/user/detail-document/${v.id}" title="">
                                     <img src="/user/public/image/${v.image}" style="width: 238px;"/>
                                 </a>
                             </div>
                             <div class="main__nl-item-content">
                                 <h3>
                                     <a href="/user/detail-document/${v.id}" class="main__nl-item-title">
                                         ${v.title}
                                     </a>
                                 </h3>
                                 <div>
                                     <p>${v.content.substring(0, 200)}</p>
                                 </div>   
                             </div>
                         </div>`
                datas+=s

            });
            $(".main__news_listing-items").append(datas)

        } else {

            if (page == 1) {
                $(".main__news_listing-items").html("No documents")
            }
            $(".main__viewmore-btn").attr("style", "display: none !important");

        }
    }

    $('.main__viewmore-btn').on('click', function (){
        let page = parseInt($('.main__viewmore-btn').attr("page")) + 1;
        getListDocumentSameAs(page);
    });







