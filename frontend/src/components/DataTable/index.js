import React, { Component } from 'react';
import $ from 'jquery';
import './bs4.DataTable.css';
$.DataTable = require('datatables.net');

export class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        };
    }

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                ajax: "http://localhost:5000/api/list",
                columns: [
                    {data:null, title: "Action", class: "col-action"},
                    {data:"longURL", title:"Original", class: "col-origin"},
                    {data:"shortURL", title:"Short", class: "col-short"},
                    {data:"date", title:"Date", class: "col-date"}
                ],
                rowCallback: (row, data) => {
                    $(".col-action", row).html("");
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
                }

            }
        )
    }
    componentWillUnmount() {
        this.$el.DataTable.destroy(true);
    }
    render() {
        return <table className="table display" width="100%" ref = {el => this.el = el }></table>
    }
}