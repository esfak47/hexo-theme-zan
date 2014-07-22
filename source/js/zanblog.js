/**
 * Functionality specific to Zanblog.
 *
 * Provides helper functions to enhance the theme experience.
 *
 * Website: www.yeahzan.com
 */

jQuery(function () {

	topFixed();
	dropDown();
	panelToggle();
	panelClose();
	btnLoading();
	preLoadImg();
	setImgHeight();
	archivesNum();

    jQuery('#myTab a:last').tab('show');

    /**
	 * Navbar fixed.
	 */
    function topFixed() {


    	var zanHeader = jQuery('#zan-header');
    	var body = jQuery('body');
    	var ifFixed = zanHeader.find('input[type="checkbox"]');
    	var storage = window.localStorage;

  		// storage.setItem('ifFixed', 'fixed');  将这行代码注释去掉可以实现网站头部默认钉住。

    	if(!storage.getItem('ifFixed')) {

    		storage.setItem('ifFixed', 'float');
    	} else {
    		if(storage.getItem('ifFixed') == 'fixed') {

		  		zanHeader.addClass('navbar-fixed-top');
		  		body.addClass('nav-fixed');
		  		ifFixed.iCheck('check');
    		} else {

    			zanHeader.removeClass('navbar-fixed-top');
		  		body.removeClass('nav-fixed');
		  		ifFixed.iCheck('uncheck');
    		}
    	}

	    ifFixed.iCheck({
	    	checkboxClass: 'icheckbox_flat-red'
	  	});

	  	ifFixed.on('ifChecked', function(event){
		  	zanHeader.addClass('navbar-fixed-top');
		  	body.addClass('nav-fixed');
		  	storage.setItem('ifFixed', 'fixed');

		}).on('ifUnchecked', function(event) {
			zanHeader.removeClass('navbar-fixed-top');
		  	body.removeClass('nav-fixed');
		  	storage.setItem('ifFixed', 'float');
		});
	}

	/**
	 * Navbar submenu dropdown.
	 */
	function dropDown() {

		var dropDownLi = jQuery('li.dropdown');

		dropDownLi.mouseover(function() {
			jQuery(this).addClass('open');
		}).mouseout(function() {
			jQuery(this).removeClass('open');
		});
	}

	/**
	 * Sidebar panel toggle.
	 */
	function panelToggle () {
		
		var toggleBtn = jQuery('.panel-toggle');

		toggleBtn.data('toggle', true);

		toggleBtn.click(function() {

			var btn = jQuery(this);

			if(btn.data('toggle')) {

				btn.removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
				btn.parents('div.panel').addClass('toggled');
				btn.data('toggle', false);
			} else {

				btn.removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');
				btn.parents('div.panel').removeClass('toggled');
				btn.data('toggle', true);
			}

		});
	}

	/**
	 * Sidebar panel close.
	 */
	function panelClose() {

		var closeBtn = jQuery('.panel-remove');

		closeBtn.click(function() {

			var btn = jQuery(this);

			btn.parents('.panel').toggle(300);
			
		});
	}

	/**
	 * Loading btn action.
	 */
	function btnLoading() {

		var loadBtn = jQuery('#load-more');
		var loadData = loadBtn.attr('load-data');

		loadBtn.click(function() {

			loadBtn.addClass('disabled');
			loadBtn.find('i').addClass('fa fa-spinner fa-spin');
			loadBtn.find('attr').text(loadData);
		})
	}

	/**
	 * Preload background img.
	 */
	function preLoadImg() {

		function preloadImages(array) {
		    if (!preloadImages.list) {
		        preloadImages.list = [];
		    }
		    for (var i = 0; i < array.length; i++) {
		        var img = new Image();
		        img.src = array[i];
		        preloadImages.list.push(img);
		    }
		}

		var imageURLs = [
		    'wp-content/themes/zanblog/ui/images/arrow_hover.png'
		];

		if (!imageURLs.length) preloadImages(imageURLs);

	}

	/**
	 * Set img auto height to adapt screen.
	 */
	function setImgHeight() {

		var img = jQuery(".content-article p").find("img");

		img.each(function() {

			var $this = jQuery(this);
			var attrWidth = $this.attr('width');
			var attrHeight = $this.attr('height');
			var width = $this.width();

			var scale = width / attrWidth;
			var height = scale * attrHeight;

			$this.css('height', height);

		});
	}

	/**
	 * 设置每月文章数量
	 */

	function archivesNum() {

		jQuery('#archives .panel-body').each(function() {

			var num = jQuery(this).find('p').size();
			var archiveA = jQuery(this).parent().siblings().find("a");
			var text = archiveA.text();

			archiveA.html(text + '( ' + num + '篇文章)');
		});
 	}

});
