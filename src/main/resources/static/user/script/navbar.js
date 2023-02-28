jQuery(function ($) {

    $(document).ready(function () {

        let url_get_ducument_cate = "/api/user/document-category"
        getListDocumentCate(url_get_ducument_cate)
        console.log(url_get_ducument_cate)
        function getListDocumentCate(url){
            let data = {}
            data["size"] =100
            console.log(data)
            $.ajax({
                url:url,
                type:'GET',
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                data :data ,
                dataType:'json',
                contentType: "application/json"
                ,
                success: function (res){
                    console.log(res)
                    showDocumentCate(res)
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
    })

});


function showDocumentCate(res){
    let datas = `<li>
                    <a href="/user/home" class="active" title="Trang chủ">
                        <span class="main__navbar-icon">
                            <i class="sprite sprite-home"></i>
                        </span>
                        <span>Trang chủ</span>
                    </a>
                </li>`
    if(res.length>0){
        $.each(res, function (i, v) {
            let s=` <li><a href="/user/detail-category/${v.id}">${v.name}</a></li>`
            datas+=s
        });
        $(".list_document_category").html(datas)
    }
}







