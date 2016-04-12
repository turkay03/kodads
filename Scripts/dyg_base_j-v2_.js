var gptadslots = [];
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function () {
    var gads = document.createElement('script');
    gads.async = true; gads.type = 'text/javascript';
    var useSSL = 'https:' == document.location.protocol;
    gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(gads, node);
})();
DygDFP = {
    siteName: getMetaTag("dyg:site"),
    section: getMetaTag("dyg:section"),
    target: getMetaTag("dyg:target"),
    categories: getMetaTag("dyg:tags"),
    isAdvertorial: getMetaTag("dyg:advertorial"),
	allowAnimate : true,
    device: {
        isPhone: function () {
            return (DygDFP.device.isiPhone() || DygDFP.device.isWindowsPhone() || DygDFP.device.isAndroidPhone());
        },
        isTablet: function () {
            return (DygDFP.device.isiPad() || DygDFP.device.isAndroidTablet());
        },
        isiPad: function () {
            return (navigator.userAgent.match(/iPad/i) == 'iPad');
        },
        isiPhone: function () {
            return (navigator.userAgent.match(/iPhone/i) == 'iPhone');
        },
        isWindowsPhone: function () {
            return (navigator.userAgent.match(/Windows Phone/i) == 'Windows Phone');
        },
        isAndroidPhone: function () {
            if (navigator.userAgent.match(/Android/i)) {
                return (navigator.userAgent.match(/Mobile/i) == "Mobile")
            }
			
			return false;
        },
        isAndroidTablet: function () {
            if (navigator.userAgent.match(/Android/i)) {
                return (navigator.userAgent.match(/Mobile/i) == null)
            }
			
			return false;
        },
        isWeb: function () {
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
	guidGenerator : function () {
		var S4 = function() {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	},
    flashDetect: function () {
        return ((typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] == "object") || (window.ActiveXObject && (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) != false));
    },
	reload: function() {
		DygDFP.allowAnimate = false;
		jQuery(".ros").hide();
		
        setTimeout(function(){googletag.pubads().refresh();},100);
		
		 googletag.pubads().addEventListener('slotRenderEnded', function (event) {
          if (event.slot === gptadslots[4]) {
                if (!event.isEmpty) {
					jQuery(".ros").show();
				}
			}
		});
    },
    init: function () {
		setTimeout(function(){jQuery("body").append("<div id='extendVidPanel' class=''><div id='extendVid'></div></div>");},1000);
        if (DygDFP.isAdvertorial.length == 0) {
            var imported = document.createElement('script');
            imported.src = 'http://img-dygassets.mncdn.com/Scripts/' + DygDFP.siteName.replace('-','') + '.js?v=1';
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
		appendSelector : '',
        init: function (leftSkinImage, leftSkinClickURL, rightSkinImage, rightSkinClickURL, topSkinImage, topSkinClickURL, impressionURL) {
            if (impressionURL != '') {
                jQuery("body").append('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }
            var partImageWidth = ((jQuery(window).width() - DygDFP.PageSkin.containerWidth) / 2);
            var top = 0;
            var pattern = '<div class="adPartContainer" style="display:none">';
            pattern += '<a id="LeftSkin" target="_blank" href="' + leftSkinClickURL + '" style="position:absolute;left:0;z-index:5;height:1100px"></a>';
            pattern += '<a id="RightSkin" target="_blank" href="' + rightSkinClickURL + '" style="position:absolute;right:0;z-index:5;height:1100px"></a>';

            if (topSkinImage != '') {
                pattern += '<a id="TopSkin" target="_blank" href="' + topSkinClickURL + '" style="position:absolute;right:0;z-index:5;height:50px"></a>';
            }

            pattern += '</div>';

           if(DygDFP.PageSkin.appendSelector == ''){
				jQuery("body").append(pattern);
			}
			else{
				jQuery(DygDFP.PageSkin.appendSelector).append(pattern);
			}
			
			jQuery("#div-PageSkin").hide();

            jQuery("#LeftSkin").css("background", "url(" + leftSkinImage + ") no-repeat 100% 0 ");
            jQuery("#LeftSkin").css("width", partImageWidth);
            jQuery("#LeftSkin").css("top", DygDFP.PageSkin.marginTop);
            jQuery("#RightSkin").css("background", "url(" + rightSkinImage + ") no-repeat 0 0 ");
            jQuery("#RightSkin").css("width", partImageWidth);
            jQuery("#RightSkin").css("top", DygDFP.PageSkin.marginTop);
			
            if (topSkinImage != '') {
                setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-','') + ".preparePageSkin(true)", 400);
                jQuery("#TopSkin").css("background", "url(" + topSkinImage + ") no-repeat 0 0 ");
                jQuery("#TopSkin").css("top", DygDFP.PageSkin.marginTop);
                jQuery("#TopSkin").css("left", partImageWidth);
            }
            else {
                setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-','') + ".preparePageSkin(false)", 400);
            }

           
        },
        show: function (hasAnimation) {
            if (hasAnimation) {
                jQuery(".adPartContainer").fadeIn(300);                
            }
            else {
                jQuery(".adPartContainer").show();
            }
        },
        resize: function () {
            var partImageWidth = ((jQuery(window).width() - DygDFP.PageSkin.containerWidth) / 2);

            jQuery("#LeftSkin").css(
                {
                    width: partImageWidth,
                });

            jQuery("#RightSkin").css(
                {
                    width: partImageWidth,
                });

            jQuery("#TopSkin").css(
                {
                    left: partImageWidth,
                });
        },
        changeMarginTop: function () {
            jQuery("#LeftSkin").css("top", DygDFP.PageSkin.marginTop);
            jQuery("#RightSkin").css("top", DygDFP.PageSkin.marginTop);
            jQuery("#TopSkin").css("top", DygDFP.PageSkin.marginTop);
        },
    },
    LeaderBoard: {
        marginTop: 0,
        containerWidth: 980,
        backgroundColor: "",
        init: function (swfFile, backupImageFile, backupImageClickURL, imageFile, clickURL, iFrameUrl, impressionURL, width, height, clickTagParam, scriptCode) {
            if (scriptCode.indexOf('reklamport.com') > -1) {
                var reklamPort = document.createElement('script');
                reklamPort.src = 'http://ad.reklamport.com/scripts/rp.js';
                document.head.appendChild(reklamPort);
            }

            if (impressionURL != '') {
                jQuery("body").append('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }
		
			if(width == 300){
				jQuery("#div-MPU_Fix").find("iframe").parent().hide();
				jQuery("#div-MPU_Fix").css("margin-bottom","10px");
				jQuery("#div-MPU_Fix").show();
				if (swfFile != '') {
					var swfObject = document.createElement('script');
					swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
					document.getElementsByTagName('head')[0].appendChild(swfObject);

					var flashvars = false;
					var params = {
						flashvars: clickTagParam + "=" + encodeURIComponent(clickURL),						
						wmode: "transparent",
						allowscriptaccess : 'always'
					};

					jQuery("#div-MPU_Fix").append("<div id='MPU_SWF'></div>")
					if (DygDFP.flashDetect() == undefined) {
						jQuery("#MPU_SWF").append('<a href="' + backupImageClickURL + '" target="_blank"><img src="' + backupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
					}
					setTimeout(function () { swfobject.embedSWF(swfFile, "MPU_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params); }, 500);
				}
				else if (imageFile != '') {
					jQuery("#div-MPU_Fix").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
				}
				else if (iFrameUrl != '') {
					jQuery("#div-MPU_Fix").append("<iframe src='" + iFrameUrl + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
				}
			}
			else{
				if(DygDFP.allowAnimate){
					jQuery("#div-Tepe_728x90").animate({
						height: '+=' + height + 'px'
					}, 800);
				}
				else{
					if(jQuery("#div-Tepe_728x90").height() < 80){
						jQuery("#div-Tepe_728x90").css("height","80px");
					}
				}
				
				if(scriptCode != ''){
					jQuery("#div-Tepe_728x90 iframe").css("height",height);
					jQuery("#div-Tepe_728x90 iframe").css("width",width);
					setTimeout(function(){jQuery("#div-Tepe_728x90 iframe").parent().show();},1000);
				}
				
				jQuery("#div-Tepe_728x90").css("text-align", "center");
				jQuery("#div-Tepe_728x90").css("width", "100%");
				jQuery("#div-Tepe_728x90").css("background-color", DygDFP.LeaderBoard.backgroundColor);
				jQuery("#div-Tepe_728x90").find("iframe").hide();
				if (swfFile != '') {
					var swfObject = document.createElement('script');
					swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
					document.getElementsByTagName('head')[0].appendChild(swfObject);

					var flashvars = false;
					var params = {
						flashvars: clickTagParam + "=" + encodeURIComponent(clickURL),					
						wmode: "transparent",
						allowscriptaccess : 'always'
					};

					jQuery("#div-Tepe_728x90").append("<div id='LDB_SWF'></div>")
					if (DygDFP.flashDetect() == undefined) {
						jQuery("#LDB_SWF").append('<a href="' + backupImageClickURL + '" target="_blank"><img src="' + backupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
					}
					setTimeout(function () { swfobject.embedSWF(swfFile, "LDB_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params); }, 500);
				}
				else if (imageFile != '') {
					jQuery("#div-Tepe_728x90").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
				}
				else if (iFrameUrl != '') {
					jQuery("#div-Tepe_728x90").append("<iframe src='" + iFrameUrl + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
				}
			}
        },
        show: function (hasAnimation) {
        },
    },
    MobileLeaderBoard: {
        marginTop: 0,
        containerWidth: 980,
        backgroundColor: "",
        init: function (imageFile, iframeURL, clickURL, impressionURL, width, height, scriptURL) {
		
            if (impressionURL != '') {
                jQuery("body").append('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }

            jQuery("#div-Tepe_728x90").css("height", "0");
            setTimeout(function(){jQuery("#div-Tepe_728x90").show();},200);
            jQuery("#div-Tepe_728x90").animate({
                height: '+=' + height + 'px'
            }, 800);
			
            jQuery("#div-Tepe_728x90").css("text-align", "center");
            jQuery("#div-Tepe_728x90").css("width", "100%");
            jQuery("#div-Tepe_728x90").css("background-color", DygDFP.LeaderBoard.backgroundColor);
            jQuery("#div-Tepe_728x90").find("iframe").parent().hide();
            if (imageFile != '') {
                jQuery("#div-Tepe_728x90").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
            }
            else if (iframeURL != '') {
                jQuery("#div-Tepe_728x90").append("<iframe src='" + iframeURL + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
            }
            else if (scriptURL != '') {
                var script = document.createElement('script');
                script.src = scriptURL;
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }
    },
    Interstitial: {
        init: function (imageFile, clickURL, duration, backgroundColor, swfFile, swfBackupImageFile, swfBackupImageClickURL, impressionURL, width, height, clickTagParam, showHeaderBar, marginTop) {
            if (impressionURL != '') {
                jQuery("body").append('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }
			
            var sourceCode = '<div id="instertitial_dfp" style="background-color:' + backgroundColor + ';top:0px;z-index:99999;width:100%;position:fixed;height:' + jQuery(document).height() + 'px;font-size:16px">';
            if (showHeaderBar == 'Show') {
                sourceCode += '<div style="background-color:Black;width: 100%;height: 20px;position:absolute;top:0px;left:0px;margin: 0px;padding: 0px">';
                sourceCode += '<span id="instertitial_dfp_duration" style="position:absolute;right:215px;top:1px;color:#fff;font-size:13px;font-weight:bold;font-family:Arial">' + duration + '</span><span  style="position:absolute;right:60px;top:1px;color:#fff;font-size:12px;font-family:Arial">saniye sonra kapanacakt\u0131r</span>';
                sourceCode += '<a href="javascript:void(0)" id="instertitial_dfp_close" onclick="DygDFP.Interstitial.close();" style="text-align:center;font-size:13px;height:19px;position:absolute;right:0px;top:0px;width:50px;background-color:#AA0303;color:#fff;text-decoration:none;font-family:Arial">Kapat</a>';
                sourceCode += '</div>';
            }
            else {
                sourceCode += '<span id="instertitial_dfp_duration" style="position:absolute;right:215px;top:1px;color:#fff;font-size:13px;font-weight:bold;font-family:Arial;display:none">' + duration + '</span>';
            }
            sourceCode += '<div id="instertitial_dfp_ad" style="width:100%;margin-top:' + marginTop + 'px;position:absolute;text-align:center">';
            sourceCode += '</div>';
            sourceCode += '</div>';

            jQuery("body").append(sourceCode);
			jQuery("#div-interstitial").hide();

            if (imageFile != '') {
                jQuery("#instertitial_dfp_ad").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" /></a>');
            }
            else if (swfFile != '') {
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

                jQuery("#instertitial_dfp_ad").append("<div id='INS_SWF'></div>")
                if (DygDFP.flashDetect() == undefined) {
                    jQuery("#INS_SWF").append('<a href="' + swfBackupImageClickURL + '" target="_blank"><img src="' + swfBackupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
                }
                else {
                    setTimeout(function () { swfobject.embedSWF(swfFile, "INS_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params); }, 1000);
                }
            }

            jQuery("body").css("overflow", "hidden");
            var script = top.document.createElement("script");
            script.text = "function closeTakeOver(){ DygDFP.Interstitial.close();}";
            script.setAttribute("type", "text/javascript");
            top.document.getElementsByTagName("head")[0].appendChild(script);

            DygDFP.Interstitial.changeDuration();

        },
        changeDuration: function () {
            var currentSecond = parseInt(jQuery("body").find("#instertitial_dfp_duration").html());
            jQuery("body").find("#instertitial_dfp_duration").html(currentSecond - 1);
            if (currentSecond == 1) {
                DygDFP.Interstitial.close();
            }
            else {
                setTimeout('DygDFP.Interstitial.changeDuration();', 1000);
            }
        },
        close: function () {
            jQuery("#instertitial_dfp").fadeOut();
            jQuery("body").css("overflow", "");
			DygDFP.PageSkin.resize();
        }
    },
    MobileInterstitial: {
        init: function (imageFile, iframeURL, clickURL, impressionURL, duration, width, height, backgroundColor) {
            if (impressionURL != '') {
                jQuery("body").append('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }
			
			jQuery("#div-interstitial").hide();

            var sourceCode = '<div id="instertitial_dfp" style="background-color:' + backgroundColor + ';top:0px;z-index:99999;width:100%;position:fixed;height:' + jQuery(document).height() + 'px;font-size:16px">';
            sourceCode += '<div style="z-index:1;background-color:black;opacity:0.5;width: 100%;height: 20px;position:absolute;top:0px;left:0px;margin: 0px;padding: 0px"></div>';

            sourceCode += '<div style="z-index: 999;position: absolute;width: 310px;right: 0;"><span id="instertitial_dfp_duration" style="position:absolute;right:160px;top:5px;color:#fff;font-size:11px;font-weight:bold;font-family:Arial">' + duration + '</span><span  style="position:absolute;right:35px;top:5px;color:#fff;font-size:10px;font-family:Arial">saniye sonra kapanacakt\u0131r</span>';
            sourceCode += '<a href="javascript:void(0)" id="instertitial_dfp_close" onclick="DygDFP.Interstitial.close();" style="text-align:center;font-size:13px;height:19px;position:absolute;right:0px;top:0px;width:30px;color:#fff;text-decoration:none;font-family:Arial"><img style="width:40px;top: -5px;position: absolute;right: -2px;" src="http://img-dygassets.mncdn.com/Images/close_button.png"/></a></div>';
            sourceCode += '<div id="instertitial_dfp_ad" style="width:100%;;position:absolute;text-align:center">';
            sourceCode += '</div>';
            sourceCode += '</div>';

            jQuery("body").append(sourceCode);
            jQuery("body").css("overflow", "hidden");

            if (imageFile != '') {
                jQuery("#instertitial_dfp_ad").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" /></a>');
            }
            else if (iframeURL != '') {
                jQuery("#instertitial_dfp_ad").append("<iframe src='" + iframeURL + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
            }

            jQuery("body").css("overflow", "hidden");

            DygDFP.MobileInterstitial.changeDuration();

        },
        changeDuration: function () {
            var currentSecond = parseInt(jQuery("body").find("#instertitial_dfp_duration").html());
            jQuery("body").find("#instertitial_dfp_duration").html(currentSecond - 1);
            if (currentSecond == 1) {
                DygDFP.Interstitial.close();
            }
            else {
                setTimeout('DygDFP.MobileInterstitial.changeDuration();', 1000);
            }
        },
        close: function () {
            jQuery("#instertitial_dfp").remove();
            jQuery("body").css("overflow", "");
        }
    },
    Masthead: {
        appendSelector: jQuery("body"),
        init: function (panel1SwfFile, panel1BackupImageFile, panel2SwfFile, panel2BackupImageFile, clickURL, flvURL, brandURL, impressionURL, panel1Width, panel1Height, panel2Width, panel2Height, playerWidth, playerHeight, playerLeft, playerTop, hasScriptCode) {
			if(hasScriptCode){
				return false;
			}
			
            if (impressionURL != '') {
                jQuery("body").append('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }
			
			
            var panel1MarginTop = 0;
            var panel2MarginTop = 0;
            var showBtnMarginTop = 0;
            var showBtnMarginLeft = 850;
			
			jQuery("#div-Masthead").hide();

            jQuery(DygDFP.Masthead.appendSelector).prepend('<div id="mastheadPanel" style="margin-top:5px"></div>');
			jQuery("#mastheadPanel").css("width",panel1Width);
			jQuery("#mastheadPanel").css("margin","auto");
			jQuery("#mastheadPanel").css("left",0);
			jQuery("#mastheadPanel").css("right",0);
			//jQuery("#mastheadPanel").css("margin-bottom","5px");
            jQuery("#mastheadPanel").append('<div id="mastheadSubPanel1"></div>');
            jQuery("#mastheadSubPanel1").append('<div id="mastheadSubPanel1Click"></div>');
            jQuery("#mastheadSubPanel1").css("position", "relative");
            jQuery("#mastheadSubPanel1").css("margin-top", panel1MarginTop);

            jQuery("#mastheadSubPanel1Click").attr("onclick", "DygDFP.Masthead.open(" + panel2Height + ");");
            jQuery("#mastheadSubPanel1Click").css("cursor", "pointer");
            jQuery("#mastheadSubPanel1Click").css("position", "absolute");
            jQuery("#mastheadSubPanel1Click").css("height", panel1Height);
            jQuery("#mastheadSubPanel1Click").css("width", panel1Width);

            jQuery("#mastheadSubPanel1").append('<a id="mastheadSubPanel1Show" href="javascript:;"></a>')
            jQuery("#mastheadSubPanel1Show").css("margin-top", showBtnMarginTop);
            jQuery("#mastheadSubPanel1Show").css("right", 0);
            jQuery("#mastheadSubPanel1Show").css("position", "absolute");
            jQuery("#mastheadSubPanel1Show").append('&nbsp;<img src="http://img-dygassets.mncdn.com/Images/openbtn.png"/>');
            jQuery("#mastheadSubPanel1Show").attr("onclick", "DygDFP.Masthead.open(" + panel2Height + ");");

            jQuery("#mastheadSubPanel1").append('<div id="mastheadSubPanel1SWF"></div>');

            jQuery("#mastheadPanel").append('<div id="mastheadSubPanel2"></div>');
            jQuery("#mastheadSubPanel2").css("position", "relative");
            jQuery("#mastheadSubPanel2").css("margin-top", panel2MarginTop);
            jQuery("#mastheadSubPanel2").css("height", panel2Height);
            jQuery("#mastheadSubPanel2").css("width", panel2Width);
            jQuery("#mastheadSubPanel2").css("display", "none");

            jQuery("#mastheadSubPanel2").append('<a id="mastheadSubPanel2Close" href="javascript:;"></a>');
            jQuery("#mastheadSubPanel2Close").css("margin-top", showBtnMarginTop);
            jQuery("#mastheadSubPanel2Close").css("right", 0);
            jQuery("#mastheadSubPanel2Close").css("position", "absolute");
            jQuery("#mastheadSubPanel2Close").css("z-index", "1");
            jQuery("#mastheadSubPanel2Close").append('<img src="http://img-dygassets.mncdn.com/Images/closebtn.png"/>');
            jQuery("#mastheadSubPanel2Close").attr("onclick", "DygDFP.Masthead.close(" + panel1Height + ");");

            jQuery("#mastheadSubPanel2").append('<div style="position:absolute;"><div id="mastheadSubPanel2SWF"></div></div>');
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
                    jQuery("#mastheadSubPanel1SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
                }
                else {
                    setTimeout(function () { swfobject.embedSWF(panel1SwfFile, "mastheadSubPanel1SWF", panel1Width, panel1Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params); }, 500);
                }

                if (DygDFP.flashDetect() == undefined) {
                    jQuery("#mastheadSubPanel2SWF").append('<a href="' + clickURL + '" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
                }
                else {
                    setTimeout(function () { swfobject.embedSWF(panel2SwfFile, "mastheadSubPanel2SWF", panel2Width, panel2Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params); }, 500);

                    if (flvURL != '') {
                        jQuery("#mastheadSubPanel2").append('<div id="mastheadVideoPanel"></div>');
                        jQuery("#mastheadVideoPanel").css("position", "absolute");
                        jQuery("#mastheadVideoPanel").css("width", playerWidth);
                        jQuery("#mastheadVideoPanel").css("height", playerHeight);
                        jQuery("#mastheadVideoPanel").css("margin-left", playerLeft);
                        jQuery("#mastheadVideoPanel").css("margin-top", playerTop);

                        jQuery("#mastheadVideoPanel").append('<div id="mastheadVideo"></div>');

                        var flashvars = false;
                        var params = {
                            flashvars: "vol=0&clickTAG=" + encodeURIComponent(clickURL) + "&flvsrc=" + flvURL + "&brandUrl=" + brandURL + "&_w=" + playerWidth + "&_h=" + playerHeight,
                            wmode: "transparent",
                            allowscriptaccess: 'always'
                        };

                        setTimeout(function () { swfobject.embedSWF("http://img-dygassets.mncdn.com/Files/Swf/player.swf", "mastheadVideo", playerWidth, playerHeight, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params); }, 500);
                    }
                }


            }
            else if (panel1ImageFile != '' && panel2ImageFile != '') {
                jQuery("#mastheadSubPanel1SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
                jQuery("#mastheadSubPanel2SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
            }
			

            if (window.sessionStorage.getItem('isShowMasthead') == null || window.sessionStorage.getItem('isShowMasthead') == "true") {
                DygDFP.Masthead.open(panel2Height);
            }
        },
        open: function (height) {
            jQuery('#mastheadPanel').animate({ height: height }, 'slow');
            window.sessionStorage.setItem('isShowMasthead', 'true');
            jQuery('#mastheadSubPanel1').hide();
            jQuery('#mastheadSubPanel2').slideToggle('slow', function () { jQuery('#mastheadSubPanel2Close').show(); });
            jQuery('#mastheadSubPanel1Show').hide();
            jQuery('#mastheadVideoPanel').show();
			
			setTimeout("if(DygDFP.Brand." + DygDFP.siteName.replace('-','') + ".preparePageSkinPosition() != undefined){DygDFP.Brand." + DygDFP.siteName.replace('-','') + ".preparePageSkinPosition()}", 400);
        },
        close: function (height) {
            jQuery('#mastheadVideoPanel').hide()
            jQuery('#mastheadPanel').animate({ height: height }, 400);
            window.sessionStorage.setItem('isShowMasthead', 'false');
            jQuery("#mastheadSubPanel2Close").hide();
            jQuery('#mastheadSubPanel2').slideToggle('slow', function () {
                jQuery('#mastheadSubPanel1').show();
                jQuery('#mastheadSubPanel1Show').show();
            });
			setTimeout("if(DygDFP.Brand." + DygDFP.siteName.replace('-','') + ".preparePageSkinPosition() != undefined){DygDFP.Brand." + DygDFP.siteName.replace('-','') + ".preparePageSkinPosition()}", 400);
        }
    },
    Takeover: {
        appendSelector: jQuery("body"),
        init: function (panel1SwfFile, panel1BackupImageFile, panel1Width, panel1Height, panel2SWFFile, panel2BackupImageFile, panel2Width, panel2Height, clickTagParam, clickURL, impressionURL, position) {
            if (impressionURL != '') {
                jQuery("body").append('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }
	
            DygDFP.Takeover.appendSelector = (position == "728x90") ? jQuery("#div-Tepe_728x90") : jQuery("#div-300x250_Ros-1");
			
            jQuery(DygDFP.Takeover.appendSelector).append('<div id="takeOverPanel"></div>');
            jQuery("#takeOverPanel").animate({
                height: '+=' + panel1Height + 'px'
            }, 800);

            jQuery("#takeOverPanel").css("text-align", "center");
            jQuery("#takeOverPanel").css("width", "100%");
            jQuery("#takeOverPanel").css("background-color", DygDFP.LeaderBoard.backgroundColor);
            jQuery("#takeOverPanel").parent().find("iframe").hide();
            jQuery("#takeOverPanel").append('<a href="javascript:;" id="takeOverClick"></a>');
            jQuery("#takeOverClick").attr("onclick", "DygDFP.Takeover.open();");
            jQuery("#takeOverClick").css("background-color", "white");
            jQuery("#takeOverClick").css("opacity", "0");
            jQuery("#takeOverClick").css("width", panel1Width);
            jQuery("#takeOverClick").css("height", panel1Height);
            jQuery("#takeOverClick").css("display", "block");
            jQuery("#takeOverClick").css("position", "absolute");
            if (position == "728x90") {
                jQuery("#takeOverClick").css("left", "0px");
                jQuery("#takeOverClick").css("right", "0px");
				if(jQuery("#div-Tepe_728x90").height() != panel1Height){
				 jQuery("#div-Tepe_728x90").animate({
					height: '+=' + panel1Height + 'px'
					}, 800);
				}
				
				if(DygDFP.siteName == 'StarTV'){
					jQuery("body").css("background","white");
				}
            }
            jQuery("#takeOverClick").css("margin", "auto");

            jQuery("#takeOverPanel").append('<div id="takeOverSWF"></div>');
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
                jQuery("#takeOverSWF").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
            }
            else {
                setTimeout(function () { swfobject.embedSWF(panel1SwfFile, "takeOverSWF", panel1Width, panel1Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params); }, 500);
            }

            jQuery("body").append('<div id="takeOverShow"></div>');
            jQuery("#takeOverShow").css("position", "fixed");
            jQuery("#takeOverShow").css("z-index", "999999");
            jQuery("#takeOverShow").css("top", 0);
            jQuery("#takeOverShow").css("left", "0");
            jQuery("#takeOverShow").css("right", "0");
            jQuery("#takeOverShow").css("margin", "auto");
            jQuery("#takeOverShow").css("width", panel2Width);
			jQuery("#takeOverShow").attr("data-width", panel2Width);
            jQuery("#takeOverShow").css("display", "none");
			
			if(jQuery(window).width() < panel2Width){
				jQuery("#takeOverShow").css("margin-left", ((panel2Width - jQuery(window).width()) / 2) * -1);
			}
			
            jQuery("#takeOverShow").append('<div id="takeOverShowSWF"></div>');

            if (DygDFP.flashDetect() == undefined) {
                jQuery("#takeOverShowSWF").append('<a href="javascript:;" onclick="closeTakeOver();" style="right:0;position:absolute;"><img src="http://img-dygassets.mncdn.com/Images/closebtn.png"/></a>');
                jQuery("#takeOverShowSWF").append('<a href="' + clickURL + '" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
            }
            else {
			
				var paramsN = {
					flashvars: clickTagParam + "=" + encodeURIComponent(clickURL),
					wmode: "transparent",
					allowscriptaccess: 'always'
				};
                setTimeout(function () { swfobject.embedSWF(panel2SWFFile, "takeOverShowSWF", panel2Width, panel2Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, paramsN); }, 500);
            }

            var script = top.document.createElement("script");
            script.text = "function closeTakeOver(){ DygDFP.Takeover.close();}";
            script.setAttribute("type", "text/javascript");
            top.document.getElementsByTagName("head")[0].appendChild(script);

            if (getCookie('isShowTakeover') == "") {
                DygDFP.Takeover.open();
            }

        },
        open: function (height) {
			createCookie('isShowTakeover','true',60);
            jQuery("#takeOverShow").show();
        },
        close: function () {
            jQuery("#takeOverShow").fadeOut();
        },
        resize: function () {
		
			var panel2Width = jQuery("#takeOverShow").attr("data-width");
			console.log(panel2Width);
            if(jQuery(window).width() < panel2Width){
				jQuery("#takeOverShow").css("margin-left", ((panel2Width - jQuery(window).width()) / 2) * -1);
			}
			else{
				jQuery("#takeOverShow").css("margin-left","auto");
			}
        }
    },
	TextLink: {
        appendSelector: jQuery("body"),
        init: function (swfFile,backupImageFile,clickTagParam,imageFile,clickURL,impressionURL,width,height) {
            if (impressionURL != '') {
                jQuery("body").append('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }
			jQuery("#div-tlb").css("height", height);
			if (swfFile != '') {
				var swfObject = document.createElement('script');
                swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
                document.getElementsByTagName('head')[0].appendChild(swfObject);

                var flashvars = false;
                var params = {
                    flashvars: clickTagParam + "=" + encodeURIComponent(clickURL),
                    allowscriptaccess : 'always'
                };

                jQuery("#div-tlb").append("<div id='TLB_SWF'></div>")
                if (DygDFP.flashDetect() == undefined) {
                    jQuery("#TLB_SWF").append('<a href="' + clickURL + '" target="_blank"><img src="' + backupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
                }
                setTimeout(function () { swfobject.embedSWF(swfFile, "TLB_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params); }, 500);
			} 
			else if (imageFile != '') {
				jQuery("#div-tlb").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
			}
			else{
				jQuery("#div-tlb").find("iframe").css("height",height);
				jQuery("#div-tlb").find("iframe").css("width",width);
			}
        }
    },
    Paralax: {
        marginTop: 0,
        containerWidth: 980,
        init: function (leftSWFURL, rightSWFURL, leftSSWFClickURL, rightSWFClickURL, impressionURL) {
            if (impressionURL != '') {
                jQuery("body").append('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }
			
            var partImageWidth = ((jQuery(document).width() - DygDFP.PageSkin.containerWidth) / 2);
            var top = 0;
            var pattern = '<div class="adPartContainer" style="display:none">';
            pattern += '<div id="LeftSkin" style="position:absolute;left:0;z-index:5;height:1500px"><div id="LeftSWF"></div></div>';
            pattern += '<div id="RightSkin" style="position:absolute;right:0;z-index:5;height:1500px"><div id="RightSWF"></div></div>';
            pattern += '</div>';

            jQuery("body").prepend(pattern);
			
			jQuery("#div-PageSkin").hide();
			
			jQuery("#LeftSkin").css("position","absolute");
			jQuery("#LeftSkin").css("left", (partImageWidth - 900));
				
			jQuery("#RightSkin").css("width",partImageWidth);
			jQuery("#RightSkin").css("overflow","hidden");
			jQuery("#flashRightPanel").css("left", 10);
				
			setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-','') + ".prepareParalax()", 400);
			
			if (typeof swfobject === 'undefined') {
                var swfObject = document.createElement('script');
                swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
                document.getElementsByTagName('head')[0].appendChild(swfObject);
            }
			
			setTimeout(function(){
				var flashvars2 = {
					'clickTag' : encodeURIComponent(rightSWFClickURL)
				};
				
                var params2 = {
                    allowscriptaccess : 'always',
                    wmode : 'transparent'
                };
				var attributes2 = {};
				attributes2.id = "flashLeftPanel";
				swfobject.embedSWF(leftSWFURL, "LeftSWF", "900", "1500", "9.0.0", false, flashvars2, params2, attributes2);
			
				var flashvars = {
					'clickTag' : encodeURIComponent(leftSSWFClickURL),
				};
				var params = {
                    allowscriptaccess : 'always',
                    wmode : 'transparent'
				};
				var attributes = {};
				attributes.id = "flashRightPanel";
				swfobject.embedSWF(rightSWFURL, "RightSWF", "900", "1500", "9.0.0", false, flashvars, params, attributes); 
				
				
			},1000);
        },
        show: function (hasAnimation) {
            if (hasAnimation) {
                jQuery(".adPartContainer").fadeIn(300);                
            }
            else {
                jQuery(".adPartContainer").show();
            }
			
			DygDFP.Paralax.resize();
        },
        resize: function () {
            var partImageWidth = ((jQuery(document).width() - DygDFP.PageSkin.containerWidth) / 2);

            jQuery("#LeftSkin").css(
                {
                    left: partImageWidth - 900,
                });

            jQuery("#RightSkin").css(
                {
                    width: partImageWidth,
                });
        },
        changeMarginTop: function () {
            jQuery("#LeftSkin").css("top", DygDFP.PageSkin.marginTop);
            jQuery("#RightSkin").css("top", DygDFP.PageSkin.marginTop);
        },
    },
	PushDown: {
        appendSelector: jQuery("body"),
        init: function (panel1SwfFile, panel1BackupImageFile, panel2SwfFile, panel2BackupImageFile, clickURL, impressionURL, panel1Width, panel1Height, panel2Width, panel2Height) {
            if (impressionURL != '') {
                jQuery("body").append('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }
			
            var panel1MarginTop = 0;
            var panel2MarginTop = 0;
            var showBtnMarginTop = 0;
            var showBtnMarginLeft = 850;
			
			jQuery(DygDFP.PushDown.appendSelector).show();
            jQuery(DygDFP.PushDown.appendSelector).prepend('<div id="pushDownPanel" style="margin-top:5px"></div>');
			jQuery("#pushDownPanel").css("width",DygDFP.PageSkin.containerWidth);
			jQuery("#pushDownPanel").css("margin","auto");
			jQuery("#pushDownPanel").css("left",0);
			jQuery("#pushDownPanel").css("right",0);
            jQuery("#pushDownPanel").append('<div id="pushDownSubPanel1"></div>');
            jQuery("#pushDownSubPanel1").append('<div id="pushDownSubPanel1Click"></div>');
            jQuery("#pushDownSubPanel1").css("position", "relative");
            jQuery("#pushDownSubPanel1").css("margin-top", panel1MarginTop);

            jQuery("#pushDownSubPanel1Click").attr("onclick", "DygDFP.PushDown.open(" + panel2Height + ");");
            jQuery("#pushDownSubPanel1Click").css("cursor", "pointer");
            jQuery("#pushDownSubPanel1Click").css("position", "absolute");
            jQuery("#pushDownSubPanel1Click").css("height", panel1Height);
            jQuery("#pushDownSubPanel1Click").css("width", panel1Width);
			
            jQuery("#pushDownSubPanel1").append('<div id="pushDownSubPanel1SWF"></div>');

            jQuery("#pushDownPanel").append('<div id="pushDownSubPanel2"></div>');
            jQuery("#pushDownSubPanel2").css("position", "relative");
            jQuery("#pushDownSubPanel2").css("margin-top", panel2MarginTop);
            jQuery("#pushDownSubPanel2").css("height", panel2Height);
            jQuery("#pushDownSubPanel2").css("width", panel2Width);
            jQuery("#pushDownSubPanel2").css("display", "none");
            jQuery("#pushDownSubPanel2").append('<div style="position:absolute;"><div id="pushDownSubPanel2SWF"></div></div>');
			
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
                    jQuery("#pushDownSubPanel1SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
                }
                else {
                    setTimeout(function () { swfobject.embedSWF(panel1SwfFile, "pushDownSubPanel1SWF", panel1Width, panel1Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params); }, 500);
                }

                if (DygDFP.flashDetect() == undefined) {
                    jQuery("#pushDownSubPanel2SWF").append('<a href="' + clickURL + '" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
                }
                else {
                    setTimeout(function () { swfobject.embedSWF(panel2SwfFile, "pushDownSubPanel2SWF", panel2Width, panel2Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params); }, 500);
                }


            }
            else if (panel1ImageFile != '' && panel2ImageFile != '') {
                jQuery("#pushDownSubPanel1SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
                jQuery("#pushDownSubPanel2SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
            }
			

            if (window.sessionStorage.getItem('isPushDown') == null || window.sessionStorage.getItem('isPushDown') == "true") {
                DygDFP.PushDown.open(panel2Height);
            }
			else{
				jQuery(DygDFP.PushDown.appendSelector).animate({ height: panel1Height }, 'slow');
				jQuery('#pushDownPanel').animate({ height: panel1Height }, 'slow');
			}
        },
        open: function (height) {
			jQuery(DygDFP.PushDown.appendSelector).animate({ height: height }, 'slow');
            jQuery('#pushDownPanel').animate({ height: height }, 'slow');
            window.sessionStorage.setItem('isPushDown', 'true');
            jQuery('#pushDownSubPanel1').hide();
            jQuery('#pushDownSubPanel2').slideToggle('slow');
        },
        close: function (height) {
			jQuery(DygDFP.PushDown.appendSelector).animate({ height: height }, 'slow');
            jQuery('#pushDownPanel').animate({ height: height }, 400);
            window.sessionStorage.setItem('isPushDown', 'false');
            jQuery('#pushDownSubPanel2').slideToggle('slow', function () {
                jQuery('#pushDownSubPanel1').show();
            });
        }
    },
	Survey: {
        appendSelector: jQuery("body"),
        init: function (iframeURL, width, height, surveyKey) {
			
			jQuery("body").append('<div id="surveyPanel"></div>');
			jQuery("#surveyPanel").css("position","fixed");
			jQuery("#surveyPanel").css("bottom","10px");
			jQuery("#surveyPanel").css("right","-1000px");
			jQuery("#surveyPanel").css("width",width);
			jQuery("#surveyPanel").css("height",height);
			jQuery("#surveyPanel").css("z-index",99999);
			
			if(iframeURL != ''){
				jQuery("#surveyPanel").append('<iframe id="surveyIframe"></iframe>');
				jQuery("#surveyIframe").css("width",width);
				jQuery("#surveyIframe").css("height",height);
				jQuery("#surveyIframe").css("border","none");
				jQuery("#surveyIframe").attr("src",iframeURL + "?surveyKey="+surveyKey+"&pDomain="+document.location.protocol + '//' + document.location.host);
			}
			
			jQuery("#surveyPanel").append('<a id="surveyCloseA" href="javascript:;"><img src="http://img-dygassets.mncdn.com/Images/SurveyCloseBTN.png"></a>');
			jQuery("#surveyCloseA").click(function(){
				DygDFP.Survey.close(surveyKey);
			});
			
			jQuery("#surveyCloseA").css("position","absolute");
			jQuery("#surveyCloseA").css("top",-8);
			jQuery("#surveyCloseA").css("right",4);           
        },
        open: function (surveyKey) {
			if(getCookie(surveyKey) == '' || getCookie(surveyKey) == null){
				jQuery("#surveyPanel").animate({"right":"10px"}, "slow");
				DygDFP.Survey.interval(surveyKey,1);
			}
        },
        close: function (surveyKey) {
			createCookie(surveyKey,surveyKey,60);
			jQuery("#surveyPanel").animate({"right":"-1000px"}, "slow");
        },
		interval: function(surveyKey,currentIndex){
			if(currentIndex == 20){
				jQuery("#surveyPanel").animate({"right":"-1000px"}, "slow");
			}
			else{
				setTimeout(function(){
					DygDFP.Survey.interval(surveyKey,currentIndex+1);
				},1000);
			}
		},
        kill: function (surveyKey) {
			createCookie(surveyKey,surveyKey,60);
			jQuery("#surveyPanel").animate({"right":"-1000px"}, "slow");
        }
    },
	VideoWall: {
        appendSelector: jQuery("body"),
		isOpen : false,
		top : 100,
        init: function (flvURL, width, height, clickURL, backgroundImage, headerImage, brandUrl, campaignName) {
			jQuery(DygDFP.VideoWall.appendSelector).append("<div id='videoWall'></div>");
			jQuery("#videoWall").css("width",jQuery(window).width());			
			jQuery("#videoWall").css("height",1000);
			jQuery("#videoWall").css("position","absolute");
			jQuery("#videoWall").append("<div id='videoWallSWF'></div>");
			jQuery("#videoWall").css("top", DygDFP.VideoWall.top);
			if (typeof swfobject === 'undefined') {
				var swfObject = document.createElement('script');
				swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
				document.getElementsByTagName('head')[0].appendChild(swfObject);
			}

			var isAutoPlay = (getCookie('isAutoPlayVideoWall')==''||getCookie('isAutoPlayVideoWall')==null)?"true":"false";
			var flashvars = false;
			var params = {
				flashvars: "clickTAG=" + encodeURIComponent(clickURL) + "&flvUrl=" + flvURL + "&splashImagePath=" + backgroundImage + "&headerImg=" + headerImage+ "&isAutoPlay=" + isAutoPlay + "&brandUrl=" + brandUrl + "&campaignName=" + campaignName,
				wmode: "transparent",
				allowscriptaccess: 'always'
			};

			if (DygDFP.flashDetect() == undefined) {
				//jQuery("#videoWall").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
			}
			else {
				setTimeout(function () { swfobject.embedSWF('http://img-dygassets.mncdn.com/Files/Swf/VideoWall.swf', "videoWallSWF", "100%", "100%", "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params); }, 500);
			}
			
			setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-','') + ".initVideoWall()", 0);
        },
        open: function () {
			createCookie('isAutoPlayVideoWall','true',120);
			DygDFP.VideoWall.isOpen = true;
			setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-','') + ".openVideoWall()", 0);
        },
        close: function () {
			if(DygDFP.VideoWall.isOpen){
				DygDFP.VideoWall.isOpen = false;
				setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-','') + ".closeVideoWall()", 0);
			}
        },
        resize: function () {
			jQuery("#videoWallSWF").css("width",jQuery(window).width());
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

jQuery(window.parent).resize(function () {
    DygDFP.PageSkin.resize();
	
	if(jQuery("#flashLeftPanel").length > 0){
		DygDFP.Paralax.resize();
	}
	
	if(jQuery("#takeOverShow").length > 0){
		DygDFP.Takeover.resize();
	}
	
	if(jQuery("#videoWall").length > 0){
		DygDFP.VideoWall.resize();
	}
});

jQuery(window).scroll(function(){
	if(jQuery("#flashLeftPanel").length > 0){
		setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-','') + ".scrollParalax()", 0);
		
		clearTimeout( jQuery.data( this, "scrollCheck" ) );
		jQuery.data( this, "scrollCheck", setTimeout(function() {
			setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-','') + ".scrollParalax()", 0);
		}, 100) );
		
		var s = jQuery(window).scrollTop();
		var d = jQuery(document).height();
		var c = jQuery(window).height();
		scrollPercent = (s / (d-c)) * 100;
		var id = 0;
		var per =  Math.floor(scrollPercent);
		
		var flash =	document.getElementById("flashLeftPanel");
		flash.fadeUpClip(per);
		
		var flash =	document.getElementById("flashRightPanel");
		flash.fadeUpClip(per);
	}
});

// VPAID //

function initVpaid(creative_path,width,height,autoplay){ 
	jQuery("#extendVidPanel").fadeIn('slow',function(){
		jQuery("#extendVidPanel").css('display','block');
	});
	
	var flashSource = '<object data="' + creative_path + '" type="application/x-shockwave-flash" id="extendVidObj" width="' + width + '" height="' + height + '">';
	flashSource += '<param name="movie" value="' + creative_path + '" />';
	flashSource += '<param name="height" value="' + height + '" />';
	flashSource += '<param name="width" value="' + width + '" />';
	flashSource += '<param name="quality" value="high" />';
	flashSource += '<param name="menu" value="false" />';
	flashSource += '<param name="wmode" value="transparent" />';
	flashSource += '<param name="allowscriptaccess" value="always" />';
	flashSource += '</object>';
	
	if(autoplay == 'true'){
		var kdp = document.getElementById(jQuery("body object[data*='http://cdnapi.kaltura.com/index.php']").attr("id"));
		kdp.sendNotification('doPlay');
	}
	
	jQuery("#extendVid").append(flashSource);
	
	setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-','') + ".prepareVPaid()", 400);
	setTimeout(function(){
	jQuery("#extendVidPanel").css("position","absolute");
	jQuery("#extendVidPanel").css("display","block");
	jQuery("#extendVidPanel").css("left","0");
	jQuery("#extendVidPanel").css("right","0");
	jQuery("#extendVidPanel").css("margin","auto");
	jQuery("#extendVidPanel").css("z-index","9999");
	jQuery("#extendVidPanel").css("width",width);
	jQuery("#extendVidPanel").css("height",height);
	},400);
}

function closeVpaid(){
	jQuery("#extendVidPanel").fadeOut('slow',function(){
		jQuery("#extendVidPanel").css('display','none');
		jQuery("#extendVidPanel").empty();
	});
}

function closeExtended(){
	closeVpaid();
	handleEvents('AdStopped');
}

function gotoURL(src){
	handleEvents('AdClickThru');
	closeVpaid();
}

function handleEvents(param){
	var flash = document.getElementById(jQuery("body object[data*='http://cdnapi.kaltura.com/index.php']").attr("id"));
	flash.handleVpaidEvent(param);
}

function gotoClick(src){
	window.open(src);
}

var createCookie = function (name, value, minute) {
    var expires;
    if (minute) {
        var date = new Date();
        date.setTime(date.getTime() + (minute * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
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

function videoWallVideoFinished(){
	DygDFP.VideoWall.close();
}

function videoWallSkipAd(){
	DygDFP.VideoWall.close();
}

function videoWallVideoPlayed(){
	DygDFP.VideoWall.open();
}

function getCurrentDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd='0'+dd
	} 

	if(mm<10) {
		mm='0'+mm
	} 

	return mm+''+dd+''+yyyy;
}

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent,function(e) {
	
	if(e.data.indexOf("closeSurvey") > -1){
		DygDFP.Survey.close(e.data.replace('closeSurvey-',''));
	}
	else if(e.data.indexOf("openSurvey") > -1){
		DygDFP.Survey.open(e.data.replace('openSurvey-',''));
	}
},false);


