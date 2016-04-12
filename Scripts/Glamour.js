DygDFP.brand={
    Glamour: {
        init: function () {
//alert('hello');
            googletag.cmd.push(function(){
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

                googletag.pubads().setTargeting('glamourcat',tags);
                if(DygDFP.section == "Glamour Club")
                {
                    DygDFP.section='GlamourClub';
                }

                if(DygDFP.device.isPhone()){

                }
                else if(DygDFP.device.isTablet()){

                }
                else{
                    gptadslots[0] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + DygDFP.section + '/LDB1',[[728,90],[970,90],[970,250]], 'div-tepe_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    gptadslots[1] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + DygDFP.section + '/LDB2',[[728,90],[970,90],[970,250],[600,300]], 'div-tepe2_728x90').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);

                    gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/'+DygDFP.siteName+'/Desktop/'+DygDFP.section+ '/INS', 'div-interstitial').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);

                    gptadslots[3] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + DygDFP.section + '/MPU1',[[300,250],[300,600]], 'div-300x250_Ros').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    gptadslots[4] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + DygDFP.section + '/MPU2',[[300,250],[300,600]], 'div-300x250_Ros-1').setTargeting('pos', ['mpu2']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    gptadslots[5] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + DygDFP.section + '/MPU3',[[300,250],[300,600]], 'div-300x250_Ros-2').setTargeting('pos', ['mpu3']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                    gptadslots[4] = googletag.defineSlot('/37011203/' + DygDFP.siteName + '/Desktop/' + DygDFP.section + '/MPU4',[[300,250],[300,600]], 'div-300x250_Ros-3').setTargeting('pos', ['mpu4']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
                }
                googletag.pubads().addEventListener('slotRenderEnded', function(event){
                    if(DygDFP.device.isWeb()){
                        if (event.slot === gptadslots[0]) {
                            if (!event.isEmpty) {
                                $('div-tepe_728x90').css('height',0);
                            }
                        }
                        /*var heightTotal = $('#ad-300x250').height() + $('#ad-300x600').height() +20;
                        if(heightTotal > $('.BoxContainer').height()){
                           // $('.BoxContainer').height(heightTotal+20);
                        }*/
                    }

                });
                googletag.pubads().enableSingleRequest();
                googletag.pubads().enableAsyncRendering();
                googletag.enableServices();
                DygDFP.section = section;

            });

            $(document).ready(function(){

                if(DygDFP.device.isWeb()){

                    $('body').prepend("<div id='div-interstitial' class='DFP_INS' style='display:none'></div>");
                    googletag.cmd.push(function () { googletag.display('div-interstitial'); });

                    googletag.cmd.push(function () { googletag.display('div-tepe_728x90'); });
                    googletag.cmd.push(function () { googletag.display('div-tepe2_728x90'); });


                    if($('#ad-300x600').length > 0){
                        if(DygDFP.target =='OlurOlmaz'){
                            $('#ad-300x600').append("<div id='div-300x250_Ros' style='display:none;margin-bottom:10px;margin-top: 20px;'></div>");
                            googletag.cmd.push(function () {googletag.display('div-300x250_Ros');});
                        }
                        else if($('#GalleryPageContainer').length > 0)
                        {
                            $('#ad-300x600').append("<div id='div-300x250_Ros' style='display:none;margin-bottom:10px;margin-top: 20px;margin-left: 20px;'></div>");
                            googletag.cmd.push(function () {googletag.display('div-300x250_Ros');});
                        }
                        else {
                            $('#ad-300x600').append("<div id='div-300x250_Ros' style='display:none;margin-bottom:10px;'></div>");
                            googletag.cmd.push(function () {googletag.display('div-300x250_Ros');});
                        }
                    }

                    if($('#ad-300x250').length > 0){

                        if($('#GalleryPageContainer').length > 0)
                        {
                            $('#ad-300x250').append("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px;margin-top: 20px;margin-left: 20px;'></div>");
                            googletag.cmd.push(function () {googletag.display('div-300x250_Ros-1');});
                        }
                        else{
                            $('#ad-300x250').append("<div id='div-300x250_Ros-1' style='display:none;margin-bottom:10px;margin-top:10px'></div>");
                            googletag.cmd.push(function () { googletag.display('div-300x250_Ros-1'); });
                        }
                    }

                    if ($('#ad-300x250-1').length > 0){
                        $('#ad-300x250-1').append("<div id='div-300x250_Ros-2' style='display:none;margin-bottom:10px;margin-top:10px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-2'); });
                    }

                    if($('#ad-300x600-1').length > 0){
                        $('#ad-300x600-1').append("<div id='div-300x250_Ros-3' style='display:none;margin-bottom:10px;margin-top:10px'></div>");
                        googletag.cmd.push(function () { googletag.display('div-300x250_Ros-3'); });
                    }

                }
            });



        },
        preparePageSkin: function (hasTopImage) {},
        preparePageSkinPosition : function(){},
        prepareVPaid: function(){},
        prepareHtml5Masthead:function(){}
    }

};

$(document).ready(function(){
    var pageSticky = document.createElement('script');
    pageSticky.src = 'http://img-dygassets.mncdn.com/Scripts/jquery.sticky.js';
    document.getElementsByTagName('head')[0].appendChild(pageSticky);

    $(window).scroll(function(){

        var rowBottom =  $('#ad-300x600').closest('.row');
        if(rowBottom.offset().top < $(this).scrollTop()){
            $('#ad-300x600').css('margin-top','60px');
        }
        else{
            $('#ad-300x600').css('margin-top','0px');
        }

        /*var rowBottom =  $('#ad-300x600').closest('.row');
        var bottom = rowBottom.position().top + rowBottom.outerHeight(true);

        if(rowBottom.offset().top < $(this).scrollTop() && bottom > $(this).scrollTop() + $('#ad-300x600').height() + $('#ad-300x250').height() ){
            $('#ad-300x600').css('position','absolute');
            $('#ad-300x600').css('top',($(window).scrollTop() - rowBottom.offset().top + $('.MainMenu').height()+20)+'px');
            $('#ad-300x250').css('position','absolute');
            $('#ad-300x250').css('top',($(window).scrollTop() - rowBottom.offset().top + $('.MainMenu').height()+20 + $('#ad-300x600').height() )+'px');
        }
        else if(rowBottom.offset().top > $(this).scrollTop() )
        {
            $('#ad-300x600').css('position','static');
            $('#ad-300x600').css('top', rowBottom.offset().top+'px');
            $('#ad-300x250').css('position','static');
            $('#ad-300x250').css('top', rowBottom.offset().top + $('#ad-300x600').height()+'px');
        }*/
    });




    setTimeout(function(){

        if(DygDFP.device.isWeb()) {
            $('#ad-300x600').parent().parent().hcSticky({
                followScroll: false
            });
        }

        DygDFP.brand.Glamour.init();

    },1000);

});