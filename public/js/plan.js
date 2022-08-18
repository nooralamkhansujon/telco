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

var lineTree = {
    options: {
        data: { simpleData: { enable: true } },
        callback: { onClick: lineTreeClick },
    },
    dayOptions: {
        data: { simpleData: { enable: true } },
        callback: { onClick: dayLineTreeClick },
    },
    url: "../patrol_task/lineTree",
    $tree: null,
    $dTree: null,
    init: function () {
        $.get(lineTree.url, {}, function (data) {
            lineTree.$tree = $.fn.zTree.init(
                $("#line-tree"),
                lineTree.options,
                data.lineTrees
            );
            lineTree.$dTree = $.fn.zTree.init(
                $("#line-day-tree"),
                lineTree.dayOptions,
                data.lineTrees
            );
        });
        $("#form-line").on("focus", function () {
            lineTree.showFormTree();
        });
        $("#form-day-line").on("focus", function () {
            lineTree.showFormDayTree();
        });
    },
    showFormTree: function () {
        var obj = document.getElementById("form-line");
        var pos = obj.getBoundingClientRect();
        $("#line-tree-wrap")
            .css({
                left: "15px",
                top: obj.clientHeight + 2 + "px",
                width: obj.clientWidth + 2 + "px",
            })
            .slideDown("fast");
        $("html").bind("mousedown", lineTree.onBodyDown);
    },
    hideFormTree: function () {
        $("#line-tree-wrap").fadeOut("fast");
        $("html").unbind("mousedown", lineTree.onBodyDown);
    },
    onBodyDown: function (event) {
        if (
            !(
                event.target.id == "line-tree-wrap" ||
                event.target.id == "form-line" ||
                event.target.id == "line-tree" ||
                $(event.target).parents("#line-tree").length > 0
            )
        ) {
            lineTree.hideFormTree();
        }
    },
    showFormDayTree: function () {
        var $iptObj = $("#form-day-line");
        var iptOffset = $iptObj.offset();
        var iptWidth = $iptObj.width();
        $("#line-day-tree-wrap")
            .css({
                left: iptOffset.left + "px",
                top: iptOffset.top + $iptObj.outerHeight() + "px",
                "min-width": iptWidth + 24 + "px",
            })
            .slideDown("fast");

        //var obj = document.getElementById("form-day-line");
        //var pos = obj.getBoundingClientRect();
        //$("#line-day-tree-wrap").css({left:"15px", top: (obj.clientHeight+2) + "px", width:(obj.clientWidth+2) +"px"}).slideDown("fast");
        $("html").bind("mousedown", lineTree.onBodyDayDown);
    },
    hideFormDayTree: function () {
        $("#line-day-tree-wrap").fadeOut("fast");
        $("html").unbind("mousedown", lineTree.onBodyDayDown);
    },
    onBodyDayDown: function (event) {
        if (
            !(
                event.target.id == "line-day-tree-wrap" ||
                event.target.id == "form-day-line" ||
                event.target.id == "line-day-tree" ||
                $(event.target).parents("#line-day-tree").length > 0
            )
        ) {
            lineTree.hideFormDayTree();
        }
    },
};
function lineTreeClick(e, treeId, treeNode) {
    //if typeId is 0 that meands tree Node is organization
    if (treeNode.typeId == 0) {
        toastr.warning(language.plan.tip.chooseLine);
        return false;
    }
    formPlan.lineId.value = treeNode.dataId;
    formPlan.line.value = treeNode.name;
    lineTree.hideFormTree();
}

