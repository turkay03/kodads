DygDFP.Brand = {
    Kral_Muzik: {
        init: function () {
			googletag.cmd.push(function () {
				var AdUnitId = '37011203';
				DygDFP.section = 'Test';
				
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
						
				googletag.pubads().setTargeting('kral_cat', tags);

				if (DygDFP.device.isPhone()) {
					var tmpSiteName= 'KralMuzik';
					var adPlatform = 'MobileSite';
					var AdUnitBase = "{0}/{1}/{2}/{3}".format(AdUnitId,tmpSiteName,adPlatform,DygDFP.section);
					gptadslots[0] = googletag.defineSlot(AdUnitBase + '/LDB', [[320,50], [320,100],[320,150]],'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[1] = googletag.defineSlot(AdUnitBase + '/INS', [[320,480],[320,568]],'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[2] = googletag.defineSlot(AdUnitBase + '/MPU1', [[300,250]],'div-300x250_Ros-1').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
				}
				else if (DygDFP.device.isTablet()) {
					var tmpSiteName= 'KralMuzik';
					var adPlatform = 'MobileSite';
					var AdUnitBase = "{0}/{1}/{2}/{3}".format(AdUnitId,tmpSiteName,adPlatform,DygDFP.section);
					gptadslots[0] = googletag.defineSlot(AdUnitBase + '/LDB', [[728, 90]],'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[1] = googletag.defineSlot(AdUnitBase + '/INS', [[768,1024],[1024,768]],'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[2] = googletag.defineSlot(AdUnitBase + '/MPU1', [[300,250]],'div-300x250_Ros-1').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
				}
				else { // web
					gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[1] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/LDB', [[728, 90], [970, 90]],'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/SKIN', 'div-PageSkin').setTargeting('pos', ['skin']).addService(googletag.companionAds()).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					
					if(DygDFP.Section != 'Dijital_Radyolar'){
						gptadslots[3] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
					
					gptadslots[4] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					
					gptadslots[5] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/'+DygDFP.section+'/SRVY', 'div-Srvy').setTargeting('pos', ['srvy']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				
				googletag.pubads().addEventListener('slotRenderEnded', function (event) {

					if (DygDFP.device.isPhone()){
						if(event.slot === gptadslots[0])
						{

						}
					}
					else if (DygDFP.device.isTablet()){}
					else {
						if (event.slot === gptadslots[1]) {
							if (!event.isEmpty) {
								$("#div-Tepe_728x90").css("height", 90);
								$("#div-Tepe_728x90").css("text-align", "center");
								DygDFP.PageSkin.marginTop = $(".bar-wrapper").outerHeight() + $(".header-wrapper").outerHeight() + $(".nav-wrapper").outerHeight() + $("#div-Tepe_728x90").outerHeight();
							} else {
								DygDFP.PageSkin.marginTop = $(".bar-wrapper").outerHeight() + $(".header-wrapper").outerHeight() + $(".nav-wrapper").outerHeight();
								DygDFP.PageSkin.changeMarginTop();
							}
						}
						else if (event.slot === gptadslots[2]) {
							googletag.companionAds().setRefreshUnfilledSlots(false);
							if (!event.isEmpty) {
								$("#footer-wrapper").css("z-index", 9);
							}
						}
					}
				});

				if($("#tvyoPlayer").length > 0){
					//googletag.pubads().disableInitialLoad();
				}
				//googletag.companionAds().setRefreshUnfilledSlots(true);
				googletag.pubads().enableVideoAds();
				googletag.pubads().enableSingleRequest();
				googletag.pubads().enableAsyncRendering();
				googletag.enableServices();
			});

			DygDFP.PageSkin.containerWidth = 960;
			DygDFP.LeaderBoard.backgroundColor = "#e7e7e7";
			$(".nav-wrapper").after("<div id='mastheadDiv'></div>");
			DygDFP.Masthead.appendSelector = $("#mastheadDiv");

			$(document).ready(function () {
				if(DygDFP.device.isWeb()) {
					$("body").prepend("<div class='DFP_SKIN'></div>");

					$("body").append("<div id='div-PageSkin' style='display:none;width:1px;height:1px;'></div>");
					$("body").append("<div id='div-interstitial' class='DFP_INS' style='display:none'></div>");
					$("body").prepend("<div id='div-Tepe_728x90' class='DFP_LDB' style='display:none'></div>");
					$(".nav-wrapper").after("<div id='div-Masthead' style='text-align:center'></div>");

					if (DygDFP.Section != 'Dijital_Radyolar') {
						$("#rklm_300x250_1").append("<div id='div-300x250_Ros-1' style='display:none'></div>");
						googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
					}

					$("body").append("<div id='div-Srvy' style='display:none'></div>");
					googletag.cmd.push(function () {googletag.display('div-Srvy');});
					googletag.cmd.push(function () {googletag.display('div-Tepe_728x90');});
					googletag.cmd.push(function () {googletag.display('div-interstitial');});
					googletag.cmd.push(function () {googletag.display('div-Masthead');});
					googletag.cmd.push(function () {googletag.display('div-PageSkin');});
				}
				else if(DygDFP.device.isTablet()){}
				else {//phone
					$("body").prepend("<div id='div-interstitial' class='DFP_INS' style='display:none'></div>");
					googletag.cmd.push(function () {googletag.display('div-interstitial');});

					$("body").prepend("<div id='div-Tepe_728x90' class='DFP_LDB' style='display:none'></div>");
					googletag.cmd.push(function () {googletag.display('div-Tepe_728x90');});


				}
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
			$("#extendVidPanel").css("top",$("body object[data*='http://cdnapi.kaltura.com/index.php']").offset().top - 268);
			$("#extendVidPanel").css("left",$("body object[data*='http://cdnapi.kaltura.com/index.php']").offset().left - 173);
		}	
    }
}

$(document).ready(function(){

	var tvyo = document.createElement('script');
	tvyo.src = 'http://img-dygassets.mncdn.com/player/tvyoTracker.js';
	document.getElementsByTagName('head')[0].appendChild(tvyo);

	DygDFP.Brand.Kral_Muzik.init();

	/*var ter= getCookie('terror');

	if(ter!='1'){
		DygDFP.Interstitial2.init('http://img-dygassets.mncdn.com/Images/kteror.jpg');
		createCookie('terror','1',999);
	}*/

	if(getMetaTag("dyg:section") == 'Dijital_Radyolar' && getMetaTag("dyg:target") == 'kral-rap'){
		DygDFP.PageSkin.init('http://img-dygassets.mncdn.com/Images/custom/rap-page-skin-sol.jpg','javascript:;','http://img-dygassets.mncdn.com/Images/custom/rap-page-skin-sag.jpg','javascript:;','','','');
		$("#LeftSkin").css("cursor","default");
		$("#RightSkin").css("cursor","default");
	}
	else if(getMetaTag("dyg:section") == 'Dijital_Radyolar' && getMetaTag("dyg:target") == 'k-jazz'){
		DygDFP.PageSkin.init('http://img-dygassets.mncdn.com/Images/custom/k-jazz-sol-page-skin.jpg','http://www.kralmuzik.com.tr/dijital-radyo/k-jazz','http://img-dygassets.mncdn.com/Images/custom/k-jazz-sag-page-skin.jpg','http://www.kralmuzik.com.tr/dijital-radyo/k-jazz','','','');
	}
	else if(getMetaTag("dyg:section") == 'Dijital_Radyolar' && getMetaTag("dyg:target") == 'k-dance'){
		DygDFP.PageSkin.init('http://img-dygassets.mncdn.com/Images/custom/k-dance-sol.jpg','http://www.kralmuzik.com.tr/dijital-radyo/k-dance','http://img-dygassets.mncdn.com/Images/custom/k-dance-sag.jpg','http://www.kralmuzik.com.tr/dijital-radyo/k-dance','','','');
	}
	else if(getMetaTag("dyg:section") == 'Radyo' && window.location.href.indexOf('kral-world-radio') > -1){
		DygDFP.PageSkin.init('http://img-dygassets.mncdn.com/Images/custom/kralworld-sol-pageskin-ocak2016.jpg','http://www.kralmuzik.com.tr/dijital-radyo/kral-world-radio','http://img-dygassets.mncdn.com/Images/custom/kralworld-sag-pageskin-ocak2016.jpg','http://www.kralmuzik.com.tr/dijital-radyo/kral-world-radio','','','');
	}
	else if(getMetaTag("dyg:section") == 'Dijital_Radyolar' && getMetaTag("dyg:target") == 'k-rock'){
		DygDFP.PageSkin.init('http://img-dygassets.mncdn.com/Images/custom/k-rock-sol-page-skin.jpg','http://www.kralmuzik.com.tr/dijital-radyo/k-rock','http://img-dygassets.mncdn.com/Images/custom/k-rock-page-skin-sag.jpg','http://www.kralmuzik.com.tr/dijital-radyo/k-rock','','','');
	}
	else if(getMetaTag("dyg:section") == 'Dijital_Radyolar' && getMetaTag("dyg:target") == 'k-nostalgie'){
		DygDFP.PageSkin.init('http://img-dygassets.mncdn.com/Images/custom/k-nostalgie-sol-page-skin.jpg','http://www.kralmuzik.com.tr/dijital-radyo/k-nostalgie','http://img-dygassets.mncdn.com/Images/custom/k-nostalgie-sag-page-skin.jpg','http://www.kralmuzik.com.tr/dijital-radyo/k-nostalgie','','','');
	}


	if($('#tvyoPlayer').length > 0)
	{
		var predevice=DygDFP.device.isWeb() ? 'web':'mobilweb';
		var mecra = playerArray[0].alias;
		var videoId = KralVideoId;// playerArray[0].referenceId;
		var duration = 5;
		var partNo = 0;
		var videotitle= getMetaTag("og:title");
		var pushDuration=0;
		setInterval(function () {
			if(DygPlayer().getState("tvyoPlayer") == 3){
				if(pushDuration == 5){
					tvyoTracker.watch(mecra, predevice, videoId, duration, partNo, videotitle);
					pushDuration = 1;
				}
				else{
					pushDuration = pushDuration +1;
				}
			}
		},1000);


	}




});

$(window).scroll(function(){
	if($(".adPartContainer").length > 0){
		var headerHeight = $(".bar-wrapper").outerHeight() + $(".nav-wrapper").outerHeight() + $(".header-wrapper").outerHeight();
		
		if($("#div-Tepe_728x90").is(":visible")){
			headerHeight = headerHeight + 90;
		}
	
		if($(window).scrollTop() >= headerHeight){
			$("#LeftSkin").css("position","fixed");	
			$("#LeftSkin").css("top",0);	
			$("#RightSkin").css("position","fixed");	
			$("#RightSkin").css("top",0);	
		}
		else{
			$("#LeftSkin").css("position","absolute");
			$("#LeftSkin").css("top", headerHeight);
			$("#RightSkin").css("position","absolute");
			$("#RightSkin").css("top", headerHeight);
		}





	}
});