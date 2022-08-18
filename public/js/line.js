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
        opt: {
            data: { simpleData: { enable: true } },
            check: {
                enable: true,
                chkStyle: "radio",
                chkboxType: { Y: "s", N: "s" },
                radioType: "all",
            },
        },
    },
    url: "../organizations/get-ajax",
    queryTree: null,
    optTree: null,
    init: function () {
        $.get(areaTree.url, {}, function (data) {
            areaTree.queryTree = $.fn.zTree.init(
                $("#q-tree"),
                areaTree.options.query,
                data.organizations
            );
            areaTree.optTree = $.fn.zTree.init(
                $("#opt-tree"),
                areaTree.options.opt,
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
var lineOpt = {
    queryParams: {},
    privilege: { update: false, remove: false, node: false },
    URL: {
        query: "../routes/get-ajax",
        add: "../routes/store",
        update: "../routes/update",
        del: "../routes/delete",
    },
    init: function (update, remove, node) {
        lineOpt.privilege.update = update;
        lineOpt.privilege.remove = remove;
        lineOpt.privilege.node = node;
        lineOpt.initTable();
        $("#btn-query").click(function () {
            lineOpt.query();
        });
        $("#btn-add-ui").click(function () {
            lineOpt.addUI();
        });
        $("#btn-save").click(function () {
            lineOpt.save();
        });
    },
    $lineTable: null,
    initTable: function () {
        lineOpt.$lineTable = $("#line-table");
        lineOpt.$lineTable.bootstrapTable({
            contentType: "application/x-www-form-urlencoded",
            method: "get",
            classes: "table table-hover table-striped table-condensed",
            idField: "id",
            uniqueId: "id",
            pagination: true,
            pageSize: 15,
            pageList: [15, 25, 50, 100],
            sidePagination: "server",
            url: lineOpt.URL.query,
            queryParams: function (params) {
                return $.extend({}, params, lineOpt.queryParams);
            },
            columns: [
                {
                    field: "",
                    width: 40,
                    align: "center",
                    formatter: function (value, row, index) {
                        var options =
                            lineOpt.$lineTable.bootstrapTable("getOptions");
                        return (
                            (options.pageNumber - 1) * options.pageSize +
                            (index + 1)
                        );
                    },
                },
                { field: "name", title: language.line.name, sortable: true },
                {
                    field: "area_id",
                    title: language.common.area,
                    sortable: true,
                    formatter: function (value, row, index) {
                        return row.organization;
                    },
                },
                { field: "description", title: language.common.descripton },
                {
                    field: "creation_time",
                    title: language.common.gmtCreate,
                    sortable: true,
                    formatter: function (value, row, index) {
                        // if (typeof row.gmtCreate == "number") {
                        //     var d = new Date(row.gmtCreate);
                        //     return d.Format("yyyy-MM-dd HH:mm:ss");
                        // }
                        return row.creation_time;
                    },
                },
                {
                    field: "opt",
                    title: language.common.operation,
                    events: operateEvents,
                    cellStyle: textNowrap,
                    formatter: function (value, row, index) {
                        var result = [];
                        if (lineOpt.privilege.node) {
                            result.push(
                                '<a  href="../route_checkpoint/' +
                                    row.id +
                                    '"><i class="fa fa-bullseye"></i>' +
                                    language.line.node +
                                    "</a>&nbsp;&nbsp;"
                            );
                        }
                        if (lineOpt.privilege.update) {
                            result.push(
                                '<a class="update" href="javascript:void(0)"><i class="fa fa-edit"></i>' +
                                    language.common.update +
                                    "</a>&nbsp;&nbsp;"
                            );
                        }
                        if (lineOpt.privilege.remove) {
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
            onLoadError: function (status, res) {
                if (res.status == 601) {
                    window.location.href = "../";
                }
            },
        });
    },
    query: function () {
        var name = window.formQuery.name.value;
        var nodes = areaTree.queryTree.getCheckedNodes(true);
        var areaIds = [];
        if (nodes.length > 0) {
            for (var i = 0; i < nodes.length; i++) {
                areaIds.push(nodes[i].id);
            }
        }
        lineOpt.queryParams.areaIds = areaIds;
        lineOpt.queryParams.name = name;
        lineOpt.$lineTable.bootstrapTable("refresh", {
            url: lineOpt.URL.query,
        });
    },
    optType: 0,
    addUI: function () {
        lineOpt.optType = 0;
        formOpt.name.value = "";
        $("#formOpt-d-area").show();
        $("#modal-line").find(".modal-title").html(language.line.addTitle);
        $("#modal-line").modal("show");
    },
    add: function () {
        var name = formOpt.name.value;
        if ($.trim(name) == "") {
            toastr.error(language.line.error.name);
            return;
        }
        var nodes = areaTree.optTree.getCheckedNodes(true);
        var areaId = "";
        if (nodes.length > 0) {
            areaId = nodes[0].id;
        }
        if (areaId == "") {
            toastr.error(language.line.error.area);
            return;
        }
        var description = formOpt.description.value;
        MaskUtil.mask(language.common.tip.adding);
        $.ajax({
            url: lineOpt.URL.add,
            data: {
                name,
                areaId,
                description,
                _token: $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                MaskUtil.unmask();
                if (data.success) {
                    lineOpt.$lineTable.bootstrapTable("refresh");
                    $("#modal-line").modal("hide");
                    toastr.success(language.common.tip.added);
                } else if (data["errorMsg"]) {
                    toastr.error(data["errorMsg"]);
                }
            },
        });
    },
    updateUI: function (row) {
        lineOpt.optType = 1;
        formOpt.id.value = row.id;
        formOpt.name.value = row.name;
        $("#modal-line").find(".modal-title").html(language.line.updateTitle);
        $("#formOpt-d-area").hide();
        $("#modal-line").modal("show");
    },
    update: function () {
        var name = formOpt.name.value;
        if ($.trim(name) == "") {
            toastr.error(language.line.error.name);
            return;
        }
        var id = formOpt.id.value;
        var description = formOpt.description.value;
        MaskUtil.mask(language.common.tip.updating);
        $.ajax({
            url: lineOpt.URL.update,
            data: {
                id: id,
                name: name,
                description,
                _token: $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success) {
                    lineOpt.$lineTable.bootstrapTable("refresh");
                    $("#modal-line").modal("hide");
                    toastr.success(language.common.tip.updated);
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
            $.ajax({
                url: lineOpt.URL.del,
                data: {
                    id: id,
                    _token: $('meta[name="csrf-token"]').attr("content"),
                },
                success: function (data) {
                    if (data.success) {
                        lineOpt.$lineTable.bootstrapTable("refresh");
                        toastr.success(language.commom.tip.removed);
                    }
                },
                error(xml, status, err) {
                    toastr.error(err);
                },
            });
        }
    },
    save: function () {
        if (lineOpt.optType == 0) {
            lineOpt.add();
        } else {
            lineOpt.update();
        }
    },
};
window.operateEvents = {
    "click .update": function (e, value, row, index) {
        lineOpt.updateUI(row);
    },
    "click .remove": function (e, value, row, index) {
        lineOpt.remove(row.id);
    },
};
