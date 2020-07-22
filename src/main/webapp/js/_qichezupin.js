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
        }else{
            this.getAllArticleInDevice();
        }
        this.formatArticleInfo();
    },
    formatArticleInfo:function(){
        if(this.articleId != null ){
            $("#title-pic").html("汽车租赁详情");
            $("#isdetai").html("- 汽车租赁详情");
        }else{
            $("#isdetai").html("");
        }
    },

    formatListInfo:function(){
        $("#title-pic").html("汽车租赁列表");
    },
    getArticleById:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getArticleById?id='+this.articleId,
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    var str = _this.formatImg(data.content);
                    $("#pic-list").html('<li><div class="pic-title-content">'
                        // +'<div class="pic-title-img"><img src="http://'+location.host+'/'+data.pictureUrl+'"/></div>'
                        +'<div class="pic-title-title"><span>'+data.title+'</span><p>'+data.summary+'</p></div>'
                        +'</div><div class="pic-content">'+(str.replace(/src=\"/g,'src="http://'+location.host).replace(/href=\"/g,'href="http://'+location.host))+'</div></li>');

                    $('.jqzoom').jqzoom({
                        //（默认值）standard / reverse,原图用半透明图层遮盖
                        zoomType: 'reverse',
                        //是否在原图上显示镜头
                        lens:true,
                        // 预先加载大图片
                        preloadImages: false,
                        //放大镜是否总是显示存在
                        alwaysOn:false,
                        //放大窗口的尺寸
                        zoomWidth: 340,
                        zoomHeight: 440,
                        //放大窗口相对于原图的偏移量、位置
                        xOffset:10,
                        yOffset:0,
                        position:'left',
                        //默认值：true，是否显示加载提示Loading zoom
                        showPreload:true,
                        //默认 Loading zoom，自定义加载提示文本
                        preloadText: '加载中……',
                        //imageOpacity 默认值 0.2 透明度
                        title :'图片详情'
                    });

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

    formatImg:function(html){
        var reg = /(<img(?:(?!id|>).)*)(id[\=\"\'\s]+)?([^\"\'\s]*)([\"\']?)([^>]*>)/gi;
        var idx = 0;
        html = html.replace(reg, function($0, $1, $2, $3, $4, $5){
            var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
            var arr = $0.match(srcReg);
            return  '<a href="'+arr[1]+'" title="图片详情" class="jqzoom" style="display:inline-block">'+$0+'</a>';
        });
        return html;
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
                            +'<a href="qichezupin.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'
                            +'<img src="http://'+location.host+'/'+obj.pictureUrl+'">'
                            +'</a>'
                            +'</div>'
                            +'<h3><a style="display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 100%;" href="qichezupin.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'+obj.title+'</a></h3>'
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
                        str = str + '<li class="pic">'
                            +'<div class="img-box">'
                            +'<a href="qichezupin.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'
                            +'<img src="http://'+location.host+'/'+obj.pictureUrl+'">'
                            +'</a>'
                            +'</div>'
                            +'<h3><a style="display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 100%;" href="qichezupin.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'+obj.title+'</a></h3>'
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

    getDeviceList:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getMenuById?id=2',
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
                        str = str + '<li class="'+(_this.id == obj.folderId?'active':'')+'"><a href="qichezupin.html?id='+obj.folderId+'&ename="+obj.ename>'+obj.name+'</a></li>';
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
