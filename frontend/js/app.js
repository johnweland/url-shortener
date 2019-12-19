
const dt =  {
    table: null,
    windowLoad: () => {
        $('body').on('click', '.add', dt.add);
        $('body').on('click', '.delete', dt.delete);
        dt.table = $('#datatable').DataTable({
            ajax: "http://localhost:5000/api/list",
            columns: [
                {data:null, title: "Action", class: "col-action"},
                {data:"longURL", title:"Original", class: "col-origin"},
                {data:"shortURL", title:"Short", class: "col-short"},
                {data:"clicks", title:"Clicks", class: "col-clicks"},
                {data:"date", title:"Date", class: "col-date"}
            ],
            rowCallback: dt.formatRow,
            drawCallback: dt.redraw
        });
    },
    formatRow: (row, data) => {
        $(".col-action", row).html(
            $("<button>")
            .attr("data-id", data._id)
            .addClass('delete far fa-trash-alt')
        );
        $(".col-origin", row).html(
            $("<a>")
            .attr("href", data.longURL)
            .text(data.longURL)
        );
        $(".col-short", row).html(
            $("<a>")
            .attr("href", data.shortURL)
            .text(data.shortURL)
        );
        $(".col-clicks", row).html(data.clicks);
        $(".col-date", row).html(() => {
            let date = new Date(data.date);
            return date.toLocaleDateString("en-US");
        });
    },
    redraw: () => {
        let $tr = $('<tr>', {class: "add-row"}).prependTo('tbody');
        $('<td>', {class: 'add-action'}).appendTo($tr);
        $('<input>')
            .attr("type", "button")
            .attr("value", "Add")
            .addClass("add form-control")
            .appendTo('.add-action');
        $('<td>', {class: 'add-longURL'}).appendTo($tr);
        $('<input>')
            .attr("type", "url")
            .attr("placeholder", "https://amazon.com")
            .attr("required", true)
            .addClass("form-control")
            .appendTo('.add-longURL');
        $('<td>', {class: 'add-urlCode'}).appendTo($tr);
        $('<input>')
            .attr("type", "text")
            .attr("placeholder", "Not required; will auto-generate")
            .addClass("form-control")
            .appendTo('.add-urlCode');
        $('<td>', {class: 'add-clicks'}).appendTo($tr);
        $('<td>', {class: 'add-date'}).appendTo($tr);
    },
    add: () => {
        let data = {};
        data.longURL = $(".add-longURL input").val().trim();
        data.urlCode = $(".add-urlCode input").val() !== "" ? $(".add-urlCode input").val().trim() : null;
        $.ajax({
            url: "http://localhost:5000/api/create",
            data: data,
            method: 'POST',
            dataType: 'json'
        }).done(() => {
            dt.table.ajax.reload();
        }).always(data => utils.alert.create(data));
    },
    delete: (e) => {
  
        let data = {};
        data.id = $(e.target).data('id');
        $.ajax({
            url: "http://localhost:5000/api/delete",
            data: data,
            method: 'POST',
            dataType: 'json'
        }).done(() => {
            dt.table.ajax.reload();
        }).always(data => utils.alert.create(data));

    }
}

$(document).ready(dt.windowLoad);