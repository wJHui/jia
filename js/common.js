function goodsNumber(obj){
	var wrap = $(obj), soultValut = 0;
	var o = {
		inputValue : function (value, step){
			var newV = parseInt(value) + step,
			judgeValue = this.judge(newV);

			if(!!judgeValue.mes) alert(judgeValue.mes);
			return judgeValue.num;

		},
		judge : function (value){
			if(value < 1){
				return {num : 1, mes : '商品数量不能小于1件'};

			}else if(value > 99){
				return {num : 99, mes : '商品数量不能大于100件'};
			}

			return {num : value, mes : ''};
		},
		keyup : function (value){
			var replaceVal = value.replace(/[^0-9-]+/,''),
			judgeValue = this.judge(parseInt(replaceVal));

			if(!!judgeValue.mes) alert(judgeValue.mes);
			return judgeValue.num;
		}
	};

	wrap.each(function (){
		var _self = $(this),
		reduce = _self.find('.reduce'),
		plus = _self.find('.plus');

		_self.find('.spInput').get(0).addEventListener('blur', function (){
			var v = this.value;
			this.value = o.keyup(v);
			
		});

		reduce.get(0).addEventListener('click', function (){
			var	input = _self.find('.spInput'),
			inputValue = input.val();

			input.val(o.inputValue(inputValue, -1));

		}, false);

		plus.get(0).addEventListener('click', function (){
			var	input = _self.find('.spInput'),
			inputValue = input.val();

			input.val(o.inputValue(inputValue, 1));
		}, false);
	});
}

// 判断滚动条上下
function scrollDirect(fn) {  
	var beforeScrollTop = $(document).scrollTop();  
	fn = fn || function () {};  

	window.addEventListener("scroll", function (event) {  
		event = event || window.event;  

		var afterScrollTop = $(document).scrollTop();  
		delta = afterScrollTop - beforeScrollTop;  
		beforeScrollTop = afterScrollTop;  


		var scrollTop = $(this).scrollTop();  
		var scrollHeight = $(document).height();  
		var windowHeight = $(this).height();

       /* if (scrollTop + windowHeight > scrollHeight - 10) {  //滚动到底部执行事件  
            fn('up');  
            	return;  
        }  */
        if (afterScrollTop < 40 || afterScrollTop > $(document.body).height - 10) {  
            fn('up');  
        } else {  
            if (Math.abs(delta) < 10) return false;  
            
            fn(delta > 0 ? "down" : "up");  
        }  
    }, false);  
};

// 按钮切换
function tab(wrap, on, fn){
	fn = fn || function (){};
	var wrap = $(wrap),
		sub = wrap.children();
		
	sub.each(function (){
		var _self = $(this),
			_index = _self.index();
		_self.bind('click', function (){
			if(!_self.hasClass(on)){
				_self.addClass(on).siblings().removeClass(on);
				fn(_index, _self);
			}
		});
	});
}  

// 计算图片比例

function setImg(width, heiht, newValue){

}


function viewWidth(){
	var doc = $(document);
	return doc.width();
}

$.fn.tab = function (settings){
	var _self = $(this),
		options = {
			slider : '',
			effect : Back,
			children : '' ,
			curClass : 'cur',
			time : .4,
			callback : function (){} 
		},
		tlm = new TimelineMax();

	jQuery.extend(options, settings);


	var children = _self.find(options.children),
		childrenLength = children.length;

	children.each(function (index){
		var _sub = $(this),
			_index = index;

		_sub.get(0).addEventListener('click', function (){
			if(!_sub.hasClass('cur')){
				var width = _self.width(),
					slideStep = width / childrenLength * _index;

				_sub.addClass(options.curClass).siblings(options.children).removeClass(options.curClass);

				tlm.to($(options.slider), options.time, {x : slideStep, ease : options.effect.easeOut});

				options.callback(_sub);
			}
		}, false);
		
	})


}