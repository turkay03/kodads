function dfp_FindAndReplaceAll(text) {
  text = text.replace(new RegExp("\\&#252;", "g"), "ü");
  text = text.replace(new RegExp("\\&#305;", "g"), "ı");
  text = text.replace(new RegExp("\\&#351;", "g"), "ş");
  text = text.replace(new RegExp("\\&#246;", "g"), "ö");
  text = text.replace(new RegExp("\\&#286;", "g"), "Ğ");
  text = text.replace(new RegExp("\\&#287;", "g"), "ğ");
  text = text.replace(new RegExp("\\&#350;", "g"), "Ş");
  text = text.replace(new RegExp("\\&#214;", "g"), "Ö");
  text = text.replace(new RegExp("\\&#220;", "g"), "Ü");
  text = text.replace(new RegExp("\\&#199;", "g"), "Ç");
  text = text.replace(new RegExp("\\&#231;", "g"), "ç");
  text = text.replace(new RegExp("\\&#304;", "g"), "İ");
  text = text.replace(new RegExp("\\&#39;", "g"), "'");
  return text;
}

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};



 var gptadslots = [];
	var googletag = googletag || {};
	googletag.cmd = googletag.cmd || [];
	(function () {
		var gads = document.createElement('script');
		gads.async = true; gads.type = 'text/javascript';
		var useSSL = 'https:' == document.location.protocol;
		gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
		var node = document.getElementsByTagName('script')[0];
		node.parentNode.insertBefore(gads, node);
})();

DygDFP = {
    siteName: getMetaTag("dyg_site"),
    section: getMetaTag("dyg_section"),
    target: getMetaTag("dyg_target"),
    categories: getMetaTag("dyg_target_categories"),
	 customParam: function(){
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
		
		tags.clean(undefined);
		return 'cnbcetv_cat%3D' + tags.toString().replaceAll(',', '%2C');
	}
}

var siteName = getMetaTag("dyg_site");
var section = getMetaTag("dyg_section");
var target = getMetaTag("dyg_target");
var categories = getMetaTag("dyg_target_categories");




