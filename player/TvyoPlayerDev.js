var c = 0;
function DygPlayer(){
         var  divId,mobileUrl,flashUrl,autoPlay,alias,tags,comscore,playerArray,videoCount,flashVersion=0,flashStatus=true,nextPartCallBack="",subTitleFile="",publisherId,referenceId,log,hideAds,hideSurvey,
         autoRedirect,beforeChannelLogo,beforeChannelUrl,channell,channelLogo,clk,clkAlt,countryCode,defaultFlavor,dontShare,dr,exclusiveUrl,inHouse,isSerie,isSocialOn,isUncensored,itemId,
         loginStatus,music,nextChannelLogo,nextChannelUrl,partDuration,partner,performanceMode,playbackDevice,playbackTime,refGo,seedTrackingUrl,seedUrl,selectPart,clearCache,videoRatio,playerModel="tvyo",mediaId;  

          var randomBeetween = 10;



var t;
var timer_is_on = 0;

var limeLightArray = Array({509048:"0cce32074a7845bdaccc66c1e923b654",
509563:"1cd89dbe11934134960f320ce33efa27",
509489:"22bb2f9867274574b77b8d591dc816ac",
509037:"4adcf0f07d1f4fa2ac92a124df57a263",
509840:"669baf20990e447090a8f0b4850a382e",
509046:"6be20fd9a66d414b926423cbd3882923",
509038:"7880006869604ec1b80d38a12bf5678d",
509836:"7a1ef40897674e0490bdb60b053897e8",
509837:"821207e1ae37449e8fa61601e5d6150d",
510362:"865d88cfd54b46908664f2587d2f3d80",
509662:"88389074887e46e5b535ce719c280166",
507423:"88e4ca7341de4b93bc7f927304d43117",
510835:"97d3353c93f74a06bde7e3ea5dc6976c",
509835:"9af602023bf3468ab5508faaa4594e19",
509047:"ab8245d195714190bab4d288c9dd1c13",
510834:"b9598da6a7ab45cab0552ec8bdd87a5f",
509049:"c8d2cc035f6a455a9424c94f928389fb",
509050:"cc9f69dfe5434220b786b955fcac6605",
509841:"dff748cec2a442ad958b5b3e9b7ab848",
510836:"e89a9dc31a2c4a92be4c409ea4a684ff",
508572:"f3024bd85bc0413b8dd5f3c37445b03f",
510143:"f5ed1d80217944698842ab8f3ccf63f9"});

    var obj = {


     createPlayer: function(paramss)
     {  

     
        //console.log(paramss);
        playerArray = paramss;
        this.getPlayerType();

          this.getFlashVersion();
        this.detectmobile();


              switch(playerModel){
                case "tvyo":  Sipru.General.tracker('CDN-TEST', 'playerType=kaltura');
                  if(flashVersion==0 || flashStatus){
                    loadScript("http://imasdk.googleapis.com/js/sdkloader/ima3.js",this.html5Player); 
                  }else{
                    loadScript("http://cdnapi.kaltura.com/html5/html5lib/v2.28/mwEmbedLoader.php",this.addPlayer);  
                   }
                  break;
                case "akamai":  Sipru.General.tracker('CDN-TEST', 'playerType=akamai'); loadScript("http://cdnapi.kaltura.com/html5/html5lib/v2.28/mwEmbedLoader.php",this.akamaiPlayer);  break;
                case "limelight": Sipru.General.tracker('CDN-TEST', 'playerType=limelight');  loadScript("http://video.limelight.com/player/embed.js",this.limelightPlayer);  break; 
            }
        

       
       // http://cdnapi.kaltura.com/html5/html5lib/v2.27.1/mwEmbedLoader.php

    //console.log("length :"+);
        videoCount = paramss.length
        
      


     },
     getItemId:function(){
      //itemId     =playerArray[0]["itemId"];
     // alert("item_id"+this.itemId);
        return  itemId;
     },
      doTimer:function() {
        //console.log("doTime");
      if (!this.timer_is_on) {
        //console.log("doTime 2");
        //alert(1);
          this.timer_is_on = 1;
          this.timedCount();
      } 
    },
     getParameters:function( name, url ) {
      if (!url) url = location.href
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      return results == null ? null : results[1];
    },
    timedCount:function() {
      //console.log("timedCount");
        //document.getElementById('txt').innerHTML = c;
//console.log("timer :"+c);
//console.log("timedCount 1");
        c = c+1;
        t = setTimeout(function(){player.timedCount()}, 1000);
         
    },

    stopCount:function() {
      console.log("stopCount :"+c);
      clearTimeout(t);
      timer_is_on = 0;
    },
     searchLimlight:function(subject, objects) {

        var matches = [];
        var regexp = new RegExp(subject, 'g');

        for (var i = 0; i < objects.length; i++) {
            for (key in objects[i]) {
              if(key==subject){
                    return objects[i][key];
                }
               // console.log(key+"->"+); //
              }
            }
        
        
    },
     getPlayerType:function(){
      var playerTypeRand = Math.floor((Math.random() * randomBeetween) + 1);
//console.log("playerTypeRand :"+playerTypeRand);
      itemId     =playerArray[0]["itemId"];
      var  selectCdn = this.getParameters('cdn', window.location.href);

        mediaId = this.searchLimlight(itemId,limeLightArray);
       // alert(mediaId);
          if(mediaId!=undefined){
             Sipru.General.tracker('CDN-TEST', 'pageLoad');
            console.log("selectCdn :"+selectCdn);
            if(selectCdn!=null){
              switch(selectCdn){
                case "limelight":  playerModel = "limelight" ; break;
                case "akamai":  playerModel = "tvyo" ; break;
                case "tvyo":  playerModel = "tvyo" ; break;
             } 
            }else{
             switch(playerTypeRand){
                case 1:  playerModel = "limelight" ; break;
                case 2:  playerModel = "limelight" ; break;
             } 
           }

          }



     },
     addPlayer:function(){
       Sipru.General.tracker('CDN-TEST', 'kaltura:PlayerLoad');
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

        videoRatio = playerArray[i]["videoRatio"];

        if(videoRatio=="" || videoRatio == undefined){
          videoRatio = false;
        }


        


   var uiConfId = "11729381";


      switch(playerType){
          case "vod":
            uiConfId = "11729381";
           break;
           case "live":
            uiConfId= "20952162";
           break;
           case "tvyolive":
            uiConfId= "10439471";
           break;
           case "tvyovod":
            uiConfId= "27147171";
           break;
           case "tvyovodtest":
            uiConfId= "10001241";
           break;
          case "tvyolivetest":
            uiConfId= "10001241";
           break;
          case "vouge":
            uiConfId= "29873821";
           break;
           default:
            uiConfId = "11729381";
            break; 

      }
              log:"true"

                        kWidget.embed({
                            "targetId": divId,
                            "cache_st": 33445522,  // player xml gÃ¼ncellemek iÃ§in random bir deÄŸer.
                            "wid": "_990652",
                            "uiconf_id": uiConfId,
                         "flashvars": {
                           //"kml":"local",
                            //"kmlPath": 'http://ilhan.local/tvyo/test/kaltura/config.php',
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

                        });   


 
        }
     },
     limelightPlayer:function(){
      Sipru.General.tracker('CDN-TEST', 'limelight:PlayerLoad');
        divId     =playerArray[0]["divId"];
        mobileUrl=playerArray[0]["mobileUrl"];
        itemId=playerArray[0]["itemId"];
playerClass.doTimer();
       
        document.getElementById(divId).innerHTML = '<object type="application/x-shockwave-flash" id="limelight_player_552667" name="limelight_player_552667" class="LimelightEmbeddedPlayerFlash" width="100%" height="100%" data="//video.limelight.com/player/loader.swf"><param name="movie" value="//video.limelight.com/player/loader.swf"/><param name="wmode" value="window"/><param name="allowScriptAccess" value="always"/><param name="allowFullScreen" value="true"/><param name="flashVars" value="playerForm=52c848f68a6541a4bcb169d2f5865f5d&amp;mediaId='+mediaId+'&autoplay=true"/></object>';


        LimelightPlayerUtil.initEmbed("limelight_player_552667");



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
            
            } 
            if (metas[i].getAttribute("property") == "dyg:target") { 
               metaValue.target=metas[i].getAttribute("content");
            
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
        },


  };


  return obj;
}


