function briefBanner(params){
	var parent
	var self = this
	var view, cont_view, cont_bg
	this.index_temt = 0;
	this.list_data = [];
	this.params = params

	this.full_screen = true;
	this.input_file = false;
	this.temp2_time = 5000;

	this.create_input = false;

	this.init = function(){

		window.addEventListener('keydown', function(e){
			if (e.keyCode == 27) {
				self.exitScreen()
			}
		})

		parent = createElem('div', 'banner', document.body)
		parent.id = 'londonPromotion';

		this.banner = parent;

		var cont_start = createElem('div', 'cont_start', parent);
		var cont_btn = createElem('div', 'cont_btn', cont_start);

		if(this.create_input){

			var cont_input = createElem('div', 'cont_input', cont_start);
			var input = createElem('input', 'url',cont_input);
			input.type = 'text';
			input.setAttribute('value', window.xml_url);

			this.input_file = input
		} 

		var btn_start = createElem('div', 'btn_start', cont_btn);
		btn_start.innerHTML = 'start';

		btn_start.addEventListener('click', function(e){
			e.preventDefault();
			self.fullScreen();
			self.loadFile()
		});

		view = createElem('div', 'view', parent)
		cont_view = createElem('div', 'cont_view', view)
		var cont_bg = createElem('div', 'cont_bg', cont_view)


		var url = this.params && this.params.src ? this.params.src : './data/data.xml';
		// this.loadXML(url);

		this.createBanner()
	}

	this.loadFile = function(){
		var input = this.input_file;

		var url = input ? input.value : this.params.src;

		this.local_url = url

		this.updateXML()
	}
	this.updateXML = function(){
		this.banner.classList.add('load');
		this.loadXML(this.showBanner.bind(this))
	}

	this.showBanner = function(){
		this.banner.classList.remove('load');
		this.banner.classList.add('play');
		var data = this.list_data[this.index_temt];

		this.startBanner(data)
	};

	this.loadXML = function(callback){

		var self = this;

		var filename = this.local_url;

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var parser = new DOMParser();
				var text = self.parseXML(this.responseText);
				var xmlDoc = parser.parseFromString(text,"text/xml");
				self.runData(xmlDoc);
				callback();
			}
		};
		xhttp.open("GET", filename, true);
		xhttp.send();
	}
	this.parseXML = function(text){
		var elem = createElem('div')
		elem.innerHTML = text;
		var xml = elem.children[0];
		var data = xml.getElementsByTagName('data')[0];
		for(var i = 0; i < data.children.length; i++){
			// console.log(data.children[i])
			data.children[i] = this.checkChild(data.children[i]);
		}
		return elem.innerHTML

	}
	this.checkChild = function(elem){
		for(var i = 0; i < elem.children.length; i++){
			var text = elem.children[i].innerHTML;
			if(!elem.children[i].children || (elem.children[i].children && !elem.children[i].children.length)) {
				elem.children[i].innerHTML = escape(text);	
			} else {
				var child = elem.children[i];
				this.getChild(child, elem)
				
				i--
			}			
		}
		return elem.innerHTML
	}
	this.getChild = function(child, elem){
		while(child.children.length){
			if(!child.children[0].length){
				elem.appendChild(child.children[0]);	
			} else {
				this.getChild(child.children[0], elem)
			}			
		}
		elem.removeChild(child);
	}

	this.createBanner = function(){

		var cont_img = createElem('div', 'cont_img', cont_view)
		var img = createElem('img', '', cont_img)
		img.setAttribute('width', 'auto');
		img.setAttribute('height', '100%');
		img.setAttribute('align', 'top');

		var line_top = createElem('div', 'line_top', cont_view);
		var cont_line_top = createElem('div', 'cont_line_top', line_top);

		var cont_bg_top = createElem('div', 'bg_top', cont_line_top);
		var cont_text = createElem('div', 'cont_text', cont_line_top)
		var text_top = createElem('div', 'text_top', cont_text)


		var blue_line = createElem('div', 'blue_line', cont_view);
		var cont_blue_line = createElem('div', 'cont_blue_line', blue_line);
		var itm_center = createElem('div', 'circle', cont_view);
		var cont_star = createElem('div', 'cont_star', itm_center);

		this.arr_star = []

		this.radius = itm_center.offsetWidth;
		for(var i = 0;i<10;i++){
			this.createStar(cont_star,i)
		}

		// this.createBG()
		var cont_text = createElem('div','cont_text', itm_center);

		var center_text1 = createElem('div', 'text1', cont_text);
		center_text1.innerHTML = 'save';
		var center_price = createElem('div', 'price', cont_text);
		var line_bottom = createElem('div', 'line_bottom', cont_view);
		var cont_line_bottom = createElem('div', 'cont_line_bottom', line_bottom);
		var cont_text = createElem('div', 'cont_text', cont_line_bottom);
		var text_0 = createElem('div', 'text text_0', cont_text);
		text_0.innerHTML = 'Packed with features:';
		var text_1 = createElem('div', 'text text_1', cont_text);
		var text_2 = createElem('div', 'text text_2', cont_text);


		var desc = createElem('div', 'desc', cont_view);
		var cont_desc = createElem('div', 'text_desc', desc);
		var desc_model = createElem('div', 'model', desc);

		var cont_was = createElem('div', 'was', cont_blue_line);
		var name_was = createElem('div', 'name', cont_was);
		name_was.innerHTML = 'WAS';
		var list_was = createElem('div', 'list_was', cont_was);

		var text_now = createElem('div', 'text_now', cont_blue_line);
		text_now.innerHTML = 'now only';
		var text_price = createElem('div', 'text_price', cont_blue_line);

		var brand = createElem('div', 'info_brand', cont_blue_line);


		var quote = createElem('div', 'quote', cont_blue_line);
		quote.innerHTML = 'in store only - when they\'re gone they\'re gone!'


		this.elem_banner = {
			center: itm_center,
			desc: cont_desc,
			desc_model: desc_model,
			center_text1: center_text1,
			center_price: center_price,
			red_line_bottom: [
				text_1,text_2
			],
			line_bottom: line_bottom,
			text_now: text_now,

			red_line_top: line_top,
			text_top: text_top,
			blue_line_top: cont_blue_line,
			text_price: text_price,
			brand: brand,
			cont_img: cont_img,
			img: img,
			cont_was: cont_was,
			list_was: list_was,
			quote: quote
		}
	};

	this.createStar = function(par, id){
		var star = createElem('div', 'star star_'+id, par);
		var coor = this.getCoorStar()

		star.style.left = Math.floor(coor.start.x) + 'px';
		star.style.top = Math.floor(coor.start.y) + 'px';


		var anim = CSSAnimations.create('star_'+id, {
			'0%': {
				'left': coor.start.x + 'px',
				'top': coor.start.y + 'px'
			},
			'100%': {
				'left': coor.finish.x + 'px',
				'top': coor.finish.y + 'px'
			}
		});

		var str =  'star_'+id+',star_alpha,star_rotate';
		star.style.animationName = str
		var d = 2*Math.random();
		star.style.animationDelay = d+'s';

		this.arr_star.push(star);
	}
	this.createBG = function(){
		var size = window.screen;

		var s = 1940/8000;
		var s_1 = size.height*0.6;
		var	s_2 = s_1/782;
		var w =  1940

		var m_0 = (965)*s_2;
		var m_1 = (8000)*s_2 - m_0;
		// console.log(m_0, m_1)

		var anim = CSSAnimations.create('anim_bg', {
			'0%': {
				'margin-left': '0px'//(-m_0)+'px',
			},
			'100%': {
				'margin-left': (-m_1)+'px'
			}
		});

	}

	function createKeyframes(coor, name){
		var animation = false,
			animationstring = 'animation',
			keyframeprefix = '',
			domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
			pfx  = '',
			elm = document.createElement('div');

		if( elm.style.animationName !== undefined ) { animation = true; }    

		if( animation === false ) {
			for( var i = 0; i < domPrefixes.length; i++ ) {
				if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
					pfx = domPrefixes[ i ];
					animationstring = pfx + 'Animation';
					keyframeprefix = '-' + pfx.toLowerCase() + '-';
					animation = true;
					break;
				}
			}
		}
		var keyframes = '@' + keyframeprefix + 'keyframes '+name+' { '+
            '0% { left: ' +  coor.start.x + 'px; top: ' + coor.start.y + 'px;}' + //+ keyframeprefix + 'transform:rotate( 0deg ) }'+
            '100% { left: ' + coor.finish.x + 'px; top: ' + coor.finish.y + 'px;}'+
        '}';

		if( document.styleSheets && document.styleSheets.length ) {
			document.styleSheets[0].insertRule( keyframes, 0 );
		} else {
			var s = document.createElement( 'style' );
			s.innerHTML = keyframes;
			document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
		}
	}
	this.getCoorStar = function(){
		var angle = Math.random()*Math.PI;
		var r = this.radius/2;
		var dirang = 1;

		var x_1 = Math.cos(angle)*(r*Math.random());
		var y_1 = Math.sin(angle)*(r*Math.random());
		

		var dirvx = Math.cos(dirang)
		var dirvy = Math.sin(dirang)
		var dist = Math.random()*((r*2)*0.7)

		var npx = x_1 + dirvx*dist;
		var npy = y_1 - dirvy*dist;


		return {
			start: {
				x: Math.floor(x_1),
				y: Math.floor(y_1)
			},
			finish: {
				x: Math.floor(npx),
				y: Math.floor(npy)
			}
		}
	}
	this.switchData = function(){


		if(this.timeoutSwitch){
			clearTimeout(this.timeoutSwitch)
		}

		if(this.index_temt+1 < this.list_data.length){
			var next_index = (this.index_temt+1)%this.list_data.length;

			var data = this.list_data[next_index];
			this.index_temt = next_index;

			this.startBanner(data)
		} else {
			this.index_temt = 0
			this.updateXML()
		}
	}

	this.runData = function(data){
		var xml = data.children[0];
		this.index_temt = 0

		this.json_xml = {};
		this.list_data = []
		if(this.timeoutSwitch){
			clearTimeout(this.timeoutSwitch)
		}
		if(this.timeout_text){
			clearTimeout(this.timeout_text)
		}

		for(var i = 0; i < xml.children.length; i++){
			var child = xml.children[i]
			var key = child.tagName.toLocaleLowerCase()
			var elem
			if(!child.children.length) {
				elem = unescape(child.innerHTML)
			} else {
				elem = child.children
			}
			this.json_xml[key] = elem 
		}

		if(this.json_xml.data && this.json_xml.data.length) {
			var itm_data = this.json_xml.data
			for(var i = 0; i < itm_data.length; i++){
				var itm = itm_data[i];
				var parse_data = {};
				if(!itm.children.length) continue
				for(var j = 0; j < itm.children.length; j++){
					var key = itm.children[j].tagName.toLocaleLowerCase();
					var child = itm.children[j]
					if(key.indexOf('feature')>=0){
						key = 'feature';

						// var index = +itm.children[j].tagName.toLocaleLowerCase().replace(key, '')

						if(!parse_data[key]) parse_data[key] = [];
						parse_data[key].push(unescape(child.innerHTML))
					} else if(key.indexOf('wasprice') >= 0){
						key = 'wasprice';

						// var index = +itm.children[j].tagName.toLocaleLowerCase().replace(key, '')

						if(!parse_data[key]) parse_data[key] = [];
						parse_data[key].push(unescape(child.innerHTML))
					} else {
						parse_data[key] = unescape(child.innerHTML)
					}
				}

				this.list_data.push(parse_data)
			}
		}
		delete this.json_xml.data

		this.sortWas();

		this.json_xml.data = this.list_data;
	}

	this.sortWas = function(){
		var data = this.list_data

		for(var d = 0; d < data.length; d++){
			var itm = data[d];

			if(itm.wasprice && itm.wasprice.length){
				if(itm.wasprice.length > 1 ){
					itm.wasprice = itm.wasprice.sort(function(old, next){
						if(+old > +next ){
							return -1 
						} else if(+old < +next ){
							return 1 
						} else {
							return 0
						}
					});
				}
				if(!itm.saving) {
					var num = (+itm.wasprice[0]) - (+itm.retail)
					itm.saving = num
				}
			}

		}

		return data
	}
	this.getPrice = function(srt){
		var num = +srt;
		var price = Math.floor(num);
		var diff = num%price;

		return diff > 0 ? num.toFixed(2) : num;
	}
	this.remPrevLen = function(){
		var elem = this.elem_banner.center_price;

		for(var i = 0; i < elem.classList.length; i++){
			if(elem.classList[i].indexOf('len_')>=0){
				elem.classList.remove(elem.classList[i])
			}
		}
	}
	this.chechTemp2 = function(data){
		return data.devicetypetheme && data.devicetypetheme.toLowerCase() == 'electrical'
	}

	this.startBanner = function(data){

		var elems = this.elem_banner
		this.clearText();
		elems.text_price.classList.remove('hide');
		elems.center.classList.remove('hide');
		elems.desc.classList.remove('hide');
		elems.red_line_top.classList.remove('hide');
		

		//if(data.classid == 2 || data.brand.toLowerCase() == 'sony'){
		if(this.chechTemp2(data)){
			this.temp2 = true
		} else {
			this.temp2 = false
		}


		if(this.temp2){
			this.banner.classList.add('temp2');
		} else {
			this.banner.classList.remove('temp2');
		}

		this.remPrevLen()

		var prev_index = this.index_temt-1;
		var class_name = 'banner_';

		if(prev_index == -1){
			prev_index = (this.list_data.length-1)
		}

		this.banner.classList.remove(class_name + prev_index)
		this.banner.classList.add(class_name+this.index_temt)


		clearTimeout(this.timeoutClearText);
		if(this.timeoutSwitch){
			clearTimeout(this.timeoutSwitch)
		}
		elems.cont_img.classList.remove('show');
		elems.img.src = '';

		var saving = +data.saving;

		var retail_diff = this.getPrice(data.retail); 

		if(retail_diff >= 0){
			elems.text_price.innerHTML = data.currencysymbol + (retail_diff)
		} else {
			elems.text_price.classList.add('hide');
		}

		
		var text = '';

		if(data.brand) {
			text += data.brand
		}
		if(data.brand && data.model){
			text += ' - ';
		}
		if(data.model){
			text += data.model
			elems.desc_model.innerHTML = 'Model: '+data.model
		}

		elems.brand.innerHTML = text
		var len = 0

		if(saving >= 0){
			var text = ''+this.getPrice(saving);//Math.ceil(saving)
			len = text.indexOf('.') >= 0 ?  text.length-1 : text.length;
			elems.center_price.innerHTML = data.currencysymbol + text
			elems.center_price.classList.add('len_'+len)
		} else {
			elems.center.classList.add('hide');
		}
		
		if(data.description){
			elems.desc.innerHTML = data.description;
		} else {
			elems.desc.classList.add('hide');
		}
		

		if((!this.temp2 && data.strapline1) || (this.temp2 && data.brand)) {
			elems.text_top.innerHTML = !this.temp2 ? data.strapline1 : data.brand;
		} else {
			elems.red_line_top.classList.add('hide');
		}

		if(!this.temp2){
			elems.blue_line_top.insertBefore(elems.cont_was, elems.text_now)
		} else {
			elems.blue_line_top.insertBefore(elems.cont_was, elems.quote)
		}

		if(!data.wasprice ||(data.wasprice && !data.wasprice.length)){
			this.removeWasprice(data)
		} else {
			this.addWasprice(data)
		}


		
		var diff = 1800;
		this.arr_text = data['feature'];

		if(!this.temp2){
			var arr_elem = self.elem_banner.red_line_bottom;
			arr_elem[0].classList.remove('show');
			this.timeoutClearText = setTimeout(function(){
				self.animationText(0)
			}, diff);
			console.log('diff',diff)
		} else {
			this.elem_banner.line_bottom.classList.add('hide')			
		}


		if(this.timeout_text){
			clearTimeout(this.timeout_text);
		}


		var img = new Image();
		if(!data.productimageurl && !data.codegraphicfilename){
			if(this.temp2){
				setTimeout(function(){
					self.nextSlider();
				}, this.temp2_time)
			}
		} else {
			var arr_elem = self.elem_banner.red_line_bottom;
			arr_elem[0].classList.add('show');
			img.src = data.codegraphicfilename ? data.codegraphicfilename :  data.productimageurl;
			img.onload = function(){
				self.elem_banner.img.src = this.src; //.style.backgroundImage = 'url('+this.src+')';
				self.elem_banner.cont_img.classList.add('show');
				var self_1 = self;

				
				if(self.temp2){
					self_1.createText()
					setTimeout(function(){
						self_1.nextSlider();
					}, self.temp2_time + (self.arr_text.length*500))
				}
			}
		}


		this.banner.classList.add('show');
	}

	this.createText = function(){
		var index = 0;

		var arr_elem = this.elem_banner.red_line_bottom;
		// arr_elem[index].classList.add('show');
		this.elem_banner.line_bottom.classList.remove('hide')
		var arr = [];

		for(var i = 0; i < this.arr_text.length; i++){
			var elem = createElem('div', 'feature hide', arr_elem[index])
			elem.style.transitionDelay = (0.5*i) + 's' ;
			elem.innerHTML = this.arr_text[i];
			arr.push(elem)
			
		}
		var self = this;

		(function(arr){
			setTimeout(function(){
				self.remClass(arr)
			},800)
		})(arr);

	}
	this.remClass = function(arr){
		for(var i = 0; i < arr.length; i++){
			arr[i].classList.remove('hide')
		}
	}

	this.clearText = function(){
		this.elem_banner.red_line_bottom[0].innerHTML = '';
		this.elem_banner.red_line_bottom[1].innerHTML = '';

		this.elem_banner.red_line_bottom[0].classList.remove('show');
		this.elem_banner.red_line_bottom[1].classList.remove('show');

		this.elem_banner.red_line_bottom[0].classList.remove('hide');
		this.elem_banner.red_line_bottom[1].classList.remove('hide');
	}

	this.addWasprice = function(data){
		this.banner.classList.remove('no_wasprice');
		var list_was = this.elem_banner.list_was
		while(list_was.children.length){
			list_was.removeChild(list_was.children[0])
		}

		for(var i = 0; i < data.wasprice.length; i++){
			var elem = createElem('div', 'itm_waspice', list_was);
			var num = this.getPrice(data.wasprice[i]);
			elem.innerHTML = data.currencysymbol + num

			var size = {
				w: elem.offsetWidth,
				h: elem.offsetHeight-5
			}
			var angle = -size.h/size.w;
			var deg = (Math.sin(angle)/Math.PI)*180;
			// console.log()
			var line = createElem('div', 'line', elem)
			line.style.transform = 'rotate('+Math.floor(deg)+'deg)';

		}
	}
	this.removeWasprice = function(){
		this.banner.classList.add('no_wasprice');
		var list_was = this.elem_banner.list_was;
		while(list_was.children.length){
			list_was.removeChild(list_was.children[0])
		}
	}

	this.animationText = function(index){
		// console.log('animationText',index)
		var arr_elem = this.elem_banner.red_line_bottom;
		var arr_text = this.arr_text
		var prev_itm = Math.abs((index-1)%2);
		var index_itm = index%2;

		var next_index = (index+1)%this.arr_text.length

		if((prev_itm) >= 0){
			arr_elem[prev_itm].classList.remove('show');
			arr_elem[prev_itm].classList.add('hide');
		}

		if(index < this.arr_text.length){
			arr_elem[index_itm].innerHTML = this.arr_text[index];
			arr_elem[index_itm].classList.remove('hide');
			arr_elem[index_itm].classList.add('show');
		} else {
			if(this.full_screen){
				this.nextSlider()
			}
		}

		if(index <= this.arr_text.length){
			var next_index = (index+1)
			this.timeout_text = setTimeout(self.animationText.bind(self, next_index),2000);	
		}
	}

	this.nextSlider = function(){
		var self = this;
		this.banner.classList.remove('show')
		this.timeoutSwitch = setTimeout(function(){
			self.switchData();
		}, 2000);
	}

	function createElem(tag, class_name, par){
		var elem = document.createElement(tag);
		if(class_name){
			elem.className = class_name
		}
		if(par){
			par.appendChild(elem)
		}

		return elem
	}

	this.fullScreen = function() {
		var element = this.banner; //document.documentElement;//
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {
			document.documentElement.msRequestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	}

	this.exitScreen = function() {
		var element = this.banner; //document.documentElement;//
		if (element.exitFullscreen) {
			element.exitFullscreen();
		} else if (element.webkitExitFullscreen) {
			element.webkitExitFullscreen();
		} else if (element.mozCancelFullScreen) {
			element.mozCancelFullScreen();
		} else if (element.msExitFullscreen) {
			element.msExitFullscreen();
		}
	}

	this.init()
}