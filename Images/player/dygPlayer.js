
function DygPlayer(){
         var  divId,mobileUrl,flashUrl,autoPlay,alias,tags,comscore,playerArray,videoCount,flashVersion=0,flashStatus=true,publisherId,referenceId,log,hideAds,hideSurvey;  
    var obj = {


     createPlayer: function(paramss)
     {  
        console.log(paramss);

        loadScript("http://cdnapi.kaltura.com/html5/html5lib/v2.28/mwEmbedLoader.php",this.addPlayer);
       // http://cdnapi.kaltura.com/html5/html5lib/v2.27.1/mwEmbedLoader.php

    //console.log("length :"+);
        videoCount = paramss.length
        playerArray = paramss;
        this.getFlashVersion();
        this.detectmobile();


     },
     addPlayer:function(){
       //mw.setConfig('forceMobileHTML5',true);
      for(var i=0;i<=videoCount-1;i++){
        divId=playerArray[i]["divId"];
        playerType=playerArray[i]["playerType"];
        mobileUrl=playerArray[i]["mobileUrl"];
        flashUrl=playerArray[i]["flashUrl"];
        alias=playerArray[i]["alias"];
        tags=playerArray[i]["tags"];
        comscore=playerArray[i]["comscore"];
        autoPlay = playerArray[i]["autoPlay"];  
        parts=playerArray[i]["parts"];
        if(parts=="" || parts == undefined){
          parts = 0;
        }
        publisherId=playerArray[i]["publisherId"];
        referenceId=playerArray[i]["referenceId"];
        log=playerArray[i]["log"];
        hideAds=playerArray[i]["hideAds"],
        hideSurvey=playerArray[i]["hideSurvey"]


   var uiConfId = "11729381";


      switch(playerType){
          case "vod":
            uiConfId = "11729381";
           break;
           case "live":
            uiConfId= "20952162";
           break;
           default:
            uiConfId = "11729381";
            break;

      }
              log:"true"

                        kWidget.embed({
                            "targetId": divId,
                            "cache_st": 22233344,  // player xml gÃ¼ncellemek iÃ§in random bir deÄŸer.
                            "wid": "_990652",
                            "uiconf_id": uiConfId,
                         "flashvars": {
                            
                             entryId: flashUrl,//'http://startv.motiwecdn.com/startv/_definst_/mp4:startv/StarTV/Tanitim/miniplayer/kardepayi_29bolum_fragmani_2145r.mp4/manifest.f4m?e11b3501178b61b39327ddbaf0f1382abd05b815ab42199508e1cad6e53a87633bf76528aa98499c5311d40a48306387&amp;v=1', //harici video url 
                             sourceType: 'url', //harici video url eklendiÄŸinde bu parametre gÃ¶nderilir.
                             //   ks: 'NGM5NDk1MmUwYzI1OGY0M2EyNzM4YzcxMTk2NmZhYmVkOWUxZTYyMnw5OTA2NTI7OTkwNjUyOzE0MTAzMzc4MjQ7MDs0NzExO0thbHR1cmFVc2VyO3N2aWV3Oio',
                             'video.keepAspectRatio': false,
                              autoPlay: autoPlay,
                             streamerType: 'hdnetwork',
                             'akamaiHD.loadingPolicy': 'preInitialize',
                             'akamaiHD.asyncInit': true,
                             preloaderPath: 'http://static.tvyo.com/player/preloader_n.swf',
                             centerPreloader: true,
                             channell: 'startv', // logo yerleÅŸimi iÃ§in kanal ismi
                             alias: alias, //videoplaza alias
                             tags: tags, //videoplaza tags
                             twoPhaseManifest: true,
                             comscore: comscore,
                             selectPart:parts,
                             PublisherId:publisherId,
                             ReferenceId:referenceId,
                             log:"log"
                         }

                        });
                            if(flashVersion==0 || flashStatus){
                                document.getElementById(divId).innerHTML = "<video width=\"100%\" height=\"100%\"  autoplay=\"true\" controls x-webkit-airplay=\"allow\" id=\""+divId+"_pl"+"\"><source src="+mobileUrl+"></video>"
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