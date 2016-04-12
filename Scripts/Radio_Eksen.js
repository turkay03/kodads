DygDFP.Brand = {
    Radio_Eksen: {
        init: function () {
			googletag.cmd.push(function () {
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
					gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/Radio_Eksen/'+DygDFP.section+'/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[1] = googletag.defineOutOfPageSlot('/37011203/Web/Radio_Eksen/'+DygDFP.section+'/LDB', 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/Web/Radio_Eksen/'+DygDFP.section+'/SKIN', 'div-PageSkin').setTargeting('pos', ['skin']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					if($(".player-banner-bottom").length > 0 || $(".right-now").length >0){
						gptadslots[3] = googletag.defineSlot('/37011203/Web/Radio_Eksen/'+DygDFP.section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}		
					
					gptadslots[4] = googletag.defineOutOfPageSlot('/37011203/Web/Radio_Eksen/' + DygDFP.section + '/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				
				googletag.pubads().addEventListener('slotRenderEnded', function (event) {
					if (event.slot === gptadslots[1]) {
						if (!event.isEmpty) {
								$("#div-Tepe_728x90").show();
							setTimeout(function () {
								DygDFP.PageSkin.marginTop = $("#main-header").outerHeight() - 5;
								$("#div-PageSkin_rev").attr("id", "div-PageSkin");
								googletag.cmd.push(function () { googletag.display('div-PageSkin'); });
							}, 1000);
						} else {
							setTimeout(function () {
								DygDFP.PageSkin.marginTop = $("#main-header").outerHeight() - 5;
								$("#div-PageSkin_rev").attr("id", "div-PageSkin");
								googletag.cmd.push(function () { googletag.display('div-PageSkin'); });
							}, 1000);
						}
					}
				});

				googletag.pubads().enableSingleRequest();
				googletag.pubads().enableAsyncRendering();
				googletag.enableServices();
			});

			DygDFP.PageSkin.containerWidth = 970;
			DygDFP.LeaderBoard.backgroundColor = "#000";
			$("#main-header").after("<div id='mastheadDiv'></div>");
			DygDFP.Masthead.appendSelector = $("#mastheadDiv");

			$(document).ready(function () {				
				$("body").append("<div id='div-PageSkin_rev' style='display:none'></div>");
				$("body").append("<div id='div-interstitial' class='DFP_INS' style='display:none'></div>");
				$("header").prepend("<div id='div-Tepe_728x90' class='DFP_LDB' style='display:none;height:0px'></div>");
                $("body").append("<div id='div-Masthead'></div>");
				if($(".player-banner-bottom").length > 0){
					$(".player-banner-bottom").append("<div id='div-300x250_Ros-1' style='display:none'></div>");
				googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
				}
				else if($(".right-now").length >0){
					$(".right-now").after("<div id='div-300x250_Ros-1' style='display:none'></div>");
				googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
				}			
				
				googletag.cmd.push(function () { googletag.display('div-Tepe_728x90'); });
				googletag.cmd.push(function () { googletag.display('div-interstitial'); });
                googletag.cmd.push(function () { googletag.display('div-Masthead'); });
			});
        },
        preparePageSkin: function (hasTopImage) {
            DygDFP.PageSkin.changeMarginTop();
			
			if(hasTopImage){
				$("#main-container").animate({
						marginTop: '+=30px'
					}, 300, function () {
						DygDFP.PageSkin.show(true);
					});
			}
			else{
				DygDFP.PageSkin.show(false);
			}
        },
		prepareVPaid: function(){
			$("#extendVidPanel").css("top",0);
		}	
    }
}

$(document).ready(function(){
	DygDFP.Brand.Radio_Eksen.init();
});