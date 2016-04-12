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
            if (jQuery("body iframe#iframe_" + type).length == 0) {
                jQuery("body").append("<iframe id='iframe_" + type + "' src='" + url + "'></iframe>")
            }
        },
        imageRequest: function(url, type){
            if (jQuery("body img#img_" + type).length == 0) {
                jQuery("body").append("<img id='img_" + type + "' src='" + url + "'/>")
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
            jQuery("#instertitial_dfp").remove();
            jQuery(".ros").hide();

            googletag.cmd.push(function() {
                googletag.pubads().clearTargeting();
                googletag.pubads().updateCorrelator();
                jQuery(".adPartContainer").remove();
                jQuery(".infinitePageSkin").remove();
                jQuery(".infiniteInsterstitial").remove();
                jQuery(".PageSkinImp").remove();
                jQuery(".InterstitialImp").remove();
                jQuery(".ros").html('');

                if (DygDFP.section == 'fotogaleri') {
                    jQuery("#rklm_728x90").html('');
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
                    jQuery("#rklm_728x90").append("<div id='" + ldbID + "' class='infiniteLDB' style='text-align:center'></div>")
                    googletag.cmd.push(function() {
                        googletag.display(ldbID);
                    });
                }



                jQuery("body").append("<div id='" + pageskinDivID + "' class='infinitePageSkin'></div>")
                googletag.cmd.push(function() {
                    googletag.display(pageskinDivID);
                });

                jQuery("body").append("<div id='" + insterstitialID + "' class='infiniteInsterstitial'></div>")
                googletag.cmd.push(function() {
                    googletag.display(insterstitialID);
                });

                jQuery(".ros").append("<div id='" + mpuID + "' class='infiniteMPU'></div>")
                googletag.cmd.push(function() {
                    googletag.display(mpuID);
                });

                googletag.pubads().enableSingleRequest();
                googletag.pubads().enableAsyncRendering();
                googletag.enableServices();

                googletag.pubads().addEventListener('slotRenderEnded', function(event) {
                    if (event.slot === mpuSlot) {
                        if (!event.isEmpty) {
                            jQuery(".ros").show();
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
                var fotoindex = jQuery('.currentIndex').html();
                if (fotoindex % 4 == 0) {


                    DygDFP.allowAnimate = false;
                    clearTimeout(instertitialSetTimeout);
                    clearTimeout(ntvReloadSetTimeout);
                    //jQuery("#instertitial_dfp").remove();
                    //jQuery(".ros").hide();
                    jQuery('[id^=div-Tepe_728x90]').remove();

                    googletag.cmd.push(function () {
                        googletag.pubads().clearTargeting();
                        googletag.pubads().updateCorrelator();
                        //jQuery(".adPartContainer").remove();
                        //jQuery(".infinitePageSkin").remove();
                        //jQuery(".infiniteInsterstitial").remove();
                        //jQuery(".PageSkinImp").remove();
                        //jQuery(".InterstitialImp").remove();

                        //jQuery('#div-300x250_Ros-1').remove();
                        //jQuery('.mobilead_ros').remove();
                        jQuery('[id^=div-Tepe_728x90]').remove();
                        //jQuery(".ros").html('');


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

                        jQuery(".breadcrumb").after("<div id='" + ldbID + "' class='infiniteLDB' style='text-align:center;margin-top:3px'></div>")
                        googletag.cmd.push(function () {
                            googletag.display(ldbID);
                        });


                        /*
                         jQuery("body").append("<div id='" + pageskinDivID + "' class='infinitePageSkin'></div>")
                         googletag.cmd.push(function () {
                         googletag.display(pageskinDivID);
                         });

                         jQuery("body").append("<div id='" + insterstitialID + "' class='infiniteInsterstitial'></div>")
                         googletag.cmd.push(function () {
                         googletag.display(insterstitialID);
                         });
                         */

                        /*
                         jQuery('article').last().append("<div id='" + mpuID + "' class='infiniteMPU' style='text-align:center;z-index:9;margin-bottom: 10px;'></div>")
                         googletag.cmd.push(function () {
                         googletag.display(mpuID);
                         });


                         jQuery(".ros").append("<div id='" + mpuID + "' class='infiniteMPU'></div>")
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
                                    jQuery('[id^=div-300x250_Ros]').show();
                                    DygDFP.plugin.callEvent();
                                }
                            }
                            else if (event.slot === ldbSlot) {
                                if (!event.isEmpty) {
                                    jQuery('[id^=div-Tepe_728x90]').show();
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
                //jQuery("#instertitial_dfp").remove();
                //jQuery(".ros").hide();
                jQuery('[id^=div-300x250_Ros]').remove();

                googletag.cmd.push(function () {
                    googletag.pubads().clearTargeting();
                    googletag.pubads().updateCorrelator();
                    //jQuery(".adPartContainer").remove();
                    //jQuery(".infinitePageSkin").remove();
                    //jQuery(".infiniteInsterstitial").remove();
                    //jQuery(".PageSkinImp").remove();
                    //jQuery(".InterstitialImp").remove();

                    //jQuery('#div-300x250_Ros-1').remove();
                    //jQuery('.mobilead_ros').remove();
                    jQuery('[id^=div-300x250_Ros]').remove();
                    //jQuery(".ros").html('');

                    //if (DygDFP.section == 'fotogaleri') {
                    //  jQuery("#rklm_728x90").html('');
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
                     jQuery("#rklm_728x90").append("<div id='" + ldbID + "' class='infiniteLDB' style='text-align:center'></div>")
                     googletag.cmd.push(function () {
                     googletag.display(ldbID);
                     });
                     }
                     */

                    /*
                     jQuery("body").append("<div id='" + pageskinDivID + "' class='infinitePageSkin'></div>")
                     googletag.cmd.push(function () {
                     googletag.display(pageskinDivID);
                     });

                     jQuery("body").append("<div id='" + insterstitialID + "' class='infiniteInsterstitial'></div>")
                     googletag.cmd.push(function () {
                     googletag.display(insterstitialID);
                     });
                     */


                    jQuery('article').last().append("<div id='" + mpuID + "' class='infiniteMPU' style='text-align:center;z-index:9;margin-bottom: 10px;'></div>")
                    googletag.cmd.push(function () {
                        googletag.display(mpuID);
                    });

                    /*
                     jQuery(".ros").append("<div id='" + mpuID + "' class='infiniteMPU'></div>")
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
                                jQuery('[id^=div-300x250_Ros]').show();
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
            if (jQuery("#div-Tepe_728x90").is(":visible") && (DygDFP.section == 'fotogaleri' || DygDFP.section == 'videogaleri')) {
                //jQuery(".swiper-slide.current").css("margin-bottom",50);
            }
        }
        else if (DygDFP.siteName == 'Vogue') {
            clearTimeout(instertitialSetTimeout);
            jQuery("#instertitial_dfp").remove();
            jQuery('ul#slideshow').find("#div-300x250_Ros-1").remove();
            jQuery('ul#slideshow').find('li:visible').find('.fotogaleri-detay-300x250').append("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px'></div>");
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
            jQuery("body").append("<div id='extendVidPanel' class=''><div id='extendVid'></div></div>");
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
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" class="PageSkinImp" />');
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

            var partImageWidth = ((jQuery(window).width() - DygDFP.PageSkin.containerWidth) / 2);
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
                jQuery("body").append(pattern);
            } else {
                jQuery(DygDFP.PageSkin.appendSelector).append(pattern);
            }

            //jQuery("#div-PageSkin").hide();

            jQuery("#LeftSkin").css("background", "url(" + leftSkinImage + ") no-repeat 100% 0 ");
            jQuery("#LeftSkin").css("width", partImageWidth);
            jQuery("#LeftSkin").css("top", DygDFP.PageSkin.marginTop);
            jQuery("#RightSkin").css("background", "url(" + rightSkinImage + ") no-repeat 0 0 ");
            jQuery("#RightSkin").css("width", partImageWidth);
            jQuery("#RightSkin").css("top", DygDFP.PageSkin.marginTop);

            if (jQuery("#sticky-wrapper").hasClass("is-sticky")) {
                jQuery("#LeftSkin").css("z-index", "");
                jQuery("#RightSkin").css("z-index", "");

                if (jQuery("#sticky-wrapper").hasClass("is-sticky")) {
                    jQuery("#LeftSkin").css("position", "fixed");
                    jQuery("#RightSkin").css("position", "fixed");
                    jQuery("#RightSkin").css("top", 86);
                    jQuery("#LeftSkin").css("top", 86);
                }
            }

            if (topSkinImage != '') {
                setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".preparePageSkin(true)", 400);
                jQuery("#TopSkin").css("background", "url(" + topSkinImage + ") no-repeat 0 0 ");
                jQuery("#TopSkin").css("top", DygDFP.PageSkin.marginTop);
                jQuery("#TopSkin").css("left", partImageWidth);
            } else {
                setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".preparePageSkin(false)", 400);
            }
        },
        show: function(hasAnimation) {
            if (hasAnimation) {
                jQuery(".adPartContainer").fadeIn(300);
            } else {
                jQuery(".adPartContainer").show();
            }
            DygDFP.plugin.callEvent();
        },
        resize: function() {
            var partImageWidth = ((jQuery(window).width() - DygDFP.PageSkin.containerWidth) / 2);

            jQuery("#LeftSkin").css({
                width: partImageWidth,
            });

            jQuery("#RightSkin").css({
                width: partImageWidth,
            });

            jQuery("#TopSkin").css({
                left: partImageWidth,
            });
        },
        changeMarginTop: function() {

            jQuery("#LeftSkin").css("top", DygDFP.PageSkin.marginTop);
            jQuery("#RightSkin").css("top", DygDFP.PageSkin.marginTop);
            jQuery("#TopSkin").css("top", DygDFP.PageSkin.marginTop);
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
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }

            if (backgroundColor == undefined || backgroundColor == '') {
                backgroundColor = DygDFP.LeaderBoard.backgroundColor;
            } else if (backgroundColor == "Grey") {
                backgroundColor = "#f9f9f9";
            }

            if (width == 300) {
                jQuery("#div-MPU_Fix").find("iframe").parent().hide();
                jQuery("#div-MPU_Fix").css("margin-bottom", "10px");
                jQuery("#div-MPU_Fix").show();
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

                    jQuery("#div-MPU_Fix").append("<div id='MPU_SWF'></div>")
                    if (DygDFP.flashDetect() == undefined) {
                        jQuery("#MPU_SWF").append('<a href="' + backupImageClickURL + '" target="_blank"><img src="' + backupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
                    }
                    setTimeout(function() {
                        swfobject.embedSWF(swfFile, "MPU_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
                    }, 500);
                } else if (imageFile != '') {
                    jQuery("#div-MPU_Fix").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
                } else if (iFrameUrl != '') {
                    jQuery("#div-MPU_Fix").append("<iframe src='" + iFrameUrl + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
                }
            } else {
                var appendDiv = jQuery("div[id='" + selector + "__container__']").parent();

                if (DygDFP.allowAnimate) {
                    jQuery(appendDiv).animate({
                        height: '+=' + height + 'px'
                    }, 800);
                } else {
                    if (jQuery(appendDiv).height() < 80) {
                        jQuery(appendDiv).css("height", "80px");
                    }
                }

                if (scriptCode != '') {
                    jQuery("iframe[id='" + selector + "']").css("height", height);
                    jQuery("iframe[id='" + selector + "']").css("width", width);
                    setTimeout(function() {
                        jQuery("iframe[id='" + selector + "']").parent().show();
                    }, 1000);
                } else {
                    if (DygDFP.siteName == 'NTVSpor' || DygDFP.siteName == 'GQ') {
                        jQuery("iframe[id='" + selector + "']").parent().hide();
                    }
                }

                jQuery(appendDiv).css("text-align", "center");
                jQuery(appendDiv).css("width", "100%");
                jQuery(appendDiv).css("background-color", backgroundColor);


                if (DygDFP.siteName == 'Vogue' && scriptCode.length == 0) {
                    jQuery(appendDiv).find("iframe").hide();
                } else if (DygDFP.siteName == 'Vogue') {
                    jQuery(appendDiv).parent().css("background-color", backgroundColor);
                } else if (DygDFP.siteName == 'NTVCOM_TR' && scriptCode.length == 0) {
                    jQuery(appendDiv).find("iframe").hide();
                } else if (DygDFP.siteName == 'CNBC-e_Finans' && scriptCode.length == 0) {
                    jQuery(appendDiv).find("iframe").hide();
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

                    jQuery(appendDiv).append("<div id='LDB_SWF'></div>")
                    if (DygDFP.flashDetect() == undefined) {
                        jQuery("#LDB_SWF").append('<a href="' + backupImageClickURL + '" target="_blank"><img src="' + backupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
                    }
                    setTimeout(function() {
                        swfobject.embedSWF(swfFile, "LDB_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
                    }, 500);
                } else if (imageFile != '') {
                    jQuery(appendDiv).append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
                } else if (iFrameUrl != '') {
                    jQuery(appendDiv).append("<iframe src='" + iFrameUrl + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
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
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }

            jQuery("#div-Tepe_728x90").css("height", "0");
            setTimeout(function() {
                jQuery("#div-Tepe_728x90").show();
            }, 200);
            jQuery("#div-Tepe_728x90").animate({
                height: '+=' + height + 'px'
            }, 800);

            jQuery("#div-Tepe_728x90").css("text-align", "center");
            jQuery("#div-Tepe_728x90").css("width", "100%");
            jQuery("#div-Tepe_728x90").css("background-color", DygDFP.LeaderBoard.backgroundColor);
            jQuery("#div-Tepe_728x90").find("iframe").parent().hide();
            if (imageFile != '') {
                jQuery("#div-Tepe_728x90").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
            } else if (iframeURL != '') {
                jQuery("#div-Tepe_728x90").append("<iframe src='" + iframeURL + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
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
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }

            jQuery("#div-Masthead").css("height", "0");
            setTimeout(function() {
                jQuery("#div-Masthead").show();
            }, 200);
            jQuery("#div-Masthead").animate({
                height: '+=' + height + 'px'
            }, 800);

            jQuery("#div-Masthead").css("text-align", "center");
            jQuery("#div-Masthead").css("width", "100%");
            jQuery("#div-Masthead").css("background-color", DygDFP.LeaderBoard.backgroundColor);
            jQuery("#div-Masthead").find("iframe").parent().hide();
            if (imageFile != '') {
                jQuery("#div-Masthead").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
            } else if (iframeURL != '') {
                jQuery("#div-Masthead").append("<iframe src='" + iframeURL + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
            } else if (scriptURL != '') {
                var script = document.createElement('script');
                script.src = scriptURL;
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }
    },
    Interstitial: {
        init: function(imageFile, clickURL, duration, backgroundColor, swfFile, swfBackupImageFile, swfBackupImageClickURL, impressionURL, width, height, clickTagParam, showHeaderBar, marginTop, impressionURL2,iframeURL) {
            if (jQuery("#instertitial_dfp").length > 0) {
                return false;
            }

            if (impressionURL != '') {
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" class="InterstitialImp" />');
            }

            if (impressionURL2 != '') {
                jQuery("body").prepend('<img src="' + impressionURL2 + '" alt="" style="display:none" class="InterstitialImp" />');
            }

            var sourceCode = '<div id="instertitial_dfp" style="background-color:' + backgroundColor + ';top:0px;z-index:99999;width:100%;position:fixed;height:' + jQuery(document).height() + 'px;font-size:16px">';
            if (showHeaderBar == 'Show') {
                sourceCode += '<div style="background:linear-gradient(to bottom,rgba(255,255,255,1) 0%,rgba(246,246,246,1) 47%,rgba(237,237,237,1) 100%);border:1px solid #ddd;width: 100%;height: 30px;position:absolute;top:0px;left:0px;margin: 0px;padding: 0px">';
                sourceCode += '<span id="instertitial_dfp_duration" style="position:absolute;right:270px;top:6px;color:#9C9C9C;font-size:13px;font-family:Verdana">' + duration + '</span><span  style="position:absolute;right:110px;top:6px;color:#9C9C9C;font-size:12px;font-family:Verdana">saniye sonra kapanacakt\u0131r</span>';
                sourceCode += '<a href="javascript:void(0)" id="instertitial_dfp_close" onclick="DygDFP.Interstitial.close();" style="font-family:Verdana;position:absolute;right:10px;top:0px;font-size:11px;padding:5px 8px;color:black;border:1px solid #DDD;text-decoration:none;border-radius:4px;background: rgb(255,255,255); /* Old browsers */background: -moz-linear-gradient(top,  rgba(255,255,255,1) 0%, rgba(229,229,229,1) 100%); /* FF3.6+ */background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(100%,rgba(229,229,229,1))); /* Chrome,Safari4+ */background: -webkit-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%); /* Opera 11.10+ */background: -ms-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%); /* IE10+ */background: linear-gradient(to bottom,  rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%); /* W3C */filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#ffffff", endColorstr="#e5e5e5",GradientType=0 ); /* IE6-9 */">Reklamý Geç</a>';
                sourceCode += '</div>';
            } else {
                sourceCode += '<span id="instertitial_dfp_duration" style="position:absolute;right:215px;top:1px;color:#fff;font-size:13px;font-weight:bold;font-family:Verdana;display:none">' + duration + '</span>';
            }

            marginTop = ((jQuery(window).height()) - (height)) / 2;

            if(marginTop < 0){
                marginTop = 35;
            }

            sourceCode += '<div id="instertitial_dfp_ad" style="width:100%;margin-top:' + (marginTop) + 'px;text-align:center">';
            sourceCode += '</div>';
            sourceCode += '</div>';

            jQuery("body").append(sourceCode);
            jQuery("#div-interstitial").hide();
            if (imageFile != '') {
                jQuery("#instertitial_dfp_ad").append('<a href="' + clickURL + '" target="_blank"><img style="border:8px solid white;" src="' + imageFile + '" alt="" /></a>');
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
                jQuery("#instertitial_dfp_ad").append("<div style='width:800px;border:8px solid white;left:0;right:0;margin:auto;'><div id='INS_SWF'></div></div>")
                if (DygDFP.flashDetect() == undefined) {
                    jQuery("#INS_SWF").append('<a href="' + swfBackupImageClickURL + '" target="_blank"><img src="' + swfBackupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
                } else {
                    setTimeout(function() {
                        swfobject.embedSWF(swfFile, "INS_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params, DygDFP.Interstitial.changeDuration());
                    }, 1000);
                }
            }
            else if(iframeURL!= ''){
                jQuery("#instertitial_dfp_ad").append('<iframe style="border:8px solid white;"  id="instertitial_iframe" src="' + iframeURL + '?clickTAG=' + clickURL+'"></iframe>');
                jQuery("#instertitial_iframe").css("width",width);
                jQuery("#instertitial_iframe").css("height",height);
                DygDFP.Interstitial.changeDuration();
            }

            jQuery("body").css("overflow", "hidden");
            var script = top.document.createElement("script");
            script.text = "function closeTakeOver(){ DygDFP.Interstitial.close();}";
            script.setAttribute("type", "text/javascript");
            top.document.getElementsByTagName("head")[0].appendChild(script);



        },
        changeDuration: function() {
            var currentSecond = parseInt(jQuery("body").find("#instertitial_dfp_duration").html());
            jQuery("body").find("#instertitial_dfp_duration").html(currentSecond - 1);
            if (currentSecond == 1) {
                DygDFP.Interstitial.close();
            } else {
                instertitialSetTimeout = setTimeout('DygDFP.Interstitial.changeDuration();', 1000);
            }
        },
        close: function() {
            jQuery("#instertitial_dfp").fadeOut();
            jQuery("body").css("overflow", "");
            DygDFP.PageSkin.resize();
        }
    },
    Interstitial2: {
        init: function(imageFile) {
            if (jQuery("#instertitial_dfp").length > 0) {
                return false;
            }
            var sourceCode = '<div id="instertitial_dfp" style="top:0px;z-index:4000;width:100%;position:fixed;height:' + jQuery(document).height() + 'px;font-size:16px">';

            marginTop = 150;

            sourceCode += '<div id="instertitial_dfp_ad" style="width:100%;margin-top:' + (marginTop) + 'px;text-align:center;z-index:3000">';
            sourceCode += '</div>';
            sourceCode += '<div id="instertitial_content" style="position: absolute;top: 0px; left: 0px;width: 100%;height: 100%;background-color: Black;z-index:-1;opacity: 0.6"></div>';
            sourceCode += '</div>';

            jQuery("body").append(sourceCode);
            jQuery("#div-interstitial").hide();
            if (imageFile != '') {
                jQuery("#instertitial_dfp_ad").append('<img style="border:8px solid white;" src="' + imageFile + '" alt="" />');
            }

            jQuery("body").css("overflow", "hidden");
            var script = top.document.createElement("script");
            script.text = "function closeTakeOver(){ DygDFP.Interstitial.close();}";
            script.setAttribute("type", "text/javascript");
            top.document.getElementsByTagName("head")[0].appendChild(script);


            jQuery('#instertitial_dfp_ad').click(function(){
                DygDFP.Interstitial2.close();
            });
        },
        close: function() {
            jQuery("#instertitial_dfp").fadeOut();
            jQuery("body").css("overflow", "");
            DygDFP.PageSkin.resize();
        }
    },
    Floating: {
        init: function(imageFile, clickURL, duration, swfFile, swfBackupImageFile, swfBackupImageClickURL, impressionURL, width, height, clickTagParam) {
            if (impressionURL != '') {
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }

            var marginTop = 0;

            if (jQuery(window).height() > height) {
                marginTop = (jQuery(window).height() - height) / 2;
            }

            var sourceCode = '<div id="floating_dfp" style="display:block;top:0px;z-index:99999;width:100%;position:fixed;height:' + jQuery(document).height() + 'px;font-size:16px">';
            sourceCode += '<span id="floating_dfp_duration" style="position:absolute;right:215px;top:1px;color:#fff;font-size:13px;font-weight:bold;font-family:Arial;display:none">' + duration + '</span>';
            sourceCode += '<div id="floating_dfp_ad" style="width:100%;margin-top:' + marginTop + 'px;position:absolute;text-align:center">';
            sourceCode += '<a href="javascript:void(0)" id="floating_dfp_close" onclick="DygDFP.Floating.close();" style="position:absolute;margin-top:-15px;left:50%;margin-left:' + ((width / 2) - 15) + 'px"><img src="http://img-dygassets.mncdn.com/Images/closeFloatingBTN.png" /></a>';
            sourceCode += '</div>';
            sourceCode += '</div>';

            jQuery("body").append(sourceCode);
            jQuery("#div-interstitial").hide();

            if (imageFile != '') {
                jQuery("#floating_dfp_ad").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" /></a>');
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

                jQuery("#floating_dfp_ad").append("<div id='FLOATING_SWF'></div>")
                if (DygDFP.flashDetect() == undefined) {
                    jQuery("#FLOATING_SWF").append('<a href="' + swfBackupImageClickURL + '" target="_blank"><img src="' + swfBackupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
                } else {
                    setTimeout(function() {
                        swfobject.embedSWF(swfFile, "FLOATING_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
                    }, 1000);
                }
            }

            DygDFP.Floating.changeDuration();
        },
        changeDuration: function() {
            var currentSecond = parseInt(jQuery("body").find("#floating_dfp_duration").html());
            //console.log(currentSecond);
            jQuery("body").find("#floating_dfp_duration").html(currentSecond - 1);
            if (currentSecond == 1) {
                DygDFP.Floating.close();
            } else {
                setTimeout('DygDFP.Floating.changeDuration();', 1000);
            }
        },
        close: function() {
            jQuery("#floating_dfp").fadeOut();
            DygDFP.PageSkin.resize();
        }
    },
    MobileInterstitial: {
        init: function(imageFile, iframeURL, clickURL, impressionURL, duration, width, height, backgroundColor, scriptURL) {
            if (impressionURL != '') {
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }

            jQuery("#div-interstitial").hide();

            var sourceCode = '<div id="instertitial_dfp" style="background-color:' + backgroundColor + ';top:0px;z-index:9999999;width:100%;position:fixed;height:' + jQuery(document).height() + 'px;font-size:16px">';
            sourceCode += '<div style="z-index:1;background-color:black;opacity:0.5;width: 100%;height: 20px;position:absolute;top:0px;left:0px;margin: 0px;padding: 0px"></div>';

            sourceCode += '<div style="z-index: 999;position: absolute;width: 310px;right: 0;"><span id="instertitial_dfp_duration" style="position:absolute;right:160px;top:5px;color:#fff;font-size:11px;font-weight:bold;font-family:Arial">' + duration + '</span><span  style="position:absolute;right:35px;top:5px;color:#fff;font-size:10px;font-family:Arial">saniye sonra kapanacakt\u0131r</span>';
            sourceCode += '<a href="javascript:void(0)" id="instertitial_dfp_close" onclick="DygDFP.Interstitial.close();" style="text-align:center;font-size:13px;height:19px;position:absolute;right:0px;top:0px;width:30px;color:#fff;text-decoration:none;font-family:Arial"><img style="width:40px;top: -5px;position: absolute;right: -2px;" src="http://img-dygassets.mncdn.com/Images/close_button.png"/></a></div>';

            var marginTop = (jQuery(window).height() - height) / 2;

            sourceCode += '<div id="instertitial_dfp_ad" style="width:100%;position:absolute;text-align:center;margin-top:'+marginTop+'px">';
            sourceCode += '</div>';
            sourceCode += '</div>';

            jQuery("body").append(sourceCode);
            jQuery("body").css("overflow", "hidden");

            if (imageFile != '') {
                jQuery("#instertitial_dfp_ad").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" /></a>');
            }
            else if (iframeURL != '') {
                jQuery("#instertitial_dfp_ad").append("<a style='width:100%;height:100%;z-index:99999;position:absolute;margin-top:29px' href='" + clickURL + "' target='_blank'></a><iframe src='" + iframeURL + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
            }
            else if (scriptURL != '') {
                jQuery("#instertitial_dfp_ad").append("<iframe src='" + scriptURL + "' style='border:0;width:" + width + "px;height:" + height + "px' border='0' scrolling='no'></iframe>");
            }

            jQuery("body").css("overflow", "hidden");

            DygDFP.MobileInterstitial.changeDuration();

        },
        changeDuration: function() {
            var currentSecond = parseInt(jQuery("body").find("#instertitial_dfp_duration").html());
            jQuery("body").find("#instertitial_dfp_duration").html(currentSecond - 1);
            if (currentSecond == 1) {
                DygDFP.Interstitial.close();
            } else {
                setTimeout('DygDFP.MobileInterstitial.changeDuration();', 1000);
            }
        },
        close: function() {
            jQuery("#instertitial_dfp").remove();
            jQuery("body").css("overflow", "");
        }
    },
    Masthead: {
        appendSelector: jQuery("body"),
        init: function(panel1SwfFile, panel1BackupImageFile, panel2SwfFile, panel2BackupImageFile, clickURL, flvURL, brandURL, impressionURL, panel1Width, panel1Height, panel2Width, panel2Height, playerWidth, playerHeight, playerLeft, playerTop, hasScriptCode, backgroundColor, selector) {

            if (hasScriptCode) {
                panel1Height = 0;
                if (panel1Height == 0) {
                    jQuery("#div-Masthead iframe").css("height", panel2Height);
                    jQuery("#div-Masthead iframe").css("width", panel2Width);
                }

                return false;
            }

            if (impressionURL != '') {
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }

            var panel1MarginTop = 0;
            var panel2MarginTop = 0;
            var showBtnMarginTop = 0;
            var showBtnMarginLeft = 850;

            jQuery("#div-Masthead").hide();

            if (DygDFP.siteName == 'Vogue') {
                jQuery(jQuery("div[id='" + selector + "__container__']").parent()).before("<div id='mastheadDiv'></div>");
                jQuery(jQuery("div[id='" + selector + "__container__']").parent()).css("margin-top", 0);
                jQuery(jQuery("div[id='" + selector + "__container__']").parent()).css("margin-bottom", 0);
                if (backgroundColor != '' && backgroundColor != undefined) {
                    if (backgroundColor == "Grey") {
                        backgroundColor = "#f9f9f9";
                    }
                    jQuery("#mastheadDiv").css("background-color", backgroundColor);
                }
            }

            jQuery(DygDFP.Masthead.appendSelector).prepend('<div id="mastheadPanel" style="margin-top:5px"></div>');
            jQuery("#mastheadPanel").css("width", panel1Width);
            jQuery("#mastheadPanel").css("height", panel1Height);
            jQuery("#mastheadPanel").css("margin", "auto");
            jQuery("#mastheadPanel").css("left", 0);
            jQuery("#mastheadPanel").css("right", 0);
            //jQuery("#mastheadPanel").css("margin-bottom","5px");

            if (DygDFP.siteName == 'Vogue') {
                jQuery("#mastheadPanel").css("padding-top", "10px");
                jQuery("#mastheadPanel").css("padding-bottom", "10px");
                jQuery("#mastheadPanel").css("display", "table");
            }


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
            jQuery("#mastheadSubPanel1Show").css("left", 0);
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
            jQuery("#mastheadSubPanel2Close").css("left", 0);
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
                } else {
                    setTimeout(function() {
                        swfobject.embedSWF(panel1SwfFile, "mastheadSubPanel1SWF", panel1Width, panel1Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
                    }, 500);
                }

                if (DygDFP.flashDetect() == undefined) {
                    jQuery("#mastheadSubPanel2SWF").append('<a href="' + clickURL + '" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
                } else {
                    setTimeout(function() {
                        swfobject.embedSWF(panel2SwfFile, "mastheadSubPanel2SWF", panel2Width, panel2Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
                    }, 500);

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

                        setTimeout(function() {
                            swfobject.embedSWF("http://img-dygassets.mncdn.com/Files/Swf/player.swf", "mastheadVideo", playerWidth, playerHeight, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
                        }, 500);
                    }
                }


            } else if (panel1ImageFile != '' && panel2ImageFile != '') {
                jQuery("#mastheadSubPanel1SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
                jQuery("#mastheadSubPanel2SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
            }


            if (window.sessionStorage.getItem('isShowMasthead') == null || window.sessionStorage.getItem('isShowMasthead') == "true") {
                DygDFP.Masthead.open(panel2Height);
            }
        },
        open: function(height) {
            jQuery('#mastheadPanel').animate({
                height: height
            }, 'slow');
            window.sessionStorage.setItem('isShowMasthead', 'true');
            jQuery('#mastheadSubPanel1').hide();
            jQuery('#mastheadSubPanel2').slideToggle('slow', function() {
                jQuery('#mastheadSubPanel2Close').show();
            });
            jQuery('#mastheadSubPanel1Show').hide();
            jQuery('#mastheadVideoPanel').show();

            setTimeout("if(DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".preparePageSkinPosition != undefined){DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".preparePageSkinPosition()}", 400);
        },
        close: function(height) {
            jQuery('#mastheadVideoPanel').hide()
            jQuery('#mastheadPanel').animate({
                height: height
            }, 400);
            window.sessionStorage.setItem('isShowMasthead', 'false');
            jQuery("#mastheadSubPanel2Close").hide();
            jQuery('#mastheadSubPanel2').slideToggle('slow', function() {
                jQuery('#mastheadSubPanel1').show();
                jQuery('#mastheadSubPanel1Show').show();
            });
            setTimeout("if(DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".preparePageSkinPosition != undefined){DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".preparePageSkinPosition()}", 400);
        }
    },
    Takeover: {
        appendSelector: jQuery("body"),
        init: function(panel1SwfFile, panel1BackupImageFile, panel1Width, panel1Height, panel2SWFFile, panel2BackupImageFile, panel2Width, panel2Height, clickTagParam, clickURL, impressionURL, position, isScroll) {
            if (impressionURL != '') {
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
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
                if (jQuery("#div-Tepe_728x90").height() != panel1Height) {
                    jQuery("#div-Tepe_728x90").animate({
                        height: '+=' + panel1Height + 'px'
                    }, 800);
                }

                if (DygDFP.siteName == 'StarTV') {
                    jQuery("body").css("background", "white");
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
            } else {
                setTimeout(function() {
                    swfobject.embedSWF(panel1SwfFile, "takeOverSWF", panel1Width, panel1Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
                }, 500);
            }

            jQuery("#takeOverPanel").append('<div id="takeOverShow"></div>');
            jQuery("#takeOverShow").css("position", (isScroll == "yes") ? "absolute" : "fixed");
            jQuery("#takeOverShow").css("z-index", "999999");
            jQuery("#takeOverShow").css("top", 0);
            jQuery("#takeOverShow").css("left", "0");
            jQuery("#takeOverShow").css("right", "0");
            jQuery("#takeOverShow").css("margin", "auto");
            jQuery("#takeOverShow").css("width", panel2Width);
            jQuery("#takeOverShow").attr("data-width", panel2Width);
            jQuery("#takeOverShow").css("display", "none");

            if (jQuery(window).width() < panel2Width) {
                jQuery("#takeOverShow").css("margin-left", ((panel2Width - jQuery(window).width()) / 2) * -1);
            }

            jQuery("#takeOverShow").append('<div id="takeOverShowSWF"></div>');

            if (DygDFP.flashDetect() == undefined) {
                jQuery("#takeOverShowSWF").append('<a href="javascript:;" onclick="closeTakeOver();" style="right:0;position:absolute;"><img src="http://img-dygassets.mncdn.com/Images/closebtn.png"/></a>');
                jQuery("#takeOverShowSWF").append('<a href="' + clickURL + '" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
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
            jQuery("#takeOverShow").show();
        },
        close: function() {
            jQuery("#takeOverShow").fadeOut();
        },
        resize: function() {

            var panel2Width = jQuery("#takeOverShow").attr("data-width");
            console.log(panel2Width);
            if (jQuery(window).width() < panel2Width) {
                jQuery("#takeOverShow").css("margin-left", ((panel2Width - jQuery(window).width()) / 2) * -1);
            } else {
                jQuery("#takeOverShow").css("margin-left", "auto");
            }
        }
    },
    TextLink: {
        appendSelector: jQuery("body"),
        init: function(swfFile, backupImageFile, clickTagParam, imageFile, clickURL, impressionURL, width, height) {
            if (impressionURL != '') {
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }
            jQuery("#div-tlb").css("height", height);
            if (swfFile != '') {
                var swfObject = document.createElement('script');
                swfObject.src = 'http://img-dygassets.mncdn.com/Scripts/swfobject.js';
                document.getElementsByTagName('head')[0].appendChild(swfObject);

                var flashvars = false;
                var params = {
                    flashvars: clickTagParam + "=" + encodeURIComponent(clickURL),
                    allowscriptaccess: 'always'
                };

                jQuery("#div-tlb").append("<div id='TLB_SWF'></div>")
                if (DygDFP.flashDetect() == undefined) {
                    jQuery("#TLB_SWF").append('<a href="' + clickURL + '" target="_blank"><img src="' + backupImageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
                }
                setTimeout(function() {
                    swfobject.embedSWF(swfFile, "TLB_SWF", width, height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
                }, 500);
            } else if (imageFile != '') {
                jQuery("#div-tlb").append('<a href="' + clickURL + '" target="_blank"><img src="' + imageFile + '" alt="" style="height:' + height + 'px;width:' + width + 'px" /></a>');
            } else {
                jQuery("#div-tlb").find("iframe").css("height", height);
                jQuery("#div-tlb").find("iframe").css("width", width);
            }
        }
    },
    Paralax: {
        marginTop: 0,
        containerWidth: 980,
        init: function(leftSWFURL, rightSWFURL, leftSSWFClickURL, rightSWFClickURL, impressionURL) {
            if (impressionURL != '') {
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }
            var partImageWidth = ((jQuery(document).width() - DygDFP.PageSkin.containerWidth) / 2);
            var top = 0;
            var pattern = '<div class="adPartContainer" style="display:none">';
            pattern += '<div id="LeftSkin" style="position:absolute;left:0;z-index:5;height:1500px"><div id="LeftSWF"></div></div>';
            pattern += '<div id="RightSkin" style="position:absolute;right:0;z-index:5;height:1500px"><div id="RightSWF"></div></div>';
            pattern += '</div>';

            jQuery("body").prepend(pattern);

            jQuery("#div-PageSkin").hide();

            jQuery("#LeftSkin").css("position", "absolute");
            jQuery("#LeftSkin").css("left", (partImageWidth - 900));

            jQuery("#RightSkin").css("width", partImageWidth);
            jQuery("#RightSkin").css("overflow", "hidden");
            jQuery("#flashRightPanel").css("left", 10);

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
                jQuery(".adPartContainer").fadeIn(300);
            } else {
                jQuery(".adPartContainer").show();
            }

            DygDFP.Paralax.resize();
        },
        resize: function() {
            var partImageWidth = ((jQuery(document).width() - DygDFP.PageSkin.containerWidth) / 2);

            jQuery("#LeftSkin").css({
                left: partImageWidth - 900,
            });

            jQuery("#RightSkin").css({
                width: partImageWidth,
            });
        },
        changeMarginTop: function() {
            jQuery("#LeftSkin").css("top", DygDFP.PageSkin.marginTop);
            jQuery("#RightSkin").css("top", DygDFP.PageSkin.marginTop);
        },
    },
    PushDown: {
        appendSelector: jQuery("body"),
        init: function(panel1SwfFile, panel1BackupImageFile, panel2SwfFile, panel2BackupImageFile, clickURL, impressionURL, panel1Width, panel1Height, panel2Width, panel2Height) {
            if (impressionURL != '') {
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }

            var panel1MarginTop = 0;
            var panel2MarginTop = 0;
            var showBtnMarginTop = 0;
            var showBtnMarginLeft = 850;

            jQuery("#div-Tepe_728x90").hide();

            //jQuery(DygDFP.PushDown.appendSelector).show();
            jQuery(DygDFP.PushDown.appendSelector).prepend('<div id="pushDownPanel" style="margin-top:5px"></div>');
            jQuery("#pushDownPanel").css("width", DygDFP.PageSkin.containerWidth);
            jQuery("#pushDownPanel").css("margin", "auto");
            jQuery("#pushDownPanel").css("left", 0);
            jQuery("#pushDownPanel").css("right", 0);
            jQuery("#pushDownPanel").append('<div id="pushDownSubPanel1"></div>');
            jQuery("#pushDownSubPanel1").append('<div id="pushDownSubPanel1Click"></div>');
            jQuery("#pushDownSubPanel1").css("position", "relative");
            jQuery("#pushDownSubPanel1").css("margin-top", panel1MarginTop);

            jQuery("#pushDownSubPanel1Click").attr("onclick", "DygDFP.PushDown.open();");

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
                } else {
                    setTimeout(function() {
                        swfobject.embedSWF(panel1SwfFile, "pushDownSubPanel1SWF", panel1Width, panel1Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
                    }, 500);
                }

                if (DygDFP.flashDetect() == undefined) {
                    jQuery("#pushDownSubPanel2SWF").append('<a href="' + clickURL + '" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
                } else {
                    setTimeout(function() {
                        swfobject.embedSWF(panel2SwfFile, "pushDownSubPanel2SWF", panel2Width, panel2Height, "9.0.0", "http://img-dygassets.mncdn.com/Files/Swf/expressInstall.swf", flashvars, params);
                    }, 500);
                }


                jQuery("#pushDownSubPanel2").append('<a href="javsascript:;" onclick="DygDFP.PushDown.close();"><img style="position:absolute;display:inline;right:0;top:0" src="http://img-dygassets.mncdn.com/Images/closebtn.png"/></a>');
                jQuery("#pushDownSubPanel1Click").append('&nbsp;<img style="position:absolute;display:inline;right:0;top:0" src="http://img-dygassets.mncdn.com/Images/openbtn.png"/>');

            } else if (panel1ImageFile != '' && panel2ImageFile != '') {
                jQuery("#pushDownSubPanel1SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
                jQuery("#pushDownSubPanel2SWF").append('<a href="javascript:;" target="_blank"><img src="' + panel2BackupImageFile + '" alt="" style="height:' + panel2Height + 'px;width:' + panel2Width + 'px" /></a>');
            }

            if (getCookie('isPushDown') == null || getCookie('isPushDown') == "") {
                DygDFP.PushDown.open();
                createCookie('isPushDown', 'isPushDown', 60);
            }
        },
        open: function() {
            height = 420;
            jQuery('#pushDownPanel').animate({
                height: height
            }, 'slow');
            jQuery('#pushDownPanel').animate({
                height: height
            }, 'slow');
            window.sessionStorage.setItem('isPushDown', 'true');
            jQuery('#pushDownSubPanel1').hide();
            jQuery('#pushDownSubPanel2').slideToggle('slow');
        },
        close: function() {
            height = 70;
            jQuery('#pushDownPanel').animate({
                height: height
            }, 'slow');
            jQuery('#pushDownPanel').animate({
                height: height
            }, 400);
            window.sessionStorage.setItem('isPushDown', 'false');
            jQuery('#pushDownSubPanel2').slideToggle('slow', function() {
                jQuery('#pushDownSubPanel1').show();
            });
        }
    },
    Survey: {
        appendSelector: jQuery("body"),
        init: function(iframeURL, width, height, surveyKey) {

            jQuery("body").append('<div id="surveyPanel"></div>');
            jQuery("#surveyPanel").css("position", "fixed");
            jQuery("#surveyPanel").css("bottom", "10px");
            jQuery("#surveyPanel").css("right", "-1000px");
            jQuery("#surveyPanel").css("width", width);
            jQuery("#surveyPanel").css("height", height);
            jQuery("#surveyPanel").css("z-index", 99999);

            if (iframeURL != '') {
                jQuery("#surveyPanel").append('<iframe id="surveyIframe"></iframe>');
                jQuery("#surveyIframe").css("width", width);
                jQuery("#surveyIframe").css("height", height);
                jQuery("#surveyIframe").css("border", "none");
                jQuery("#surveyIframe").attr("src", iframeURL + "?surveyKey=" + surveyKey + "&pDomain=" + document.location.protocol + '//' + document.location.host);
            }

            jQuery("#surveyPanel").append('<a id="surveyCloseA" href="javascript:;"><img src="http://img-dygassets.mncdn.com/Images/SurveyCloseBTN.png"></a>');
            jQuery("#surveyCloseA").click(function() {
                DygDFP.Survey.close(surveyKey);
            });

            jQuery("#surveyCloseA").css("position", "absolute");
            jQuery("#surveyCloseA").css("top", -8);
            jQuery("#surveyCloseA").css("right", -10);
        },
        open: function(surveyKey) {
            if (getCookie(surveyKey) == '' || getCookie(surveyKey) == null) {
                jQuery("#surveyPanel").animate({
                    "right": "10px"
                }, "slow");
                DygDFP.Survey.interval(surveyKey, 1);
            }
        },
        close: function(surveyKey) {
            createCookie(surveyKey, surveyKey, 60);
            jQuery("#surveyPanel").animate({
                "right": "-1000px"
            }, "slow");
        },
        interval: function(surveyKey, currentIndex) {
            if (currentIndex == 20) {
                jQuery("#surveyPanel").animate({
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
            jQuery("#surveyPanel").animate({
                "right": "-1000px"
            }, "slow");
        }
    },
    VideoWall: {
        appendSelector: jQuery("body"),
        isOpen: false,
        top: 100,
        init: function(flvURL, width, height, clickURL, backgroundImage, headerImage, brandUrl, campaignName, impressionURL) {

            if (impressionURL != '') {
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }

            jQuery(DygDFP.VideoWall.appendSelector).prepend("<div id='videoWall'></div>");
            jQuery("#videoWall").css("width", jQuery(window).width());
            jQuery("#videoWall").css("height", 1000);
            jQuery("#videoWall").css("position", "absolute");
            jQuery("#videoWall").append("<div id='videoWallSWF'></div>");
            jQuery("#videoWall").css("top", DygDFP.VideoWall.top);
            if (DygDFP.siteName == "NTVCOM_TR"){
                var leftMargin = jQuery(DygDFP.VideoWall.appendSelector).css("margin-left");
                jQuery("#videoWall").css("margin-left", "-" +leftMargin);
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
                //jQuery("#videoWall").append('<a href="javascript:;" target="_blank"><img src="' + panel1BackupImageFile + '" alt="" style="height:' + panel1Height + 'px;width:' + panel1Width + 'px" /></a>');
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
            jQuery("#videoWallSWF").css("width", jQuery(window).width());
        }
    },
    Html5Masthead: {
        VCRSessionTimeout: null,
        BrandURL: '',
        init: function(hasScriptCode, imagePath, width, height, clickURL, impressionURL, videoURL, playerWidth, playerHeight, playerLeft, playerTop, brandURL, iframeURL, selector, iframeScriptUrl) {
            if (impressionURL != '') {
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }

            this.BrandURL = brandURL;

            jQuery(DygDFP.Masthead.appendSelector).prepend('<div id="mastheadPanel"></div>');
            jQuery("#mastheadPanel").css("width", width);
            jQuery("#mastheadPanel").css("left", 0);
            jQuery("#mastheadPanel").css("right", 0);
            jQuery("#mastheadPanel").css("margin", "auto");
            jQuery("#mastheadPanel").append("<div id='mastheadController'></div>");
            jQuery("#mastheadController").css("margin-bottom", 5);
            jQuery("#mastheadController").css("text-align", "center");
            if  (DygDFP.siteName=="Startv"){
                jQuery("#mastheadController").css("width","100px");
            }


            jQuery("#mastheadPanel").append("<div id='mastheadContainer'></div>");
            jQuery("#mastheadController").append("<a href='javascript:;' id='mastheadOpenController'><img id='mastheadOpenImg' src='http://img-dygassets.mncdn.com/Images/Ad_Open.png' alt=''/></a>");
            jQuery("#mastheadController").append("<a href='javascript:;' id='mastheadCloseController'><img id='mastheadCloseImg' src='http://img-dygassets.mncdn.com/Images/Ad_Close.png' alt=''/></a>");
            jQuery("#mastheadContainer").css("display", "none");
            jQuery("#mastheadOpenController").click(function() {
                DygDFP.Html5Masthead.open(hasScriptCode, selector);
            });
            jQuery("#mastheadCloseController").click(function() {
                DygDFP.Html5Masthead.close(hasScriptCode, selector);
            });
            jQuery("#mastheadOpenController").hide();
            jQuery("#mastheadCloseController").hide();

            if (imagePath != '') {
                jQuery("#mastheadContainer").append("<a id='mastheadClickA' href='" + clickURL + "' target='_blank'></a>");
                jQuery("#mastheadClickA").css("display", "block");
                jQuery("#mastheadClickA").css("position", "absolute");
                jQuery("#mastheadClickA").css("width", width);
                jQuery("#mastheadClickA").css("height", height);
                jQuery("#mastheadContainer").append("<img id='mastheadImg' src='" + imagePath + "' alt='' />");
                jQuery("#mastheadImg").css("width", width);
                jQuery("#mastheadImg").css("height", height);
            } else if (iframeURL != '') {
                jQuery("#mastheadContainer").append("<a id='mastheadClickA' href='" + clickURL + "' target='_blank'></a>");
                jQuery("#mastheadClickA").css("display", "block");
                jQuery("#mastheadClickA").css("position", "absolute");
                jQuery("#mastheadClickA").css("width", width);
                jQuery("#mastheadClickA").css("height", height);
                jQuery("#mastheadContainer").append("<iframe id='mastheadIframe' src='" + iframeURL + "' data-src='" + iframeURL + "'></iframe>");
                jQuery("#mastheadIframe").css("width", width);
                jQuery("#mastheadIframe").css("height", height);
                jQuery("#mastheadIframe").css("border", "none");
            } else if (iframeScriptUrl != '') {
                jQuery("#mastheadContainer").append("<iframe id='mastheadIframe' src='" + iframeScriptUrl + "?clickTAG="+clickURL+"' data-src='" + iframeScriptUrl + "?clickTAG="+clickURL+"'></iframe>");
                jQuery("#mastheadIframe").css("width", width);
                jQuery("#mastheadIframe").css("height", height);
                jQuery("#mastheadIframe").css("border", "none");
            }

            if(DygDFP.siteName != 'StarTV' && DygDFP.siteName != 'NTVSpor'&& DygDFP.siteName != 'NTVCOM_TR'){
                jQuery("iframe[id='" + selector + "']").parent().parent().hide();
            }

            if (videoURL != 'http://img-dygassets.mncdn.com/Videos/') {
                jQuery("#mastheadContainer").prepend("<div id='mastheadVideoContainer'></div>");
                jQuery("#mastheadVideoContainer").css("width", playerWidth);
                jQuery("#mastheadVideoContainer").css("height", playerHeight);
                jQuery("#mastheadVideoContainer").append("<video id='mastheadVideo' class='video-js vjs-default-skin' preload='auto' loop muted autoplay controls><source src='" + videoURL + "' type='video/mp4' /></video>");
                jQuery("#mastheadVideoContainer").css("position", "absolute");
                jQuery("#mastheadVideoContainer").css("margin-left", playerLeft);
                jQuery("#mastheadVideoContainer").css("margin-top", playerTop);
                jQuery("#mastheadVideoContainer").css("z-index", 99);
                jQuery("#mastheadVideoContainer").hide();

                jQuery("#mastheadVideo").css("width", playerWidth);
                jQuery("#mastheadVideo").css("height", playerHeight);



                jQuery('#mastheadVideo').bind('pause', function() {
                    DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=pause&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadPause');
                });

                jQuery('#mastheadVideo').bind('end', function() {
                    DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=complete&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadComplate');
                });

            }

            if (window.sessionStorage.getItem('isShowHtml5Masthead') == null || window.sessionStorage.getItem('isShowHtml5Masthead') == "true") {
                jQuery("#mastheadCloseController").show();
                jQuery("#mastheadController").css("text-align", "right");
                DygDFP.Html5Masthead.open();
                if(jQuery('#mastheadVideo').length > 0){
                    this.VCR();
                }
            }
            else {
                jQuery("#mastheadOpenController").show();
                jQuery("#mastheadController").css("text-align", "center");
                if(DygDFP.siteName != 'StarTV' && DygDFP.siteName != 'NTVSpor' && DygDFP.siteName != 'NTVCOM_TR'){
                    if (hasScriptCode) {
                        jQuery("iframe[id='" + selector + "']").hide();

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
            if (jQuery("#mastheadVideo").length > 0 && !jQuery("#mastheadVideo").prop('muted')) {
                DygDFP.Html5Masthead.muteControl();
                jQuery("#mastheadVideo")[0].pause();
            }

            jQuery('#mastheadVideoContainer').hide();
            jQuery('#mastheadContainer').slideToggle('slow', function() {
                jQuery("#mastheadController").css("text-align", "center");
                jQuery('#mastheadOpenController').show();
                jQuery('#mastheadCloseController').hide();
                jQuery('#mastheadIframe').attr("src","");
            });
        },
        open: function(hasScriptCode, selector) {
            window.sessionStorage.setItem('isShowHtml5Masthead', 'true');
            jQuery('#mastheadIframe').attr("src", jQuery('#mastheadIframe').attr("data-src"));
            jQuery('#mastheadContainer').slideToggle('slow', function() {
                jQuery('#mastheadVideoContainer').show();
                jQuery('#mastheadCloseController').show();
                jQuery('#mastheadOpenController').hide();
                jQuery("#mastheadController").css("text-align", "right");
                if (jQuery("#mastheadVideo").length > 0) {
                    DygDFP.Html5Masthead.VCR();
                    DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=play&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadPlay');
                    jQuery("#mastheadVideo")[0].currentTime = 0;
                    jQuery("#mastheadVideo")[0].play();
                    jQuery("#mastheadVideo").prop('muted', true);
                }
            });
        },
        muteControl: function() {
            if (jQuery("#mastheadVideo").prop('muted')) {
                jQuery("#mastheadVideo").prop('muted', false);
                DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=unmute&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadUnmute');
            } else {
                jQuery("#mastheadVideo").prop('muted', true);
                DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.Html5Masthead.BrandURL + '/&sz=1x1&t=act=mute&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'mastheadMute');
            }
        },
        VCR: function() {
            clearTimeout(DygDFP.Html5Masthead.VCRSessionTimeout);
            DygDFP.Html5Masthead.VCRSessionTimeout = setTimeout(function() {
                var proportion = Math.round(parseInt(jQuery("#mastheadVideo")[0].currentTime) * 100 / parseInt(jQuery("#mastheadVideo")[0].duration));
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
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }
            this.panel2Height = panel2Height;
            this.iframeURLTag = panel2IframeURL + '?clickTAG=' + clickURL;
            this.brandURL = brandURL;
            jQuery("div[id='" + selector + "__container__']").hide();
            var appendDiv = jQuery("div[id='" + selector + "__container__']").parent();
            jQuery(appendDiv).css("text-align", "center");
            jQuery(appendDiv).css("height", panel1Height);
            jQuery(appendDiv).append('<div id="takeOverPanelContainer"></div>');
            jQuery("#takeOverPanelContainer").append('<div id="takeOverPanel1"></div>');
            jQuery("body").prepend('<div id="takeOverPanel2" style="display:none"></div>');
            jQuery("#takeOverPanel1").css("position", "relative");

            if (panel1ImagePath != '' && panel2ImagePath != '') {
                jQuery("#takeOverPanel1").append('<a onclick="DygDFP.Html5TakeOver.open();" href="javascript:;"><img src="' + panel1ImagePath + '" alt="" /></a>');

                if(panel2Width == 0){
                    jQuery("#takeOverPanel2").css("width", "100%");
                }
                else{
                    jQuery("#takeOverPanel2").css("width", panel2Width);
                }

                if (isFixed == 'no') {
                    jQuery("#takeOverPanel2").css("position", "absolute");
                } else {
                    jQuery("#takeOverPanel2").css("position", "fixed");
                }

                jQuery("#takeOverPanel2").css("margin", "auto");
                jQuery("#takeOverPanel2").css("left", 0);
                jQuery("#takeOverPanel2").css("right", 0);
                jQuery("#takeOverPanel2").css("z-index", 999999);
                jQuery("#takeOverPanel2").css("top", 0);
                jQuery("#takeOverPanel2").append('<a id="TakeOverCloseBtn" href="javascript:;" onclick="DygDFP.Html5TakeOver.close()"><img src="http://img-dygassets.mncdn.com/Images/RichMedia_Close_BTN.PNG" alt="" /></div>');
                jQuery("#TakeOverCloseBtn").css("position", "absolute");
                jQuery("#TakeOverCloseBtn").css("right", 0)
                jQuery("#TakeOverCloseBtn").css("margin-right", 3)
                jQuery("#takeOverPanel2").append('<a href="' + clickURL + '" target="_blank"><img src="' + panel2ImagePath + '" alt="" /></div>');
            } else if (panel1IframeURL != '' && panel2IframeURL != '') {
                jQuery("#takeOverPanel1").append('<a id="TakeOverOpenBtn" href="javascript:;" onclick="DygDFP.Html5TakeOver.open()"></a>');
                jQuery("#TakeOverOpenBtn").css("display", "block");
                jQuery("#TakeOverOpenBtn").css("width", panel1Width);
                jQuery("#TakeOverOpenBtn").css("height", panel1Height);
                jQuery("#TakeOverOpenBtn").css("position", "absolute");
                jQuery("#TakeOverOpenBtn").css("left", 0);
                jQuery("#TakeOverOpenBtn").css("right", 0);
                jQuery("#TakeOverOpenBtn").css("margin", "auto");

                jQuery("#takeOverPanel1").append('<iframe id="takeOverPanel1Iframe" src="' + panel1IframeURL + '"></iframe>');
                jQuery("#takeOverPanel1Iframe").css("width", panel1Width);
                jQuery("#takeOverPanel1Iframe").css("height", panel1Height);
                jQuery("#takeOverPanel1Iframe").css("border", "none");

                if(panel2Width == 0){
                    jQuery("#takeOverPanel2").css("width","100%");
                }
                else{
                    jQuery("#takeOverPanel2").css("width", panel2Width);
                }

                if (isFixed == 'no') {
                    jQuery("#takeOverPanel2").css("position", "absolute");
                } else {
                    jQuery("#takeOverPanel2").css("position", "fixed");
                }
                jQuery("#takeOverPanel2").css("margin", "auto");
                jQuery("#takeOverPanel2").css("left", 0);
                jQuery("#takeOverPanel2").css("right", 0);
                jQuery("#takeOverPanel2").css("z-index", 999999);
                jQuery("#takeOverPanel2").css("top", 0);
                jQuery("#takeOverPanel2").append('<a id="TakeOverCloseBtn" href="javascript:;" onclick="DygDFP.Html5TakeOver.close()"><img src="http://img-dygassets.mncdn.com/Images/RichMedia_Close_BTN.PNG" alt="" /></div>');
                jQuery("#TakeOverCloseBtn").css("position", "absolute");
                jQuery("#TakeOverCloseBtn").css("right", 0)
                jQuery("#TakeOverCloseBtn").css("margin-right", 3)
                jQuery("#TakeOverCloseBtn").css("z-index", 999);


                //jQuery("#takeOverPanel2").append('<a id="TakeOverClickBtn" href="' + clickURL + '?clickTAG='+clickURL+'" target="_blank"></a>');
                jQuery("#TakeOverClickBtn").css("display", "block");
                jQuery("#TakeOverClickBtn").css("width", panel2Width);
                jQuery("#TakeOverClickBtn").css("height", panel2Height);
                jQuery("#TakeOverClickBtn").css("position", "absolute");
                jQuery("#TakeOverClickBtn").css("left", 0);
                jQuery("#TakeOverClickBtn").css("right", 0);
                jQuery("#TakeOverClickBtn").css("margin", "auto");

                jQuery("#takeOverPanel2").append('<iframe id="takeOverPanel2Iframe" src="'+panel2IframeURL+'"></iframe>');
                //jQuery("#takeOverPanel2").append('<iframe id="takeOverPanel2Iframe" src="#"></iframe>');
                if(panel2Width == 0){
                    jQuery("#takeOverPanel2Iframe").css("width","100%");
                }
                else{
                    jQuery("#takeOverPanel2Iframe").css("width", panel2Width);
                }
                if(panel2Height == 0){
                    jQuery("#takeOverPanel2Iframe").css("height",jQuery(window).height());
                }
                else{
                    jQuery("#takeOverPanel2Iframe").css("height", panel2Height);
                }
                jQuery("#takeOverPanel2Iframe").css("border", "none");
            }

            jQuery(appendDiv).show();
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
                jQuery("#takeOverPanel2Iframe").attr('src', this.iframeURLTag);
                //		jQuery("#takeOverPanel2").fadeIn();
            } catch (e) {
                console.log(e);
            }

            if(this.panel2Height == 0){
                jQuery("body").css("overflow-x","hidden");
            }

            //jQuery("#takeOverPanel2").css({ opacity: 1 });
            jQuery("#takeOverPanel2").css({
                display: "block"
            });
        },
        close: function() {
            DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + this.brandURL + '/&sz=1x1&t=act=takeOver_panel2_close&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'takeOverPanel2Close');
            //jQuery("#takeOverPanel2").fadeOut();
            //jQuery("#takeOverPanel2").css({ opacity: 0 });

            if(this.panel2Height == 0){
                jQuery("body").css("overflow-x","auto");
            }
            jQuery("#takeOverPanel2").css({
                display: "none"
            });
            try {
                //jQuery("#takeOverPanel2").fadeOut();
                jQuery("#takeOverPanel2Iframe").attr('src', "#");
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
                jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
            }

            this.BrandURL = brandURL;

            var head = document.getElementsByTagName("head")[0];
            var css = document.createElement('link');
            css.type = 'text/css';
            css.rel = 'stylesheet';
            css.href = 'http://img-dygassets.mncdn.com/Files/Css/scroll_wall.css';
            head.appendChild(css);

            jQuery("#sticky-wrapper").after('<div id="ScrollWallContainer"></div>');
            jQuery("#ScrollWallContainer").append('<div id="ScrollWall_SetHeight"></div>');
            jQuery("#ScrollWallContainer").append('<div id="ScrollWall_ArrowBounce" class="arrow bounce"></div>');
            jQuery("#ScrollWall_ArrowBounce").append('<div id="ScrollWall_DownArrow">Aþaðý kaydýr</div>');

            var source = '<video class="videoHolder" id="ScrollWall_Video" tabindex="0" autobuffer="autobuffer" preload="preload">';
            source += '<source type="video/mp4" src="' + videoURL + '"></source>';
            source += '<p>Sorry, your browser does not support the video element.</p>';
            source += '</video>';


            jQuery("#ScrollWallContainer").append(source);

            jQuery("body").append('<div class="closebt"><img src="http://img-dygassets.mncdn.com/Images/RichMedia_Close_BTN.png"></div>');

            var pattern = '<div class="adPartContainer" style="display:none">';
            pattern += '<a id="ScrollWallLeftSkin" target="_blank" href="' + clickURL + '" style="position:absolute;left:0;z-index:5;height:1100px"></a>';
            pattern += '<a id="ScrollWallRightSkin" target="_blank"  href="' + clickURL + '" style="position:absolute;right:0;z-index:5;height:1100px"></a>';
            pattern += '</div>';
            jQuery("body").append(pattern);

            var partImageWidth = ((jQuery(window).width() - DygDFP.PageSkin.containerWidth) / 2);
            jQuery("#ScrollWallLeftSkin").css("background", "url(" + leftImage + ") no-repeat 100% 0 ");
            jQuery("#ScrollWallLeftSkin").css("width", partImageWidth);
            jQuery("#ScrollWallLeftSkin").css("top", DygDFP.PageSkin.marginTop);
            jQuery("#ScrollWallRightSkin").css("background", "url(" + rightImage + ") no-repeat 0 0 ");
            jQuery("#ScrollWallRightSkin").css("width", partImageWidth);
            jQuery("#ScrollWallRightSkin").css("top", DygDFP.PageSkin.marginTop);
            jQuery("#ScrollWall_SetHeight").click(function(){
                var win = window.open(clickURL, '_blank');
                win.focus();
            });

            if (getCookie('isShowScrollWall') == "") {
                DygDFP.ScrollWall.play();
                DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.ScrollWall.BrandURL + '/&sz=1x1&t=act=scrollWall_autoplay&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'scrollWallClose');
            }
            else{
                jQuery("#ScrollWall_Video").hide();
                jQuery(".adPartContainer").show();
                //jQuery(".closebt").hide();
                jQuery("#ScrollWall_ArrowBounce").hide();
                jQuery(".closebt").html('<img src="http://img-dygassets.mncdn.com/Images/repeatbtn.png">');
                DygDFP.ScrollWall.giveAgainEvent();
            }

            if(DygDFP.siteName == 'NTVCOM_TR'){
                jQuery(".sticky-wrapper").css("z-index",6);
                jQuery(".sticky-wrapper").css("position","relative");
                jQuery("header").css("z-index",7);
                jQuery(".content_wrapper>div .wrapper").css("z-index",2);
                jQuery(".content_wrapper>div .wrapper").css("position","relative");
            }
        },
        play: function(){
            this.isRunning = true;
            createCookie('isShowScrollWall', 'true', 60);
            jQuery("#ScrollWall_Video").show();
            jQuery(".adPartContainer").hide();
            jQuery("#ScrollWall_ArrowBounce").show();
            jQuery("#ScrollWall_SetHeight").css("height","3000px");
            DygDFP.ScrollWall.giveCloseEvent();
        },
        scroll: function(){
            if(this.isRunning){
                var video = jQuery("#ScrollWall_Video")[0];
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
                if (jQuery("#sticky-wrapper").hasClass("is-sticky")) {
                    jQuery(".closebt").css("position", "fixed");
                    jQuery(".closebt").css("top", jQuery("nav.main").outerHeight() + jQuery(".ticker-wrapper").height());
                }
                else {
                    jQuery(".closebt").css("position", "absolute");
                    jQuery(".closebt").css("top", 200);
                }
            }
        },
        removeVideo: function(){
            jQuery("#ScrollWall_SetHeight").css("height","0px");
            jQuery(window).scrollTop(0);

            DygDFP.ScrollWall.isRunning = false;
            jQuery('.bgImage').fadeIn("slow");
            jQuery('#ScrollWall_Video').fadeOut("fast",function(){
                DygDFP.ScrollWall.giveAgainEvent();
            });
        },
        giveAgainEvent: function(){
            var video = jQuery("#ScrollWall_Video")[0];
            jQuery(".closebt").html('<img src="http://img-dygassets.mncdn.com/Images/repeatbtn.png">');
            jQuery(".arrow").css("opacity","0");
            jQuery(".adPartContainer").show();
            jQuery("#ScrollWall_ArrowBounce").hide();
            jQuery(".closebt").unbind( "click" );
            jQuery(".closebt").click(function(){
                DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.ScrollWall.BrandURL + '/&sz=1x1&t=act=scrollWall_replay&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'scrollWallReplay');
                DygDFP.ScrollWall.giveCloseEvent();
                jQuery("#ScrollWall_SetHeight").css("height","3000px");
                DygDFP.ScrollWall.isRunning = true;
                jQuery("body").scrollTop(0);
                video.currentTime = 0;
                jQuery('.bgImage').fadeOut("fast",function(){});
                jQuery('#ScrollWall_Video').fadeIn("slow",function(){});
            });
        },
        giveCloseEvent: function(){
            jQuery(".adPartContainer").hide();
            jQuery("#ScrollWall_ArrowBounce").show();
            jQuery(".closebt").unbind("click");
            jQuery(".closebt").html('<img src="http://img-dygassets.mncdn.com/Images/RichMedia_Close_BTN.png">');
            jQuery(".arrow").css("opacity","1");
            jQuery(".closebt").click(function(){
                DygDFP.ScrollWall.removeVideo();
                DygDFP.plugin.imageRequest('http://pubads.g.doubleclick.net/gampad/ad?iu=37011203/' + DygDFP.ScrollWall.BrandURL + '/&sz=1x1&t=act=scrollWall_close&c=' + DygDFP.plugin.getRandomNumber() + '&pre=1', 'scrollWallClose');
            });
        },
        resize: function(){
            if(jQuery("#ScrollWallContainer").length > 0){
                var partImageWidth = ((jQuery(window).width() - DygDFP.PageSkin.containerWidth) / 2);

                jQuery("#ScrollWallLeftSkin").css({
                    width: partImageWidth,
                });

                jQuery("#ScrollWallRightSkin").css({
                    width: partImageWidth,
                });

                if(partImageWidth > 0){
                    jQuery(".closebt").show();
                }
                else{
                    jQuery(".closebt").hide();
                }
            }
        }
    },
    NativeAd: {
        init: function(imageURL,url,title,brandingName,impressionURL,seconds){
            if(seconds==undefined)
            {
                if (impressionURL != '') {
                    jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
                }
                jQuery(".native-ad-img").attr("src", imageURL);
                jQuery(".native-ad-title").html(title);
                jQuery(".native-ad-url").attr("href",url);
            }
            else{
                setTimeout(function(){
                    if (impressionURL != '') {
                        jQuery("body").prepend('<img src="' + impressionURL + '" alt="" style="display:none" />');
                    }
                    jQuery(".native-ad-img").attr("src", imageURL);
                    jQuery(".native-ad-title").html(title);
                    jQuery(".native-ad-url").attr("href",url);
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
jQuery(window).resize(function() {
    DygDFP.PageSkin.resize();
    DygDFP.ScrollWall.resize();

    if (jQuery("#flashLeftPanel").length > 0) {
        DygDFP.Paralax.resize();
    }

    if (jQuery("#takeOverShow").length > 0) {
        DygDFP.Takeover.resize();
    }

    if (jQuery("#videoWall").length > 0) {
        DygDFP.VideoWall.resize();
    }
});

jQuery(window).scroll(function() {

    DygDFP.ScrollWall.scroll();

    if (jQuery("#flashLeftPanel").length > 0) {
        setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".scrollParalax()", 0);

        clearTimeout($.data(this, "scrollCheck"));
        $.data(this, "scrollCheck", setTimeout(function() {
            setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".scrollParalax()", 0);
        }, 100));

        var s = jQuery(window).scrollTop();
        var d = jQuery(document).height();
        var c = jQuery(window).height();
        scrollPercent = (s / (d - c)) * 100;
        var id = 0;
        var per = Math.floor(scrollPercent);

        var flash = document.getElementById("flashLeftPanel");
        flash.fadeUpClip(per);

        var flash = document.getElementById("flashRightPanel");
        flash.fadeUpClip(per);
    }

    if ((DygDFP.section == "videogaleri") && DygDFP.siteName == "NTVCOM_TR") {
        if(jQuery(window).scrollTop() == 0)
        {
            jQuery("#LeftSkin").css("position","fixed");
            jQuery("#LeftSkin").css("top",jQuery("header.cf").outerHeight());
            jQuery("#RightSkin").css("position","fixed");
            jQuery("#RightSkin").css("top",jQuery("header.cf").outerHeight());
        }
        else{
            jQuery("#LeftSkin").css("position", "fixed");
            jQuery("#RightSkin").css("position", "fixed");
            jQuery("#RightSkin").css("top", 0);
            jQuery("#LeftSkin").css("top", 0);
        }

    }
    else if (DygDFP.section != "fotogaleri" && DygDFP.section != "videogaleri" && DygDFP.siteName == "NTVCOM_TR") {
        if (jQuery("#sticky-wrapper").hasClass("is-sticky")) {
            jQuery("#LeftSkin").css("position", "fixed");
            jQuery("#RightSkin").css("position", "fixed");
            jQuery("#RightSkin").css("top", jQuery("nav.main").outerHeight() + jQuery(".ticker-wrapper").height());
            jQuery("#LeftSkin").css("top", jQuery("nav.main").outerHeight() + jQuery(".ticker-wrapper").height());
            jQuery("#TopSkin").hide();
        } else {
            jQuery("#LeftSkin").css("position", "absolute");
            jQuery("#RightSkin").css("position", "absolute");
            try {
                if(DygDFP.Brand.NTVCOM_TR != undefined) {
                    jQuery("#RightSkin").css("top", DygDFP.Brand.NTVCOM_TR.OldPageSkinTop);
                    jQuery("#LeftSkin").css("top", DygDFP.Brand.NTVCOM_TR.OldPageSkinTop);
                }
            }catch(e){

            }
            jQuery("#TopSkin").show();
        }
    }
    else if (DygDFP.siteName == "StarTV") {
        if(!jQuery("#div-Tepe_728x90").is(":visible"))
        {
            if(jQuery(window).scrollTop() > 38){
                jQuery("#LeftSkin").css("position", "fixed");
                jQuery("#RightSkin").css("position", "fixed");
                jQuery("#RightSkin").css("top", jQuery("#header").outerHeight());
                jQuery("#LeftSkin").css("top", jQuery("#header").outerHeight());
                jQuery("#div-PageSkin").css("top", jQuery("#header").outerHeight());
            }
            else{
                jQuery("#LeftSkin").css("position", "absolute");
                jQuery("#RightSkin").css("position", "absolute");
                jQuery("#RightSkin").css("top", DygDFP.Brand.StarTV.OldPageSkinTop);
                jQuery("#LeftSkin").css("top", DygDFP.Brand.StarTV.OldPageSkinTop);
                jQuery("#div-PageSkin").css("top", DygDFP.Brand.StarTV.OldPageSkinTop);
            }
        }
    }
    else if (DygDFP.siteName == "StarTVNEW") {
        if (jQuery("header .navigation").hasClass("scrolled")) {
            jQuery("#LeftSkin").css("position", "fixed");
            jQuery("#RightSkin").css("position", "fixed");
            jQuery("#RightSkin").css("top", jQuery("header .navigation").outerHeight());
            jQuery("#LeftSkin").css("top", jQuery("header .navigation").outerHeight());
        }
        else {
            jQuery("#LeftSkin").css("position", "absolute");
            jQuery("#RightSkin").css("position", "absolute");
            jQuery("#RightSkin").css("top", DygDFP.Brand.StarTVNEW.OldPageSkinTop);
            jQuery("#LeftSkin").css("top", DygDFP.Brand.StarTVNEW.OldPageSkinTop);
        }
    }
    else if (DygDFP.siteName == "NTVPara") {
        if (jQuery(window).scrollTop() > 150) {
            jQuery("#LeftSkin").css("position", "fixed");
            jQuery("#RightSkin").css("position", "fixed");
            jQuery("#RightSkin").css("top", 0);
            jQuery("#LeftSkin").css("top", 0);
        } else {
            jQuery("#LeftSkin").css("position", "absolute");
            jQuery("#RightSkin").css("position", "absolute");
            jQuery("#RightSkin").css("top", DygDFP.PageSkin.marginTop);
            jQuery("#LeftSkin").css("top", DygDFP.PageSkin.marginTop);
        }
    } else if (DygDFP.siteName == "NTVSpor") {
        if (jQuery(window).scrollTop() > 183) {
            jQuery("#LeftSkin").css("position", "fixed");
            jQuery("#RightSkin").css("position", "fixed");
            jQuery("#RightSkin").css("top", 0);
            jQuery("#LeftSkin").css("top", 0);
        } else {
            jQuery("#LeftSkin").css("position", "absolute");
            jQuery("#RightSkin").css("position", "absolute");
            jQuery("#RightSkin").css("top", DygDFP.PageSkin.marginTop);
            jQuery("#LeftSkin").css("top", DygDFP.PageSkin.marginTop);
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
        if (document.getElementById(jQuery("body object[data*='flowplayer']").attr("id")) != null) {
            var flash = document.getElementById(jQuery("body object[data*='flowplayer']").attr("id"));
            flash.fp_play();
        } else {
            var kdp = document.getElementById(jQuery("body object[data*='http://cdnapi.kaltura.com/index.php']").attr("id"));
            kdp.sendNotification('doPlay');
        }
    }

    jQuery("#extendVidPanel").css("display", "none");
    jQuery("#extendVid").append(flashSource);
    setTimeout("DygDFP.Brand." + DygDFP.siteName.replace('-', '') + ".prepareVPaid();", 400);
    setTimeout(function() {
        jQuery("#extendVidPanel").css("position", "absolute");
        jQuery("#extendVidPanel").css("left", "0");
        jQuery("#extendVidPanel").css("right", "0");
        jQuery("#extendVidPanel").css("margin", "auto");
        jQuery("#extendVidPanel").css("z-index", "99999");
        jQuery("#extendVidPanel").css("background-color", "white");
        jQuery("#extendVidPanel").css("width", width);
        jQuery("#extendVidPanel").css("height", height);
        jQuery("#extendVidPanel").css("display", "block");
    }, 400);
}

function closeVpaid() {
    jQuery("#extendVidPanel").fadeOut('slow', function() {
        jQuery("#extendVidPanel").css('display', 'none');
        jQuery("#extendVidPanel").empty();



        if (document.getElementById(jQuery("body object[data*='flowplayer']").attr("id")) != null) {
            //var flash = document.getElementById(jQuery("body object[data*='flowplayer']").attr("id"));
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
            var kdp = document.getElementById(jQuery("body object[data*='http://cdnapi.kaltura.com/index.php']").attr("id"));
            kdp.sendNotification('doPlay');
        }
    });
}

function closeExtended() {
    if (document.getElementById(jQuery("body object[data*='flowplayer']").attr("id")) == null) {
        handleEvents('AdStopped');
    }

    handleEvents('AdUserClose');
    closeVpaid();
}

function gotoURL(src) {
    if (document.getElementById(jQuery("body object[data*='flowplayer']").attr("id")) != null) {
        handleEvents('AdUserClose');
    }

    handleEvents('AdClickThru');
    closeVpaid();
}

function handleEvents(param) {
    var flash = null;
    if (document.getElementById(jQuery("body object[data*='flowplayer']").attr("id")) != null) {
        flash = document.getElementById(jQuery("body object[data*='flowplayer']").attr("id"));
    } else {
        flash = document.getElementById(jQuery("body object[data*='http://cdnapi.kaltura.com/index.php']").attr("id"));
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


jQuery(document).ready(function() {

    if (false) {
        if (DygDFP.siteName == 'StarTV' && DygDFP.section == 'Anasayfa') {
            if (DygDFP.device.isWeb()) {
                jQuery("#bodyRender").prepend('<iframe src="http://secim.ntv.com.tr/genel-widget.html" width="100%" height="230" frameborder="0" scrolling="no"></iframe>');
                jQuery("body").css("background", "none");
            }
        } else if (DygDFP.siteName == 'NTVPara' && DygDFP.section == 'Anasayfa') {
            jQuery("#main").before('<iframe src="http://secim.ntv.com.tr/genel-widget.html" width="100%" height="230" frameborder="0" scrolling="no"></iframe>');
            jQuery("#mainHeader").css("margin-bottom", "-10px");
        } else if (DygDFP.siteName == 'Kral_Muzik12' && DygDFP.section == 'Anasayfa') {
            if (DygDFP.device.isTablet() || DygDFP.device.isWeb()) {
                jQuery("#main-carousel").before('<iframe src="http://secim.ntv.com.tr/genel-widget.html" width="100%" height="230" frameborder="0" scrolling="no"></iframe>');
            }
        }
    }
});
