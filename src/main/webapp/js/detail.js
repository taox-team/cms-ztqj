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

    pageSize:12,

    total:0,

    init:function(){
        this.id = getQueryString('id');
        this.ename = getQueryString('ename');
        this.articleId = getQueryString('articleId');
        this.getDeviceList();
        this.initData();
    },
    initData:function(){
        if(this.id != null){
            if(this.articleId != null){
                this.getArticleById();
            }else{
                this.getArticleByMenuId(this.id);
            }
        }
        // else{
        //     this.getAllArticleInDevice();
        // }
        this.formatArticleInfo();
    },
    formatArticleInfo:function(){
        if(this.articleId != null ){
            $("#title-pic").html("公告详情");
            $("#isdetai").html("- 公告详情");
        }else{
            $("#isdetai").html("");
        }
    },

    formatListInfo:function(){
        $("#title-pic").html("公告列表");
    },
    getArticleById:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getArticleById?id='+this.articleId,
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    $("#pic-list").html('<li><div class="pic-title-content" style="height:auto;">'
                        // +'<div class="pic-title-img"><img src="http://'+location.host+'/'+data.pictureUrl+'"/></div>'
                        +'<div class="pic-title-title" style="padding:0px 20px;"><span>'+data.title+'</span><p>'+data.summary+'</p></div>'
                        +'</div><div class="pic-content">'+(data.content.replace(/src=\"/g,'src="http://'+location.host))+'</div></li>');
                    _this.formatArticleInfo();
                }else{
                    alert("请求失败，请刷新重试")
                }
            },
            error:function(err){
                alert("请求失败，请刷新重试")
            }
        });
    },

    getAllArticleInDevice:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getAllArticleInDevice',
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    var str = "";
                    for(var i=0;i<data.length;i++){
                        var obj = data[i];
                        str = str + '<li class="pic">'
                            +'<div class="img-box">'
                            +'<a target="_blank" href="qichezupin.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'
                            +'<img src="http://'+location.host+'/'+obj.pictureUrl+'">'
                            +'</a>'
                            +'</div>'
                            +'<h3><a href="qichezupin.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'+obj.title+'</a></h3>'
                            +'</li>';
                    }
                    $("#pic-list").html(str);
                    _this.total = data.count;
                    _this.formatListInfo();
                    _this.createPage();
                }else{
                    alert("请求失败，请刷新重试")
                }
            },
            error:function(err){
                alert("请求失败，请刷新重试")
            }
        });
    },

    getArticleByMenuId:function(id){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getArticleByMenuId?folderId='+_this.id+"&pageNum="+this.pageNum+"&pageSize="+this.pageSize,
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    var str = "";
                    var id = null;
                    for(var i=0;i<data.list.length;i++){
                        var obj = data.list[i];
                        if(i ==0 ) id = obj.folderId;
                        str = str +  '<li class="gonggao-list"><span>'+new Date(obj.updateTime).format('yyyy-MM-dd')+'</span><a target="_blank" href="detail.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'+obj.title+'</a></li>';
                        // str = str + '<li class="pic">'
                        //     +'<div class="img-box">'
                        //     +'<a href="qichezupin.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'
                        //     +'<img src="http://'+location.host+'/'+obj.pictureUrl+'">'
                        //     +'</a>'
                        //     +'</div>'
                        //     +'<h3><a href="qichezupin.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'+obj.title+'</a></h3>'
                        //     +'</li>';
                    }
                    $("#pic-list").html(str);
                    _this.total = data.count;
                    _this.formatListInfo();
                    _this.createPage();

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
            url: 'http://' + location.host + '/api/menu/getMenuById?id=16',
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
                        str = str + '<li class="'+(_this.id == obj.folderId?'active':'')+'"><a href="detail.html?id='+obj.folderId+'&ename="+obj.ename>'+obj.name+'</a></li>';
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

    createPage:function(){
        // var _this = this;
        // $(".tcdPageCode").createPage({
        //     pageCount:_this.total,
        //     current:_this.pageNum,
        //     backFn:function(p){
        //        debugger;
        //     }
        // });
    }
};
$(function(){
    listPicManager.init();
})
