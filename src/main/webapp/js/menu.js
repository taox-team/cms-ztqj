var menuManager = {
    init:function(){
        this.getMenuLis();


    },

    getHref:function(ename){
        if(ename == 'gssbsl'){//设备实力
            return 'list-pic.html';
        }
        if(ename == 'gonggao'){//公司公告
            return 'detail.html';
        }
        if(ename == 'rysl'){//人员实力
            return 'people.html';
        }
        if(ename == 'gsxqczlyw'){//汽车租聘
            return 'qichezupin.html';
        }

        if(ename == 'zjgc'){//在建工程
            return 'zjgc-list.html';
        }

        if(ename == 'whry'){//文化荣誉
            return 'whry.html';
        }

        return 'other.html?key='+ename;
    },

    getMenuLis:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getRootList',
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    var str = '<li class="'+(location.href.indexOf("index.html")>-1?"active":"")+'"><a href="index.html">首页</a></li>';
                    for(var i=0;i<data.length;i++){
                        var obj = data[i];
                        var href = _this.getHref(obj.ename);
                        str = str + '<li class="'+(location.href.indexOf(href)>-1?"active":"")+'"><a href="'+href+'">'+obj.name+'</a></li>';
                    }
                    $("#menu-box-ul").html(str);

                    _this.setFootMessage(data);
                }else{
                    alert("请求失败，请刷新重试")
                }
            },
            error:function(err){
                alert("请求失败，请刷新重试")
            }
        });
    },

    setFootMessage:function(data){
        for(var i=0;i<data.length;i++){
            if(data[i].ename == 'lxwm'){
                $(".bottom-content_left-box-btm").html(data[i].content);
            }
        }
    }


};
menuManager.init();

$(function(){
    $(".logo img").click(function(){
        location.href = 'index.html'
    });
});