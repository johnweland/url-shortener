const utils = {
    alert: {
        create: (data) => {
            let dialog = $('<div>', {class: `alert alert-${data.statuscode} alert-dismissible fade show`, role: "alert"}).prependTo('.alert-area');
            let msg = ' ' + data.msg;
            if (data.status) {
                $('<strong>', {text: data.status}).prependTo(dialog);
            }
            $(dialog).append(msg);

            let close = $('<button>', {type:"button", class:"close", "data-dismiss":"alert", 'aria-label':"Close"}).appendTo(dialog);
            $('<span>', {'aria-hidden':"true"}).append('&times;').appendTo(close);
            utils.alert.timeout(dialog);
        },
        timeout: (target) => {
            setTimeout(function() {
                $(target).alert('close');
            }, 1000);
        }
    }
}