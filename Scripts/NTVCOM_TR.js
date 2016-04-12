DygDFP.Brand = {
  NTVCOM_TR: {
    OldPageSkinTop: 0,
	HasLDB: false,
    init: function() {
      var section = DygDFP.section;
      if ((DygDFP.section == 'FotoGaleri' && DygDFP.target == '') || (DygDFP.section == 'VideoGaleri' && DygDFP.target == '')) {

      } else {
        googletag.cmd.push(function() {
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

          if(DygDFP.siteName =='NTVCOM_TR')
          {
            if (!DygDFP.device.isWeb())
            {
              DygDFP.siteName ='Ntv';
            }
          }

          if(DygDFP.section =="spor"){
            DygDFP.section ="Spor";
          }
          googletag.pubads().setTargeting('ntvcat', tags);

          section = DygDFP.section;
          if(getMetaTag('dyg:stage')=="true"){
            //section = 'Test';
            //DygDFP.section = "Test"
          }

          //googletag.pubads().setTargeting('ntvcat', 'test');

          if (DygDFP.device.isPhone()) {
            gptadslots[0] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + section + '/LDB', [[320, 50],[320, 100],[320, 150]], 'div-Tepe_728x90')
                .setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

            gptadslots[1] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + section + '/INS', [[320, 480],[320,568]], 'div-interstitial')
                .setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

            gptadslots[2] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + section + '/MPU1', [[300, 250]], 'div-300x250_Ros-1')
                .setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

            gptadslots[3] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + section + '/TXTLNK',[[260,50]], 'div-tlb')
                .setTargeting('pos', ['tlb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            //gptadslots[7] = googletag.defineOutOfPageSlot('/37011203/Mobile/NTV_App/Mobile_Site/' + section + '/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

			/*if ((DygDFP.section != 'fotogaleri') && DygDFP.target != '') {
              gptadslots[2] = googletag.defineSlot('/37011203/Mobile/NTV_App/Mobile_Site/' + section + '/MPU1', [
                [300, 250]
              ], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            }*/
			
			googletag.pubads().addEventListener('slotRenderEnded', function(event) {
              if (event.slot === gptadslots[0] )  {
					 if (!event.isEmpty) {
                       if(DygDFP.section =='ntv-canli-yayin')
                       {
                         $('#div-Tepe_728x90').css('margin-bottom','10px');
                       }
                       if(DygDFP.section =='anasayfa')
                       {
                         $('#div-Tepe_728x90').css('margin-left','-5px');
                       }

                       /*
                       if(DygDFP.section =='videogaleri' || DygDFP.section =='Test')
                       {
                         $('#div-Tepe_728x90').css('margin-left','-11px');
                         $('#div-Tepe_728x90').css('margin-top','-5px');
                         $('#div-Tepe_728x90').css('margin-bottom','-10px');
                       }
                       */
					}
				}
			else if(event.slot === gptadslots[1]){
				if (!event.isEmpty && (DygDFP.section == 'fotogaleri')) {
					//$("body").append("<div style='height:50px;'></div>")
				}
				else if(!event.isEmpty && (DygDFP.section == "videogaleri")){
						//$("header.cf").css("margin-top",90);
						//DygDFP.Brand.NTVCOM_TR.HasLDB = true;
				}
			  }
              else{

              }
			});
          } 
		  else if (DygDFP.device.isTablet()) {

            gptadslots[0] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + section + '/LDB', [[728, 90]], 'div-Tepe_728x90')
                .setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

            if ($(window).width()>1000) {
              gptadslots[1] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + section + '/INS', [[1024, 768]], 'div-interstitial')
                  .setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            }
            else
            {
              gptadslots[1] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + section + '/INS', [[768, 1024]], 'div-interstitial')
                  .setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            }

            gptadslots[2] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + section + '/MPU1', [[300, 250]], 'div-300x250_Ros-1')
                .setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

            gptadslots[3] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + section + '/TXTLNK', [[580,50]], 'div-tlb')
                .setTargeting('pos', ['tlb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

            /*
            gptadslots[0] = googletag.defineSlot('/37011203/Mobile/NTV_App/Mobile_Site/' + DygDFP.section + '/INS', [
              [768, 1024]
            ], 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            gptadslots[1] = googletag.defineSlot('/37011203/Mobile/NTV_App/Mobile_Site/' + DygDFP.section + '/LDB', [
              [728, 90]
            ], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            gptadslots[2] = googletag.defineSlot('/37011203/Mobile/NTV_App/Mobile_Site/' + DygDFP.section + '/MPU1', [
              [300, 250]
            ], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
			*/
			googletag.pubads().addEventListener('slotRenderEnded', function(event) {
              if (event.slot === gptadslots[2])  {
					if (!event.isEmpty && DygDFP.section != 'videogaleri') {
                      $(".ros>a").remove();
					  $(".ros").show();
					}
				}
			  else if(event.slot === gptadslots[1]){
				if(!event.isEmpty && (DygDFP.section == "videogaleri")){
				/*	$("#div-Tepe_728x90>div").eq(0).css("position","absolute");
					$("#div-Tepe_728x90>div").eq(0).css("z-index","999");
					$("#div-Tepe_728x90>div").eq(0).css("text-align","center");
					$("#div-Tepe_728x90>div").eq(0).css("background-color","white");
					$("#div-Tepe_728x90>div").eq(0).css("width","100%");
						$("header.cf").css("margin-top",90);
						$(".vg-content").css("margin-top",90);
						DygDFP.Brand.NTVCOM_TR.HasLDB = true;*/
				}
			} 
			});
          } 
		  else 
		  {
            gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + section + '/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            gptadslots[1] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + section + '/LDB', [
              [728, 90],
              [970, 90]
            ], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + section + '/SKIN', 'div-PageSkin').setTargeting('pos', ['skin']).addService(googletag.companionAds()).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            gptadslots[3] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + section + '/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            gptadslots[4] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + section + '/MPU1', [
              [300, 250],
              [300, 600]
            ], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

            if ($("#story DygDFP.section.tags").length > 0) {
              gptadslots[5] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + section + '/TXTLNK',[[580,50]], 'div-tlb').setTargeting('pos', ['tlb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            }
            else{
              gptadslots[9] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + section + '/TXTLNK',[[580,50]], 'div-tlb').setTargeting('pos', ['tlb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            }

            gptadslots[6] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + section + '/SRVY', 'div-Srvy').setTargeting('pos', ['srvy']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

            if (DygDFP.section == 'anasayfa') {
              gptadslots[8] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + section + '/RM', 'div-richMedia').setTargeting('pos', ['rm']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            }

            googletag.pubads().addEventListener('slotRenderEnded', function(event) {
              if (event.slot === gptadslots[1]) {
                if (!event.isEmpty) {
					if(DygDFP.section == 'videogaleri'){
						$("header.cf").css("margin-top",90);
						DygDFP.Brand.NTVCOM_TR.HasLDB = true;
					}
					
                  $("#div-Tepe_728x90").css("height", 90);
                  $("#div-Tepe_728x90").css("text-align", "center");
                  DygDFP.VideoWall.top = $(".info-nav").outerHeight() + $("header").outerHeight() + $("nav.main").outerHeight() + 90;
                  if (DygDFP.section == 'fotogaleri' || DygDFP.section == 'videogaleri') {
                    DygDFP.PageSkin.marginTop = $("header").outerHeight() + $("#div-Tepe_728x90").height() + $(".breadcrumb").outerHeight();
                  } else {
                    DygDFP.PageSkin.marginTop = $(".info-nav").outerHeight() + $("header").outerHeight() + $("nav.main").outerHeight() + $("#div-Tepe_728x90").height() + $(".ticker-wrapper").height();
                  }
                  DygDFP.VideoWall.top = DygDFP.PageSkin.marginTop;

                  if (DygDFP.section == 'fotogaleri' || DygDFP.section == 'VideoGaleri') {

                  }

                  DygDFP.plugin.callEvent();
                } else {
                  DygDFP.VideoWall.top = $(".info-nav").outerHeight() + $("header").outerHeight() + $("nav.main").outerHeight();
                  if (DygDFP.section == 'fotogaleri' || DygDFP.section == 'videogaleri') {
                    DygDFP.PageSkin.marginTop = $("header").outerHeight() + $(".breadcrumb").outerHeight();
                  } else {
                    DygDFP.PageSkin.marginTop = $(".info-nav").outerHeight() + $("header").outerHeight() + $("nav.main").outerHeight() + $("#div-Tepe_728x90").height() + $(".ticker-wrapper").height();
                  }

                  DygDFP.VideoWall.top = DygDFP.PageSkin.marginTop;
                }

                $("#div-300x250_Ros-1").removeClass('hasAd');

                DygDFP.PageSkin.changeMarginTop();
                if (DygDFP.section == 'anasayfa') {
                  ga('ntvcomtr.send', 'event', 'OtherReklam', 'OtherReklamAction');
                }
              } else if (event.slot === gptadslots[4]) {
                if (!event.isEmpty) {
                  $(".ros>a").remove();
                  $(".ros").show();
                }
              } else if (event.slot === gptadslots[2]) {
				  googletag.companionAds().setRefreshUnfilledSlots(false);
                $(".adPartContainer").fadeOut();
                if (!event.isEmpty) {
                  $("footer").css("position", "relative");
                  $("footer").css("z-index", 9)
                  $("#mastheadPanel").css("margin-top", 10);
				   
                }
              }
            });
          }


          if ($(".player").length > 0) {
           // googletag.pubads().disableInitialLoad();
          }

          googletag.pubads().enableVideoAds();
          googletag.pubads().enableSingleRequest();
          googletag.pubads().enableAsyncRendering();
          googletag.enableServices();
		  
		  if ($(".player").length > 0) {
			//googletag.pubads().refresh([gptadslots[0],gptadslots[1],gptadslots[3],gptadslots[4],gptadslots[5],gptadslots[6],gptadslots[7],gptadslots[8]]);
          }
        });

        if (DygDFP.section == 'fotogaleri') {

          DygDFP.PageSkin.containerWidth = 990;
        } 
		else if(DygDFP.section == 'videogaleri'){
			DygDFP.PageSkin.containerWidth = $(".vg-container").width();
		}
		else {
          DygDFP.PageSkin.containerWidth = 970;
        }
        //DygDFP.Paralax.containerWidth = 950;
        DygDFP.LeaderBoard.backgroundColor = "#202020";
        DygDFP.Masthead.appendSelector = $("#mastheadContainerDiv");
        DygDFP.PushDown.appendSelector = "#div-Tepe_728x90";
        DygDFP.VideoWall.appendSelector = '.wrapper:eq(2)';

        $(document).ready(function() {
          $("body").prepend('<input type="hidden" id="DFP_siteName" name="DFP_siteName" value="NTVCOM_TR" />');

          if (DygDFP.section == 'fotogaleri' || DygDFP.section == 'videogaleri') {
            if (DygDFP.device.isPhone()) {
              //$("body").prepend("<div id='div-Tepe_728x90' style='text-align:center;width:100%;position:fixed;bottom:0;z-index:9'></div>");
              if (DygDFP.section == 'videogaleri' )
              {
                $('.vg-video-container').before("<div id='div-Tepe_728x90' style='text-align:center;width:320px;z-index:9;margin-left: -11px;margin-top:-10px;margin-bottom:5px'></div>");
                $('.ros').html("<div id='div-300x250_Ros-1' style='text-align:center;width:300px;z-index:9;'></div>");
              }
              else if(DygDFP.section == 'fotogaleri' )
              {
                $(".breadcrumb").after("<div id='div-Tepe_728x90' style='text-align:center;z-index:9;margin-top:3px'></div>");
                $('.description').eq(0).after("<div id='div-300x250_Ros-1' style='text-align:center;width:300px;z-index:9;margin-bottom:5px'></div>");
              }

            }
            if (DygDFP.device.isTablet()) {
              //$("body").prepend("<div id='div-Tepe_728x90' style='text-align:center;width:100%;position:fixed;bottom:0;z-index:9'></div>");
              //$('.vg-video-container').prepend("<div id='div-Tepe_728x90' style='text-align:center;width:320px;z-index:9;margin-left: -11px;margin-top:-5px;margin-bottom:5px'></div>");
              //$(".vg-wrapper").before("<div id='div-Tepe_728x90' style='text-align:center;width:728px;z-index:9;padding-left:20px'></div>");
            }
            else
            {

              if (DygDFP.device.isWeb()){
				if(DygDFP.section == 'videogaleri' ){
				
					$("body").prepend("<div id='div-Tepe_728x90' style='height:0px;text-align:center'></div>");	
				}
				else{
                    $("#rklm_728x90").append("<div id='div-Tepe_728x90' style='height:0px'></div>");
				}
              }

                if (DygDFP.device.isWeb() && DygDFP.section == 'videogaleri') {
                  $("body").append("<div id='div-Srvy' style='display:none'></div>");
                  googletag.cmd.push(function() {googletag.display('div-Srvy');});
                }
            }
          }
          else
          {
            if (DygDFP.device.isPhone()) {
              if ($('.grids').length>0)
                $('.grids').eq(0).parent().prepend("<div id='div-Tepe_728x90' style='text-align:center;width:300px;z-index:9'></div>");
              else if ($('#mastheadContainerDiv').length >0) {
                $('#mastheadContainerDiv').before("<div id='div-Tepe_728x90' style='text-align:center;width:320px;z-index:9;margin-bottom:5px'></div>"); //fotogaleri
                $('.item').eq(3).before("<div id='div-300x250_Ros-1' style='text-align:center;width:300px;z-index:9;margin-bottom: 10px;'></div>"); //fotogaleri
              }

                $('article').eq(0).append("<div id='div-300x250_Ros-1' style='text-align:center;width:300px;z-index:9;margin-bottom: 10px;'></div>");

              //$("body").prepend("<div id='div-Tepe_728x90' style='text-align:center;width:100%;position:fixed;bottom:0;z-index:9'></div>");
              //$("body").prepend("<div id='div-Masthead' style=''></div>");
              //googletag.cmd.push(function() {googletag.display('div-Masthead');});
            }
            else if (DygDFP.device.isTablet()) {

              if (DygDFP.section == 'anasayfa' )
              {
                //if ($('.breadcrumb').length>0)
                //  $('.breadcrumb').before("<div id='div-Tepe_728x90' style='text-align:center;width:728px;z-index:9'></div>");

                if ($('#mastheadContainerDiv').length >0) {
                  //$('#mastheadContainerDiv').before("<div id='div-Tepe_728x90' style='text-align:center;z-index:9;margin-bottom:5px;'></div>");
                  $("body").prepend("<div id='div-Tepe_728x90' style='text-align:center;z-index:9;margin-bottom:1px;'></div>");
                  //if ($(window).width()<1000)  $('#div-Tepe_728x90').css('margin-left','-52px');
                  $('.dyg-soller.small.short.single-widget.griditem').html("<div id='div-300x250_Ros-1' style='text-align:center;width:300px;z-index:9;margin-bottom: 10px;'></div>"); //anasayfa
                }
              }
              else if (DygDFP.section == 'videogaleri')
              {
                if ($('.vg-content').length>0)
                $('.vg-content').eq(0).before("<div id='div-Tepe_728x90' style='text-align:center;z-index:9;margin-bottom:5px;height:100px;'></div>");

                if ($('.box-300x250').length>0)
                  $('.box-300x250').html("<div id='div-300x250_Ros-1' style='text-align:center;z-index:9;margin-bottom: 10px;'></div>");

              }
              else if (DygDFP.section == 'fotogaleri')
              {

                $(".breadcrumb").after("<div id='div-Tepe_728x90' style='text-align:center;z-index:9;margin-bottom:1px;'></div>");

                $('article').eq(0).after("<div id='div-300x250_Ros-1' style='text-align:center;z-index:9;margin-bottom: 10px;'></div>");
              }
              else
              {

                if ($('#mastheadContainerDiv').length >0) {
                  //$('#mastheadContainerDiv').before("<div id='div-Tepe_728x90' style='text-align:center;z-index:9;margin-bottom:5px;'></div>");
                  $("body").prepend("<div id='div-Tepe_728x90' style='text-align:center;z-index:9;margin-bottom:1px;'></div>");
                  //if ($(window).width()<1000 && DygDFP.section!='')  $('#div-Tepe_728x90').css('margin-left','-52px');
                  $('.dyg-soller.small.short.griditem').html("<div id='div-300x250_Ros-1' style='text-align:center;width:300px;z-index:9;margin-bottom: 10px;'></div>");

                  if ($('article').length>0)
                    $('article').eq(0).after("<div id='div-300x250_Ros-1' style='text-align:center;z-index:9;margin-bottom: 10px;'></div>");

                }


              }

              //$('.grids').eq(0).parent().prepend("<div id='div-Tepe_728x90' style='text-align:center;width:728px;z-index:9;margin-left:-48px;'></div>");
              //$("body").prepend("<div id='div-Tepe_728x90' style='text-align:center;width:728px;z-index:9;padding-left:20px'></div>");
              //$("body").prepend("<div id='div-Tepe_728x90' style='text-align:center;width:100%;position:fixed;bottom:0;z-index:9'></div>");
              //$("body").prepend("<div id='div-Masthead' style=''></div>");
              //googletag.cmd.push(function() {googletag.display('div-Masthead');});
            }
            else if (DygDFP.device.isWeb()) {
              $("body").prepend("<div id='div-Tepe_728x90' style='height:0px'></div>");
              $("body").append("<div id='div-Srvy' style='display:none'></div>");
              googletag.cmd.push(function() {googletag.display('div-Srvy');});
            }
          }

          if (DygDFP.device.isPhone()) {
            if (DygDFP.section == 'anasayfa')
            {
              var gridIndex = 1;
              var adCount = 1;
              $(".grids>.mobile").each(function(index) {
                if (adCount < 6) {
                  if (gridIndex == 5) {
                    $(this).after("<div id='div-300x250_Ros-" + adCount + "' style='display:none;margin-bottom:10px;text-align:center'></div>");
                    googletag.cmd.push(function() {googletag.display('div-300x250_Ros-' + adCount);});
                    adCount = parseInt(adCount) + 1;
                    gridIndex = 0;
                  }
                  gridIndex = parseInt(gridIndex) + 1;
                }
              });
            }
            else
            {
              if(DygDFP.section == "ntv-canli-yayin")
              {
                $('.grids').before("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px;text-align:center'></div>");
              }
              else if(DygDFP.section =="Spor")
              {

                $('.medium.default.headline.at.category.odd.grid-wrapper.mobile').after("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px;text-align:center'></div>");
              }
              else
              {
                $('.follow.small.short.griditem').after("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px;text-align:center'></div>");
              }
              googletag.cmd.push(function() {googletag.display('div-300x250_Ros-1');});
            }

			/*
			else if(DygDFP.section == "videogaleri" || DygDFP.section == "Test"){
				$(".ros").append("<div id='div-300x250_Ros-1' class='hasAd' style='position:relative'></div>");
              googletag.cmd.push(function() {googletag.display('div-300x250_Ros-1');});
			}
			else if ((DygDFP.section != 'fotogaleri') && DygDFP.target != '') {
              /*$(".socialLikes").before("<div id='div-300x250_Ros-1' class='hasAd' style='margin-left:-21px;position:relative'></div>");
              googletag.cmd.push(function() {googletag.display('div-300x250_Ros-1');});
            }
            */
          }


          if (!DygDFP.device.isPhone()) {
            if ($(".ros").length > 0 && $(".ros").html().length == 0) {
              $(".ros").hide();
            }
          }

          if(DygDFP.device.isWeb())
          {
            $(".ros").css("z-index", 9999);
            $(".ros").append("<div id='div-300x250_Ros-1' class='hasAd'></div>");
            googletag.cmd.push(function() {googletag.display('div-300x250_Ros-1');});
          }

          if(DygDFP.device.isWeb())
          {
            $("nav.main").parent().parent().find(".wrapper").prepend("<div id='div-Masthead' style='margin-top:5px;width:1px;height:1px'></div>");
            if($(".sticky-wrapper").length > 0){
              $(".sticky-wrapper").after("<div id='div-PageSkin' style='display:none;width:1px;height:1px'></div>");
              googletag.cmd.push(function() {googletag.display('div-PageSkin');});
            }
            else{
              $("body").append("<div id='div-PageSkin' style='display:none;width:1px;height:1px'></div>");
              googletag.cmd.push(function() {googletag.display('div-PageSkin');});
            }
            $("body").prepend("<div id='div-interstitial'></div>");


            if ($("#story section.tags").length > 0) {
              $("#story section.tags").before("<div id='div-tlb' style='text-align:center'></div>");
              googletag.cmd.push(function() {googletag.display('div-tlb');});
            }

            if (DygDFP.section == "anasayfa") {
              $("body").append("<div id='div-richMedia' style='display:none'></div>");
              googletag.cmd.push(function() {googletag.display('div-richMedia');});
            }
            googletag.cmd.push(function() {googletag.display('div-Masthead');});
            googletag.cmd.push(function() {googletag.display('div-Tepe_728x90');});
            googletag.cmd.push(function() {googletag.display('div-interstitial');});
          }
          else if(DygDFP.device.isPhone())
          {
            $("body").append("<div id='div-interstitial'></div>");

            if($('#div-tlb').length>0)
            {
              googletag.cmd.push(function() {googletag.display('div-tlb');});
            }
            else
            {
              $('.content [itemprop="articleBody"]').eq(0).append("<div id='div-tlb'></div>");
              googletag.cmd.push(function() {googletag.display('div-tlb');});
            }


            googletag.cmd.push(function() {googletag.display('div-Tepe_728x90');});
            googletag.cmd.push(function() {googletag.display('div-interstitial');});
          }

          if(DygDFP.device.isTablet())
          {
            $("body").append("<div id='div-interstitial'></div>");
            if($('#div-tlb').length>0)
            {
              googletag.cmd.push(function() {googletag.display('div-tlb');});
            }
            else
            {
              $('.content [itemprop="articleBody"]').eq(0).append("<div id='div-tlb'></div>");
              googletag.cmd.push(function() {googletag.display('div-tlb');});
            }
            googletag.cmd.push(function() {googletag.display('div-interstitial');});
          }

          if(DygDFP.device.isWeb()){
            if($('#div-tlb').length>0)
            {
              googletag.cmd.push(function() {googletag.display('div-tlb');});
            }
            else
            {
              $('.content [itemprop="articleBody"]').eq(0).append("<div id='div-tlb'></div>");
              googletag.cmd.push(function() {googletag.display('div-tlb');});
            }
          }

          DygDFP.Takeover.appendSelector = $("#div-300x250_Ros-1");



        });
      }
    },
    prepareNativeAd: function(){
		$(".slidee").eq(0).find("li").eq(0).find("img").addClass("native-img");
		$(".slidee").eq(0).find("li").eq(0).find("h2").addClass("native-title");
		$(".slidee").eq(0).find("li").eq(0).find("a").addClass("native-url");
	},
	preparePageSkin: function(hasTopImage) {
      //DygDFP.PageSkin.changeMarginTop();
      DygDFP.Brand.NTVCOM_TR.OldPageSkinTop = DygDFP.PageSkin.marginTop;

	  if(DygDFP.section != 'videogaleri'){
		  $("header.cf").css("z-index",9999)
		  
	  }
	  
      if (DygDFP.section != 'fotogaleri' && DygDFP.section != 'videogaleri') {
        var pageHeight = $(document).height() - ($(".info-nav").outerHeight() + $("header").outerHeight() + $("nav.main").outerHeight() + $("#div-Tepe_728x90").height() + $("footer").height());

        if (pageHeight <= 1100) {
          $("#LeftSkin").css("height", (pageHeight - 47));
          $("#RightSkin").css("height", (pageHeight - 47));
        }
      }
      if (hasTopImage) {
        var top = 45;

        if ($("#category-page").length > 0) {
          $("#category-page .wrapper").eq(0).animate({
            marginTop: '+=' + top + 'px'
          }, 300, function() {
            DygDFP.PageSkin.show(true);
          });
        } else {
          $("nav.main").parent().parent().find(".wrapper").eq(0).animate({
            marginTop: '+=' + top + 'px'
          }, 300, function() {
            DygDFP.PageSkin.show(true);
          });
        }
      } else {
        DygDFP.PageSkin.show(true);
      }
    },
    prepareParalax: function() {
      DygDFP.Paralax.changeMarginTop();
      DygDFP.Paralax.show(true);
      $(".site-info").css("position", "absolute");
      $(".site-info").css("z-index", "99999");
    },
    scrollParalax: function() {
      if ($("nav.main").hasClass('fixed')) {
        $("#LeftSkin").css("top", "45px");
        $("#RightSkin").css("top", "45px");
        $("#RightSkin").css("position", "fixed");
        $("#LeftSkin").css("position", "fixed");
      } else {
        $("#RightSkin").css("position", "absolute");
        $("#LeftSkin").css("position", "absolute");
        DygDFP.Paralax.changeMarginTop();
      }
    },
    prepareVPaid: function() {;
      //$("#extendVidPanel").css("top", $("body object[data*='http://img-dygassets.mncdn.com/player']").offset().top - 192);
      $("#extendVidPanel").css("top", 0);
      $("#extendVidPanel").css("left", $("body object[data*='http://img-dygassets.mncdn.com/player']").offset().left - 160)
    },
    initVideoWall: function() {
      $(".grids").parent().find(".wrapper").css("z-index", "9999");
      $(".grids").parent().find(".wrapper").css("position", "relative");
      $(".grids").parent().find(".wrapper").css("background-color", "white");
      $(".grids").css("background", "");
      $(".grids").css("background-color", "white");
      $(".grids").css("position", "relative");
      $(".grids").animate({
        marginTop: '+=150px'
      }, 1000);
    },
    openVideoWall: function() {
      $(".grids").animate({
        marginTop: '+=850px'
      }, 1000);
    },
    closeVideoWall: function() {
      $(".grids").animate({
        marginTop: '-=850px'
      }, 1000);
    },
    prepareHtml5Masthead: function(q) {
      $("#sticky-wrapper nav.main").css("z-index", 9999);
    },
	scroll: function(){
		
	}
  }
}

