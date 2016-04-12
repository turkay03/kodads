DygDFP.Brand = {
    StarTV: {
		OldPageSkinTop: 0,
        init: function () {
		
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
			
		//DygDFP.section = "Test";
			
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
					gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/StarTV/'+DygDFP.section+'/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[1] = googletag.defineSlot('/37011203/Web/StarTV/'+DygDFP.section+'/LDB',[[728, 90], [970, 90]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/Web/StarTV/'+DygDFP.section+'/SKIN', 'div-PageSkin').setTargeting('pos', ['skin']).addService(googletag.companionAds()).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					if($(".adv300x250 .content").length > 0 || $(".adv300x250").length > 0){
						gptadslots[3] = googletag.defineSlot('/37011203/Web/StarTV/'+DygDFP.section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);					
					}
                    gptadslots[4] = googletag.defineOutOfPageSlot('/37011203/Web/StarTV/'+DygDFP.section+'/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[5] = googletag.defineOutOfPageSlot('/37011203/Web/StarTV/'+DygDFP.section+'/SRVY', 'div-Srvy').setTargeting('pos', ['srvy']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					
					if(DygDFP.section == 'Anasayfa'){
						gptadslots[8] = googletag.defineOutOfPageSlot('/37011203/Web/StarTV/'+DygDFP.section+'/RM', 'div-richMedia').setTargeting('pos', ['rm']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
				}
				
				var pageSkinSlot;
				googletag.pubads().addEventListener('slotRenderEnded', function (event) {
					if (event.slot === gptadslots[1]) {
						if (!event.isEmpty) {
							$("#div-Tepe_728x90").css("height",90);
							DygDFP.PageSkin.marginTop = $("#header").outerHeight() + 90 + $("#subPagesHeader").outerHeight();
							var header = $("#header").outerHeight() + 90;
							
							if($("#bodyRender").attr("data-padding") == undefined){
								$("#bodyRender").attr("data-padding", header);
								$("#bodyRender").css("padding-top", header);
							}
							
							$("#header").css("position","absolute");
							$("#header").css("height",189);
							DygDFP.VideoWall.top = DygDFP.PageSkin.marginTop;
						} else {
							DygDFP.PageSkin.marginTop = $("#header").outerHeight() + $("#subPagesHeader").outerHeight();
							DygDFP.VideoWall.top = DygDFP.PageSkin.marginTop;
							DygDFP.Brand.StarTV.OldPageSkinTop = DygDFP.PageSkin.marginTop;
							DygDFP.PageSkin.changeMarginTop();
						}
					}
					else if (event.slot === gptadslots[2]) {
						googletag.companionAds().setRefreshUnfilledSlots(false);
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
							$("body").css("background", "white");
							$("#header").css("z-index", "99999");
							if($("#subPagesHeader").length > 0){
								$("#mastheadDiv").css("margin-top",-15);
							}
							else{
								$("#mastheadDiv").css("margin-top",15);
							}
							$("#mastheadDiv").css("margin-bottom",5);
						}
					}
				});

				if($("#player").length > 0){
					//googletag.pubads().disableInitialLoad();
				}
				googletag.pubads().enableVideoAds();
				googletag.pubads().enableSingleRequest();
				googletag.pubads().enableAsyncRendering();
				googletag.enableServices();
			});

			DygDFP.PageSkin.containerWidth = ($("#page_barouselthslide").length>0)?980:990;
			DygDFP.LeaderBoard.backgroundColor = "#222222";
			
			if($("#subPagesHeader").length > 0){
				$("#content").prepend("<div id='mastheadDiv'></div>");
			}
			else{
				$(".DFP_SKIN").prepend("<div id='mastheadDiv'></div>");
			}
			
			DygDFP.Masthead.appendSelector = $("#mastheadDiv");
			DygDFP.PageSkin.appendSelector = $(".DFP_SKIN");
			DygDFP.VideoWall.appendSelector = '.DFP_SKIN';
			DygDFP.VideoWall.top = 100;
			DygDFP.allowAnimate = false;

			$(document).ready(function () {		
				if($("#header").length > 0){
					$("#header").after("<div id='div-PageSkin' style='position:fixed;width:1px;height:1px;top:0'></div>")
				}
				$("body").prepend("<div id='div-Srvy' style='height:1px;width:1px;position:fixed;bottom:0'></div>");
				$("body").prepend("<div id='div-interstitial' class='DFP_INS' style='height:1px;width:1px;position:fixed;top:0'></div>");
				$("#header").prepend("<div id='div-Tepe_728x90' class='DFP_LDB' style='text-align:center'></div>");
				
				if($("#subPagesHeader").length > 0){
					$("#content").prepend("<div id='div-Masthead' style='width:1px;height:1px;margin-top:-15px;margin-bottom:20px;z-index:20'></div>");
				}
				else{
					$("#mastheadDiv").after("<div id='div-Masthead' style='width:1px;height:1px;margin-top:5px;margin-bottom:5px;z-index:20'></div>");
				}
				
				if($(".adv300x250 .content").length > 0){
					$(".adv300x250 .content").append("<div id='div-300x250_Ros-1' style='display:none'></div>");
					googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
				}
				else if($(".adv300x250").length > 0){
					$(".adv300x250").append("<div id='div-300x250_Ros-1' style='display:none'></div>");
					googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
				}
				
				$("#div-Masthead").css("text-align","center");
				
				if(DygDFP.section == "Anasayfa"){
					$("body").append("<div id='div-richMedia' style='display:none'></div>");
					googletag.cmd.push(function () { googletag.display('div-richMedia'); });
				}
				
				googletag.cmd.push(function () { googletag.display('div-Masthead'); });
				googletag.cmd.push(function () { googletag.display('div-PageSkin'); });
				googletag.cmd.push(function () { googletag.display('div-Srvy'); });
				googletag.cmd.push(function () { googletag.display('div-Tepe_728x90'); });
				googletag.cmd.push(function () { googletag.display('div-interstitial'); });
			});
        },
        preparePageSkin: function (hasTopImage) {
            DygDFP.PageSkin.changeMarginTop();
			$("#div-PageSkin").css("top", DygDFP.Brand.StarTV.OldPageSkinTop);
			if(hasTopImage){
				if($("#page_barouselthslide").length > 0){
					$("#page_barouselthslide").animate({
						marginTop: '+=50px'
					}, 300, function () {
						DygDFP.PageSkin.show(true);
					});
				}
				else if($("#content").length > 0){
				$("#content").animate({
						paddingTop: '+=34px'
					}, 300, function () {
						DygDFP.PageSkin.show(true);
					});
				}
			}
			else{
				DygDFP.PageSkin.show(false);
			}
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
	
	$(".diziler ul li").css("width",220);
	$(".diziler .overNav").css("width",770);
	
	
	$("li[rel='457'] a").css("font-size","12px");
	
	//$("li[rel='423'] a").append("<img src='http://img-cdn.startv.com.tr/arko-nem-logo.png' alt='' style='position:absolute;margin-top:4px;margin-left:10px'/>")
	
	DygDFP.Brand.StarTV.init();

	$(window).scroll(function(){
		if($("#div-Tepe_728x90").height() < 10){
			if($(window).scrollTop() > 38){
				$("#loginContainer").hide();		
				$("#header").css("height", 102-38)
			}
			else{
				$("#loginContainer").show();
				$("#header").css("height", 102)
			}
		}	
	});
});