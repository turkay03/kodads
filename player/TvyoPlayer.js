var c = 0;
var  divId,mobileUrl,flashUrl,autoPlay,alias,tags,comscore,playerArray,videoCount,flashVersion=0,flashStatus=true,nextPartCallBack="",subTitleFile="",publisherId,referenceId,log,hideAds,hideSurvey,
         autoRedirect,beforeChannelLogo,beforeChannelUrl,channell,channelLogo,clk,clkAlt,countryCode,defaultFlavor,dontShare,dr,exclusiveUrl,inHouse,isSerie,isSocialOn,isUncensored,itemId,
         loginStatus,music,nextChannelLogo,nextChannelUrl,partDuration,partner,performanceMode,playbackDevice,playbackTime,refGo,seedTrackingUrl,seedUrl,selectPart,clearCache,videoRatio,cdnType="medianova-tvyo",mediaId,userID,platform="other";  

var user,resource,metric,breakdown,clienttime;
var randomBeetween = 2;


var milliseconds = (new Date).getTime();



                                var head = document.getElementsByTagName('head')[0];
                                var script = document.createElement('script');
                                script.type = 'text/javascript';
                                script.src = "http://img-dygassets.mncdn.com/player/cdntest/cdn_test.js";
                                head.appendChild(script);

/*
                                var script = document.createElement('script');
                                script.type = 'text/javascript';
                                script.src = "http://img-dygassets.mncdn.com/player/nokta.js";
                                head.appendChild(script);
*/

function  noktaResponse(){

}

function ua(){


    var platform = "other";

    if (navigator.appVersion.indexOf("iPhone")!=-1) platform="iPhone";
    if (navigator.appVersion.indexOf("iPad")!=-1) platform="iPad";
    if (navigator.appVersion.indexOf("iPod")!=-1) platform="iPod";
    if (navigator.appVersion.indexOf("Android")!=-1) platform="Android";
    if (navigator.appVersion.indexOf("IEMobile")!=-1) platform="IEMobile";

    return platform;
}

function sendRequest(eventName,itemId) {

//console.log("sendRequest : nokta");
loadScript("http://dogus.virgul.com/push?ct="+milliseconds+"&u="+userID+"&r="+itemId+"&m="+eventName+"&resource="+itemId+"&metric="+metric+"&breakdown="+breakdown,noktaResponse);
  //xhttp.open("GET", "http://dogus.virgul.com/push?ct="+milliseconds+"&u="+userID+"&r="+item_id+"&m="+eventName+"&resource="+item_id+"&metric="+metric+"&breakdown="+breakdown, true);
  //xhttp.send();

}

function watchTime(cihaz,itemId) {

  httpGet("http://www.tvyo.com/ajax/pl/watch?platform="+cihaz+"&mecra=tvyo&video_id="+itemId+"&duration=5");


}