$(document).ready(function() {
    //console.log('aa');
	$("nav.main").parent().parent().find(".wrapper").prepend('<div id="mastheadContainerDiv"></div>');
	DygDFP.Brand.NTVCOM_TR.init();
    DygDFP.Brand.NTVCOM_TR.prepareNativeAd();
    if(DygDFP.device.isWeb()){
      /*setTimeout(function(){
        var cookieName ='ntvhd';
        var cookieValue = getCookie(cookieName);
        if (cookieValue == "")
        {
          DygDFP.Interstitial2.init('http://img-dygassets.mncdn.com/Images/custom/NTV_HD.jpg');
          createCookie(cookieName,"123", 3 * 24 * 60);
        }
      },2000);*/
    }
    else if(DygDFP.device.isTablet()){
      if (DygDFP.section == 'videogaleri')
      {

          if ($('.vg-content').length>0)
            $('.vg-content').eq(0).prepend("<div id='div-Tepe_728x90' style='text-align:center;z-index:9;margin-bottom:5px;height:100px;'></div>");

          if ($('.box-300x250').length>0)
            $('.box-300x250').html("<div id='div-300x250_Ros-1' style='text-align:center;z-index:9;margin-bottom: 10px;'></div>");
      }
      if (DygDFP.section == 'fotogaleri')
      {
          //if ($('.breadcrumb').length>0) $('.breadcrumb').eq(0).after("<div id='div-Tepe_728x90' style='text-align:center;z-index:9;margin-bottom:5px;height:100px;'></div>");
        $(".breadcrumb").after("<div id='div-Tepe_728x90' style='text-align:center;z-index:9;margin-top:3px;height:90px;'></div>");

        if ($('.detail').length>0)
          $('.detail').eq(0).after("<div id='div-300x250_Ros-1' style='text-align:center;z-index:9;margin-bottom: 10px;'></div>");

      }
    }
    else{

    }






});

$(window).resize(function(){
  console.log(window.innerWidth);
  if(window.innerWidth >= 1600){
    DygDFP.PageSkin.containerWidth = 1280;
    DygDFP.PageSkin.resize();
  }
  else if(window.innerWidth < 1600 && window.innerWidth >= 1280){
    DygDFP.PageSkin.containerWidth = 960;
    DygDFP.PageSkin.resize();
  }
  else if(window.innerWidth < 1280){
    DygDFP.PageSkin.containerWidth = 768;
    DygDFP.PageSkin.resize();
  }

});

$(document).scroll(function(){
	if(DygDFP.section == 'videogaleri' ){
		if($(window).scrollTop() == 0)
		{
			if(DygDFP.Brand.NTVCOM_TR.HasLDB){
				$("header.cf").css("margin-top",90);
				$(".vg-sidebar").css("margin-top",93);
			}
		}
		else
		{
			if(DygDFP.Brand.NTVCOM_TR.HasLDB)
			{
				$("header.cf").css("margin-top",0);
				$(".vg-sidebar").css("margin-top",3);
			}
		}
	}
});
