DygDFP.Brand = {
    StarTVNEW: {
		OldPageSkinTop:0,
        init: function () {
			DygDFP.section = "Test";
			googletag.cmd.push(function () {
			
			var tags = Array(100);
				
			var arrayIndex = 0;
			if (DygDFP.target != "") {
				tags[arrayIndex] = DygDFP.target;
			}

			if (DygDFP.categories != "") {
				for (var i = 0; i < DygDFP.categories.split(',').length; i++) {
					arrayIndex++;
					tags[arrayIndex] = DygDFP.categories.split(',')[i];
				}
			}
			
			
			googletag.pubads().setTargeting('star_cat', tags); 
			
				if (DygDFP.device.isPhone()) {
					//gptadslots[0] = googletag.defineSlot('/37011203/Mobile/NTV_App/Mobile_Site/' + DygDFP.section + '/INS', [[320, 480]],'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					//gptadslots[1] = googletag.defineSlot('/37011203/Mobile/NTV_App/Mobile_Site/' + DygDFP.section + '/LDB', [[320, 50]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				else if (DygDFP.device.isTablet()) {
				
					//gptadslots[0] = googletag.defineSlot('/37011203/Mobile/NTV_App/Mobile_Site/' + DygDFP.section + '/INS', [[768, 1024]], 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					//gptadslots[1] = googletag.defineSlot('/37011203/Mobile/NTV_App/Mobile_Site/' + DygDFP.section + '/LDB', [[728, 90]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					//gptadslots[2] = googletag.defineSlot('/37011203/Mobile/NTV_App/Mobile_Site/' + DygDFP.section + '/MPU1', [[300, 250]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				else {
					//gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/StarTV/'+DygDFP.section+'/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[1] = googletag.defineSlot('/37011203/Web/StarTV/'+DygDFP.section+'/LDB',[[728, 90], [970, 90]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.companionAds()).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/Web/StarTV/'+DygDFP.section+'/SKIN', 'div-PageSkin').setTargeting('pos', ['skin']).addService(googletag.companionAds()).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[3] = googletag.defineSlot('/37011203/Web/StarTV/'+DygDFP.section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.companionAds()).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);					                    
					gptadslots[4] = googletag.defineOutOfPageSlot('/37011203/Web/StarTV/'+DygDFP.section+'/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[5] = googletag.defineOutOfPageSlot('/37011203/Web/StarTV/'+DygDFP.section+'/SRVY', 'div-Srvy').setTargeting('pos', ['srvy']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					
					if(DygDFP.section == 'Anasayfa'){
						gptadslots[8] = googletag.defineOutOfPageSlot('/37011203/Web/StarTV/'+DygDFP.section+'/RM', 'div-richMedia').setTargeting('pos', ['rm']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
				}
				
				googletag.pubads().addEventListener('slotRenderEnded', function (event) {
					if (event.slot === gptadslots[1]) {
						if (!event.isEmpty) {
							DygDFP.PageSkin.marginTop = $("header").outerHeight() + 90;
							DygDFP.VideoWall.top = DygDFP.PageSkin.marginTop;
							setTimeout(function () {
								$("#div-PageSkin_rev").attr("id", "div-PageSkin");
								googletag.cmd.push(function () { googletag.display('div-PageSkin'); });
							}, 1000);
						} else {
							setTimeout(function () {
							DygDFP.PageSkin.marginTop = $("#header").outerHeight() + $("#subPagesHeader").outerHeight();
							DygDFP.VideoWall.top = DygDFP.PageSkin.marginTop;
							$("#div-PageSkin_rev").attr("id", "div-PageSkin");
							googletag.cmd.push(function () { googletag.display('div-PageSkin'); });
							}, 1000);
						}
					}
					else if (event.slot === gptadslots[2]) {
						if (!event.isEmpty) {
							$("body").css("background", "white");
							$("#content").css("background", "none");
							$("#header").css("z-index", "20");
							$("#content").css("min-height", "1010px");
						}
						else{
							$("#left_480x1100").css("z-index","1");
							$("#right_480x1100").css("z-index","1");
						}
					}
					else if (event.slot === gptadslots[4]) {
						if (!event.isEmpty) {
							$("#mastheadDiv").css("margin-top",75);
							$("#mastheadDiv").css("margin-bottom",5);
									
							if(DygDFP.section == 'Anasayfa' || DygDFP.section == 'Test'){
								$(".carousel").css("padding-top",0);
							}
							
							if(DygDFP.section == 'Diziler' || DygDFP.section == 'Programlar' || DygDFP.section == 'Test'){
								$("section.cover").css("margin-top",0);
							}
							
							if(DygDFP.section == 'Akis' || DygDFP.section == 'Test'){
								$("section.timeline.border").css("margin-top",0);
							}
							
							if(DygDFP.section == 'Canli' || DygDFP.section == 'Test'){
								$("section.video-player").css("margin-top",0);
							}
						}
					}
				});

				//googletag.pubads().disableInitialLoad();
				googletag.companionAds().setRefreshUnfilledSlots(true);
				googletag.pubads().enableVideoAds();
				googletag.pubads().enableSingleRequest();
				googletag.pubads().enableAsyncRendering();
				googletag.enableServices();
			});

			if(window.innerWidth > 1620 ){
				DygDFP.PageSkin.containerWidth = 1560;
			}
			else if(window.innerWidth <= 1620 && window.innerWidth>1200) {
				DygDFP.PageSkin.containerWidth = 1140;
			}
			else if(window.innerWidth <= 1200){
				DygDFP.PageSkin.containerWidth = 940;
			}

			DygDFP.LeaderBoard.backgroundColor = "#222222";
			
			
			$("header").after("<div id='mastheadDiv'></div>");
			DygDFP.Masthead.appendSelector = $("#mastheadDiv");
			DygDFP.VideoWall.appendSelector = '.DFP_SKIN';
			DygDFP.VideoWall.top = 100;
			DygDFP.allowAnimate = true;

			$(document).ready(function () {				
				$("body").append("<div id='div-PageSkin_rev' style='display:none'></div>");
				$("body").append("<div id='div-Srvy' style='display:none'></div>");
				$("body").append("<div id='div-interstitial' style='display:none'></div>");
				$("body").prepend("<div id='div-Tepe_728x90' style='text-align:center'></div>");
				$("body").prepend("<div id='div-Masthead' style='display:none;height:0px'></div>");
				$(".300x250w").prepend("<div id='div-300x250_Ros-1' style='display:none'></div>");
				
				if(DygDFP.section == "Anasayfa"){
					$("body").append("<div id='div-richMedia' style='display:none'></div>");
					googletag.cmd.push(function () { googletag.display('div-richMedia'); });
				}
				
				googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
				googletag.cmd.push(function () { googletag.display('div-Masthead'); });
				googletag.cmd.push(function () { googletag.display('div-Srvy'); });
				googletag.cmd.push(function () { googletag.display('div-Tepe_728x90'); });
				googletag.cmd.push(function () { googletag.display('div-interstitial'); });
			});
        },
        preparePageSkin: function (hasTopImage) {
			DygDFP.Brand.StarTVNEW.OldPageSkinTop =  DygDFP.PageSkin.marginTop;
            DygDFP.PageSkin.changeMarginTop();
			var toTopHeight = $('.social').outerHeight() + $('.navigation').outerHeight();

			if($(window).scrollTop() >= toTopHeight)
			{
				var topHeight = $('.navigation').outerHeight();
				$("#LeftSkin").css("position","fixed");
				$("#LeftSkin").css("top",topHeight);
				$("#RightSkin").css("position","fixed");
				$("#RightSkin").css("top",topHeight);
			}
			else{
				$("#LeftSkin").css("position","absolute");
				$("#LeftSkin").css("top", toTopHeight );
				$("#RightSkin").css("position","absolute");
				$("#RightSkin").css("top", toTopHeight );
			}



			/*$("#LeftSkin").css("z-index", 35);
			$("#RightSkin").css("z-index", 35);
			$("header .navigation").css("z-index", 50);
			$("footer").css("z-index", 50);
			$("footer").css("position", 'relative');*/
			DygDFP.PageSkin.show(false);
        },
		prepareVPaid: function(){
			$("body").scrollTop(110);	
			if(document.getElementById($("body object[data*='flowplayer']").attr("id")) != null){
				$("#extendVidPanel").css("top",$("body object[data*='flowplayer']").offset().top - 135);
				$("#extendVidPanel").css("left",$("body object[data*='flowplayer']").offset().left - 170);
			}
			else{
				$("#extendVidPanel").css("top",$("body object[data*='http://cdnapi.kaltura.com/index.php']").offset().top - 135);
				$("#extendVidPanel").css("left",$("body object[data*='http://cdnapi.kaltura.com/index.php']").offset().left - 170);
			}		
		},
		initVideoWall: function(){
			$("#header").css("position","absolute");
			$("body").css("background","");
			$("body").css("background-color","white");
			$("#bodyRender").animate({
					paddingTop: '+=130px'
			}, 1000);
		},
		openVideoWall: function(){
			$("#bodyRender").animate({
				paddingTop: '+=700px'
			}, 1000);
		},
		closeVideoWall: function(){
			$("#bodyRender").animate({
				paddingTop: '-=700px'
			}, 1000);
		}
    }
}

$(document).ready(function(){
	var swfObject = document.createElement('script');
	swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/jquery.sticky.js';
	document.getElementsByTagName('head')[0].appendChild(swfObject);
	
	DygDFP.Brand.StarTVNEW.init();
	$(window).resize(function(){
		//console.log(window.innerWidth);
		if(window.innerWidth > 1620 ){
			DygDFP.PageSkin.containerWidth = 1560;
		}
		else if(window.innerWidth <= 1620 && window.innerWidth>1200) {
			DygDFP.PageSkin.containerWidth = 1140;
		}
		else if(window.innerWidth <= 1200){
			DygDFP.PageSkin.containerWidth = 940;
		}
		DygDFP.PageSkin.resize();
	});

	$(window).scroll(function(){
		var toTopHeight = $('.social').outerHeight() + $('.navigation').outerHeight();

		if($(window).scrollTop() >= toTopHeight)
		{
			var topHeight = $('.navigation').outerHeight();
			$("#LeftSkin").css("position","fixed");
			$("#LeftSkin").css("top",topHeight);
			$("#RightSkin").css("position","fixed");
			$("#RightSkin").css("top",topHeight);
		}
		else{
			$("#LeftSkin").css("position","absolute");
			$("#LeftSkin").css("top", toTopHeight );
			$("#RightSkin").css("position","absolute");
			$("#RightSkin").css("top", toTopHeight );
		}
	});



});