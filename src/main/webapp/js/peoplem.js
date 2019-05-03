/**
 * Created by Administrator on 2019/1/18.
 */
/**
 * Created by Administrator on 2019/1/18.
 */
var peopleManager = {

    id: null,

    pageNum:1,

    pageSize:12,

    total:0,

    init:function(){
        this.id = getQueryString('id');
        this.getArticleById();
    },

    getArticleById:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getArticleById?id='+this.id,
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    $("#pic-list").html('<li><div class="pic-title-content" style="overflow: visible;heigh:200px;">'
                        +'<div class="pic-title-img"><img src="http://'+location.host+'/'+data.pictureUrl+'"/></div>'
                        +'<div class="pic-title-title"><span>'+data.title+'</span><p>'+data.summary+'</p></div>'
                        +'</div><div style="clear:both;"></div><div class="pic-content" style="margin-top:10px;">'+(data.content.replace(/src=\"/g,'src="http://'+location.host))+'</div></li>');
                }else{
                    alert("请求失败，请刷新重试")
                }
            },
            error:function(err){
                alert("请求失败，请刷新重试")
            }
        });
    },


};
peopleManager.init();
