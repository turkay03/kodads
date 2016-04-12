var divId, mobileUrl, flashUrl, autoPlay, alias, tags, comscore, playerArray, videoCount, flashVersion = 0,
    flashStatus = true,
    nextPartCallBack = "",
    subTitleFile = "",
    publisherId, referenceId, log, hideAds, hideSurvey,
    autoRedirect, beforeChannelLogo, beforeChannelUrl, channell, channelLogo, clk, clkAlt, countryCode, defaultFlavor, dontShare, dr, exclusiveUrl, inHouse, isSerie, isSocialOn, isUncensored, itemId,
    loginStatus, music, nextChannelLogo, nextChannelUrl, partDuration, partner, performanceMode, playbackDevice, playbackTime, refGo, seedTrackingUrl, seedUrl, selectPart, clearCache, videoRatio, cdnType = "medianova-tvyo",
    mediaId;

(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];
p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)
};p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;
n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","//d2o0kplh0brmk1.cloudfront.net/sp.js","snowplow"));

window.snowplow('newTracker', 'cf', 'd2gudb23qayd4a.cloudfront.net', {
  appId: 'fotv'
});

var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "http://img-dygassets.mncdn.com/player/cdntest/cdn_test.js";
head.appendChild(script);

function DygPlayer() {

var motiweArray = Array({
  513761:"cilek_kokusu",    //çilek kokusu
  514160:"tatli_kucuk",   //tatlı küçük yalancılar
  513845:"kiralik_ask",   //kiralık aşk
  514314:"Tvyo_514314_kaderimin",
  514165:"Tvyo_514165_cilek",
  514164:"Tvyo_514164_cilek15bol",
  514162:"Tvyo_514162",
  514616:"paramfrag_Tvyo_514616"




});

    var obj = {
        createPlayer: function(paramss) {
            playerArray = paramss;
            this.getFlashVersion();
            this.detectmobile();
            // loadScript("http://cdnapi.kaltura.com/p/990652/sp/99065200/embedIframeJs/uiconf_id/27147171/partner_id/990652",this.addPlayer);   
            loadScript("http://cdnapi.kaltura.com/html5/html5lib/v2.28/mwEmbedLoader.php", this.addPlayer);
            ////console.log("itemId :"+itemId);
            videoCount = paramss.length
        },
        getItemId: function() {
            //itemId     =playerArray[0]["itemId"];
            // alert("item_id"+this.itemId);
            return itemId;
        },
        doTimer: function() {
            //console.log("medianova : doTime");
        },
        getParameters: function(name, url) {
            if (!url) url = location.href
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(url);
            return results == null ? null : results[1];
        },
        searchMotiwe: function(subject, objects) {
            var matches = [];
            var regexp = new RegExp(subject, 'g');

            for (var i = 0; i < objects.length; i++) {
                for (key in objects[i]) {
                    if (key == subject) {
                        return objects[i][key];
                    }
                }
            }
        },
        addPlayer: function() {
            //mw.setConfig('forceMobileHTML5',true);
            for (var i = 0; i <= videoCount - 1; i++) {
                divId = playerArray[i]["divId"];
                playerType = playerArray[i]["playerType"];
                mobileUrl = playerArray[i]["mobileUrl"];
                flashUrl = playerArray[i]["flashUrl"];
                alias = playerArray[i]["alias"];
                tags = playerArray[i]["tags"];
                comscore = playerArray[i]["comscore"];
                autoPlay = playerArray[i]["autoPlay"];
                parts = playerArray[i]["parts"];
                if (parts == "" || parts == undefined) {
                    parts = "";
                }
                publisherId = playerArray[i]["publisherId"];
                referenceId = playerArray[i]["referenceId"];
                log = playerArray[i]["log"];
                hideAds = playerArray[i]["hideAds"];
                hideSurvey = playerArray[i]["hideSurvey"];
                nextPartCallBack = playerArray[i]["nextPartCallBack"];
                if (nextPartCallBack == "" || nextPartCallBack == undefined) {
                    nextPartCallBack = "";
                }

                subTitleFile = playerArray[i]["subTitleFile"];
                if (subTitleFile == "" || subTitleFile == undefined) {
                    subTitleFile = "";
                }

                if (flashUrl == "" || flashUrl == undefined) {
                    flashUrl = "";
                }
                clearCache = playerArray[i]["clearCache"];
                if (clearCache == "" || clearCache == undefined) {
                    clearCache = "444444";
                }
                hideAds = playerArray[i]["hideAds"];
                if (hideAds == "" || hideAds == undefined) {
                    hideAds = false;
                }

                autoRedirect = playerArray[i]["autoRedirect"];
                beforeChannelLogo = playerArray[i]["beforeChannelLogo"];
                beforeChannelUrl = playerArray[i]["beforeChannelUrl"];
                channell = playerArray[i]["channell"];
                channelLogo = playerArray[i]["channelLogo"];
                clk = playerArray[i]["clk"];
                clkAlt = playerArray[i]["clkAlt"];
                countryCode = playerArray[i]["countryCode"];
                defaultFlavor = playerArray[i]["defaultFlavor"];
                dontShare = playerArray[i]["dontShare"];
                dr = playerArray[i]["dr"];
                exclusiveUrl = playerArray[i]["exclusiveUrl"];
                inHouse = playerArray[i]["inHouse"];
                isSerie = playerArray[i]["isSerie"];
                isSocialOn = playerArray[i]["publisherId"];
                isUncensored = playerArray[i]["isSocialOn"];
                itemId = playerArray[i]["itemId"];
                loginStatus = playerArray[i]["loginStatus"];
                music = playerArray[i]["music"];
                nextChannelLogo = playerArray[i]["nextChannelLogo"];
                nextChannelUrl = playerArray[i]["nextChannelUrl"];
                partDuration = playerArray[i]["partDuration"];
                partner = playerArray[i]["partner"];
                performanceMode = playerArray[i]["performanceMode"];
                playbackDevice = playerArray[i]["playbackDevice"];
                playbackTime = playerArray[i]["playbackTime"];
                refGo = playerArray[i]["refGo"];
                seedTrackingUrl = playerArray[i]["seedTrackingUrl"];
                seedUrl = playerArray[i]["seedUrl"];
                selectPart = playerArray[i]["selectPart"];

                videoRatio = playerArray[i]["videoRatio"];

                if (videoRatio == "" || videoRatio == undefined) {
                    videoRatio = false;
                };

                var matches = [];
                var subject = itemId;
                var regexp = new RegExp(subject, 'g');
                var mediaObject;
                for (var i = 0; i < motiweArray.length; i++) {
                    for (key in motiweArray[i]) {
                        if (key == subject) {
                        	mediaId = motiweArray[i][key];
                            mediaObject = cdnTest.getVideo(mediaId);
                            cdnType = mediaObject.provider;
                            var f4m = mediaObject.urls[0];
                            var m3u8 = mediaObject.urls[1];
                           //console.log(f4m); 
                            //console.log(m3u8);
                        }
                    }
                }

                if (mediaObject != undefined) {
                    mobileUrl = "http://" + m3u8;
                    flashUrl = "http://" + f4m;
                    //console.log("cdnType :" + cdnType);

                    publisherId = "";
                    referenceId = "";
                } else {
                    var head = document.getElementsByTagName('head')[0];
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = "http://players-p.mncdn.com/mntracker.min.js";
                    head.appendChild(script);
                }

                //console.log("flashUrl :" + flashUrl);
                var uiConfId = "11729381";

                switch (playerType) {
                    case "vod":
                        uiConfId = "11729381";
                        break;
                    case "live":
                        uiConfId = "20952162";
                        break;
                    case "tvyolive":
                        uiConfId = "10439471";
                        break;
                    case "tvyovod":
                        uiConfId = "27147171";
                        break;
                    case "tvyovodtest":
                        uiConfId = "10001241";
                        break;
                    case "tvyolivetest":
                        uiConfId = "10001241";
                        break;
                    case "vouge":
                        uiConfId = "29873821";
                        break;
                    default:
                        uiConfId = "11729381";
                        break;
                }
                log: "true"

                //console.log("entryId :" + mobileUrl);
                mw.setConfig('EmbedPlayer.ReplaceSources', [{
                    'type': 'application/vnd.apple.mpegurl',
                    'src': mobileUrl
                }]);
                kWidget.embed({
                    "targetId": divId,
                    "cache_st": 33445522, // player xml gÃƒÂ¼ncellemek iÃƒÂ§in random bir deÃ„Å¸er.
                    "wid": "_990652",
                    "uiconf_id": uiConfId,
                    "entry_id": "1",
                    "flashvars": {
                        //"kml":"local",
                        //"kmlPath": 'http://ilhan.local/tvyo/test/kaltura/config.php',
                        entryId: flashUrl, //'http://startv.motiwecdn.com/startv/_definst_/mp4:startv/StarTV/Tanitim/miniplayer/kardepayi_29bolum_fragmani_2145r.mp4/manifest.f4m?e11b3501178b61b39327ddbaf0f1382abd05b815ab42199508e1cad6e53a87633bf76528aa98499c5311d40a48306387&amp;v=1', //harici video url 
                        sourceType: 'url', //harici video url eklendiÃ„Å¸inde bu parametre gÃƒÂ¶nderilir.
                        //   ks: 'NGM5NDk1MmUwYzI1OGY0M2EyNzM4YzcxMTk2NmZhYmVkOWUxZTYyMnw5OTA2NTI7OTkwNjUyOzE0MTAzMzc4MjQ7MDs0NzExO0thbHR1cmFVc2VyO3N2aWV3Oio',
                        'video.keepAspectRatio': videoRatio,
                        autoPlay: autoPlay,
                        streamerType: 'hdnetworkmanifest',
                        'akamaiHD.loadingPolicy': 'preInitialize',
                        'akamaiHD.asyncInit': true,
                        preloaderPath: 'http://static.tvyo.com/player/preloader_n.swf',
                        centerPreloader: true,
                        channell: channell, // logo yerleÃ…Å¸imi iÃƒÂ§in kanal ismi
                        alias: alias, //videoplaza alias
                        tags: tags, //videoplaza tags  
                        twoPhaseManifest: true,
                        hide_ads: hideAds,
                        is_serie: 1,
                        nextPartCallBack: nextPartCallBack,
                        comscore: comscore,
                        selectPart: parts,
                        PublisherId: publisherId,
                        ReferenceId: referenceId,
                        subTitleFile: subTitleFile,
                        autoRedirect: autoRedirect,
                        beforeChannelLogo: beforeChannelLogo,
                        beforeChannelUrl: beforeChannelUrl,
                        channell: channell,
                        channelLogo: channelLogo,
                        clk: clk,
                        clkAlt: clkAlt,
                        countryCode: countryCode,
                        defaultFlavor: defaultFlavor,
                        dontShare: dontShare,
                        dr: dr,
                        exclusiveUrl: exclusiveUrl,
                        inHouse: inHouse,
                        isSerie: isSerie,
                        isSocialOn: isSocialOn,
                        isUncensored: isUncensored,
                        itemId: itemId,
                        loginStatus: loginStatus,
                        music: music,
                        nextChannelLogo: nextChannelLogo,
                        nextChannelUrl: nextChannelUrl,
                        partDuration: partDuration,
                        partner: partner,
                        performanceMode: performanceMode,
                        playbackDevice: playbackDevice,
                        playbackTime: playbackTime,
                        refGo: refGo,
                        seedTrackingUrl: seedTrackingUrl,
                        seedUrl: seedUrl,
                        log: "log"
                    },
                    'params': { // params allows you to set flash embed params such as wmode, allowFullScreen etc
                        'wmode': 'transparent'
                    }
                });
            }
        },
        html5Player: function() {
            divId = playerArray[0]["divId"];
            mobileUrl = playerArray[0]["mobileUrl"];
            itemId = playerArray[0]["itemId"];
            document.getElementById(divId).innerHTML = "<video width=\"100%\" height=\"100%\"  autoplay=\"false\" controls x-webkit-airplay=\"allow\" id=\"" + divId + "_pl" + "\"><source src=" + mobileUrl + "></video><div id='adContainer'></div>"

            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "http://img-dygassets.mncdn.com/player/ads.js";
            head.appendChild(script);
        },

        getVideoContent: function() {
            var metas = document.getElementsByTagName('meta');
            var metaValue = {};
            for (i = 0; i < metas.length; i++) {
                if (metas[i].getAttribute("property") == "dyg:site") {
                    //metaValue ="site:"+metas[i].getAttribute("content"); 
                    metaValue.site = metas[i].getAttribute("content");
                }
                if (metas[i].getAttribute("property") == "dyg:section") {
                    metaValue.section = metas[i].getAttribute("content");
                }
                if (metas[i].getAttribute("property") == "dyg:target") {
                    metaValue.target = metas[i].getAttribute("content");
                }
            }
            //alert(metaValue.site);
            return metaValue;
        },
        detectmobile: function() {
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                flashStatus = true;
            } else {
                flashStatus = false;
            }
        },
        getFlashVersion: function() {
            // ie
            try {
                try {
                    // avoid fp6 minor version lookup issues
                    // see: http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
                    var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
                    try {
                        axo.AllowScriptAccess = 'always';
                    } catch (e) {
                        flashVersion = '6,0,0';
                    }
                } catch (e) {}
                flashVersion = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
                // other browsers
            } catch (e) {
                try {
                    if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
                        flashVersion = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
                    }
                } catch (e) {}
            }
            //flashVersion = '0,0,0';
        }
    };
    return obj;
}

