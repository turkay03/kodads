DygDFP.brand ={
    GQ : {
        init:function(){
            //alert('123');
            googletag.cmd.push(function(){
                //DygDFP.section = 'Test';
                var section = DygDFP.section;
                var tags = Array(100);

                var arrayIndex = 0;
                if(DygDFP.target!= ""){
                    if(DygDFP.target.indexOf(',')>-1){
                        for(var i = 0 ;DygDFP.target.split(',').length; i++ ){
                            arrayIndex++;
                            tags[arrayIndex] = DygDFP.target.split(',')[i];
                        }
                    }
                    else{
                        tags[arrayIndex] = DygDFP.target;
                    }
                }

                if(DygDFP.categories !="")
                {
                    for(var i = 0; DygDFP.categories.split(',').length; i++)
                    {
                        arrayIndex++;
                        tags[arrayIndex] = DygDFP.target.split(',')[i];
                    }
                }

                googletag.pubads().setTargeting('gq_cat',tags);


                if (DygDFP.device.isPhone()) {
                    //define mobile slots
                    gptadslots[0] = googletag.defineSlot('/37011203/Mobile/GQ/Mobile_Site/' + DygDFP.section + '/INS', [[320, 480]], 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    gptadslots[1] = googletag.defineSlot('/37011203/Mobile/GQ/Mobile_Site/' + DygDFP.section + '/LDB', [[320, 50]] , 'div-Tepe_320x50').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

                    if($('#sideAD1').length > 0)
                    {
                        gptadslots[2] =googletag.defineSlot('/37011203/Mobile/GQ/Mobile_Site/' + DygDFP.section + '/MPU1', [[300, 250]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if($('#sideAD2').length > 0)
                    {
                        gptadslots[3] =googletag.defineSlot('/37011203/Mobile/GQ/Mobile_Site/' + DygDFP.section + '/MPU2', [[300, 250]], 'div-300x250_Ros-2').setTargeting('pos', ['mpu2']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if($('#sideAD3').length > 0)
                    {
                        gptadslots[4] =googletag.defineSlot('/37011203/Mobile/GQ/Mobile_Site/' + DygDFP.section + '/MPU3', [[300, 250]], 'div-300x250_Ros-3').setTargeting('pos', ['mpu3']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if($('#sideAD4').length > 0)
                    {
                        gptadslots[5] =googletag.defineSlot('/37011203/Mobile/GQ/Mobile_Site/' + DygDFP.section + '/MPU4', [[300, 250]], 'div-300x250_Ros-4').setTargeting('pos', ['mpu4']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if($('#sideAD5').length > 0)
                    {
                        gptadslots[6] =googletag.defineSlot('/37011203/Mobile/GQ/Mobile_Site/' + DygDFP.section + '/MPU5', [[300, 250]], 'div-300x250_Ros-5').setTargeting('pos', ['mpu5']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }
                }
                else if (DygDFP.device.isTablet()) {
                    //define mobile slots
/*                    gptadslots[0] = googletag.defineSlot('/37011203/Mobile/GQ/Mobile_Site/' + DygDFP.section + '/INS', [[768, 1024]], 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    gptadslots[1] = googletag.defineSlot('/37011203/Mobile/GQ/Mobile_Site/' + DygDFP.section + '/LDB', 'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);

                    if($('#sideAD1').length > 0)
                    {
                        gptadslots[2] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if($('#sideAD2').length > 0)
                    {
                        gptadslots[3] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU2', [[300, 250], [300, 600]], 'div-300x250_Ros-2').setTargeting('pos', ['mpu2']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if($('#sideAD3').length > 0)
                    {
                        gptadslots[4] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU3', [[300, 250], [300, 600]], 'div-300x250_Ros-3').setTargeting('pos', ['mpu3']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if($('#sideAD4').length > 0)
                    {
                        gptadslots[5] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU4', [[300, 250], [300, 600]], 'div-300x250_Ros-4').setTargeting('pos', ['mpu4']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if($('#sideAD5').length > 0)
                    {
                        gptadslots[6] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU5', [[300, 250], [300, 600]], 'div-300x250_Ros-5').setTargeting('pos', ['mpu5']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }
*/
                }
                else {
                //web and others
                    //define web site slots
                    gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);

                    if($("#LDB1-AD").length > 0){
                        gptadslots[1] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/LDB',[[728, 90], [970, 90]],'div-Tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    }

                    if ($('#sideAD1').length > 0) {
                        gptadslots[2] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                        gptadslots[9] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU5', [[300, 250], [300, 600]], 'div-300x250_Ros-5').setTargeting('pos', ['mpu5']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }
                    else if($("#fotogaleri-detay-300x250").length > 0){
                        gptadslots[2] = googletag.defineSlot('/37011203/Web/'+DygDFP.siteName+'/'+DygDFP.section+'/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    }

                    if ($('#sideAD2').length > 0) {
                        gptadslots[3] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU2', [[300, 250], [300, 600]], 'div-300x250_Ros-2').setTargeting('pos', ['mpu2']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if ($('#sideAD3').length > 0) {

                        gptadslots[4] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU3', [[300, 250], [300, 600]], 'div-300x250_Ros-3').setTargeting('pos', ['mpu3']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                        gptadslots[5] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU4', [[300, 250], [300, 600]], 'div-300x250_Ros-4').setTargeting('pos', ['mpu4']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if($('#sideAD4').length > 0){
                        gptadslots[6] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-5').setTargeting('pos', ['mpu3']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                        gptadslots[7] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU2', [[300, 250], [300, 600]], 'div-300x250_Ros-6').setTargeting('pos', ['mpu4']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if($('#sideAD5').length > 0){
                        gptadslots[8] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU3', [[300, 250], [300, 600]], 'div-300x250_Ros-7').setTargeting('pos', ['mpu3']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                        gptadslots[9] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU4', [[300, 250], [300, 600]], 'div-300x250_Ros-8').setTargeting('pos', ['mpu4']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if($('#sideAD6').length > 0){
                        gptadslots[1] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU2', [[300, 250], [300, 600]], 'div-300x250_Ros-2').setTargeting('pos', ['mpu3']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if($('#sideAD7').length > 0){
                        gptadslots[3] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU3', [[300, 250], [300, 600]], 'div-300x250_Ros-3').setTargeting('pos', ['mpu3']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                        gptadslots[4] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU4', [[300, 250], [300, 600]], 'div-300x250_Ros-4').setTargeting('pos', ['mpu4']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }


                    if($('#sideAD8').length > 0){
                        gptadslots[1] = googletag.defineSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MPU1', [[300, 250], [300, 600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu3']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                    if($('#sideAD9').length > 0){
                        gptadslots[1] = googletag.defineOutOfPageSlot('/37011203/Web/' + DygDFP.siteName + '/' + DygDFP.section + '/MSTHD', 'div-970x250_Ros-8').setTargeting('pos', ['MSTHD']).addService(googletag.pubads()).setCollapseEmptyDiv(true, true);
                    }

                }


                googletag.pubads().addEventListener('slotRenderEnded', function(event){
                    if(event.slot == gptadslots[1]){
                        if(!event.isEmpty){
                            $("#LDB1-AD").show();
                            if(DygDFP.device.isWeb()){
                                $("#div-Tepe_728x90").show(function(){
                                    $("#div-Tepe_728x90").children('div').height('8');
                                });
                            }
                            else{
                                $("#div-Tepe_320x50").show(function(){
                                    $("#div-Tepe_320x50").children('div').height('8');
                                });
                            }
                        }
                    }
					else if(event.slot == gptadslots[2]){
						if(!event.isEmpty){
							if(DygDFP.section == "Anasayfa"){
								$("#widget_icerik_liste_2li_7 .content-list-type-1>div").eq(0).hide();
							}
						}
					}
					else if(event.slot == gptadslots[9]){
						if(!event.isEmpty){
							if(DygDFP.section == "Anasayfa"){
								$("#widget_icerik_liste_2li_7 .content-list-type-1>div").eq(1).hide();
							}
						}
					}
					else if(event.slot == gptadslots[3]){
						if(!event.isEmpty){
							if(DygDFP.section == "Anasayfa"){
								$("#widget_icerik_liste_2li_9 .content-list-type-1 div").hide();
							}
						}
					}
                });

                googletag.pubads().enableSingleRequest();
                googletag.pubads().enableAsyncRendering();
                googletag.enableServices();
                DygDFP.section = section;
            });

            $("#widget_dfp_4").after('<div id="mastheadDiv" style="margin-bottom:10px;margin-top:10px"></div>');
            DygDFP.Masthead.appendSelector ="#mastheadDiv";

            $(document).ready(function () {

                $("body").append("<div id='div-interstitial' class='DFP_INS' style='display:none'></div>");
                googletag.cmd.push(function () { googletag.display('div-interstitial'); });

                if($("#LDB1-AD").length > 0){
                    if(DygDFP.device.isWeb())
                    {
                        $("#LDB1-AD").append("<div id='div-Tepe_728x90' style='display:none;height:10px;'></div>");
                        googletag.cmd.push(function () { googletag.display('div-Tepe_728x90'); });

                        if (DygDFP.device.isPhone() || DygDFP.device.isTablet()) {
                            $("#LDB1-AD").css("margin","auto");
                        }
                    }
                    else{
                        $("#LDB1-AD").append("<div id='div-Tepe_320x50' style='display:none;height:10px;'></div>");
                        googletag.cmd.push(function () { googletag.display('div-Tepe_320x50'); });

                        if (DygDFP.device.isPhone() || DygDFP.device.isTablet()) {
                            $("#LDB1-AD").css("margin","auto");
                        }
                    }
                }

                if($("#fotogaleri-detay-300x250").length > 0){
                    $('#fotogaleri-detay-300x250').append("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:40px'></div>");
                    googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
                }

                if(DygDFP.device.isWeb())
                {
                    //open in pc
                    if($('#sideAD1').length>0){
                        if(DygDFP.section == "GQ_TV"){
                            $("#sideAD1").append("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px;margin-top:-20px'></div>");
                        }
                        else if(DygDFP.section == "Anasayfa"){
                            if(window.innerWidth >1365)
                            {
                                $("#sideAD1").append("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px'></div>");
                            }
                            else if(window.innerWidth <= 1365)
                            {
                                $('#sideAD2').prepend("<div id='div-300x250_Ros-1' style='display:none;margin-top: 10px; margin-bottom:10px'></div>");
                            }
                        }
                        else{
                            $("#sideAD1").append("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px;margin-top:10px'></div>");
                        }
                        $("#sideAD1").append("<div id='div-300x250_Ros-5' style='display:none;margin-bottom:10px;margin-top:26px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-5'); });
                    }

                    if($("#sideAD2").length > 0){
                        $("#sideAD2").append("<div id='div-300x250_Ros-2' style='display:none;margin-bottom:10px;margin-top:10px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-2'); });
                    }

                    if($('#sideAD3').length > 0){
                        $('#sideAD3').append("<div id='div-300x250_Ros-3' style='display:none;margin-bottom:10px;margin-top: 33px'></div>");
                        $('#sideAD3').append("<div id='div-300x250_Ros-4' style='display:none;margin-bottom:10px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-3'); });
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-4'); });
                    }


                    if($('#sideAD4').length > 0) {
                        $('#sideAD4').append("<div id='div-300x250_Ros-5' style='display:none;margin-bottom:10px;margin-top:10px'></div>");
                        $('#sideAD4').append("<div id='div-300x250_Ros-6' style='display:none;margin-bottom:10px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-5'); });
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-6'); });
                    }

                    if($('#sideAD5').length > 0) {
                        $('#sideAD5').append("<div id='div-300x250_Ros-6' style='display:none;margin-bottom:10px'></div>");
                        $('#sideAD5').append("<div id='div-300x250_Ros-7' style='display:none;margin-bottom:10px;margin-top: 33px;'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-7'); });
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-8'); });
                    }


                    if($('#sideAD6').length > 0){
                        $('#sideAD6').append("<div id='div-300x250_Ros-2' style='display:none;margin-bottom:10px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-2'); });
                    }

                    if($('#sideAD7').length > 0){
                        $('#sideAD7').append("<div id='div-300x250_Ros-3' style='display:none;margin-bottom:10px'></div>");
                        $('#sideAD7').append("<div id='div-300x250_Ros-4' style='display:none;margin-bottom:10px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-3'); });
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-4'); });
                    }

                    if($('#sideAD8').length > 0){
                        $('#sideAD8').append("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
                    }

                    if($('#sideAD9').length > 0) {
                        $('#sideAD9').append("<div id='div-970x250_Ros-8' style='display:none;margin-bottom:10px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-970x250_Ros-8'); });
                    }
                }
                else{//mobile and tablet
                    if($('#MobilSideAd1').length>0) {
                        $("#MobilSideAd1").append("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
                    }

                    if($('#MobilSideAd2').length>0) {
                        $("#MobilSideAd2").append("<div id='div-300x250_Ros-2' style='display:none;margin-bottom:10px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-2'); });
                    }

                    if($('#MobilSideAd3').length>0) {
                        $("#MobilSideAd3").append("<div id='div-300x250_Ros-3' style='display:none;margin-bottom:10px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-3'); });
                    }

                    if($('#MobilSideAd4').length>0) {
                        $("#MobilSideAd4").append("<div id='div-300x250_Ros-4' style='display:none;margin-bottom:10px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-4'); });
                    }

                    if($('#MobilSideAd5').length>0) {
                        $("#MobilSideAd5").append("<div id='div-300x250_Ros-5' style='margin-bottom:10px;margin-top:26px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-5'); });
                    }
                }
            });

        },
        preparePageSkin: function (hasTopImage) {},
        preparePageSkinPosition : function(){},
        prepareVPaid: function(){},
        prepareHtml5Masthead:function(){
            $("#mastheadPanel").css("margin-bottom",10);
        }
    }
};

var rtime;
var timeout = false;
var delta = 200;
$(window).resize(function() {
    console.log(window.innerWidth);
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        showHide();
    }
}

function showHide()
{
    var windowWidth = $( document ).width();
    var theSideAd1=$('#sideAD1');
    if(windowWidth <1345)
    {
        //theSideAd1.remove();
        //$('#widget_dfp_6').append(theSideAd1);
    }
    else{
        //theSideAd1.remove();
        //$('#widget_dfp_10').append(theSideAd1);
    }
}


$(document).ready(function(){
    //showHide();

    DygDFP.brand.GQ.init();
});