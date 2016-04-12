DygDFP.Brand = {
    Tvyo: {
        init: function () {
			googletag.cmd.push(function () {
				
				var tags = Array(100);
				
				var arrayIndex = 0;
				if (DygDFP.target != "") {
					if(DygDFP.target.indexOf(',') > -1){
						for (var i = 0; i < DygDFP.target.split(',').length; i++) {
							arrayIndex++;
							tags[arrayIndex] = DygDFP.target.split(',')[i];
						}
					}
					else{
						tags[arrayIndex] = DygDFP.target;
					}
				}

				if (DygDFP.categories != "") {
					for (var i = 0; i < DygDFP.categories.split(',').length; i++) {
						arrayIndex++;
						tags[arrayIndex] = DygDFP.categories.split(',')[i];
					}
				}
				
				if(DygDFP.section == 'Canli_TV'){
					googletag.pubads().setTargeting('tvyo_canliyayin_cat', tags);
				}
				else if(DygDFP.section == 'Dizi'){
					googletag.pubads().setTargeting('tvyo_dizi_cat', tags);
				}
				else if(DygDFP.section == 'Kanallar'){
					googletag.pubads().setTargeting('tvyo_kanal_cat', tags);
				}
				else if(DygDFP.section == 'Spor'){
					googletag.pubads().setTargeting('tvyo_spor_cat', tags);
				}		
			
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
					gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[1] = googletag.defineOutOfPageSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/LDB', 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.companionAds()).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/SKIN', 'div-PageSkin').setTargeting('pos', ['skin']).addService(googletag.companionAds()).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[3] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.companionAds()).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[4] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				
				googletag.pubads().addEventListener('slotRenderEnded', function (event) {
					if (event.slot === gptadslots[1]) {
						if (!event.isEmpty) {
								$("#div-Tepe_728x90").show();
							setTimeout(function () {
								if($("#module_vod_header_1").length >0){
				DygDFP.PageSkin.marginTop = $("header").outerHeight() + $("#div-Tepe_728x90").outerHeight() + $("#mastheadDiv").outerHeight() ;
								}
								else{									
									DygDFP.PageSkin.marginTop = $(".DFP_SKIN").offset().top + 3;
								}
							
							
								$("#div-PageSkin_rev").attr("id", "div-PageSkin");
								googletag.cmd.push(function () { googletag.display('div-PageSkin'); });
							}, 1000);
						} else {
							setTimeout(function () {
								if($("#module_vod_header_1").length >0){
									DygDFP.PageSkin.marginTop = $("header").outerHeight() + $("#div-Tepe_728x90").outerHeight() + $("#mastheadDiv").outerHeight() ;
								}
								else{									
									DygDFP.PageSkin.marginTop = $(".DFP_SKIN").offset().top + 3;
								}
								
								$("#div-PageSkin_rev").attr("id", "div-PageSkin");
								googletag.cmd.push(function () { googletag.display('div-PageSkin'); });
							}, 1000);
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

			DygDFP.PageSkin.containerWidth = 970;
			DygDFP.LeaderBoard.backgroundColor = "#111";
			$("body").prepend("<div id='mastheadDiv' class='TVYO_DFP_Tepe'></div>");
			DygDFP.Masthead.appendSelector = $("#mastheadDiv");

			$(document).ready(function () {
				$("body").append("<div id='div-PageSkin_rev' style='display:none'></div>");
				$("body").append("<div id='div-interstitial' class='DFP_INS' style='display:none'></div>");
				$("body").prepend("<div id='div-Tepe_728x90' class='DFP_LDB TVYO_DFP_Tepe' style='display:none;height:0px'></div>");
                $("body").prepend("<div id='div-Masthead' style='text-align:center'></div>");
				$(".sidebar").prepend("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px'></div>");				
				
				googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
				googletag.cmd.push(function () { googletag.display('div-Tepe_728x90'); });
				googletag.cmd.push(function () { googletag.display('div-interstitial'); });
                googletag.cmd.push(function () { googletag.display('div-Masthead'); });
				
				$("#mastheadPanel").css("margin-bottom",0);
			});
        },
        preparePageSkin: function (hasTopImage) {
            DygDFP.PageSkin.changeMarginTop();
			$(".top-shadow").remove();
			if(hasTopImage){
				if($("#module_vod_header_1").length > 0){
					$("#module_vod_header_1").animate({
							marginTop: '+=50px'
						}, 300, function () {
							DygDFP.PageSkin.show(true);
						});
				}
				else if($("body").hasClass("p-dizi-bolum-detay")){
				$("#p-home.DFP_SKIN").animate({
							paddingTop: '+=50px'
						}, 300, function () {
							DygDFP.PageSkin.show(true);
						});
				}
				else{
					$("#p-home .DFP_SKIN").animate({
							paddingTop: '+=50px'
						}, 300, function () {
							DygDFP.PageSkin.show(true);
						});
				}
			}
			else{
				DygDFP.PageSkin.show(false);
			}
        },
		preparePageSkinPosition : function(){
			if($("#module_vod_header_1").length >0){
				DygDFP.PageSkin.marginTop = $("header").outerHeight() + $("#div-Tepe_728x90").outerHeight() + $("#mastheadDiv").outerHeight() ;
			}
			else{									
				DygDFP.PageSkin.marginTop = $(".DFP_SKIN").offset().top + 3;
			}
			 DygDFP.PageSkin.changeMarginTop();
		},
		prepareVPaid: function(){
			$("#extendVidPanel").css("top",$("body object[data*='http://cdnapi.kaltura.com/index.php']").offset().top - 196);
			$("#extendVidPanel").css("left",$("body object[data*='http://cdnapi.kaltura.com/index.php']").offset().left - 171);
		}	
    }
}

$(document).ready(function(){
	DygDFP.Brand.Tvyo.init();
	//DygDFP.Survey.init('http://img-dygassets.mncdn.com/Files/Survey/',222,180, 'dfpSurvey-test18');
});