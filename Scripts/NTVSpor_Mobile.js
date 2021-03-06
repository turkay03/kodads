DygDFP.Brand = {
    NTVSpor_Mobile: {
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
				//DygDFP.section = 'Test';
				googletag.pubads().setTargeting('ntvsprcat',tags);

				if (DygDFP.device.isPhone()) {
					gptadslots[0] = googletag.defineSlot('/37011203/Mobile/NTVSpor_App/Mobil_Site/' + DygDFP.section + '/INS', [[320, 480]],'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					//gptadslots[1] = googletag.defineSlot('/37011203/Mobile/NTVSpor_App/Mobil_Site/' + DygDFP.section + '/LDB', [[320, 50]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[1] = googletag.defineSlot('/37011203/NtvSpor/MobileSite/' + DygDFP.section + '/LDB', [[320, 50],[320, 100],[320, 150]], 'div-Tepe_728x90')
						.setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[2] = googletag.defineSlot('/37011203/Mobile/NTVSpor_App/Mobil_Site/' + DygDFP.section + '/MPU1', [[300, 250]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[3] = googletag.defineOutOfPageSlot('/37011203/Mobile/NTVSpor_App/Mobil_Site/' + DygDFP.section + '/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

				}
				else if (DygDFP.device.isTablet()) {
					gptadslots[0] = googletag.defineSlot('/37011203/Mobile/NTVSpor_App/Mobil_Site/' + DygDFP.section + '/INS', [[768, 1024]], 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[1] = googletag.defineSlot('/37011203/Mobile/NTVSpor_App/Mobil_Site/' + DygDFP.section + '/LDB', [[728, 90]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[2] = googletag.defineSlot('/37011203/Mobile/NTVSpor_App/Mobil_Site/' + DygDFP.section + '/MPU1', [[300, 250]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[3] = googletag.defineOutOfPageSlot('/37011203/Mobile/NTVSpor_App/Mobil_Site/' + DygDFP.section + '/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}

				googletag.pubads().enableSingleRequest();
				googletag.pubads().enableAsyncRendering();
				googletag.enableServices();

			});

			DygDFP.LeaderBoard.backgroundColor = "#f0f0f0";
			DygDFP.Masthead.appendSelector = $(".DFP_BODY");

			$(document).ready(function () {
				if(DygDFP.device.isWeb())
				{
					$("body").prepend("<div id='div-Tepe_728x90' style='text-align:center;width:100%;background-color:white;position:fixed;bottom:0;z-index:1'></div>");
				}
				else if(DygDFP.device.isPhone())
				{
					$("#menu3").after("<div id='div-Tepe_728x90' style='text-align:center;width:100%;background-color:white;z-index:1'></div>");
				}

				$("body").prepend("<div id='div-Masthead' style='display:none'></div>");
				$("body").append("<div id='div-interstitial'></div>");
				googletag.cmd.push(function () { googletag.display('div-interstitial'); });
				
				if($("#rptrNews_aNews_2").length > 0){
					$("#rptrNews_aNews_2").after("<div id='div-300x250_Ros-1' style='text-align:Center;width:100%'></div>");
				}
				else if(DygDFP.section == 'Fikstur'){
					$(".content").after("<div id='div-300x250_Ros-1' style='margin-top:10px;margin-bottom:10px;text-align:Center;width:100%'></div>");
				}
				else if(DygDFP.section == 'Yayin_Akisi' || DygDFP.section == 'FotoGaleri'){
					$("#ligler").after("<div id='div-300x250_Ros-1' style='margin-top:10px;margin-bottom:10px;text-align:Center;width:100%'></div>");
				}
				else if(DygDFP.section == 'Yazar'){
					$("#ligler table").eq(0).after("<div id='div-300x250_Ros-1' style='margin-top:10px;margin-bottom:10px;text-align:Center;width:100%'></div>");
				}
				else if($("#idBasketball").length >0 || $("#idFootball").length >0){
					$("#idBasketball").after("<div id='div-300x250_Ros-1' style='margin-top:10px;margin-bottom:10px;text-align:Center;width:100%'></div>");
					$("#idFootball").after("<div id='div-300x250_Ros-1' style='margin-top:10px;margin-bottom:10px;text-align:Center;width:100%'></div>");
				}
				else{
					$("#lblNewsLong").after("<div id='div-300x250_Ros-1' style='margin-top:10px;text-align:Center;width:100%'></div>");
				}
				googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });			
				googletag.cmd.push(function () { googletag.display('div-Masthead'); });
				googletag.cmd.push(function () { googletag.display('div-Tepe_728x90'); });

				//DygDFP.Takeover.appendSelector = $("#div-300x250_Ros-1");
			});
        },
        preparePageSkin: function (hasTopImage) {
			
        },
		prepareVPaid: function(){
		
		},
		initVideoWall: function(){
		
		}
	}
}

$(document).ready(function(){
	DygDFP.Brand.NTVSpor_Mobile.init();
});