var areaTree = {
    options: {
        data: { simpleData: { enable: true } },
        view: { selectedMulti: false },
    },
    url: {
        tree: "../organizations/get-ajax",
        add: "../organizations/store",
        get: "../area/get",
        update: "../organizations/update",
        del: "../organizations/delete",
    },
    zTree: null,
    rMenu: null,
    init: function () {
        $.get(areaTree.url.tree, {}, function (data) {
            areaTree.zTree = $.fn.zTree.init(
                $("#area-tree"),
                areaTree.options,
                data.organizations
            );
            areaTree.rMenu = $("#rMenu");
        });
        $("#btn-add").click(function () {
            areaTree.addUI();
        });
        $("#btn-update").click(function () {
            areaTree.updateUI();
        });
        $("#btn-del").click(function () {
            areaTree.remove();
        });
        $("#btn-save").click(function () {
            areaTree.save();
        });
    },
    onBodyMouseDown: function (event) {
        if (
            !(
                event.target.id == "rMenu" ||
                $(event.target).parents("#rMenu").length > 0
            )
        ) {
            areaTree.rMenu.css({ visibility: "hidden" });
        }
    },
    showRMenu: function (type, x, y) {
        $("#rMenu ul").show();
        if (type == "root") {
            $("#btn-del").hide();
        } else {
            $("#btn-add").show();
            $("#btn-update").show();
            $("#btn-del").show();
        }
        areaTree.rMenu.css({
            top: y + "px",
            left: x + "px",
            visibility: "visible",
        });
        $("html").bind("mousedown", areaTree.onBodyMouseDown);
    },
    hideRMenu: function () {
        if (areaTree.rMenu) areaTree.rMenu.css({ visibility: "hidden" });
        $("html").unbind("mousedown", areaTree.onBodyMouseDown);
    },
    optType: 0, //0 æ·»åŠ éƒ¨é—¨  1ä¿®æ”¹éƒ¨é—¨
    addUI: function () {
        var selectedNode = areaTree.zTree.getSelectedNodes()[0];
        if (!selectedNode) {
            toastr.error(language.area.error.parent);
            return;
        }
        areaTree.optType = 0;
        formOpt.name.value = "";
        formOpt.description.value = "";
        $("#modal-area").find(".modal-title").html(language.area.addTitle);
        areaTree.hideRMenu();
        $("#modal-area").modal("show");
    },
    add: function () {
        var selectedNode = areaTree.zTree.getSelectedNodes()[0];
        if (!selectedNode) return;
        var name = formOpt.name.value;
        if (name == "") {
            toastr.error(language.area.error.name);
            return;
        }
        var description = formOpt.description.value;
        MaskUtil.mask(language.common.tip.adding);
        $.ajax({
            url: areaTree.url.add,
            method: "POST",
            data: {
                name: name,
                description: description,
                parent_id: selectedNode.id,
                _token: formOpt._token.value,
            },
            success: function (data) {
                if (data.organization) {
                    var area = data["organization"];
                    var newNode = {
                        id: area.id,
                        name: area.name,
                        title: area.description,
                        pId: area.pId,
                    };
                    areaTree.zTree.addNodes(selectedNode, newNode);
                    toastr.success(language.common.tip.added);
                    $("#modal-area").modal("hide");
                } else if (data["errorMsg"]) {
                    toastr.error(data["errorMsg"]);
                }
            },
            error: function (XMLHttpRequest, status, err) {
                if (XMLHttpRequest.status == 422) {
                    console.log(err);
                }
            },
        });
    },
    updateUI: function () {
        areaTree.optType = 1;
        var selectedNode = areaTree.zTree.getSelectedNodes()[0];
        if (!selectedNode) {
            toastr.error(language.area.error.parent);
            return;
        }
        formOpt.name.value = selectedNode.name;
        formOpt.description.value = selectedNode.title;
        formOpt.id.value = selectedNode.id;
        $("#modal-area").find(".modal-title").html(language.area.updateTitle);
        $("#modal-area").modal("show");
    },
    update: function () {
        var selectedNode = areaTree.zTree.getSelectedNodes()[0];
        if (!selectedNode) {
            toastr.error(language.area.error.parent);
            return;
        }
        var id = formOpt.id.value;
        var name = formOpt.name.value;
        var description = formOpt.description.value;
        MaskUtil.mask(language.common.tip.updating);
        $.ajax({
            url: `${areaTree.url.update}/${id}`,
            method: "POST",
            data: {
                name: name,
                description: description,
                id: id,
                _token: formOpt._token.value,
            },
            success: function (data) {
                if (data.organization) {
                    selectedNode.name = name;
                    selectedNode.title = description;
                    areaTree.zTree.updateNode(selectedNode);
                    toastr.success(language.common.tip.updated);
                    $("#modal-area").modal("hide");
                } else if (data["errorMsg"]) {
                    toastr.error(data["errorMsg"]);
                }
            },
            error: function (XMLHttpRequest, status, err) {
                if (XMLHttpRequest.status == 422) {
                    console.log(err);
                }
            },
        });
    },
    remove: function () {
        var selectedNode = areaTree.zTree.getSelectedNodes()[0];
        if (!selectedNode) {
            toastr.error(language.area.error.parent);
            return;
        }
        areaTree.hideRMenu();
        if (window.confirm(language.common.tip.removeIf)) {
            MaskUtil.mask(language.common.tip.removing);
            $.ajax({
                url: `${areaTree.url.del}/${selectedNode.id}`,
                method: "POST",
                data: {
                    id: selectedNode.id,
                    _token: $('meta[name="csrf-token"]').attr("content"),
                },
                success(data) {
                    if (data.success) {
                        toastr.success(language.common.tip.removed);
                        areaTree.zTree.removeNode(selectedNode);
                    } else if (data["errorMsg"]) {
                        toastr.error(data["errorMsg"]);
                    }
                },
                error(xml, status) {},
            });
        }
    },
    save: function () {
        if (areaTree.optType == 0) {
            areaTree.add();
        } else {
            areaTree.update();
        }
    },
};
