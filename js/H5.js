/**
 * 内容管理对象
 */
var H5=function(){
    this.id=('h5_'+Math.random()).replace('.','_');
    this.el=$('<div class="h5" id=" '+this.id+' "> ').hide();
    this.page=[];
    $('body').append(this.el);
      /* 新增一个页
      *
      * */
    this.addPage=function(name,text){
        var page=$('<div class="h5_page section">');

        if(name !=undefined){
            page.addClass('h5_page_'+name);
        }
        if(text !=undefined){
            page.text(text);
        }
        this.el.append(page);
        this.page.push(page);

        return this;//链式调用需要
    };
    /*新增一个组件*/
    this.addComponent=function(name,cfg){
        var cfg=cfg ||{};  //cfg没传就cfg={}
        cfg= $.extend({   //cfg没传或者传的cfg中没type参数.就默认extend一个type:base
            type:'base'
        },cfg);

        var component;  //定义个变量 存储组件元素
        var page=this.page.slice(-1)[0];//！！写法是重点。拿到标准jquery page dom对象

        switch(cfg.type){
            case 'base':
                component=new  H5ComponentBase(name,cfg);
                break;
            default:
        }
        page.append(component);
        return this;
    }
    /***h5对象呈现********/
    this.loader=function(firstPage){
        this.el.fullpage({
            onLeave:function(index,nextIndex,direction){
                //$(this).find('.h5_component').trigger('onLeave')//触发onleave方法
                $('.h5').find('.h5_component').trigger('onLeave')//触发onleave方法
            },
            afterLoad:function(anchorLink,index){
                //$(this).find('.h5_component').trigger('onLoad')
                $('.h5').find('.h5_component').trigger('onLoad')
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();

        return this;
    }
    this.moveToPage=function(firstPage){
        if(firstPage){
            $.fn.fullpage.moveTo(firstPage);
        }
        return this;
    }

}