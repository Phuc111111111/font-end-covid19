    jQuery(function ($) {
        $(document).ready(function () {

            getAll(1);

            function getAll(page){
                let url = setUrl(page);
                $.ajax({
                    url:url,
                    type:'GET',
                    headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                    dataType:'json',
                    contentType: "application/json"
                   ,
                    success: function (res){
                        showData(res.content, res.pageable.pageNumber, res.pageable.pageSize);
                        paging(res.totalPages,res.pageable.pageNumber)
                    },
                    error: function (e) {
                        console.log(e);
                    }
                })
            }



             search = ()=>{
                            getAll(1);
                        }

            $('.input-search').keypress(function(event){
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if(keycode == '13'){
                     getAll(1);
                }
            });


            function paging(totalPage,currentPage) {
                totalPage = totalPage ? totalPage : 0
                currentPage = currentPage? currentPage+1 : 1
                $('#pagination-test').twbsPagination({
                    totalPages: totalPage,
                    startPage: currentPage,
                    visiblePages: 10,
                    last:'Cuối cùng',
                    next:'Tiếp theo',
                    first:'Đầu tiên',
                    prev:'Phía trước',
                    onPageClick: function (event, page) {

                            getAll(page)

                    }
                });
            }

        })




    });



    function setUrl(page) {
        let url = "/api/admin/documents?page="+page
        if($('.input-search').val()) {
            url+= "&keyword="+$('.input-search').val()
        }
        if ($('#document-category').val()) {
            url+= "&categoryId="+$('#document-category').val()
        }
        return url;
    }

    function showData(data, pageNumber, pageSize) {

        var list = '';
        if (data.length === 0) {
            var s1 = `<div class="alert alert-warning text-center w-100 mt-3" style="color: #f6821f;  background-color: #fff3cd; border-color: #ffeeba; margin-top: 200px;">
                 <i class="fa fa-exclamation-triangle"></i> Không tìm thấy bản ghi nào ! `;
            list += `   <tr style="background-color: white">
                    <td colspan="100">` + s1 + `</td>
                    </tr> `;
            $("#list_accounts").html(s1);
        }
        $.each(data, function (i, v) {
            list +=`   <tr>
                                <td class="font_text" style="color: rgb(20, 78, 140);">${(pageNumber)*(pageSize)+ (i+1) }</td>
                                <td class="font_text" style="color: rgb(20, 78, 140);">${v.title}</td>`
            if(v.status==='ACTIVE') list+=`<td class="text-align-center-cls"><label style="color: green">Có hiệu lực</label></td>`
            else list +=` <td class="text-align-center-cls"><label style="color: red"> Khóa </label></td>`
            list +=`
                    <td class="">
                        <a href="/admin/documents/edit/${v.id}"><i class="fa fa-edit" ></i></a>&nbsp; &nbsp;
                        <a href="/admin/comments/${v.id}"><i class="fa fa-comments" aria-hidden="true"></i></a>&nbsp; &nbsp;
                        <i class="fas fa-trash-alt" style="color:red" onclick="deletes(${v.id})"></i>

                    </td>

                </tr>`

        });

        $('#body-document').html(list);

    }



    deletes =(id)=>{
        if(confirm("Bạn muốn xóa bài viết này ?")){

            $.ajax({
                url:"/api/admin/documents/"+id,
                type:'DELETE',
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
                dataType:'json',
                contentType: "application/json",
                success: function (res){
                    alert(res.message)
                    location.reload()
                },
                error: function (e) {
                   if (e.status == 200) {
                       alert("Xóa bài viết thành công!")
                       location.reload()
                   } else alert(e.responseJSON.message)
                }
            })
        }
    }


