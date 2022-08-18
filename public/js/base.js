var TYPE_AREA = 0; //ä»£è¡¨éƒ¨é—¨
var TYPE_USER = 1; //ä»£è¡¨ç”¨æˆ·
var TYPE_LINE = 2; //ä»£è¡¨çº¿è·¯
$.ajaxSetup({
    type: "post",
    dataType: "json",
    traditional: true,
    complete: function () {
        MaskUtil.unmask();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.status == 601) {
            alert(language.common.tip.timeout);
            window.location.href = "../index/toLogin";
        }
    },
});
$(function () {
    if (typeof String.prototype.startsWith != "function") {
        String.prototype.startsWith = function (prefix) {
            return this.slice(0, prefix.length) === prefix;
        };
    }
    if ($(".modify-pwd").length > 0) {
        $(".modify-pwd").click(function () {
            //ä¿®æ”¹å¯†ç  å¼¹å‡ºæ¡†
            $("#mp-e-msg").hide().html("");
            formModifyPwd.oldPwd.value = "";
            formModifyPwd.newPwd.value = "";
            formModifyPwd.rePwd.value = "";
            $("#modal-pwd").modal("show");
        });
        $("#btn-save-pwd").click(function () {
            //ä¿®æ”¹å¯†ç  æäº¤
            var oldPwd = formModifyPwd.oldPwd.value;
            var newPwd = formModifyPwd.newPwd.value;
            var rePwd = formModifyPwd.rePwd.value;
            if (newPwd == "" || newPwd.length < 6) {
                toastr.error(language.pwd.error.len);
                return;
            }
            if (newPwd != rePwd) {
                toastr.error(language.pwd.error.notSame);
                return;
            }
            MaskUtil.mask(language.pwd.tip.resetPwding);
            $.ajax({
                url: "../index/modifyPwd",
                data: {
                    oldPwd: oldPwd,
                    newPwd: newPwd,
                    rePwd: rePwd,
                },
                success: function (data) {
                    if (data.result) {
                        $("#modal-pwd").modal("hide");
                        toastr.info(language.common.tip.updated);
                    } else if (data["errorMsg"]) {
                        toastr.error(data["errorMsg"]);
                    }
                },
            });
        });
    }
    var url = window.location.href;
    var urls = url.split("/");
    var str = urls[urls.length - 2];
    if (str == "index") {
        $("#home").addClass("active");
    } else if (str == "node") {
        $("#li-line").addClass("active");
        $("#patrol-mgr").addClass("active");
    } else {
        var $li = $("#li-" + str);
        $li.addClass("active");
        $li.parent().parent().addClass("active");
    }
    toastr.options.closeButton = true;
    toastr.options.timeOut = 2000;
    toastr.options.positionClass = "toast-top-center";
    $(".number").on("keyup", function () {
        this.value = this.value.replace(/\D/g, "");
    });
});