googletag.cmd.push(function () {
	if(target != ""){
		if(siteName == 'CNBC-e_TV'){
			googletag.pubads().setTargeting('cnbcetv_cat', target); 
		}else if(siteName == 'StarTV'){
			if(section == 'Diziler'){
				googletag.pubads().setTargeting('star_dizi_cat', target); 
			}
			else{
				googletag.pubads().setTargeting('star_program_cat', target); 
			}
		}else if(siteName == 'NTVSpor_Mobile'){
				googletag.pubads().setTargeting('ntvsprcat', target); 
		}else if(siteName == 'NTVSpor'){
			var param = [];
			if(target != ''){
				param.push(target);
			}
			
			if(categories!= ''){
				for (i = 0; i < categories.split(',').length; i++) {
					param.push(categories.split(',')[i]);			
				}
			}
			
			googletag.pubads().setTargeting('ntvsporcatweb', param);  
		}else if(siteName == 'CNBC-e_Finans'){
			googletag.pubads().setTargeting('cnbce_finans_sub_cat', target); 
		}
	}

	if(siteName != 'NTVSpor_Mobile'){
	gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/INS', 'div-gpt-interstitial-oop').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
	gptadslots[1] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/LDB', 'div-gpt-Tepe_728x90-oop').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
	gptadslots[3] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/RM', 'div-gpt-RichMedia-oop').setTargeting('pos', ['rm']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
	gptadslots[4] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/SKIN', 'div-gpt-PageSkin-oop').setTargeting('pos', ['skin']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		}
		else{
			gptadslots[0]= googletag.defineSlot('/37011203/Mobile/NTVSpor_App/Mobil_Site/'+section, [[320,50]],'div-gpt-Tepe_320x50').addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
			gptadslots[1]= googletag.defineOutOfPageSlot('/37011203/Mobile/NTVSpor_App/Mobil_Site/'+section,'div-gpt-INS').addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		}
	
	if(siteName == 'NTV')
	{
		 googletag.pubads().addEventListener('slotRenderEnded', function (event) {
					if (event.slot === gptadslots[1]) {
						if (!event.isEmpty) {
							setTimeout(function () {
								$("#div-gpt-PageSkin-oop_rev").attr("id", "div-gpt-PageSkin-oop");
								googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
							}, 1000);
						} else {
							$("#div-gpt-PageSkin-oop_rev").attr("id", "div-gpt-PageSkin-oop");
							googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
						}
					}
				});
	}

	
	if(siteName == 'StarTV'){
	
		 googletag.pubads().addEventListener('slotRenderEnded', function (event) {
					if (event.slot === gptadslots[4]) {
						if (event.isEmpty) {
							$("#left_480x1100").css("z-index","1");
							$("#right_480x1100").css("z-index","1");
						}
					}
				});
				
				
	
	
	
	
				
	
		if(section != 'Foto_Galeri' && section != 'Akis' && section != 'Video' && section != 'Programlar' && section != 'Canli'){
			gptadslots[5] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/MPU_Fix', 'div-gpt-300x250_Fix-oop').setTargeting('pos', ['mpufix']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		}
		
		if(section != 'Akis' && section != 'Video' && section != 'Canli'){
			if(section == 'Programlar' && target == ''){
			
			}else{
				gptadslots[6] = googletag.defineSlot('/37011203/Web/'+siteName+'/'+section+'/MPU1', [[300, 250], [300, 600]], 'div-gpt-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
			}
		}
		
		if(section == 'Diziler' || section == 'Programlar' || section == 'Canli'){
			gptadslots[7] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/EXTND', 'div-gpt-Extended-oop').setTargeting('pos', ['extnd']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		}
	}
	else{
	
		
	
		if((siteName == 'NTVSpor' && section == 'Canli') || (siteName == 'CNBC-e_Finans' && section == 'Canli')) {
	
		}
		else{		
			if(siteName == 'NTVSpor' && (section == 'Canli_Skor' || target == 'Spor_Widget')){
			
			}
			else{
				if(siteName == 'CNBC-e_Finans' && section == 'Video_Galeri' && target == '')
				{
				
				}
				else{
				
				if(siteName != 'NTVSpor_Mobile')
				{
					if(siteName != 'NTV'){
						gptadslots[5] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/MPU_Fix', 'div-gpt-300x250_Fix-oop').setTargeting('pos', ['mpufix']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
					}
					gptadslots[6] = googletag.defineSlot('/37011203/Web/'+siteName+'/'+section+'/MPU1', [[300, 250], [300, 600]], 'div-gpt-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
}
				}
			}
		}
	
	if(siteName == 'NTVSpor' && section == 'Anasayfa'){
		gptadslots[6] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/STCKY', 'div-gpt-Stcky-oop').setTargeting('pos',['stcky']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		gptadslots[9] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/MSTHD', 'div-gpt-Masthead-oop').setTargeting('pos',['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
	}
	
	if(siteName == 'NTV'){
		if(section != 'Anasayfa' && section != 'Test'){
			gptadslots[7] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/TLB', 'div-gpt-Text_Link_Banner-oop').setTargeting('pos', ['tlb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
			gptadslots[8] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/SKY', 'div-gpt-SKY_Scraper-oop').setTargeting('pos',['sky']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		}
		else{
			gptadslots[5] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/MPU_Fix', 'div-gpt-300x250_Fix-oop').setTargeting('pos', ['mpufix']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
			gptadslots[9] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/MSTHD', 'div-gpt-Masthead-oop').setTargeting('pos',['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		}
		
		if(section == "Video_Galeri"){
			gptadslots[11] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/EXTND', 'div-gpt-Extended-oop').setTargeting('pos', ['extnd']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		}
	}
	else if(siteName == 'GQ'){
		gptadslots[7] = googletag.defineSlot('/37011203/Web/'+siteName+'/'+section+'/MPU2', [[300, 250], [300, 600]], 'div-gpt-300x250_Ros-2').setTargeting('pos', ['mpu2']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
	}
	else if(siteName == 'CNBC-e_Finans'){
		if(section != 'Anasayfa' && section != 'Video_Galeri' && section != 'Canli'){
			gptadslots[7] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/TLB', 'div-gpt-Text_Link_Banner-oop').setTargeting('pos', ['tlb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		}
		else if(section == "Video_Galeri")
		{
			gptadslots[7] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/EXTND', 'div-gpt-Extended-oop').setTargeting('pos', ['extnd']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		}
		
		if(section == 'Anasayfa')
		{
			gptadslots[12] = googletag.defineSlot('/37011203/Web/'+siteName+'/'+section+'/MPU2', [[300, 250], [300, 600]], 'div-gpt-300x250_Ros-2').setTargeting('pos', ['mpu2']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		}
		
		gptadslots[9] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/MSTHD', 'div-gpt-Masthead-oop').setTargeting('pos',['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
	}
	else if(siteName == 'NTVSpor'){
		if(section != 'Anasayfa' && section != 'Canli' && section != 'Video_Galeri' && section != 'Foto_Galeri'  && section != 'Canli_Skor' && target != 'Spor_Widget'){
			gptadslots[7] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/TLB', 'div-gpt-Text_Link_Banner-oop').setTargeting('pos', ['tlb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		}
		else{
		}
		
		if(section == "Video_Galeri")
		{
			gptadslots[9] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/SDNG', 'div-gpt-SDNG-oop').setTargeting('pos', ['sdng']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
			gptadslots[10] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/SDNG_URL', 'div-gpt-SDNG_URL-oop').setTargeting('pos', ['sdng_url']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		}
	}
	else if(siteName == 'Vogue'){
	
			gptadslots[7] = googletag.defineSlot('/37011203/Web/'+siteName+'/'+section+'/MPU2', [[300, 250], [300, 600]], 'div-gpt-300x250_Ros-2').setTargeting('pos', ['mpu2']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
	}
	else if(siteName == 'CNBC-e_TV'){
			gptadslots[9] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/MSTHD', 'div-gpt-Masthead-oop').setTargeting('pos',['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
			
			
		if(section == 'Diziler' ||  section == 'Canli'){
			gptadslots[11] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/EXTND', 'div-gpt-Extended-oop').setTargeting('pos', ['extnd']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		}
	}
	
	
	}
	
	googletag.pubads().enableSingleRequest();
	googletag.pubads().enableAsyncRendering();
	googletag.enableServices();
});

function getMetaTag(param) { 
   var metas = document.getElementsByTagName('meta'); 

   for (i=0; i<metas.length; i++) { 
      if (metas[i].getAttribute("name") == param) { 
         return metas[i].getAttribute("content"); 
      } 
   } 

    return "";
} 

var createCookie = function (name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function getCurrentDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd='0'+dd
	} 

	if(mm<10) {
		mm='0'+mm
	} 

	return mm+''+dd+''+yyyy;
}

var frekansCookieName = "frekansInfo" + getCurrentDate();

function createFrekansInfo(){
	$('body').append('<div id="frekans_info" style="top:0;left:50%;position:absolute"></div>');
	$('#frekans_info').append('<div id="frekans_detail_info" style="font-family:Arial;line-height:18px;position: absolute;top: 250px;left: 50%;width:600px;height: 450px;margin-left:-300px;;background-color:white;position:absolute;z-index:9999"></div>');
	$('#frekans_info').append('<div id="fade" style="position: fixed;top: 0%;left: 0%;width: 100%;height: 100%;background: url(http:\/\/img-cdn.startv.com.tr\/yas\/transparent.png) repeat 0 0;z-index:9998;"><\/div>');
	
	var text = "<style>.frekans_table td{ padding:0px; font-size:13px}</style><div style='padding:30px;font-size:13px'><a id='frekans_close' style='float: right; color: red; font-size: 15px; margin-right: -20px; margin-top: -20px;cursor:pointer' onclick='removeFrekansInfo();'>(x)<\/a><span style='font-weight:bold;'>Doğuş Yayın Grubu kanallarının uydu değerleri <span style='text-decoration:underline;font-size:16px'>18 Eylül 2014 tarihinde</span> değişecektir. Yeni değerleri uydu alıcınıza girmeniz gerekmektedir.</span><br/><br/>";
	text += "STAR, NTV, CNBC-e, E2, NTV SPOR ve radyo yayınlarımızın yeni uydu değerleri; <br/><br/>";
	text += "<table class='frekans_table'>";
	text += "<tr>";
	text += "<td style='width:100px;font-weight:bold;'>Uydu Adı</td><td style='width:10px;text-align:center;'>:</td><td>Türksat 4A</td>";
	text += "</tr>";
	text += "<tr>";
	text += "<td style='font-weight:bold;padding:0px;'>Lokasyon</td><td style='width:10px;text-align:center;'>:</td><td>42 ⁰ Doğu</td>";
	text += "</tr>";
	text += "<tr>";
	text += "<td style='font-weight:bold;'>Alış Frekansı</td><td style='width:10px;text-align:center;'>:</td><td>12.015 MHz</td>";
	text += "</tr>";
	text += "<tr>";
	text += "<td style='font-weight:bold;'>Polarizasyon</td><td style='width:10px;text-align:center;'>:</td><td>Yatay (H)</td>";
	text += "</tr>";
	text += "<tr>";
	text += "<td style='font-weight:bold;'>Sembol Hızı</td><td style='width:10px;text-align:center;'>:</td><td>27.500 Ksym/s</td>";
	text += "</tr>";
	text += "<tr>";
	text += "<td style='font-weight:bold;'>FEC değeri</td><td style='width:10px;text-align:center;'>:</td><td>5/6</td>";
	text += "</tr>";
	text += "</table><br/><br/>";
	
	text += "Kral TV, Kral Pop TV, Eurostar ve NTV Avrupa yayınlarımızın yeni uydu değerleri;<br/><br/>";
	text += "<table class='frekans_table'>";
	text += "<tr>";
	text += "<td style='width:100px;font-weight:bold'>Uydu Adı</td><td style='width:10px;text-align:center'>:</td><td>Türksat 3A</td>";
	text += "</tr>";
	text += "<tr>";
	text += "<td style='font-weight:bold'>Lokasyon</td><td style='width:10px;text-align:center;'>:</td><td>42 ⁰ Doğu</td>";
	text += "</tr>";
	text += "<tr>";
	text += "<td style='font-weight:bold'>Alış Frekansı</td><td style='width:10px;text-align:center;'>:</td><td>10.962 MHz</td>";
	text += "</tr>";
	text += "<tr>";
	text += "<td style='font-weight:bold'>Polarizasyon</td><td style='width:10px;text-align:center;'>:</td><td>Yatay (H)</td>";
	text += "</tr>";
	text += "<tr>";
	text += "<td style='font-weight:bold'>Sembol Hızı</td><td style='width:10px;text-align:center;'>:</td><td>16.666 Ksym/s</td>";
	text += "</tr>";
	text += "<tr>";
	text += "<td style='font-weight:bold'>FEC değeri</td><td style='width:10px;text-align:center;'>:</td><td>3/4</td>";
	text += "</tr>";
	text += "</table></div>";
	
	$("#frekans_detail_info").html(text);
}

function removeFrekansInfo(){
	$("#frekans_info").remove();
	createCookie(frekansCookieName,1,1);
}

// VPAID EXTEND
  function initVpaid(creative_path,width,height,autoplay){ 
	$("#extendVidPanel").fadeIn('slow',function(){
		$("#extendVidPanel").css('display','block');
	});
	
	var flashSource = '<object data="' + creative_path + '" type="application/x-shockwave-flash" id="extendVidObj" width="' + width + '" height="' + height + '">';
	flashSource += '<param name="movie" value="' + creative_path + '" />';
	flashSource += '<param name="height" value="' + height + '" />';
	flashSource += '<param name="width" value="' + width + '" />';
	flashSource += '<param name="quality" value="high" />';
	flashSource += '<param name="menu" value="false" />';
	flashSource += '<param name="wmode" value="transparent" />';
	flashSource += '<param name="allowscriptaccess" value="always" />';
	flashSource += '</object>';
	
	if(autoplay == 'true'){
		if(document.getElementById($("body object[data*='flowplayer']").attr("id")) != null){
			var flash = document.getElementById($("body object[data*='flowplayer']").attr("id"));
			flash.fp_play();
		}
		else{
			var kdp = document.getElementById($("body object[data*='http://cdnapi.kaltura.com/index.php']").attr("id"));
			kdp.sendNotification('doPlay');
		}
	}
	
	$("#extendVid").append(flashSource);
	$("#extendVidPanel").css("position","absolute");
	$("#extendVidPanel").css("display","block");
	$("#extendVidPanel").css("left","0");
	$("#extendVidPanel").css("right","0");
	$("#extendVidPanel").css("margin","auto");		
	
	if(siteName == "StarTV" || siteName == "CNBC-e_TV"){
		$("#extendVidPanel").css("z-index","9999");
		$("#extendVidPanel").css("width",width);
		$("#extendVidPanel").css("top","192px");
		$("body").scrollTop(160);	
	}
	else if(siteName == "NTVSpor"){
		$("#extendVidPanel").css("z-index","9999");
		$("#extendVidPanel").css("width",width);
		$("#extendVidPanel").css("top","133px");
	}
	else if(siteName == "CNBC-e_Finans"){
		$("#extendVidPanel").css("z-index","9999");
		$("#extendVidPanel").css("width",width);
		$("#extendVidPanel").css("top","193px");
	}
	else if(siteName == "Kral_Muzik"){
		$("#extendVidPanel").css("z-index","9999");
		$("#extendVidPanel").css("width",width);
		$("#extendVidPanel").css("top","130px");
	}
}

function closeVpaid(){
	$("#extendVidPanel").fadeOut('slow',function(){
		$("#extendVidPanel").css('display','none');
		$("#extendVidPanel").empty();
	});
}

function closeExtended(){
	closeVpaid();
	handleEvents('AdStopped');
}

function gotoURL(src){
	handleEvents('AdClickThru');
	closeVpaid();
}

function handleEvents(param){
	var flash = document.getElementById($("body object[data*='http://cdnapi.kaltura.com/index.php']").attr("id"));
	flash.handleVpaidEvent(param);
}

function gotoClick(src){
	window.open(src);
}

$(document).ready(function(){

$(window).resize(function(){
  			$("#left_480x1100").css("left",((($(window).width() - 980) / 2)) - 480);
			$("#right_480x1100").css("width",(($(window).width() - 980) / 2));
	
});



	$("body").append("<div id='extendVidPanel' class=''><div id='extendVid'></div></div>");

	if(siteName == "StarTV")
	{
		
	
		if($('#VideoFlowContent').length > 0)
		{
			$('body').append('<div id="left_480x1100" style="position: absolute;left:0px;top: 0;height: 1100px;overflow:hidden;width:480px"></div>');
			$('body').append('<div id="right_480x1100" style="position: absolute;right:0px;top: 0;height: 1100px;overflow:hidden"></div>');
			
			$("#left_480x1100").css("left",((($(window).width() - 980) / 2)) - 480);
			$("#right_480x1100").css("width",(($(window).width() - 980) / 2));
			var companionTop = ($("#header").innerHeight() + $("#subPagesHeader").innerHeight()) -2;
			$("#right_480x1100").css("top",companionTop);
			$("#left_480x1100").css("top",companionTop);
		}	
	}
	
	if(siteName != 'Vogue' && siteName != 'GQ' && siteName != 'NTV')
	{
		if((getCookie(frekansCookieName) == '' || getCookie(frekansCookieName) == null) && section == 'Anasayfa'){
			//createCookie(frekansCookieName,1,1);
			//createFrekansInfo();
		}
	}

	if(siteName == "CNBC-e_TV"){
		$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="cnbcetv" />');
		$("#bodyRender").addClass("DFP_SKIN");
		$("#container").prepend("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
		$("#container").prepend("<div id='div-gpt-Masthead-oop' class='DYG_MSTHD'></div>");
		if(section == 'Anasayfa'){
			$("body").append("<div id='div-gpt-PageSkin-oop'></div>");
			$("#content .adv300x250").first().find(".content").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
			$("#content .adv300x250").first().find(".content").append("<div id='div-gpt-300x250_Ros-1'></div>");
		}
		else if(section == 'FotoGaleri'){
			$(".adv300x250").append("<div id='div-gpt-300x250_Ros-1'></div>");
			$("body").append("<div id='div-gpt-PageSkin-oop' class='DFP_DetailSkin'></div>");
		}
		else{
			$("body").append("<div id='div-gpt-PageSkin-oop' class='DFP_DetailSkin'></div>");
			$("#detailContents .adv300x250").first().find(".content").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
			$("#detailContents .adv300x250").first().find(".content").append("<div id='div-gpt-300x250_Ros-1'></div>");
		}
		
		
		$("body").append("<div id='div-gpt-interstitial-oop' class='DFP_INS'></div>");
		$("body").append("<div id='div-gpt-RichMedia-oop'></div>");
		
		googletag.cmd.push(function () { googletag.display('div-gpt-Masthead-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-interstitial-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-RichMedia-oop'); });
	}
	else if(siteName == "NTVSpor_Mobile"){
		$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="ntvspor_mobile" />');
		
		if(section != 'Anasayfa' && section != 'Kategoriler')
		{
			$("#main").after("<div id='div-gpt-Tepe_320x50'></div>");
		}
		else
		{
			$("#ligler .item .lig_ismi").before("<div id='div-gpt-Tepe_320x50'></div>");
		}

		$("body").append("<div id='div-gpt-INS'></div>");
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_320x50'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-INS'); });
	}
	else if(siteName == "StarTV"){
		$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="startv" />');
		$("#bodyRender").addClass("DFP_SKIN");
		$(".dygHeader").prepend("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
		$("#bodyRender").prepend("<div id='div-gpt-Masthead-oop' class='DYG_MSTHD' style='margin-bottom:5px;'></div>");
		
		if(section == 'Anasayfa'){
			$("body").append("<div id='div-gpt-PageSkin-oop'></div>");
			$("#content .adv300x250").first().find(".content").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
			$("#content .adv300x250").last().find(".content").append("<div id='div-gpt-300x250_Ros-1'></div>");
			googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
		}
		else if(section == 'Foto_Galeri'){
			$(".adv300x250").append("<div id='div-gpt-300x250_Ros-1'></div>");
			$("body").append("<div id='div-gpt-PageSkin-oop' class='DFP_DetailSkin'></div>");
		}
		else{
			$("body").append("<div id='div-gpt-PageSkin-oop' class='DFP_DetailSkin'></div>");
			$("#detailContents .adv300x250").first().find(".content").append("<div id='div-gpt-300x250_Ros-1'></div>");
		}
	
		$("body").append("<div id='div-gpt-interstitial-oop' class='DFP_INS'></div>");
		$("body").append("<div id='div-gpt-RichMedia-oop'></div>");
		
		if(section != 'Akis' && section != 'Video' && section != 'Canli'){
			if(section == 'Programlar' && target == ''){
			
			}else{
				googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
			}
		}
		
		googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Masthead-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-interstitial-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-RichMedia-oop'); });
	}
	else if(siteName == "NTV"){
		$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="ntv" />');
		
		$("body").append("<div id='div-gpt-PageSkin-oop_rev'></div>");
		 
		
		$("#sliderAd").append("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
		$("body").append("<div id='div-gpt-interstitial-oop' class='DFP_INS'></div>");
		$("body").append("<div id='div-gpt-RichMedia-oop'></div>");
		$(".ros").append("<div id='div-gpt-300x250_Ros-1'></div>");
		$(".mpufix").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
		if(section != 'Anasayfa'){
			$(".textLink").append("<div id='div-gpt-Text_Link_Banner-oop' class='DFP_TLB'></div>");
			$("#dcol-skyscraper").append("<div id='div-gpt-SKY_Scraper-oop' class='DFP_SKY'></div>");
			googletag.cmd.push(function () { googletag.display('div-gpt-Text_Link_Banner-oop'); });
			googletag.cmd.push(function () { googletag.display('div-gpt-SKY_Scraper-oop'); });
		}
		else{
			$(".ros").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
			googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
		}
		
		if(section == 'Video_Galeri'){
			$("#rklm_728x90").append("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
			googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		}
		else if(section == 'Foto_Galeri'){
			$("#rklm_728x90").append("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
			googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
			$("#rklm_300x250").append("<div id='div-gpt-300x250_Ros-1'></div>");
			googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
		}
		else{
			$("#top-stories").prepend("<div id='div-gpt-Masthead-oop' class='DYG_MSTHD'></div>");
			googletag.cmd.push(function () { googletag.display('div-gpt-Masthead-oop'); });
		}
		
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-interstitial-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-RichMedia-oop'); });
	}
	else if(siteName == "GQ"){
		$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="gq" />');
		
		$("body").append("<div id='div-gpt-PageSkin-oop'></div>");
		$("body").append("<div id='div-gpt-interstitial-oop' class='DFP_INS'></div>");
		$("body").append("<div id='div-gpt-RichMedia-oop'></div>");
		$("#banner-top").append("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
		$("#sidebar").prepend("<div id='div-gpt-300x250_Ros-2'></div>");
		$("#sidebar").prepend("<div id='div-gpt-300x250_Ros-1'></div>");
		$("#sidebar").prepend("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
		
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-2'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-interstitial-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-RichMedia-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
	}
	else if(siteName == "NTVSpor"){
		if($("#DFP_SiteName").val() == undefined)
		{
			$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="ntvspor" />');
		}
		
		$("body").append("<div id='div-gpt-PageSkin-oop'></div>");
		$("body").append("<div id='div-gpt-interstitial-oop' class='DFP_INS'></div>");
		$("body").append("<div id='div-gpt-RichMedia-oop'></div>");
		$(".dygHeader").prepend("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
		
		if(section != "Canli" && section != 'Canli_Skor' && target != 'Spor_Widget'){
			$("#dyg_pscl_300x250_0").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
			$("#dyg_pscl_300x250_0").append("<div id='div-gpt-300x250_Ros-1'></div>");
			$("#dyg_pscl_300x250").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
			$("#dyg_pscl_300x250").append("<div id='div-gpt-300x250_Ros-1'></div>");
			
			googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
			googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
		}
		
		if(section != 'Anasayfa' && section != 'Canli' && section != 'Video_Galeri' && section != 'Foto_Galeri' && section != 'Canli_Skor' && target != 'Spor_Widget'){
			$("#dyg_pscl_text_link").append("<div id='div-gpt-Text_Link_Banner-oop' class='DFP_TLB'></div>");
			googletag.cmd.push(function () { googletag.display('div-gpt-Text_Link_Banner-oop'); });
		}
		
		if(section == 'Anasayfa'){
			$(".DFP_BODY").prepend("<div id='div-gpt-Masthead-oop' style='display:none'> ");
			googletag.cmd.push(function () { googletag.display('div-gpt-Masthead-oop'); });
		
			$("#ntvManset").append("<div id='div-gpt-Stcky-oop' style='display:none'> ");
			googletag.cmd.push(function () { googletag.display('div-gpt-Stcky-oop'); });
		}
		
		if(section == 'Video_Galeri'){
			$("body").append("<div id='div-gpt-SDNG-oop'></div>");
			$("body").append("<div id='div-gpt-SDNG_URL-oop'></div>");
			googletag.cmd.push(function () { googletag.display('div-gpt-SDNG-oop'); });
			googletag.cmd.push(function () { googletag.display('div-gpt-SDNG_URL-oop'); });
		}
		
		googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-interstitial-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-RichMedia-oop'); });
		
		var seeding = top.document.createElement("script");
		seeding.text= 	"function videoEnd(){ if($('#dyg_seeding_rklm_redirect').val() != undefined){ window.location.href = $('#dyg_seeding_rklm_redirect').val(); } }";
		seeding.setAttribute("type", "text/javascript");
		top.document.getElementsByTagName("head")[0].appendChild(seeding);
	}
	else if(siteName == "CNBC-e_Finans"){
		$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="cnbcefinans" />');
		
		
		$("body").append("<div id='div-gpt-PageSkin-oop'></div>");
		$("body").append("<div id='div-gpt-interstitial-oop' class='DFP_INS'></div>");
		$("body").append("<div id='div-gpt-RichMedia-oop'></div>");
		$("body").find("#leftCol").addClass("DFP_SKIN");
		
		$("#header_rklm").append("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
		
		if(section != "Canli"){
			if(section == "Video_Galeri" && target != "")
			{
				$("#sidebar_rklm2").append("<div id='div-gpt-300x250_Ros-1'></div>");
				$("#sidebar_rklm1").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
			
				googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
				googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
			}
			else{
		
				$("#sidebar_rklm2").append("<div id='div-gpt-300x250_Ros-1'></div>");
				$("#sidebar_rklm1").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
			
				
				googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
				googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
			}
		}
		
		if(section == 'Anasayfa')
		{
			$("#sidebar_rklm2").prepend("<div id='div-gpt-300x250_Ros-2' style='margin-bottom:15px'></div>");
			googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-2'); });
		}
		
		if(section != 'Anasayfa' && section != 'Video_Galeri' && section != 'Canli'){
			$("#tlb_rklm").append("<div id='div-gpt-Text_Link_Banner-oop' class='DFP_TLB'></div>");
			googletag.cmd.push(function () { googletag.display('div-gpt-Text_Link_Banner-oop'); });
		}
		
		$("#mainHeader").append("<div id='div-gpt-Masthead-oop' class='DYG_MSTHD'></div>");
		googletag.cmd.push(function () { googletag.display('div-gpt-Masthead-oop'); });
		
		googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-interstitial-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-RichMedia-oop'); });
	}
	else if(siteName == "Vogue"){
	
		$("body").addClass("DFP_SKIN");
		$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="vogue" />');
		$("body").append("<div id='div-gpt-PageSkin-oop'></div>");
		$("body").append("<div id='div-gpt-interstitial-oop' class='DFP_INS'></div>");
		$("body").append("<div id='div-gpt-RichMedia-oop'></div>");
		//$("#banner720").append("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
		$("body").prepend("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
		$("#Top300x250_bottom").append("<div id='div-gpt-300x250_Ros-1'></div>");
		$("#Top300x250_bottom").append("<div id='div-gpt-300x250_Ros-2'></div>");
		$("#Top300x250").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX2'></div>");
			
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-2'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-interstitial-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-RichMedia-oop'); });
	}
	else if(siteName == "Kral_FM"){
		$("body").prepend("<div class='DFP_SKIN'></div>");
		$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="kralfm" />');
		$("body").append("<div id='div-gpt-PageSkin-oop'></div>");
		$("body").append("<div id='div-gpt-interstitial-oop' class='DFP_INS'></div>");
		$("body").append("<div id='div-gpt-RichMedia-oop'></div>");
		$("body").prepend("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
		$("#rklm_300x250").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
		$("#rklm_300x250").append("<div id='div-gpt-300x250_Ros-1'></div>");
			
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-interstitial-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-RichMedia-oop'); });
	}
	else if(siteName == "Kral_TV"){
		$("body").prepend("<div class='DFP_SKIN'></div>");
		$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="kralfm" />');
		$("body").append("<div id='div-gpt-PageSkin-oop'></div>");
		$("body").append("<div id='div-gpt-interstitial-oop' class='DFP_INS'></div>");
		$("body").append("<div id='div-gpt-RichMedia-oop'></div>");
		$("body").prepend("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
		$("#rklm_300x250").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
		$("#rklm_300x250").append("<div id='div-gpt-300x250_Ros-1'></div>");
			
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-interstitial-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-RichMedia-oop'); });
	}
	else if(siteName == "Kral_Muzik"){
		$("body").prepend("<div class='DFP_SKIN'></div>");
		$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="kralmuzik" />');
		$("body").append("<div id='div-gpt-PageSkin-oop'></div>");
		$("body").append("<div id='div-gpt-interstitial-oop' class='DFP_INS'></div>");
		$("body").append("<div id='div-gpt-RichMedia-oop'></div>");
		$("#main-wrapper").prepend("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
		$("#rklm_300x250_2").append("<div id='div-gpt-300x250_Ros-1'></div>");
		$("#rklm_300x250_1").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
			
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-interstitial-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-RichMedia-oop'); });
	}
	else if(siteName == "Kral_POP_TV"){
		$("body").prepend("<div class='DFP_SKIN'></div>");
		$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="kralpoptv" />');
		$("body").append("<div id='div-gpt-PageSkin-oop'></div>");
		$("body").append("<div id='div-gpt-interstitial-oop' class='DFP_INS'></div>");
		$("body").append("<div id='div-gpt-RichMedia-oop'></div>");
		$(".dygHeader").prepend("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
		$("#rklm_300x250_2").append("<div id='div-gpt-300x250_Ros-1'></div>");
		$("#rklm_300x250_1").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
			
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-interstitial-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-RichMedia-oop'); });
	}
	else if(siteName == "Kral_POP_Radyo"){
		$("body").prepend("<div class='DFP_SKIN'></div>");
		$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="kralpopradyo" />');
		$("body").append("<div id='div-gpt-PageSkin-oop'></div>");
		$("body").append("<div id='div-gpt-interstitial-oop' class='DFP_INS'></div>");
		$("body").append("<div id='div-gpt-RichMedia-oop'></div>");
		$(".dygHeader").prepend("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB'></div>");
		$("#rklm_300x250_2").append("<div id='div-gpt-300x250_Ros-1'></div>");
		$("#rklm_300x250_1").append("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX'></div>");
			
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-interstitial-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-RichMedia-oop'); });
	}
	else if(siteName == "Capital_Radio"){
		$("body").prepend("<div class='DFP_SKIN' style='float:none'></div>");
		$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="capitalradio" />');
		$("body").append("<div id='div-gpt-PageSkin-oop'></div>");
		$("body").append("<div id='div-gpt-interstitial-oop' class='DFP_INS'></div>");
		$("body").append("<div id='div-gpt-RichMedia-oop'></div>");
		$(".bodyWrap").prepend("<div id='div-gpt-Tepe_728x90-oop' class='DFP_LDB' style='float:none'></div>");
		$(".rightWrap").prepend("<div id='div-gpt-300x250_Ros-1' style='margin-bottom:10px'></div>");
		$(".rightWrap").prepend("<div id='div-gpt-300x250_Fix-oop' class='DFP_MPU_FIX' style='margin-bottom:10px'></div>");
		
		
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Fix-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-PageSkin-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-Tepe_728x90-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-interstitial-oop'); });
		googletag.cmd.push(function () { googletag.display('div-gpt-RichMedia-oop'); });
	}
});
        
		
function closeFloating(){
	$("body", document).find("#floating_rklm").remove();
}

