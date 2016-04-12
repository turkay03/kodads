DygDFP.Brand = {
    Vogue: {
        init: function () {
			googletag.cmd.push(function () {
				var section = DygDFP.section;
				//DygDFP.section = 'Test';
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
				
				googletag.pubads().setTargeting('vogue_cat', tags);	
			
				if (DygDFP.device.isPhone()) {
					gptadslots[0] = googletag.defineSlot('/37011203/Mobile/Vogue/Mobile_Site/' + DygDFP.section + '/INS', [[320, 480]],'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[1] = googletag.defineSlot('/37011203/Mobile/Vogue/Mobile_Site/' + DygDFP.section + '/LDB', [[320, 50]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[2] = googletag.defineSlot('/37011203/Mobile/Vogue/Mobile_Site/' + DygDFP.section + '/MPU1', [[300, 250]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[3] = googletag.defineSlot('/37011203/Mobile/Vogue/Mobile_Site/' + DygDFP.section + '/MPU2', [[300, 250]], 'div-300x250_Ros-2').setTargeting('pos', ['mpu2']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[4] = googletag.defineSlot('/37011203/Mobile/Vogue/Mobile_Site/' + DygDFP.section + '/MPU3', [[300, 250]], 'div-300x250_Ros-3').setTargeting('pos', ['mpu3']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[5] = googletag.defineSlot('/37011203/Mobile/Vogue/Mobile_Site/' + DygDFP.section + '/MPU4', [[300, 250]], 'div-300x250_Ros-4').setTargeting('pos', ['mpu4']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[6] = googletag.defineSlot('/37011203/Mobile/Vogue/Mobile_Site/' + DygDFP.section + '/MPU5', [[300, 250]], 'div-300x250_Ros-5').setTargeting('pos', ['mpu5']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					
				}
				else if (DygDFP.device.isTablet()) {
					gptadslots[0] = googletag.defineSlot('/37011203/Mobile/Vogue/Mobile_Site/' + DygDFP.section + '/INS', [[768, 1024]], 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[1] = googletag.defineSlot('/37011203/Mobile/Vogue/Mobile_Site/' + DygDFP.section + '/LDB', [[728, 90]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[2] = googletag.defineSlot('/37011203/Mobile/Vogue/Mobile_Site/' + DygDFP.section + '/MPU1', [[300, 250]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				else {
					gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					if($("#LDB1-AD").length > 0){
						gptadslots[1] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/LDB_1',[[728, 90], [970, 90]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
					
					if($("#LDB2-AD").length > 0){
						gptadslots[2] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/LDB_2',[[728, 90], [970, 90]], 'div-Tepe_728x90-1').setTargeting('pos', ['ldb-1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
					
					if($("#LDB3-AD").length > 0){
						gptadslots[3] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/LDB_3',[[728, 90], [970, 90]], 'div-Tepe_728x90-2').setTargeting('pos', ['ldb-2']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
					
					if($("#sideAD1").length > 0){
						gptadslots[4] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
						gptadslots[6] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/MPU2', [[300, 250], [300, 600]], 'div-300x250_Ros-2').setTargeting('pos', ['mpu2']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
					else if($(".fotogaleri-detay-300x250").length > 0){
						gptadslots[4] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
					
					if($("#sideAD2").length > 0){
						gptadslots[7] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/MPU3', [[300, 250], [300, 600]], 'div-300x250_Ros-3').setTargeting('pos', ['mpu3']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
						gptadslots[8] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/MPU4', [[300, 250], [300, 600]], 'div-300x250_Ros-4').setTargeting('pos', ['mpu4']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
					
					if($("#sideAD3").length > 0){
						gptadslots[9] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/MPU5', [[300, 250], [300, 600]], 'div-300x250_Ros-5').setTargeting('pos', ['mpu5']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
						gptadslots[10] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/MPU6', [[300, 250], [300, 600]], 'div-300x250_Ros-6').setTargeting('pos', ['mpu6']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
				}
				
				googletag.pubads().addEventListener('slotRenderEnded', function (event) {
					if (event.slot === gptadslots[1]) {
						if (!event.isEmpty) {
							$("#LDB1-AD").show();
							$("#div-Tepe_728x90").show();
						}
					}
					else if (event.slot === gptadslots[2]) {
						if (!event.isEmpty) {
							$("#LDB2-AD").show();
                            if($('#LDB2-AD').length > 0){
                                setTimeout(function (){
                                    $('#LDB2-AD').css('marginBottom', '50px');
                                },500);
                            }
						}
					}
					else if (event.slot === gptadslots[3]) {
						if (!event.isEmpty) {
							$("#LDB3-AD").show();

                            if ($('#LDB3-AD').length > 0)
                            {
                                if($('#div-Tepe_728x90-2').length > 0) {
                                    setTimeout(function () {
                                        $('#div-Tepe_728x90-2').height('130px');
                                        $('#div-Tepe_728x90-2').css('padding-top', '20px');
                                        $('#LDB3-AD').css('marginBottom', '50px');
                                    }, 1500);
                                }
                            }
						}
					}
				});

				googletag.pubads().enableSingleRequest();
				googletag.pubads().enableAsyncRendering();
				googletag.enableServices();
				DygDFP.section = section;
			});
			
			DygDFP.Masthead.appendSelector = "#mastheadDiv";

			$(document).ready(function () {
				$("body").append("<div id='div-interstitial' class='DFP_INS' style='display:none'></div>");
				googletag.cmd.push(function () { googletag.display('div-interstitial'); });
				
				if($("#LDB1-AD").length > 0){
					$("#LDB1-AD").append("<div id='div-Tepe_728x90' style='display:none;height:0px;'></div>");
					googletag.cmd.push(function () { googletag.display('div-Tepe_728x90'); });

					if (DygDFP.device.isPhone() || DygDFP.device.isTablet()) {
						$("#LDB1-AD").css("margin","auto");
					}
				}


				if ($("#LDB2-AD").length > 0) {
					$("#LDB2-AD").append("<div id='div-Tepe_728x90-1' style='display:none;height:0px;padding-top:0px;padding-bottom:0px;'></div>");
					googletag.cmd.push(function () { googletag.display('div-Tepe_728x90-1');	});
				}

				if($("#LDB3-AD").length > 0){
					$("#LDB3-AD").append("<div id='div-Tepe_728x90-2' style='display:none;height:0px;'></div>");
					googletag.cmd.push(function () { googletag.display('div-Tepe_728x90-2'); });
				}
				
				if($(".fotogaleri-detay-300x250").length > 0){
					$('ul#slideshow').find('li:visible').find('.fotogaleri-detay-300x250').append("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px'></div>");	
					googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
				}
				
				if (DygDFP.device.isPhone()) {
					$(".LDB1-AD").css("position","relative").css("z-index","9");
					  var adCount = 1;
					  $( ".dfp_mpu_mobile" ).each(function( index ) {
						  if(adCount < 6){
							$(this).append("<div id='div-300x250_Ros-" + adCount + "' style='display:none;margin-bottom:10px;text-align:center'></div>");
							googletag.cmd.push(function () { googletag.display('div-300x250_Ros-' + adCount); });
							adCount = parseInt(adCount) + 1;	
						  }
					});
					
					if($( ".dfp_mpu_mobile").length == 0 && $(".widget_haber_detay").length > 0){
						$(".widget_haber_detay .text").find("h4").before("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px;text-align:center'></div>");
						googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
					}

					//added by tunc
					if($('#mpu1').length > 0)
					{
						$('#mpu1').append("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px;text-align:center'></div>");
						googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
						console.log('ad added');
					}
				}
				
				if (DygDFP.device.isWeb()) {
					if($("#sideAD1").length > 0){
						$("#sideAD1").append("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px'></div>");	
						$("#sideAD1").append("<div id='div-300x250_Ros-2' style='display:none;margin-bottom:10px'></div>");
						googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
						googletag.cmd.push(function () { googletag.display('div-300x250_Ros-2'); });
					}
					
					if($("#sideAD2").length > 0){
						$("#sideAD2").append("<div id='div-300x250_Ros-3' style='display:none;margin-bottom:10px'></div>");	
						$("#sideAD2").append("<div id='div-300x250_Ros-4' style='display:none;margin-bottom:10px'></div>");	
						googletag.cmd.push(function () { googletag.display('div-300x250_Ros-3'); });
						googletag.cmd.push(function () { googletag.display('div-300x250_Ros-4'); });
					}
					
					if($("#sideAD3").length > 0){
						$("#sideAD3").append("<div id='div-300x250_Ros-5' style='display:none;margin-bottom:10px'></div>");	
						$("#sideAD3").append("<div id='div-300x250_Ros-6' style='display:none;margin-bottom:10px'></div>");	
						googletag.cmd.push(function () { googletag.display('div-300x250_Ros-5'); });
						googletag.cmd.push(function () { googletag.display('div-300x250_Ros-6'); });
					}	
				}				
			});
        },
        preparePageSkin: function (hasTopImage) {
        },
		preparePageSkinPosition : function(){
		},
		prepareVPaid: function(){
			//$("#extendVidPanel").css("top",$("body object[data*='http://cdnapi.kaltura.com/index.php']").offset().top - 196);
			//$("#extendVidPanel").css("left",$("body object[data*='http://cdnapi.kaltura.com/index.php']").offset().left - 171);
		}
    }
}

$(document).ready(function(){
	var swfObject = document.createElement('script');
	swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/jquery.sticky.js';
	document.getElementsByTagName('head')[0].appendChild(swfObject);

	setTimeout(function(){
		if(DygDFP.device.isWeb()){
			if($('#sideAD1').length > 0){
				$('#sideAD1').parent().parent().hcSticky({
					innerTop: -110,
					followScroll: false,
					bottomEnd : 30
				});
			}

			if($('#sideAD2').length > 0){
				$('#sideAD2').parent().parent().hcSticky({
					innerTop: -110,
					followScroll: false,
					bottomEnd : 30
				});
			}

			if($('#sideAD3').length > 0){
				$('#sideAD3').parent().parent().hcSticky({
					innerTop: -110,
					followScroll: false,
					bottomEnd : 30
				});
			}
		}

	DygDFP.Brand.Vogue.init();
	},1000);
	
	//this clearing for sticky
	setTimeout(function()
	{
		window.scrollBy(0,10);
		window.scrollBy(0,-10);
	},2000);

	
});
