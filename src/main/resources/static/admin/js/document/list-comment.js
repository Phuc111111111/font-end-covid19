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

    })



    $('.input-search').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            getAll(1);
        }
    });

});

function paging(totalPage,currentPage) {
    totalPage = totalPage ? totalPage : 0
    currentPage = currentPage? currentPage+1 : 1
    $('#pagination-test').twbsPagination({
        totalPages: totalPage,
        startPage: currentPage,
        visiblePages: 10,
        last:'last',
        next:'next',
        first:'first',
        prev:'prev',
        onPageClick: function (event, page) {
            if (currentPage != page) {
                getAll(page)
            }
        }
    });
}

function setUrl(page) {
    let idDocument = $('#idDocument').val();
    let url = "/api/admin/comments/"+idDocument+"?page="+page
    if($('.input-search').val()) {
        url+= "&keyword="+$('.input-search').val()
    }
    return url;
}

function showData(data, pageNumber, pageSize) {

    var list = '';
    if (data.length === 0) {
        var s1 = `<div class="alert alert-warning text-center w-100 mt-3" style="color: #f6821f;  background-color: #fff3cd; border-color: #ffeeba; margin-top: 200px;">
                 <i class="fa fa-exclamation-triangle"></i> Not found ! `;
        list += `   <tr style="background-color: white">
                    <td colspan="100">` + s1 + `</td>
                    </tr> `;
        $("#list_accounts").html(s1);
    }

    $.each(data, function (i, v) {
        let date = new Date(v.createdDate);
        list +=`   <tr>
                                <td class="font_text" style="color: rgb(20, 78, 140);">${(pageNumber)*(pageSize)+ (i+1) }</td>
                                <td class="font_text" style="color: rgb(20, 78, 140);">${v.content}</td>
                                <td class="font_text" style="color: rgb(20, 78, 140);">`+date.toLocaleString('vi')+`</td>`

        list +=`
                    <td class="">
                        <i class="fas fa-trash-alt" style="color:red" onclick="deletes(${v.id})"></i>
                    </td>
                </tr>`
    });

    $('#body-content').html(list);

}



deletes =(id)=>{
    if(confirm("Do you want delete ?")){

        $.ajax({
            url:"/api/admin/comments/"+id,
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
                    alert("delete success!")
                    location.reload()
                } else alert(e.responseJSON.message)
            }
        })
    }
}


