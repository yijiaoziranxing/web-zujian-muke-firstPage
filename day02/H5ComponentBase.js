/**
 * Created by asus8 on 2016/10/28.基本图文组件对象
 */
var H5ComponentBase=function(name,cfg){
    var cfg= cfg||{}; //如果没有传参数就保持空对象

    var id=('h5_c'+Math.random()).replace('.','_');
    var cls=' h5_component_'+cfg.type ;
    var component =$('<div class="h5_component '+cls+' h5_component_name_'+name+ ' "id="'+id+' " >');//dom元素
    //component.appendTo('body')  不用这么做
    cfg.text&&component.text(cfg.text);//如果cfg里有text参数就component.text(cfg.text)
    cfg.width&&component.width(cfg.width/2);
    cfg.height&&component.height(cfg.height/2);

    cfg.css&&component.css(cfg.css);
    cfg.bg&&component.css('backgroundImage','url('+cfg.bg+')');
    if(cfg.center===true){
        component.css({
            marginLeft:(cfg.width/4*-1)+'px',
            left:"50%"
        })
    }
    component.on('onLoad',function(){
        component.addClass(cls+'_load').removeClass(cls+'_leave');
        cfg.animateIn&&component.animate( cfg.animateIn);
        return false;
    })
    component.on('onLeave',function(){
        component.addClass(cls+'_leave').removeClass(cls+'_load');
        cfg.animateOut&&component.animate( cfg.animateOut);

                return false;
    })

    return component;

}