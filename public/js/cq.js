Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds(),
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
};
var MaskUtil = (function () {
    var $mask, $maskMsg;
    var defMsg = "Saving,Please wait...";
    var mask = false;
    function init() {
        if (!$mask) {
            $mask = $('<div class="datagrid-mask mymask"></div>').appendTo(
                "body"
            );
        }
        if (!$maskMsg) {
            $maskMsg = $(
                '<div class="datagrid-mask-msg mymask">' + defMsg + "</div>"
            )
                .appendTo("body")
                .css({ "font-size": "12px" });
        }
        $mask.css({ width: "100%", height: $(document).height() });
        var scrollTop = $(document.body).scrollTop();
        $maskMsg.css({
            left: ($(document.body).outerWidth(true) - 190) / 2,
            top: ($(window).height() - 45) / 2 + scrollTop,
        });
    }
    return {
        mask: function (msg) {
            init();
            $mask.show();
            mask = true;
            $maskMsg.html(msg || defMsg).show();
        },
        unmask: function () {
            if (mask) {
                $mask.hide();
                $maskMsg.hide();
                mask = false;
            }
        },
    };
})();
/*
function Map(){
	this.elements = new Array();
	this.size = function() {
        return this.elements.length;
    }
	this.isEmpty = function() {
        return(this.elements.length < 1);
    }
	this.clear = function() {
        this.elements = new Array();
    }
	this.put = function(_key, _value) {
        this.elements.push( {
            key : _key,
            value : _value
        });
    }
	this.remove = function(_key) {
        var bln = false;
        try{
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch(e) {
            bln = false;
        }
        return bln;
    }
	this.get = function(_key) {
        try{
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch(e) {
            return null;
        }
    }
	this.element = function(_index) {
        if(_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    }
	//åˆ¤æ–­MAPä¸­æ˜¯å¦å«æœ‰æŒ‡å®šKEYçš„å…ƒç´
    this.containsKey = function(_key) {
        varbln = false;
        try{
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch(e) {
            bln = false;
        }
        return bln;
    }
    //åˆ¤æ–­MAPä¸­æ˜¯å¦å«æœ‰æŒ‡å®šVALUEçš„å…ƒç´
    this.containsValue = function(_value) {
        var bln = false;
        try{
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch(e) {
            bln = false;
        }
        return bln;
    }
    //èŽ·å–MAPä¸­æ‰€æœ‰VALUEçš„æ•°ç»„ï¼ˆARRAYï¼‰
    this.values = function() {
        var arr = new Array();
        for(i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    }
    //èŽ·å–MAPä¸­æ‰€æœ‰KEYçš„æ•°ç»„ï¼ˆARRAYï¼‰
    this.keys = function() {
        var arr = new Array();
        for(i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    }
}
*/
function dateFormat(value, fmt) {
    if (value instanceof Date) {
        return value.Format(fmt);
    }
    if (typeof value == "number") {
        var d = new Date(value);
        return d.Format(fmt);
    }
    return "";
}
function isPhone(phone) {
    //åˆ¤æ–­æ˜¯å¦ä¸ºæ‰‹æœºå·ç 
    var reg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
    if (!reg.test(phone)) {
        return false;
    }
    return true;
}
function isEmail(str) {
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return reg.test(str);
}
function isTime(str) {
    if (!str) return false;
    var reg = /([0-1][0-9]|2[0-3]):[0-5][0-9]/;
    return reg.test(str);
}
function toDate(time) {
    var result = time.replace("-", "/").replace("-", "/");
    return Date.parse(result);
}
function generateUUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
    return uuid;
}
function isHHmm(v) {
    var result = v.match(/^[0-2][0-9]:[0-5][0-9]$/);
    if (result == null) {
        return false;
    }
    return true;
}
function nextDayTime(time) {
    if (time instanceof Date) {
        time.setDate(time.getDate() + 1);
        return time.getTime();
    } else {
        var d = new Date(time);
        d.setDate(d.getDate() + 1);
        return d.getTime();
    }
}
function textNowrap() {
    return { classes: "text-nowrap" };
}
function isCheckpoint(card) {
    var reg = /(^[0-9A-F]{10}$)/;
    return reg.test(card);
}
function isDeviceCode(code) {
    var reg = /(^[0-9A-F]{8}$)/;
    return reg.test(code);
}
