DygDFP.Brand = {
    NTVPara: {
        init: function () {

			if(DygDFP.section == "Video_Galeri"){
				DygDFP.section = "VideoGaleri";
			}
			else if(DygDFP.section == "Foto_Galeri"){
				DygDFP.section = "FotoGaleri";
			}
			else if(DygDFP.section == "Piyasa"){
				DygDFP.section = "Piyasalar";
			}
			
			//DygDFP.section = 'Test';
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
				
				googletag.pubads().setTargeting('ntvparacat', tags);

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

					gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/NTVPara/'+DygDFP.section+'/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[1] = googletag.defineSlot('/37011203/Web/NTVPara/'+DygDFP.section+'/LDB',[[728, 90], [970, 90]],'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/Web/NTVPara/'+DygDFP.section+'/SKIN', 'div-PageSkin').setTargeting('pos', ['skin']).addService(googletag.companionAds()).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[3] = googletag.defineSlot('/37011203/Web/NTVPara/'+DygDFP.section+'/HDR',[940, 40],'div-HDR_940x40').setTargeting('pos', ['hdr']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);

					if($("#sidebar_rklm2").length > 0){
						gptadslots[4] = googletag.defineSlot('/37011203/Web/NTVPara/'+DygDFP.section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
					
					gptadslots[5] = googletag.defineOutOfPageSlot('/37011203/Web/NTVPara/' + DygDFP.section + '/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					
					if($("#sidebar_rklm1").length > 0){
						gptadslots[6] = googletag.defineOutOfPageSlot('/37011203/Web/NTVPara/' + DygDFP.section + '/MPU_Fix', 'div-MPU_Fix').setTargeting('pos', ['mpu_fix']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					}
					
					if($("#tlb_rklm").length > 0){
						gptadslots[7] = googletag.defineOutOfPageSlot('/37011203/Web/NTVPara/'+DygDFP.section+'/TLB', 'div-tlb').setTargeting('pos', ['tlb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
					
					gptadslots[8] = googletag.defineOutOfPageSlot('/37011203/Web/NTVPara/'+DygDFP.section+'/SRVY', 'div-Srvy').setTargeting('pos', ['srvy']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				
				googletag.pubads().addEventListener('slotRenderEnded', function (event) {
					if (event.slot === gptadslots[1]) {
						if (!event.isEmpty) {
							$("#div-Tepe_728x90").show();
							$("#div-Tepe_728x90").css("height",90);
							$("#div-Tepe_728x90").css("text-align","center");
							DygDFP.PageSkin.marginTop = $("#stockMarket").outerHeight() + $("#mainMenu").outerHeight()+ $("#siteTools").outerHeight() + $("#div-Tepe_728x90").outerHeight();
						} else {
							DygDFP.PageSkin.marginTop = $("#stockMarket").outerHeight() + $("#mainMenu").outerHeight()+ $("#siteTools").outerHeight();
							DygDFP.PageSkin.changeMarginTop();
						}
					}
					else  if (event.slot === gptadslots[2]) {
						googletag.companionAds().setRefreshUnfilledSlots(false);
						if (!event.isEmpty){							
							$("#mastheadPanel").css("margin-top",60);
						}
					}
				});

				if($("#player").length > 0){
					//googletag.pubads().disableInitialLoad();
				}
				//googletag.companionAds().setRefreshUnfilledSlots(true);
				googletag.pubads().enableVideoAds();
				googletag.pubads().enableSingleRequest();
				googletag.pubads().enableAsyncRendering();
				googletag.enableServices();
			});

			DygDFP.PageSkin.containerWidth = 970;
			DygDFP.LeaderBoard.backgroundColor = "#e7e7e7";
			DygDFP.VideoWall.appendSelector = 'body';
			DygDFP.PushDown.appendSelector = 'body';
			DygDFP.VideoWall.top = 192;
			
			$("#mainHeader").after('<div id="masthead" style="margin-bottom:10px"></div>');
			
			DygDFP.Masthead.appendSelector = $("#masthead");

			$(document).ready(function () {
				if(DygDFP.device.isWeb())
				{
					$('#mainMenu')
						.css("margin-top", "0px")
						.find('li')
							.css('padding', '0')
							.find('a')
								.css({ 'padding': '12px 8px', 'line-height' : '16px' })
								.end()
							.filter('.vodafone')
								.css('padding-left', '53px')
								.end()
							.end()
						.after("<div id='div-HDR_940x40' style='margin-bottom:10px; margin-top: 5px; width: 940px;height: 40px;display: none;'></div>");
				}


				$("body").prepend("<div class='DFP_SKIN'></div>");
				
				$("body").prepend("<div id='div-PageSkin' style='width:1px;height:1px;position:fixed;top:0'></div>");
				googletag.cmd.push(function () { googletag.display('div-PageSkin'); });
				$("body").prepend("<div id='div-interstitial'></div>");
				$("#header_rklm").append("<div id='div-Tepe_728x90' style='height:0px'></div>");
                $("#mainHeader").after("<div id='div-Masthead'></div>");
				if($("#sidebar_rklm2").length > 0){
					$("#sidebar_rklm2").append("<div id='div-300x250_Ros-1' style='margin-top:10px'></div>");
				}
				
				if($("#sidebar_rklm1").length > 0){
					$("#sidebar_rklm1").append("<div id='div-MPU_Fix' class='DFP_MPU_FIX'></div>");
				}
				
				if($("#tlb_rklm").length > 0){
					$("#tlb_rklm").append("<div id='div-tlb' class='DFP_TLB' style='margin-bottom:10px'></div>");
					googletag.cmd.push(function () { googletag.display('div-tlb'); });
				}
				
				if(DygDFP.section == "Anasayfa"){
					$("body").append("<div id='div-richMedia' style='display:none'></div>");
					googletag.cmd.push(function () { googletag.display('div-richMedia'); });
				}
				
				$("body").append("<div id='div-Srvy' style='display:none'></div>");
				googletag.cmd.push(function () { googletag.display('div-Srvy'); });
				
				googletag.cmd.push(function () { googletag.display('div-Tepe_728x90'); });
				googletag.cmd.push(function () { googletag.display('div-interstitial'); });
                googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
                googletag.cmd.push(function () { googletag.display('div-MPU_Fix'); });
                googletag.cmd.push(function () { googletag.display('div-Masthead'); });
			});
        },
        preparePageSkin: function (hasTopImage) {
			$("#RightSkin").css("width",$("#RightSkin").width()+10);
			$("#mainFooter").css("z-index",99999);
			$("#mainFooter").css("position","relative");
			
			if(hasTopImage){
				 DygDFP.PageSkin.changeMarginTop();
				$("#main").animate({
						marginTop: '+=20px'
					}, 300, function () {
						DygDFP.PageSkin.show(true);
					});
			}
			else{
				DygDFP.PageSkin.marginTop = DygDFP.PageSkin.marginTop + 3;
				DygDFP.PageSkin.changeMarginTop();
				DygDFP.PageSkin.show(false);
			}
        },
        prepareParalax: function () {
            DygDFP.Paralax.changeMarginTop();
			DygDFP.Paralax.show(true);
			$(".site-info").css("position","absolute");
			$(".site-info").css("z-index","99999");
        },
		scrollParalax : function(){
			if($(window).scrollTop() > DygDFP.PageSkin.marginTop){
				$("#LeftSkin").css("top","0px");
				$("#RightSkin").css("top","0px");
				$("#RightSkin").css("position","fixed");
				$("#LeftSkin").css("position","fixed");
			}
			else{
				$("#RightSkin").css("position","absolute");
				$("#LeftSkin").css("position","absolute");
				DygDFP.Paralax.changeMarginTop();
			}
		},
		prepareVPaid: function(){
			$("#extendVidPanel").css("top",0);
			$("#extendVidPanel").css("left",$("body object[data*='http://cdnapi.kaltura.com/index.php']").offset().left - 175);
		},
		initVideoWall: function(){
			$(".DFP_SKIN").css("z-index","9999");
			$(".DFP_SKIN").css("position","relative");
			$(".grid_4").css("z-index","9999");
			$(".grid_4").css("position","relative");
			
			$("body").css("background","");
			$("body").css("background-color","white");
			
			$("#main").animate({
					marginTop: '+=170px'
			}, 1000);
		},
		openVideoWall: function(){
			$("#main").animate({
				marginTop: '+=700px'
			}, 1000);
		},
		closeVideoWall: function(){
			$("#main").animate({
				marginTop: '-=700px'
			}, 1000);
		}
    }
}

$(document).ready(function(){
	DygDFP.Brand.NTVPara.init();
	
	//$(".miniAccordion .firstMagicCont").after('<div style="height: 387px;width: 296px;overflow:hidden;margin-bottom: 10px;"><iframe style="left: -11px;position: relative;top: -12px;overflow: hidden;width: 334px;" src="https://docs.google.com/forms/d/1qcMRHF_6_dVa_xKHh6JzEg6x0He2s2r__ZB19M0bqco/viewform?embedded=true" width="340" height="400" frameborder="0" marginheight="0" marginwidth="0">Yükleniyor...</iframe></div>')
});