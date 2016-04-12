
var libPath="//img-dygassets.mncdn.com/player2/plugins/flowplayer/";
var jsPath="//img-dygassets.mncdn.com/player2/js/";
var useFlowplayer=false; //flowplayer geçişi için değişken 

function DygPlayer(){
         var  divId,mobileUrl,flashUrl,autoPlay,alias,tags,comscore,playerArray,videoCount,flashVersion=0,flashStatus=true,nextPartCallBack="",subTitleFile="",publisherId,referenceId,log,hideAds,hideSurvey,
         autoRedirect,beforeChannelLogo,beforeChannelUrl,channell,channelLogo,clk,clkAlt,countryCode,defaultFlavor,dontShare,dr,exclusiveUrl,inHouse,isSerie,isSocialOn,isUncensored,itemId,
         loginStatus,music,nextChannelLogo,nextChannelUrl,partDuration,partner,performanceMode,playbackDevice,playbackTime,refGo,seedTrackingUrl,seedUrl,selectPart,clearCache,videoRatio,/*new params*/isLive,scaleMode,pathName,playerType,playerTheme,splitParts,usePartition,controlName,urlPath/*new params*/;  

	


    var obj = {


     createPlayer: function(paramss)
     {  
        //console.log(paramss);
		
		
		videoCount = paramss.length
        playerArray = paramss;
        this.getFlashVersion();
        this.detectmobile();
		
		//comscore parametresine göre flowplayer kullanıp kullanmayacağına karar veriyoruz.
		useFlowplayer=switchPlayer(playerArray[0]["comscore"]);
		
		if(!useFlowplayer){
			loadScript("http://cdnapi.kaltura.com/html5/html5lib/v2.28/mwEmbedLoader.php",this.addPlayer);
		   // http://cdnapi.kaltura.com/html5/html5lib/v2.27.1/mwEmbedLoader.php
		}else{			
			if(flashVersion!=0 ){
				loadScript(jsPath+"flowplayer-3.2.13.2.js",this.addPlayer);
			 }else{
				var loadArray=["//vjs.zencdn.net/4.12/video.js", "//imasdk.googleapis.com/js/sdkloader/ima3.js",jsPath+"videojs.ads.js",jsPath+"videojs.ima.js","//vjs.zencdn.net/4.12/video-js.css"];
				loadMultiScript(loadArray,this.addPlayer,0);
			}
		}

     },
     addPlayer:function(){
       //mw.setConfig('forceMobileHTML5',true);
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
		urlPath=playerArray[i]["urlPath"];

        videoRatio = playerArray[i]["videoRatio"];

        if(videoRatio=="" || videoRatio == undefined){
          videoRatio = false;
        }
		
		//flowplayer params begin
		playerTheme = playerArray[i]["playerTheme"];
		if(parts!=""){
			usePartition=1;
			splitParts=1;
        }
		
		if(videoRatio==true){
			scaleMode='fit';
		}else{
			scaleMode='scale';
		}
		controlName="flowplayer.controls-3.2.16.swf";
		if(playerTheme=="vogue"){
			controlName="flowplayer.controls-vogue-3.2.16.swf";
		}
		pathName=window.location.pathname;
		 var sendPlayEvent=false;
        
		//DFP eğer yüklenmediyse ya da yoksa hataya düşmesini engelle
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
		
		//flowplayer params end


   var uiConfId = "11729381";


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
          case "vouge":
            uiConfId= "29873821";
           break;
           default:
            uiConfId = "11729381";
            break;

      }
              log:"true"

					if(!useFlowplayer){
					//KALTURA PLAYER BEGIN**********************
					
                        kWidget.embed({
                            "targetId": divId,
                            "cache_st": 888889,  // player xml gÃƒÂ¼ncellemek iÃƒÂ§in random bir deÃ„Å¸er.
                            "wid": "_990652",
                            "uiconf_id": uiConfId,
                         "flashvars": {
                           //"kml":"local",
                            //"kmlPath": 'http://ilhan.local/tvyo/test/kaltura/config.xml',
                             entryId: flashUrl,//'http://startv.motiwecdn.com/startv/_definst_/mp4:startv/StarTV/Tanitim/miniplayer/kardepayi_29bolum_fragmani_2145r.mp4/manifest.f4m?e11b3501178b61b39327ddbaf0f1382abd05b815ab42199508e1cad6e53a87633bf76528aa98499c5311d40a48306387&amp;v=1', //harici video url 
                             sourceType: 'url', //harici video url eklendiÃ„Å¸inde bu parametre gÃƒÂ¶nderilir.
                             //   ks: 'NGM5NDk1MmUwYzI1OGY0M2EyNzM4YzcxMTk2NmZhYmVkOWUxZTYyMnw5OTA2NTI7OTkwNjUyOzE0MTAzMzc4MjQ7MDs0NzExO0thbHR1cmFVc2VyO3N2aWV3Oio',
                             'video.keepAspectRatio':videoRatio,
                            autoPlay: autoPlay,
                             streamerType: 'hdnetworkmanifest',
                             'akamaiHD.loadingPolicy': 'preInitialize',
                             'akamaiHD.asyncInit': true,
                             preloaderPath: 'http://static.tvyo.com/player/preloader_n.swf',
                             centerPreloader: true,
                             channell:channell, // logo yerleÃ…Å¸imi iÃƒÂ§in kanal ismi
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

                        });
						 if(flashVersion==0 || flashStatus){
                                document.getElementById(divId).innerHTML = "<video width=\"100%\" height=\"100%\"  autoplay=\"true\" controls x-webkit-airplay=\"allow\" id=\""+divId+"_pl"+"\"><source src="+mobileUrl+"></video>"
                         }
						
						//KALTURA  PLAYER END**************************************
						
					
						
						}else{
							
						//FLOWPLAYER
						/* VIDEOJS HTML PLAYER *****************************************************/
						 if(flashVersion==0 || flashStatus){
							 
								
								//IPHONE ise videojs yükleme
								if(navigator.userAgent.match(/iPhone/i)){
									  document.getElementById(divId).innerHTML = "<video width=\"100%\" height=\"100%\"  autoplay=\"true\" controls x-webkit-airplay=\"allow\" id=\""+divId+"_pl"+"\" style=\"width:100%;height:100%;\"><source src="+mobileUrl+"></video>";
								
								}else{
									
								var autoPlayAdd="";
								if(autoPlay){								
									autoPlayAdd="autoplay=\"true\"";
								}
								autoPlayAdd=""; //autoplay disabled

								document.getElementById(divId).innerHTML = "<video  width=\"100%\" height=\"100%\" "+autoPlayAdd+" id=\""+divId+"_1\" class=\"video-js vjs-default-skin vjs-big-play-centered\" controls preload=\"auto\"  data-setup=\"{}\"><source src=\""+mobileUrl+"\" type='video/mp4'><p class=\"vjs-no-js\">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href=\"http://videojs.com/html5-video-support/\" target=\"_blank\">supports HTML5 video</a></p></video>";
								console.log("den01");
											
										divId=divId+"_1";
										var player = videojs(divId).ready(function(){
											try {
											 if(onLoadCallback){
											   onLoadCallback();
										   }
											}catch(err) {
											}
										});;
										
										 player.on("firstplay", function() {
													 	try {
															_gaq.push(['_trackEvent', 'Videos', 'Play (HTML)', pathName]);
															gemius_hit("Play"+"/"+pathName);	
														}
														catch(err) {
														}
														if(document.domain=="www.ntv.com.tr"){
															try {//NTV
																ga('ntvcomtr.send', 'event', 'Videos', 'Play (HTML)',pathName);
															}
															catch(err){
																console.log("GA not found");
															}
														}
										});
										
										//DFP ----
										var options = {
												  id: divId,
												  adTagUrl:"https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/37011203/Web/"+DygDFP.siteName+"/"+DygDFP.section+"/PRE&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator="+Date.now()+"&cust_params="+DygDFP.customParam()+"%26playerType%3DhtmlPlayer&ad_rule=0",
												  locale:"tr"
												};
										
										player.ima(options);
										// Remove controls from the player on iPad to stop native controls from stealing
										// our click
										var contentPlayer =  document.getElementById(divId+'_html5_api');
										if ((navigator.userAgent.match(/iPad/i) ||
										    navigator.userAgent.match(/Android/i)) &&
											contentPlayer.hasAttribute('controls')) {
											contentPlayer.removeAttribute('controls');
										}
										// Initialize the ad container when the video player is clicked, but only the
										// first time it's clicked.
										var clickedOnce = false;
										var startEvent = 'click';
										if (navigator.userAgent.match(/iPhone/i) ||
											navigator.userAgent.match(/iPad/i) ||
											navigator.userAgent.match(/Android/i)) {
										    startEvent = 'tap';
										}
										
										console.log("startEvent");
										
										
										player.on(startEvent, function() {
											console.log(startEvent);
											if (!clickedOnce) {
										        player.ima.initializeAdDisplayContainer();
												player.ima.requestAds();
												player.play();
												clickedOnce = true;
											}
										});
										//DFP ----
										
										
									}
										
										
										
										return;
											/* HTML PLAYER END *****************************************************/
					 }
					/* HTML PLAYER END *****************************************************/
							
							try{
							//document.getElementById(divId).style.backgroundImage = "url('http://img-dygassets.mncdn.com/player/embed/play_2.png'),url('"+posterUrl+"')";
								document.getElementById(divId).style.backgroundImage = "url('http://img-dygassets.mncdn.com/player/embed/play_2.png'),url('"+posterUrl+"')";
							}catch(e){
								
							}
							
							//FLOWPLAYER BEGIN ******************************
							 f= $f(divId,  {
								src : libPath+"flowplayer.commercial-3.2.18.swf?v1222",
								wmode: 'opaque'}, {
							key:getKey(comscore),
							  canvas: {
								backgroundColor:'#000000',
								backgroundGradient: 'none',
								width:940
							},
							onError: function(errorCode,errorMessage) {
								try {
									_gaq.push(['_trackEvent', 'Videos', 'Error ('+errorCode+')', pathName]);
								}
								catch(err) {
								}
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
									forceAutoPlay:autoPlay,
									live: isLive,
									hideAds:hideAds,

									adLib:[
										{
											time:420,
											adURL:encodeURIComponent("https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/37011203/Web/"+DygDFP.siteName+"/"+DygDFP.section+"/MID&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator="+Date.now()+"&cust_params="+DygDFP.customParam()+"%26playerType%3DflashPlayer&ad_rule=0")
																	
										},
										{
											time:-1,
											adURL:encodeURIComponent("https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/37011203/Web/"+DygDFP.siteName+"/"+DygDFP.section+"/POST&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator="+Date.now()+"&cust_params="+DygDFP.customParam()+"%26playerType%3DflashPlayer&ad_rule=0")
										},
										{
											time:20,
											adURL:encodeURIComponent("https://pubads.g.doubleclick.net/gampad/ads?sz=480x70&iu=/37011203/Web/"+DygDFP.siteName+"/"+DygDFP.section+"/OVER&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator="+Date.now()+"&cust_params="+DygDFP.customParam()+"%26playerType%3DflashPlayer&ad_rule=0")
											//closeButton:true
										},
										{
											time:0,
											adURL:encodeURIComponent("https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/37011203/Web/"+DygDFP.siteName+"/"+DygDFP.section+"/PRE&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator="+Date.now()+"&cust_params="+DygDFP.customParam()+"%26playerType%3DflashPlayer&ad_rule=0")
											
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
										
										var playTag="Play";
										if(comscore=="embed"){
											playTag="Play (Twitter/Flash)";
											pathName=urlPath;
										}
										try {
											
											console.log("Videos-"+playTag+"-"+pathName);
											_gaq.push(['_trackEvent', 'Videos', playTag, pathName]);
											gemius_hit("Play"+"/"+pathName);	
										}
										catch(err) {
											//document.getElementById("demo").innerHTML = err.message;
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
									url: libPath+"flowplayer.dyg-video-provider-1.0.0.swf?v12"
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
									bitrateProfileName:comscore,
									qos:{frames: false, screen: false},
									netConnectionUrl: "http://img-dygassets.mncdn.com/player2/plugins/flowplayer/flashlsFlowPlayer-0.4.0.7.swf?1",
									checkOnStart:true		 
								},
								controls: {
									url: libPath+controlName+"?v12"
								},			
								ima: {
									url: libPath+"flowplayer.ima-2.0.0.swf?123",
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
								}
							});
						 }
						 //FLOWPLAYER END******************************************
        
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

//flowplayer kullanımını kontrol eden fonksiyon
function switchPlayer(tag){
	
	//ntv.com.tr staging test
	if(document.domain=="test.ntv.com.tr"){
		return true;
	}
	
	if(document.domain=="staging.kralmuzik.com.tr"){
		return true;
	}
	
	if(document.domain=="test.startv.com.tr"){
		return true;
	}

	if(document.domain=="vogue.com.tr"){
		return false;
	}
	// tag=="kraltvpopcanli" || tag=="kraltvcanli" || tag=="kraltvworldcanli" ||
	if(tag=="ntvspor" || tag=="cnbce" || tag=="cnbceFinans" || tag=="kralmuzik" || tag=="vogue" || tag=="kraltvworldcanli" || tag=="kraltvpopcanli" || tag=="kraltvcanli" || tag=="startv" || tag=="embed"){
		return true;
	}else{
		return false;
	}
}

//HTML player'a geçiş için Video.js dosyalarını yükleyen fonksiyon
function loadMultiScript(array, callback,loadCount)
{

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
			fileref2.setAttribute("href", jsPath+"videojs-dygplayer.css");
			document.getElementsByTagName("head")[0].appendChild(fileref2);
			
			var fileref2 = document.createElement("link")
			fileref2.setAttribute("rel", "stylesheet")
			fileref2.setAttribute("type", "text/css")
			fileref2.setAttribute("href", jsPath+"videojs.ima.css");
			document.getElementsByTagName("head")[0].appendChild(fileref2);

			
			completeScript(callback);
			return;
	}
	
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = array[loadCount];


     script.onreadystatechange= script.onload = script.onerror= function(){
		loadCount+=1;
		if(loadCount<array.length){
			loadMultiScript(array,callback,loadCount);
		};		
	};

    head.appendChild(script);
}

function completeScript(callback){
	//console.log("Script Complete!");
	callback();
}

//flowplayer key
function getKey(tag){
	
	var dkey='';
	switch(tag) {
		case 'ntvspor':
			dkey='#$9c843ebad2017d3c0ba';
			break;
		case 'startv':
			dkey='#$b7fea7222fcf06cf04b';
			break;
		case 'cnbce':
			dkey='#$ac197552d1cd59cf6c7';
			break;
		case 'ntv':
			dkey='#$18e93daecd7dae4e148';
			break;
		case 'cnbceFinans':
			dkey='#$5604456827a97a5e29f';
			break;	
		case 'kralmuzik':
			dkey='#$8b5095e0c66bf3d138a';
			break;	
		case 'kraltvpopcanli':
			dkey='#$8b5095e0c66bf3d138a';
			break;		
		case 'kraltvcanli':
			dkey='#$8b5095e0c66bf3d138a';
			break;		
		case 'kraltvworldcanli':
			dkey='#$8b5095e0c66bf3d138a';
			break;		
		case 'embed':
			dkey='#$9b281cad8721ac0ff62';
			break;	
		default:
			dkey='#$9c843ebad2017d3c0ba';
	}
	return dkey;
}