/**
 * Created by Administrator on 2019/1/18.
 */
/**
 * Created by Administrator on 2019/1/18.
 */
var listPicManager = {

    id: null,

    articleId:null,

    pageNum:1,

    pageSize:9999,

    total:0,

    init:function(){
        this.id = getQueryString('id');
        this.ename = getQueryString('ename');
        this.articleId = getQueryString('articleId');
        this.getDeviceList();
        // this.initData();
    },
    initData:function(){
        this.getArticleByMenuId(this.id);
    },

    getArticleByMenuId:function(id){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getArticleByMenuId?folderId='+_this.id+"&pageNum="+this.pageNum+"&pageSize="+this.pageSize,
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    var obj = data.list[0];
                    var id = obj.folderId;
                    $("#pic-list").html('<li><div class="pic-title-content" style="height: auto;">'
                        // +'<div class="pic-title-img"><img src="http://'+location.host+'/'+data.pictureUrl+'"/></div>'
                        +'<div class="pic-title-title"><span>'+obj.title+'</span><p>'+obj.summary+'</p><img src="http://'+location.host+'/'+obj.pictureUrl+'"/></div>'
                        +'</div></div><div style="clear:both;"></div><div class="pic-content">'+(obj.content.replace(/src=\"/g,'src="http://'+location.host))+'</div></li>');
                }else{
                    alert("请求失败，请刷新重试")
                }
            },
            error:function(err){
                alert("请求失败，请刷新重试")
            }
        });
    },

    getDeviceList:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getMenuById?id=39',
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data.folderList;
                    var str = "";
                    var id = "";
                    // str = '<li class="'+(_this.id == null?'active':'')+'" style="background-image: none;"><a href="qichezupin.html">全部</a></li>';
                    for(var i=0;i<data.length;i++){
                        var obj = data[i];
                        if(i==0  && _this.id == null){
                            _this.id = obj.folderId;
                        }
                        str = str + '<li class="'+(_this.id == obj.folderId?'active':'')+'"><a href="whry.html?id='+obj.folderId+'&ename="+obj.ename>'+obj.name+'</a></li>';
                    }
                    $("#list-pic-ul").append(str);
                    _this.initData();
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
$(function(){
    listPicManager.init();
})
