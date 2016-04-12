
 var xhttp = new XMLHttpRequest();
 var milliseconds = (new Date).getTime();

function sendRequest(eventName) {
console.log("sendRequest : nokta");
  xhttp.open("GET", "http://dogus.virgul.com/push?ct="+milliseconds+"&u="+userID+"&r="+item_id+"&m="+eventName+"&resource="+item_id+"&metric="+metric+"&breakdown="+breakdown+"&"+ Math.random(), true);
  xhttp.send();

}