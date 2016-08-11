// ==UserScript==
// @name         Tieba Atme Blocker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A simple script allows you to hide "at" notifiction from who is in the black list.
// @author       ZM01
// @match        http://tieba.baidu.com/i/*/atme*
// @require      //cdn.bootcss.com/jquery/3.1.0/jquery.js
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    var black_list = (GM_getValue("black_list") || "").split('\n');
    var hidden_doms = $(".feed_item").filter(function(i, e){
        var on = $(e).find(".atme_user > a").text();
        var username = on.split('').slice(0, on.length-1).join('');
        return black_list.includes(username);
    });
    hidden_doms.css('display','none');
    if(hidden_doms.length){
        $(".feed > ul").append('<li class="feed_item clearfix feed_atme j_feed_atme">'+hidden_doms.length+'条提示已隐藏<a href="#" id="showHiddenBtn">点击展开</a></li>');
    }
    $("#showHiddenBtn").on('click', function(evt){
        hidden_doms.css('display', 'list-item');
        $("#showHiddenBtn").css('display','none');
    });
    $(".feed > ul").append('<li class="feed_item clearfix feed_atme j_feed_atme"><a href="#" id="showBlackListBtn">显示黑名单</a></li>');
    $(".feed > ul").append('<li class="feed_item clearfix feed_atme j_feed_atme" style="display: none;" id="blackListLi"><textarea id="blackListInput" style="width: 100%;">'+(GM_getValue("black_list") || "")+'</textarea><p><a href="#" id="saveBlackListBtn">保存黑名单</a></p></li>');
    $("#showBlackListBtn").on('click', function(){
        $("#blackListLi").css('display', 'list-item');
    });
    $("#saveBlackListBtn").on('click', function(){
        GM_setValue("black_list", $("#blackListInput").val());
        $("#blackListLi").css('display', 'none');
        location.reload();
    });
})();
