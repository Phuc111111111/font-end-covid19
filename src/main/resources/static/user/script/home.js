    $(document).ready(function () {
        getDoctors();
        getTotalCovid();
        getTopDocumentByCategory();
    })

    function getDoctors() {

        $.ajax({
            url: "/api/user/accounts/doctor",
            type: 'GET',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            contentType: "application/json",
            success: function (res) {
                let row = ``;
                for (let i = 0; i < res.length; i += 2) {
                    if (i == 0) row += `<div class="carousel-item active"> <div class="row">`
                    else row += `<div class="carousel-item"> <div class="row">`
                    row += showContentDoctors(res, i);
                    row += showContentDoctors(res, i + 1);
                    row += showContentDoctors(res, i + 2);
                }
                row +=`</div></div>`
                $('.doctors').html(row);
            },
            error: function (e) {
                alert(e.responseJSON.message)
            }
        });
    }

    function showContentDoctors(data, index) {

            let row =``;
            if (data[index])  {
                row+=`<div class="col-md-4 mb-3">
                            <div class="card">
                                <img class="img-fluid" alt="100%x280"
                                     src='/user/public/image/`+data[index].image+`' >
                                    <div class="card-body">
                                        <a href="/user/doctor/detail/`+data[index].id+`"><h4 class="card-title text-center">`+data[index].fullName+`</h4></a>
                                    </div>
                            </div>
                        </div>`
            }
            return row;
    }

    function getTotalCovid() {

        $.ajax({
            url: "/api/user/info-covid/total",
            type: 'GET',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            contentType: "application/json",
            success: function (res) {
                if (res) {

                    $("#number_of_nfections").html(res.numberOfNfections);
                    $("#number_recovered_case").html(res.numberRecoveredCase);
                    $("#number_of_deaths").html(res.numberOfDeaths);

                }
            },
            error: function (e) {
                alert(e.responseJSON.message)
            }
        });
    }

    function getTopDocumentByCategory() {

        $.ajax({
            url: "/api/user/document-category",
            type: 'GET',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            contentType: "application/json",
            success: function (res) {
                $.each(res, function (index, value) {
                    getDocumentByCategory(value.id, value.name);
                });
            },
            error: function (e) {
                alert(e.responseJSON.message)
            }
        });
    }

    function getDocumentByCategory(categoryId, nameCategory) {

        $.ajax({
            url: "/api/user/documents?categoryId="+categoryId+"&size="+4+"&status=ACTIVE",
            type: 'GET',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            contentType: "application/json",
            success: function (res) {

                let row = ` <div class="main__category-title-wrap d-flex">
                                    <h3>
                                        <a class="main__category-title-name text-uppercase" href="/category" title="Tiếp thị">`+ nameCategory +`</a>
                                    </h3>
                                </div>`;
                     row += ` <div class="main__grid-3-cols d-flex  flex-wrap">`
                if (res.content) {
                    $.each(res.content, function (index, value) {
                        row += ` <div class="main__grid-cols-item m-2">
                                    <a href="#" class="main__item-cols-img"
                                       title="Quy hoạch băng tần cho hệ thống di động IMT… chưa phù hợp">
                                        <img width="100%" src="/user/public/image/`+value.image+`"
                                             alt="`+value.title+`">
                                    </a>
                                    <h3>
                                        <a href="/user/detail-document/`+value.id+`" class="main__item-cols-title"
                                           title="">
                                            `+value.title+`
                                        </a>
                                    </h3>
                                </div>`
                    });
                } else  row += ` <b >Không có bài viết mới</b>`
                $('.content_document').append(row);
            },
            error: function (e) {
                alert(e.responseJSON.message)
            }
        });
    }














