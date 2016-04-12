googletag.cmd.push(function () {

	//gptadslots[0] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/INS', 'div-gpt-interstitial-oop').setTargeting('pos', ['ins']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
	//gptadslots[1] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/LDB', 'div-gpt-Tepe_728x90-oop').setTargeting('pos', ['ldb']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
	//gptadslots[2] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/SKIN', 'div-gpt-PageSkin-oop').setTargeting('pos', ['skin']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
	//gptadslots[3] = googletag.defineOutOfPageSlot('/37011203/Web/'+siteName+'/'+section+'/MSTHD', 'div-gpt-Masthead-oop').setTargeting('pos',['mst']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
	gptadslots[4] = googletag.defineSlot('/37011203/Web/'+siteName+'/'+section+'/MPU1', [[300, 250], [300, 600]], 'div-gpt-300x250_Ros-1').setTargeting('pos', ['mpu1']).addService(googletag.pubads()).setCollapseEmptyDiv(true,true);
		
	googletag.pubads().enableSingleRequest();
	googletag.pubads().enableAsyncRendering();
	googletag.enableServices();
});

$(document).ready(function(){
	$("body").prepend('<input type="hidden" id="DFP_SiteName" name="DFP_SiteName" value="NTV_Radyo" />');
	$(".banner").html('');
	$(".banner").append("<div id='div-gpt-300x250_Ros-1'></div>");
	googletag.cmd.push(function () { googletag.display('div-gpt-300x250_Ros-1'); });
});