function dayLineTreeClick(e, treeId, treeNode) {
    if (treeNode.typeId == 0) {
        toastr.warning(language.plan.tip.chooseLine);
        return false;
    }
    formPlanDay.lineId.value = treeNode.dataId;
    formPlanDay.line.value = treeNode.name;
    lineTree.hideFormDayTree();
}
var planOpt = {
    privileges: {
        update: false,
        remove: false,
    },
    queryParams: {},
    $formUser: null,
    $queryUser: null,
    $queryRoute: null,
    $planDayForm: null,
    init: function (update, remove) {
        areaTree.init();
        lineTree.init();
        planOpt.privileges.update = update;
        planOpt.privileges.remove = remove;
        $(".line-select2").select2({
            allowClear: true,
            placeholder: "All",
            ajax: {
                url: "../patrol_task/routes",
                dataType: "json",
                delay: 250,
                data: function (params, page) {
                    params.page = params.page || 1;
                    return {
                        search: params.term,
                        offset: (params.page - 1) * 15, //which page
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
        planOpt.initTable();
        $(".datetime").datetimepicker({
            minView: 2,
            format: "yyyy-mm-dd",
            autoclose: true,
        });
        $(".day-datetime").datetimepicker({
            minView: 2,
            format: "yyyy-mm-dd",
            autoclose: true,
        });
        $(".uitime").timepicker({
            minuteStep: 5,
            showInputs: false,
            defaultTime: false,
            showMeridian: false,
        });
        $("#form-type").click(function () {
            if (this.value == 0) {
                $(".plan-week-month").hide();
                $(".plan-cycle").hide();
                $(".plan-day").show();
                formPlan.patrolNum.value = 1;
                formPlan.patrolNum.disabled = false;
            } else if (this.value == 1) {
                $(".plan-day").hide();
                $(".plan-cycle").hide();
                if (planOpt.optType != 1) {
                    $(".plan-week-month").show();
                }
                formPlan.patrolNum.value = 1;
                formPlan.patrolNum.disabled = true;
                $("#span-week-month").html(language.plan.tip.weekBulid);
            } else if (this.value == 2) {
                $(".plan-day").hide();
                $(".plan-cycle").hide();
                if (planOpt.optType != 1) {
                    $(".plan-week-month").show();
                }
                formPlan.patrolNum.value = 1;
                formPlan.patrolNum.disabled = true;
                $("#span-week-month").html(language.plan.tip.monthBulid);
            } else if (this.value == 3) {
                formPlan.patrolNum.value = 1;
                formPlan.patrolNum.disabled = true;
                $(".plan-day").hide();
                $(".plan-week-month").hide();
                $(".plan-cycle").show();
            }
            formPlan.cycle.value = "";
        });
        $("#btn-query").click(function () {
            planOpt.query();
        });
        $("#btn-add-day").on("click", function () {
            planOpt.addDayUI();
        });
        $("#a-add-day").on("click", function () {
            planOpt.addDayUI();
        });
        $("#btn-save-day").click(function () {
            //initialize save button event
            if (planOpt.optType == 0) {
                planOpt.addDay();
            } else {
                planOpt.updateDay();
            }
        });
        $("#a-add-week").click(function () {
            planOpt.addUI(1);
        });
        $("#a-add-month").click(function () {
            planOpt.addUI(2);
        });
        $("#a-add-cycle").click(function () {
            planOpt.addUI(3);
        });
        $("#btn-save").click(function () {
            if (planOpt.optType == 0) {
                planOpt.add();
            } else {
                planOpt.update();
            }
        });

        $("#btn-remove").click(function () {
            planOpt.removeBatch();
        });

        $("#cbx-batch").on("change", function () {
            if (this.checked) {
                $("#batch-item").show();
            } else {
                $("#batch-item").hide();
            }
        });
        $("#btn-add-shift").on("click", function () {
            if (formPlanDay.lineId.value == "") {
                toastr.error(language.plan.error.line);
                return;
            }
            formShift.startTime.value = "00:00"; //startTime
            formShift.endTime.value = "00:00";
            formShift.batch.checked = false;
            $("#batch-item").hide();
            formShift.patrolDuration.value = 0; //patrol time
            formShift.restDuration.value = 0; //break time
            $("#modal-shift").modal("show");
        });
        $("#btn-remove-shift").on("click", function () {
            var rows = planOpt.$shiftTable.bootstrapTable("getSelections");
            if (rows.length <= 0) {
                toastr.error(language.plan.error.shift);
                return;
            }
            for (var i = 0; i < rows.length; i++) {
                planOpt.$shiftTable.bootstrapTable(
                    "removeByUniqueId",
                    rows[i].uuid
                );
            }
        });
        $("#btn-save-shift").on("click", function () {
            var data = planOpt.$shiftTable.bootstrapTable("getData");
            var startTime = formShift.startTime.value;
            var endTime = formShift.endTime.value;
            if (!isHHmm(startTime) || !isHHmm(endTime)) {
                toastr.error(language.plan.error.time);
                return;
            }
            var startTime = new Date("2018-01-01 " + startTime);
            var endTime = new Date("2018-01-01 " + endTime);
            var formShiftUser = document.getElementById("formShift-user");
            if (
                data.length > 0 &&
                !planOpt.validTimeRange(data, startTime, endTime)
            ) {
                toastr.error(language.plan.error.timeConflict);
                return;
            }
            if (formShift.batch.checked) {
                var patrolDuration = formShift.patrolDuration.value;
                var restDuration = formShift.restDuration.value;
                var p = parseInt(patrolDuration);
                var r = parseInt(restDuration);
                if (patrolDuration != p || p <= 0) {
                    toastr.error(language.plan.error.patrolTime);
                    return;
                }
                if (restDuration != r || r < 0) {
                    toastr.error(language.plan.error.breakTime);
                    return;
                }
                if (startTime.getTime() >= endTime.getTime()) {
                    endTime.setDate(endTime.getDate() + 1);
                }
                patrolDuration = p;
                restDuration = r;
                var s = new Date(startTime.getTime());
                var e = new Date(startTime.getTime());
                e.setMinutes(e.getMinutes() + patrolDuration);
                console.log(s, "s");
                console.log(e, "e");
                // var row = {
                //     uuid: generateUUID(),
                //     startTime: s.getTime(),
                //     endTime: e.getTime(),
                // };
                while (e.getTime() <= endTime.getTime()) {
                    var row = {
                        uuid: generateUUID(),
                        startTime: s.getTime(),
                        endTime: e.getTime(),
                    };
                    planOpt.$shiftTable.bootstrapTable("append", row);
                    s.setMinutes(
                        s.getMinutes() + patrolDuration + restDuration
                    );
                    e.setMinutes(
                        e.getMinutes() + restDuration + patrolDuration
                    );
                }
            } else {
                var row = {
                    uuid: generateUUID(),
                    startTime: startTime,
                    endTime: endTime,
                };
                planOpt.$shiftTable.bootstrapTable("append", row);
            }
            $("#modal-shift").modal("hide");
        });
    },
    validTimeRange: function (rows, startTime, endTime) {
        startTime.setFullYear(2018);
        endTime.setFullYear(2018);
        startTime.setMonth(0);
        endTime.setMonth(0);
        startTime.setDate(1);
        endTime.setDate(1);
        if (endTime.getTime() <= startTime.getTime()) {
            endTime.setDate(endTime.getDate() + 1);
        }
        for (var i = 0; i < rows.length; i++) {
            var s = planOpt.toDate(rows[i].startTime);
            var e = planOpt.toDate(rows[i].endTime);
            s.setFullYear(2018);
            e.setFullYear(2018);
            s.setMonth(1);
            e.setMonth(1);
            s.setDate(1);
            e.setDate(1);
            if (e.getTime() <= s.getTime()) {
                e.setDate(e.getDate() + 1);
            }
            if (
                s.getTime() == startTime.getTime() &&
                e.getTime() == endTime.getTime()
            ) {
                return false;
            } else if (
                (startTime.getTime() > s.getTime() &&
                    startTime.getTime() < e.getTime()) ||
                (endTime.getTime() > s.getTime() &&
                    endTime.getTime() < e.getTime()) ||
                (startTime.getTime() < s.getTime() &&
                    endTime.getTime() > e.getTime())
            ) {
                return false;
            }
        }
        return true;
    },
    $planTable: null,
    $shiftTable: null,
    initTable: function () {
        planOpt.$planTable = $("#tb-plan");
        planOpt.$planTable.bootstrapTable({
            contentType: "application/x-www-form-urlencoded",
            method: "get",
            classes: "table table-hover table-striped table-condensed",
            idField: "id",
            uniqueId: "id",
            pagination: true,
            url: planOpt.url.query,
            pageSize: 15,
            pageList: [15, 25, 50, 100],
            sidePagination: "server",
            detailView: "true",
            queryParams: function (params) {
                return $.extend({}, params, planOpt.queryParams);
            },
            columns: [
                {
                    field: "",
                    width: 40,
                    align: "center",
                    formatter: function (value, row, index) {
                        var options =
                            planOpt.$planTable.bootstrapTable("getOptions");
                        return (
                            (options.pageNumber - 1) * options.pageSize +
                            (index + 1)
                        );
                    },
                },
                { field: "cbx", checkbox: true },
                { field: "name", title: language.plan.name },
                {
                    field: "p.line_id",
                    title: language.common.line,
                    sortable: true,
                    formatter: function (value, row, index) {
                        return row.lineName;
                    },
                },
                {
                    field: "p.start_date",
                    title: language.plan.startDate,
                    sortable: true,
                    formatter: function (value, row, index) {
                        if (typeof row.startDate == "number") {
                            var d = new Date(row.startDate);
                            return d.Format("yyyy-MM-dd");
                        }
                        return "";
                    },
                },
                {
                    field: "p.end_date",
                    title: language.plan.endDate,
                    formatter: function (value, row, index) {
                        if (typeof row.endDate == "number") {
                            var d = new Date(row.endDate);
                            return d.Format("yyyy-MM-dd");
                        } else if (!row.endDate) {
                            return language.common.permanent;
                        }
                    },
                },
                {
                    field: "p.type",
                    title: language.plan.type.name,
                    sortable: true,
                    formatter: function (value, row, index) {
                        switch (row.type) {
                            case 0:
                                return language.plan.type.day;
                            case 1:
                                return language.plan.type.week;
                            case 2:
                                return language.plan.type.month;
                            case 3:
                                return language.plan.type.cycle;
                            default:
                                return "";
                        }
                    },
                },
                {
                    field: "weeks",
                    title: language.common.week,
                    formatter: function (value, row, index) {
                        if (row.type != 0) {
                            return "-";
                        }
                        var html = "";
                        if (row.mon) {
                            html +=
                                "<input type='checkbox' checked readonly/>" +
                                language.common.monday;
                        } else {
                            html +=
                                "<input type='checkbox' readonly/>" +
                                language.common.monday;
                        }
                        if (row.tue) {
                            html +=
                                "<input type='checkbox' checked readonly/>" +
                                language.common.tuesday;
                        } else {
                            html +=
                                "<input type='checkbox' readonly/>" +
                                language.common.tuesday;
                        }
                        if (row.wed) {
                            html +=
                                "<input type='checkbox' checked readonly/>" +
                                language.common.wednesday;
                        } else {
                            html +=
                                "<input type='checkbox' readonly/>" +
                                language.common.wednesday;
                        }
                        if (row.thu) {
                            html +=
                                "<input type='checkbox' checked readonly/>" +
                                language.common.thursday;
                        } else {
                            html +=
                                "<input type='checkbox' readonly/>" +
                                language.common.thursday;
                        }
                        if (row.fri) {
                            html +=
                                "<input type='checkbox' checked readonly/>" +
                                language.common.friday;
                        } else {
                            html +=
                                "<input type='checkbox' readonly />" +
                                language.common.friday;
                        }
                        if (row.sat) {
                            html +=
                                "<input type='checkbox' checked readonly/>" +
                                language.common.saturday;
                        } else {
                            html +=
                                "<input type='checkbox' readonly/>" +
                                language.common.saturday;
                        }
                        if (row.sun) {
                            html +=
                                "<input type='checkbox' checked readonly/>" +
                                language.common.sunday;
                        } else {
                            html +=
                                "<input type='checkbox' readonly/>" +
                                language.common.sunday;
                        }
                        return html;
                    },
                },
                {
                    field: "l.area_id",
                    title: language.common.area,
                    sortable: true,
                    formatter: function (value, row, index) {
                        return row.areaName;
                    },
                },
                {
                    field: "opt",
                    title: language.common.operation,
                    events: operateEvents,
                    cellStyle: textNowrap,
                    formatter: function (value, row, index) {
                        var result = [];
                        if (planOpt.privileges.update) {
                            result.push(
                                '<a class="update" href="javascript:void(0)"><i class="fa fa-edit"></i>' +
                                    language.common.update +
                                    "</a>"
                            );
                        }
                        if (planOpt.privileges.remove) {
                            result.push(
                                '<a class="remove" href="javascript:void(0)"><i class="fa fa-remove"></i>' +
                                    language.common.remove +
                                    "</a>"
                            );
                        }
                        return result.join("");
                    },
                },
            ],
            detailFormatter: function (index, row, element) {
                var result =
                    "<div class='col-xs-offset-2 col-xs-8'><table class='table table-bordered table-condensed'><tr>";
                if (row.type == 0) {
                    result +=
                        "<td>" +
                        language.common.startTime +
                        "</td><td>" +
                        language.common.endTime +
                        "</td></tr>";
                    var planTimes = row.planTimes;
                    for (var i = 0; i < planTimes.length; i++) {
                        result +=
                            "<td>" +
                            planOpt
                                .toDate(planTimes[i].startTime)
                                .Format("HH:mm") +
                            "</td><td>" +
                            planOpt
                                .toDate(planTimes[i].endTime)
                                .Format("HH:mm") +
                            "</td></tr>";
                    }
                    result += "</table></div>";
                    return result;
                } else if (row.type == 1) {
                    return (
                        "<div class='col-xs-offset-2 col-xs-8'><table class='table table-bordered table-condensed'><tr><td>" +
                        language.common.cycle +
                        "</td></tr><tr><td>" +
                        language.common.everyWeek +
                        "</td></tr></table></div>"
                    );
                } else if (row.type == 2) {
                    return (
                        "<div class='col-xs-offset-2 col-xs-8'><table class='table table-bordered table-condensed'><tr><td>" +
                        language.common.cycle +
                        "</td></tr><tr><td>" +
                        language.common.everyMonth +
                        "</td></tr></table></div>"
                    );
                } else if (row.type == 3) {
                    return (
                        "<div class='col-xs-offset-2 col-xs-8'><table class='table table-bordered table-condensed'><tr><td>" +
                        language.common.cycle +
                        "</td></tr><tr><td>" +
                        language.common.every +
                        row.cycle +
                        language.common.everyDay +
                        "</td></tr></table></div>"
                    );
                }
            },
            onLoadError: function (status, res) {
                if (res.status == 601) {
                    window.location.href = "../index/toLogin";
                }
            },
        });
        planOpt.$shiftTable = $("#shift-table");
        planOpt.$shiftTable.bootstrapTable({
            contentType: "application/x-www-form-urlencoded",
            method: "post",
            classes: "table table-hover table-striped table-condensed",
            idField: "uuid",
            uniqueId: "uuid",
            clickToSelect: true,
            height: 300,
            columns: [
                {
                    field: "",
                    width: 40,
                    align: "center",
                    formatter: function (value, row, index) {
                        var options =
                            planOpt.$shiftTable.bootstrapTable("getOptions");
                        return (
                            (options.pageNumber - 1) * options.pageSize +
                            (index + 1)
                        );
                    },
                },
                { field: "cbx", checkbox: true },
                {
                    field: "startTime",
                    title: language.common.startTime,
                    formatter: function (value, row, index) {
                        if (value instanceof Date) {
                            return value.Format("HH:mm");
                        }
                        if (typeof value == "number") {
                            var d = new Date(value);
                            return d.Format("HH:mm");
                        }
                        return value;
                    },
                },
                {
                    field: "endTime",
                    title: language.common.endTime,
                    formatter: function (value, row, index) {
                        if (value instanceof Date) {
                            return value.Format("HH:mm");
                        }
                        if (typeof value == "number") {
                            var d = new Date(value);
                            return d.Format("HH:mm");
                        }
                        return value;
                    },
                },
            ],
            onLoadError: function (status, res) {
                if (res.status == 601) {
                    window.location.href = "../index/toLogin.do";
                }
            },
        });
    },
    toDate: function (value) {
        if (value instanceof Date) {
            return value;
        }
        if (typeof value == "number") {
            return new Date(value);
        }
        return null;
    },
    url: {
        query: "../patrol_task/get-ajax",
        add: "../patrol_task/store",
        update: "../patrol_task/update",
        remove: "../patrol_task/remove",
        removeBatch: "../patrol_task/removeBatch",
    },
    query: function () {
        planOpt.queryParams.search = formQuery.search.value;
        var startDate = formQuery.startDate.value;
        if (startDate != "") {
            startDate = toDate(startDate + " 00:00:00");
        }
        var endDate = formQuery.endDate.value;
        if (endDate != "") {
            endDate = toDate(endDate + " 00:00:00");
            endDate = endDate + 24 * 3600000;
        }
        if (startDate != "" && endDate != "" && startDate > endDate) {
            toastr.error(language.plan.error.startEndDate);
            return;
        }
        planOpt.queryParams.search = formQuery.search.value;
        planOpt.queryParams.type = formQuery.type.value;
        planOpt.queryParams.lineId = formQuery.lineId.value;
        planOpt.$planTable.bootstrapTable("refresh", {
            url: planOpt.url.query,
        });
    },
    refresh: function () {
        planOpt.$planTable.bootstrapTable("refresh");
    },
    optType: 0,
    addDayUI: function () {
        planOpt.optType = 0;
        $("#modal-plan-day")
            .find(".modal-title")
            .html(language.plan.addDayTitle);
        formPlanDay.id.value = "";
        formPlanDay.name.value = "";
        var next = new Date();
        next.setDate(next.getDate() + 1);
        formPlanDay.startDate.value = next.Format("yyyy-MM-dd");
        formPlanDay.endDate.value = "";
        formPlanDay.lineId.value = "";
        formPlanDay.mon.checked = true;
        formPlanDay.tue.checked = true;
        formPlanDay.wed.checked = true;
        formPlanDay.thu.checked = true;
        formPlanDay.fri.checked = true;
        formPlanDay.sat.checked = true;
        formPlanDay.sun.checked = true;
        $("formShift-user").html("");
        $("#modal-plan-day").modal("show");
    },
    addUI: function (type) {
        planOpt.optType = 0;
        formPlan.id.value = "";
        formPlan.type.value = type;
        formPlan.name.value = "";
        var next = new Date();
        next.setDate(next.getDate() + 1);
        formPlan.startDate.value = next.Format("yyyy-MM-dd");
        formPlan.endDate.value = "";
        formPlan.lineId.value = "";
        formPlan.cycle.value = "";
        if (type == 1) {
            $("#modal-plan")
                .find(".modal-title")
                .html(language.plan.addWeekTitle);
            $("#span-week-month").html(language.plan.tip.weekBulid);
            $("#label-tip").html(language.plan.tip.everyWeek);
            $(".plan-cycle").hide();
            $(".plan-week-month").show();
        } else if (type == 2) {
            $("#modal-plan")
                .find(".modal-title")
                .html(language.plan.addMonthTitle);
            $("#span-week-month").html(language.plan.tip.monthBulid);
            $("#label-tip").html(language.plan.tip.everyMonth);
            $(".plan-cycle").hide();
            $(".plan-week-month").show();
        } else if (type == 3) {
            $("#modal-plan")
                .find(".modal-title")
                .html(language.plan.addCycleTitle);
            $(".plan-week-month").hide();
            $(".plan-cycle").show();
            formPlan.cycle.value = "2";
        }
        $("#modal-plan").modal("show");
    },
    buildDayData: function () {
        var name = formPlanDay.name.value;
        if (name == "") {
            toastr.error(language.plan.error.name);
            return false;
        }
        var lineId = formPlanDay.lineId.value;
        if (lineId == "" || lineId == 0) {
            toastr.error(language.plan.error.line);
            return false;
        }
        var startDate = formPlanDay.startDate.value;
        var sd = toDate(startDate);
        var endDate = formPlanDay.endDate.value;
        var ed = null;
        if (endDate != "") {
            ed = toDate(endDate);
        }
        if (ed != null && ed < sd) {
            toastr.error(language.plan.error.startEndDate);
            return false;
        }
        if (
            !formPlanDay.mon.checked &&
            !formPlanDay.tue.checked &&
            !formPlanDay.wed.checked &&
            !formPlanDay.thu.checked &&
            !formPlanDay.fri.checked &&
            !formPlanDay.sat.checked &&
            !formPlanDay.sun.checked
        ) {
            toastr.error(language.plan.error.oneDay);
            return false;
        }
        var data = planOpt.$shiftTable.bootstrapTable("getData");
        if (data.length <= 0) {
            toastr.error(language.plan.error.shiftAdd);
            return false;
        }
        var planTimes = [];
        for (var i = 0; i < data.length; i++) {
            var planTime = {};
            planTime.startTime = planOpt.toDate(data[i].startTime).getTime();
            planTime.endTime = planOpt.toDate(data[i].endTime).getTime();
            planTimes.push(planTime);
        }
        var dayPlanTimeData = JSON.stringify(planTimes);
        var mon = formPlanDay.mon.checked ? 1 : 0;
        var tue = formPlanDay.tue.checked ? 1 : 0;
        var wed = formPlanDay.wed.checked ? 1 : 0;
        var thu = formPlanDay.thu.checked ? 1 : 0;
        var fri = formPlanDay.fri.checked ? 1 : 0;
        var sat = formPlanDay.sat.checked ? 1 : 0;
        var sun = formPlanDay.sun.checked ? 1 : 0;
        var id = formPlanDay.id.value;
        return {
            id: id,
            name: name,
            lineId: lineId,
            type: 0,
            startDate: sd,
            endDate: ed,
            mon: mon,
            tue: tue,
            wed: wed,
            thu: thu,
            fri: fri,
            sat: sat,
            sun: sun,
            dayPlanTimeData: dayPlanTimeData,
            _token: $('meta[name="csrf-token"]').attr("content"),
        };
    },
    addDay: function () {
        var data = planOpt.buildDayData();
        if (!data) {
            return;
        }
        MaskUtil.mask(language.common.tip.adding);
        $.post("../patrol_task/store", data, function (data) {
            if (data.success) {
                planOpt.refresh();
                $("#modal-plan-day").modal("hide");
                toastr.success(language.common.tip.added);
            } else if (data["errorMsg"]) {
                toastr.error(data["errorMsg"]);
            }
        });
    },
    updateDay: function () {
        var data = planOpt.buildDayData();
        if (!data) {
            return;
        }
        MaskUtil.mask(language.common.tip.updating);
        $.post("../patrol_task/update", data, function (data) {
            if (data.result) {
                planOpt.refresh();
                $("#modal-plan-day").modal("hide");
                toastr.success(language.common.tip.updated);
            } else if (data["errorMsg"]) {
                toastr.error(data["errorMsg"]);
            }
        });
    },
    buildData: function () {
        var id = formPlan.id.value;
        var name = formPlan.name.value;
        if (name == "") {
            toastr.error(language.plan.error.name);
            return false;
        }
        var type = formPlan.type.value;
        var lineId = formPlan.lineId.value;
        if (lineId == "" || lineId < 0) {
            toastr.error(language.plan.error.line);
            return false;
        }
        var building = formPlan.building.checked ? 1 : 0;
        if (type == 3) {
            var startDate = formPlan.startDate.value;
            var sd = toDate(startDate);
            var endDate = formPlan.endDate.value;
            var ed = "";
            if (endDate != "") {
                ed = toDate(endDate);
                if (ed != null && ed < sd) {
                    toastr.error(language.plan.error.startEndDate);
                    return false;
                }
            }
            var cycle = formPlan.cycle.value;
            var cycleInt = parseInt(cycle);
            if (cycleInt != cycle || cycleInt < 0) {
                toastr.error(language.plan.error.cycle);
                return false;
            }
            return {
                id: id,
                name: name,
                lineId: lineId,
                type: type,
                cycle: cycleInt,
                startDate: sd,
                endDate: ed,
                _token: $('meta[name="csrf-token"]').attr("content"),
            };
        } else {
            return {
                id: id,
                name: name,
                lineId: lineId,
                type: type,
                building: building,
                _token: $('meta[name="csrf-token"]').attr("content"),
            };
        }
    },
    add: function () {
        var data = planOpt.buildData();
        if (!data) {
            return;
        }
        MaskUtil.mask(language.common.tip.adding);
        $.ajax({
            url: planOpt.url.add,
            data: data,
            success: function (data) {
                if (data.result) {
                    planOpt.refresh();
                    $("#modal-plan").modal("hide");
                    toastr.success(language.common.tip.added);
                } else if (data["errorMsg"]) {
                    toastr.error(data["errorMsg"]);
                }
            },
        });
    },
    updateUI: function (row) {
        planOpt.optType = 1;
        if (row.type == 0) {
            formPlanDay.id.value = row.id;
            formPlanDay.name.value = row.name;
            var next = new Date();
            next.setDate(next.getDate() + 1);
            if (row.startDate) {
                formPlanDay.startDate.value = new Date(row.startDate).Format(
                    "yyyy-MM-dd"
                );
            } else {
                var next = new Date();
                next.setDate(next.getDate() + 1);
                formPlanDay.startDate.value = next.Format("yyyy-MM-dd");
            }
            if (row.endDate) {
                formPlanDay.endDate.value = new Date(row.endDate).Format(
                    "yyyy-MM-dd"
                );
            } else {
                formPlanDay.endDate.value = "";
            }
            formPlanDay.lineId.value = row.lineId;
            var node = lineTree.$dTree.getNodeByParam(
                "id",
                "l-" + row.lineId,
                null
            );
            if (node != null) {
                lineTree.$dTree.selectNode(node);
                formPlanDay.line.value = node.name;
            }
            planOpt.$shiftTable.bootstrapTable("load", row.planTimes);
            formPlanDay.mon.checked = row.mon;
            formPlanDay.tue.checked = row.tue;
            formPlanDay.wed.checked = row.wed;
            formPlanDay.thu.checked = row.thu;
            formPlanDay.fri.checked = row.fri;
            formPlanDay.sat.checked = row.sat;
            formPlanDay.sun.checked = row.sun;
            $("#modal-plan-day")
                .find(".modal-title")
                .html(language.plan.updateDayTitle);
            $("#modal-plan-day").modal("show");
        } else {
            formPlan.id.value = row.id;
            formPlan.name.value = row.name;
            formPlan.lineId.value = row.lineId;
            var node = lineTree.$tree.getNodeByParam(
                "id",
                "l-" + row.lineId,
                null
            );
            if (node != null) {
                lineTree.$tree.selectNode(node);
                formPlan.line.value = node.name;
            }
            formPlan.type.value = row.type;
            if (row.type == 1) {
                $("#modal-plan")
                    .find(".modal-title")
                    .html(language.plan.updateWeekTitle);
                $("#span-week-month").html(language.plan.tip.weekReBulid);
                $("#label-tip").html(language.plan.tip.everyWeek);
                $(".plan-cycle").hide();
                $(".plan-week-month").show();
            } else if (row.type == 2) {
                $("#modal-plan")
                    .find(".modal-title")
                    .html(language.plan.updateMonthTitle);
                $("#span-week-month").html(language.plan.tip.monthReBulid);
                $("#label-tip").html(language.plan.tip.everyMonth);
                $(".plan-cycle").hide();
                $(".plan-week-month").show();
            } else if (row.type == 3) {
                var next = new Date();
                next.setDate(next.getDate() + 1);
                if (row.startDate) {
                    formPlan.startDate.value = new Date(row.startDate).Format(
                        "yyyy-MM-dd"
                    );
                } else {
                    var next = new Date();
                    next.setDate(next.getDate() + 1);
                    formPlan.startDate.value = next.Format("yyyy-MM-dd");
                }
                if (row.endDate) {
                    formPlan.endDate.value = new Date(row.endDate).Format(
                        "yyyy-MM-dd"
                    );
                } else {
                    formPlan.endDate.value = "";
                }
                formPlan.startDate.value = row.startDate;
                formPlan.endDate.value = row.endDate;
                formPlan.cycle.value = row.cycle;
                $("#modal-plan")
                    .find(".modal-title")
                    .html(language.plan.updateCycleTitle);
                $(".plan-week-month").hide();
                $(".plan-cycle").show();
            }
            $("#modal-plan").modal("show");
        }
    },
    update: function () {
        var data = planOpt.buildData();
        if (!data) {
            return;
        }
        MaskUtil.mask(language.common.tip.updating);
        $.ajax({
            url: planOpt.url.update,
            data: data,
            success: function (data) {
                if (data.result) {
                    planOpt.refresh();
                    toastr.success(language.common.tip.updated);
                    $("#modal-plan").modal("hide");
                } else if (data["errorMsg"]) {
                    toastr.error(data["errorMsg"]);
                }
            },
        });
    },
    remove: function (id) {
        MaskUtil.mask(language.common.tip.removing);
        $.ajax({
            url: planOpt.url.remove,
            data: {
                id: id,
                _token: $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data["result"]) {
                    planOpt.refresh();
                    toastr.success(language.common.tip.removed);
                } else {
                    toastr.error(data["errorMsg"]);
                }
            },
        });
    },
};
window.operateEvents = {
    "click .update": function (e, value, row, index) {
        planOpt.updateUI(row);
    },
    "click .remove": function (e, value, row, index) {
        if (confirm(language.common.tip.removeIf)) {
            planOpt.remove(row.id);
        }
    },
};
