var roleOpt = {
    queryParams: {},
    treeOptions: {
        data: { simpleData: { enable: true } },
        check: { enable: true, chkboxType: { Y: "ps", N: "s" } },
    },
    url: {
        privilegeTree: "../roles/listPrivilegeTree",
        query: "../roles/get-ajax",
        add: "../roles/store",
        get: "../roles/get",
        update: "../roles/update",
        del: "../roles/delete",
    },
    privilege: {
        update: false,
        remove: false,
    },
    $tree: null,
    init: function (update, remove) {
        roleOpt.privilege.update = update;
        roleOpt.privilege.remove = remove;
        $.get(roleOpt.url.privilegeTree, {}, function (data) {
            roleOpt.$tree = $.fn.zTree.init(
                $("#privilege-tree"),
                roleOpt.treeOptions,
                data.permissions
            );
        });
        roleOpt.initTable();
        $("#btn-query").click(function () {
            roleOpt.query();
        });
        $("#search-ipt").keypress(function (event) {
            var e = event || window.event;
            if (e.keyCode == "13") {
                roleOpt.query();
            }
        });
        $("#btn-add-ui").click(function () {
            roleOpt.addUI();
        });
        $("#btn-save").click(function () {
            roleOpt.save();
        });
    },
    $roleTable: null,
    initTable: function () {
        console.log(formRole);
        roleOpt.$roleTable = $("#role-table");
        roleOpt.$roleTable.bootstrapTable({
            // contentType: "application/x-www-form-urlencoded",
            method: "get",
            classes: "table table-hover table-striped table-condensed",
            idField: "id",
            uniqueId: "id",
            url: roleOpt.url.query,
            queryParams: function (params) {
                return $.extend({}, params, roleOpt.queryParams);
            },
            columns: [
                {
                    field: "",
                    width: 40,
                    align: "center",
                    formatter: function (value, row, index) {
                        return index + 1;
                    },
                },
                { field: "name", title: language.role.name },
                { field: "description", title: language.role.descripton },
                {
                    field: "opt",
                    title: language.common.operation,
                    events: operateEvents,
                    cellStyle: textNowrap,
                    formatter: function (value, row, index) {
                        var result = [];
                        if (roleOpt.privilege.update) {
                            result.push(
                                '<a class="update" href="javascript:void(0)"><i class="fa fa-edit"></i>' +
                                language.common.update +
                                "</a>  "
                            );
                        }
                        if (roleOpt.privilege.remove) {
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
                    alert(language.common.tips.timeout);
                    window.location.href = "../login";
                }
            },
        });
    },
    query: function () {
        roleOpt.queryParams.search = formQuery.search.value;
        roleOpt.$roleTable.bootstrapTable("refresh", {
            url: roleOpt.url.query,
            method: "get",
        });
    },
    optType: 0, //0 æ·»åŠ æƒé™  1 ä¿®æ”¹æƒé™
    addUI: function () {
        roleOpt.optType = 0;
        formRole.name.value = "";
        formRole.description.value = "";
        roleOpt.$tree.checkAllNodes(false);
        $("#modal-role").find(".modal-title").html(language.role.addTitle);
        $("#modal-role").modal("show");
    },
    add: function () {
        var name = formRole.name.value;
        if (name == null || $.trim(name) == "") {
            toastr.error(language.role.error.nameEmpty);
            return;
        }
        var description = formRole.description.value;
        var nodes = roleOpt.$tree.getCheckedNodes(true);
        if (nodes.length == 0) {
            toastr.error(language.role.error.privilegeEmpty);
            return;
        }
        var privilegeCodes = [];
        for (var i = 0; i < nodes.length; i++) {
            privilegeCodes.push(nodes[i].id);
        }
        MaskUtil.mask(language.common.tip.adding);
        console.log(privilegeCodes);
        $.ajax({
            url: roleOpt.url.add,
            method: "post",
            data: {
                name: name,
                description: description,
                privilegeCodes: JSON.stringify(privilegeCodes),
                _token: formRole._token.value,
            },
            success: function (data) {
                MaskUtil.unmask();
                if (data.role) {
                    roleOpt.$roleTable.bootstrapTable("refresh");
                    $("#modal-role").modal("hide");
                    toastr.success(language.common.tip.added);
                } else {
                    toastr.error(data["errorMsg"]);
                }
            },
        });
    },
    updateUI: function (id) {
        $.ajax({
            url: "../roles/get",
            method: "get",
            data: { id: id },
            success: function (data) {
                console.log("from update role", data);
                if (data["role"]) {
                    var role = data["role"];
                    roleOpt.optType = 1;
                    formRole.id.value = id;
                    $("#modal-role")
                        .find(".modal-title")
                        .html(language.role.updateTitle);
                    formRole.name.value = role.name;
                    formRole.description.value = role.description;
                    roleOpt.$tree.checkAllNodes(false);
                    for (var i = 0; i < role.permissions.length; i++) {
                        //è®¾ç½®æƒé™
                        var node = roleOpt.$tree.getNodeByParam(
                            "code",
                            role.permissions[i].code,
                            null
                        );
                        if (node) {
                            roleOpt.$tree.checkNode(node, true, false);
                        }
                    }
                    $("#modal-role").modal("show");
                }
            },
        });
    },
    update: function () {
        var name = formRole.name.value;
        if (name == null || $.trim(name) == "") {
            toastr.error(language.role.error.nameEmpty);
            return;
        }
        var description = formRole.description.value;
        var nodes = roleOpt.$tree.getCheckedNodes(true);
        if (nodes.length == 0) {
            toastr.error(language.role.error.privilegeEmpty);
            return;
        }
        var privilegeCodes = [];
        for (var i = 0; i < nodes.length; i++) {
            privilegeCodes.push(nodes[i].id);
        }
        var id = formRole.id.value;
        MaskUtil.mask(language.common.tip.updating);
        $.ajax({
            url: roleOpt.url.update,
            data: {
                id: id,
                name: name,
                description: description,
                privilegeCodes: JSON.stringify(privilegeCodes),
                _token: formRole._token.value,
            },
            success: function (data) {
                MaskUtil.unmask();
                if (data.role) {
                    roleOpt.$roleTable.bootstrapTable("refresh");
                    $("#modal-role").modal("hide");
                    toastr.success(language.common.tip.updated);
                } else {
                    toastr.error(data["errorMsg"]);
                }
            },
        });
    },
    remove: function (id) {
        MaskUtil.mask(language.common.tip.removing);
        $.ajax({
            url: roleOpt.url.del,
            data: {
                id,
                _token: $('meta[name="csrf-token"]').attr("content")
            },
            method: 'post',
            success: function (data) {
                MaskUtil.unmask();
                if (data.success) {
                    roleOpt.$roleTable.bootstrapTable("refresh");
                    $("#modal-role").modal("hide");
                    toastr.success(language.common.tip.removed);
                } else {
                    toastr.error(data["errorMsg"]);
                }
            },
            error(xml, status, err) {
                if (status == 404) {
                    toastr.error(err)
                }
            }
        });
    },
    save: function () {
        if (roleOpt.optType == 0) {
            roleOpt.add();
        } else {
            roleOpt.update();
        }
    },
};
window.operateEvents = {
    "click .update": function (e, value, row, index) {
        //æ›´æ–°æƒé™
        roleOpt.updateUI(row.id);
    },
    "click .remove": function (e, value, row, index) {
        //åˆ é™¤æƒé™
        if (confirm(language.common.tip.removeIf)) {
            roleOpt.remove(row.id);
        }
    },
};
