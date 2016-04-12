DygDFP.Brand = {
    CNBCe_Finans: {
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
					gptadslots[1] = googletag.defineOutOfPageSlot('/37011203/Web/NTVPara/'+DygDFP.section+'/LDB', 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/Web/NTVPara/'+DygDFP.section+'/SKIN', 'div-PageSkin').setTargeting('pos', ['skin']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					
					if($("#sidebar_rklm2").length > 0){
						gptadslots[3] = googletag.defineSlot('/37011203/Web/NTVPara/'+DygDFP.section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);					
					}
					
					gptadslots[4] = googletag.defineOutOfPageSlot('/37011203/Web/NTVPara/' + DygDFP.section + '/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					
					if($("#sidebar_rklm1").length > 0){
						gptadslots[5] = googletag.defineOutOfPageSlot('/37011203/Web/NTVPara/' + DygDFP.section + '/MPU_Fix', 'div-MPU_Fix').setTargeting('pos', ['mpu_fix']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					}
					
					if($("#tlb_rklm").length > 0){
						gptadslots[6] = googletag.defineOutOfPageSlot('/37011203/Web/NTVPara/'+DygDFP.section+'/TLB', 'div-tlb').setTargeting('pos', ['tlb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
				}
				
				googletag.pubads().addEventListener('slotRenderEnded', function (event) {
					if (event.slot === gptadslots[1]) {
						if (!event.isEmpty) {
							$("#div-Tepe_728x90").show();
							setTimeout(function () {
								DygDFP.PageSkin.marginTop = $(".dygHeader").outerHeight() + $("#div-Tepe_728x90").outerHeight();
								$("#div-PageSkin_rev").attr("id", "div-PageSkin");
								googletag.cmd.push(function () { googletag.display('div-PageSkin'); });
							}, 1500);
						} else {
							setTimeout(function () {
								DygDFP.PageSkin.marginTop = $(".dygHeader").outerHeight() - $("#mainSubMenu").outerHeight();
								$("#div-PageSkin_rev").attr("id", "div-PageSkin");
								googletag.cmd.push(function () { googletag.display('div-PageSkin'); });
							}, 1500);
						}
					}
					else  if (event.slot === gptadslots[2]) {
						if (!event.isEmpty){							
							$("#mastheadPanel").css("margin-top",60);
						}
					}
				});

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
			
				$("body").prepend("<div class='DFP_SKIN'></div>");
				
				$("body").prepend("<div id='div-PageSkin_rev'></div>");
				$("body").prepend("<div id='div-interstitial'></div>");
				$("#header_rklm").append("<div id='div-Tepe_728x90' style='height:0px'></div>");
                $("#mainHeader").append("<div id='div-Masthead'></div>");
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
				
				googletag.cmd.push(function () { googletag.display('div-Tepe_728x90'); });
				googletag.cmd.push(function () { googletag.display('div-interstitial'); });
                googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
                googletag.cmd.push(function () { googletag.display('div-MPU_Fix'); });
                googletag.cmd.push(function () { googletag.display('div-Masthead'); });
			});
        },
        preparePageSkin: function (hasTopImage) {
			$("#RightSkin").css("width",$("#RightSkin").width()+10);
           
			
			if(hasTopImage){
				 DygDFP.PageSkin.changeMarginTop();
				$("#main").animate({
						marginTop: '+=20px'
					}, 300, function () {
						DygDFP.PageSkin.show(true);
					});
			}
			else{
				DygDFP.PageSkin.marginTop = DygDFP.PageSkin.marginTop - $("#mainSubMenu").outerHeight();
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
			$("#extendVidPanel").css("top",$("body object[data*='http://cdnapi.kaltura.com/index.php']").offset().top - 309);
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
	DygDFP.Brand.CNBCe_Finans.init();
});