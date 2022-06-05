var qrdata = document.getElementById("input-text");
const downloadButton = document.querySelector('#download-button');




function generateQR() {
    if($('#qrcode').is(':empty')){
        var data = qrdata.value;
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width: window.innerWidth*0.15,
            height: window.innerWidth*0.15
            }
        );
        qrcode.makeCode(data);
        document.getElementById("qrcode").removeAttribute("hidden");
        document.getElementById("download-button").removeAttribute("hidden");
    }else{
        $("#qrcode").empty();
        generateQR();
    }
    downloadQR();
}

function downloadQR() {
    const canvas = qrcode.querySelector('canvas');
    let canvasUrl = canvas.toDataURL('image/png');
    $("#download-a").attr("href", canvasUrl)
    $("#download-a").attr('download', 'qrcode.png');
}

