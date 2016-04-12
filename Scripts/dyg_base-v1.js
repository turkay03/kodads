DygDFP = {
    device: {
        isPhone: function () {
            return (DygDFP.device.isiPhone() || DygDFP.device.isWindowsPhone() || DygDFP.device.isAndroidPhone());
        },
        isTablet: function () {
            return (DygDFP.device.isiPad() || DygDFP.device.isAndroidTablet());
        },
        isiPad: function () {
            return (navigator.userAgent.match(/iPad/i) == 'iPad');
        },
        isiPhone: function () {
            return (navigator.userAgent.match(/iPhone/i) == 'iPhone');
        },
        isWindowsPhone: function () {
            return (navigator.userAgent.match(/Windows Phone/i) == 'Windows Phone');
        },
        isAndroidPhone: function () {
            if (navigator.userAgent.match(/Android/i)) {
                return (navigator.userAgent.match(/Mobile/i) == "Mobile")
            }
			
			return false;
        },
        isAndroidTablet: function () {
            if (navigator.userAgent.match(/Android/i)) {
                return (navigator.userAgent.match(/Mobile/i) == null)
            }
			
			return false;
        },
        isWeb: function () {
            if (DygDFP.device.isiPad() == false &&
               DygDFP.device.isiPhone() == false &&
               DygDFP.device.isWindowsPhone() == false &&
                DygDFP.device.isAndroidPhone() == false &&
                DygDFP.device.isAndroidTablet() == false) {
                return true;
            }
			
			return false;
        }
    }
}

$(document).ready(function(){
  if (false) {
		if(true){
			$("body").prepend('<iframe src="http://secim.ntv.com.tr/genel-widget.html" width="100%" height="230" frameborder="0" scrolling="no"></iframe>');
			$("body").css("background-position","0 230px");
		}
	}
});