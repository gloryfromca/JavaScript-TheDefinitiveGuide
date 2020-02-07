function getmap() {
    if (!navigator.geolocation) throw "Geolocation not supported";

    var img = document.createElement("img");
    navigator.geolocation.getCurrentPosition(setMapUrl);
    return img;
}

function setMapUrl(pos) {
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;
    var accuracy = pos.coords.accuracy;

    var url = "http://maps.google/com/maps/api/staticmap" + "?center=" + latitude + "," + longitude + "&size=640x640&sensor=true";
    var zoomlevel = 20;
    if (accuracy > 80)
        zoomlevel -= Math.round(Math.log(accuracy / 50) / Math.LN2);
    url += "&zoom=" + zoomlevel;
    img.ser = url;
}