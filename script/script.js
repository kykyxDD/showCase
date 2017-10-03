function briefBanner(params){
	var parent
	var self = this
	var view, cont_view
	this.index_temt = 0;
	this.list_data = [];
	this.params = params

	this.full_screen = true//false
	this.init = function(){

		window.addEventListener('keydown', function(e){
			if (e.keyCode == 27) {
				self.exitScreen()
			}
		})

		parent = createElem('div', 'banner', document.body)
		parent.id = 'londonPromotion'
		// console.log(parent)

		this.banner = parent


		var cont_start = createElem('div', 'cont_start', parent);
		var cont_btn = createElem('div', 'cont_btn', cont_start);

		var btn_start = createElem('div', 'btn_start', cont_btn);
		btn_start.innerHTML = 'start';

		btn_start.addEventListener('click', function(){

			var data = self.list_data[self.index_temt]//self.json_xml.data[self.index_temt].data;
			self.fullScreen()
			self.banner.classList.add('play');
			self.startBanner(data)
		});

		view = createElem('div', 'view', parent)
		cont_view = createElem('div', 'cont_view', view)


		var url = this.params && this.params.src ? this.params.src : './data/data.xml';
		this.loadXML(url);
	}

	this.loadXML = function(filename){

		// try {
		//     var xmlhttp = new XMLHttpRequest();
		//     xmlhttp.open("GET", xmlfile, false);
		// } catch (Exception) {
		//     var ie = (typeof window.ActiveXObject != 'undefined');

		//     if (ie){
		//         xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		//         xmlDoc.async = false;
		//         while(xmlDoc.readyState != 4) {};
		//         xmlDoc.load(xmlfile);
		//         readXML();
		//         xmlloaded = true;
		//     } else {
		//         xmlDoc = document.implementation.createDocument("", "", null);
		//         xmlDoc.onload = readXML;
		//         xmlDoc.load(xmlfile);
		//         xmlloaded = true;
		//     }
		// }

		// if (!xmlloaded){
		//     xmlhttp.setRequestHeader('Content-Type', 'text/xml')
		//     xmlhttp.send("");
		//     xmlDoc = xmlhttp.responseXML;
		//     readXML();
		//     xmlloaded = true;
		// }
		var self = this;

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				self.createBanner()
				self.runData(this.responseXML)
			}
		};
		xhttp.open("GET", filename, true);
		xhttp.send();
	}

	this.createBanner = function(){

		var cont_img = createElem('div', 'cont_img', cont_view)
		var img = createElem('img', '', cont_img)
		img.setAttribute('width', 'auto');
		img.setAttribute('height', '100%');

		
		var line_top = createElem('div', 'line_top', cont_view);
		var cont_line_top = createElem('div', 'cont_line_top', line_top);

		var cont_bg_top = createElem('div', 'bg_top', cont_line_top);
		var cont_text = createElem('div', 'cont_text', cont_line_top)
		var text_top = createElem('div', 'text_top', cont_text)


		var blue_line = createElem('div', 'blue_line', cont_view);
		var itm_center = createElem('div', 'circle', cont_view);
		var cont_star = createElem('div', 'cont_star', itm_center);

		this.arr_star = []

		this.radius = itm_center.offsetWidth;
		// console.log('radius',this.radius)
		for(var i = 0;i<10;i++){
			this.createStar(cont_star,i)

			//star.style.left = Math.floor(Math.random()*50+50) + "px";
		}
		var cont_text = createElem('div','cont_text', itm_center)

		var center_text1 = createElem('div', 'text1', cont_text)
		center_text1.innerHTML = 'save';
		var center_price = createElem('div', 'price', cont_text)
		var line_bottom = createElem('div', 'line_bottom', cont_view);
		var cont_line_bottom = createElem('div', 'cont_line_bottom', line_bottom);
		var cont_text = createElem('div', 'cont_text', cont_line_bottom);
		var text_1 = createElem('div', 'text text_1', cont_text)
		var text_2 = createElem('div', 'text text_2', cont_text)


		var desc = createElem('div', 'desc', cont_view)


		var cont_was = createElem('div', 'was', blue_line);
		var name_was = createElem('div', 'name', cont_was);
		name_was.innerHTML = 'WAS';
		var list_was = createElem('div', 'list_was', cont_was);

		var text_now = createElem('div', 'text_now', blue_line);
		text_now.innerHTML = 'now only';
		var text_price = createElem('div', 'text_price', blue_line);

		var brand = createElem('div', 'info_brand', blue_line)


		this.elem_banner = {
			center: itm_center,
			desc: desc,
			center_text1: center_text1,
			center_price: center_price,
			red_line_bottom: [
				text_1,text_2
			],
			text_now: text_now,
			red_line_top: text_top,
			blue_line_top: blue_line,
			text_price: text_price,
			brand: brand,
			cont_img: cont_img,
			img: img,
			list_was: list_was
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
			},// { 'background-color': 'red' },
			'100%': {
				'left': coor.finish.x + 'px',
				'top': coor.finish.y + 'px'
			}
		});
		// console.log(anim)

		var str =  'star_'+id+',star_alpha,star_rotate';
		// star.style.animationName = 'star_'+id
		star.style.animationName = str
		var d = 2*Math.random();
		star.style.animationDelay = d+'s'; //1,5s

		this.arr_star.push(star);
	}
	this.getCoorStar = function(){
		var angle = Math.random()*Math.PI;
		// console.log(angle)
		var r = this.radius/2;
		var dirang = 1;//Math.random()*(Math.PI)//0.2;

		var x_1 = Math.cos(angle)*(r*Math.random());
		var y_1 = Math.sin(angle)*(r*Math.random());
		

		var dirvx = Math.cos(dirang)
		var dirvy = Math.sin(dirang)
		var dist = Math.random()*((r*2)*0.7)

		var npx = x_1 + dirvx*dist;
		var npy = y_1 - dirvy*dist;
		// console.log('coor x:', x_1, npx)
		// console.log('coor y:', y_1, npy)

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
		var next_index = (this.index_temt+1)%this.json_xml.data.length;

		var data = this.list_data[next_index];
		this.index_temt = next_index;

		this.startBanner(data)
	}

	this.runData = function(data){
		var xml = data.children[0]
		// console.log(xml)

		this.json_xml = {};

		for(var i = 0; i < xml.children.length; i++){
			var child = xml.children[i]
			// console.log('child', child)
			var key = child.tagName.toLocaleLowerCase()
			var elem
			if(!child.children.length) {
				elem = child.innerHTML
			} else {
				elem = child.children
			}
			this.json_xml[key] = elem 
		}

		if(this.json_xml.data && this.json_xml.data.length) {
			var itm_data = this.json_xml.data
			for(var i = 0; i < itm_data.length; i++){
				var itm = itm_data[i]
				// console.log(itm)
				var parse_data = {};
				if(!itm.children.length) continue
				for(var j = 0; j < itm.children.length; j++){
					var key = itm.children[j].tagName.toLocaleLowerCase();
					if(key.indexOf('feature')>=0){
						key = 'feature';

						var index = +itm.children[j].tagName.toLocaleLowerCase().replace(key, '')

						if(!parse_data[key]) parse_data[key] = [];
						parse_data[key][index-1] = itm.children[j].innerHTML
					} else if(key.indexOf('wasprice') >= 0){
						key = 'wasprice';

						var index = +itm.children[j].tagName.toLocaleLowerCase().replace(key, '')

						if(!parse_data[key]) parse_data[key] = [];
						parse_data[key][index-1] = itm.children[j].innerHTML
					} else {
						parse_data[key] = itm.children[j].innerHTML	
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

			if(itm.wasprice && itm.wasprice.length > 1 ){
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
		}

		return data
	}
	this.getPrice = function(srt){
		var num = +srt;
		var price = Math.floor(num);
		var diff = num%price;

		return diff > 0 ? num.toFixed(2) : num;
	}

	this.startBanner = function(data){
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
		self.elem_banner.cont_img.classList.remove('show');
		self.elem_banner.img.src = ''; // .style.backgroundImage = '';
		this.banner.classList.add('show');

		var saving = +data.saving;

		var retail_diff = this.getPrice(data.retail); 

		this.elem_banner.text_price.innerHTML = data.currencysymbol + retail_diff

		this.elem_banner.brand.innerHTML = [data.brand,data.model].join(' - ')
		this.elem_banner.center_price.innerHTML = data.currencysymbol + saving
		this.elem_banner.desc.innerHTML = data.description
		this.elem_banner.red_line_top.innerHTML = data.strapline1;

		if(!data.wasprice ||(data.wasprice && !data.wasprice.length)){
			this.removeWasprice(data)
		} else {
			this.addWasprice(data)
		}
		this.clearText();
		var diff = this.timeoutClearText ? 0 : 1800;

		this.timeoutClearText = setTimeout(function(){
			self.animationText(0)
		}, diff);

		this.arr_text = data['feature'];

		if(this.timeout_text){
			clearTimeout(this.timeout_text);
		}

		var img = new Image();
		img.src = data.productimageurl;
		img.onload = function(){
			self.elem_banner.img.src = this.src//.style.backgroundImage = 'url('+this.src+')';
			self.elem_banner.cont_img.classList.add('show');
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
		}
	}
	this.removeWasprice = function(){
		this.banner.classList.add('no_wasprice');
	}

	this.animationText = function(index){
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
		}

		if(index+1 < this.arr_text.length){
			var next_index = (index+1)%this.arr_text.length
			this.timeout_text = setTimeout(self.animationText.bind(self, next_index),2000);
		} else {
			if(this.full_screen){
				this.banner.classList.remove('show')
				this.timeoutSwitch = setTimeout(function(){
				self.switchData();
				}, 2000);
			}
			
		}
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
		var element = document.body;//this.banner;
		if(element.requestFullscreen) {
			element.requestFullscreen();
		} else if(element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if(element.mozRequestFullscreen) {
			element.mozRequestFullScreen();
		}
	}

	this.exitScreen = function() {
		var element = document.body;//this.banner;
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