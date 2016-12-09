"use strict";

$(function() {  
    FastClick.attach(document.body);  //解决延迟点击
}); 

var noDataHTML = '<div class="m-noData">暂无数据</div>';
var loadingHTML = '<div class="loading">'
        +'<div class="spinner">'
        +'<div class="spinner-container container1">'
        +'<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div>'
        +'<div class="spinner-container container2">'
        +'<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div>'
        +'<div class="spinner-container container3">'
        +'<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div>'
        +'</div></div></div>';
$('#ajaxList').html(loadingHTML); //默认加载状态

var page = 1;
function ajax_tpl(url,func) {
    url = WAPI_HOST.replace(/(\/*$)/g, "") + "/" + url.replace(/^\/*/g, "")+ '&page='+page;
    // console.log(url);
    $("#page").html('');//重置分页
    $.ajax({
        type          : 'GET',
        url           : url,
        data          : {},
        dataType      : 'jsonp',
        jsonp         : 'callback',
        jsonpCallback : func,
        timeout: 1000,
        success: function(ret) {
            // window[func](rets);
            // console.log(ret);
        },
        error: function(err) {
            console.log('err');
        }
    });
}


//loading 效果
// i = in  i = out
function loading(i) {
    if (i=='in') {
		var spinner = '<div id="loading" class="loadingFixed">'
		+'<div class="spinner">'
		+'<div class="spinner-container container1">'
		+'<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div>'
		+'<div class="spinner-container container2">'
		+'<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div>'
		+'<div class="spinner-container container3">'
		+'<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div>'
		+'</div></div></div>';
        $('#loading')[0] || $("body").after(spinner);
    } else {
        $("#loading").fadeOut().remove();
    }
}