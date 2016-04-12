
var libPath="http://img-dygassets.mncdn.com/player2/plugins/flowplayer/";
var jsPath="http://img-dygassets.mncdn.com/player2/js/";

/*
var libPath="/Content/newplayer/plugins/flowplayer/";
var jsPath="/Content/newplayer/js/";*/

console.log("dygPlayer loaded.");

function DygPlayer(){
         var  divId,mobileUrl,flashUrl,autoPlay,alias,tags,comscore,playerArray,videoCount,flashVersion=0,flashStatus=true,nextPartCallBack="",subTitleFile="",publisherId,referenceId,log,hideAds,hideSurvey,
         autoRedirect,beforeChannelLogo,beforeChannelUrl,channell,channelLogo,clk,clkAlt,countryCode,defaultFlavor,dontShare,dr,exclusiveUrl,inHouse,isSerie,isSocialOn,isUncensored,itemId,
         loginStatus,music,nextChannelLogo,nextChannelUrl,partDuration,partner,performanceMode,playbackDevice,playbackTime,refGo,seedTrackingUrl,seedUrl,selectPart,clearCache,videoRatio,isLive,scaleMode,pathName,playerType,playerTheme,splitParts;  
	
	
	
	
	
    var obj = {


     createPlayer: function(paramss)
     {  
        //console.log(paramss);
		
		console.log("createPlayer()");
		
		
        //loadScript("js/flowplayer-3.2.13.min.js",this.addPlayer);
		this.getFlashVersion();
        this.detectmobile();
		
		 if(flashVersion!=0 ){
			// console.log("asdasd"+flashVersion+flashStatus);
			loadScript(jsPath+"flowplayer-3.2.13.js",this.addPlayer);
		 }else{
			var loadArray=["//vjs.zencdn.net/4.12/video.js", "//imasdk.googleapis.com/js/sdkloader/ima3.js",jsPath+"videojs.ads.js",jsPath+"videojs.ima.js","http://vjs.zencdn.net/4.12/video-js.css"];
			loadMultiScript(loadArray,this.addPlayer,0);
		}
		videoCount = paramss.length
        playerArray = paramss;
   


     },
     addPlayer:function(){
       //mw.setConfig('forceMobileHTML5',true);
	   
	   
	   console.log("addPlayer");
	   
	   
      for(var i=0;i<=videoCount-1;i++){
        divId     =playerArray[i]["divId"];
        playerType=playerArray[i]["playerType"];
        mobileUrl=playerArray[i]["mobileUrl"];
        flashUrl=playerArray[i]["flashUrl"];
        alias=playerArray[i]["alias"];
        tags=playerArray[i]["tags"];
        comscore=playerArray[i]["comscore"];
        autoPlay = playerArray[i]["autoPlay"];  
        parts=playerArray[i]["parts"];
        if(parts=="" || parts == undefined){
          parts = "";
        }
		isLive=false;
		publisherId=playerArray[i]["publisherId"];
        referenceId=playerArray[i]["referenceId"];
        log=playerArray[i]["log"];
        hideAds=playerArray[i]["hideAds"];
        hideSurvey=playerArray[i]["hideSurvey"];
        nextPartCallBack = playerArray[i]["nextPartCallBack"];
        if(nextPartCallBack=="" || nextPartCallBack == undefined){
          nextPartCallBack = "";
        }
        
        subTitleFile = playerArray[i]["subTitleFile"];
        if(subTitleFile=="" || subTitleFile == undefined){
          subTitleFile = "";
        }

        if(flashUrl=="" || flashUrl == undefined){
          flashUrl = "";
        }
        clearCache = playerArray[i]["clearCache"];
        if(clearCache=="" || clearCache == undefined){
          clearCache = "444444";
        }
        hideAds = playerArray[i]["hideAds"];
        if(hideAds=="" || hideAds == undefined){
          hideAds = false;
        }

        autoRedirect=playerArray[i]["autoRedirect"];
        beforeChannelLogo=playerArray[i]["beforeChannelLogo"];
        beforeChannelUrl=playerArray[i]["beforeChannelUrl"];
        channell=playerArray[i]["channell"];
        channelLogo=playerArray[i]["channelLogo"];
        clk=playerArray[i]["clk"];
        clkAlt=playerArray[i]["clkAlt"];
        countryCode=playerArray[i]["countryCode"];
        defaultFlavor=playerArray[i]["defaultFlavor"];
        dontShare=playerArray[i]["dontShare"];
        dr=playerArray[i]["dr"];
        exclusiveUrl=playerArray[i]["exclusiveUrl"];
        inHouse=playerArray[i]["inHouse"];
        isSerie=playerArray[i]["isSerie"];
        isSocialOn=playerArray[i]["publisherId"];
        isUncensored=playerArray[i]["isSocialOn"];
        itemId=playerArray[i]["itemId"];
        loginStatus=playerArray[i]["loginStatus"];
        music=playerArray[i]["music"];
        nextChannelLogo=playerArray[i]["nextChannelLogo"];
        nextChannelUrl=playerArray[i]["nextChannelUrl"];
        partDuration=playerArray[i]["partDuration"];
        partner=playerArray[i]["partner"];
        performanceMode=playerArray[i]["performanceMode"];
        playbackDevice=playerArray[i]["playbackDevice"];
        playbackTime=playerArray[i]["playbackTime"];
        refGo=playerArray[i]["refGo"];
        seedTrackingUrl=playerArray[i]["seedTrackingUrl"];
        seedUrl=playerArray[i]["seedUrl"];
        selectPart=playerArray[i]["selectPart"];
		playerType=playerArray[i]["playerType"];
		playerTheme=playerArray[i]["playerTheme"];

        videoRatio = playerArray[i]["videoRatio"];
		splitParts=0;
		var usePartition=0;
		
		
		if(parts!=""){
			usePartition=1;
			splitParts=1;
        }

        if(videoRatio=="" || videoRatio == undefined){
          videoRatio = false;
        }
		
		if(videoRatio==true){
			scaleMode='fit';
		}else{
			scaleMode='scale';
		}
		
		var controlName="flowplayer.controls-3.2.16.swf";
		
		if(playerTheme=="vogue"){
			controlName="flowplayer.controls-vogue-3.2.16.swf";
		}
		
      
		pathName=window.location.pathname;
		
		


   var uiConfId = "11729381";
     try{
	   if(DygDFP){  }
	   }catch(e){
			console.log("Error: dygBase not loaded");
			DygDFP = {
			siteName: "-",
			section: "-",
			customParam: function(){
				return '-';
			}
			}
   }
   var sendPlayEvent=false; // Play eventini birden fazla çağırmamayı sağlamak için eklendi
		
		
		/* HTML PLAYER *****************************************************/
         if(flashVersion==0 || flashStatus){
				/*
				document.getElementById(divId).innerHTML = "<video width=\"100%\" height=\"100%\"  autoplay=\"true\" controls x-webkit-airplay=\"allow\" id=\""+divId+"_pl"+"\"><source src="+mobileUrl+"></video>";
				
				return;*/
				document.getElementById(divId).innerHTML = "<video id=\""+divId+"_1\" class=\"video-js vjs-default-skin vjs-big-play-centered\" controls preload=\"auto\"  width=\"100%\" height=\"100%\" poster=\"MY_VIDEO_POSTER.jpg\" data-setup=\"{}\"><source src=\""+mobileUrl+"\" type='video/mp4'><p class=\"vjs-no-js\">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href=\"http://videojs.com/html5-video-support/\" target=\"_blank\">supports HTML5 video</a></p></video>";
				console.log("den01");
				
				//document.getElementById(divId).innerHTML = "<video width=\"100%\" height=\"100%\" class=\"video-js vjs-default-skin\"  autoplay=\"true\" controls id=\""+divId+"_1"+"\"><source src="+mobileUrl+"></video>";
				
				divId=divId+"_1";
				var player = videojs(divId);
				 var myFunc = function(){
					var player = this;
					console.log("fullscreen");
					// Do something when the event is fired
					//$('#container-nav').toggleClass('fullscreen-ie');
					//$('#scroll-top').toggleClass('fullscreen-ie');
				};
				player.on("fullscreenchange", myFunc);
				//return;
				
				
								 //console.log("001");
								var options = {
								  id: divId,
								  adTagUrl:"https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/37011203/Web/"+DygDFP.siteName+"/"+DygDFP.section+"/PRE&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator="+Date.now()+"&cust_params="+DygDFP.customParam()+"%26playerType%3DhtmlPlayer",
								  locale:"tr"
								  /*
								  adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&' +
									  'iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&' +
									  'impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&' +
									  'cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&' +
									  'vid=short_onecue&correlator='*/
								};
					// console.log("002");
								player.ima(options);
 console.log("003");
								// Remove controls from the player on iPad to stop native controls from stealing
								// our click
								var contentPlayer =  document.getElementById(divId+'_html5_api');
								if ((navigator.userAgent.match(/iPad/i) ||
									  navigator.userAgent.match(/Android/i)) &&
									contentPlayer.hasAttribute('controls')) {
								  contentPlayer.removeAttribute('controls');
								}
								console.log("004");
								// Initialize the ad container when the video player is clicked, but only the
								// first time it's clicked.
								var clickedOnce = false;
								
								 console.log("005");			
								var startEvent = 'click';
								
								
								 console.log("006");	
								if (navigator.userAgent.match(/iPhone/i) ||
									navigator.userAgent.match(/iPad/i) ||
									navigator.userAgent.match(/Android/i)) {
								  startEvent = 'tap';
								}
								
								
								 console.log("007");	
								 
								 
								player.on(startEvent, function() {
									
									console.log("--0001");
									
									if (!clickedOnce) {
									 
									  player.ima.initializeAdDisplayContainer();
									  player.ima.requestAds();
									  player.play();
									  clickedOnce = true;
									}
								});

								 console.log("008");	
				
				
				
				
				return;
		 };
			
		/* HTML PLAYER END *****************************************************/

      switch(playerType){
          case "vod":
            uiConfId = "11729381";
           break;
           case "live":
            uiConfId= "20952162";
			isLive=true;
           break;
           case "tvyolive":
            uiConfId= "10439471";
           break;
           case "tvyovod":
            uiConfId= "27147171";
           break;
           default:
            uiConfId = "11729381";
            break;

      }
              log:"true"
						//*********************************************************
						
						console.log("flashPlayer "+divId);
						
						f= $f(divId,  {
        src : libPath+"flowplayer.commercial-3.2.18.swf?v1222",
        wmode: 'opaque'}, {
    key:"#$9c843ebad2017d3c0ba",
      canvas: {
        backgroundColor:'#000000',
        backgroundGradient: 'none',
		width:940
    },
    clip: {
			url: flashUrl,
			referanceID:referenceId,
			PublisherId:publisherId, 
			provider:'dygprovider',
			scaling: scaleMode,
			test:'deneme',
			urlResolvers:null, 
			usePartition:usePartition,	
			splitVideo:splitParts,
			partDuration: '20', //dakika
			currentPart: parts,
			nextPartCallBack:nextPartCallBack,
			autoPlay: false, //test
			live: isLive,

			adLib:[
				{
					time:420,
					adURL:encodeURIComponent("https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/37011203/Web/"+DygDFP.siteName+"/"+DygDFP.section+"/MID&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator="+Date.now()+"&cust_params="+DygDFP.customParam()+"%26playerType%3DflashPlayer")
											
				},
				{
					time:-1,
					adURL:encodeURIComponent("https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/37011203/Web/"+DygDFP.siteName+"/"+DygDFP.section+"/POST&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator="+Date.now()+"&cust_params="+DygDFP.customParam()+"%26playerType%3DflashPlayer")
				},
				{
					time:20,
					adURL:encodeURIComponent("https://pubads.g.doubleclick.net/gampad/ads?sz=480x70&iu=/37011203/Web/"+DygDFP.siteName+"/"+DygDFP.section+"/OVER&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator="+Date.now()+"&cust_params="+DygDFP.customParam()+"%26playerType%3DflashPlayer")
					//closeButton:true
				},
				{
					time:0,
					adURL:encodeURIComponent("https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/37011203/Web/"+DygDFP.siteName+"/"+DygDFP.section+"/PRE&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator="+Date.now()+"&cust_params="+DygDFP.customParam()+"%26playerType%3DflashPlayer")
					
				}
			],
			start: '0',
			duration:'0',
			onStart: function(clip) {
				if(sendPlayEvent){
					return;
				}
				sendPlayEvent=true;
				console.log("---Start---"+pathName);
				
				try {
					_gaq.push(['_trackEvent', 'Videos', 'Play', pathName]);
					gemius_hit("Play"+"/"+pathName);	
				}
				catch(err) {
					document.getElementById("demo").innerHTML = err.message;
				}
			},
			
			onPause: function(clip) {
				//_gaq.push(['_trackEvent', 'Videos', 'Pause', pathName]);
			}
    },
	
	play: {
		 opacity: 1,
		 replayLabel:null,
		 label: playerTheme
	},
	
    plugins: {
			
			dygprovider: {
				url: libPath+"flowplayer.dyg-video-provider-1.0.0.swf?34121vs1s11"
			},
			
			f4m: { 
				url: libPath+"flowplayer.f4m-3.2.10.swf?11v1s1" 
			},
			
			flashls: { 
				url: libPath+"flashlsFlowPlayer-0.4.0.7.swf?v11",
				hls_debug: false,
				  hls_debug2: false,
				  hls_lowbufferlength: 3,
				  hls_minbufferlength: 8,
				  hls_maxbufferlength: 60,
				  hls_startfromlowestlevel: true,
				  hls_seekfromlowestlevel: true,
				  hls_live_flushurlcache: false,
				  hls_seekmode: 'ACCURATE',
				  hls_capleveltostage: false,
				  hls_maxlevelcappingmode: 'downscale'
			},
			
			smil: {
				url: libPath+"flowplayer.smil-3.2.9.swf?v1"
			},
			httpstreaming: { url: libPath+"flowplayer.httpstreaming-3.2.11.swf?31212321v111" },
			hddn: {
				url: libPath+"flowplayer.rtmp-3.2.13.swf?v1"				
			},
			bwcheck: {
				url: libPath+"flowplayer.bwcheck_httpstreaming-3.2.13.swf?1221v111",
				dynamic: true,
				rememberBitrate:true,
				bitrateProfileName:'ntvspor',
				qos:{frames: false, screen: false},
				netConnectionUrl: "http://img-dygassets.mncdn.com/player2/plugins/flowplayer/flashlsFlowPlayer-0.4.0.7.swf?1",
				checkOnStart:true		 
			},
            controls: {
				url: libPath+controlName+"?11c1vs11"
			},			
			ima: {
				url: libPath+"flowplayer.ima-2.0.0.swf?2121v12s111s",
				test:"deneme2",
				onError: function (errorItem) {
					_gaq.push(['_trackEvent', 'Videos', 'AdBlocked', pathName]);
				   console.log("Ad Blocked! " + errorItem);
				}
			},
			comscore: {
				url: libPath+"flowplayer.comscore-1.0.0.swf?21",
				nameTag:comscore
			},
			partition: {
				url: libPath+'flowplayer.partition-1.0.00.swf?v11',
	 
				buttons: {
					'overColor': '#ff0000'
				},
				part: {
					'description':'index.php?part=',
					'shareWindow': '_self'
				}
			}
			/*
			nginx: {
				url: libPath+"flowplayer.pseudostreaming-3.2.13.swf?1"
			}
			/*
			'partition': {
				'url': '../plugins/flowplayer/flowplayer.partition-1.0.00.swf?v1',
	 
				'buttons': {
					'overColor': '#ff0000'
				},
				'part': {
					'description':'index.php?part=',
					'shareWindow': '_self',
					'partDuration': '20', //dakika
					'partCount': '3' ,
					'splitVideo':'<?php=$splitVideo?>',
					'currentPart': '<?php=$curPart?>'
				},
	 
				'twitter': false
			}*/
			/*,'redirectlastview': {
				'url': '../plugins/flowplayer/flowplayer.redirectlastview-1.0.00.swf?v1',
				'splitVideo':'<?php=$splitVideo?>'
			}*/
	}
});
//}).ipad(); // sets up the player on iOS
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						/*
                        kWidget.embed({
                            "targetId": divId,
                            "cache_st": 888889,  // player xml gÃ¼ncellemek iÃ§in random bir deÄŸer.
                            "wid": "_990652",
                            "uiconf_id": uiConfId,
                         "flashvars": {
                           //"kml":"local",
                            //"kmlPath": 'http://ilhan.local/tvyo/test/kaltura/config.xml',
                             entryId: flashUrl,//'http://startv.motiwecdn.com/startv/_definst_/mp4:startv/StarTV/Tanitim/miniplayer/kardepayi_29bolum_fragmani_2145r.mp4/manifest.f4m?e11b3501178b61b39327ddbaf0f1382abd05b815ab42199508e1cad6e53a87633bf76528aa98499c5311d40a48306387&amp;v=1', //harici video url 
                             sourceType: 'url', //harici video url eklendiÄŸinde bu parametre gÃ¶nderilir.
                             //   ks: 'NGM5NDk1MmUwYzI1OGY0M2EyNzM4YzcxMTk2NmZhYmVkOWUxZTYyMnw5OTA2NTI7OTkwNjUyOzE0MTAzMzc4MjQ7MDs0NzExO0thbHR1cmFVc2VyO3N2aWV3Oio',
                             'video.keepAspectRatio':videoRatio,
                            autoPlay: autoPlay,
                             streamerType: 'hdnetworkmanifest',
                             'akamaiHD.loadingPolicy': 'preInitialize',
                             'akamaiHD.asyncInit': true,
                             preloaderPath: 'http://static.tvyo.com/player/preloader_n.swf',
                             centerPreloader: true,
                             channell:channell, // logo yerleÅŸimi iÃ§in kanal ismi
                             alias:alias, //videoplaza alias
                             tags:tags, //videoplaza tags  
                             twoPhaseManifest: true,
                             hide_ads:hideAds,
                             is_serie:1,
                             nextPartCallBack:nextPartCallBack,
                             comscore: comscore,
                             selectPart:parts,
                             PublisherId:publisherId,
                             ReferenceId:referenceId,
                             subTitleFile:subTitleFile,
                             autoRedirect:autoRedirect,
                             beforeChannelLogo:beforeChannelLogo,
                             beforeChannelUrl:beforeChannelUrl,
                             channell:channell,
                             channelLogo:channelLogo,
                             clk:clk,
                             clkAlt:clkAlt,
                             countryCode:countryCode,
                             defaultFlavor:defaultFlavor,
                             dontShare:dontShare,
                             dr:dr,
                             exclusiveUrl:exclusiveUrl,
                             inHouse:inHouse,
                             isSerie:isSerie,
                             isSocialOn:isSocialOn,
                             isUncensored:isUncensored,
                             itemId:itemId,
                             loginStatus:loginStatus,
                             music:music,
                             nextChannelLogo:nextChannelLogo,
                             nextChannelUrl:nextChannelUrl,
                             partDuration:partDuration,
                             partner:partner,
                             performanceMode:performanceMode,
                             playbackDevice:playbackDevice,
                             playbackTime:playbackTime,
                             refGo:refGo,
                             seedTrackingUrl:seedTrackingUrl,
                             seedUrl:seedUrl,
                             log:"log"
                         },'params':{ // params allows you to set flash embed params such as wmode, allowFullScreen etc
                           'wmode': 'transparent' 
                          }

                        });*/
						
						
						//********************************************************
							//flashStatus=false;
                            if(flashVersion==0 || flashStatus){
								console.log("flashVersion"+flashVersion+" flashStatus"+mobileUrl)
								//document.getElementById(divId).innerHTML ="okkkkk";
                                //document.getElementById(divId).innerHTML = "<video width=\"100%\" height=\"100%\"  autoplay=\"true\" controls x-webkit-airplay=\"allow\" id=\""+divId+"_pl"+"\"><source src="+mobileUrl+"></video>"
								//VIDEO.JS
								
								//divID="content_video";
								document.getElementById(divId).innerHTML = "<video id=\""+divId+"\" class=\"video-js vjs-default-skin vjs-big-play-centered\" controls preload=\"auto\"  width=\"100%\" height=\"100%\" poster=\"MY_VIDEO_POSTER.jpg\" data-setup=\"{}\"><source src=\""+mobileUrl+"\" type='video/mp4'><p class=\"vjs-no-js\">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href=\"http://videojs.com/html5-video-support/\" target=\"_blank\">supports HTML5 video</a></p></video>";
								
								
								
								
								var player = videojs(divId);
								 console.log("001");
								var options = {
								  id: divId,
								  adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&' +
									  'iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&' +
									  'impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&' +
									  'cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&' +
									  'vid=short_onecue&correlator='
								};
					 console.log("002");
								player.ima(options);
 console.log("003");
								// Remove controls from the player on iPad to stop native controls from stealing
								// our click
								var contentPlayer =  document.getElementById(divId+'_html5_api');
								if ((navigator.userAgent.match(/iPad/i) ||
									  navigator.userAgent.match(/Android/i)) &&
									contentPlayer.hasAttribute('controls')) {
								  contentPlayer.removeAttribute('controls');
								}
 console.log("004");
								// Initialize the ad container when the video player is clicked, but only the
								// first time it's clicked.
								var clickedOnce = false;
								
								 console.log("005");			
								var startEvent = 'click';
								
								
								 console.log("006");	
								if (navigator.userAgent.match(/iPhone/i) ||
									navigator.userAgent.match(/iPad/i) ||
									navigator.userAgent.match(/Android/i)) {
								  startEvent = 'tap';
								}
								
								
								 console.log("007");	
								 
								 
								player.on(startEvent, function() {
									
									console.log("--0001");
									
									if (!clickedOnce) {
									 
									  player.ima.initializeAdDisplayContainer();
									  player.ima.requestAds();
									  player.play();
									  clickedOnce = true;
									}
								});

								 console.log("008");	

									

							}
							
							
							

        }
     },
     detectmobile:function() { 
       if( navigator.userAgent.match(/Android/i)
       || navigator.userAgent.match(/webOS/i)
       || navigator.userAgent.match(/iPhone/i)
       || navigator.userAgent.match(/iPad/i)
       || navigator.userAgent.match(/iPod/i)
       || navigator.userAgent.match(/BlackBerry/i)
       || navigator.userAgent.match(/Windows Phone/i)
       ){
          flashStatus =  true;
        }
       else {
          flashStatus = false;
        }
      },
    getFlashVersion:function(){
          // ie
         
          try {
            try {
              // avoid fp6 minor version lookup issues
              // see: http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
              var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
              try { axo.AllowScriptAccess = 'always'; }
              catch(e) { flashVersion = '6,0,0'; }
            } catch(e) {}
            flashVersion =  new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
          // other browsers
          } catch(e) {
            try {
              if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
                flashVersion = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
              }
            } catch(e) {}
          }
          //flashVersion = '0,0,0';
        },


  };


  return obj;
}