var playerClass = DygPlayer();
var isPlaying = false;
var c = 0;
var begin;

function startCount() {
    begin = new Date();
}

function stopCount() {
    var end = new Date();
    c = end - begin;
}

function jsCallbackReady(player_id) {
    var kdp = document.getElementById(player_id);

    kdp.kBind('afterAd', function() {
        startCount();
    });

    kdp.kBind('playerPlayed', function(data, id) {
        if (!isPlaying) {
            stopCount();
            isPlaying = true;
            eventTrack(cdnType, "start", mediaId, c);
            // Sipru.General.tracker('CDN-TEST', cdnType+':firstPlay:'+c);    
        }
    });

    kdp.kBind('mediaError', function() {
        eventTrack(cdnType, "mediaError", mediaId, 0);
        /*Sipru.General.tracker('CDN-TEST', cdnType+':mediaError:'); */
    });

    kdp.kBind('mediaLoadError', function() {
        eventTrack(cdnType, "mediaLoadError", mediaId, 0);
        /*Sipru.General.tracker('CDN-TEST', cdnType+':mediaLoadError:'); */
    });

    var isBuffering = false;
    kdp.kBind('playerStateChange', function(data, id) {
        if (data == "buffering") {
            if (isPlaying) {
                isBuffering = true;
                startCount();
            }
            //Sipru.General.tracker('CDN-TEST', cdnType+':buffer:');  
        } else {
            if (isPlaying) {
                stopCount();
                if(isBuffering) {
                    eventTrack(cdnType, "buffer", mediaId, c);
                }
                isBuffering = false;
            }
        }
    });

    kdp.kBind('playbackComplete', function(data, id) { /*Sipru.General.tracker('CDN-TEST', cdnType+':Complete:');*/ });
    kdp.kBind('switchingChangeStarted', function(data, id) { /*Sipru.General.tracker('CDN-TEST', cdnType+':Complete:');*/ });
    kdp.kBind('switchingChangeComplete', function(data, id) {
        eventTrack(cdnType, "bitrate", mediaId, data.newBitrate);
        /*Sipru.General.tracker('CDN-TEST', cdnType+':Complete:');*/
    });

    kdp.kBind('doPlay', function() {
        tvyoPlayerEvents('play');
    });
    kdp.kBind('doPause', function() {
        tvyoPlayerEvents('pause');
    });
    kdp.kBind('doStop', function() {
        tvyoPlayerEvents('stop');
    });
}

function eventTrack(cdnType, eventType, videoid, value) {
    window.snowplow('trackStructEvent', cdnType, eventType, videoid, '', value);
}

function loadScript(url, callback) {
    //setTimeout("callback()", 2000);
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;
    //script.onerror = errorFunc;

    // Fire the loading
    head.appendChild(script);
}