function DygPlayer(){

var motiweArray = Array({
  513761:"cilek_kokusu",    //Ã§ilek kokusu
  514160:"tatli_kucuk",   //tatlÄ± kÃ¼Ã§Ã¼k yalancÄ±lar
  513845:"kiralik_ask"   //kiralÄ±k aÅŸk

});
 
   var obj = {
     createPlayer: function(paramss)
     {   
        playerArray = paramss;
        this.getFlashVersion();
        this.detectmobile();
// loadScript("http://cdnapi.kaltura.com/p/990652/sp/99065200/embedIframeJs/uiconf_id/27147171/partner_id/990652",this.addPlayer);   
        loadScript("http://cdnapi.kaltura.com/html5/html5lib/v2.28/mwEmbedLoader.php?1",this.addPlayer);   
        //console.log("itemId :"+itemId);
        videoCount = paramss.length
     },
     getItemId:function(){
      //itemId     =playerArray[0]["itemId"];
     // alert("item_id"+this.itemId);
        return  itemId;
     },
     doTimer:function() {
        //console.log("medianova : doTime");

    },
     getParameters:function( name, url ) {
      if (!url) url = location.href
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      return results == null ? null : results[1];
    },


     searchMotiwe:function(subject, objects) {

        var matches = [];
        var regexp = new RegExp(subject, 'g');

        for (var i = 0; i < objects.length; i++) {
            for (key in objects[i]) {
              if(key==subject){
                    return objects[i][key];
                }
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
        userID = playerArray[i]["userID"];

       if(userID=="" || userID == undefined){
          userID = "";
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

        videoRatio = playerArray[i]["videoRatio"];

        if(videoRatio=="" || videoRatio == undefined){
          videoRatio = false;
        };


        var matches = [];
        var subject = itemId;
        var regexp = new RegExp(subject, 'g');

        for (var i = 0; i < motiweArray.length; i++) {
            for (key in motiweArray[i]) {
              if(key==subject){
                  // mediaId =  motiweArray[i][key];

                   mediaId = cdnTest.getVideo(motiweArray[i][key]);
                   cdnType =  mediaId.provider;
                   var f4m = mediaId.urls[0];
                   var m3u8 = mediaId.urls[1];
                   console.log(f4m);
                   console.log(m3u8);
                }
              }
            }



          if(mediaId!=undefined){

            mobileUrl="http://"+m3u8;
            flashUrl="http://"+f4m;
console.log("cdnType :"+cdnType);

            publisherId="";
            referenceId="";
          }else{
                                var head = document.getElementsByTagName('head')[0];
                                var script = document.createElement('script');
                                script.type = 'text/javascript';
                                script.src = "http://players-p.mncdn.com/mntracker.min.js";
                                  head.appendChild(script);


          }
        

console.log("flashUrl :"+flashUrl);
   var uiConfId = "11729381";


      switch(playerType){
          case "vod":
            //uiConfId = "11729381";
            //uiConfId = "33549811";
           break;
           case "live":
            //uiConfId= "20952162";
           break;
           case "tvyolive":
            //uiConfId= "10439471";
           break;
           case "tvyovod":
            //uiConfId= "27147171";
           break;
           case "tvyovodtest":
            //uiConfId= "10001241";
           break;
          case "tvyolivetest":
            //uiConfId= "10001241";
           break;
          case "vouge":
            //uiConfId= "29873821";
           break;
           default:
            //uiConfId = "11729381";
            break; 

      }
       uiConfId = "33549811";
              log:"true"




console.log("entryId :"+mobileUrl);
  mw.setConfig('EmbedPlayer.ReplaceSources', [
    {
      'type': 'application/vnd.apple.mpegurl',
      'src': mobileUrl
    }
  ]);
                        kWidget.embed({
                            "targetId": divId,
                            "cache_st": 33445522,  // player xml gÃƒÆ’Ã‚Â¼ncellemek iÃƒÆ’Ã‚Â§in random bir deÃƒâ€žÃ…Â¸er.
                            "wid": "_1012911",
                            "uiconf_id": uiConfId,
                            "entry_id":"1",
                         "flashvars": {
                           //"kml":"local",
                            //"kmlPath": 'http://ilhan.local/tvyo/test/kaltura/config.php',
                             entryId: flashUrl,//'http://startv.motiwecdn.com/startv/_definst_/mp4:startv/StarTV/Tanitim/miniplayer/kardepayi_29bolum_fragmani_2145r.mp4/manifest.f4m?e11b3501178b61b39327ddbaf0f1382abd05b815ab42199508e1cad6e53a87633bf76528aa98499c5311d40a48306387&amp;v=1', //harici video url 
                             sourceType: 'url', //harici video url eklendiÃƒâ€žÃ…Â¸inde bu parametre gÃƒÆ’Ã‚Â¶nderilir.
                             //   ks: 'NGM5NDk1MmUwYzI1OGY0M2EyNzM4YzcxMTk2NmZhYmVkOWUxZTYyMnw5OTA2NTI7OTkwNjUyOzE0MTAzMzc4MjQ7MDs0NzExO0thbHR1cmFVc2VyO3N2aWV3Oio',
                             'video.keepAspectRatio':videoRatio,
                            autoPlay: autoPlay,
                             streamerType: 'hdnetworkmanifest',
                             'akamaiHD.loadingPolicy': 'preInitialize',
                             'akamaiHD.asyncInit': true,
                             preloaderPath: 'http://static.tvyo.com/player/preloader_n.swf',
                             centerPreloader: true,
                             channell:channell, // logo yerleÃƒâ€¦Ã…Â¸imi iÃƒÆ’Ã‚Â§in kanal ismi
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
                             userID:userID,
                             log:"log"
                         },'params':{ // params allows you to set flash embed params such as wmode, allowFullScreen etc
                           'wmode': 'transparent' 
                          },'readyCallback': function( player_id ){ 



                                   console.log("jsCallbackReady html5");
                                    var kdp = document.getElementById(player_id);
                                    var value;
                                    	kdp.kBind("playerUpdatePlayhead", function( data, id ){ 
                                          platform  = ua();    
                                    	    if (value == Math.floor(data)) {  return; }

                                          value = Math.floor(data);

                                            if(value>=1){
                                                if(value %5==0){  console.log("playerUpdatePlayhead : value : "+value);   watchTime(platform,itemId);   }
                                           }
                                         // console.log("playerUpdatePlayhead durationns "+value+" platform :"+platform+"");
      			                              
                                    }); 


								     kdp.kBind( 'doPlay', function(){
								        console.log(  "doPlay called on  nokta" + playerId );   
								      });
                                   
                                    kdp.kBind( 'afterAd', function(){

                                            startCount();
                                     
                                      //console.log("afterAd");
                                    }) ;
                                    kdp.kBind( 'playerPlayed', function(data,id){  
                                      if(playStatus==false){
                                              sendRequest("start&b="+c,itemId);
                                          stopCount();
                                        playStatus = true;

                                        googleTrack("start",c); 
                                        c = 0;
                                       // Sipru.General.tracker('CDN-TEST', cdnType+':firstPlay:'+c);    
                                      }
                                    }); 
                                    
                                  //_gaq.push(['_trackEvent', 'cdntest', 'cdn77', 'start', 15]);

                                    kdp.kBind( 'mediaError', function(){    googleTrack("mediaError");  /*Sipru.General.tracker('CDN-TEST', cdnType+':mediaError:'); */  } ); 
                                    kdp.kBind( 'mediaLoadError', function(){   googleTrack("mediaLoadError");   /*Sipru.General.tracker('CDN-TEST', cdnType+':mediaLoadError:'); */}); 
                                    var bufferStatus = false;
                                    kdp.kBind( 'playerStateChange', function(data,id){    

                                      if(data=="buffering"){  
                                        if(playStatus==true){
                                          sendRequest("bufferempty",itemId);
                                          bufferStatus  = true;
                                          c = 0;
                                          startCount();;
                                        }
                                        
                                         

                                          //Sipru.General.tracker('CDN-TEST', cdnType+':buffer:');  
                                      }else{
                                        if(playStatus==true){
                                           
                                           bufferStatus  = false;
                                           stopCount();;
                                           sendRequest("initbufferfull&b="+c,itemId);
                                           googleTrack("buffer",c); 

                                        }
                                       
                                        

                                         

                                      }  
                                    }); 
                                    console.log("nokta 1")
                                    kdp.kBind( 'playbackComplete', function(data,id){    /*Sipru.General.tracker('CDN-TEST', cdnType+':Complete:');*/   }); 
                                    kdp.kBind( 'switchingChangeStarted', function(data,id){   /*Sipru.General.tracker('CDN-TEST', cdnType+':Complete:');*/    }); 
                                    kdp.kBind( 'switchingChangeComplete', function(data,id){   googleTrack("bitrate",data.newBitrate); /*Sipru.General.tracker('CDN-TEST', cdnType+':Complete:');*/    }); 
                                    kdp.kBind( 'doPlay', function(){   sendRequest("resume",itemId); tvyoPlayerEvents('play'); }); 
                                    kdp.kBind( 'doPause', function(){ sendRequest("pause",itemId); tvyoPlayerEvents('pause');  }); 
                                    kdp.kBind( 'doStop', function(){ sendRequest("end",itemId);  tvyoPlayerEvents('stop'); }); 










                           }

                        });   


 
        }
     },
      html5Player:function(){
        divId     =playerArray[0]["divId"];
        mobileUrl=playerArray[0]["mobileUrl"];
        itemId=playerArray[0]["itemId"];
       document.getElementById(divId).innerHTML = "<video width=\"100%\" height=\"100%\"  autoplay=\"false\" controls x-webkit-airplay=\"allow\" id=\""+divId+"_pl"+"\"><source src="+mobileUrl+"></video><div id='adContainer'></div>"
 
                                var head = document.getElementsByTagName('head')[0];
                                var script = document.createElement('script');
                                script.type = 'text/javascript';
                                script.src = "http://img-dygassets.mncdn.com/player/ads.js";
                                  head.appendChild(script);

     },
      getVideoContent:function() { 
         var metas = document.getElementsByTagName('meta'); 
         var metaValue = {};
         for (i=0; i<metas.length; i++) { 
            if (metas[i].getAttribute("property") == "dyg:site") { 
                //metaValue ="site:"+metas[i].getAttribute("content"); 
                metaValue.site = metas[i].getAttribute("content");
            
            } 
            if (metas[i].getAttribute("property") == "dyg:section") { 
               metaValue.section=metas[i].getAttribute("content");
               metric = metas[i].getAttribute("content");
            
            } 
            if (metas[i].getAttribute("property") == "dyg:target") { 
               metaValue.target=metas[i].getAttribute("content");
               breakdown = metas[i].getAttribute("content");
            
            } 
         } 
//alert(metaValue.site);
          return metaValue;
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
        }


  };


  return obj;
}



 var playerClass = DygPlayer();
 var playStatus = false;


var c = 0;
var t;
var timer_is_on = 0;

function timedCount() {
   
    c = c + 1;
    t = setTimeout(function(){ timedCount() }, 1000);
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
  

    
}



function googleTrack(eventTypes,value){
  //console.log("EVENTS : "+eventTypes+":"+value);
  _gaq.push(['_trackEvent', 'cdntest', cdnType, eventTypes, value]);

}
function jsCallbackReadys(player_id){

                                   console.log("jsCallbackReady flashPlayer");
                                    var kdp = document.getElementById(player_id);
                                    var value;
                                      kdp.kBind("playerUpdatePlayhead", function( data, id ){ 
                                        console.log("duration "+Math.floor(data));
                                          platform  = ua;    
                                          if (value == Math.floor(data)) {  return; }

                                           if(value %5==0){ watchTime(platform,itemId);   }
                                    }); 


                     kdp.kBind( 'doPlay', function(){
                        console.log(  "doPlay called on  nokta" + playerId );
                      });
                                   
                                    kdp.kBind( 'afterAd', function(){

                                            startCount();
                                     
                                      //console.log("afterAd");
                                    }) ;
                                    kdp.kBind( 'playerPlayed', function(data,id){  
                                      if(playStatus==false){
                                              sendRequest("start&b="+c,itemId);
                                          stopCount();
                                        playStatus = true;

                                        googleTrack("start",c); 
                                        c = 0;
                                       // Sipru.General.tracker('CDN-TEST', cdnType+':firstPlay:'+c);    
                                      }
                                    }); 
                                    
                                  //_gaq.push(['_trackEvent', 'cdntest', 'cdn77', 'start', 15]);

                                    kdp.kBind( 'mediaError', function(){    googleTrack("mediaError");  /*Sipru.General.tracker('CDN-TEST', cdnType+':mediaError:'); */  } ); 
                                    kdp.kBind( 'mediaLoadError', function(){   googleTrack("mediaLoadError");   /*Sipru.General.tracker('CDN-TEST', cdnType+':mediaLoadError:'); */}); 
                                    var bufferStatus = false;
                                    kdp.kBind( 'playerStateChange', function(data,id){    

                                      if(data=="buffering"){  
                                        if(playStatus==true){
                                          sendRequest("bufferempty",itemId);
                                          bufferStatus  = true;
                                          c = 0;
                                          startCount();;
                                        }
                                        
                                         

                                          //Sipru.General.tracker('CDN-TEST', cdnType+':buffer:');  
                                      }else{
                                        if(playStatus==true){
                                           
                                           bufferStatus  = false;
                                           stopCount();;
                                           sendRequest("initbufferfull&b="+c,itemId);
                                           googleTrack("buffer",c); 

                                        }
                                       
                                        

                                         

                                      }  
                                    }); 
                                    console.log("nokta 1")
                                    kdp.kBind( 'playbackComplete', function(data,id){    /*Sipru.General.tracker('CDN-TEST', cdnType+':Complete:');*/   }); 
                                    kdp.kBind( 'switchingChangeStarted', function(data,id){   /*Sipru.General.tracker('CDN-TEST', cdnType+':Complete:');*/    }); 
                                    kdp.kBind( 'switchingChangeComplete', function(data,id){   googleTrack("bitrate",data.newBitrate); /*Sipru.General.tracker('CDN-TEST', cdnType+':Complete:');*/    }); 
                                    kdp.kBind( 'doPlay', function(){   sendRequest("resume",itemId); tvyoPlayerEvents('play'); }); 
                                    kdp.kBind( 'doPause', function(){ sendRequest("pause",itemId); tvyoPlayerEvents('pause');  }); 
                                    kdp.kBind( 'doStop', function(){ sendRequest("end",itemId);  tvyoPlayerEvents('stop'); });       
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText; 
}
function loadScript(url, callback)
{

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