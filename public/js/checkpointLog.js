var areaTree = {
    options: {
        query: {
            data: { simpleData: { enable: true } },
            check: {
                enable: true,
                chkStyle: "checkbox",
                chkboxType: { Y: "s", N: "s" },
            },
            view: { dblClickExpand: false, selectedMulti: true },
            callback: { onCheck: onQueryAreaTreeCheck },
        },
    },
    url: "../organizations/get-ajax",
    queryTree: null,
    init: function () {
        $.get(areaTree.url, {}, function (data) {
            areaTree.queryTree = $.fn.zTree.init(
                $("#q-tree"),
                areaTree.options.query,
                data.organizations
            );
            $("#formQuery-area").on("focus", function () {
                areaTree.showQueryAreaTree();
            });
        });
    },
    onHtmlDownForQuery: function (e) {
        var event = e ? e : window.event;
        var obj = event.srcElement ? event.srcElement : event.target;
        if (
            !(
                obj.id == "formQuery-area" ||
                obj.id == "q-tree" ||
                obj.id == "q-tree-wrap" ||
                $(obj).parents("#q-tree").length > 0
            )
        ) {
            areaTree.hideQueryAreaTree();
        }
    },
    showQueryAreaTree: function () {
        var $iptObj = $("#formQuery-area");
        var iptOffset = $iptObj.offset();
        var iptWidth = $iptObj.width();
        $("#q-tree-wrap")
            .css({
                left: iptOffset.left + "px",
                top: iptOffset.top + $iptObj.outerHeight() + "px",
                "min-width": iptWidth + 24 + "px",
            })
            .slideDown("fast");
        $("html").bind("mousedown", areaTree.onHtmlDownForQuery);
    },
    hideQueryAreaTree: function () {
        $("#q-tree-wrap").fadeOut("fast");
        $("html").unbind("mousedown", areaTree.onHtmlDownForQuery);
    },
};
function onQueryAreaTreeCheck() {
    var nodes = areaTree.queryTree.getCheckedNodes(true);
    var v = "";
    for (var i = 0; i < nodes.length; i++) {
        v += nodes[i].name + ",";
    }
    if (v.length > 0) v = v.substring(0, v.length - 1);
    $("#formQuery-area").val(v);
}
var checkpointLogOpt = {
    queryParams: {},
    init: function () {
        $("#reservationtime")
            .daterangepicker(
                {
                    startDate: moment().startOf("day"),
                    endDate: moment().endOf("day"),
                    showDropdowns: true,
                    timePicker: true,
                    timePickerSeconds: true,
                    timePickerIncrement: 5,
                    timePicker12Hour: false,
                    ranges: {
                        Today: [
                            moment().startOf("day"),
                            moment().add("days", 1).startOf("day"),
                        ],
                        Yesterday: [
                            moment().subtract("days", 1).startOf("day"),
                            moment().startOf("day"),
                        ],
                        "Last 7 days": [
                            moment().subtract("days", 6),
                            moment().add("days", 1).startOf("day"),
                        ],
                        "Last 30 days": [
                            moment().subtract("days", 29),
                            moment().add("days", 1).startOf("day"),
                        ],
                    },
                    opens: "right",
                    buttonClasses: ["btn btn-default"],
                    applyClass: "btn-small btn-primary blue",
                    cancelClass: "btn-small",
                    separator: " - ",
                    format: "YYYY-MM-DD HH:mm:ss",
                },
                function (start, end, label) {
                    $("#formQuery-startTime").val(
                        start.format("YYYY-MM-DD HH:mm:ss")
                    );
                    $("#formQuery-endTime").val(
                        end.format("YYYY-MM-DD HH:mm:ss")
                    );
                }
            )
            .val(
                moment().startOf("day").format("YYYY-MM-DD HH:mm:ss") +
                    " To " +
                    moment()
                        .add("days", 1)
                        .startOf("day")
                        .format("YYYY-MM-DD HH:mm:ss")
            );
        $("#checkpoint-select").select2({
            allowClear: true,
            placeholder: "All",
            ajax: {
                url: "../checkpointLogs/checkpoints",
                dataType: "json",
                delay: 250,
                data: function (params, page) {
                    params.page = params.page || 1;
                    return {
                        search: params.term,
                        offset: (params.page - 1) * 15,
                        limit: 15,
                    };
                },
                processResults: function (data, params, query) {
                    params.page = params.page || 1;
                    var selectData = [];
                    $.each(data.rows, function (i, v) {
                        var obj = {};
                        obj.id = v.id;
                        obj.text = v.name;
                        obj.obj = v;
                        selectData.push(obj);
                    });
                    return {
                        results: selectData,
                        pagination: {
                            more: params.page * 15 < data.total,
                        },
                    };
                },
                cache: false,
            },
            escapeMarkup: function (markup) {
                return markup;
            },
            templateResult: function (repo) {
                if (repo.loading) {
                    return repo.text;
                }
                return "<div>" + repo.text + "</div>";
            },
            formatRepoSelection: function (repo) {
                return repo.text;
            },
        });
        var start = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss");
        $("#formQuery-startTime").val(start);
        var end = moment()
            .add("days", 1)
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
        $("#formQuery-endTime").val(end);
        checkpointLogOpt.queryParams.startTime = toDate(start);
        checkpointLogOpt.queryParams.endTime = toDate(end);
        checkpointLogOpt.initTable();
        $("#btn-query").click(function () {
            checkpointLogOpt.query();
        });
        $("#btn-group").click(function () {
            var erv = document.getElementById("dropdown");
            if (erv.style.display == "") {
                erv.style.display = "block";
            } else {
                erv.style.display = "";
            }
        });
        $("#btn-excel").click(function () {
            checkpointLogOpt.excel();
        });
        $("#btn-pdf").click(function () {
            checkpointLogOpt.pdf();
        });
    },
    $checkpointLogData: null,
    initTable: function () {
        checkpointLogOpt.$checkpointLogData = $("#checkpointLog-table");
        checkpointLogOpt.$checkpointLogData.bootstrapTable({
            contentType: "application/x-www-form-urlencoded",
            method: "get",
            classes: "table table-hover table-striped table-condensed",
            idField: "id",
            uniqueId: "id",
            sortName: "cpl.create_time",
            sortOrder: "desc",
            pagination: true,
            pageSize: 15,
            pageList: [15, 25, 50, 100],
            sidePagination: "server",
            url: "../checkpointLogs/get-ajax",
            queryParams: function (params) {
                return $.extend({}, params, checkpointLogOpt.queryParams);
            },
            columns: [
                {
                    field: "",
                    width: 40,
                    align: "center",
                    formatter: function (value, row, index) {
                        var options =
                            checkpointLogOpt.$checkpointLogData.bootstrapTable(
                                "getOptions"
                            );
                        return (
                            (options.pageNumber - 1) * options.pageSize +
                            (index + 1)
                        );
                    },
                },
                {
                    field: "cpl.patrolman_id",
                    title: language.checkpointLog.patrolmanName,
                    sortable: true,
                    formatter: function (value, row, index) {
                        return row.patrolmanName;
                    },
                },
                {
                    field: "cpl.checkpoint_id",
                    title: language.checkpointLog.checkpointName,
                    sortable: true,
                    formatter: function (value, row, index) {
                        if (row.checkpoint) return row.checkpoint.name;
                        return "";
                    },
                },
                {
                    field: "cp.re_card",
                    title: language.checkpointLog.checkpointCard,
                    formatter: function (value, row, index) {
                        if (row.checkpoint) return row.checkpoint.code_number;
                        return "";
                    },
                },
                {
                    field: "cpl.device_id",
                    title: language.checkpointLog.deviceName,
                    sortable: true,
                    formatter: function (value, row, index) {
                        if (row.device) {
                            return row.device.name;
                        }
                        return "";
                    },
                },
                {
                    field: "device",
                    title: language.checkpointLog.deviceCode,
                    formatter: function (value, row, index) {
                        if (row.device) {
                            return row.device.device_number;
                        }
                        return "";
                    },
                },
                {
                    field: "cp.area_id",
                    title: language.common.area,
                    formatter: function (value, row, index) {
                        return row.areaName;
                    },
                },
                {
                    field: "cpl.create_time",
                    title: language.checkpointLog.gmtCreate,
                    sortable: true,
                    formatter: function (value, row, index) {
                        if (typeof row.createTime == "number") {
                            var d = new Date(row.createTime);
                            return d.Format("yyyy-MM-dd HH:mm:ss a");
                        }
                        return row.createTime;
                    },
                },
                {
                    field: "eventLogs",
                    title: "Event",
                    formatter: function (value, row, index) {
                        if (row.eventLogs && row.eventLogs.length > 0) {
                            var result = [];
                            for (var i = 0; i < row.eventLogs.length; i++) {
                                result.push(
                                    '<span class="label label-success">' +
                                        row.eventLogs[i].eventName +
                                        "</span>"
                                );
                            }
                            return result.join(" ");
                        }
                        return "";
                    },
                },
            ],
            onLoadError: function (status, res) {
                if (res.status == 601) {
                    window.location.href = "../index/toLogin";
                }
            },
        });
    },
    query: function () {
        var startTime = formQuery.startTime.value;
        var endTime = formQuery.endTime.value;
        if (!startTime || !endTime || endTime < startTime) {
            toastr.error(language.common.error.timeGreater);
            return;
        }
        var startTime = toDate(startTime);
        var endTime = toDate(endTime);
        var areaNodes = areaTree.queryTree.getCheckedNodes();
        var areaIds = [];
        for (var i = 0, l = areaNodes.length; i < l; i++) {
            areaIds.push(areaNodes[i].id);
        }
        checkpointLogOpt.queryParams.startTime = startTime;
        checkpointLogOpt.queryParams.endTime = endTime;
        checkpointLogOpt.queryParams.areaIds = areaIds;
        checkpointLogOpt.queryParams.deviceId = formQuery.deviceId.value;
        var patrolmanId = formQuery.patrolmanId.value;
        checkpointLogOpt.queryParams.patrolmanId = patrolmanId;
        checkpointLogOpt.queryParams.checkpointId =
            $("#checkpoint-select").val();
        checkpointLogOpt.$checkpointLogData.bootstrapTable("refresh", {
            url: "../checkpointLogs/get-ajax",
        });
    },
    excel: function () {
        var startTime = formQuery.startTime.value;
        var endTime = formQuery.endTime.value;
        if (!startTime || !endTime || endTime < startTime) {
            toastr.error(language.common.error.timeGreater);
            return;
        }
        var startTime = toDate(startTime);
        var endTime = toDate(endTime);
        var areaNodes = areaTree.queryTree.getCheckedNodes();
        var areaIds = [];
        for (var i = 0, l = areaNodes.length; i < l; i++) {
            areaIds.push(areaNodes[i].id);
        }
        var deviceId = formQuery.deviceId.value;
        var patrolmanId = formQuery.patrolmanId.value;
        var checkpointId = $("#checkpoint-select").val();
        var url =
            "../checkpointLogs/excel?startTime=" +
            startTime +
            "&endTime=" +
            endTime;
        if (patrolmanId) {
            url = url + "&patrolmanId=" + patrolmanId;
        }
        for (var i = 0; i < areaIds.length; i++) {
            url += "&areaIds=" + areaIds[i];
        }
        if (deviceId) {
            url = url + "&deviceId=" + deviceId;
        }
        if (patrolmanId) {
            url = url + "&patrolmanId=" + patrolmanId;
        }
        if (checkpointId) {
            url = url + "&checkpointId=" + checkpointId;
        }
        url = url + "&sort=cpl.create_time&order=asc";
        window.open(url, "_blank");
    },
    pdf: function () {
        var startTime = formQuery.startTime.value;
        var endTime = formQuery.endTime.value;
        if (!startTime || !endTime || endTime < startTime) {
            toastr.error(language.common.error.timeGreater);
            return;
        }
        var startTime = toDate(startTime);
        var endTime = toDate(endTime);
        var areaNodes = areaTree.queryTree.getCheckedNodes();
        var areaIds = [];
        for (var i = 0, l = areaNodes.length; i < l; i++) {
            areaIds.push(areaNodes[i]);
        }
        var deviceId = formQuery.deviceId.value;
        var patrolmanId = formQuery.patrolmanId.value;
        var checkpointId = $("#checkpoint-select").val();
        var url =
            "../checkpointLogs/pdf?startTime=" +
            startTime +
            "&endTime=" +
            endTime;
        if (patrolmanId) {
            url = url + "&patrolmanId=" + patrolmanId;
        }
        for (var i = 0; i < areaIds.length; i++) {
            url += "&areaIds=" + areaIds[i].id;
        }
        if (deviceId) {
            url = url + "&deviceId=" + deviceId;
        }
        if (patrolmanId) {
            url = url + "&patrolmanId=" + patrolmanId;
        }
        if (checkpointId) {
            url = url + "&checkpointId=" + checkpointId;
        }
        window.open(url, "_blank");
    },
};
