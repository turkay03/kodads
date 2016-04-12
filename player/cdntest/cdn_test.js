var flavors = ["hds", "hls"];
var cdnTest = {};

cdnTest.getVideo = function(videoId) {
  var video = cdnTest.videos[videoId];
  if(video === undefined) {
    return null;
  }
  var providerId = Math.floor(Math.random() * 6);
  var provider = cdnTest.providers[providerId];
  var urls = flavors.map(function(flavor) {
    return provider.baseUrl + "/" + video[flavor];
  });
  return { "provider": provider.name, "urls": urls };
};

cdnTest.providers = [
  {
    name: "CloudFront",
    baseUrl: "d17pr0kxqc7oei.cloudfront.net/cdntest"
  },
  {
    name: "Akamai",
    baseUrl: "vod.fotv.me/cdntest"
  },
  {
    name: "Cdn77",
    baseUrl: "fotv-822258.c.cdn77.org/cdntest"
  },
  {
    name: "Limelight",
    baseUrl: "dogus.vo.llnwd.net/e1/cdntest"
  },
  {
    name: "Medianova",
    baseUrl: "tvyovid-p.mncdn.com/cdntest"
  },
  {
    name: "Motiwe",
    baseUrl: "ddijital.motiwecdn.com/cdntest"
  }
];

/*
abla_3MA6C-KO00U-M5WS7-0ISJR-ICLN7_16_9_
asistanlagonuliliskisi_TWVXT-VDTYR-57GSX-PBL8B-I5ZI6_16_9
aslibendekaliyor_C1P4W-T9XMG-TKTWO-DRZJQ-4F6JL_16_9
ayakkabicekimi_ZOQAD-3J0W8-HI0XB-YCB02-9WHJX_16_9
benigormekistemiyor_C4MVN-NSM7A-WLA3V-XSU3C-CBWPN_16_9
buraktezgahianladi_OEAHI-UI69E-VS8BM-N1B8R-X13FE_16_9
paramfrag_Tvyo_514616_2LU8W-SZNGQ-AYRYC-WHO57-PEU1I_16_9
Tvyo_514162_kiralik15_KQV5A-UQ3MA-QR9FZ-N342X-3MQYH_16_9
Tvyo_514164_cilek15bol_S908A-KIKU9-JEM1B-A78J6-38TS4_16_9
Tvyo_514165_cilek_Y5PHH-ZV50V-ISDEV-Y5NQ9-MDWHK_16_9
Tvyo_514314_kaderimin_161ZQ-TPG7T-FQTI3-W9LOV-QURG9_16_9
*/

cdnTest.videos = {

  paramfrag_Tvyo_514616: {
    hds: "paramfrag_Tvyo_514616_2LU8W-SZNGQ-AYRYC-WHO57-PEU1I_16_9.f4m",
    hls: "paramfrag_Tvyo_514616_2LU8W-SZNGQ-AYRYC-WHO57-PEU1I_16_9.m3u8"
  },
    Tvyo_514162: {
    hds: "Tvyo_514162_kiralik15_KQV5A-UQ3MA-QR9FZ-N342X-3MQYH_16_9.f4m",
    hls: "Tvyo_514162_kiralik15_KQV5A-UQ3MA-QR9FZ-N342X-3MQYH_16_9.m3u8"
  },
    Tvyo_514164_cilek15bol: {
    hds: "Tvyo_514164_cilek15bol_S908A-KIKU9-JEM1B-A78J6-38TS4_16_9.f4m",
    hls: "Tvyo_514164_cilek15bol_S908A-KIKU9-JEM1B-A78J6-38TS4_16_9.m3u8"
  },
    Tvyo_514165_cilek: {
    hds: "Tvyo_514165_cilek_Y5PHH-ZV50V-ISDEV-Y5NQ9-MDWHK_16_9.f4m",
    hls: "Tvyo_514165_cilek_Y5PHH-ZV50V-ISDEV-Y5NQ9-MDWHK_16_9.m3u8"
  },
  Tvyo_514314_kaderimin: {
    hds: "Tvyo_514314_kaderimin_161ZQ-TPG7T-FQTI3-W9LOV-QURG9_16_9.f4m",
    hls: "Tvyo_514314_kaderimin_161ZQ-TPG7T-FQTI3-W9LOV-QURG9_16_9.m3u8"
  },
  cilek_kokusu: {
    hds: "cilekKokusu_13_Tvyo_513761_0X8ZO-TRKRT-M1DH4-0P5GG-YYTJ2_16_9.f4m",
    hls: "cilekKokusu_13_Tvyo_513761_0X8ZO-TRKRT-M1DH4-0P5GG-YYTJ2_16_9.m3u8"
  },
  tatli_kucuk: {
    hds: "tatliKucuk_Tvyo_514160_F4SBK-PAX9N-MXOJJ-KN46W-EMX0I_16_9.f4m",
    hls: "tatliKucuk_Tvyo_514160_F4SBK-PAX9N-MXOJJ-KN46W-EMX0I_16_9.m3u8"
  },
  kiralik_ask: {
    hds: "kiralikask_14_Tvyo_513845_R7VSW-SADOF-LCPXD-MP3HE-AWOUN_16_9.f4m",
    hls: "kiralikask_14_Tvyo_513845_R7VSW-SADOF-LCPXD-MP3HE-AWOUN_16_9.m3u8"
  }
};