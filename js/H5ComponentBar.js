

/**
 * Created by asus8 on 2016/10/28.散点图 组件对象
 */
var H5ComponentBar=function(name,cfg){
    var component=new H5ComponentBase(name, cfg);
    $.each(cfg.data,function(idx,item){
        console.log(item);
        var line=$('<div class="line">');
        var name=$('<div class="name">');
        var rate=$('<div class="rate">');
        var per=$('<div class="per">');

        var bgHtml=$('<div class="bg">');  /*1*/
        rate.append(bgHtml);  /**2**/

        var width=item[1]*100+ '%';

        var bgColor='';
        if(item[2]){
            bgColor='background-color: ' + item[2];
            bgHtml.attr("style",bgColor);
        }

        //rate.html('<div class="bg">');
        bgHtml.css({width:width});  /**3*/

        name.text(item[0]);
        per.text(width);
        line.append(name).append(rate).append(per);
        component.append(line);

    })

    return  component;
}