function loadScript(url, callback)
{
  
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}



function loadMultiScript(array, callback,loadCount)
{
	
//	console.log("loadscript "+loadCount	);
  
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
	
	if(loadCount==array.length-1){
			var fileref = document.createElement("link")
			fileref.setAttribute("rel", "stylesheet")
			fileref.setAttribute("type", "text/css")
			fileref.setAttribute("href", array[loadCount]);
			document.getElementsByTagName("head")[0].appendChild(fileref);
			
			var fileref2 = document.createElement("link")
			fileref2.setAttribute("rel", "stylesheet")
			fileref2.setAttribute("type", "text/css")
			fileref2.setAttribute("href", jsPath+"videojs-dygplayer.css?1");
			document.getElementsByTagName("head")[0].appendChild(fileref2);
			
			var fileref2 = document.createElement("link")
			fileref2.setAttribute("rel", "stylesheet")
			fileref2.setAttribute("type", "text/css")
			fileref2.setAttribute("href", jsPath+"videojs.ima.css");
			document.getElementsByTagName("head")[0].appendChild(fileref2);
			
			complateScript(callback);
			return;
	}
	
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = array[loadCount];

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
   // script.onreadystatechange = callback;
     script.onreadystatechange= script.onload = function(){
		//console.log("loaded "+loadCount+" "+array.length);
		loadCount+=1;
		if(loadCount<array.length){
			loadMultiScript(array,callback,loadCount);
		};		
	};

    // Fire the loading
    head.appendChild(script);
}

function complateScript(callback){
	//console.log("Script Complete!");
	callback();
}