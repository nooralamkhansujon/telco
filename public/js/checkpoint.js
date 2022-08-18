var areaTree = {
    options: {
        query: {
            data: { simpleData: { enable: true } },
            check: {
                enable: true,
                chkStyle: "checkbox",
                chkboxType: { Y: "s", N: "s" },
            },
            view: {
                dblClickExpand: false,
                selectedMulti: true,
            },
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
var checkpointOpt = {
    queryParams: {},
    URL: {
        query: "../checkpoint/get-ajax",
        add: "../checkpoint/store",
        update: "../checkpoint/update",
        del: "../checkpoint/delete",
        excel: "../checkpoint/excel",
    },
    privilege: {
        update: false,
        remove: false,
    },
    init: function (updade, remove) {
        checkpointOpt.privilege.update = updade;
        checkpointOpt.privilege.remove = remove;
        checkpointOpt.initTable();
        $("#btn-query").click(function () {
            checkpointOpt.query();
        });
        $("#btn-add-ui").click(function () {
            checkpointOpt.addUI();
        });
        $("#btn-save").click(function () {
            if (checkpointOpt.opt == 0) {
                checkpointOpt.add();
            } else {
                checkpointOpt.update();
            }
        });
        $("#btn-excel").click(function () {
            var search = window.formQuery.search.value;
            var nodes = areaTree.queryTree.getCheckedNodes(true);
            var url = checkpointOpt.URL.excel + "?search=" + search;
            if (nodes.length > 0) {
                for (var i = 0; i < nodes.length; i++) {
                    url = url + "&areaIds=" + nodes[i].id;
                }
            }
            window.open(url);
        });
        $("#btn-upload").click(function () {
            formUpload.file.value = "";
            $("#modal-upload").modal("show");
        });
        $("#btn-save-upload").click(function () {
            var fileName = $("#f-upload input[name='file']").val();
            if (!fileName) {
                toastr.error("Please select an Excel file to import");
                return;
            }
            MaskUtil.mask("Importing, please wait...");
            $("#f-upload").ajaxSubmit({
                type: "POST",
                success: function (data) {
                    MaskUtil.unmask();
                    if (data.result) {
                        checkpointOpt.$checkpointTable.bootstrapTable(
                            "refresh"
                        );
                        toastr.success("Import successful");
                        $("#modal-upload").modal("hide");
                    } else {
                        toastr.error(data.errorMsg);
                    }
                },
                error: function () {
                    MaskUtil.unmask();
                    toastr.error("Import failed");
                },
            });
        });
    },
    $checkpointTable: null,
    initTable: function () {
        checkpointOpt.$checkpointTable = $("#checkpoint-table");
        checkpointOpt.$checkpointTable.bootstrapTable({
            contentType: "application/x-www-form-urlencoded",
            method: "get",
            classes: "table table-hover table-striped table-condensed",
            idField: "id",
            uniqueId: "id",
            pagination: true,
            pageSize: 15,
            pageList: [15, 25, 50, 100],
            sidePagination: "server",
            url: checkpointOpt.URL.query,
            queryParams: function (params) {
                return $.extend({}, params, checkpointOpt.queryParams);
            },
            columns: [
                {
                    field: "",
                    width: 40,
                    align: "center",
                    formatter: function (value, row, index) {
                        var options =
                            checkpointOpt.$checkpointTable.bootstrapTable(
                                "getOptions"
                            );
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
                    sortable: true,
                    formatter: function (value, row, index) {
                        return row.name;
                    },
                },
                {
                    field: "code_number",
                    title: language.checkpoint.code_number,
                    sortable: true,
                    formatter: function (value, row, index) {
                        return row.code_number;
                    },
                },
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
                    field: "created_at",
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
                    events: operateNodeEvents,
                    cellStyle: textNowrap,
                    formatter: function (value, row, index) {
                        var result = [];
                        if (checkpointOpt.privilege.update) {
                            result.push(
                                '<a class="update" href="javascript:void(0)"><i class="fa fa-edit"></i>' +
                                    language.common.update +
                                    "</a>  "
                            );
                        }
                        if (checkpointOpt.privilege.remove) {
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
                    window.location.href = "../index/toLogin";
                }
            },
        });
    },
    query: function () {
        var search = formQuery.search.value;
        var nodes = areaTree.queryTree.getCheckedNodes(true);
        var areaIds = [];
        if (nodes.length > 0) {
            for (var i = 0; i < nodes.length; i++) {
                areaIds.push(nodes[i].id);
            }
        }
        checkpointOpt.queryParams.areaIds = areaIds;
        checkpointOpt.queryParams.search = search;
        checkpointOpt.$checkpointTable.bootstrapTable("refresh", {
            url: checkpointOpt.URL.query,
        });
    },
    opt: 0,
    addUI: function () {
        checkpointOpt.opt = 0;
        $("#modal-checkpoint .modal-title").html(language.checkpoint.addTitle);
        formOpt.name.value = "";
        formOpt.code_number.value = "";
        formOpt.description.value = "";
        $("#modal-checkpoint").modal("show");
    },
    add: function () {
        var name = formOpt.name.value;
        if (name == "") {
            toastr.error(language.checkpoint.error.name);
            return;
        }
        var code_number = formOpt.code_number.value;
        // if (!isCheckpoint(code_number)) {
        //     toastr.error(language.checkpoint.error.code_number);
        //     return;
        // }
        var description = formOpt.description.value;
        var nodes = areaTree.optTree.getCheckedNodes(true);
        var areaId = "";
        if (nodes.length > 0) {
            areaId = nodes[0].id;
        }
        if (areaId == "") {
            toastr.error(language.checkpoint.error.area);
            return;
        }
        MaskUtil.mask(language.common.tip.adding);
        $.ajax({
            url: checkpointOpt.URL.add,
            data: {
                name,
                code_number,
                description,
                areaId,
                _token: $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success) {
                    checkpointOpt.$checkpointTable.bootstrapTable("refresh");
                    $("#modal-checkpoint").modal("hide");
                    toastr.success(language.common.tip.added);
                }
            },
            error(xml, status, err) {
                toastr.error(err);
            },
        });
    },
    updateUI: function (row) {
        console.log(row);
        checkpointOpt.opt = 1;
        $("#modal-checkpoint .modal-title").html(
            language.checkpoint.updateTitle
        );
        formOpt.id.value = row.id;
        formOpt.name.value = row.name;
        formOpt.code_number.value = row.code_number;
        formOpt.description.value = row.description;
        var node = areaTree.optTree.getNodeByParam(
            "id",
            row.organization_id,
            null
        );
        if (node != null) {
            areaTree.optTree.checkNode(node, true, false);
        }
        $("#modal-checkpoint").modal("show");
    },
    update: function () {
        var id = formOpt.id.value;
        var name = formOpt.name.value;
        if (name == "") {
            toastr.error(language.checkpoint.error.name);
            return;
        }
        var code_number = formOpt.code_number.value;
        // if (!isCheckpoint(code_number)) {
        //     toastr.error(language.checkpoint.error.card);
        //     return;
        // }
        var description = formOpt.description.value;
        var nodes = areaTree.optTree.getCheckedNodes(true);
        var areaId = "";
        if (nodes.length > 0) {
            areaId = nodes[0].id;
        }
        if (areaId == "") {
            toastr.error(language.checkpoint.error.area);
            return;
        }
        MaskUtil.mask(language.common.tip.updating);
        $.ajax({
            url: checkpointOpt.URL.update,
            data: {
                id,
                name,
                code_number,
                description,
                areaId,
                _token: $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success) {
                    checkpointOpt.$checkpointTable.bootstrapTable("refresh");
                    $("#modal-checkpoint").modal("hide");
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
            $.post(
                checkpointOpt.URL.del,
                {
                    id: id,
                    _token: $('meta[name="csrf-token"]').attr("content"),
                },
                function (data) {
                    if (data.success) {
                        checkpointOpt.$checkpointTable.bootstrapTable(
                            "refresh"
                        );
                        toastr.success(language.common.tip.removed);
                    } else if (data["error"]) {
                        toastr.error(data["error"]);
                    }
                }
            );
        }
    },
};

window.operateNodeEvents = {
    "click .update": function (e, value, row, index) {
        checkpointOpt.updateUI(row);
    },
    "click .remove": function (e, value, row, index) {
        checkpointOpt.remove(row.id);
    },
};
