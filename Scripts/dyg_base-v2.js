Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

String.prototype.replaceAll = function(find, replace) {
  var str = this;
  return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

String.prototype.format = function() {
  var formatted = this;
  for( var arg in arguments ) {
    formatted = formatted.replace("{" + arg + "}", arguments[arg]);
  }
  return formatted;
};



var instertitialSetTimeout;
var videowWallSetTimeout;
var ntvReloadSetTimeout;

var gptadslots = [];
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
  var gads = document.createElement('script');
  gads.async = true;
  gads.type = 'text/javascript';
  var useSSL = 'https:' == document.location.protocol;
  gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
  var node = document.getElementsByTagName('script')[0];
  node.parentNode.insertBefore(gads, node);
})();

function GetSiteName()
{
  var result = getMetaTag("dyg:site");
  switch (getMetaTag("dyg:site"))
  {
    case 'CNBC-e_Finans':
      result = 'NTVPara';
      break;
    /*case 'StarTVNEW':
     result = 'Startv';
     break;*/
  }
  return result ;
}

DygDFP = {
  siteName: GetSiteName(),
  section: getMetaTag("dyg:section"),
  target: getMetaTag("dyg:target"),
  categories: getMetaTag("dyg:tags"),
  isAdvertorial: getMetaTag("dyg:advertorial"),
  currentSiteNamePattern: function(functionName) {
    return ('DygDFP.Brand.' + DygDFP.siteName + '.' + functionName);
  },
  customParam: function() {
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

    tags.clean(undefined);
    if (DygDFP.siteName == 'NTVSpor') {
      return 'ntvsprcat%3D' + tags.toString().replaceAll(',', '%2C');
    } else if (DygDFP.siteName == 'NTVSpor_Mobile') {
      return 'ntvsprcat%3D' + tags.toString().replaceAll(',', '%2C');
    } else if (DygDFP.siteName == 'CNBC-e_Finans') {
      return 'ntvparacat%3D' + tags.toString().replaceAll(',', '%2C');
    } else if (DygDFP.siteName == 'Kral_Muzik') {
      return 'kral_cat%3D' + tags.toString().replaceAll(',', '%2C');
    } else if (DygDFP.siteName == 'StarTV') {
      return 'star_cat%3D' + tags.toString().replaceAll(',', '%2C');
    } else if (DygDFP.siteName == 'NTVCOM_TR') {
      return 'ntvcat%3D' + tags.toString().replaceAll(',', '%2C') + "%2C" + DygDFP.section;
    } else if (DygDFP.siteName == 'Vogue') {
      return 'vogue_cat%3D' + tags.toString().replaceAll(',', '%2C');
    }
  },
  allowAnimate: true,
  plugin: {
    videoJS: {
      has: function() {
        return (typeof videoJS === 'undefined');
      },
      init: function() {
        if (DygDFP.plugin.videoJS.has()) {
          var swfObject = document.createElement('script');
          swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/video.js';
          document.getElementsByTagName('head')[0].appendChild(swfObject);
        }
      }
    },
    getRandomNumber: function() {
      return Math.random().toString().replace('.', '')
    },
    iframeRequest: function(url, type) {
		if ($("body iframe#iframe_" + type).length == 0) {
			$("body").append("<iframe id='iframe_" + type + "' src='" + url + "'></iframe>")
		}
    },
	imageRequest: function(url, type){
      if ($("body img#img_" + type).length == 0) {
        $("body").append("<img id='img_" + type + "' src='" + url + "'/>")
      }
	},
    callEvent: function() {
      try {
        !window.dyg.pubsub || window.dyg.pubsub.events.emit("DFP.markupChanged");
      } catch (e) {

      }
    },
  },
  device: {
    isPhone: function() {
      return (DygDFP.device.isiPhone() || DygDFP.device.isWindowsPhone() || DygDFP.device.isAndroidPhone());
    },
    isTablet: function() {
      return (DygDFP.device.isiPad() || DygDFP.device.isAndroidTablet());
    },
    isiPad: function() {
      return (navigator.userAgent.match(/iPad/i) == 'iPad');
    },
    isiPhone: function() {
      return (navigator.userAgent.match(/iPhone/i) == 'iPhone');
    },
    isWindowsPhone: function() {
      return (navigator.userAgent.match(/Windows Phone/i) == 'Windows Phone');
    },
    isAndroidPhone: function() {
      if (navigator.userAgent.match(/Android/i)) {
        return (navigator.userAgent.match(/Mobile/i) == "Mobile")
      }

      return false;
    },
    isAndroidTablet: function() {
      if (navigator.userAgent.match(/Android/i)) {
        return (navigator.userAgent.match(/Mobile/i) == null)
      }

      return false;
    },
    isWeb: function() {
      if (DygDFP.device.isiPad() == false &&
        DygDFP.device.isiPhone() == false &&
        DygDFP.device.isWindowsPhone() == false &&
        DygDFP.device.isAndroidPhone() == false &&
        DygDFP.device.isAndroidTablet() == false) {
        return true;
      }

      return false;
    }
  },
  guidGenerator: function() {
    var S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  },
  flashDetect: function() {
    return ((typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] == "object") || (window.ActiveXObject && (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) != false));
  },
  reload: function() {
    DygDFP.section = getMetaTag("dyg:section");
    DygDFP.target = getMetaTag("dyg:target");
    DygDFP.categories = getMetaTag("dyg:tags");
    if (DygDFP.siteName == 'NTVCOM_TR' && DygDFP.device.isWeb() && googletag.pubads != undefined) {
      DygDFP.allowAnimate = false;
      clearTimeout(instertitialSetTimeout);
      clearTimeout(ntvReloadSetTimeout);
      $("#instertitial_dfp").remove();
      $(".ros").hide();

      googletag.cmd.push(function() {
        googletag.pubads().clearTargeting();
        googletag.pubads().updateCorrelator();
        $(".adPartContainer").remove();
        $(".infinitePageSkin").remove();
        $(".infiniteInsterstitial").remove();
        $(".PageSkinImp").remove();
        $(".InterstitialImp").remove();
        $(".ros").html('');

        if (DygDFP.section == 'fotogaleri') {
          $("#rklm_728x90").html('');
        }

        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var uniqid = (randLetter + Date.now()).toString();

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

        googletag.pubads().setTargeting('ntvcat', tags);

        var pageskinDivID = 'div-PageSkin-' + uniqid;
        var insterstitialID = 'div-interstitial-' + uniqid;
        var mpuID = 'div-300x250_Ros-' + uniqid;
        var ldbID = 'div-Tepe_728x90-' + uniqid;

        var insterstitialSlot = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/INS', insterstitialID).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
        var pageskinSlot = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/SKIN', pageskinDivID).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
        var mpuSlot = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU1', [
          [300, 250],
          [300, 600]
        ], mpuID).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
        var ldbSlot;
        if (DygDFP.section == 'fotogaleri') {
          ldbSlot = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/LDB', [
            [728, 90],
            [970, 90]
          ], ldbID).setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
          $("#rklm_728x90").append("<div id='" + ldbID + "' class='infiniteLDB' style='text-align:center'></div>")
          googletag.cmd.push(function() {
            googletag.display(ldbID);
          });
        }



        $("body").append("<div id='" + pageskinDivID + "' class='infinitePageSkin'></div>")
        googletag.cmd.push(function() {
          googletag.display(pageskinDivID);
        });

        $("body").append("<div id='" + insterstitialID + "' class='infiniteInsterstitial'></div>")
        googletag.cmd.push(function() {
          googletag.display(insterstitialID);
        });

        $(".ros").append("<div id='" + mpuID + "' class='infiniteMPU'></div>")
        googletag.cmd.push(function() {
          googletag.display(mpuID);
        });

        googletag.pubads().enableSingleRequest();
        googletag.pubads().enableAsyncRendering();
        googletag.enableServices();

        googletag.pubads().addEventListener('slotRenderEnded', function(event) {
          if (event.slot === mpuSlot) {
            if (!event.isEmpty) {
              $(".ros").show();
              DygDFP.plugin.callEvent();
            }
          } else if (event.slot == ldbSlot) {
            if (!event.isEmpty) {
              DygDFP.plugin.callEvent();
            }
          }
        });
      });


    }
    else if (DygDFP.siteName == 'Ntv' && !DygDFP.device.isWeb()) {
      if (DygDFP.section == 'fotogaleri') {
        //console.log("reloading");
        var fotoindex = $('.currentIndex').html();
        if (fotoindex % 4 == 0) {


          DygDFP.allowAnimate = false;
          clearTimeout(instertitialSetTimeout);
          clearTimeout(ntvReloadSetTimeout);
          //$("#instertitial_dfp").remove();
          //$(".ros").hide();
          $('[id^=div-Tepe_728x90]').remove();

          googletag.cmd.push(function () {
            googletag.pubads().clearTargeting();
            googletag.pubads().updateCorrelator();
            //$(".adPartContainer").remove();
            //$(".infinitePageSkin").remove();
            //$(".infiniteInsterstitial").remove();
            //$(".PageSkinImp").remove();
            //$(".InterstitialImp").remove();

            //$('#div-300x250_Ros-1').remove();
            //$('.mobilead_ros').remove();
            $('[id^=div-Tepe_728x90]').remove();
            //$(".ros").html('');


            var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            var uniqid = (randLetter + Date.now()).toString();

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

            googletag.pubads().setTargeting('ntvcat', tags);

            //var pageskinDivID = 'div-PageSkin-' + uniqid;
            //var insterstitialID = 'div-interstitial-' + uniqid;
            //var mpuID = 'div-300x250_Ros-' + uniqid;
            var ldbID = 'div-Tepe_728x90-' + uniqid;

            //var insterstitialSlot = googletag.defineOutOfPageSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + DygDFP.section + '/INS', insterstitialID).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            //var pageskinSlot = googletag.defineOutOfPageSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + DygDFP.section + '/SKIN', pageskinDivID).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            //var mpuSlot = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + DygDFP.section + '/MPU1', [[300, 250]], mpuID).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            //var mpuSlot = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/Test/MPU1', [[300, 250]], mpuID).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

            var ldbSlot;
            if (DygDFP.device.isTablet()) {
              ldbSlot = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + DygDFP.section + '/LDB', [
                [728, 90]
              ], ldbID).setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            }
            else {
              ldbSlot = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + DygDFP.section + '/LDB', [
                [320, 50], [320, 100], [320, 150]
              ], ldbID).setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
            }

            $(".breadcrumb").after("<div id='" + ldbID + "' class='infiniteLDB' style='text-align:center;margin-top:3px'></div>")
            googletag.cmd.push(function () {
              googletag.display(ldbID);
            });


            /*
             $("body").append("<div id='" + pageskinDivID + "' class='infinitePageSkin'></div>")
             googletag.cmd.push(function () {
             googletag.display(pageskinDivID);
             });

             $("body").append("<div id='" + insterstitialID + "' class='infiniteInsterstitial'></div>")
             googletag.cmd.push(function () {
             googletag.display(insterstitialID);
             });
             */

            /*
             $('article').last().append("<div id='" + mpuID + "' class='infiniteMPU' style='text-align:center;z-index:9;margin-bottom: 10px;'></div>")
             googletag.cmd.push(function () {
             googletag.display(mpuID);
             });


             $(".ros").append("<div id='" + mpuID + "' class='infiniteMPU'></div>")
             googletag.cmd.push(function () {
             googletag.display(mpuID);
             });
             */

            googletag.pubads().enableSingleRequest();
            googletag.pubads().enableAsyncRendering();
            googletag.enableServices();

            googletag.pubads().addEventListener('slotRenderEnded', function (event) {
              if (event.slot === mpuSlot) {
                if (!event.isEmpty) {
                  $('[id^=div-300x250_Ros]').show();
                  DygDFP.plugin.callEvent();
                }
              }
              else if (event.slot === ldbSlot) {
                if (!event.isEmpty) {
                  $('[id^=div-Tepe_728x90]').show();
                  DygDFP.plugin.callEvent();
                }
              }

            });
          });
        }
      }
      else {
        //console.log("reloading");
        DygDFP.allowAnimate = false;
        clearTimeout(instertitialSetTimeout);
        clearTimeout(ntvReloadSetTimeout);
        //$("#instertitial_dfp").remove();
        //$(".ros").hide();
        $('[id^=div-300x250_Ros]').remove();

        googletag.cmd.push(function () {
          googletag.pubads().clearTargeting();
          googletag.pubads().updateCorrelator();
          //$(".adPartContainer").remove();
          //$(".infinitePageSkin").remove();
          //$(".infiniteInsterstitial").remove();
          //$(".PageSkinImp").remove();
          //$(".InterstitialImp").remove();

          //$('#div-300x250_Ros-1').remove();
          //$('.mobilead_ros').remove();
          $('[id^=div-300x250_Ros]').remove();
          //$(".ros").html('');

          //if (DygDFP.section == 'fotogaleri') {
          //  $("#rklm_728x90").html('');
          //}

          var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
          var uniqid = (randLetter + Date.now()).toString();

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

          googletag.pubads().setTargeting('ntvcat', tags);

          //var pageskinDivID = 'div-PageSkin-' + uniqid;
          //var insterstitialID = 'div-interstitial-' + uniqid;
          var mpuID = 'div-300x250_Ros-' + uniqid;
          //var ldbID = 'div-Tepe_728x90-' + uniqid;

          //var insterstitialSlot = googletag.defineOutOfPageSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + DygDFP.section + '/INS', insterstitialID).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
          //var pageskinSlot = googletag.defineOutOfPageSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + DygDFP.section + '/SKIN', pageskinDivID).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
          var mpuSlot = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + DygDFP.section + '/MPU1', [[300, 250]], mpuID).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
          //var mpuSlot = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/Test/MPU1', [[300, 250]], mpuID).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

          /*
           var ldbSlot;
           if (DygDFP.section == 'fotogaleri') {
           ldbSlot = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/MobileSite/' + DygDFP.section + '/LDB', [
           [728, 90],
           [970, 90]
           ], ldbID).setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
           $("#rklm_728x90").append("<div id='" + ldbID + "' class='infiniteLDB' style='text-align:center'></div>")
           googletag.cmd.push(function () {
           googletag.display(ldbID);
           });
           }
           */

          /*
           $("body").append("<div id='" + pageskinDivID + "' class='infinitePageSkin'></div>")
           googletag.cmd.push(function () {
           googletag.display(pageskinDivID);
           });

           $("body").append("<div id='" + insterstitialID + "' class='infiniteInsterstitial'></div>")
           googletag.cmd.push(function () {
           googletag.display(insterstitialID);
           });
           */


          $('article').last().append("<div id='" + mpuID + "' class='infiniteMPU' style='text-align:center;z-index:9;margin-bottom: 10px;'></div>")
          googletag.cmd.push(function () {
            googletag.display(mpuID);
          });

          /*
           $(".ros").append("<div id='" + mpuID + "' class='infiniteMPU'></div>")
           googletag.cmd.push(function () {
           googletag.display(mpuID);
           });
           */

          googletag.pubads().enableSingleRequest();
          googletag.pubads().enableAsyncRendering();
          googletag.enableServices();

          googletag.pubads().addEventListener('slotRenderEnded', function (event) {
            if (event.slot === mpuSlot) {
              if (!event.isEmpty) {
                $('[id^=div-300x250_Ros]').show();
                DygDFP.plugin.callEvent();
              }
            }
            /*
             else if (event.slot == ldbSlot) {
             if (!event.isEmpty) {
             DygDFP.plugin.callEvent();
             }
             }
             */
          });
        });
      }
    }
	else if(DygDFP.siteName == 'NTVCOM_TR' && DygDFP.device.isPhone() && googletag.pubads != undefined)
	{
		if ($("#div-Tepe_728x90").is(":visible") && (DygDFP.section == 'fotogaleri' || DygDFP.section == 'videogaleri')) {
			//$(".swiper-slide.current").css("margin-bottom",50);
		}			
	}
	else if (DygDFP.siteName == 'Vogue') {
      clearTimeout(instertitialSetTimeout);
      $("#instertitial_dfp").remove();
      $('ul#slideshow').find("#div-300x250_Ros-1").remove();
      $('ul#slideshow').find('li:visible').find('.fotogaleri-detay-300x250').append("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px'></div>");
      setTimeout(function() {
        googletag.pubads().refresh();
      }, 100);
    } 
  },
  callGoal: function(t, t1) {
    console.log('call goal method param1 : ' + t + ', param2 : ' + t1);
  },
  VideoRequests: function(){
	  var ui = "/37011203/Web/StarTV/Diziler/";
	  
	  var siteName = DygDFP.siteName;
	  var section = DygDFP.section;


	if(DygDFP.siteName == 'NTVPara'){
		if(DygDFP.section == 'Video_Galeri'){
			section = "videogaleri";
		}
	}
	  
	  if(DygDFP.device.isWeb()){
		  ui = "/37011203/Web/" + siteName + "/" + section + "/";
	  }
	  else{
		  ui = "/37011203/Mobile/" + siteName + "/Mobile_Site/" + section + "/";
        //console.log(ui);
	  }

    if(siteName == "NTVSpor_Mobile") {
      siteName = "NTVSpor_App";
      if (DygDFP.device.isWeb()) {
        ui = "/37011203/Web/" + siteName + "/" + section + "/";
      }
      else {
        ui = "/37011203/" + siteName + "/MobileSite/" + section + "/";
        //ui = "/37011203/Mobile/" + siteName + "/Mobil_Site/" + section + "/";
        //console.log(ui);
      }
    }
    else if(siteName == "NtvPara")
    {
      if(DygDFP.device.isWeb())
      {
        ui = '/37011203/'+siteName + '/Desktop/' + section + '/';
      }
      else
      {
        ui = '/37011203/'+ siteName + '/MobileSite/' + section + '/';
      }
    }
    else if(siteName == "NTV_App")
    {
      if(!DygDFP.device.isWeb())
      {
        siteName = "Ntv";
        ui = '/37011203/'+ siteName + '/MobileSite/' + section + '/';
      }
    }
	  
	  var videoType = "";
	  if(DygDFP.siteName == "StarTV"){
		  if(DygDFP.section != "Canli"){
			  if(DygDFP.target.indexOf('act-bolum') > -1){
				  videoType = "_Bolum";
			  }
			  else if(DygDFP.target.indexOf('act-fragman') > -1){
				  videoType = "_Fragman";
			  }
			  else{
				  videoType = "_Extra";
			  }  
		  }
		  else{
			  videoType = "";
		  }
	  }
	else{
		videoType = "";
	}
	 var pre = { key : "PreRequest", url : "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=" + ui + "PRE" + videoType + "&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=" + DygDFP.guidGenerator() + "&cust_params=" + DygDFP.customParam() + "&ad_rule=0", time : 0}
	 //console.log("pre : " + ui +"PRE");
	 var over = { key : "OverRequest", url : "https://pubads.g.doubleclick.net/gampad/ads?sz=480x70&iu=" + ui + "OVER" + videoType +  "&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=" + DygDFP.guidGenerator() + "&cust_params=" + DygDFP.customParam() + "&ad_rule=0", time : 30, closeButoon:true}
     //console.log("over : " +  ui+"OVER");
	 var mid = { key : "MidRequest", url : "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=" + ui + "MID" + videoType +  "&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=" + DygDFP.guidGenerator() + "&cust_params=" + DygDFP.customParam() + "&ad_rule=0", time : 422}
     //console.log("mid : " + ui+ "MID");
	 var post = { key : "PostRequest", url : "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=" + ui + "POST" + videoType +  "&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=" + DygDFP.guidGenerator() + "&cust_params=" + DygDFP.customParam() + "&ad_rule=0", time : -1}
     //console.log("post : " +  ui+"POST");
	 return [pre,over,mid,post]
  },
  init: function() {
    setTimeout(function() {
      $("body").append("<div id='extendVidPanel' class=''><div id='extendVid'></div></div>");
    }, 1000);
    if (DygDFP.isAdvertorial.length == 0) {
      var imported = document.createElement('script');
      imported.src = 'http://img-dygassets.mncdn.com/Scripts/' + DygDFP.siteName.replace('-', '') + '.js?v=1';
      if(DygDFP.siteName == "StarTVNEW")
      {
        DygDFP.siteName = 'Startv';
      }
      document.getElementsByTagName('head')[0].appendChild(imported);

      if (typeof swfobject === 'undefined') {
        var swfObject = document.createElement('script');
        swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
        document.getElementsByTagName('head')[0].appendChild(swfObject);
      }
    }
  },
  PageSkin: {
    marginTop: 0,
    containerWidth: 980,
    appendSelector: '',
    init: function(leftSkinImage, leftSkinClickURL, rightSkinImage, rightSkinClickURL, topSkinImage, topSkinClickURL, impressionURL) {
      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" class="PageSkinImp" />');
      }
      var leftSkinExtraStyle = '';
      var leftTargetBlank = 'target="_blank"';
      if (leftSkinClickURL == '') {
        leftTargetBlank = '';
        leftSkinClickURL = 'javascript:;';
        leftSkinExtraStyle = ';cursor:default'
      }
      var rightSkinExtraStyle = '';
      var rightTargetBlank = 'target="_blank"';
      if (rightSkinClickURL == '') {
        rightSkinClickURL = 'javascript:;';
        rightSkinExtraStyle = ';cursor:default'
        rightTargetBlank = '';
      }

      var partImageWidth = (($(window).width() - DygDFP.PageSkin.containerWidth) / 2);
      var top = 0;
      var pattern = '<div class="adPartContainer" style="display:none">';
      pattern += '<a id="LeftSkin" ' + leftTargetBlank + ' href="' + leftSkinClickURL + '" style="position:absolute;left:0;z-index:5;height:1100px' + leftSkinExtraStyle + '"></a>';
      pattern += '<a id="RightSkin" ' + rightTargetBlank + ' href="' + rightSkinClickURL + '" style="position:absolute;right:0;z-index:5;height:1100px' + rightSkinExtraStyle + '"></a>';

      if (topSkinImage != '') {
        var topSkinExtraStyle = '';
        var topTargetBlank = 'target="_blank"';
        if (topSkinClickURL == '') {
          topSkinClickURL = 'javascript:;';
          topSkinExtraStyle = ';cursor:default'
          topTargetBlank = '';
        }
        pattern += '<a id="TopSkin" ' + topTargetBlank + ' href="' + topSkinClickURL + '" style="position:absolute;right:0;z-index:5;height:50px' + topSkinExtraStyle + '"></a>';
      }
      pattern += '</div>';

      if (DygDFP.PageSkin.appendSelector == '') {
        $("body").append(pattern);
      } else {
        $(DygDFP.PageSkin.appendSelector).append(pattern);
      }

      //$("#div-PageSkin").hide();

      $("#LeftSkin").css("background", "url(" + leftSkinImage + ") no-repeat 100% 0 ");
      $("#LeftSkin").css("width", partImageWidth);
      $("#LeftSkin").css("top", DygDFP.PageSkin.marginTop);
      $("#RightSkin").css("background", "url(" + rightSkinImage + ") no-repeat 0 0 ");
      $("#RightSkin").css("width", partImageWidth);
      $("#RightSkin").css("top", DygDFP.PageSkin.marginTop);

      if ($("#sticky-wrapper").hasClass("is-sticky")) {
        $("#LeftSkin").css("z-index", "");
        $("#RightSkin").css("z-index", "");

        if ($("#sticky-wrapper").hasClass("is-sticky")) {
          $("#LeftSkin").css("position", "fixed");
          $("#RightSkin").css("position", "fixed");
          $("#RightSkin").css("top", 86);
          $("#LeftSkin").css("top", 86);
        }
      }

      if (topSkinImage != '') {
        setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".preparePageSkin(true)", 400);
        $("#TopSkin").css("background", "url(" + topSkinImage + ") no-repeat 0 0 ");
        $("#TopSkin").css("top", DygDFP.PageSkin.marginTop);
        $("#TopSkin").css("left", partImageWidth);
      } else {
        setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".preparePageSkin(false)", 400);
      }
    },
    show: function(hasAnimation) {
      if (hasAnimation) {
        $(".adPartContainer").fadeIn(300);
      } else {
        $(".adPartContainer").show();
      }
      DygDFP.plugin.callEvent();
    },
    resize: function() {
      var partImageWidth = (($(window).width() - DygDFP.PageSkin.containerWidth) / 2);

      $("#LeftSkin").css({
        width: partImageWidth,
      });

      $("#RightSkin").css({
        width: partImageWidth,
      });

      $("#TopSkin").css({
        left: partImageWidth,
      });
    },
    changeMarginTop: function() {

      $("#LeftSkin").css("top", DygDFP.PageSkin.marginTop);
      $("#RightSkin").css("top", DygDFP.PageSkin.marginTop);
      $("#TopSkin").css("top", DygDFP.PageSkin.marginTop);
    },
  },
  LeaderBoard: {
    marginTop: 0,
    containerWidth: 980,
    backgroundColor: "",
    init: function(swfFile, backupImageFile, backupImageClickURL, imageFile, clickURL, iFrameUrl, impressionURL, width, height, clickTagParam, scriptCode, selector, backgroundColor) {

      if (scriptCode.indexOf('reklamport.com') > -1) {
        var reklamPort = document.createElement('script');
        reklamPort.src = 'http://ad.reklamport.com/scripts/rp.js';
        document.head.appendChild(reklamPort);
      }

      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
      }

      if (backgroundColor == undefined || backgroundColor == '') {
        backgroundColor = DygDFP.LeaderBoard.backgroundColor;
      } else if (backgroundColor == "Grey") {
        backgroundColor = "#f9f9f9";
      }

      if (width == 300) {
        $("#div-MPU_Fix").find("iframe").parent().hide();
        $("#div-MPU_Fix").css("margin-bottom", "10px");
        $("#div-MPU_Fix").show();
        if (swfFile != '') {
          var swfObject = document.createElement('script');
          swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
          document.getElementsByTagName('head')[0].appendChild(swfObject);

          var flashvars = false;
          var params = {
            flashvars: clickTagParam + "=" + encodeURIComponent(clickURL),
            wmode: "transparent",
            allowscriptaccess: 'always'
          };

          $("#div-MPU_Fix").append("<div id='MPU_SWF'></div>")
          if (DygDFP.flashDetect() == undefined) {
            $("#MPU_SWF").append('<a href="' + backupImageClickURL + '" target="_blank"><img src="' + backupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
          }
          setTimeout(function() {
            swfobject.embedSWF(swfFile, "MPU_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
          }, 500);
        } else if (imageFile != '') {
          $("#div-MPU_Fix").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
        } else if (iFrameUrl != '') {
          $("#div-MPU_Fix").append("<iframe src='" + iFrameUrl + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
        }
      } else {
        var appendDiv = $("div[id='" + selector + "__container__']").parent();

        if (DygDFP.allowAnimate) {
          $(appendDiv).animate({
            height: '+=' + height + 'px'
          }, 800);
        } else {
          if ($(appendDiv).height() < 80) {
            $(appendDiv).css("height", "80px");
          }
        }

        if (scriptCode != '') {
          $("iframe[id='" + selector + "']").css("height", height);
          $("iframe[id='" + selector + "']").css("width", width);
          setTimeout(function() {
            $("iframe[id='" + selector + "']").parent().show();
          }, 1000);
        } else {
          if (DygDFP.siteName == 'NTVSpor' || DygDFP.siteName == 'GQ') {
            $("iframe[id='" + selector + "']").parent().hide();
          }
        }

        $(appendDiv).css("text-align", "center");
        $(appendDiv).css("width", "100%");
        $(appendDiv).css("background-color", backgroundColor);


        if (DygDFP.siteName == 'Vogue' && scriptCode.length == 0) {
          $(appendDiv).find("iframe").hide();
        } else if (DygDFP.siteName == 'Vogue') {
          $(appendDiv).parent().css("background-color", backgroundColor);
        } else if (DygDFP.siteName == 'NTVCOM_TR' && scriptCode.length == 0) {
          $(appendDiv).find("iframe").hide();
        } else if (DygDFP.siteName == 'CNBC-e_Finans' && scriptCode.length == 0) {
          $(appendDiv).find("iframe").hide();
        }

        if (swfFile != '') {
          var swfObject = document.createElement('script');
          swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
          document.getElementsByTagName('head')[0].appendChild(swfObject);

          var flashvars = false;
          var params = {
            flashvars: clickTagParam + "=" + encodeURIComponent(clickURL),
            wmode: "transparent",
            allowscriptaccess: 'always'
          };

          $(appendDiv).append("<div id='LDB_SWF'></div>")
          if (DygDFP.flashDetect() == undefined) {
            $("#LDB_SWF").append('<a href="' + backupImageClickURL + '" target="_blank"><img src="' + backupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
          }
          setTimeout(function() {
            swfobject.embedSWF(swfFile, "LDB_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
          }, 500);
        } else if (imageFile != '') {
          $(appendDiv).append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
        } else if (iFrameUrl != '') {
          $(appendDiv).append("<iframe src='" + iFrameUrl + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
        }
      }
    },
    show: function(hasAnimation) {},
  },
  MobileLeaderBoard: {
    marginTop: 0,
    containerWidth: 980,
    backgroundColor: "",
    init: function(imageFile, iframeURL, clickURL, impressionURL, width, height, scriptURL) {

      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
      }

      $("#div-Tepe_728x90").css("height", "0");
      setTimeout(function() {
        $("#div-Tepe_728x90").show();
      }, 200);
      $("#div-Tepe_728x90").animate({
        height: '+=' + height + 'px'
      }, 800);

      $("#div-Tepe_728x90").css("text-align", "center");
      $("#div-Tepe_728x90").css("width", "100%");
      $("#div-Tepe_728x90").css("background-color", DygDFP.LeaderBoard.backgroundColor);
      $("#div-Tepe_728x90").find("iframe").parent().hide();
      if (imageFile != '') {
        $("#div-Tepe_728x90").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
      } else if (iframeURL != '') {
        $("#div-Tepe_728x90").append("<iframe src='" + iframeURL + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
      } else if (scriptURL != '') {
        var script = document.createElement('script');
        script.src = scriptURL;
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    }
  },
  MobileMasthead: {
    marginTop: 0,
    containerWidth: 980,
    backgroundColor: "",
    init: function(imageFile, iframeURL, clickURL, impressionURL, width, height, scriptURL) {

      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
      }

      $("#div-Masthead").css("height", "0");
      setTimeout(function() {
        $("#div-Masthead").show();
      }, 200);
      $("#div-Masthead").animate({
        height: '+=' + height + 'px'
      }, 800);

      $("#div-Masthead").css("text-align", "center");
      $("#div-Masthead").css("width", "100%");
      $("#div-Masthead").css("background-color", DygDFP.LeaderBoard.backgroundColor);
      $("#div-Masthead").find("iframe").parent().hide();
      if (imageFile != '') {
        $("#div-Masthead").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
      } else if (iframeURL != '') {
        $("#div-Masthead").append("<iframe src='" + iframeURL + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
      } else if (scriptURL != '') {
        var script = document.createElement('script');
        script.src = scriptURL;
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    }
  },
  Interstitial: {
    init: function(imageFile, clickURL, duration, backgroundColor, swfFile, swfBackupImageFile, swfBackupImageClickURL, impressionURL, width, height, clickTagParam, showHeaderBar, marginTop, impressionURL2,iframeURL) {
      if ($("#instertitial_dfp").length > 0) {
        return false;
      }

      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" class="InterstitialImp" />');
      }

      if (impressionURL2 != '') {
        $("body").prepend('<img src="' + impressionURL2 + '" alt="" style="display:none" class="InterstitialImp" />');
      }

      var sourceCode = '<div id="instertitial_dfp" style="background-color:' + backgroundColor + ';top:0px;z-index:99999;width:100%;position:fixed;height:' + $(document).height() + 'px;font-size:16px">';
      if (showHeaderBar == 'Show') {
        sourceCode += '<div style="background:linear-gradient(to bottom,rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);border:1px solid #ddd;width: 100%;height: 30px;position:absolute;top:0px;left:0px;margin: 0px;padding: 0px">';
        sourceCode += '<span id="instertitial_dfp_duration" style="position:absolute;right:270px;top:6px;color:#9C9C9C;font-size:13px;font-family:Verdana">' + duration + '</span><span  style="position:absolute;right:110px;top:6px;color:#9C9C9C;font-size:12px;font-family:Verdana">saniye sonra kapanacakt\u0131r</span>';
        sourceCode += '<a href="javascript:void(0)" id="instertitial_dfp_close" onclick="DygDFP.Interstitial.close();" style="font-family:Verdana;position:absolute;right:10px;top:0px;font-size:11px;padding:5px 8px;color:black;border:1px solid #DDD;text-decoration:none;border-radius:4px;background: rgb(255,255,255); /* Old browsers */background: -moz-linear-gradient(top,  rgba(255,255,255,1) 0%, rgba(229,229,229,1) 100%); /* FF3.6+ */background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(100%,rgba(229,229,229,1))); /* Chrome,Safari4+ */background: -webkit-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%); /* Opera 11.10+ */background: -ms-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%); /* IE10+ */background: linear-gradient(to bottom,  rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%); /* W3C */filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#ffffff", endColorstr="#e5e5e5",GradientType=0 ); /* IE6-9 */">Reklamı Geç</a>';
        sourceCode += '</div>';
      } else {
        sourceCode += '<span id="instertitial_dfp_duration" style="position:absolute;right:215px;top:1px;color:#fff;font-size:13px;font-weight:bold;font-family:Verdana;display:none">' + duration + '</span>';
      }
	  
	  marginTop = (($(window).height()) - (height)) / 2;

		if(marginTop < 0){
			marginTop = 35;
		}
	  
      sourceCode += '<div id="instertitial_dfp_ad" style="width:100%;margin-top:' + (marginTop) + 'px;text-align:center">';
      sourceCode += '</div>';
      sourceCode += '</div>';

      $("body").append(sourceCode);
      $("#div-interstitial").hide();
      if (imageFile != '') {
        $("#instertitial_dfp_ad").append('<a href="' + clickURL + '" target="_blank"><img style="border:8px solid white;" src="' + imageFile + '" alt="" /></a>');
		DygDFP.Interstitial.changeDuration();
      } else if (swfFile != '') {
        if (typeof swfobject === 'undefined') {
          var swfObject = document.createElement('script');
          swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
          document.getElementsByTagName('head')[0].appendChild(swfObject);
        }
        var flashvars = false;
        var params = {
          flashvars: clickTagParam + "=" + encodeURIComponent(clickURL),
          allowscriptaccess: 'always',
          wmode: "transparent"
        };
        $("#instertitial_dfp_ad").append("<div style='width:800px;border:8px solid white;left:0;right:0;margin:auto;'><div id='INS_SWF'></div></div>")
        if (DygDFP.flashDetect() == undefined) {
          $("#INS_SWF").append('<a href="' + swfBackupImageClickURL + '" target="_blank"><img src="' + swfBackupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
        } else {
          setTimeout(function() {
            swfobject.embedSWF(swfFile, "INS_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params, DygDFP.Interstitial.changeDuration());
          }, 1000);
        }
      }
	  else if(iframeURL!= ''){
		  $("#instertitial_dfp_ad").append('<iframe style="border:8px solid white;"  id="instertitial_iframe" src="' + iframeURL + '?clickTAG=' + clickURL+'"></iframe>');
		  $("#instertitial_iframe").css("width",width);
		  $("#instertitial_iframe").css("height",height);
		  DygDFP.Interstitial.changeDuration();
	  }

      $("body").css("overflow", "hidden");
      var script = top.document.createElement("script");
      script.text = "function closeTakeOver(){ DygDFP.Interstitial.close();}";
      script.setAttribute("type", "text/javascript");
      top.document.getElementsByTagName("head")[0].appendChild(script);

     

    },
    changeDuration: function() {
      var currentSecond = parseInt($("body").find("#instertitial_dfp_duration").html());
      $("body").find("#instertitial_dfp_duration").html(currentSecond - 1);
      if (currentSecond == 1) {
        DygDFP.Interstitial.close();
      } else {
        instertitialSetTimeout = setTimeout('DygDFP.Interstitial.changeDuration();', 1000);
      }
    },
    close: function() {
      $("#instertitial_dfp").fadeOut();
      $("body").css("overflow", "");
      DygDFP.PageSkin.resize();
    }
  },
  Interstitial2: {
    init: function(imageFile) {
      if ($("#instertitial_dfp").length > 0) {
        return false;
      }
      var sourceCode = '<div id="instertitial_dfp" style="top:0px;z-index:4000;width:100%;position:fixed;height:' + $(document).height() + 'px;font-size:16px">';

      marginTop = 150;

      sourceCode += '<div id="instertitial_dfp_ad" style="width:100%;margin-top:' + (marginTop) + 'px;text-align:center;z-index:3000">';
      sourceCode += '</div>';
      sourceCode += '<div id="instertitial_content" style="position: absolute;top: 0px; left: 0px;width: 100%;height: 100%;background-color: Black;z-index:-1;opacity: 0.6"></div>';
      sourceCode += '</div>';

      $("body").append(sourceCode);
      $("#div-interstitial").hide();
      if (imageFile != '') {
        $("#instertitial_dfp_ad").append('<img style="border:8px solid white;" src="' + imageFile + '" alt="" />');
      }

      $("body").css("overflow", "hidden");
      var script = top.document.createElement("script");
      script.text = "function closeTakeOver(){ DygDFP.Interstitial.close();}";
      script.setAttribute("type", "text/javascript");
      top.document.getElementsByTagName("head")[0].appendChild(script);


      $('#instertitial_dfp_ad').click(function(){
        DygDFP.Interstitial2.close();
      });
    },
    close: function() {
      $("#instertitial_dfp").fadeOut();
      $("body").css("overflow", "");
      DygDFP.PageSkin.resize();
    }
  },
  Floating: {
    init: function(imageFile, clickURL, duration, swfFile, swfBackupImageFile, swfBackupImageClickURL, impressionURL, width, height, clickTagParam) {
      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
      }

      var marginTop = 0;

      if ($(window).height() > height) {
        marginTop = ($(window).height() - height) / 2;
      }

      var sourceCode = '<div id="floating_dfp" style="display:block;top:0px;z-index:99999;width:100%;position:fixed;height:' + $(document).height() + 'px;font-size:16px">';
      sourceCode += '<span id="floating_dfp_duration" style="position:absolute;right:215px;top:1px;color:#fff;font-size:13px;font-weight:bold;font-family:Arial;display:none">' + duration + '</span>';
      sourceCode += '<div id="floating_dfp_ad" style="width:100%;margin-top:' + marginTop + 'px;position:absolute;text-align:center">';
      sourceCode += '<a href="javascript:void(0)" id="floating_dfp_close" onclick="DygDFP.Floating.close();" style="position:absolute;margin-top:-15px;left:50%;margin-left:' + ((width / 2) - 15) + 'px"><img src="http://img-dygassets.mncdn.com/Images/closeFloatingBTN.png" /></a>';
      sourceCode += '</div>';
      sourceCode += '</div>';

      $("body").append(sourceCode);
      $("#div-interstitial").hide();

      if (imageFile != '') {
        $("#floating_dfp_ad").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" /></a>');
      } else if (swfFile != '') {
        if (typeof swfobject === 'undefined') {
          var swfObject = document.createElement('script');
          swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
          document.getElementsByTagName('head')[0].appendChild(swfObject);
        }
        var flashvars = false;
        var params = {
          flashvars: clickTagParam + "=" + encodeURIComponent(clickURL),
          allowscriptaccess: 'always',
          wmode: "transparent"
        };

        $("#floating_dfp_ad").append("<div id='FLOATING_SWF'></div>")
        if (DygDFP.flashDetect() == undefined) {
          $("#FLOATING_SWF").append('<a href="' + swfBackupImageClickURL + '" target="_blank"><img src="' + swfBackupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
        } else {
          setTimeout(function() {
            swfobject.embedSWF(swfFile, "FLOATING_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
          }, 1000);
        }
      }

      DygDFP.Floating.changeDuration();
    },
    changeDuration: function() {
      var currentSecond = parseInt($("body").find("#floating_dfp_duration").html());
      //console.log(currentSecond);
      $("body").find("#floating_dfp_duration").html(currentSecond - 1);
      if (currentSecond == 1) {
        DygDFP.Floating.close();
      } else {
        setTimeout('DygDFP.Floating.changeDuration();', 1000);
      }
    },
    close: function() {
      $("#floating_dfp").fadeOut();
      DygDFP.PageSkin.resize();
    }
  },
  MobileInterstitial: {
    init: function(imageFile, iframeURL, clickURL, impressionURL, duration, width, height, backgroundColor, scriptURL) {
      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
      }

      $("#div-interstitial").hide();

      var sourceCode = '<div id="instertitial_dfp" style="background-color:' + backgroundColor + ';top:0px;z-index:9999999;width:100%;position:fixed;height:' + $(document).height() + 'px;font-size:16px">';
      sourceCode += '<div style="z-index:1;background-color:black;opacity:0.5;width: 100%;height: 20px;position:absolute;top:0px;left:0px;margin: 0px;padding: 0px"></div>';

      sourceCode += '<div style="z-index: 999;position: absolute;width: 310px;right: 0;"><span id="instertitial_dfp_duration" style="position:absolute;right:160px;top:5px;color:#fff;font-size:11px;font-weight:bold;font-family:Arial">' + duration + '</span><span  style="position:absolute;right:35px;top:5px;color:#fff;font-size:10px;font-family:Arial">saniye sonra kapanacakt\u0131r</span>';
      sourceCode += '<a href="javascript:void(0)" id="instertitial_dfp_close" onclick="DygDFP.Interstitial.close();" style="text-align:center;font-size:13px;height:19px;position:absolute;right:0px;top:0px;width:30px;color:#fff;text-decoration:none;font-family:Arial"><img style="width:40px;top: -5px;position: absolute;right: -2px;" src="http://img-dygassets.mncdn.com/Images/close_button.png"/></a></div>';
	  
	  var marginTop = ($(window).height() - height) / 2;
	  
      sourceCode += '<div id="instertitial_dfp_ad" style="width:100%;position:absolute;text-align:center;margin-top:'+marginTop+'px">';
      sourceCode += '</div>';
      sourceCode += '</div>';

      $("body").append(sourceCode);
      $("body").css("overflow", "hidden");

      if (imageFile != '') {
        $("#instertitial_dfp_ad").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" /></a>');
      } 
	  else if (iframeURL != '') {
        $("#instertitial_dfp_ad").append("<a style='width:100%;height:100%;z-index:99999;position:absolute;margin-top:29px' href='" + clickURL + "' target='_blank'></a><iframe src='" + iframeURL + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
      }
	  else if (scriptURL != '') {
        $("#instertitial_dfp_ad").append("<iframe src='" + scriptURL + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
      }

      $("body").css("overflow", "hidden");

      DygDFP.MobileInterstitial.changeDuration();

    },
    changeDuration: function() {
      var currentSecond = parseInt($("body").find("#instertitial_dfp_duration").html());
      $("body").find("#instertitial_dfp_duration").html(currentSecond - 1);
      if (currentSecond == 1) {
        DygDFP.Interstitial.close();
      } else {
        setTimeout('DygDFP.MobileInterstitial.changeDuration();', 1000);
      }
    },
    close: function() {
      $("#instertitial_dfp").remove();
      $("body").css("overflow", "");
    }
  },
  Masthead: {
    appendSelector: $("body"),
    init: function(panel1SwfFile, panel1BackupImageFile, panel2SwfFile, panel2BackupImageFile, clickURL, flvURL, brandURL, impressionURL, panel1Width, panel1Height, panel2Width, panel2Height, playerWidth, playerHeight, playerLeft, playerTop, hasScriptCode, backgroundColor, selector) {

      if (hasScriptCode) {
        panel1Height = 0;
        if (panel1Height == 0) {
          $("#div-Masthead iframe").css("height", panel2Height);
          $("#div-Masthead iframe").css("width", panel2Width);
        }

        return false;
      }

      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
      }

      var panel1MarginTop = 0;
      var panel2MarginTop = 0;
      var showBtnMarginTop = 0;
      var showBtnMarginLeft = 850;

      $("#div-Masthead").hide();

      if (DygDFP.siteName == 'Vogue') {
        $($("div[id='" + selector + "__container__']").parent()).before("<div id='mastheadDiv'></div>");
        $($("div[id='" + selector + "__container__']").parent()).css("margin-top", 0);
        $($("div[id='" + selector + "__container__']").parent()).css("margin-bottom", 0);
        if (backgroundColor != '' && backgroundColor != undefined) {
          if (backgroundColor == "Grey") {
            backgroundColor = "#f9f9f9";
          }
          $("#mastheadDiv").css("background-color", backgroundColor);
        }
      }

      $(DygDFP.Masthead.appendSelector).prepend('<div id="mastheadPanel" style="margin-top:5px"></div>');
      $("#mastheadPanel").css("width", panel1Width);
      $("#mastheadPanel").css("height", panel1Height);
      $("#mastheadPanel").css("margin", "auto");
      $("#mastheadPanel").css("left", 0);
      $("#mastheadPanel").css("right", 0);
      //$("#mastheadPanel").css("margin-bottom","5px");

      if (DygDFP.siteName == 'Vogue') {
        $("#mastheadPanel").css("padding-top", "10px");
        $("#mastheadPanel").css("padding-bottom", "10px");
        $("#mastheadPanel").css("display", "table");
      }


      $("#mastheadPanel").append('<div id="mastheadSubPanel1"></div>');
      $("#mastheadSubPanel1").append('<div id="mastheadSubPanel1Click"></div>');
      $("#mastheadSubPanel1").css("position", "relative");
      $("#mastheadSubPanel1").css("margin-top", panel1MarginTop);

      $("#mastheadSubPanel1Click").attr("onclick", "DygDFP.Masthead.open(" + panel2Height + ");");
      $("#mastheadSubPanel1Click").css("cursor", "pointer");
      $("#mastheadSubPanel1Click").css("position", "absolute");
      $("#mastheadSubPanel1Click").css("height", panel1Height);
      $("#mastheadSubPanel1Click").css("width", panel1Width);

      $("#mastheadSubPanel1").append('<a id="mastheadSubPanel1Show" href="javascript:;"></a>')
      $("#mastheadSubPanel1Show").css("margin-top", showBtnMarginTop);
      $("#mastheadSubPanel1Show").css("left", 0);
      $("#mastheadSubPanel1Show").css("position", "absolute");
      $("#mastheadSubPanel1Show").append('&nbsp;<img src="http://img-dygassets.mncdn.com/Images/openbtn.png"/>');
      $("#mastheadSubPanel1Show").attr("onclick", "DygDFP.Masthead.open(" + panel2Height + ");");

      $("#mastheadSubPanel1").append('<div id="mastheadSubPanel1SWF"></div>');

      $("#mastheadPanel").append('<div id="mastheadSubPanel2"></div>');
      $("#mastheadSubPanel2").css("position", "relative");
      $("#mastheadSubPanel2").css("margin-top", panel2MarginTop);
      $("#mastheadSubPanel2").css("height", panel2Height);
      $("#mastheadSubPanel2").css("width", panel2Width);
      $("#mastheadSubPanel2").css("display", "none");

      $("#mastheadSubPanel2").append('<a id="mastheadSubPanel2Close" href="javascript:;"></a>');
      $("#mastheadSubPanel2Close").css("margin-top", showBtnMarginTop);
      $("#mastheadSubPanel2Close").css("left", 0);
      $("#mastheadSubPanel2Close").css("position", "absolute");
      $("#mastheadSubPanel2Close").css("z-index", "1");
      $("#mastheadSubPanel2Close").append('<img src="http://img-dygassets.mncdn.com/Images/closebtn.png"/>');
      $("#mastheadSubPanel2Close").attr("onclick", "DygDFP.Masthead.close(" + panel1Height + ");");

      $("#mastheadSubPanel2").append('<div style="position:absolute;"><div id="mastheadSubPanel2SWF"></div></div>');
      if (panel1SwfFile != '' && panel2SwfFile != '') {

        if (typeof swfobject === 'undefined') {
          var swfObject = document.createElement('script');
          swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
          document.getElementsByTagName('head')[0].appendChild(swfObject);
        }

        var flashvars = false;
        var params = {
          flashvars: "clickTAG=" + encodeURIComponent(clickURL),
          wmode: "transparent",
          allowscriptaccess: 'always'
        };


        if (DygDFP.flashDetect() == undefined) {
          $("#mastheadSubPanel1SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
        } else {
          setTimeout(function() {
            swfobject.embedSWF(panel1SwfFile, "mastheadSubPanel1SWF", panel1Width, panel1Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
          }, 500);
        }

        if (DygDFP.flashDetect() == undefined) {
          $("#mastheadSubPanel2SWF").append('<a href="' + clickURL + '" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
        } else {
          setTimeout(function() {
            swfobject.embedSWF(panel2SwfFile, "mastheadSubPanel2SWF", panel2Width, panel2Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
          }, 500);

          if (flvURL != '') {
            $("#mastheadSubPanel2").append('<div id="mastheadVideoPanel"></div>');
            $("#mastheadVideoPanel").css("position", "absolute");
            $("#mastheadVideoPanel").css("width", playerWidth);
            $("#mastheadVideoPanel").css("height", playerHeight);
            $("#mastheadVideoPanel").css("margin-left", playerLeft);
            $("#mastheadVideoPanel").css("margin-top", playerTop);

            $("#mastheadVideoPanel").append('<div id="mastheadVideo"></div>');

            var flashvars = false;
            var params = {
              flashvars: "vol=0&clickTAG=" + encodeURIComponent(clickURL) + "&flvsrc=" + flvURL + "&brandUrl=" + brandURL + "&_w=" + playerWidth + "&_h=" + playerHeight,
              wmode: "transparent",
              allowscriptaccess: 'always'
            };

            setTimeout(function() {
              swfobject.embedSWF("http://img-dygassets.mncdn.com/Files/Swf/player.swf", "mastheadVideo", playerWidth, playerHeight, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
            }, 500);
          }
        }


      } else if (panel1ImageFile != '' && panel2ImageFile != '') {
        $("#mastheadSubPanel1SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
        $("#mastheadSubPanel2SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
      }


      if (window.sessionStorage.getItem('isShowMasthead') == null || window.sessionStorage.getItem('isShowMasthead') == "true") {
        DygDFP.Masthead.open(panel2Height);
      }
    },
    open: function(height) {
      $('#mastheadPanel').animate({
        height: height
      }, 'slow');
      window.sessionStorage.setItem('isShowMasthead', 'true');
      $('#mastheadSubPanel1').hide();
      $('#mastheadSubPanel2').slideToggle('slow', function() {
        $('#mastheadSubPanel2Close').show();
      });
      $('#mastheadSubPanel1Show').hide();
      $('#mastheadVideoPanel').show();

      setTimeout("if(DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".preparePageSkinPosition != undefined){DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".preparePageSkinPosition()}", 400);
    },
    close: function(height) {
      $('#mastheadVideoPanel').hide()
      $('#mastheadPanel').animate({
        height: height
      }, 400);
      window.sessionStorage.setItem('isShowMasthead', 'false');
      $("#mastheadSubPanel2Close").hide();
      $('#mastheadSubPanel2').slideToggle('slow', function() {
        $('#mastheadSubPanel1').show();
        $('#mastheadSubPanel1Show').show();
      });
      setTimeout("if(DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".preparePageSkinPosition != undefined){DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".preparePageSkinPosition()}", 400);
    }
  },
  Takeover: {
    appendSelector: $("body"),
    init: function(panel1SwfFile, panel1BackupImageFile, panel1Width, panel1Height, panel2SWFFile, panel2BackupImageFile, panel2Width, panel2Height, clickTagParam, clickURL, impressionURL, position, isScroll) {
      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
      }

      DygDFP.Takeover.appendSelector = (position == "728x90") ? $("#div-Tepe_728x90") : $("#div-300x250_Ros-1");

      $(DygDFP.Takeover.appendSelector).append('<div id="takeOverPanel"></div>');
      $("#takeOverPanel").animate({
        height: '+=' + panel1Height + 'px'
      }, 800);

      $("#takeOverPanel").css("text-align", "center");
      $("#takeOverPanel").css("width", "100%");
      $("#takeOverPanel").css("background-color", DygDFP.LeaderBoard.backgroundColor);
      $("#takeOverPanel").parent().find("iframe").hide();
      $("#takeOverPanel").append('<a href="javascript:;" id="takeOverClick"></a>');
      $("#takeOverClick").attr("onclick", "DygDFP.Takeover.open();");
      $("#takeOverClick").css("background-color", "white");
      $("#takeOverClick").css("opacity", "0");
      $("#takeOverClick").css("width", panel1Width);
      $("#takeOverClick").css("height", panel1Height);
      $("#takeOverClick").css("display", "block");
      $("#takeOverClick").css("position", "absolute");
      if (position == "728x90") {
        $("#takeOverClick").css("left", "0px");
        $("#takeOverClick").css("right", "0px");
        if ($("#div-Tepe_728x90").height() != panel1Height) {
          $("#div-Tepe_728x90").animate({
            height: '+=' + panel1Height + 'px'
          }, 800);
        }

        if (DygDFP.siteName == 'StarTV') {
          $("body").css("background", "white");
        }
      }
      $("#takeOverClick").css("margin", "auto");

      $("#takeOverPanel").append('<div id="takeOverSWF"></div>');
      if (typeof swfobject === 'undefined') {
        var swfObject = document.createElement('script');
        swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
        document.getElementsByTagName('head')[0].appendChild(swfObject);
      }

      var flashvars = false;
      var params = {
        flashvars: clickTagParam + "=" + encodeURIComponent(clickURL),
        wmode: "transparent",
        allowscriptaccess: 'always'
      };

      if (DygDFP.flashDetect() == undefined) {
        $("#takeOverSWF").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
      } else {
        setTimeout(function() {
          swfobject.embedSWF(panel1SwfFile, "takeOverSWF", panel1Width, panel1Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
        }, 500);
      }

      $("#takeOverPanel").append('<div id="takeOverShow"></div>');
      $("#takeOverShow").css("position", (isScroll == "yes") ? "absolute" : "fixed");
      $("#takeOverShow").css("z-index", "999999");
      $("#takeOverShow").css("top", 0);
      $("#takeOverShow").css("left", "0");
      $("#takeOverShow").css("right", "0");
      $("#takeOverShow").css("margin", "auto");
      $("#takeOverShow").css("width", panel2Width);
      $("#takeOverShow").attr("data-width", panel2Width);
      $("#takeOverShow").css("display", "none");

      if ($(window).width() < panel2Width) {
        $("#takeOverShow").css("margin-left", ((panel2Width - $(window).width()) / 2) * -1);
      }

      $("#takeOverShow").append('<div id="takeOverShowSWF"></div>');

      if (DygDFP.flashDetect() == undefined) {
        $("#takeOverShowSWF").append('<a href="javascript:;" onclick="closeTakeOver();" style="right:0;position:absolute;"><img src="http://img-dygassets.mncdn.com/Images/closebtn.png"/></a>');
        $("#takeOverShowSWF").append('<a href="' + clickURL + '" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
      } else {

        var paramsN = {
          flashvars: clickTagParam + "=" + encodeURIComponent(clickURL),
          wmode: "transparent",
          allowscriptaccess: 'always'
        };
        setTimeout(function() {
          swfobject.embedSWF(panel2SWFFile, "takeOverShowSWF", panel2Width, panel2Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, paramsN);
        }, 500);
      }

      var script = top.document.createElement("script");
      script.text = "function closeTakeOver(){ DygDFP.Takeover.close();}";
      script.setAttribute("type", "text/javascript");
      top.document.getElementsByTagName("head")[0].appendChild(script);

      if (getCookie('isShowTakeover') == "") {
        DygDFP.Takeover.open();
      }

    },
    open: function(height) {
      createCookie('isShowTakeover', 'true', 60);
      $("#takeOverShow").show();
    },
    close: function() {
      $("#takeOverShow").fadeOut();
    },
    resize: function() {

      var panel2Width = $("#takeOverShow").attr("data-width");
      console.log(panel2Width);
      if ($(window).width() < panel2Width) {
        $("#takeOverShow").css("margin-left", ((panel2Width - $(window).width()) / 2) * -1);
      } else {
        $("#takeOverShow").css("margin-left", "auto");
      }
    }
  },
  TextLink: {
    appendSelector: $("body"),
    init: function(swfFile, backupImageFile, clickTagParam, imageFile, clickURL, impressionURL, width, height) {
      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
      }
      $("#div-tlb").css("height", height);
      if (swfFile != '') {
        var swfObject = document.createElement('script');
        swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
        document.getElementsByTagName('head')[0].appendChild(swfObject);

        var flashvars = false;
        var params = {
          flashvars: clickTagParam + "=" + encodeURIComponent(clickURL),
          allowscriptaccess: 'always'
        };

        $("#div-tlb").append("<div id='TLB_SWF'></div>")
        if (DygDFP.flashDetect() == undefined) {
          $("#TLB_SWF").append('<a href="' + clickURL + '" target="_blank"><img src="' + backupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
        }
        setTimeout(function() {
          swfobject.embedSWF(swfFile, "TLB_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
        }, 500);
      } else if (imageFile != '') {
        $("#div-tlb").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
      } else {
        $("#div-tlb").find("iframe").css("height", height);
        $("#div-tlb").find("iframe").css("width", width);
      }
    }
  },
  Paralax: {
    marginTop: 0,
    containerWidth: 980,
    init: function(leftSWFURL, rightSWFURL, leftSSWFClickURL, rightSWFClickURL, impressionURL) {
      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
      }
      var partImageWidth = (($(document).width() - DygDFP.PageSkin.containerWidth) / 2);
      var top = 0;
      var pattern = '<div class="adPartContainer" style="display:none">';
      pattern += '<div id="LeftSkin" style="position:absolute;left:0;z-index:5;height:1500px"><div id="LeftSWF"></div></div>';
      pattern += '<div id="RightSkin" style="position:absolute;right:0;z-index:5;height:1500px"><div id="RightSWF"></div></div>';
      pattern += '</div>';

      $("body").prepend(pattern);

      $("#div-PageSkin").hide();

      $("#LeftSkin").css("position", "absolute");
      $("#LeftSkin").css("left", (partImageWidth - 900));

      $("#RightSkin").css("width", partImageWidth);
      $("#RightSkin").css("overflow", "hidden");
      $("#flashRightPanel").css("left", 10);

      setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".prepareParalax()", 400);

      if (typeof swfobject === 'undefined') {
        var swfObject = document.createElement('script');
        swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
        document.getElementsByTagName('head')[0].appendChild(swfObject);
      }

      setTimeout(function() {
        var flashvars2 = {
          'clickTag': encodeURIComponent(rightSWFClickURL)
        };

        var params2 = {
          allowscriptaccess: 'always',
          wmode: 'transparent'
        };
        var attributes2 = {};
        attributes2.id = "flashLeftPanel";
        swfobject.embedSWF(leftSWFURL, "LeftSWF", "900", "1500", "9.0.0", false, flashvars2, params2, attributes2);

        var flashvars = {
          'clickTag': encodeURIComponent(leftSSWFClickURL),
        };
        var params = {
          allowscriptaccess: 'always',
          wmode: 'transparent'
        };
        var attributes = {};
        attributes.id = "flashRightPanel";
        swfobject.embedSWF(rightSWFURL, "RightSWF", "900", "1500", "9.0.0", false, flashvars, params, attributes);


      }, 1000);
    },
    show: function(hasAnimation) {
      if (hasAnimation) {
        $(".adPartContainer").fadeIn(300);
      } else {
        $(".adPartContainer").show();
      }

      DygDFP.Paralax.resize();
    },
    resize: function() {
      var partImageWidth = (($(document).width() - DygDFP.PageSkin.containerWidth) / 2);

      $("#LeftSkin").css({
        left: partImageWidth - 900,
      });

      $("#RightSkin").css({
        width: partImageWidth,
      });
    },
    changeMarginTop: function() {
      $("#LeftSkin").css("top", DygDFP.PageSkin.marginTop);
      $("#RightSkin").css("top", DygDFP.PageSkin.marginTop);
    },
  },
  PushDown: {
    appendSelector: $("body"),
    init: function(panel1SwfFile, panel1BackupImageFile, panel2SwfFile, panel2BackupImageFile, clickURL, impressionURL, panel1Width, panel1Height, panel2Width, panel2Height) {
      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
      }

      var panel1MarginTop = 0;
      var panel2MarginTop = 0;
      var showBtnMarginTop = 0;
      var showBtnMarginLeft = 850;

      $("#div-Tepe_728x90").hide();

      //$(DygDFP.PushDown.appendSelector).show();
      $(DygDFP.PushDown.appendSelector).prepend('<div id="pushDownPanel" style="margin-top:5px"></div>');
      $("#pushDownPanel").css("width", DygDFP.PageSkin.containerWidth);
      $("#pushDownPanel").css("margin", "auto");
      $("#pushDownPanel").css("left", 0);
      $("#pushDownPanel").css("right", 0);
      $("#pushDownPanel").append('<div id="pushDownSubPanel1"></div>');
      $("#pushDownSubPanel1").append('<div id="pushDownSubPanel1Click"></div>');
      $("#pushDownSubPanel1").css("position", "relative");
      $("#pushDownSubPanel1").css("margin-top", panel1MarginTop);

      $("#pushDownSubPanel1Click").attr("onclick", "DygDFP.PushDown.open();");

      $("#pushDownSubPanel1Click").css("cursor", "pointer");
      $("#pushDownSubPanel1Click").css("position", "absolute");
      $("#pushDownSubPanel1Click").css("height", panel1Height);
      $("#pushDownSubPanel1Click").css("width", panel1Width);

      $("#pushDownSubPanel1").append('<div id="pushDownSubPanel1SWF"></div>');

      $("#pushDownPanel").append('<div id="pushDownSubPanel2"></div>');
      $("#pushDownSubPanel2").css("position", "relative");
      $("#pushDownSubPanel2").css("margin-top", panel2MarginTop);
      $("#pushDownSubPanel2").css("height", panel2Height);
      $("#pushDownSubPanel2").css("width", panel2Width);
      $("#pushDownSubPanel2").css("display", "none");
      $("#pushDownSubPanel2").append('<div style="position:absolute;"><div id="pushDownSubPanel2SWF"></div></div>');

      if (panel1SwfFile != '' && panel2SwfFile != '') {

        if (typeof swfobject === 'undefined') {
          var swfObject = document.createElement('script');
          swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
          document.getElementsByTagName('head')[0].appendChild(swfObject);
        }

        var flashvars = false;
        var params = {
          flashvars: "clickTAG=" + encodeURIComponent(clickURL),
          wmode: "transparent",
          allowscriptaccess: 'always'
        };


        if (DygDFP.flashDetect() == undefined) {
          $("#pushDownSubPanel1SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
        } else {
          setTimeout(function() {
            swfobject.embedSWF(panel1SwfFile, "pushDownSubPanel1SWF", panel1Width, panel1Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
          }, 500);
        }

        if (DygDFP.flashDetect() == undefined) {
          $("#pushDownSubPanel2SWF").append('<a href="' + clickURL + '" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
        } else {
          setTimeout(function() {
            swfobject.embedSWF(panel2SwfFile, "pushDownSubPanel2SWF", panel2Width, panel2Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
          }, 500);
        }


        $("#pushDownSubPanel2").append('<a href="javsascript:;" onclick="DygDFP.PushDown.close();"><img style="position:absolute;display:inline;right:0;top:0" src="http://img-dygassets.mncdn.com/Images/closebtn.png"/></a>');
        $("#pushDownSubPanel1Click").append('&nbsp;<img style="position:absolute;display:inline;right:0;top:0" src="http://img-dygassets.mncdn.com/Images/openbtn.png"/>');

      } else if (panel1ImageFile != '' && panel2ImageFile != '') {
        $("#pushDownSubPanel1SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
        $("#pushDownSubPanel2SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
      }

      if (getCookie('isPushDown') == null || getCookie('isPushDown') == "") {
        DygDFP.PushDown.open();
        createCookie('isPushDown', 'isPushDown', 60);
      }
    },
    open: function() {
      height = 420;
      $('#pushDownPanel').animate({
        height: height
      }, 'slow');
      $('#pushDownPanel').animate({
        height: height
      }, 'slow');
      window.sessionStorage.setItem('isPushDown', 'true');
      $('#pushDownSubPanel1').hide();
      $('#pushDownSubPanel2').slideToggle('slow');
    },
    close: function() {
      height = 70;
      $('#pushDownPanel').animate({
        height: height
      }, 'slow');
      $('#pushDownPanel').animate({
        height: height
      }, 400);
      window.sessionStorage.setItem('isPushDown', 'false');
      $('#pushDownSubPanel2').slideToggle('slow', function() {
        $('#pushDownSubPanel1').show();
      });
    }
  },
  Survey: {
    appendSelector: $("body"),
    init: function(iframeURL, width, height, surveyKey) {

      $("body").append('<div id="surveyPanel"></div>');
      $("#surveyPanel").css("position", "fixed");
      $("#surveyPanel").css("bottom", "10px");
      $("#surveyPanel").css("right", "-1000px");
      $("#surveyPanel").css("width", width);
      $("#surveyPanel").css("height", height);
      $("#surveyPanel").css("z-index", 99999);

      if (iframeURL != '') {
        $("#surveyPanel").append('<iframe id="surveyIframe"></iframe>');
        $("#surveyIframe").css("width", width);
        $("#surveyIframe").css("height", height);
        $("#surveyIframe").css("border", "none");
        $("#surveyIframe").attr("src", iframeURL + "?surveyKey=" + surveyKey + "&pDomain=" + document.location.protocol + '//' + document.location.host);
      }

      $("#surveyPanel").append('<a id="surveyCloseA" href="javascript:;"><img src="http://img-dygassets.mncdn.com/Images/SurveyCloseBTN.png"></a>');
      $("#surveyCloseA").click(function() {
        DygDFP.Survey.close(surveyKey);
      });

      $("#surveyCloseA").css("position", "absolute");
      $("#surveyCloseA").css("top", -8);
      $("#surveyCloseA").css("right", -10);
    },
    open: function(surveyKey) {
      if (getCookie(surveyKey) == '' || getCookie(surveyKey) == null) {
        $("#surveyPanel").animate({
          "right": "10px"
        }, "slow");
        DygDFP.Survey.interval(surveyKey, 1);
      }
    },
    close: function(surveyKey) {
      createCookie(surveyKey, surveyKey, 60);
      $("#surveyPanel").animate({
        "right": "-1000px"
      }, "slow");
    },
    interval: function(surveyKey, currentIndex) {
      if (currentIndex == 20) {
        $("#surveyPanel").animate({
          "right": "-1000px"
        }, "slow");
      } else {
        setTimeout(function() {
          DygDFP.Survey.interval(surveyKey, currentIndex + 1);
        }, 1000);
      }
    },
    kill: function(surveyKey) {
      createCookie(surveyKey, surveyKey, 60*24*90);
      $("#surveyPanel").animate({
        "right": "-1000px"
      }, "slow");
    }
  },
  VideoWall: {
    appendSelector: $("body"),
    isOpen: false,
    top: 100,
    init: function(flvURL, width, height, clickURL, backgroundImage, headerImage, brandUrl, campaignName, impressionURL) {

      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
      }

      $(DygDFP.VideoWall.appendSelector).prepend("<div id='videoWall'></div>");
      $("#videoWall").css("width", $(window).width());
      $("#videoWall").css("height", 1000);
      $("#videoWall").css("position", "absolute");
      $("#videoWall").append("<div id='videoWallSWF'></div>");
      $("#videoWall").css("top", DygDFP.VideoWall.top);
      if (DygDFP.siteName == "NTVCOM_TR"){
        var leftMargin = $(DygDFP.VideoWall.appendSelector).css("margin-left");
        $("#videoWall").css("margin-left", "-" +leftMargin);
      }
      if (typeof swfobject === 'undefined') {
        var swfObject = document.createElement('script');
        swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
        document.getElementsByTagName('head')[0].appendChild(swfObject);
      }

      var isAutoPlay = (getCookie('isAutoPlayVideoWall') == '' || getCookie('isAutoPlayVideoWall') == null) ? "true" : "false";
      var flashvars = false;
      var params = {
        flashvars: "clickTAG=" + encodeURIComponent(clickURL) + "&flvUrl=" + flvURL + "&splashImagePath=" + backgroundImage + "&headerImg=" + headerImage + "&isAutoPlay=" + isAutoPlay + "&brandUrl=" + brandUrl + "&campaignName=" + campaignName,
        wmode: "transparent",
        allowscriptaccess: 'always'
      };

      if (DygDFP.flashDetect() == undefined) {
        //$("#videoWall").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
      } else {
        setTimeout(function() {
          swfobject.embedSWF('http://img-dygassets.mncdn.com/Files/Swf/VideoWall.swf', "videoWallSWF", "100%", "100%", "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
        }, 500);
      }

      setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".initVideoWall()", 0);
    },
    open: function() {
      createCookie('isAutoPlayVideoWall', 'true', 120);
      DygDFP.VideoWall.isOpen = true;
      setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".openVideoWall()", 0);
    },
    close: function() {
      if (DygDFP.VideoWall.isOpen) {
        DygDFP.VideoWall.isOpen = false;
        setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".closeVideoWall()", 0);
      }
    },
    resize: function() {
      $("#videoWallSWF").css("width", $(window).width());
    }
  },
  Html5Masthead: {
    VCRSessionTimeout: null,
    BrandURL: '',
    init: function(hasScriptCode, imagePath, width, height, clickURL, impressionURL, videoURL, playerWidth, playerHeight, playerLeft, playerTop, brandURL, iframeURL, selector, iframeScriptUrl) {
      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
      }

      this.BrandURL = brandURL;

      $(DygDFP.Masthead.appendSelector).prepend('<div id="mastheadPanel"></div>');
      $("#mastheadPanel").css("width", width);
      $("#mastheadPanel").css("left", 0);
      $("#mastheadPanel").css("right", 0);
      $("#mastheadPanel").css("margin", "auto");
      $("#mastheadPanel").append("<div id='mastheadController'></div>");
      $("#mastheadController").css("margin-bottom", 5);
      $("#mastheadController").css("text-align", "center");
      if  (DygDFP.siteName=="Startv"){
        $("#mastheadController").css("width","100px");
      }


      $("#mastheadPanel").append("<div id='mastheadContainer'></div>");
      $("#mastheadController").append("<a href='javascript:;' id='mastheadOpenController'><img id='mastheadOpenImg' src='http://img-dygassets.mncdn.com/Images/Ad_Open.png' alt=''/></a>");
      $("#mastheadController").append("<a href='javascript:;' id='mastheadCloseController'><img id='mastheadCloseImg' src='http://img-dygassets.mncdn.com/Images/Ad_Close.png' alt=''/></a>");
      $("#mastheadContainer").css("display", "none");
      $("#mastheadOpenController").click(function() {
        DygDFP.Html5Masthead.open(hasScriptCode, selector);
      });
      $("#mastheadCloseController").click(function() {
        DygDFP.Html5Masthead.close(hasScriptCode, selector);
      });
      $("#mastheadOpenController").hide();
      $("#mastheadCloseController").hide();

      if (imagePath != '') {
        $("#mastheadContainer").append("<a id='mastheadClickA' href='" + clickURL + "' target='_blank'></a>");
        $("#mastheadClickA").css("display", "block");
        $("#mastheadClickA").css("position", "absolute");
        $("#mastheadClickA").css("width", width);
        $("#mastheadClickA").css("height", height);
        $("#mastheadContainer").append("<img id='mastheadImg' src='" + imagePath + "' alt='' />");
        $("#mastheadImg").css("width", width);
        $("#mastheadImg").css("height", height);
      } else if (iframeURL != '') {
        $("#mastheadContainer").append("<a id='mastheadClickA' href='" + clickURL + "' target='_blank'></a>");
        $("#mastheadClickA").css("display", "block");
        $("#mastheadClickA").css("position", "absolute");
        $("#mastheadClickA").css("width", width);
        $("#mastheadClickA").css("height", height);
        $("#mastheadContainer").append("<iframe id='mastheadIframe' src='" + iframeURL + "' data-src='" + iframeURL + "'></iframe>");
        $("#mastheadIframe").css("width", width);
        $("#mastheadIframe").css("height", height);
        $("#mastheadIframe").css("border", "none");
      } else if (iframeScriptUrl != '') {
        $("#mastheadContainer").append("<iframe id='mastheadIframe' src='" + iframeScriptUrl + "?clickTAG="+clickURL+"' data-src='" + iframeScriptUrl + "?clickTAG="+clickURL+"'></iframe>");
        $("#mastheadIframe").css("width", width);
        $("#mastheadIframe").css("height", height);
        $("#mastheadIframe").css("border", "none");
      }
		
		if(DygDFP.siteName != 'StarTV' && DygDFP.siteName != 'NTVSpor'&& DygDFP.siteName != 'NTVCOM_TR'){
      $("iframe[id='" + selector + "']").parent().parent().hide();
		}

      if (videoURL != 'http://img-dygassets.mncdn.com/Videos/') {
        $("#mastheadContainer").prepend("<div id='mastheadVideoContainer'></div>");
        $("#mastheadVideoContainer").css("width", playerWidth);
        $("#mastheadVideoContainer").css("height", playerHeight);
        $("#mastheadVideoContainer").append("<video id='mastheadVideo' class='video-js vjs-default-skin' preload='auto' loop muted autoplay controls><source src='" + videoURL + "' type='video/mp4' /></video>");
        $("#mastheadVideoContainer").css("position", "absolute");
        $("#mastheadVideoContainer").css("margin-left", playerLeft);
        $("#mastheadVideoContainer").css("margin-top", playerTop);
        $("#mastheadVideoContainer").css("z-index", 99);
        $("#mastheadVideoContainer").hide();

        $("#mastheadVideo").css("width", playerWidth);
        $("#mastheadVideo").css("height", playerHeight);



        $('#mastheadVideo').bind('pause', function() {
          DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=pause&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadPause');
        });

        $('#mastheadVideo').bind('end', function() {
          DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=complete&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadComplate');
        });

      }

      if (window.sessionStorage.getItem('isShowHtml5Masthead') == null || window.sessionStorage.getItem('isShowHtml5Masthead') == "true") {
        $("#mastheadCloseController").show();
        $("#mastheadController").css("text-align", "right");
        DygDFP.Html5Masthead.open();
        if($('#mastheadVideo').length > 0){
        this.VCR();
        }
      }
      else {
        $("#mastheadOpenController").show();
        $("#mastheadController").css("text-align", "center");
if(DygDFP.siteName != 'StarTV' && DygDFP.siteName != 'NTVSpor' && DygDFP.siteName != 'NTVCOM_TR'){
        if (hasScriptCode) {
				$("iframe[id='" + selector + "']").hide();
			
        }
}
      }

      if (eval(DygDFP.currentSiteNamePattern("prepareHtml5Masthead")) != undefined) {
        eval(DygDFP.currentSiteNamePattern("prepareHtml5Masthead"))();
      }
    },
    close: function(hasScriptCode, selector) {
      window.sessionStorage.setItem('isShowHtml5Masthead', 'false');
      DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=close&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadClose');
        clearTimeout(DygDFP.Html5Masthead.VCRSessionTimeout);
      if ($("#mastheadVideo").length > 0 && !$("#mastheadVideo").prop('muted')) {
        DygDFP.Html5Masthead.muteControl();
        $("#mastheadVideo")[0].pause();
      }

      $('#mastheadVideoContainer').hide();
      $('#mastheadContainer').slideToggle('slow', function() {
        $("#mastheadController").css("text-align", "center");
        $('#mastheadOpenController').show();
        $('#mastheadCloseController').hide();
        $('#mastheadIframe').attr("src","");
      });
    },
    open: function(hasScriptCode, selector) {
      window.sessionStorage.setItem('isShowHtml5Masthead', 'true');
      $('#mastheadIframe').attr("src", $('#mastheadIframe').attr("data-src"));
      $('#mastheadContainer').slideToggle('slow', function() {
        $('#mastheadVideoContainer').show();
        $('#mastheadCloseController').show();
        $('#mastheadOpenController').hide();
        $("#mastheadController").css("text-align", "right");
        if ($("#mastheadVideo").length > 0) {
          DygDFP.Html5Masthead.VCR();
          DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=play&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadPlay');
          $("#mastheadVideo")[0].currentTime = 0;
          $("#mastheadVideo")[0].play();
          $("#mastheadVideo").prop('muted', true);
        }
      });
    },
    muteControl: function() {
      if ($("#mastheadVideo").prop('muted')) {
        $("#mastheadVideo").prop('muted', false);
        DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=unmute&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadUnmute');
      } else {
        $("#mastheadVideo").prop('muted', true);
        DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=mute&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadMute');
      }
    },
    VCR: function() {
      clearTimeout(DygDFP.Html5Masthead.VCRSessionTimeout);
      DygDFP.Html5Masthead.VCRSessionTimeout = setTimeout(function() {
        var proportion = Math.round(parseInt($("#mastheadVideo")[0].currentTime) * 100 / parseInt($("#mastheadVideo")[0].duration));
        if (proportion > 90) {
          DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=complete&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadComplate');
        } else if (proportion > 75) {
          DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=75_per&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadPer75');
        } else if (proportion > 50) {
          DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=50_per&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadPer50');
        } else if (proportion > 25) {
          DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=25_per&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadPer25');
        }

        DygDFP.Html5Masthead.VCR();
      }, 250);
    }
  },
  Html5TakeOver: {
    iframeURLTag: '#',
    brandURL: '',
	panel2Height:0,
    init: function(panel1ImagePath, panel2ImagePath, panel1IframeURL, panel2IframeURL, panel1Width, panel1Height, panel2Width, panel2Height, clickURL, impressionURL, isFixed, selector, brandURL) {
      if (impressionURL != '') {
        $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
      }
	  this.panel2Height = panel2Height;
      this.iframeURLTag = panel2IframeURL + '?clickTAG=' + clickURL;
      this.brandURL = brandURL;
      $("div[id='" + selector + "__container__']").hide();
      var appendDiv = $("div[id='" + selector + "__container__']").parent();
      $(appendDiv).css("text-align", "center");
      $(appendDiv).css("height", panel1Height);
      $(appendDiv).append('<div id="takeOverPanelContainer"></div>');
      $("#takeOverPanelContainer").append('<div id="takeOverPanel1"></div>');
      $("body").prepend('<div id="takeOverPanel2" style="display:none"></div>');
      $("#takeOverPanel1").css("position", "relative");

      if (panel1ImagePath != '' && panel2ImagePath != '') {
        $("#takeOverPanel1").append('<a onclick="DygDFP.Html5TakeOver.open();" href="javascript:;"><img src="' + panel1ImagePath + '" alt="" /></a>');

		if(panel2Width == 0){
			$("#takeOverPanel2").css("width", "100%");
		}
		else{
		     $("#takeOverPanel2").css("width", panel2Width);
		}
		
        if (isFixed == 'no') {
          $("#takeOverPanel2").css("position", "absolute");
        } else {
          $("#takeOverPanel2").css("position", "fixed");
        }

        $("#takeOverPanel2").css("margin", "auto");
        $("#takeOverPanel2").css("left", 0);
        $("#takeOverPanel2").css("right", 0);
        $("#takeOverPanel2").css("z-index", 999999);
        $("#takeOverPanel2").css("top", 0);
        $("#takeOverPanel2").append('<a id="TakeOverCloseBtn" href="javascript:;" onclick="DygDFP.Html5TakeOver.close()"><img src="http://img-dygassets.mncdn.com/Images/RichMedia_Close_BTN.PNG" alt="" /></div>');
        $("#TakeOverCloseBtn").css("position", "absolute");
        $("#TakeOverCloseBtn").css("right", 0)
        $("#TakeOverCloseBtn").css("margin-right", 3)
        $("#takeOverPanel2").append('<a href="' + clickURL + '" target="_blank"><img src="' + panel2ImagePath + '" alt="" /></div>');
      } else if (panel1IframeURL != '' && panel2IframeURL != '') {
        $("#takeOverPanel1").append('<a id="TakeOverOpenBtn" href="javascript:;" onclick="DygDFP.Html5TakeOver.open()"></a>');
        $("#TakeOverOpenBtn").css("display", "block");
        $("#TakeOverOpenBtn").css("width", panel1Width);
        $("#TakeOverOpenBtn").css("height", panel1Height);
        $("#TakeOverOpenBtn").css("position", "absolute");
        $("#TakeOverOpenBtn").css("left", 0);
        $("#TakeOverOpenBtn").css("right", 0);
        $("#TakeOverOpenBtn").css("margin", "auto");

        $("#takeOverPanel1").append('<iframe id="takeOverPanel1Iframe" src="' + panel1IframeURL + '"></iframe>');
        $("#takeOverPanel1Iframe").css("width", panel1Width);
        $("#takeOverPanel1Iframe").css("height", panel1Height);
        $("#takeOverPanel1Iframe").css("border", "none");

		if(panel2Width == 0){
			$("#takeOverPanel2").css("width","100%");
		}
		else{
		$("#takeOverPanel2").css("width", panel2Width);	
		}
        
        if (isFixed == 'no') {
          $("#takeOverPanel2").css("position", "absolute");
        } else {
          $("#takeOverPanel2").css("position", "fixed");
        }
        $("#takeOverPanel2").css("margin", "auto");
        $("#takeOverPanel2").css("left", 0);
        $("#takeOverPanel2").css("right", 0);
        $("#takeOverPanel2").css("z-index", 999999);
        $("#takeOverPanel2").css("top", 0);
        $("#takeOverPanel2").append('<a id="TakeOverCloseBtn" href="javascript:;" onclick="DygDFP.Html5TakeOver.close()"><img src="http://img-dygassets.mncdn.com/Images/RichMedia_Close_BTN.PNG" alt="" /></div>');
        $("#TakeOverCloseBtn").css("position", "absolute");
        $("#TakeOverCloseBtn").css("right", 0)
        $("#TakeOverCloseBtn").css("margin-right", 3)
        $("#TakeOverCloseBtn").css("z-index", 999);


        //$("#takeOverPanel2").append('<a id="TakeOverClickBtn" href="' + clickURL + '?clickTAG='+clickURL+'" target="_blank"></a>');
        $("#TakeOverClickBtn").css("display", "block");
        $("#TakeOverClickBtn").css("width", panel2Width);
        $("#TakeOverClickBtn").css("height", panel2Height);
        $("#TakeOverClickBtn").css("position", "absolute");
        $("#TakeOverClickBtn").css("left", 0);
        $("#TakeOverClickBtn").css("right", 0);
        $("#TakeOverClickBtn").css("margin", "auto");

        $("#takeOverPanel2").append('<iframe id="takeOverPanel2Iframe" src="'+panel2IframeURL+'"></iframe>');
        //$("#takeOverPanel2").append('<iframe id="takeOverPanel2Iframe" src="#"></iframe>');
		if(panel2Width == 0){
			$("#takeOverPanel2Iframe").css("width","100%");
		}
		else{
		$("#takeOverPanel2Iframe").css("width", panel2Width);	
		}
		if(panel2Height == 0){
			$("#takeOverPanel2Iframe").css("height",$(window).height());
		}
		else{
		$("#takeOverPanel2Iframe").css("height", panel2Height);	
		}
        $("#takeOverPanel2Iframe").css("border", "none");
      }

      $(appendDiv).show();
      DygDFP.plugin.callEvent();

      if (getCookie('isShowHtml5TakeOver') == "") {
        DygDFP.Html5TakeOver.open(true);
        DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + brandURL + '/&sz=1x1&t=act=autoplay&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'takeOverautoplay');
      }
    },
    open: function(autoPlay) {
      if (autoPlay == undefined) {
        DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + this.brandURL + '/&sz=1x1&t=act=takeOver_panel1_click&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'takeOverPanel1Open');
      }
      createCookie('isShowHtml5TakeOver', 'true', 60);
      try {
        //console.log();
        //console.log(DygDFP.Html5TakeOver.iframeURLTag);
        $("#takeOverPanel2Iframe").attr('src', this.iframeURLTag);
        //		$("#takeOverPanel2").fadeIn();
      } catch (e) {
        console.log(e);
      }
	  
	  if(this.panel2Height == 0){
		  $("body").css("overflow-x","hidden");
	  }
	  
      //$("#takeOverPanel2").css({ opacity: 1 });
       $("#takeOverPanel2").css({
          display: "block"
        });
    },
    close: function() {
      DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + this.brandURL + '/&sz=1x1&t=act=takeOver_panel2_close&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'takeOverPanel2Close');
      //$("#takeOverPanel2").fadeOut();
      //$("#takeOverPanel2").css({ opacity: 0 });
	  
	  if(this.panel2Height == 0){
		  $("body").css("overflow-x","auto");
	  }
      $("#takeOverPanel2").css({
        display: "none"
      });
      try {
        //$("#takeOverPanel2").fadeOut();
        $("#takeOverPanel2Iframe").attr('src', "#");
      } catch (e) {
        console.log(e);
      }
    }
  },
  ScrollWall: {
    appendSelector: "body",
	isRunning: false,
	BrandURL : '',
	init: function(videoURL, clickURL, impressionURL, brandURL, leftImage, rightImage){
		if (impressionURL != '') {
			$("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
		}
		
		this.BrandURL = brandURL;
		
		var head = document.getElementsByTagName("head")[0];         
		var css = document.createElement('link');
		css.type = 'text/css';
		css.rel = 'stylesheet';
		css.href = 'http://img-dygassets.mncdn.com/Files/Css/scroll_wall.css';
		head.appendChild(css);
		
		$("#sticky-wrapper").after('<div id="ScrollWallContainer"></div>');
		$("#ScrollWallContainer").append('<div id="ScrollWall_SetHeight"></div>');
		$("#ScrollWallContainer").append('<div id="ScrollWall_ArrowBounce" class="arrow bounce"></div>');
		$("#ScrollWall_ArrowBounce").append('<div id="ScrollWall_DownArrow">Aşağı kaydır</div>');
		
		var source = '<video class="videoHolder" id="ScrollWall_Video" tabindex="0" autobuffer="autobuffer" preload="preload">';
			source += '<source type="video/mp4" src="' + videoURL + '"></source>';
			source += '<p>Sorry, your browser does not support the video element.</p>';
			source += '</video>';
			
		
		$("#ScrollWallContainer").append(source);
		
		$("body").append('<div class="closebt"><img src="http://img-dygassets.mncdn.com/Images/RichMedia_Close_BTN.png"></div>');
		 
		var pattern = '<div class="adPartContainer" style="display:none">';
		pattern += '<a id="ScrollWallLeftSkin" target="_blank" href="' + clickURL + '" style="position:absolute;left:0;z-index:5;height:1100px"></a>';
		pattern += '<a id="ScrollWallRightSkin" target="_blank"  href="' + clickURL + '" style="position:absolute;right:0;z-index:5;height:1100px"></a>';
		pattern += '</div>';
		$("body").append(pattern);
		
		var partImageWidth = (($(window).width() - DygDFP.PageSkin.containerWidth) / 2);
		$("#ScrollWallLeftSkin").css("background", "url(" + leftImage + ") no-repeat 100% 0 ");
		$("#ScrollWallLeftSkin").css("width", partImageWidth);
		$("#ScrollWallLeftSkin").css("top", DygDFP.PageSkin.marginTop);
		$("#ScrollWallRightSkin").css("background", "url(" + rightImage + ") no-repeat 0 0 ");
		$("#ScrollWallRightSkin").css("width", partImageWidth);
		$("#ScrollWallRightSkin").css("top", DygDFP.PageSkin.marginTop);
		$("#ScrollWall_SetHeight").click(function(){
			var win = window.open(clickURL, '_blank');
			win.focus();
		});
		
		if (getCookie('isShowScrollWall') == "") {
			DygDFP.ScrollWall.play();
			DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.ScrollWall.BrandURL + '/&sz=1x1&t=act=scrollWall_autoplay&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'scrollWallClose');
		}
		else{
			$("#ScrollWall_Video").hide();
			$(".adPartContainer").show();
			//$(".closebt").hide();
			$("#ScrollWall_ArrowBounce").hide();
			$(".closebt").html('<img src="http://img-dygassets.mncdn.com/Images/repeatbtn.png">');
			DygDFP.ScrollWall.giveAgainEvent();
		}
		
		if(DygDFP.siteName == 'NTVCOM_TR'){
			$(".sticky-wrapper").css("z-index",6);
			$(".sticky-wrapper").css("position","relative");
			$("header").css("z-index",7);
			$(".content_wrapper>div .wrapper").css("z-index",2);
			$(".content_wrapper>div .wrapper").css("position","relative");
		}
	},
	play: function(){
		this.isRunning = true;
		createCookie('isShowScrollWall', 'true', 60);
		$("#ScrollWall_Video").show();
		$(".adPartContainer").hide();
		$("#ScrollWall_ArrowBounce").show();
		$("#ScrollWall_SetHeight").css("height","3000px");
		DygDFP.ScrollWall.giveCloseEvent();
	},
	scroll: function(){
		if(this.isRunning){
			var video = $("#ScrollWall_Video")[0];
			if(video!= undefined){
				var proportion = (parseInt((video.currentTime/video.duration)*100));
				if (proportion > 90) {
				  DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.ScrollWall.BrandURL + '/&sz=1x1&t=act=complete&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'scrollWallComplete');
				} else if (proportion > 75) {
				  DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.ScrollWall.BrandURL + '/&sz=1x1&t=act=75_per&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'scrollWallPer75');
				} else if (proportion > 50) {
				  DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.ScrollWall.BrandURL + '/&sz=1x1&t=act=50_per&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'scrollWallPer50');
				} else if (proportion > 25) {
				  DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.ScrollWall.BrandURL + '/&sz=1x1&t=act=25_per&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'scrollWallPer25');
				}
				
				video.currentTime = window.pageYOffset/60;
				
				if(video.currentTime/video.duration >= 0.99){
					DygDFP.ScrollWall.removeVideo();
				}
			}
		}
		
		if(DygDFP.siteName == 'NTVCOM_TR'){
			if ($("#sticky-wrapper").hasClass("is-sticky")) {
			  $(".closebt").css("position", "fixed");
			  $(".closebt").css("top", $("nav.main").outerHeight() + $(".ticker-wrapper").height());
			}
			else {
			  $(".closebt").css("position", "absolute");
			  $(".closebt").css("top", 200);
			}
		}		
	},
	removeVideo: function(){
		$("#ScrollWall_SetHeight").css("height","0px");
	  	$(window).scrollTop(0);
		
	  	DygDFP.ScrollWall.isRunning = false;
	  	$('.bgImage').fadeIn("slow");
	  	$('#ScrollWall_Video').fadeOut("fast",function(){
			DygDFP.ScrollWall.giveAgainEvent();
		});
	},
	giveAgainEvent: function(){
		var video = $("#ScrollWall_Video")[0];
		$(".closebt").html('<img src="http://img-dygassets.mncdn.com/Images/repeatbtn.png">');
		$(".arrow").css("opacity","0");
		$(".adPartContainer").show();
		$("#ScrollWall_ArrowBounce").hide();
	  	$(".closebt").unbind( "click" );
	  	$(".closebt").click(function(){
			DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.ScrollWall.BrandURL + '/&sz=1x1&t=act=scrollWall_replay&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'scrollWallReplay');
			DygDFP.ScrollWall.giveCloseEvent();
			$("#ScrollWall_SetHeight").css("height","3000px");
			DygDFP.ScrollWall.isRunning = true;
			$("body").scrollTop(0);
			video.currentTime = 0;
			$('.bgImage').fadeOut("fast",function(){});
			$('#ScrollWall_Video').fadeIn("slow",function(){});
		});
	},
	giveCloseEvent: function(){
		$(".adPartContainer").hide();
		$("#ScrollWall_ArrowBounce").show();
		$(".closebt").unbind("click");
		$(".closebt").html('<img src="http://img-dygassets.mncdn.com/Images/RichMedia_Close_BTN.png">');
		$(".arrow").css("opacity","1");
		$(".closebt").click(function(){
			DygDFP.ScrollWall.removeVideo();
			DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.ScrollWall.BrandURL + '/&sz=1x1&t=act=scrollWall_close&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'scrollWallClose');
		});
	},
	resize: function(){
		if($("#ScrollWallContainer").length > 0){
			var partImageWidth = (($(window).width() - DygDFP.PageSkin.containerWidth) / 2);

			$("#ScrollWallLeftSkin").css({
				width: partImageWidth,
			});

			$("#ScrollWallRightSkin").css({
				width: partImageWidth,
			});
			
			if(partImageWidth > 0){
				$(".closebt").show();
			}
			else{
				$(".closebt").hide();
			}
		}
	}
  },
  NativeAd: {
	  init: function(imageURL,url,title,brandingName,impressionURL,seconds){
		  if(seconds==undefined)
          {
            if (impressionURL != '') {
              $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }
            $(".native-ad-img").attr("src", imageURL);
            $(".native-ad-title").html(title);
            $(".native-ad-url").attr("href",url);
          }
          else{
            setTimeout(function(){
              if (impressionURL != '') {
                $("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
              }
              $(".native-ad-img").attr("src", imageURL);
              $(".native-ad-title").html(title);
              $(".native-ad-url").attr("href",url);
            },seconds*1000);
          }
	  }
  }

}

DygDFP.init();

function getMetaTag(param) {
  var metas = document.getElementsByTagName('meta');
  for (i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("property") == param) {
      var val = metas[i].getAttribute("content");
      if (val == null) {
        val = "";
      }
      return val;
    }
  }
  return "";
}
$(window).resize(function() {
  DygDFP.PageSkin.resize();
  DygDFP.ScrollWall.resize();

  if ($("#flashLeftPanel").length > 0) {
    DygDFP.Paralax.resize();
  }

  if ($("#takeOverShow").length > 0) {
    DygDFP.Takeover.resize();
  }

  if ($("#videoWall").length > 0) {
    DygDFP.VideoWall.resize();
  }
});

$(window).scroll(function() {
	
	DygDFP.ScrollWall.scroll();
	
  if ($("#flashLeftPanel").length > 0) {
    setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".scrollParalax()", 0);

    clearTimeout($.data(this, "scrollCheck"));
    $.data(this, "scrollCheck", setTimeout(function() {
      setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".scrollParalax()", 0);
    }, 100));

    var s = $(window).scrollTop();
    var d = $(document).height();
    var c = $(window).height();
    scrollPercent = (s / (d - c)) * 100;
    var id = 0;
    var per = Math.floor(scrollPercent);

    var flash = document.getElementById("flashLeftPanel");
    flash.fadeUpClip(per);

    var flash = document.getElementById("flashRightPanel");
    flash.fadeUpClip(per);
  }
  
  if ((DygDFP.section == "videogaleri") && DygDFP.siteName == "NTVCOM_TR") {
		if($(window).scrollTop() == 0)
		{
			$("#LeftSkin").css("position","fixed");
			$("#LeftSkin").css("top",$("header.cf").outerHeight());
			$("#RightSkin").css("position","fixed");
			$("#RightSkin").css("top",$("header.cf").outerHeight());
		}
		else
        {
            $("#LeftSkin").css("position", "fixed");
            $("#RightSkin").css("position", "fixed");
            $("#RightSkin").css("top", 0);
            $("#LeftSkin").css("top", 0);
		}
			
  }
  else if (DygDFP.section != "fotogaleri" && DygDFP.section != "videogaleri" && DygDFP.siteName == "NTVCOM_TR") {
    if ($("#sticky-wrapper").hasClass("is-sticky")) {
      $("#LeftSkin").css("position", "fixed");
      $("#RightSkin").css("position", "fixed");
      $("#RightSkin").css("top", $("nav.main").outerHeight() + $(".ticker-wrapper").height());
      $("#LeftSkin").css("top", $("nav.main").outerHeight() + $(".ticker-wrapper").height());
	  $("#TopSkin").hide();
    } else {
      $("#LeftSkin").css("position", "absolute");
      $("#RightSkin").css("position", "absolute");
	 try {
       if(DygDFP.Brand.NTVCOM_TR != undefined) {
         $("#RightSkin").css("top", DygDFP.Brand.NTVCOM_TR.OldPageSkinTop);
         $("#LeftSkin").css("top", DygDFP.Brand.NTVCOM_TR.OldPageSkinTop);
       }
		 }catch(e){
			  
		}
	  $("#TopSkin").show();
    }
  }
  else if (DygDFP.siteName == "StarTV") {
	if(!$("#div-Tepe_728x90").is(":visible"))
	{
		if($(window).scrollTop() > 38){
			$("#LeftSkin").css("position", "fixed");
			$("#RightSkin").css("position", "fixed");
			$("#RightSkin").css("top", $("#header").outerHeight());
			$("#LeftSkin").css("top", $("#header").outerHeight());
			$("#div-PageSkin").css("top", $("#header").outerHeight());
		}
		else{
			$("#LeftSkin").css("position", "absolute");
			$("#RightSkin").css("position", "absolute");
			$("#RightSkin").css("top", DygDFP.Brand.StarTV.OldPageSkinTop);
			$("#LeftSkin").css("top", DygDFP.Brand.StarTV.OldPageSkinTop);
			$("#div-PageSkin").css("top", DygDFP.Brand.StarTV.OldPageSkinTop);
		}
	}	
  }
  else if (DygDFP.siteName == "StarTVNEW") {
    if ($("header .navigation").hasClass("scrolled")) {
      $("#LeftSkin").css("position", "fixed");
      $("#RightSkin").css("position", "fixed");
      $("#RightSkin").css("top", $("header .navigation").outerHeight());
      $("#LeftSkin").css("top", $("header .navigation").outerHeight());
    }
    else {
      $("#LeftSkin").css("position", "absolute");
      $("#RightSkin").css("position", "absolute");
      $("#RightSkin").css("top", DygDFP.Brand.StarTVNEW.OldPageSkinTop);
      $("#LeftSkin").css("top", DygDFP.Brand.StarTVNEW.OldPageSkinTop);
    }
  }
  else if (DygDFP.siteName == "NTVPara") {
    if ($(window).scrollTop() > 150) {
      $("#LeftSkin").css("position", "fixed");
      $("#RightSkin").css("position", "fixed");
      $("#RightSkin").css("top", 0);
      $("#LeftSkin").css("top", 0);
    } else {
      $("#LeftSkin").css("position", "absolute");
      $("#RightSkin").css("position", "absolute");
      $("#RightSkin").css("top", DygDFP.PageSkin.marginTop);
      $("#LeftSkin").css("top", DygDFP.PageSkin.marginTop);
    }
  } else if (DygDFP.siteName == "NTVSpor") {
    if ($(window).scrollTop() > 183) {
      $("#LeftSkin").css("position", "fixed");
      $("#RightSkin").css("position", "fixed");
      $("#RightSkin").css("top", 0);
      $("#LeftSkin").css("top", 0);
    } else {
      $("#LeftSkin").css("position", "absolute");
      $("#RightSkin").css("position", "absolute");
      $("#RightSkin").css("top", DygDFP.PageSkin.marginTop);
      $("#LeftSkin").css("top", DygDFP.PageSkin.marginTop);
    }
  }
});

// VPAID //

function initVpaid(creative_path, width, height, autoplay) {
  var flashSource = '<object data="' + creative_path + '" type="application/x-shockwave-flash" id="extendVidObj" width="' + width + '" height="' + height + '">';
  flashSource += '<param name="movie" value="' + creative_path + '" />';
  flashSource += '<param name="height" value="' + height + '" />';
  flashSource += '<param name="width" value="' + width + '" />';
  flashSource += '<param name="quality" value="high" />';
  flashSource += '<param name="menu" value="false" />';
  flashSource += '<param name="wmode" value="transparent" />';
  flashSource += '<param name="allowscriptaccess" value="always" />';
  flashSource += '</object>';

  if (autoplay == true || autoplay == 'true') {
    if (document.getElementById($("body object[data*='flowplayer']").attr("id")) != null) {
      var flash = document.getElementById($("body object[data*='flowplayer']").attr("id"));
      flash.fp_play();
    } else {
      var kdp = document.getElementById($("body object[data*='http://cdnapi.kaltura.com/index.php']").attr("id"));
      kdp.sendNotification('doPlay');
    }
  }

  $("#extendVidPanel").css("display", "none");
  $("#extendVid").append(flashSource);
  setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".prepareVPaid();", 400);
  setTimeout(function() {
    $("#extendVidPanel").css("position", "absolute");
    $("#extendVidPanel").css("left", "0");
    $("#extendVidPanel").css("right", "0");
    $("#extendVidPanel").css("margin", "auto");
    $("#extendVidPanel").css("z-index", "99999");
    //$("#extendVidPanel").css("background-color", "white");
    $("#extendVidPanel").css("width", width);
    $("#extendVidPanel").css("height", height);
    $("#extendVidPanel").css("display", "block");
  }, 400);
}

function closeVpaid() {
  $("#extendVidPanel").fadeOut('slow', function() {
    $("#extendVidPanel").css('display', 'none');
    $("#extendVidPanel").empty();



    if (document.getElementById($("body object[data*='flowplayer']").attr("id")) != null) {
      //var flash = document.getElementById($("body object[data*='flowplayer']").attr("id"));
      //flash.fp_play();

      try {
        if ($f(0).getState() == 3) {
          $f(0).resume();
        } else {
          $f(0).play();
        }
      } catch (err) {

      }
    } else {
      var kdp = document.getElementById($("body object[data*='http://cdnapi.kaltura.com/index.php']").attr("id"));
      kdp.sendNotification('doPlay');
    }
  });
}

function closeExtended() {
  if (document.getElementById($("body object[data*='flowplayer']").attr("id")) == null) {
    handleEvents('AdStopped');
  }

  handleEvents('AdUserClose');
  closeVpaid();
}

function gotoURL(src) {
  if (document.getElementById($("body object[data*='flowplayer']").attr("id")) != null) {
    handleEvents('AdUserClose');
  }

  handleEvents('AdClickThru');
  closeVpaid();
}

function handleEvents(param) {
  var flash = null;
  if (document.getElementById($("body object[data*='flowplayer']").attr("id")) != null) {
    flash = document.getElementById($("body object[data*='flowplayer']").attr("id"));
  } else {
    flash = document.getElementById($("body object[data*='http://cdnapi.kaltura.com/index.php']").attr("id"));
  }

  try {
    flash.handleVpaidEvent(param);
  } catch (e) {
    console.log(e);
  }
}

function gotoClick(src) {
  window.open(src);
}

var createCookie = function(name, value, minute) {
  var expires;
  if (minute) {
    var date = new Date();
    date.setTime(date.getTime() + (minute * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}

function videoWallVideoFinished() {
  DygDFP.VideoWall.close();
}

function videoWallSkipAd() {
  DygDFP.VideoWall.close();
}

function videoWallVideoPlayed() {
  DygDFP.VideoWall.open();
}

function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  return mm + '' + dd + '' + yyyy;
}

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent, function(e) {
  if (e.data.indexOf != undefined) {
    if (e.data.indexOf("closeSurvey") > -1) {
      DygDFP.Survey.close(e.data.replace('closeSurvey-', ''));
    } else if (e.data.indexOf("openSurvey") > -1) {
      DygDFP.Survey.open(e.data.replace('openSurvey-', ''));
    } else if (e.data.indexOf("callGoal") > -1) {
      DygDFP.callGoal(e.data.replace('callGoal-', '').split(',')[0], e.data.replace('callGoal-', '').split(',')[1]);
    }
  }
}, false);


$(document).ready(function() {

  if (false) {
    if (DygDFP.siteName == 'StarTV' && DygDFP.section == 'Anasayfa') {
      if (DygDFP.device.isWeb()) {
        $("#bodyRender").prepend('<iframe src="http://secim.ntv.com.tr/genel-widget.html" width="100%" height="230" frameborder="0" scrolling="no"></iframe>');
        $("body").css("background", "none");
      }
    } else if (DygDFP.siteName == 'NTVPara' && DygDFP.section == 'Anasayfa') {
      $("#main").before('<iframe src="http://secim.ntv.com.tr/genel-widget.html" width="100%" height="230" frameborder="0" scrolling="no"></iframe>');
      $("#mainHeader").css("margin-bottom", "-10px");
    } else if (DygDFP.siteName == 'Kral_Muzik12' && DygDFP.section == 'Anasayfa') {
      if (DygDFP.device.isTablet() || DygDFP.device.isWeb()) {
        $("#main-carousel").before('<iframe src="http://secim.ntv.com.tr/genel-widget.html" width="100%" height="230" frameborder="0" scrolling="no"></iframe>');
      }
    }
  }
});
