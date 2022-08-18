var nodeOpt = {
    queryParams: {},
    queryCheckpointParams: {},
    URL: {
        query: `../route_checkpoint/get-ajax/`,
        queryCheckpoint: "../route_checkpoint/listByLineNotExist",
        add: "../route_checkpoint/store",
        update: "../route_checkpoint/update",
        del: "../route_checkpoint/delete",
        nodeUp: "../route_checkpoint/nodeUp",
        nodeDown: "../route_checkpoint/nodeDown",
    },
    lineId: null,
    areaId: null,
    privileges: { remove: false, interval: false, order: false },
    init: function (lineId, areaId, remove, interval, order) {
        nodeOpt.lineId = lineId;
        nodeOpt.areaId = areaId;
        nodeOpt.queryParams.lineId = lineId;
        nodeOpt.queryCheckpointParams.lineId = lineId;
        nodeOpt.privileges.remove = remove;
        nodeOpt.privileges.interval = interval;
        nodeOpt.privileges.order = order;
        nodeOpt.initTable();
        $("#btn-add-ui").click(function () {
            nodeOpt.addUI();
        });
        $("#btn-save").click(function () {
            if (nodeOpt.opt == 0) {
                nodeOpt.add();
            } else {
                nodeOpt.update();
            }
        });
        $("#btn-save-interval").click(function () {
            nodeOpt.interval();
        });
    },
    $nodeTable: null,
    $checkpointTable: null,
    initTable: function () {
        nodeOpt.$nodeTable = $("#node-table");
        nodeOpt.$nodeTable.bootstrapTable({
            contentType: "application/x-www-form-urlencoded",
            method: "get",
            classes: "table table-hover table-striped table-condensed",
            idField: "id",
            uniqueId: "id",
            sortName: "orderNum",
            sortOrder: "asc",
            searchAlign: "left",
            toolbarAlign: "right",
            url: nodeOpt.URL.query + nodeOpt.lineId,
            toolbar: "#toolbar",
            queryParams: function (params) {
                return $.extend({}, params, nodeOpt.queryParams);
            },
            columns: [
                {
                    field: "",
                    width: 40,
                    align: "center",
                    formatter: function (value, row, index) {
                        var options =
                            nodeOpt.$nodeTable.bootstrapTable("getOptions");
                        return (
                            (options.pageNumber - 1) * options.pageSize +
                            (index + 1)
                        );
                    },
                },
                { field: "id", visible: false },
                {
                    field: "name",
                    title: language.checkpoint.name,
                    formatter: function (value, row, index) {
                        if (row.checkpoint) return row.checkpoint.name;
                        return "";
                    },
                },
                {
                    field: "code_number",
                    title: language.checkpoint.card,
                    formatter: function (value, row, index) {
                        if (row.checkpoint) return row.checkpoint.code_number;
                        return "";
                    },
                },
                { field: "orderNum", title: language.node.order },
                /*{field: 'interval', title: language.node.interval},*/
                {
                    field: "description",
                    title: language.common.descripton,
                    formatter: function (value, row, index) {
                        if (row.checkpoint) return row.checkpoint.description;
                        return "";
                    },
                },
                {
                    field: "opt",
                    title: language.common.operation,
                    events: operateNodeEvents,
                    cellStyle: textNowrap,
                    formatter: function (value, row, index) {
                        var result = [];
                        /*if (nodeOpt.privileges.interval) {
	            		result.push('<a class="interval" href="javascript:void(0)"><i class="fa fa-clock-o"></i>'+language.node.interval+'</a>  ');
					}*/
                        if (nodeOpt.privileges.order) {
                            result.push(
                                '<a class="nodeUp" href="javascript:void(0)"><i class="fa fa-arrow-up"></i>' +
                                    language.node.up +
                                    "</a>  "
                            );
                            result.push(
                                '<a class="nodeDown" href="javascript:void(0)"><i class="fa fa-arrow-down"></i>' +
                                    language.node.down +
                                    "</a>  "
                            );
                        }
                        if (nodeOpt.privileges.remove) {
                            result.push(
                                '<a class="remove" href="javascript:void(0)"><i class="fa fa-remove"></i>' +
                                    language.common.remove +
                                    "</a>  "
                            );
                        }
                        return result.join("");
                    },
                },
            ],
            onLoadError: function (status, res) {
                if (res.status == 601) {
                    window.location.href = "../";
                }
            },
        });
        nodeOpt.$checkpointTable = $("#checkpoint-table");
        nodeOpt.$checkpointTable.bootstrapTable({
            contentType: "application/x-www-form-urlencoded",
            method: "get",
            classes: "table table-hover table-striped table-condensed",
            idField: "id",
            uniqueId: "id",
            search: true,
            searchOnEnterKey: true,
            clickToSelect: true,
            queryParams: function (params) {
                return $.extend({}, params, nodeOpt.queryCheckpointParams);
            },
            columns: [
                {
                    field: "",
                    width: 40,
                    align: "center",
                    formatter: function (value, row, index) {
                        var options =
                            nodeOpt.$checkpointTable.bootstrapTable(
                                "getOptions"
                            );
                        return (
                            (options.pageNumber - 1) * options.pageSize +
                            (index + 1)
                        );
                    },
                },
                { field: "cbx", checkbox: true },
                { field: "name", title: language.checkpoint.name },
                { field: "code_number", title: language.checkpoint.card },
                { field: "description", title: language.common.descripton },
                {
                    field: "created_at",
                    title: language.common.gmtCreate,
                    formatter: function (value, row, index) {
                        // if (typeof row.gmtCreate == "number") {
                        //     var d = new Date(row.gmtCreate);
                        //     return d.Format("yyyy-MM-dd HH:mm:ss");
                        // }
                        return row.created_at;
                    },
                },
            ],
            onLoadError: function (status, res) {
                if (res.status == 601) {
                    window.location.href = "../";
                }
            },
        });
    },
    opt: 0,
    addUI: function () {
        nodeOpt.$checkpointTable.bootstrapTable("refresh", {
            url: nodeOpt.URL.queryCheckpoint,
        });
        $("#modal-node").modal("show");
    },
    add: function () {
        var nodes = nodeOpt.$checkpointTable.bootstrapTable("getSelections");
        var checkpointIds = [];
        for (var i = 0; i < nodes.length; i++) {
            checkpointIds.push(nodes[i].id);
        }
        if (checkpointIds.length <= 0) {
            toastr.success(language.node.error.checkpoint);
            return;
        }
        MaskUtil.mask(language.common.tip.adding);
        $.ajax({
            url: nodeOpt.URL.add,
            method: "post",
            data: {
                checkpointIds: JSON.stringify(checkpointIds),
                route_id: nodeOpt.lineId,
                _token: $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success) {
                    nodeOpt.$nodeTable.bootstrapTable("refresh");
                    $("#modal-node").modal("hide");
                    toastr.success(language.common.tip.added);
                }
            },
            error(xml, status, err) {
                toastr.error(err);
            },
        });
    },
    remove: function (id) {
        if (confirm(language.common.tip.removeIf)) {
            MaskUtil.mask(language.common.tip.removing);
            $.post(
                nodeOpt.URL.del,
                {
                    id: id,
                    _token: $('meta[name="csrf-token"]').attr("content"),
                },
                function (data) {
                    if (data.success) {
                        nodeOpt.$nodeTable.bootstrapTable("refresh");
                        toastr.success(language.common.tip.removed);
                    } else if (data["errorMsg"]) {
                        toastr.error(data["errorMsg"]);
                    }
                }
            );
        }
    },
    nodeUp: function (row, index, rows) {
        $.post(
            nodeOpt.URL.nodeUp,
            {
                id: row.id,
                _token: $('meta[name="csrf-token"]').attr("content"),
            },
            function (data) {
                if (data["success"]) {
                    if (index == 0) return;
                    var upRow = rows[index - 1];
                    upRow.orderNum = upRow.orderNum + 1;
                    row.orderNum = row.orderNum - 1;
                    nodeOpt.$nodeTable.bootstrapTable("load", rows);
                } else {
                    toastr.error(data["errorMsg"]);
                }
            }
        );
    },
    nodeDown: function (row, index, rows) {
        $.post(
            nodeOpt.URL.nodeDown,
            {
                id: row.id,
                _token: $('meta[name="csrf-token"]').attr("content"),
            },
            function (data) {
                if (data["success"]) {
                    if (index == rows.length - 1) return;
                    var upRow = rows[index + 1];
                    upRow.orderNum = upRow.orderNum - 1;
                    row.orderNum = row.orderNum + 1;
                    nodeOpt.$nodeTable.bootstrapTable("load", rows);
                } else {
                    toastr.error(data["errorMsg"]);
                }
            }
        );
    },
    intervalRow: null,
    intervalUI: function (row) {
        nodeOpt.intervalRow = row;
        $("#node-id").val(row.id);
        $("#node-interval").val(row.interval);
        $("#modal-interval").modal("show");
    },
    interval: function () {
        var v = $("#node-interval").val();
        if (v != parseInt(v)) {
            toastr.error(language.node.error.interval);
            return;
        }
        var id = $("#node-id").val();
        $.post("../node/setInterval", { id: id, interval: v }, function (data) {
            if (data.result) {
                nodeOpt.intervalRow.interval = v;
                nodeOpt.$nodeTable.bootstrapTable("updateRow", {
                    index: nodeOpt.intervalRow.index,
                    row: nodeOpt.intervalRow,
                });
                $("#modal-interval").modal("hide");
            } else {
                toastr.error(data["errorMsg"]);
            }
        });
    },
};

window.operateNodeEvents = {
    "click .remove": function (e, value, row, index) {
        nodeOpt.remove(row.id);
    },
    "click .nodeUp": function (e, value, row, index) {
        if (index == 0) {
            return;
        }
        var rows = nodeOpt.$nodeTable.bootstrapTable("getData");
        nodeOpt.nodeUp(row, index, rows);
    },
    "click .nodeDown": function (e, value, row, index) {
        var rows = nodeOpt.$nodeTable.bootstrapTable("getData");
        if (rows.length == index + 1) return;
        nodeOpt.nodeDown(row, index, rows);
    },
    "click .interval": function (e, value, row, index) {
        nodeOpt.intervalUI(row);
    },
};
