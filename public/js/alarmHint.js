$(function(){
    queryNoReadCount();
    window.setInterval("queryNoReadCount()", 60000);
    $('<audio id="alarm-mp3"><source src="../static/images/alarm.mp3" type="audio/mpeg"></audio>').appendTo('body');//载入声音文件
});
function queryNoReadCount(){
	$.ajax({
		url: "../alarm/noLookCount",
		dataType: "json",
		success: function(data){
			if (data["data"] > 0){
				$("#alarm-mp3")[0].play();
				$("#unlook-alarm-count").html(data.data);
				var message = "There is an emergency alarm" + data["data"] + "waitting to be processed";
				toastr.error(message,"Emergency alarm",{
					timeOut: 60000,
					positionClass: "toast-bottom-right",
					onclick: function(){
						window.open("../alarm/index");
					}
				});
			} else {
				$("#unlook-alarm-count").html("");
			}
			
			toastr.options.positionClass="toast-top-center";
		}
	});
}