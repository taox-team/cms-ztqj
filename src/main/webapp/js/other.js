/**
 * Created by Administrator on 2019/1/18.
 */
/**
 * Created by Administrator on 2019/1/18.
 */
var otherManager = {

    key: null,

    init:function(){
        this.key = getQueryString('key');
        this.getMenuList();
        var mapkey = {
            "gsjj": 'banner01.jpg',
            "zyhdwjs": 'banner02.jpg',
            "gsxqczlyw": 'banner03.jpg',
            "ywhf": 'banner04.jpg',
            "zjgc": 'banner05.jpg',
            "lxwm": 'banner01.jpg'
        }

        if(mapkey[this.key]){
            $("#slider-box").css("background-image","url(images/"+mapkey[this.key]+")");
        }else{
            $("#slider-box").css("background","url(images/banner01.jpg)");
        }
    },
    
    getMenuList:function(){
        var _this = this;
        $.ajax({
            url: 'http://' + location.host + '/api/menu/getRootList',
            method:'get',
            success:function(res){
                if(res.success){
                    var data = res.data;
                    for(let i=0;i<data.length;i++){
                        if(data[i].ename == _this.key){
                            $("#pic-list").addClass(_this.key);
                            $("#pic-list").html(data[i].content)
                            $("#other-title").html(data[i].name)
                        }
                    }
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
    otherManager.init();
})
