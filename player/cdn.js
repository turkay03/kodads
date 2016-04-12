var flavors = ["hds", "hls"];
var cdnTest = {};

cdnTest.getVideo = function(videoId) {
  var video = cdnTest.videos[videoId];
  if(video === undefined) {
    return null;
  }
  var providerId = Math.floor(Math.random() * 10);
  var provider = cdnTest.providers[providerId];
  var urls = flavors.map(function(flavor) {
    return provider.baseUrl + "/" + video[flavor];
  });
  return { "provider": provider.name, "urls": urls };
};

cdnTest.providers = [
  {
    name: "CloudFront",
    baseUrl: "d17pr0kxqc7oei.cloudfront.net"
  },
  {
    name: "Akamai",
    baseUrl: null
  },
  {
    name: "Cdn77",
    baseUrl: "fotv-822258.c.cdn77.org/cdntest"
  },
  {
    name: "KeyCdn",
    baseUrl: "turkey-1e3e.kxcdn.com/cdntest"
  },
  {
    name: "Azure",
    baseUrl: "az805530.vo.msecnd.net"
  },
  {
    name: "Limelight",
    baseUrl: null
  },
  {
    name: "Medianova",
    baseUrl: " http://dogus-i.mncdn.com/tvyo_vod_org/_definist_/p1TBNj/asena-develop-output/mp4:"
  },
  {
    name: "Motive",
    baseUrl: " http://ddijital.motiwecdn.com/asena-develop-output/"
  },
  {
    name: "CDNetworks",
    baseUrl: null
  },
  {
    name: "CubeCdn",
    baseUrl: null
  }
];

cdnTest.videos = {
  tvyo_123_test: {
    "hds": "manifest.m4v",
    "hls": "playlist.m3u8"
  },
  tvyo_124_test: {
    "hds": "manifest.m4v",
    "hls": "playlist.m3u8"
  }
};