function limelightPlayerCallback(playerId, eventName, data) {   
    var id = "limelight_player_156792";



    if (eventName == 'onPlayerLoad' && (LimelightPlayer.getPlayers() == null || LimelightPlayer.getPlayers().length == 0)) {
      LimelightPlayer.registerPlayer(id);
    }
                LimelightPlayer.doSetAd('preroll', 'Dart', 'url=https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/37011203/Web/TVYO/Canli_TV/PRE&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast3&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=43543543534543&cust_params=tvyo_canliyayin_cat%3Dtvyontvcanli%26playerType%3DflashPlayer&ad_rule=0');
//console.log("eventName :"+eventName);
    
    switch (eventName) {
      case 'onPlayerLoad':
      Sipru.General.tracker('CDN-TEST', 'limelight:onPlayerLoad');

        doOnPlayerLoad();

        break;
    
      case 'onChannelLoad':
      Sipru.Player.errorLog('Limelight;onChannelLoad',playerClass.getItemId(),1);
        doOnChannelLoad(data);
        break;

      case 'onMediaLoad':
      Sipru.General.tracker('CDN-TEST', 'limelight:onMediaLoad');
        doOnMediaLoad(data);

        break;
        case "onAdComplete":
           // console.log("onAdComplete");
        break;


      case 'onPlayStateChanged':
      //Sipru.Player.errorLog('Limelight;onPlayStateChanged',playerClass.getItemId(),1);
        doOnPlayStateChanged(data);
        break;

      case 'onPlayheadUpdate':
      //Sipru.Player.errorLog('Limelight;onPlayheadUpdate',playerClass.getItemId(),1);
        doOnPlayheadUpdate(data);
        break; 
      case 'onError':
      Sipru.Player.errorLog('Limelight;onError',playerClass.getItemId(),1);
          doOnPlayError(data);
      break;
    }




  }
 var playerClass = DygPlayer();
 var playStatus = false;
  function doOnPlayerLoad() {
       
//console.log(playerClass.getItemId());
    document.getElementById('state').innerHTML = "paused"
  }
  
  function doOnChannelLoad(e) {
    document.getElementById('channelTitle').innerHTML = e.title;
    document.getElementById('state').innerHTML = "paused"
    
    //create a dynamic playlist of media in the channel
    if (e.mediaList && e.mediaList.length > 0) {
    
      var playlistHTML = "";
      
      for (var i = 0; i < e.mediaList.length; i++) {
          var media = e.mediaList[i];
          if (media) {
              
            playlistHTML += '<div style="float:left; width:220px; margin-left:10px; margin-right:10px; margin-top:20px; margin-bottom:20px">';
            playlistHTML += '<a href="javascript:onPlaylistItemClick(\'' + media.id + '\');">';
            playlistHTML += '<img width="200" border="1" src="' + media.thumbnailUrl + '"/>';
            playlistHTML += '<b>' + media.title + '<b /><br />';
            playlistHTML += '</a>';
            playlistHTML += '</div>';
      }
    }
    
        playlistHTML += '<br style="clear:both;" />';
    
        var playlistBox = document.getElementById('playlist-box').innerHTML = playlistHTML;
    } 
  }

  function onPlaylistItemClick(mediaId) {
  
     LimelightPlayer.doSetMedia(mediaId, false);
  
  }
  
  function doOnMediaLoad(e) {
    document.getElementById('mediaTitle').innerHTML = e.title;
    document.getElementById('mediaDescription').innerHTML = e.description;
    document.getElementById('totalDuration').innerHTML = e.durationInMilliseconds;
    document.getElementById('URL').innerHTML = e.thumbnailUrl;
    
  }
 function doOnPlayError(e) {
/*errorID
classType
message
name*/
    //Sipru.Player.errorLog('Limelight;onError;errorID='+e.message+";errorID:"+e.errorID,playerClass.getItemId(),1);
    Sipru.General.tracker('CDN-TEST', 'limelight;onError='+e.errorID);
  }

  
  function doOnPlayStateChanged(e) {
  
    var play_state;
    
    if (e.isBusy) {
        play_state = "buffering";
        Sipru.General.tracker('CDN-TEST', 'limelight:buffering'); 
    } else if (e.isPlaying) {
      play_state = "playing";
      //console.log("playing");
        if(playStatus==false){

          player.stopCount();
                              //console.log('limelight:play:'+c);
          Sipru.General.tracker('CDN-TEST', 'limelight:play:'+c);

          playStatus = true;
        }
    } else {
      play_state = "paused";
    }
  
    document.getElementById('state').innerHTML = play_state;
    
  }

  function doOnPlayheadUpdate(e) {
    document.getElementById('timePosition').innerHTML = e.positionInMilliseconds;
  }
  
function errorFunc(e){
  //Sipru.Player.errorLog('Limelight;player_load_error',playerClass.getItemId(),1);
  Sipru.General.tracker('CDN-TEST', 'limelight;player_load_error');

}

function jsCallbackReady(player_id) {
  //console.log("jsCallbackReady");
  var kdp = document.getElementById(player_id);
 
  kdp.kBind( 'afterAd', function(){

          playerClass.doTimer();
   
    //console.log("afterAd");
  }) ;
  kdp.kBind( 'playerPlayed', function(){
    tvyoPlayerEvents('play');
    if(playStatus==false){

        player.stopCount();
                      console.log('medianova:play:'+c);
        Sipru.General.tracker('CDN-TEST', 'medianova:play:'+c);

        playStatus = true;
    }
   
    //console.log("playerPlayed");
  }); 
    kdp.kBind( 'doPlay', function(){  tvyoPlayerEvents('play'); }); 
    kdp.kBind( 'doPause', function(){ tvyoPlayerEvents('pause'); }); 
    kdp.kBind( 'doStop', function(){ tvyoPlayerEvents('stop'); }); 
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
    script.onerror = errorFunc;

    // Fire the loading
    head.appendChild(script);
}