/**
 * Created by asus8 on 2016/10/28.散点图 组件对象
 */
var H5ComponentPoint=function(name,cfg){
    var component=new H5ComponentBase(name, cfg);
    //component.text("2222")
    var base=cfg.data[0][1]; //以第一个数据的比例 大小的 100%
    //输出每个point
    $.each(cfg.data,function( idx,item){//遍历cfg.data
       var point=$('<div class="point point_" '+idx+'>');
        //point.text(item[0]+'-'+item[1])
        var name=$('<div class="name">'+item[0]+'</div>');
        var rate=$('<div class="per">'+item[1]*100+'%</div>');
        name.append(rate);
        point.append(name);

        // 第一个数 item[1]/base =0.4/0.4=1=100%；// 第二个数 item[1]/base =0.2/0.4=1=50%；// 第三个数 item[1]/base =0.2/0.4=1=50%；
        var per=(item[1]/base)*100+'%';
        //console.log(per)
        point.width(per).height(per);
        if(item[2]){
            point.css('background-color',item[2])
        }
        //item[2]&&point.css('background-color',item[2]);
        if(item[3]!==undefined&&item[4]!==undefined){
            point.css('left',item[3]).css('top',item[4]);
            //point.css({'left':item[3],'top':item[4]});
        }
        component.append(point);
    });
    return  component;
}