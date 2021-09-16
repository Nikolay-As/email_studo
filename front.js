

document.getElementById("mailInPacketInput").addEventListener("input", function(){sliderChangeMIP("mailInPacketCount",this.value)});
document.getElementById("delayMailInput").addEventListener("input", function(){sliderChangeDM("delayMailCount",this.value)});
document.getElementById("delayPacketInput").addEventListener("input", function(){sliderChangeDP("delayPacketCount",this.value)});


function sliderChangeMIP(count, val) {
    mailInPacket = val;
    document.getElementById(count).innerHTML = val;
}

function sliderChangeDM(count, val) {
    delayMail = val;
    document.getElementById(count).innerHTML = val + " мин.";
}

function sliderChangeDP(count, val) {
    delayPacket = val;
    document.getElementById(count).innerHTML = val + " ч.";
}