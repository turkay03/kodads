DygDFP.Brand = {
	NTVSpor: {
		init: function () {
			googletag.cmd.push(function () {

				//DygDFP.section = 'Test';

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

				googletag.pubads().setTargeting('ntvsprcat', tags);

				if (DygDFP.device.isPhone()) {
					//gptadslots[0] = googletag.defineSlot('/37011203/Mobile/NTVSpor/Mobile_Site/' + DygDFP.section + '/INS', [[320, 480]],'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					//gptadslots[1] = googletag.defineSlot('/37011203/Mobile/NTVSpor/Mobile_Site/' + DygDFP.section + '/LDB', [[320, 50]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				else if (DygDFP.device.isTablet()) {
					//gptadslots[0] = googletag.defineSlot('/37011203/Mobile/NTVSpor/Mobile_Site/' + DygDFP.section + '/INS', [[768, 1024]], 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					//gptadslots[1] = googletag.defineSlot('/37011203/Mobile/NTVSpor/Mobile_Site/' + DygDFP.section + '/LDB', [[728, 90]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					//gptadslots[2] = googletag.defineSlot('/37011203/Mobile/NTV_App/Mobile_Site/' + DygDFP.section + '/MPU1', [[300, 250]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
				}
				else {
					gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[1] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/LDB', [[728, 90], [970, 90]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/SKIN', 'div-PageSkin').setTargeting('pos', ['skin']).addService(googletag.companionAds()).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					gptadslots[3] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

					if ($("#dyg_pscl_300x250_1").length > 0) {
						gptadslots[4] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					}

					if ($("#dyg_pscl_text_link").length > 0) {
						gptadslots[5] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/TLB', 'div-tlb').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					}

					if ($("#dyg_pscl_300x250_0").length > 0) {
						gptadslots[6] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU_Fix', 'div-MPU_Fix').setTargeting('pos', ['mpufix']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					}

					if (DygDFP.section == 'Anasayfa') {
						gptadslots[8] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/RM', 'div-richMedia').setTargeting('pos', ['rm']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					}


					if (DygDFP.section == 'Test') {
						gptadslots[8] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/Test/RM', 'div-richMedia').setTargeting('pos', ['rm']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
					}

					gptadslots[9] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/SRVY', 'div-Srvy').setTargeting('pos', ['srvy']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

					googletag.pubads().addEventListener('slotRenderEnded', function (event) {
						if (event.slot === gptadslots[1]) {
							if (!event.isEmpty) {
								$("#div-Tepe_728x90").css("height", 90);
								$("#div-Tepe_728x90").css("text-align", "center");
								DygDFP.PageSkin.marginTop = $(".dygHeader").outerHeight() + $("#div-Tepe_728x90").height();
								DygDFP.VideoWall.top = $(".dygHeader").outerHeight() + 90;
							} else {
								DygDFP.PageSkin.marginTop = $(".dygHeader").outerHeight();
								DygDFP.VideoWall.top = DygDFP.PageSkin.marginTop;
								DygDFP.PageSkin.changeMarginTop();
							}

							if (DygDFP.section == 'Anasayfa') {
								_gaq.push(['_trackEvent', 'OtherReklam', 'OtherReklamAction']);
							}
						}
						else if (event.slot === gptadslots[2]) {
							$("footer").css("z-index", 9999);
							googletag.companionAds().setRefreshUnfilledSlots(false);
						}
						else if(event.slot ===gptadslots[4] )
						{
							if (!event.isEmpty)
							{
								if(DygDFP.target =="Haber_Detay")
								{
									$('#div-300x250_Ros-1').parent().show();
								}
							}
						}
					});
				}

				if ($("#tvyoPlayer").length > 0) {
					//googletag.pubads().disableInitialLoad();
				}
				//googletag.companionAds().setRefreshUnfilledSlots(true);
				//googletag.pubads().disableInitialLoad();
				googletag.pubads().enableVideoAds();
				googletag.pubads().enableSingleRequest();
				googletag.pubads().enableAsyncRendering();
				googletag.enableServices();
			});

			$(".DFP_BODY").prepend("<div id='MastheadContainer'></div>");
			DygDFP.PageSkin.containerWidth = 950;
			DygDFP.LeaderBoard.backgroundColor = "#f0f0f0";
			DygDFP.Masthead.appendSelector = $("#MastheadContainer");
			DygDFP.VideoWall.appendSelector = 'body';

			$(document).ready(function () {
				$("body").prepend("<div id='div-Tepe_728x90' style='height:0px'></div>");
				$(".DFP_BODY").prepend("<div id='div-Masthead' style='margin-top:5px;margin-bottom:5px;width:1px;height:1px;text-align:center'></div>");
				$("body").append("<div id='div-PageSkin' style='display:none'></div>");
				googletag.cmd.push(function () {
					googletag.display('div-PageSkin');
				});
				$("body").append("<div id='div-interstitial'></div>");

				if ($("#dyg_pscl_300x250_0").length > 0) {
					$("#dyg_pscl_300x250_1").append("<div id='div-300x250_Ros-1'></div>");
					googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
				}
				if(DygDFP.target == "Haber_Detay")
				{
					var htmlDom =  $("#dyg_pscl_300x250_1");
					htmlDom.remove();
					$('.col-md-4 ul').eq(0).children().eq(3).after('<li class="clearfix" style="display: none"> ' +htmlDom.html() + '</li>');
				}

				if ($("#dyg_pscl_300x250_0").length > 0) {
					$("#dyg_pscl_300x250_0").append("<div id='div-MPU_Fix'></div>");
					googletag.cmd.push(function () {googletag.display('div-MPU_Fix');});
				}

				if ($("#dyg_pscl_text_link").length > 0) {
					$("#dyg_pscl_text_link").append("<div id='div-tlb' style='margin-bottom:40px;text-align:center'></div>");
					googletag.cmd.push(function () {
						googletag.display('div-tlb');
					});
				}

				if (DygDFP.section == "Anasayfa") {
					$("body").append("<div id='div-richMedia' style='display:none'></div>");
					googletag.cmd.push(function () {
						googletag.display('div-richMedia');
					});
				}

				if (DygDFP.section == "Test") {
					$("body").append("<div id='div-richMedia' style='display:none'></div>");
					googletag.cmd.push(function () {
						googletag.display('div-richMedia');
					});
				}


				$("body").append("<div id='div-Srvy' style='display:none'></div>");
				googletag.cmd.push(function () {
					googletag.display('div-Srvy');
				});

				googletag.cmd.push(function () {
					googletag.display('div-Masthead');
				});

				googletag.cmd.push(function () {
					googletag.display('div-Tepe_728x90');
				});
				googletag.cmd.push(function () {
					googletag.display('div-interstitial');
				});

				//DygDFP.Takeover.appendSelector = $("#div-300x250_Ros-1");
			});
		},
		preparePageSkin: function (hasTopImage) {
			var pageHeight = $(document).height() - ($(".info-nav").outerHeight() + $("header").outerHeight() + $("nav.main").outerHeight() + $("#div-Tepe_728x90").height() + $("footer").height());

			if (pageHeight <= 1100) {
				$("#LeftSkin").css("height", (pageHeight - 47));
				$("#RightSkin").css("height", (pageHeight - 47));
			}

			if (hasTopImage) {
				$(".DFP_BODY").animate({
					marginTop: '+=55px'
				}, 300, function () {
					DygDFP.PageSkin.show(true);
				});
			}
			else {
				DygDFP.PageSkin.show(true);
			}
		},
		prepareVPaid: function () {
			if (document.getElementById($("body object[data*='flowplayer']").attr("id")) != null) {
				$("#extendVidPanel").css("top", $("body object[data*='flowplayer']").offset().top - 304);
				$("#extendVidPanel").css("left", $("body object[data*='flowplayer']").offset().left - 207);
			}
			else {
				$("#extendVidPanel").css("top", $("body object[data*='http://cdnapi.kaltura.com/index.php']").offset().top - 304);
				$("#extendVidPanel").css("left", $("body object[data*='http://cdnapi.kaltura.com/index.php']").offset().left - 207);
			}
		},
		prepareHtml5Masthead: function () {
			$("#mastheadPanel").css("margin-bottom", 10);
		},
		initVideoWall: function () {
			$("#videoWall").css("top", DygDFP.VideoWall.top);
			$("#ntvManset").css("z-index", "9999");
			$(".manset").css("z-index", "9999");
			$(".manset").css("position", "relative");
			$(".manset").css("height", "220px");
			$(".manset").css("margin-bottom", "0px");
			//$(".manset").css("background-color","white");
			$("#mainContent").css("z-index", "9999");
			$("#mainContent").css("position", "relative");
			$("footer").css("z-index", "9999");
			$("body").css("background", "");
			$("body").css("background-color", "white");
			$(".DFP_BODY").animate({
				marginTop: '+=130px'
			}, 1000);
		},
		openVideoWall: function () {
			$(".DFP_BODY").animate({
				marginTop: '+=700px'
			}, 1000);
		},
		closeVideoWall: function () {
			$(".DFP_BODY").animate({
				marginTop: '-=700px'
			}, 1000);
		}
	}
}

$(document).ready(function(){
	DygDFP.Brand.NTVSpor.init();
	$("#mainNav").css("z-index",99999);
	//DygDFP.Survey.init('http://img-dygassets.mncdn.com/Files/Survey/','',222,180, 'dfpSurvey-test02');
	if(DygDFP.section == 'Anasayfa'){
		_gaq.push(['_trackEvent', 'HomepageEvent', 'HomepageEvent']);
	}
});
