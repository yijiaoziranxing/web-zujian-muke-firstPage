/*折线图组件对象*/
var H5ComponentPolyline = function(name,cfg){ 
	var component = new H5ComponentBase(name,cfg);
	
	var w = cfg.width;
	var h = cfg.height;
//创建画布--背景层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);
	
	//水平线
	var step = 10;
	ctx.beginPath();  //我要开始画画了。
	ctx.lineWidth = 1;  //画笔宽度是1
	ctx.strokeStyle = "#f00";  //画笔颜色

	window.ctx = ctx;
	
	for(var i=0;i<step+1;i++){ 
		var y = (h/step)*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}

	//垂直
	step = cfg.data.length+1;
	var text_w = w/step >> 0;
	for(var i=0;i<step+1;i++){ 
		var x = (w/step)*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);

		if(cfg.data[i]){ 
			var text = $('<div class="text">');
			text.text(cfg.data[i][0]);
			text.css('width',text_w/2).css('left',x/2+text_w/4);
			component.append(text);
		}
	}

	ctx.stroke(); //收笔

	//画布--数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	function draw(per){
		//清空画布
		ctx.clearRect(0,0,w,h);
		//折线
		ctx.beginPath();
		ctx.lineWidth=3;
		ctx.strokeStyle='#ff8788';

		var x = 0;
		var y = 0;
		//画点
		var row_w = w/(cfg.data.length+1);

		for(var i in cfg.data){ 
			var item = cfg.data[i];
			x= row_w*i + row_w;
			y = h-(item[1]*h*per);
			ctx.moveTo(x,y);
			ctx.arc(x,y,5,0,2*Math.PI);
		}
		//连线
		ctx.moveTo(row_w,h-(cfg.data[0][1]*h*per));
		for(var i in cfg.data){
			var item = cfg.data[i]; 
			x= row_w*i + row_w;
			y = h-(item[1]*h*per);
			ctx.lineTo(x,y);
		}
		ctx.stroke();
		//绘制阴影
		ctx.lineTo(x,h);
		ctx.lineTo(row_w,h);
		ctx.fillStyle = 'rgba(255,136,120,0.2)';
		ctx.fill();

		//显示数据
		for(var i in cfg.data){ 
			var item = cfg.data[i];
			x= row_w*i + row_w;
			y = h-(item[1]*h*per);
			ctx.fillStyle = item[2]?item[2]:'#595959';
			ctx.fillText((100*(item[1])>>0)+'%',x-10,y-10);
		}
		
	}

	component.on('onLoad',function(){ 
		//折线图入场动画
		var s = 0;
		for(var i=0;i<100;i++){ 
			setTimeout(function(){ 
				s += 0.01;
				draw(s);
			},i*10+500);
		}
	});
	component.on('onLeave',function(){ 
		//折线图出场动画
		var s = 1;
		for(var i=0;i<100;i++){ 
			setTimeout(function(){ 
				s -= 0.01;
				draw(s);
			},i*10);
		}
	});
	return component;
}