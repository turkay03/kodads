slideDownHeight =0;
hasTepeBanner=false;
var section = '';
DygDFP.Brand = {
    NtvPara: {
        init:function(){

            googletag.cmd.push(function () {
                var AdUnitId = '37011203';
                var section = DygDFP.section;
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
                if(getMetaTag('dyg:stage')=="true")
                {
                    section = 'Test';
                    DygDFP.section = 'Test';
                }

                googletag.pubads().setTargeting('ntvparacat', tags);

                if (DygDFP.device.isPhone()) {
                    var adPlatform = 'MobileSite';
                    var AdUnitBase = "{0}/{1}/{2}/{3}".format(AdUnitId,DygDFP.siteName,adPlatform,DygDFP.section);

                    gptadslots[0] = googletag.defineSlot(AdUnitBase + '/LDB',[[320,50], [320,100],[320,150]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads());
                    gptadslots[1] = googletag.defineSlot(AdUnitBase + '/INS',[[320,480],[320,568]], 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);

                    for(i =2 ;i <= 6; i++)
                    {
                        gptadslots[i] = googletag.defineSlot(AdUnitBase + '/MPU'+(i-1), [[300, 250]], 'div-300x250_Ros-'+ ( i - 1 )).setTargeting('pos', ['mpu'+ ( i - 1 )]).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    }
                    gptadslots[8] = googletag.defineSlot(AdUnitBase + '/TXTLNK',[[300, 50]], 'div-txtlnk_Ros-2').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                }
                else if (DygDFP.device.isTablet()) {
                    var adPlatform = 'MobileSite';
                    var AdUnitBase = "{0}/{1}/{2}/{3}".format(AdUnitId,DygDFP.siteName,adPlatform,section);

                    gptadslots[0] = googletag.defineSlot(AdUnitBase + '/LDB',[[728,90]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads());
                    gptadslots[1] = googletag.defineSlot(AdUnitBase + '/MPU1', [[300, 250]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    gptadslots[2] = googletag.defineSlot(AdUnitBase + '/INS',[[768,1024],[1024,768]], 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    gptadslots[3] = googletag.defineSlot(AdUnitBase + '/TXTLNK',[[500,50]], 'div-txtlnk_Ros-2').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);

                }
                else{ //web

                    gptadslots[0] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/'+section+'/LDB',[[728, 90], [970, 90]], 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads());
                    gptadslots[1] = googletag.defineOutOfPageSlot('/37011203/' + DygDFP.siteName + '/Desktop/'+section+'/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/' + DygDFP.siteName + '/Desktop/'+section+'/SKIN', 'div-PageSkin').setTargeting('pos', ['skin']).addService(googletag.companionAds()).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    if($('#sidebar_rklm1').length > 0){
                        gptadslots[3] = googletag.defineOutOfPageSlot('/37011203/' + DygDFP.siteName + '/Desktop/'+section+'/MPUFix', 'div-MPU_Fix').setTargeting('pos', ['mpu_fix']).addService(googletag.companionAds()).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }
                    /*if($('#sidebar_rklm2').length > 0){
                        gptadslots[4] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    }*/
                    gptadslots[4] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    gptadslots[5] = googletag.defineOutOfPageSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + section+ '/MSTHD', 'div-Masthead').setTargeting('pos', ['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);


                    if(window.innerWidth > 1600 )
                    {
                        gptadslots[6] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + section + '/HDR',[1260,50],'div-HDR_940x40').setTargeting('pos', ['hdr']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    }
                    else if(window.innerWidth <= 1600 && window.innerWidth>1024)
                    {
                        gptadslots[6] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + section + '/HDR',[940, 40],'div-HDR_940x40').setTargeting('pos', ['hdr']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    }

                    gptadslots[7] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + section + '/MPU2',[300, 250],'div-300x250_Ros-2').setTargeting('pos', ['mpu2']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);

                    if(DygDFP.section =="Piyasa")
                    {
                        if (window.innerWidth >1600)
                        {
                            gptadslots[8] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + section + '/TXTLNK',[940, 50],'div-txtlnk_Ros-2').setTargeting('pos', ['txtlnk']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                        }
                        else if(window.innerWidth <= 1600 && window.innerWidth>1024)
                        {
                            gptadslots[8] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + section + '/TXTLNK',[620, 50],'div-txtlnk_Ros-2').setTargeting('pos', ['txtlnk']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                        }
                    }
                    else if(DygDFP.section =="Haber")
                    {
                        gptadslots[8] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + section + '/TXTLNK',[720, 50],'div-txtlnk_Ros-2').setTargeting('pos', ['txtlnk']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    }
                    else if(DygDFP.section =="Teknoloji")
                    {
                        gptadslots[8] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + section + '/TXTLNK',[720, 50],'div-txtlnk_Ros-2').setTargeting('pos', ['txtlnk']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    }


                }
                var mpu1Area=false;
                var gcmArea = false;
                googletag.pubads().addEventListener('slotRenderEnded',function(event){
                    if(DygDFP.device.isWeb()) {
                        if (event.slot === gptadslots[0]) {
                            if (!event.isEmpty) {
                                $("#div-Tepe_728x90").show();

                                $("#div-Tepe_728x90").css("height", 90);
                                $("#div-Tepe_728x90").css("text-align", "center");
                                $('#main-header').css('top', '90px');
                                slideDownHeight = 100;

                                $('#LDB1-AD').css('display', 'block');
                                $('#LDB1-AD').css('position', 'fixed');
                                var withd = parseInt(event.size[0]) / 2;
                                $('#LDB1-AD').css('left', 'calc(50% - ' + withd + 'px)');
                                $('#LDB1-AD').css('top', '0px');
                                if(slideDownHeight>0)
                                {
                                    $('#main-wrapper').css('margin-top',  20 + slideDownHeight + 'px');
                                }

                            }
                        }
                        if (event.slot === gptadslots[5]) {
                            if (!event.isEmpty) {
                                var headersHeight = $('#main-header').outerHeight();
                                $('#content').css('top', '0px');
                                $('#main-wrapper').css('margin-top',$('#main-header').height() + 5 + slideDownHeight+ 'px');
                            }
                        }
                        if (event.slot === gptadslots[6]) {
                            if (!event.isEmpty) {
                                $('#div-HDR_940x40').css('position','relative');
                                if(window.innerWidth > 1600 ){
                                    $('#div-HDR_940x40').css('left','calc(50% - 630px)');
                                }
                                else if(window.innerWidth <= 1600 && window.innerWidth>1024) {
                                    $('#div-HDR_940x40').css('left','calc(50% - 470px)');
                                }
                            }
                        }
                        if (event.slot === gptadslots[8]) {
                            if (!event.isEmpty) {
                                $('#div-txtlnk_Ros-2').css('height','60px');

                            }
                        }
                        if (event.slot === gptadslots[4]) {
                            if (!event.isEmpty)
                            {
                                mpu1Area = true;
                            }
                        }
                        if (event.slot === gptadslots[7]) {
                            if (!event.isEmpty)
                            {
                                $('.gcm300x250').css('height','250px');
                                $('.gcm300x250').css('margin-bottom','10px');
                                gcmArea = true;

                            }
                            if(!mpu1Area && !gcmArea)
                            {
                                $('.article-content-banner-right').hide();
                                $('.article-content-banner-right').css('border','0px');
                            }
                            if(mpu1Area && gcmArea)
                            {
                                $('.article-content-banner-right').show();
                                $('.article-content-banner-right').css('height','520px');
                            }
                        }
                        if(event.slot == gptadslots[8]) {
                            if(!event.isEmpty)
                            {
                                $('.gcm940x50').css('float','left');
                            }
                            if(!mpu1Area && !gcmArea)
                            {
                                $('.article-content-banner-right').hide();
                            }

                            if(mpu1Area && !gcmArea)
                            {
                                $('.article-content-banner-right .banner-sidebar').css('margin-bottom','0px');
                                $('.article-content-banner-right').css('border','0px');
                            }

                            if(!mpu1Area && gcmArea)
                            {
                                $('.article-content-banner-right .banner-sidebar').css('margin-bottom','0px');
                                $('.article-content-banner-right').css('border','0px');
                            }

                            if(mpu1Area && gcmArea)
                            {
                                $('.article-content-banner-right').show();
                                $('.article-content-banner-right').css('height','520px');
                            }
                        }
                    }
                    else if (DygDFP.device.isTablet())
                    {
                        if (event.slot === gptadslots[0]) {
                            if (!event.isEmpty) {
                                $("#div-Tepe_728x90").show();
                                $("#div-Tepe_728x90").css("height", 90);
                                $("#div-Tepe_728x90").css("text-align", "center");
                                $('#main-header').css('top', '90px');
                                slideDownHeight = 100;

                                $('#LDB1-AD').css('display', 'block');
                                $('#LDB1-AD').css('position', 'fixed');
                                var withd = parseInt(event.size[0]) / 2;
                                $('#LDB1-AD').css('left', 'calc(50% - ' + withd + 'px)');
                                $('#LDB1-AD').css('top', '0px');
                                if (slideDownHeight > 0) {
                                    $('#main-wrapper').css('margin-top', slideDownHeight + 'px');
                                    $('.mobile-menu-wrapper').css('top',"+="+parseInt(event.size[1]));
                                }
                            }
                        }

                        if(event.slot === gptadslots[1]){
                            if(!event.isEmpty){
                                if(DygDFP.section =="Anasayfa")
                                {
                                    $('.type-2-images-list').eq(1).find('li').eq(2).css('vertical-align','top');
                                    $('.type-2-images-list').eq(1).find('li').eq(3).find('.cover').remove();
                                    $('.type-2-images-list').eq(1).find('li').eq(3).find('.info').remove();
                                }
                                else if (DygDFP.section =="FotoGaleri" && getMetaTag('dyg:newsdetail') != undefined){
                                    $('.foto-list li').eq(0).css('vertical-align','top');
                                    $('.foto-list li').eq(1).find('.cover').remove();
                                    $('.foto-list li').eq(1).find('.info').remove();
                                }
                                else if (DygDFP.section =="VideoGaleri"){
                                    $('.foto-list li').eq(0).css('vertical-align','top');
                                    $('.foto-list li').eq(1).find('.cover').remove();
                                    $('.foto-list li').eq(1).find('.info').remove();
                                }
                                else if(DygDFP.section == "Haber"  &&  getMetaTag('dyg:newsdetail') != undefined){
                                    $('.article-content-banner-right').css('margin-bottom','21px');
                                }
                                else{//kategori
                                    $('.type-3-images-list li').eq(0).css('vertical-align','top');
                                    $('.type-3-images-list li').eq(1).find('.cover').remove();
                                    $('.type-3-images-list li').eq(1).find('.info').remove();
                                }

                            }
                        }

                    }
                    else if (DygDFP.device.isPhone())
                    {
                        if (event.slot === gptadslots[0]) {
                            if (!event.isEmpty) {
                                if(DygDFP.section == "FotoGaleri"){
                                    $('#LDB1-AD').css('display', 'block');
                                    var withd = parseInt(event.size[0]) / 2;
                                    $('#LDB1-AD').css('margin-left', 'calc(50% - ' + withd + 'px)');
                                    if(event.size[1]==50)
                                    {
                                        $('#content').css('margin-top','-41px');
                                    }
                                    var height =  event.size[1] - $('.main-nav').outerHeight();
                                    $('#div-Tepe_728x90').css('height',height+3-20);

                                }else if(DygDFP.section =="Piyasa"){
                                    $('#LDB1-AD').css('display', 'block');
                                    var withd = parseInt(event.size[0]) / 2;
                                    $('#LDB1-AD').css('margin-left', 'calc(50% - ' + withd + 'px)');
                                    if(event.size[1]==50)
                                    {
                                        $('#content').css('margin-top','-41px');
                                    }
                                    var height =  event.size[1] - $('.main-nav').outerHeight();
                                    $('#div-Tepe_728x90').css('height',height+3-20);
                                }
                                else if(DygDFP.section == "Teknoloji")
                                {
                                    $('#LDB1-AD').css('display', 'block');
                                    var withd = parseInt(event.size[0]) / 2;
                                    $('#LDB1-AD').css('margin-left', 'calc(50% - ' + withd + 'px)');
                                    if(event.size[1]==50)
                                    {
                                        $('#content').css('margin-top','-41px');
                                    }
                                    var height =  event.size[1] - $('.main-nav').outerHeight();
                                    $('#div-Tepe_728x90').css('height',height+3-20);
                                }
                                else if (DygDFP.section =="Haber")
                                {
                                    $('#LDB1-AD').css('display', 'block');
                                    var withd = parseInt(event.size[0]) / 2;
                                    $('#LDB1-AD').css('margin-left', 'calc(50% - ' + withd + 'px)');
                                    if(event.size[1]==50)
                                    {
                                        $('#content').css('margin-top','-21px');
                                    }
                                    var height =  event.size[1] - $('.main-nav').outerHeight();
                                    $('#div-Tepe_728x90').css('height',height+3-20);
                                }
                                else
                                {
                                    $('#LDB1-AD').css('display', 'block');
                                    var withd = parseInt(event.size[0]) / 2;
                                    $('#LDB1-AD').css('margin-left', 'calc(50% - ' + withd + 'px)');
                                    if(event.size[1]==50)
                                    {
                                        $('#content').css('top','55px');
                                    }
                                    var height =  event.size[1] - $('.main-nav').outerHeight();
                                    $('#div-Tepe_728x90').css('height',height+3);
                                }

                            }
                        }
                        if(event.slot ===gptadslots[1]) {
                            if(!event.isEmpty) {

                            }
                        }
                        for(i =2 ;i <= 6; i++){
                            if(event.slot ===gptadslots[i]) {
                                if(!event.isEmpty) {
                                    $('#div-300x250_Ros-'+(i-1)).css('height','');
                                    $('#div-300x250_Ros-'+(i-1)).css('margin-bottom','10px');
                                }
                            }
                        }

                    }
                });
                googletag.pubads().enableVideoAds();
                googletag.pubads().enableSingleRequest();
                googletag.pubads().enableAsyncRendering();
                googletag.enableServices();
            });



            if(window.innerWidth > 1600 ){
                DygDFP.PageSkin.containerWidth = 1280;
            }
            else if(window.innerWidth <= 1600 && window.innerWidth>1024) {
                DygDFP.PageSkin.containerWidth = 960;
            }

            $('#dygHeaderBanner').after("<div id='mastheadDiv'></div>");
            DygDFP.Masthead.appendSelector = $('#mastheadDiv');

            $(document).ready(function(){
                if(DygDFP.device.isWeb()) {

                    if ($('#LDB1-AD').length > 0) {
                        $('#LDB1-AD').append("<div id='div-Tepe_728x90' style='height:0px;'></div>");
                        googletag.cmd.push(function () {googletag.display('div-Tepe_728x90');})
                    }

                    if($('.gcm300x250').length > 0)
                    {
                        $('.gcm300x250').append("<div id='div-300x250_Ros-2' style='height:0px; margin-top: 20px;'></div>");
                        googletag.cmd.push(function () {googletag.display('div-300x250_Ros-2');})
                    }

                    if($('.gcm940x50').length > 0)
                    {
                        $('.gcm940x50').append("<div id='div-txtlnk_Ros-2' style='height:0px;'></div>");
                        googletag.cmd.push(function () {googletag.display('div-txtlnk_Ros-2');})
                    }


                    $("body").prepend("<div id='div-interstitial'></div>");
                    googletag.cmd.push(function () {googletag.display('div-interstitial');});

                    $("body").prepend("<div id='div-PageSkin' style='width:1px;height:1px;position:fixed;top:0'></div>");
                    googletag.cmd.push(function () {googletag.display('div-PageSkin');});

                    $('#dygHeaderBanner').append("<div id='div-HDR_940x40' style='margin-bottom:5px; margin-top: 10px; width: 940px;height: 40px;'></div>");
                    googletag.cmd.push(function(){googletag.display('div-HDR_940x40')});

                    $('#dygHeaderBanner').after("<div id='div-Masthead'></div>");
                    googletag.cmd.push(function () {googletag.display('div-Masthead');});


                    if ($('#sidebar_rklm1').length > 0) {
                        $('#sidebar_rklm1').append("<div id='div-MPU_Fix'style='margin-top: 20px;'></div>");
                        googletag.cmd.push(function () {googletag.display('div-MPU_Fix');});
                    }

                    if ($('#sidebar_rklm2').length > 0) {

                        if (getMetaTag('dyg:newsdetail')){
                            //$('#sidebar_rklm2').eq(1).parent().remove();
                            $('#sidebar_rklm2').append("<div id='div-300x250_Ros-1'></div>");
                        }
                        else {
                            $('#sidebar_rklm2').append("<div id='div-300x250_Ros-1'></div>");
                            var domObj = $('#sidebar_rklm2');
                            domObj.css('margin-top', '0px');
                            domObj.css('margin-bottom', '10px');
                            if (DygDFP.section == "Anasayfa") {
                                if (window.innerWidth <= 1600 && window.innerWidth > 1025) {
                                    domObj.css('margin-top', '0px');
                                    domObj.css('margin-bottom', '10px');
                                    domObj.css('float', 'right');
                                    domObj.remove();
                                    $('.type-2-images-list ul').eq(0).prepend(domObj);
                                }
                            }
                        }
                        googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                    }

                    if (DygDFP.section =="FotoGaleri" && $('.share-buttons').length > 0) //fotogaleri detay
                    {
                        //$('#div-300x250_Ros-1').remove();
                        //$('.share-buttons').after("<div id='div-300x250_Ros-1' style='margin-top: 10px'></div>");
                        googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                    }

                    if (DygDFP.section =="VideoGaleri" && $('.share-buttons').length > 0) //videogaleri detay
                    {
                        //$('#div-300x250_Ros-1').remove();
                        //$('.share-buttons').after("<div id='div-300x250_Ros-1' style='margin-top: 7px'></div>");
                        googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                    }

                    if(DygDFP.section == "Piyasa" && $('.w300.col').length > 0) // BIST, Döviz, Emtia banner
                    {
                        $('.w300.col').prepend("<div id='div-300x250_Ros-1' style='margin-bottom: 10px'></div>");
                        googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                    }

                    if(DygDFP.section == "CanliYayin" && $('.share-buttons').length> 0) // CanliYayin
                    {
                        //$('#div-300x250_Ros-1').remove();
                        //$('.share-buttons').after("<div id='div-300x250_Ros-1' style='margin-top: 10px'></div>");

                        googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                    }

                }
                else if(DygDFP.device.isPhone()){

                    if($('.gcm940x50').length > 0)
                    {
                        $('.gcm940x50').append("<div id='div-txtlnk_Ros-2' style='height:0px;'></div>");
                        googletag.cmd.push(function () {googletag.display('div-txtlnk_Ros-2');})
                    }

                    if (getMetaTag('dyg:newsdetail')){
                        if ($('#sidebar_rklm2').length > 0) {
                            $('#sidebar_rklm2').eq(0).parent().remove();
                            $('#sidebar_rklm2').append("<div id='div-300x250_Ros-1'></div>");
                            googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                        }
                    }
                    else {
                        if (DygDFP.section =="Piyasa"){
                            switch (DygDFP.target)
                            {
                                case "":
                                    $('.foreks-haberleri').before("<div id='div-300x250_Ros-1' style='height:0px; margin-top: 20px;'></div>");
                                    googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                                    break;
                                case "BIST":
                                    $('#piyasalar-haber').before("<div id='div-300x250_Ros-1' style='height:0px; margin-top: 20px;'></div>");
                                    googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                                    break;
                                case "Doviz":
                                    $('#piyasalar-haber').before("<div id='div-300x250_Ros-1' style='height:0px; margin-top: 20px;'></div>");
                                    googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                                    break;
                                case "Emtia":
                                    $('#piyasalar-haber').before("<div id='div-300x250_Ros-1' style='height:0px; margin-top: 20px;'></div>");
                                    googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                                    break;
                            }
                        }
                        else {

                        if ($('.foto-detay-slider').length > 0) {
                            if ($('#main-footer').length > 0) {
                                $('#main-footer').before("<div id='div-300x250_Ros-1' style='margin-bottom: 10px;' ></div>");
                                $('#div-300x250_Ros-1').css('margin-left', 'calc(50% - 150px)');
                                $('#content').css('margin-bottom', '85px');
                                googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');})
                            }
                            $('.foto-list-wrapper').before("<div id='div-300x250_Ros-1' style='margin-bottom: 10px;' ></div>");
                            googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');})
                        }

                        var AdCount = 7;
                        var AdsIndex = 2;
                        var localLoopCounter = 0;
                        var initCount = 0;//recount after put the div.
                        var totalItemCounter = 2;
                        if ($('#manset-slider .slider .slider-item').length > 0) //manþet slider
                        {
                            var allItemCount = $('#manset-slider .slider .slider-item').length;
                            for (var itemIndex = 2; itemIndex <= allItemCount; itemIndex++) {
                                totalItemCounter++;
                                if (AdsIndex == 2) {
                                    if (itemIndex == 2) {
                                        AdsIndex++;
                                        $('#manset-slider .slider .slider-item').eq(itemIndex).after("<div id='div-300x250_Ros-" + (AdsIndex - 2) + "' style='height:0px;'></div>");
                                        googletag.cmd.push(function () {
                                            googletag.display('div-300x250_Ros-' + (AdsIndex - 2));
                                        });
                                        initCount = 0;
                                        localLoopCounter = totalItemCounter + 5;
                                    }
                                }
                                else {
                                    if (localLoopCounter == totalItemCounter) {
                                        AdsIndex++;
                                        $('#manset-slider .slider .slider-item').eq(itemIndex).after("<div id='div-300x250_Ros-" + (AdsIndex - 2) + "' style='height:0px;'></div>");
                                        googletag.cmd.push(function () {
                                            googletag.display('div-300x250_Ros-' + (AdsIndex - 2));
                                        });
                                        initCount = 0;
                                        localLoopCounter = totalItemCounter + 5;
                                    }
                                }
                            }
                        }

                        if (AdCount > AdsIndex) {
                            if ($('.manset-slider-right li').length > 0) {
                                var allItemCount = $('.manset-slider-right li').length;
                                for (var itemIndex = 0; itemIndex <= allItemCount; itemIndex++) {
                                    totalItemCounter++;
                                    if (localLoopCounter == totalItemCounter) {
                                        AdsIndex++;
                                        $('.manset-slider-right li').eq(itemIndex).after("<div id='div-300x250_Ros-" + (AdsIndex - 2) + "' style='height:0px;'></div>");
                                        googletag.cmd.push(function () {googletag.display('div-300x250_Ros-' + (AdsIndex - 2));});
                                        initCount = 0;
                                        localLoopCounter = totalItemCounter + 5;
                                        if (AdCount == AdsIndex) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        if (AdCount > AdsIndex) {
                            if ($('.type-2-images-list').length > 0) {
                                var items = $('.type-2-images-list').length;
                                for (var i = 0; i < items; i++) {
                                    var AllItem = $('.type-2-images-list').eq(i).find('li');
                                    for (var j = 0; j < AllItem.length; j++) {
                                        totalItemCounter++;
                                        if (localLoopCounter == totalItemCounter) {
                                            AdsIndex++;
                                            $('.type-2-images-list').eq(i).find('li').eq(j).after("<div id='div-300x250_Ros-" + (AdsIndex - 2) + "' style='height:0px;'></div>");
                                            googletag.cmd.push(function () {googletag.display('div-300x250_Ros-' + (AdsIndex - 2));});
                                            initCount = 0;
                                            localLoopCounter = totalItemCounter + 5;
                                            if (AdCount == AdsIndex) {
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (AdCount > AdsIndex) {
                            if ($('#gundem-list li').length > 0) {
                                var items = $('#gundem-list li').length;

                                for (var i = 0; i < items; i++) {
                                    totalItemCounter++;
                                    if (localLoopCounter == totalItemCounter) {
                                        AdsIndex++;
                                        $('#gundem-list li').eq(i).after("<div id='div-300x250_Ros-" + (AdsIndex - 2) + "' style='height:0px;'></div>");
                                        googletag.cmd.push(function () {googletag.display('div-300x250_Ros-' + (AdsIndex - 2));});
                                        initCount = 0;
                                        localLoopCounter = totalItemCounter + 5;
                                        if (AdCount == AdsIndex) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        if (AdCount > AdsIndex) {
                            if ($('#gundem-alti-promo li').length > 0) {
                                var items = $('#gundem-alti-promo li').length;
                                for (var i = 0; i < items; i++) {
                                    totalItemCounter++;
                                    if (localLoopCounter == totalItemCounter) {
                                        AdsIndex++;
                                        $('#gundem-alti-promo li').eq(i).after("<div id='div-300x250_Ros-" + (AdsIndex - 2) + "' style='height:0px;'></div>");
                                        googletag.cmd.push(function () {googletag.display('div-300x250_Ros-' + (AdsIndex - 2));});
                                        initCount = 0;
                                        localLoopCounter = totalItemCounter + 5;
                                        if (AdCount == AdsIndex) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        /*if(AdCount > AdsIndex)
                        {
                            if(localLoopCounter == 0){
                                localLoopCounter =2;
                                totalItemCounter =localLoopCounter-1;
                                AdsIndex =2;
                            }

                            if($('#MoreNews li').length > 0){
                                var items= $('#MoreNews li').length;
                                for(var i = 0 ; i< items ; i++){
                                    totalItemCounter++;
                                    if (localLoopCounter == totalItemCounter) {
                                        AdsIndex++;
                                        $('#MoreNews li').eq(i).after("<div id='div-300x250_Ros-" + (AdsIndex - 2) + "' style='height:0px;'></div>");
                                        googletag.cmd.push(function () {googletag.display('div-300x250_Ros-' + (AdsIndex - 2));});
                                        initCount = 0;
                                        localLoopCounter = totalItemCounter + 5;
                                        if (AdCount == AdsIndex) {
                                            break;
                                        }
                                    }
                                }
                            }

                        }*/

                        if(AdCount > AdsIndex) {
                            if(localLoopCounter == 0){
                                localLoopCounter =2;
                                totalItemCounter =localLoopCounter-1;
                                AdsIndex =2;
                            }

                            if($('.type-3-images-list li').length > 0){
                                var items= $('.type-3-images-list li').length;
                                for(var i = 0 ; i< items ; i++){
                                    totalItemCounter++;
                                    if (localLoopCounter == totalItemCounter) {
                                        AdsIndex++;
                                        $('.type-3-images-list li').eq(i).after("<div id='div-300x250_Ros-" + (AdsIndex - 2) + "' style='height:0px;'></div>");
                                        googletag.cmd.push(function () {googletag.display('div-300x250_Ros-' + (AdsIndex - 2));});
                                        initCount = 0;
                                        localLoopCounter = totalItemCounter + 5;
                                        if (AdCount == AdsIndex) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        if(AdCount > AdsIndex){
                            if(localLoopCounter == 0){
                                localLoopCounter =2;
                                totalItemCounter =localLoopCounter-1;
                                AdsIndex =2;
                            }

                            if($('.foto-list li').length > 0){
                                var items = $('.foto-list li').length;
                                for(var i = 0 ;i< items ; i++){
                                    totalItemCounter++;
                                    if (localLoopCounter == totalItemCounter){
                                        AdsIndex++;
                                        $('.foto-list li').eq(i).after("<div id='div-300x250_Ros-" + (AdsIndex - 2) + "' style='height:0px;'></div>");
                                        googletag.cmd.push(function () {googletag.display('div-300x250_Ros-' + (AdsIndex - 2));});
                                        initCount = 0;
                                        localLoopCounter = totalItemCounter + 5;
                                        if (AdCount == AdsIndex) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        }
                    }

                    $("body").prepend("<div id='div-interstitial'></div>");
                    googletag.cmd.push(function () {googletag.display('div-interstitial');});

                    if ($('#LDB1-AD').length > 0)
                    {
                        if(DygDFP.section == "FotoGaleri"){
                            var outerHeight = $('.main-nav').outerHeight();
                            $('#LDB1-AD').append("<div id='div-Tepe_728x90' style='display: none;'></div>");
                            $('#div-Tepe_728x90').css('margin-top',outerHeight+3);
                            googletag.cmd.push(function () {googletag.display('div-Tepe_728x90');})
                        }
                        else
                        {
                            var outerHeight = $('.main-nav').outerHeight();
                            $('#LDB1-AD').append("<div id='div-Tepe_728x90' style='display: none;'></div>");
                            $('#div-Tepe_728x90').css('margin-top',outerHeight+3);
                            googletag.cmd.push(function () {googletag.display('div-Tepe_728x90');})
                        }
                    }
                }
                else if (DygDFP.device.isTablet()) {


                    if($('.gcm940x50').length > 0)
                    {
                        $('.gcm940x50').append("<div id='div-txtlnk_Ros-2' style='height:0px;'></div>");
                        googletag.cmd.push(function () {googletag.display('div-txtlnk_Ros-2');})
                    }


                    if (getMetaTag('dyg:newsdetail')){
                        if ($('#sidebar_rklm2').length > 0) {
                           // $('#sidebar_rklm2').eq(0).parent().remove();
                            $('#sidebar_rklm2').append("<div id='div-300x250_Ros-1'></div>");
                            googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                        }
                    }
                    else {
                        if ($('#sidebar_rklm2').length > 0) {
                            if(DygDFP.section == "Anasayfa")
                            {
                                $('#sidebar_rklm2').remove();

                                $('.type-2-images-list').eq(1).find('li').eq(3).prepend("<div id='div-300x250_Ros-1'></div>");
                                googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                            }
                            else if (DygDFP.section =="FotoGaleri" && getMetaTag('dyg:newsdetail') != undefined){
                                $('.foto-list li').eq(1).prepend("<div id='div-300x250_Ros-1'></div>");
                                googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                            }
                            else if (DygDFP.section =="VideoGaleri"){
                                $('.foto-list li').eq(1).prepend("<div id='div-300x250_Ros-1'></div>");
                                googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                            }
                            else if(getMetaTag('dyg:newsdetail')){

                            }
                            else{//kategori
                                $('.type-3-images-list li').eq(1).prepend("<div id='div-300x250_Ros-1'></div>");
                                googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                            }

                        }
                    }

                    $("body").prepend("<div id='div-interstitial'></div>");
                    googletag.cmd.push(function () {googletag.display('div-interstitial');});

                    if ($('#LDB1-AD').length > 0) {
                        $('#LDB1-AD').append("<div id='div-Tepe_728x90' ></div>");
                        googletag.cmd.push(function () {googletag.display('div-Tepe_728x90');})
                    }
                }
            });
        },
        preparePageSkin: function (hasTopImage) {

            var headersHeight = $('#main-header').outerHeight();
            headersHeight = headersHeight + slideDownHeight - ($('.open-graph-container').is(':visible')? $('.open-graph-container').height():0);

            $("#LeftSkin").css('z-index','300');
            $("#RightSkin").css('z-index','300');
            if($(window).scrollTop() >= headersHeight){
                var topHeight =$('.main-nav').outerHeight();
                $("#LeftSkin").css("position","fixed");
                $("#LeftSkin").css("top",topHeight);
                $("#RightSkin").css("position","fixed");
                $("#RightSkin").css("top",topHeight);
                //$("#RightSkin").css('width', '305px');
                //$("#RightSkin").css('right', '0px');
            }
            else{
                $("#LeftSkin").css("position","absolute");
                $("#LeftSkin").css("top", headersHeight );
                $("#RightSkin").css("position","absolute");
                $("#RightSkin").css("top", headersHeight );
            }

            $("#main-footer").css("z-index",99999);
            $("#main-footer").css("position","relative");

            if(hasTopImage){
                DygDFP.PageSkin.changeMarginTop();
            }
            else{
                //DygDFP.PageSkin.marginTop = DygDFP.PageSkin.marginTop + 3;
                //DygDFP.PageSkin.changeMarginTop();
                DygDFP.PageSkin.show(true);
            }
        },
        preparePageSkinPosition : function(){},
        prepareHtml5Masthead:function(){
            $("#mastheadDiv").css("margin-bottom",10);
        }
    }
};

$(document).ready(function(){
    //console.log('local-321');

    DygDFP.Brand.NtvPara.init();

    $(window).resize(function(){
        if(window.innerWidth > 1600 ){
            DygDFP.PageSkin.containerWidth = 1280;
        }
        else if(window.innerWidth <= 1600 && window.innerWidth>1024) {
            DygDFP.PageSkin.containerWidth = 960;
        }
        DygDFP.PageSkin.resize();
    });

    $(window).scroll(function () {
        var headersHeight = $('#main-header').outerHeight();
        /*if ($("#div-Tepe_728x90").is(":visible")) {
            headersHeight = headersHeight + slideDownHeight - ($('.open-graph-container').is(':visible') ? $('.open-graph-container').height() : 0);
        }*/
        if ($(".adPartContainer").length > 0) {
            if ($(window).scrollTop() >= headersHeight) {
                var topHeight = $('.main-nav').outerHeight();
                $("#LeftSkin").css("position", "fixed");
                $("#LeftSkin").css("top", topHeight );
                $("#RightSkin").css("position", "fixed");
                $("#RightSkin").css("top", topHeight);
            }
            else {
                $("#LeftSkin").css("position", "absolute");
                $("#LeftSkin").css("top", headersHeight+ slideDownHeight);
                $("#RightSkin").css("position", "absolute");
                $("#RightSkin").css("top", headersHeight + slideDownHeight);
            }
        }

        if(DygDFP.device.isWeb()) {
            if ($(window).scrollTop() <= 130) {
                if (slideDownHeight> 0) {
                    $('#LDB1-AD').css('display', 'block');
                    $('#LDB1-AD').css('position', 'fixed');
                    //$('#LDB1-AD').css('left', 'calc(50% - 364px)');
                    //$('#LDB1-AD').css('top', '0px');
                    $('#main-wrapper').css('margin-top',  slideDownHeight + 'px');
                }
            }
            else {
                if (slideDownHeight > 0) {
                    $('#LDB1-AD').css('display', 'none');
                    $('#main-wrapper').css('margin-top',  slideDownHeight + 'px');
                }
            }
        } else if (DygDFP.device.isTablet()){
            if ($(window).scrollTop() <= 130) {
                if (slideDownHeight > 0) {
                    $('#LDB1-AD').css('display', 'block');
                    $('#LDB1-AD').css('position', 'fixed');
                    $('#LDB1-AD').css('left', 'calc(50% - 364px)');
                    //$('#LDB1-AD').css('top', '0px');
                    $('#main-wrapper').css('margin-top', headersHeight  + 'px');
                }
            }
            else {
                if (slideDownHeight > 0) {
                    $('#LDB1-AD').css('display', 'none');
                    $('#main-wrapper').css('margin-top', headersHeight + 'px');
                }
            }
        }


    });

});


