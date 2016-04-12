DygDFP.Brand = {
    CNTraveler: {
        init: function () {
			//DygDFP.section ='Anasayfa';
			if(DygDFP.section == 'Þimdi'){
				DygDFP.section ='Nereye';
			}
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
					gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/CNTraveler/'+DygDFP.section+'/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[1] = googletag.defineOutOfPageSlot('/37011203/Web/CNTraveler/'+DygDFP.section+'/LDB', 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					//gptadslots[1] = googletag.defineSlot('/37011203/Web/CNTraveler/'+DygDFP.section+'/LDB',[[970,90],[970,250]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/Web/CNTraveler/'+DygDFP.section+'/SKIN', 'div-PageSkin').setTargeting('pos', ['skin']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[3] = googletag.defineSlot('/37011203/Web/CNTraveler/'+DygDFP.section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[4] = googletag.defineOutOfPageSlot('/37011203/Web/CNTraveler/' + DygDFP.section + '/MSTHD-1', 'div-Masthead-1').setTargeting('pos', ['mst1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[5] = googletag.defineOutOfPageSlot('/37011203/Web/CNTraveler/' + DygDFP.section + '/MSTHD-2', 'div-Masthead-2').setTargeting('pos', ['mst2']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[6] = googletag.defineOutOfPageSlot('/37011203/Web/CNTraveler/' + DygDFP.section + '/SPC', 'div-Spc').setTargeting('pos', ['spc']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				
				googletag.pubads().addEventListener('slotRenderEnded', function (event) {
					if (event.slot === gptadslots[1]) {
						if (!event.isEmpty) {

							jQuery("#top_banner_id").parent().remove();
							jQuery("#div-Tepe_728x90").show();
							var theHeight = 250;
							//jQuery(".parallax-block").css("margin-top",theHeight);
							if((DygDFP.section == 'Nereye') || (DygDFP.section == 'Neden') || (DygDFP.section == 'Ne') || (DygDFP.section == 'Nasil') || DygDFP.section== 'Þimdi') {
								setTimeout(function () {
									jQuery('#wrapper').css('margin-top', theHeight);
									jQuery('#page_caption').css('padding-top', theHeight);
									jQuery('.parallax_overlay_header').css('top', theHeight);
									jQuery('.parallax-block').css('top', theHeight);
									jQuery('#div-Tepe_728x90').css('position', 'relative');
									jQuery('#div-Tepe_728x90').css('z-index', '500');
									jQuery('.header_style_wrapper').css('margin-top', '-257px');
								}, 1000);
								setInterval(function () {
									jQuery('.page_title_wrapper').css('margin-top', '229px');
								}, 100);

							}
						}
					}
					else if (event.slot === gptadslots[4]) {
						if (!event.isEmpty) {
							if(jQuery(".ppb_tour").length > 0){
								jQuery(".ppb_tour").removeClass("withpadding");
								jQuery(".ppb_tour").css("padding-top",10);
								jQuery("#mastheadDiv").css("padding-bottom",10);
							}
							else if(jQuery(".inner_wrapper").length > 0){
								jQuery("#mastheadDiv").css("padding-top",10);	
							}
						}
					}
					else if(event.slot === gptadslots[3]){
						if(!event.isEmpty){
							
							jQuery(".dfp_div_3").after(jQuery(".dfp_div_3").clone().removeClass('dfp_div_3'));
							setTimeout(function(){
								jQuery(".dfp_div_3>.one_third").html(jQuery("#div-300x250_Ros-1").html());
								jQuery(".dfp_div_3").css("height",320);
								jQuery(".dfp_div_3").css("background-color","black");
								jQuery(".dfp_div_3").css("padding-top","69px");
								
								if(DygDFP.section == "Nereye" || DygDFP.section == "Neden" || DygDFP.section == "Nasil"){
									jQuery(".dfp_div_3").css("margin-bottom",jQuery(".thumb_content").outerHeight());
								}
								
								var jQuerycontainer = jQuery('#portfolio_filter_wrapper, .portfolio_filter_wrapper');
								jQuerycontainer.isotope('reloadItems')
								jQuery(window).resize();
								jQuery("#div-300x250_Ros-1").remove();
							},2000);
						}
					}
				});

				googletag.pubads().enableSingleRequest();
				googletag.pubads().enableAsyncRendering();
				googletag.enableServices();
			});

			DygDFP.PageSkin.containerWidth = 970;
			DygDFP.LeaderBoard.backgroundColor = "#FFF";

			jQuery('.header_style_wrapper').after("<div id='mastheadDiv'></div>");
			DygDFP.Masthead.appendSelector = jQuery("#mastheadDiv");

			jQuery(document).ready(function () {				
				jQuery("body").append("<div id='div-interstitial' class='DFP_INS' style='display:none'></div>");
				jQuery("body").prepend("<div id='div-Tepe_728x90' class='DFP_LDB' style='height:0px'></div>");
				jQuery('.header_style_wrapper').after("<div id='div-Masthead-1'></div>");
				jQuery("body").append("<div id='div-300x250_Ros-1'></div>");
				
				googletag.cmd.push(function () { googletag.display('div-Tepe_728x90'); });
				googletag.cmd.push(function () { googletag.display('div-interstitial'); });
				googletag.cmd.push(function () { googletag.display('div-Masthead-1'); });
				googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
			});
        },
        preparePageSkin: function (hasTopImage) {
            DygDFP.PageSkin.changeMarginTop();
			
			if(hasTopImage){
				jQuery("#main-container").animate({
						marginTop: '+=30px'
					}, 300, function () {
						DygDFP.PageSkin.show(true);
					});
			}
			else{
				DygDFP.PageSkin.show(false);
			}
        },
		preparePageSkinPosition : function(){
		
		}
    }
}


jQuery(document).ready(function(){
	DygDFP.Brand.CNTraveler.init();
});
