jQuery(function ($) {
    $(document).ready(function () {
        let url = "/api/admin/info-covid"
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
                    console.log(res)
                    showData(res.content,res.pageable.pageNumber);
                    if (res.totalPages) {
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
    totalPage = totalPage ? totalPage : 1
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
                var url =   "/api/admin/info-covid";
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
        $("#list_info_covid").html(s1);
    }
    $.each(data, function (i, v) {
        let date = new Date(v.createdDate);
        s+=`   <tr>
                    <td class="font_text" style="color: rgb(20, 78, 140);">${pageNumber * 10 + (i + 1)}</td>
                    <td class="font_text" style="color: rgb(20, 78, 140);">${v.numberOfNfections}</td>
                    <td class="font_text" style="color: rgb(20, 78, 140);">${v.numberRecoveredCase} </td>
                    <td class="font_text" style="color: rgb(20, 78, 140);">${v.numberOfDeaths}</td>     
                    <td class="font_text" style="color: rgb(20, 78, 140);">`+date.toLocaleString('vi')+`</td>    
                    <td class="">
                            <i class="fa fa-edit" onclick="showDetailInfoCovid(${v.id})"></i>&nbsp; &nbsp; 
                            <i class="fas fa-trash-alt" style="color:red" onclick="deleteInfoCovid(${v.id})"></i>
                    </td>                     
               </tr>`

    });

    $('#list_info_covid').html(s);

}
function addInfoCovid() {

    let data = $("#addInfoCovid").getFormData();
    console.log(data)

    $.ajax({
        url:"/api/admin/info-covid",
        type:'POST',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
        data: JSON.stringify(data),
        dataType:'json',
        contentType: "application/json"
        ,
        success: function (res){
            console.log(res)
            alert("Add Fail!")
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


deleteInfoCovid =(id)=>{
    if(confirm("Do you want delete Info Covid ?")){

        $.ajax({
            url:"/api/admin/info-covid/"+id,
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

showDetailInfoCovid =(id)=>{
    $.ajax({
        url:"/api/admin/info-covid/"+id,
        type:'GET',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},

        dataType:'json',
        contentType: "application/json"
        ,
        success: function (res){
            $("#numberOfNfections_").val(res.numberOfNfections)
            $("#id_info_covid").val(res.id)
            $("#numberRecoveredCase_").val(res.numberRecoveredCase)
            $("#numberOfDeaths_").val(res.numberOfDeaths)
            $("#edit_info_covid").modal("show")

        },
        error: function (e) {
            console.log(e)

        }
    })
}


editInfoCovid = ()=>{

    let data = $("#editInfoCovid").getFormData();
    console.log("Data",data)


    $.ajax({
        url:"/api/admin/info-covid/"+ $("#id_info_covid").val(),
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
                alert("Update Info Success !")
                location.reload();
            } else  alert(e.responseJSON.message)
        }
    })
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


