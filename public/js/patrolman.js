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
var patrolmanOpt = {
    queryParams: {},
    URL: {
        query: "../patrolman/get-ajax",
        add: "../patrolman/store",
        update: "../patrolman/update",
        del: "../patrolman/delete",
    },
    privilege: {
        update: false,
        remove: false,
    },
    init: function (updade, remove) {
        patrolmanOpt.privilege.update = updade;
        patrolmanOpt.privilege.remove = remove;
        patrolmanOpt.initTable();
        $("#btn-query").click(function () {
            patrolmanOpt.query();
        });
        $("#btn-add-ui").click(function () {
            patrolmanOpt.addUI();
        });
        $("#btn-save").click(function () {
            if (patrolmanOpt.opt == 0) {
                patrolmanOpt.add();
            } else {
                patrolmanOpt.update();
            }
        });
    },
    $patrolmanTable: null,
    initTable: function () {
        patrolmanOpt.$patrolmanTable = $("#patrolman-table");
        patrolmanOpt.$patrolmanTable.bootstrapTable({
            contentType: "application/x-www-form-urlencoded",
            method: "get",
            classes: "table table-hover table-striped table-condensed",
            idField: "id",
            uniqueId: "id",
            pagination: true,
            pageSize: 15,
            pageList: [15, 25, 50, 100],
            sidePagination: "server",
            url: patrolmanOpt.URL.query,
            queryParams: function (params) {
                return $.extend({}, params, patrolmanOpt.queryParams);
            },
            columns: [
                {
                    field: "",
                    width: 40,
                    align: "center",
                    formatter: function (value, row, index) {
                        var options =
                            patrolmanOpt.$patrolmanTable.bootstrapTable(
                                "getOptions"
                            );
                        return (
                            (options.pageNumber - 1) * options.pageSize +
                            (index + 1)
                        );
                    },
                },
                {
                    field: "name",
                    title: language.patrolman.name,
                    sortable: true,
                    formatter: function (value, row, index) {
                        return row.name;
                    },
                },
                {
                    field: "Code Number",
                    title: language.patrolman.card,
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
                {
                    field: "description",
                    title: language.common.descripton,
                    formatter: function (value, row, index) {
                        return row.description.substring(0, 10);
                    },
                },
                {
                    field: "Created At",
                    title: language.common.gmtCreate,
                    sortable: true,
                    formatter: function (value, row, index) {
                        // if (typeof row.gmtCreate == "number") {
                        //     var d = new Date(row.gmtCreate);
                        //     return d.Format("yyyy-MM-dd HH:mm:ss");
                        // }
                        return row.created_at;
                    },
                },
                {
                    field: "opt",
                    title: language.common.operation,
                    events: operateNodeEvents,
                    cellStyle: textNowrap,
                    formatter: function (value, row, index) {
                        var result = [];
                        if (patrolmanOpt.privilege.update) {
                            result.push(
                                '<a class="update" href="javascript:void(0)"><i class="fa fa-edit"></i>' +
                                    language.common.update +
                                    "</a>  "
                            );
                        }
                        if (patrolmanOpt.privilege.remove) {
                            result.push(
                                '<a class="delete" href="javascript:void(0)"><i class="fa fa-remove"></i>' +
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
                    window.location.href = "../login";
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
        patrolmanOpt.queryParams.areaIds = areaIds;
        patrolmanOpt.queryParams.search = search;
        patrolmanOpt.$patrolmanTable.bootstrapTable("refresh", {
            url: patrolmanOpt.URL.query,
        });
    },
    opt: 0,
    addUI: function () {
        patrolmanOpt.opt = 0;
        $("#modal-patrolman .modal-title").html(language.patrolman.addTitle);
        formOpt.name.value = "";
        formOpt.code_number.value = "";
        formOpt.description.value = "";
        $("#modal-patrolman").modal("show");
    },
    add: function () {
        var name = formOpt.name.value;
        if (name == "") {
            toastr.error(language.patrolman.error.name);
            return;
        }
        var code_number = formOpt.code_number.value;
        // if (!isCheckpoint(code_number)) {
        //     toastr.error(language.patrolman.error.card);
        //     return;
        // }
        var description = formOpt.description.value;
        var nodes = areaTree.optTree.getCheckedNodes(true);
        var areaId = "";
        if (nodes.length > 0) {
            areaId = nodes[0].id;
        }
        if (areaId == "") {
            toastr.error(language.patrolman.error.area);
            return;
        }
        MaskUtil.mask(language.common.tip.adding);
        $.ajax({
            url: patrolmanOpt.URL.add,
            method: "post",
            data: {
                name,
                code_number,
                description,
                areaId,
                _token: $('meta[name="csrf-token"]').attr("content"),
            },
            success: function (data) {
                if (data.success) {
                    patrolmanOpt.$patrolmanTable.bootstrapTable("refresh");
                    $("#modal-patrolman").modal("hide");
                    toastr.success(language.common.tip.added);
                }
                //  else {
                //     toastr.error(data.errorMsg);
                // }
            },
            error(xml, status, err) {
                toastr.error(err);
            },
        });
    },
    updateUI: function (row) {
        patrolmanOpt.opt = 1;
        $("#modal-patrolman .modal-title").html(language.patrolman.updateTitle);
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
        $("#modal-patrolman").modal("show");
    },
    update: function () {
        var id = formOpt.id.value;
        var name = formOpt.name.value;
        if (name == "") {
            toastr.error(language.patrolman.error.name);
            return;
        }
        var code_number = formOpt.code_number.value;
        // if (!isCheckpoint(code_number)) {
        //     toastr.error(language.patrolman.error.card);
        //     return;
        // }
        var description = formOpt.description.value;
        var nodes = areaTree.optTree.getCheckedNodes(true);
        var areaId = "";
        if (nodes.length > 0) {
            areaId = nodes[0].id;
        }
        if (areaId == "") {
            toastr.error(language.patrolman.error.area);
            return;
        }
        console.log(areaId, "areaid");
        MaskUtil.mask(language.common.tip.updating);
        $.ajax({
            url: patrolmanOpt.URL.update,
            method: "post",
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
                    patrolmanOpt.$patrolmanTable.bootstrapTable("refresh");
                    $("#modal-patrolman").modal("hide");
                    toastr.success(language.common.tip.updated);
                }
            },
            error(xml, status, err) {
                toastr.error(err);
            },
        });
    },
    remove: function (id) {
        if (window.confirm(language.common.tip.removeIf)) {
            MaskUtil.mask(language.common.tip.removing);
            $.post(
                patrolmanOpt.URL.del,
                {
                    id: id,
                    _token: $('meta[name="csrf-token"]').attr("content"),
                },
                function (data) {
                    if (data.result) {
                        patrolmanOpt.$patrolmanTable.bootstrapTable("refresh");
                        toastr.success(language.common.tip.removed);
                    } else if (data["errorMsg"]) {
                        toastr.error(data["errorMsg"]);
                    }
                }
            );
        }
    },
};

window.operateNodeEvents = {
    "click .update": function (e, value, row, index) {
        patrolmanOpt.updateUI(row);
    },
    "click .delete": function (e, value, row, index) {
        patrolmanOpt.remove(row.id);
    },
};
