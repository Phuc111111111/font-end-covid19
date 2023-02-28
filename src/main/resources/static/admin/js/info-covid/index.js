jQuery(function ($) {
    $(document).ready(function () {
        let url = "/api/admin/info-covid/total"
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

                $("#number_of_nfections").html(res.numberOfNfections);
                $("#number_recovered_case").html(res.numberRecoveredCase);
                $("#number_of_deaths").html(res.numberOfDeaths);


            },
            error: function (e) {
                console.log(e);
            }
        })
    })
});
