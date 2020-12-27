var userAgent=navigator.userAgent.toLowerCase(),initialDate=new Date,
	$document=$(document),$window=$(window),
	$html=$("html"),
	isDesktop=$html.hasClass("desktop"),
	isRtl="rtl"===$html.attr("dir"),
	isIE=-1!=userAgent.indexOf("msie")?parseInt(userAgent.split("msie")[1],10):-1!=userAgent.indexOf("trident")?11:-1!=userAgent.indexOf("edge")?12:!1,
	isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
	isTouch="ontouchstart"in window,
	onloadCaptchaCallback,
	plugins={
		pointerEvents:11>isIE?"js/pointer-events.min.js":!1,
		bootstrapTooltip:$("[data-toggle='tooltip']"),
		bootstrapModalDialog:$(".modal"),
		bootstrapTabs:$(".tabs-custom-init"),
		rdNavbar:$(".rd-navbar"),
		materialParallax:$(".material-parallax"),
		rdGoogleMaps:$(".rd-google-map"),
		rdMailForm:$(".rd-mailform"),
		rdInputLabel:$(".form-label"),
		regula:$("[data-constraints]"),
		owl:$(".owl-carousel"),
		swiper:$(".swiper-slider"),
		slick:$(".slick-slider"),
		search:$(".rd-search"),
		searchResults:$(".rd-search-results"),
		statefulButton:$(".btn-stateful"),
		isotope:$(".isotope"),
		popover:$('[data-toggle="popover"]'),
		viewAnimate:$(".view-animate"),
		rdVideoBG:$(".rd-video"),
		radio:$("input[type='radio']"),
		checkbox:$("input[type='checkbox']"),
		customToggle:$("[data-custom-toggle]"),
		facebookWidget:$("#fb-root"),
		flickrfeed:$(".flickr"),
		twitterfeed:$(".twitter"),
		counter:$(".counter"),
		instafeed:$(".instafeed"),
		progressLinear:$(".progress-linear"),
		circleProgress:$(".progress-bar-circle"),
		dateCountdown:$(".DateCountdown"),
		pageLoader:$(".page-loader"),
		captcha:$(".recaptcha"),
		scroller:$(".scroll-wrap"),
		lightGallery:$("[data-lightgallery='group']"),
		lightGalleryItem:$("[data-lightgallery='item']"),
		mailchimp:$(".mailchimp-mailform"),
		campaignMonitor:$(".campaign-mailform"),
		copyrightYear:$("#copyright-year")
	};

