    function addAccount() {

        var formData = $('#addAccount').serializeArray();
        var data = {};
        $.each(formData,function(i,v) {
              data[v.name] = v.value;
        });

        $.ajax({
            url:"/api/user/accounts/register",
            type:'POST',
            headers: {"Authorization": 'Bearer ' + localStorage.getItem("eln_token")},
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (res) {
                   alert("Add Success !")
                   window.location.replace("/")
            },
            error: function (e) {
                alert(e.responseJSON.message)
            }
        })
    }