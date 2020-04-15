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
            // this.getAllArticleInDevice();
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
                    // var str = _this.formatImg(data.content);
                    $("#pic-list").html('<li><div class="pic-title-content">'
                        // +'<div class="pic-title-img"><img src="http://'+location.host+'/'+data.pictureUrl+'"/></div>'
                        +'<div class="pic-title-title"><span>'+data.title+'</span><p>'+data.summary+'</p></div>'
                        +'</div><div class="pic-content">'+(data.content.replace(/src=\"/g,'src="http://'+location.host).replace(/href=\"/g,'href="http://'+location.host))+'</div></li>');

                    $("#pic-list img").click(function() {
                        _this.imgShow("#outerdiv", "#innerdiv", "#bigimg",  $(this));
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

    imgShow:function(outerdiv, innerdiv, bigimg, _this){
        var src = _this.attr("src");//获取当前点击的pimg元素中的src属性
        $(bigimg).attr("src", src);//设置#bigimg元素的src属性

        /*获取当前点击图片的真实大小，并显示弹出层及大图*/
        $("<img/>").attr("src", src).load(function () {
            var windowW = $(window).width();//获取当前窗口宽度
            var windowH = $(window).height();//获取当前窗口高度
            var realWidth = this.width;//获取图片真实宽度
            var realHeight = this.height;//获取图片真实高度
            var imgWidth, imgHeight;
            var scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

            if (realHeight > windowH * scale) {//判断图片高度
                imgHeight = windowH * scale;//如大于窗口高度，图片高度进行缩放
                imgWidth = imgHeight
                    / realHeight * realWidth;// 等比例缩放宽度
                if (imgWidth > windowW * scale) {//如宽度扔大于窗口宽度
                    imgWidth = windowW * scale;//再对宽度进行缩放
                }
            } else if (realWidth > windowW * scale) {//如图片高度合适，判断图片宽度
                imgWidth = windowW * scale;//如大于窗口宽度，图片宽度进行缩放
                imgHeight = imgWidth / realWidth * realHeight;// 等比例缩放高度
            } else {//如果图片真实高度和宽度都符合要求，高宽不变
                imgWidth = realWidth;
                imgHeight = realHeight;
            }
            $(bigimg).css("width", imgWidth);//以最终的宽度对图片缩放

            var w = (windowW - imgWidth) / 2;// 计算图片与窗口左边距
            var h = (windowH - imgHeight) / 2;// 计算图片与窗口上边距
            $(innerdiv).css({
                "top": h,
                "left": w
            });//设置#innerdiv的top和left属性
            $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg
        });

        $(outerdiv).click(function () {//再次点击淡出消失弹出层
            $(this).fadeOut("fast");
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
                        str = str + '<li class="pic">'
                            +'<div class="img-box">'
                            +'<a href="qichezupin.html?id='+obj.folderId+'&articleId='+obj.articleId+'">'
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
