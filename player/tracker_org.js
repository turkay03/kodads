var totalDuration = 0;
var tvyoTracker = {
   //window.snowplow('trackStructEvent', 'startv-mobilweb', 'playing', @Model.VideoID, 0, duration);
   //window.snowplow('trackStructEvent', 'startv', 'playing', @Model.VideoID, @Model.PartNo, duration);
   watch : function (mecra, platform, video_id, duration, part) {
       totalDuration = totalDuration + duration;
       //if(Math.floor((Math.random() * 2)) == 0) {
           if(totalDuration >= 10) {
               jQuery.ajax({
                   url: "http://www.tvyo.com/ajax/pl/watch?platform="+platform+"&mecra="+mecra+"&video_id="+video_id+"&duration="+totalDuration+"&part="+part,
                   dataType: "jsonp"
               });
               totalDuration = 0;
           }
       //}
   }
}


var tvyoTracker={
  watch:function(mecra,platform,video_id,duration,part){
    jQuery.ajax
      ({
        url:"http://www.tvyo.com/ajax/pl/watch?platform="+platform+"&mecra="+mecra+"&video_id="+video_id+"&duration="+duration+"&part="+part,
        dataType:"jsonp"
      })
}}