$document.ready(function(){
	function z(a,b){
		var e=a.attr("data-"+b);
		if(e){
			var g=e.match(/(px)|(%)|(vh)$/i);
			if(g.length)switch(g[0]){
				case "px":return parseFloat(e);
				case "vh":return $window.height()*(parseFloat(e)/100);
				case "%":return a.width()*(parseFloat(e)/100)
			}
		}
	}function A(a){
		var e=$(a.slides[a.previousIndex]);
		a=$(a.slides[a.activeIndex]);
		e=e.find("video");
		for(b=0;b<e.length;b++)e[b].pause();e=a.find("video");e.length&&e.get(0).play()
	}function B(a){
		var e=$(a.container).find("[data-caption-animate]");
		a=$(a.slides[a.activeIndex]).find("[data-caption-animate]");
		for(b=0;b<e.length;b++){
			var k=$(e[b]);
			k.removeClass("animated").removeClass(k.attr("data-caption-animate")).addClass("not-animated")
		}for(b=0;b<a.length;b++){
			var g=$(a[b]);
			e=g.attr("data-caption-delay");
			k=g.attr("data-caption-duration");
			setTimeout(function(a,b){
				return function(){
					a.removeClass("not-animated").addClass(a.attr("data-caption-animate")).addClass("animated");
					b&&a.css("animation-duration",b+"ms")
				}
			}(g,k),e?parseInt(e,10):0)
		}
	}function v(a){
		var b=["-","-xs-","-sm-","-md-","-lg-"],
		k=[0,480,768,992,1200],
		g={},
		c,d;
		for(c=0;c<k.length;c++)
			for(g[k[c]]={},d=c;-1<=d;d--)
				!g[k[c]].items&&a.attr("data"+b[d]+"items")&&(g[k[c]].items=0>d?1:parseInt(a.attr("data"+b[d]+"items"),10)), !g[k[c]].stagePadding&&0!==g[k[c]].stagePadding&&a.attr("data"+b[d]+"stage-padding")&&(g[k[c]].stagePadding=0>d?0:parseInt(a.attr("data"+b[d]+"stage-padding"),10)), !g[k[c]].margin&&0!==g[k[c]].margin&&a.attr("data"+b[d]+"margin")&&(g[k[c]].margin=0>d?30:parseInt(a.attr("data"+ b[d]+"margin"),10));

		if(a.attr("data-dots-custom"))
			a.on("initialized.owl.carousel",function(a){
				var b=$(a.currentTarget),
					e=$(b.attr("data-dots-custom"));
				a=0;
				b.attr("data-active")&&(a=parseInt(b.attr("data-active")));
				b.trigger("to.owl.carousel",[a,300,!0]);
				e.find("[data-owl-item='"+a+"']").addClass("active");
				e.find("[data-owl-item]").on("click",function(a){
					a.preventDefault();b.trigger("to.owl.carousel",[parseInt(this.getAttribute("data-owl-item")),300,!0])
				});
				b.on("translate.owl.carousel",function(a){
					e.find(".active").removeClass("active");e.find("[data-owl-item='"+a.item.index+"']").addClass("active")
				})
			});

		a.owlCarousel({
			autoplay:"true"===a.attr("data-autoplay"),
			loop:!1,
			items:1,
			rtl:isRtl,
			dotsContainer:a.attr("data-pagination-class")||!1,
			navContainer:a.attr("data-navigation-class")||!1,
			mouseDrag:h?!1:"false"!==a.attr("data-mouse-drag"),
			nav:"true"===a.attr("data-nav"),
			dots:"true"===a.attr("data-dots"),
			dotsEach:a.attr("data-dots-each")?parseInt(a.attr("data-dots-each")):!1,
			animateIn:a.attr("data-animation-in")?a.attr("data-animation-in"):!1,
			animateOut:a.attr("data-animation-out")?a.attr("data-animation-out"):!1,
			responsive:g,
			navText:$.parseJSON(a.attr("data-nav-text"))||[],
			navClass:$.parseJSON(a.attr("data-nav-class"))||["owl-prev","owl-next"]
		})
	}function q(a){
		return h?!0:a.offset().top+a.outerHeight()>=$window.scrollTop()&&a.offset().top<=$window.scrollTop()+$window.height()
	}function C(a,b){
		jQuery(window).on("load scroll",function(){!a.hasClass("lazy-loaded")&&q(a)&&(b.call(),a.addClass("lazy-loaded"))})
	}function J(a){
		a.live.removeClass("cleared").html();a.current++;a.spin.addClass("loading");$.get(D,{s:decodeURI(a.term),liveSearch:a.element.attr("data-search-live"),dataType:"html",liveCount:a.liveCount,filter:a.filter,template:a.template},function(b){a.processed++;var e=a.live;a.processed!=a.current||e.hasClass("cleared")||(e.find("> #search-results").removeClass("active"),e.html(b),setTimeout(function(){e.find("> #search-results").addClass("active")},50));a.spin.parents(".rd-search").find(".input-group-addon").removeClass("loading")})
	}function K(a){
		for(var b=0;b<a.length;b++){var c=$(a[b]);c.addClass("form-control-has-validation").after("<span class='form-validation'></span>");c.parent().find(".form-validation").is(":last-child")&&c.addClass("form-control-last-child")}a.on("input change propertychange blur",function(a){var e=$(this);if(("blur"==a.type||e.parent().hasClass("has-error"))&&!e.parents(".rd-mailform").hasClass("success"))if((a=e.regula("validate")).length)for(b=0;b<a.length;b++)e.siblings(".form-validation").text(a[b].message).parent().addClass("has-error");else e.siblings(".form-validation").text("").parent().removeClass("has-error")}).regula("bind");a=[{type:regula.Constraint.Required,newMessage:"The text field is required."},{type:regula.Constraint.Email,newMessage:"The email is not a valid email."},{type:regula.Constraint.Numeric,newMessage:"Only numbers are required"},{type:regula.Constraint.Selected,newMessage:"Please choose an option."}];for(b=0;b<a.length;b++)c=a[b],regula.override({constraintType:c.type,defaultMessage:c.newMessage})
	}function w(a,b){
		var e,c=0;if(a.length){for(m=0;m<a.length;m++){var d=$(a[m]);if((e=d.regula("validate")).length)for(t=0;t<e.length;t++)c++,d.siblings(".form-validation").text(e[t].message).parent().addClass("has-error");else d.siblings(".form-validation").text("").parent().removeClass("has-error")}return b&&b.length?L(b)&&0==c:0==c}return!0
	}function E(a){
		599>window.innerWidth?(plugins.bootstrapTooltip.tooltip("destroy"),plugins.bootstrapTooltip.tooltip({placement:"bottom"})):(plugins.bootstrapTooltip.tooltip("destroy"),plugins.bootstrapTooltip.tooltip())
	}function L(a){
		return""==a.find(".g-recaptcha-response").val()?(a.siblings(".form-validation").html("Please, prove that you are not robot.").addClass("active"),a.closest(".form-group").addClass("has-error"),a.on("propertychange",function(){var a=$(this);""!=a.find(".g-recaptcha-response").val()&&(a.closest(".form-group").removeClass("has-error"),a.siblings(".form-validation").removeClass("active").html(""),a.off("propertychange"))}),!1):!0
	}var h=window.xMode;
	plugins.copyrightYear.length&&plugins.copyrightYear.text(initialDate.getFullYear());
	if(0<plugins.pageLoader.length)$window.on("load",function(){setTimeout(function(){plugins.pageLoader.addClass("loaded");$window.trigger("resize")},1E3)});
	onloadCaptchaCallback=function(){for(b=0;b<plugins.captcha.length;b++){var a=$(plugins.captcha[b]);grecaptcha.render(a.attr("id"),{sitekey:a.attr("data-sitekey"),size:a.attr("data-size")?a.attr("data-size"):"normal",theme:a.attr("data-theme")?a.attr("data-theme"):"light",callback:function(a){$(".recaptcha").trigger("propertychange")}});a.after("<span class='form-validation'></span>")}};
	plugins.captcha.length&&$.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
	navigator.platform.match(/(Mac)/i)&&$html.addClass("mac-os");
	isIE&&(10>isIE&&$html.addClass("lt-ie-10"),11>isIE&&plugins.pointerEvents&&$.getScript(plugins.pointerEvents).done(function(){$html.addClass("ie-10");PointerEventsPolyfill.initialize({})}),11===isIE&&$("html").addClass("ie-11"),12===isIE&&$("html").addClass("ie-edge"));
	if(plugins.bootstrapTooltip.length){var F=plugins.bootstrapTooltip.attr("data-placement");E(F);$window.on("resize orientationchange",function(){E(F)})}
	if(0<plugins.bootstrapModalDialog.length){var b=0;for(b=0;b<plugins.bootstrapModalDialog.length;b++){var d=$(plugins.bootstrapModalDialog[b]);d.on("hidden.bs.modal",$.proxy(function(){var a=$(this),b=a.find("video");a=a.find("iframe");b.length&&b[0].pause();a.length&&(b=a.attr("src"),a.attr("src","").attr("src",b))},d))}}
	if(plugins.scroller.length)for(b=0;b<plugins.scroller.length;b++)d=$(plugins.scroller[b]),d.mCustomScrollbar({theme:d.attr("data-theme")?d.attr("data-theme"):"minimal",scrollInertia:100,scrollButtons:{enable:!1}});
	plugins.rdGoogleMaps.length&&$.getScript("",function(){var a=document.getElementsByTagName("head")[0],e=a.insertBefore;a.insertBefore=function(b,c){b.href&&-1!=b.href.indexOf("//fonts.googleapis.com/css?family=Roboto")||-1!=b.innerHTML.indexOf("gm-style")||e.call(a,b,c)};for(b=0;b<plugins.rdGoogleMaps.length;b++){var c=$(plugins.rdGoogleMaps[b]);C(c,$.proxy(function(){var a=$(this),b=a.attr("data-styles");a.googleMap({marker:{basic:a.data("marker"),active:a.data("marker-active")},styles:b?JSON.parse(b):[],onInit:function(b){var e=$("#rd-google-map-address");if(e.length){var c=new google.maps.Geocoder,d=new google.maps.Marker({map:b,icon:a.data("marker-url")});(new google.maps.places.Autocomplete(e[0])).bindTo("bounds",b);e.attr("placeholder","");e.on("change",function(){$("#rd-google-map-address-submit").trigger("click")});e.on("keydown",function(a){13==a.keyCode&&$("#rd-google-map-address-submit").trigger("click")});$("#rd-google-map-address-submit").on("click",function(a){a.preventDefault();a=e.val();c.geocode({address:a},function(a,e){if(e==google.maps.GeocoderStatus.OK){var c=a[0].geometry.location.lat(),k=a[0].geometry.location.lng();b.setCenter(new google.maps.LatLng(parseFloat(c),parseFloat(k)));d.setPosition(new google.maps.LatLng(parseFloat(c),parseFloat(k)))}})})}}})},c))}});
	plugins.facebookWidget.length&&C(plugins.facebookWidget,function(){var a=document.getElementsByTagName("script")[0];if(!document.getElementById("facebook-jssdk")){var b=document.createElement("script");b.id="facebook-jssdk";b.src="//connect.facebook.net/en_EN/sdk.js#xfbml=1&version=v2.5";a.parentNode.insertBefore(b,a)}});
	if(plugins.radio.length)for(b=0;b<plugins.radio.length;b++)d=$(plugins.radio[b]),d.addClass("radio-custom").after("<span class='radio-custom-dummy'></span>");
	if(plugins.checkbox.length)for(b=0;b<plugins.checkbox.length;b++)d=$(plugins.checkbox[b]),d.addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>");
	plugins.popover.length&&(767>window.innerWidth&&plugins.popover.attr("data-placement","bottom"),plugins.popover.popover());
	if(plugins.statefulButton.length)$(plugins.statefulButton).on("click",function(){var a=$(this).button("loading");setTimeout(function(){a.button("reset")},2E3)});
	isDesktop&&!h&&$().UItoTop({easingType:"easeOutQuart",containerClass:"ui-to-top"});
	plugins.rdNavbar.length&&(plugins.rdNavbar.RDNavbar({stickUpClone:plugins.rdNavbar.attr("data-stick-up-clone")&&!h?"true"===plugins.rdNavbar.attr("data-stick-up-clone"):!1,responsive:{0:{stickUp:h?!1:"true"===plugins.rdNavbar.attr("data-stick-up")},768:{stickUp:h?!1:"true"===plugins.rdNavbar.attr("data-sm-stick-up")},992:{stickUp:h?!1:"true"===plugins.rdNavbar.attr("data-md-stick-up")},1200:{stickUp:h?!1:"true"===plugins.rdNavbar.attr("data-lg-stick-up")}},callbacks:{onStuck:function(){var a=this.$element.find(".rd-search input");a&&a.val("").trigger("propertychange")},onDropdownOver:function(){return!h},onUnstuck:function(){if(null!==this.$clone){var a=this.$clone.find(".rd-search input");a&&(a.val("").trigger("propertychange"),a.trigger("blur"))}}}}),plugins.rdNavbar.attr("data-body-class")&&(document.body.className+=" "+plugins.rdNavbar.attr("data-body-class")));
	if(plugins.search.length||plugins.searchResults){
		var D="bat/rd-search.php";
		if(plugins.search.length)
			for(plugins.search=$("."+plugins.search[0].className),b=0;b<plugins.search.length;b++){
				var l=$(plugins.search[b]);
				d={
					element:l,
					filter:l.attr("data-search-filter")?l.attr("data-search-filter"):"*.html",
					template:l.attr("data-search-template")?l.attr("data-search-template"):'<h4 class="search_title"><a target="_top" href="#{href}" class="search_link">#{title}</a></h4><p class="match"><em>#{href}</em></p><p>...#{token}...</p>',
					live:l.attr("data-search-live")?l.find("."+l.attr("data-search-live")):!1,
					liveCount:l.attr("data-search-live-count")?parseInt(l.attr("data-search-live")):4,
					current:0,processed:0,timer:{}
				};
				if($(".rd-navbar-search-toggle").length)
					$(".rd-navbar-search-toggle").on("click",function(){$(this).hasClass("active")||l.find("input").val("").trigger("propertychange")});

				d.live&&(d.clearHandler=!1,l.find("input").on("keyup input propertychange",$.proxy(function(){
					var a=this;
					this.term=this.element.find("input").val().trim();
					this.spin=this.element.find(".input-group-addon");
					clearTimeout(a.timer);
					2<a.term.length?(a.timer=setTimeout(J(a),200),0==a.clearHandler&&(a.clearHandler=!0,$("body").on("click",function(b){0==$(b.toElement).parents(".rd-search").length&&a.live.addClass("cleared").html("")}))):0==a.term.length&&a.live.addClass("cleared").html("")
				},d,this)));
				l.on("submit",$.proxy(function(){$("<input />").attr("type","hidden").attr("name","filter").attr("value",this.filter).appendTo(this.element);return!0},d,this))
			}

		plugins.searchResults.length&&(d=/\?.*s=([^&]+)&filter=([^&]+)/g.exec(location.search),null!=d&&$.get(D,{s:decodeURI(d[1]),dataType:"html",filter:d[2],template:'<h4 class="search_title"><a target="_top" href="#{href}" class="search_link">#{title}</a></h4><p class="match"><em>#{href}</em></p><p>...#{token}...</p>',live:""},function(a){plugins.searchResults.html(a)}))
	}
	if(plugins.viewAnimate.length)for(b=0;b<plugins.viewAnimate.length;b++)d=$(plugins.viewAnimate[b]).not(".active"),$document.on("scroll",$.proxy(function(){q(this)&&this.addClass("active")},d)).trigger("scroll");
	if(plugins.swiper.length)for(b=0;b<plugins.swiper.length;b++){var f=$(plugins.swiper[b]),n=f.find(".swiper-pagination"),G=f.find(".swiper-button-next"),H=f.find(".swiper-button-prev"),p=f.find(".swiper-scrollbar"),x=f.find(".swiper-slide");for(m=0;m<x.length;m++){d=$(x[m]);var c;(c=d.attr("data-slide-bg"))&&d.css({"background-image":"url("+c+")","background-size":"cover"})}x.end().find("[data-caption-animate]").addClass("not-animated").end().swiper({autoplay:h?null:f.attr("data-autoplay")?"false"===f.attr("data-autoplay")?void 0:f.attr("data-autoplay"):5E3,direction:f.attr("data-direction")?f.attr("data-direction"):"horizontal",effect:f.attr("data-slide-effect")?f.attr("data-slide-effect"):"slide",speed:f.attr("data-slide-speed")?f.attr("data-slide-speed"):600,keyboardControl:"true"===f.attr("data-keyboard"),mousewheelControl:"true"===f.attr("data-mousewheel"),mousewheelReleaseOnEdges:"true"===f.attr("data-mousewheel-release"),nextButton:G.length?G.get(0):null,prevButton:H.length?H.get(0):null,pagination:n.length?n.get(0):null,paginationClickable:n.length?"false"!==n.attr("data-clickable"):!1,paginationBulletRender:n.length?"true"===n.attr("data-index-bullet")?function(a,b){return'<span class="'+b+'">'+(a+1)+"</span>"}:null:null,scrollbar:p.length?p.get(0):null,scrollbarDraggable:p.length?"false"!==p.attr("data-draggable"):!0,scrollbarHide:p.length?"false"===p.attr("data-draggable"):!1,loop:h?!1:"false"!==f.attr("data-loop"),simulateTouch:f.attr("data-simulate-touch")&&!h?"true"===f.attr("data-simulate-touch"):!1,onTransitionStart:function(a){A(a)},onTransitionEnd:function(a){B(a)},onInit:function(a){A(a);B(a);$window.on("resize",function(){a.update(!0)})}});$window.on("resize",function(){var a=z(f,"min-height"),b=z(f,"height");b&&f.css("height",a?a>b?a:b:b)}).trigger("resize")}
	if(plugins.owl.length)for(b=0;b<plugins.owl.length;b++)c=$(plugins.owl[b]),c.parents(".tab-content").length||v(c);
	if(plugins.isotope.length){
		var r=[];
		for(b=0;b<plugins.isotope.length;b++)c=plugins.isotope[b],c=new Isotope(c,{itemSelector:".isotope-item",layoutMode:c.getAttribute("data-isotope-layout")?c.getAttribute("data-isotope-layout"):"masonry",filter:"*"}),r.push(c);$window.on("load",function(){setTimeout(function(){var a;for(a=0;a<r.length;a++)r[a].element.className+=" isotope--loaded",r[a].layout()},600)});$("[data-isotope-filter]").on("click",function(a){a.preventDefault();a=$(this);clearTimeout(void 0);a.parents(".isotope-filters").find(".active").removeClass("active");a.addClass("active");a=$('.isotope[data-isotope-group="'+this.getAttribute("data-isotope-group")+'"]');a.isotope({itemSelector:".isotope-item",layoutMode:a.attr("data-isotope-layout")?a.attr("data-isotope-layout"):"masonry",filter:"*"==this.getAttribute("data-isotope-filter")?"*":'[data-filter*="'+this.getAttribute("data-isotope-filter")+'"]'})}).eq(0).trigger("click")
	}
	isDesktop&&$html.hasClass("wow-animation")&&$(".wow").length&&(new WOW).init();
	if(plugins.bootstrapTabs.length)for(b=0;b<plugins.bootstrapTabs.length;b++)if(c=$(plugins.bootstrapTabs[b]),c.find(".owl-carousel").length&&(d=c.find(".tab-content .tab-pane.active .owl-carousel"),v(d),c.find(".nav-custom a").on("click",$.proxy(function(){var a=$(this);a.find(".owl-carousel").trigger("destroy.owl.carousel").removeClass("owl-loaded");a.find(".owl-carousel").find(".owl-stage-outer").children().unwrap();setTimeout(function(){var b=a.find(".tab-content .tab-pane.active .owl-carousel");if(b.length)for(var c=0;c<b.length;c++){var d=$(b[c]);v(d)}},h?1500:300)},c))),c.find(".slick-slider").length)c.find(".tabs-custom-list > li > a").on("click",$.proxy(function(){var a=$(this);setTimeout(function(){a.find(".tab-content .tab-pane.active .slick-slider").slick("setPosition")},h?1500:300)},c));
	plugins.rdInputLabel.length&&plugins.rdInputLabel.RDInputLabel();
	plugins.regula.length&&K(plugins.regula);
	if(plugins.mailchimp.length)for(b=0;b<plugins.mailchimp.length;b++)c=$(plugins.mailchimp[b]),d=c.find('input[type="email"]'),c.attr("novalidate","true"),d.attr("name","EMAIL"),c.on("submit",$.proxy(function(a){a.preventDefault();var c=this;a={};var d=c.attr("action").replace("/post?","/post-json?").concat("&c=?"),g=c.serializeArray(),f=$("#"+c.attr("data-form-output"));for(b=0;b<g.length;b++)a[g[b].name]=g[b].value;$.ajax({data:a,url:d,dataType:"jsonp",error:function(a,b){f.html("Server error: "+b);setTimeout(function(){f.removeClass("active")},4E3)},success:function(a){f.html(a.msg).addClass("active");setTimeout(function(){f.removeClass("active")},6E3)},beforeSend:function(a){if(h||!w(c.find("[data-constraints]")))return!1;f.html("Submitting...").addClass("active")}});return!1},c));
	if(plugins.campaignMonitor.length)for(b=0;b<plugins.campaignMonitor.length;b++)c=$(plugins.campaignMonitor[b]),c.on("submit",$.proxy(function(a){a={};var c=this.attr("action"),d=this.serializeArray(),g=$("#"+plugins.campaignMonitor.attr("data-form-output")),f=$(this);for(b=0;b<d.length;b++)a[d[b].name]=d[b].value;$.ajax({data:a,url:c,dataType:"jsonp",error:function(a,b){g.html("Server error: "+b);setTimeout(function(){g.removeClass("active")},4E3)},success:function(a){g.html(a.Message).addClass("active");setTimeout(function(){g.removeClass("active")},6E3)},beforeSend:function(a){if(h||!w(f.find("[data-constraints]")))return!1;g.html("Submitting...").addClass("active")}});return!1},c));
	if(plugins.rdMailForm.length){var m,t,u={MF000:"Successfully sent!",MF001:"Recipients are not set!",MF002:"Form will not work locally!",MF003:"Please, define email field in your form!",MF004:"Please, define type of your form!",MF254:"Something went wrong with PHPMailer!",MF255:"Aw, snap! Something went wrong."};for(b=0;b<plugins.rdMailForm.length;b++){c=$(plugins.rdMailForm[b]);var y=!1;c.attr("novalidate","novalidate").ajaxForm({data:{"form-type":c.attr("data-form-type")||"contact",recipients:"test@demolink.com",counter:b},beforeSubmit:function(a,b,c){if(!h){a=$(plugins.rdMailForm[this.extraData.counter]);b=a.find("[data-constraints]");var e=$("#"+a.attr("data-form-output"));c=a.find(".recaptcha");var d=!0;e.removeClass("active error success");if(w(b,c)){if(c.length){b=c.find(".g-recaptcha-response").val();var k={CPT001:'Please, setup you "site key" and "secret key" of reCaptcha',CPT002:"Something wrong with google reCaptcha"};y=!0;$.ajax({method:"POST",url:"bat/reCaptcha.php",data:{"g-recaptcha-response":b},async:!1}).done(function(a){"CPT000"!=a&&(e.hasClass("snackbars")?(e.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>'+k[a]+"</span></p>"),setTimeout(function(){e.removeClass("active")},3500),d=!1):e.html(k[a]),e.addClass("active"))})}if(!d)return!1;a.addClass("form-in-process");e.hasClass("snackbars")&&(e.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>'),e.addClass("active"))}else return!1}},error:function(a){if(!h){var b=$("#"+$(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output")),c=$(plugins.rdMailForm[this.extraData.counter]);b.text(u[a]);c.removeClass("form-in-process");y&&grecaptcha.reset()}},success:function(a){if(!h){var b=$(plugins.rdMailForm[this.extraData.counter]),c=$("#"+b.attr("data-form-output"));b.addClass("success").removeClass("form-in-process");y&&grecaptcha.reset();a=5===a.length?a:"MF255";c.text(u[a]);"MF000"===a?c.hasClass("snackbars")?c.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>'+
u[a]+"</span></p>"):c.addClass("active success"):c.hasClass("snackbars")?c.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>'+u[a]+"</span></p>"):c.addClass("active error");b.clearForm();b.find("input, textarea").trigger("blur");setTimeout(function(){c.removeClass("active error success");b.removeClass("success")},3500)}}})}}
	plugins.lightGallery.length&&!h&&plugins.lightGallery.lightGallery({thumbnail:!0,selector:"[data-lightgallery='group-item']"});
	plugins.lightGalleryItem.length&&!h&&plugins.lightGalleryItem.lightGallery({selector:"this"});
	if(plugins.customToggle.length)for(b=0;b<plugins.customToggle.length;b++){d=$(plugins.customToggle[b]);d.on("click",$.proxy(function(a){a.preventDefault();a=$(this);$(a.attr("data-custom-toggle")).add(this).toggleClass("active")},d));if("true"===d.attr("data-custom-toggle-hide-on-blur"))$("body").on("click",d,function(a){a.target!==a.data[0]&&$(a.data.attr("data-custom-toggle")).find($(a.target)).length&&0==a.data.find($(a.target)).length&&$(a.data.attr("data-custom-toggle")).add(a.data[0]).removeClass("active")});if("true"===d.attr("data-custom-toggle-disable-on-blur"))$("body").on("click",d,function(a){a.target!==a.data[0]&&0==$(a.data.attr("data-custom-toggle")).find($(a.target)).length&&0==a.data.find($(a.target)).length&&$(a.data.attr("data-custom-toggle")).add(a.data[0]).removeClass("active")})}
	if(plugins.counter.length)for(b=0;b<plugins.counter.length;b++)c=$(plugins.counter[b]).not(".animated"),$document.on("scroll",$.proxy(function(){!this.hasClass("animated")&&q(this)&&(this.countTo({refreshInterval:40,from:0,to:parseInt(this.text(),10),speed:this.attr("data-speed")||1E3}),this.addClass("animated"))},c)).trigger("scroll");
	if(0<plugins.instafeed.length)for(b=0;b<plugins.instafeed.length;b++)$(plugins.instafeed[b]).RDInstafeed({accessToken:"5526956400.ba4c844.c832b2a554764bc8a1c66c39e99687d7",clientId:" c832b2a554764bc8a1c66c39e99687d7",userId:"5526956400"});
	if(plugins.dateCountdown.length)for(b=0;b<plugins.dateCountdown.length;b++)c=$(plugins.dateCountdown[b]),$window.on("load resize orientationchange",$.proxy(function(){var a=$(this),b=a.data("circle-inner-color"),c=a.data("circle-bg"),d={Days:{text:"Days",color:b,show:!0},Hours:{text:"Hours",color:b,show:!0},Minutes:{text:"Minutes",color:b,show:!0},Seconds:{text:"Seconds",color:b,show:!0}};a.TimeCircles({fg_width:a.data("circle-fg-width")||.045,circle_bg_color:c,bg_width:a.data("circle-bg-width")||.9,time:d});479>window.innerWidth?a.TimeCircles({time:{Days:{color:b,show:!0},Hours:{color:b,show:!0},Minutes:{color:b,show:!0},Seconds:{show:!1}}}).rebuild():767>window.innerWidth?a.TimeCircles({time:{Days:{color:b,show:!0},Hours:{color:b,show:!0},Seconds:{show:!1}}}).rebuild():a.TimeCircles({time:d}).rebuild()},c));
	if(plugins.circleProgress.length)for(b=0;b<plugins.circleProgress.length;b++)c=$(plugins.circleProgress[b]),$document.on("scroll",$.proxy(function(){var a=$(this);if(!a.hasClass("animated")&&q(a)){var b=a.attr("data-gradient").split(",");a.circleProgress({value:a.attr("data-value"),size:a.attr("data-size")?a.attr("data-size"):175,fill:{gradient:b,gradientAngle:Math.PI/4},startAngle:-Math.PI/4*2,emptyFill:a.attr("data-empty-fill")?a.attr("data-empty-fill"):"rgb(245,245,245)",thickness:a.attr("data-thickness")?parseInt(a.attr("data-thickness")):10}).on("circle-animation-progress",function(a,b,c){$(this).find("span").text(String(c.toFixed(2)).replace("0.","").replace("1.","1"))});a.addClass("animated")}},c)).trigger("scroll");
	if(plugins.progressLinear.length)for(b=0;b<plugins.progressLinear.length;b++)c=$(plugins.progressLinear[b]),$window.on("scroll load",$.proxy(function(){var a=$(this);if(!a.hasClass("animated-first")&&q(a)){var b=parseInt($(this).find(".progress-value").text(),10);a.find(".progress-bar-linear").css({width:b+"%"});a.find(".progress-value").countTo({refreshInterval:40,from:0,to:b,speed:500});a.addClass("animated-first")}},c));
	if(plugins.materialParallax.length)if(h||isIE||isMobile)for(b=0;b<plugins.materialParallax.length;b++)c=$(plugins.materialParallax[b]),d=c.find("img").attr("src"),c.css({"background-image":"url("+d+")","background-attachment":"fixed","background-size":"cover"});else plugins.materialParallax.parallax();
	if(plugins.slick.length)for(b=0;b<plugins.slick.length;b++)c=$(plugins.slick[b]),c.slick({slidesToScroll:parseInt(c.attr("data-slide-to-scroll"))||1,asNavFor:c.attr("data-for")||!1,dots:"true"==c.attr("data-dots"),infinite:h?!1:"true"==c.attr("data-loop"),focusOnSelect:!0,arrows:"true"==c.attr("data-arrows"),swipe:"true"==c.attr("data-swipe"),autoplay:"true"==c.attr("data-autoplay"),vertical:"true"==c.attr("data-vertical"),centerMode:"true"==c.attr("data-center-mode"),centerPadding:c.attr("data-center-padding")?c.attr("data-center-padding"):"0.50",mobileFirst:!0,rtl:isRtl,responsive:[{breakpoint:0,settings:{slidesToShow:parseInt(c.attr("data-items"))||1}},{breakpoint:480,settings:{slidesToShow:parseInt(c.attr("data-xs-items"))||1}},{breakpoint:768,settings:{slidesToShow:parseInt(c.attr("data-sm-items"))||1}},{breakpoint:992,settings:{slidesToShow:parseInt(c.attr("data-md-items"))||1}},{breakpoint:1200,settings:{slidesToShow:parseInt(c.attr("data-lg-items"))||1}}]}).on("afterChange",function(a,b,c,d){if(a=$(this).attr("data-child"))$(a+" .slick-slide").removeClass("slick-current"),$(a+" .slick-slide").eq(c).addClass("slick-current")});
	if(0<plugins.flickrfeed.length)for(b=0;b<plugins.flickrfeed.length;b++){var I=$(plugins.flickrfeed[b]);I.RDFlickr({callback:function(){var a=I.find("[data-photo-swipe-item]");if(a.length)for(var b=0;b<a.length;b++){var c=new Image;c.setAttribute("data-index",b);c.onload=function(){a[this.getAttribute("data-index")].setAttribute("data-size",this.naturalWidth+"x"+this.naturalHeight)};c.src=a[b].getAttribute("href")}}})}
	if(0<plugins.twitterfeed.length)for(b=0;b<plugins.twitterfeed.length;b++)$(plugins.twitterfeed[b]).RDTwitter({});
	if(plugins.rdVideoBG.length)for(b=0;b<plugins.rdVideoBG.length;b++)$(plugins.rdVideoBG[b]).RDVideo({})
});