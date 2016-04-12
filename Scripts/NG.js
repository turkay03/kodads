DygDFP.Brand = {
    NG: {
        init: function () {			

			//DygDFP.section = 'Test';
			
			googletag.cmd.push(function () {
				if (DygDFP.device.isPhone()) {
				
					gptadslots[0] = googletag.defineSlot('/37011203/Mobile/NG_App/Mobile_Site/' + DygDFP.section + '/INS', [[320, 480]],'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[1] = googletag.defineSlot('/37011203/Mobile/NG_App/Mobile_Site/' + DygDFP.section + '/LDB', [[320, 50]], 'div-Tepe_320x50').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				else if (DygDFP.device.isTablet()) {
					gptadslots[0] = googletag.defineSlot('/37011203/Mobile/NG_App/Mobile_Site/' + DygDFP.section + '/INS', [[768, 1024]], 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[1] = googletag.defineSlot('/37011203/Mobile/NG_App/Mobile_Site/' + DygDFP.section + '/LDB', [[728, 90]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					//gptadslots[2] = googletag.defineSlot('/37011203/Mobile/NTV_App/Mobile_Site/' + DygDFP.section + '/MPU1', [[300, 250]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				else {
					gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[1] = googletag.defineOutOfPageSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/LDB', 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/SKIN', 'div-PageSkin').setTargeting('pos', ['skin']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[3] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[4] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[5] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/MPU2', [[300, 250], [300, 600]], 'div-300x250_Ros-2').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[6] = googletag.defineOutOfPageSlot('/37011203/Web/'+DygDFP.siteName+'/' + DygDFP.section + '/MPU_Fix', 'div-MPU_Fix').setTargeting('pos', ['mpu_fix']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				
				googletag.pubads().addEventListener('slotRenderEnded', function (event) {
					if (event.slot === gptadslots[1]) {
						if (!event.isEmpty) {
								$("header").css("padding-top","0px");
								$("header").css("position","relative");
								$("main").css("margin-top","0px");
								$("#div-Tepe_728x90").show();
							setTimeout(function () {
								DygDFP.PageSkin.marginTop = $("header").outerHeight();
								$("#div-PageSkin_rev").attr("id", "div-PageSkin");
								googletag.cmd.push(function () { googletag.display('div-PageSkin'); });
							}, 1000);
							
								$("header .adsect").remove();	
						} else {
							setTimeout(function () {
								DygDFP.PageSkin.marginTop = $("header").outerHeight();
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
			DygDFP.LeaderBoard.backgroundColor = "#111";
			$("main").before("<div id='mastheadDiv' style='margin-top:-10px'></div>");
			DygDFP.Masthead.appendSelector = $("#mastheadDiv");

			$(document).ready(function () {
			
			if	(DygDFP.device.isPhone())
			{
				$("body").append("<div id='div-interstitial' class='DFP_INS' style='display:none'></div>");
				$("body").prepend("<div id='div-Tepe_320x50' style='display:none'></div>");
				
				googletag.cmd.push(function () { googletag.display('div-interstitial'); });
				googletag.cmd.push(function () { googletag.display('div-Tepe_320x50'); });
			}
			else if (DygDFP.device.isTablet())
			{
				$("body").append("<div id='div-interstitial' class='DFP_INS' style='display:none'></div>");
				$("body").prepend("<div id='div-Tepe_728x90' style='display:none'></div>");
				
				googletag.cmd.push(function () { googletag.display('div-interstitial'); });
				googletag.cmd.push(function () { googletag.display('div-Tepe_728x90'); });
			}
			else
			{
				$("body").prepend("<div class='DFP_SKIN'></div>");
				
				$("body").append("<div id='div-PageSkin_rev' style='display:none'></div>");
				$("body").append("<div id='div-interstitial' class='DFP_INS' style='display:none'></div>");
				$("header").prepend("<div id='div-Tepe_728x90' class='DFP_LDB' style='display:none;height:0px'></div>");
                $("body").append("<div id='div-Masthead'></div>");
				$("aside").prepend("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px'></div>");
				$("aside").prepend("<div id='div-MPU_Fix' style='display:none'></div>");
				
				
				$(".populars").after("<div id='div-300x250_Ros-2' style='display:none;margin-top:10px;clear:both;'></div>");
				
				googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
				googletag.cmd.push(function () { googletag.display('div-300x250_Ros-2'); });
				googletag.cmd.push(function () { googletag.display('div-MPU_Fix'); });
				googletag.cmd.push(function () { googletag.display('div-Tepe_728x90'); });
				googletag.cmd.push(function () { googletag.display('div-interstitial'); });
                googletag.cmd.push(function () { googletag.display('div-Masthead'); });
			}
			
				
			});
        },
        preparePageSkin: function (hasTopImage) {
            DygDFP.PageSkin.changeMarginTop();
			
			if(hasTopImage){
				$(".divYellowStripe").hide();
				$("main").animate({
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
	DygDFP.Brand.NG.init();	
});