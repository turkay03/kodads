DygDFP.Brand = {
    CNBCe_Finans: {
        init: function () {
				//alert('call');
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
				
				
				//googletag.pubads().setTargeting('kralcat', tags);

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
					gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/CNBC-e_Finans/'+DygDFP.section+'/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[1] = googletag.defineOutOfPageSlot('/37011203/Web/CNBC-e_Finans/'+DygDFP.section+'/LDB', 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/Web/CNBC-e_Finans/'+DygDFP.section+'/SKIN', 'div-PageSkin').setTargeting('pos', ['skin']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					
					alert(DygDFP.section);
					if(DygDFP.Section != 'Dijital_Radyolar'){
						gptadslots[3] = googletag.defineSlot('/37011203/Web/CNBC-e_Finans/'+DygDFP.section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
					
					gptadslots[4] = googletag.defineOutOfPageSlot('/37011203/Web/CNBC-e_Finans/' + DygDFP.section + '/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				
				googletag.pubads().addEventListener('slotRenderEnded', function (event) {
					if (event.slot === gptadslots[1]) {
						if (!event.isEmpty) {
							setTimeout(function () {
								DygDFP.PageSkin.marginTop = $(".bar-wrapper").outerHeight() + $(".header-wrapper").outerHeight() + $(".nav-wrapper").outerHeight() + $("#div-Tepe_728x90").outerHeight();
								$("#div-PageSkin_rev").attr("id", "div-PageSkin");
								googletag.cmd.push(function () { googletag.display('div-PageSkin'); });
							}, 1000);
						} else {
							setTimeout(function () {
								DygDFP.PageSkin.marginTop = $(".bar-wrapper").outerHeight() + $(".header-wrapper").outerHeight() + $(".nav-wrapper").outerHeight();
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

			DygDFP.PageSkin.containerWidth = 960;
			DygDFP.LeaderBoard.backgroundColor = "#e7e7e7";
			DygDFP.Masthead.appendSelector = $("nav.main").parent().find(".wrapper");

			$(document).ready(function () {
				$("body").prepend("<div class='DFP_SKIN'></div>");
				
				$("body").append("<div id='div-PageSkin_rev' style='display:none'></div>");
				$("body").append("<div id='div-interstitial' class='DFP_INS' style='display:none'></div>");
				$("#header_rklm").append("<div id='div-Tepe_728x90' class='DFP_LDB' style='display:none'></div>");
                $("body").append("<div id='div-Masthead'></div>");
				
				if(DygDFP.Section != 'Dijital_Radyolar')
				{
					$("#rklm_300x250_1").append("<div id='div-300x250_Ros-1' style='display:none'></div>");
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
				if($("#main-carousel").lenght > 0){
					$("#main-carousel").eq(0).animate({
						marginTop: '+=50px'
					}, 300, function () {
						DygDFP.PageSkin.show(true);
					});
				}
				else{
					$(".main-content-wrapper").eq(0).animate({
							marginTop: '+=50px'
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
			$("#extendVidPanel").css("top",0);
		}	
    }
}

$(document).ready(function(){
	DygDFP.Brand.CNBCe_Finans.init();
});