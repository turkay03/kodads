var libPath="//img-dygassets.mncdn.com/player2/plugins/flowplayer/";
var jsPath="//img-dygassets.mncdn.com/player2/js/";

var  divId,mobileUrl,flashUrl,autoPlay,alias,tags,comscore,playerArray,videoCount,flashVersion=0,flashStatus=true,nextPartCallBack="",subTitleFile="",publisherId,referenceId,log,hideAds,hideSurvey,
         autoRedirect,beforeChannelLogo,beforeChannelUrl,channell,channelLogo,clk,clkAlt,countryCode,defaultFlavor,dontShare,dr,exclusiveUrl,inHouse,isSerie,isSocialOn,isUncensored,itemId,
         loginStatus,music,nextChannelLogo,nextChannelUrl,partDuration,partner,performanceMode,playbackDevice,playbackTime,refGo,seedTrackingUrl,seedUrl,selectPart,clearCache,videoRatio,/*new params*/isLive,scaleMode,pathName,playerType,playerTheme,splitParts,usePartition,controlName,urlPath/*new params*/;  

		 
		 flashUrl="";
		 referenceId="";
		 publisherId="";
		 scaleMode="";
		 usePartition="";
		 splitParts="";
		 parts="";
		 nextPartCallBack="";
		 autoPlay="";
		 isLive="";
		 hideAds="";
		 pathName="";
		 urlPath="";
		 
									 
                                        playerType= "vod";
                                        mobileUrl= "http://ntvspor-p.mncdn.com/f3/NTVSpor_effa4277-ae27-4911-8af6-e63ee6b837fc_f3.mp4?token=9af35de9c3c5b6d0a3418a79e2e836f86d12af5f0634fbc1";
                                        flashUrl= "";
                                        alias= "20";
                                        tags= "Tivibu,Futbol,Ana Sayfa,Futbol,Spor Toto Süper Lig,Beşiktaş,Dünyadan Futbol,İngiltere";
                                        comscore= "ntvspor";
                                        parts= "";
                                        publisherId= 13; //Publish ID yazılacak
                                        referenceId= "NTVSpor_effa4277-ae27-4911-8af6-e63ee6b837fc";
                                        autoPlay= true;
                                        log= true;
                                        videoRatio= true;
                                     
                                        hideAds= false;
                                        
                                        hideSurver= false;
                                        nextPartCallBack= "changeParts";

		 
		 {
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
										/*
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
											
										}*/
										{
											time:0,
											adURL:encodeURIComponent("https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/37011203/Web/NTVSpor/Test/VID&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&cmsid=1963&vid="+referenceId+"&url=[referrer_url]&description_url=[description_url]&correlator="+Date.now()+"&cust_params=playerType%3DflashPlayer&ad_rule=1")
											//adURL:encodeURIComponent("https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/37011203/Web/NTVSpor/Test/VID&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&cmsid=1983&vid="+referenceId+"&url=[referrer_url]&description_url=[description_url]&correlator="+Date.now()+"&cust_params=playerType%3DflashPlayer")
											
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
									bitrateProfileName:comscore,
									qos:{frames: false, screen: false},
									netConnectionUrl: "http://img-dygassets.mncdn.com/player2/plugins/flowplayer/flashlsFlowPlayer-0.4.0.7.swf?1",
									checkOnStart:true		 
								},
								controls: {
									url: libPath+controlName+"?11c1vs11"
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
						}
						 
						 
						 
/*
{
    'plugins': {
        'sharing': {
            'url': 'flowplayer.sharing-3.2.15.swf'
        }
    },
    'clip': {
        'url': 'http://stream.flowplayer.org/Extremists.flv',
        'pageUrl': 'http://flowplayer.org/demos/plugins/flash/sharing.html'
    }
}*/
