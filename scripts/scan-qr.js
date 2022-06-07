const qrInput=document.querySelector('.qr-input');
const form = qrInput.querySelector('form');
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = document.querySelector(".close-button"),
copyBtn = document.querySelector(".copy-button");


  //If user drags file Over QR input area
  qrInput.addEventListener("dragover", (event)=>{
    event.preventDefault(); //preventing from default behaviour
    qrInput.classList.add("active");
  });
  //If user leave dragged file from QR input area
  qrInput.addEventListener("dragleave", ()=>{
    //qrInput.classList.remove("active");
  });
  //If user drop file on QR input area
  qrInput.addEventListener("drop", (event)=>{
    event.preventDefault(); 
    file = event.dataTransfer.files[0];//getting user select file and [0] this means if user select multiple files then we'll select only the first one
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});

//Fetch Request to analyze QR code
function fetchRequest(file,formData){
    fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't scan QR Code";
        if(!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        qrInput.classList.add("active");
    }).catch(() => {
        document.querySelector("textarea").innerText = "Error: Could not scan QR Code from Upload. Please Click the close button below and try again.";
        document.querySelector("drag-text").innerText = "";
    });
}

fileInp.addEventListener("change", async e => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});

//Copy to clipboard
copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener("click",() => fileInp.click());

//Remove QR input area
closeBtn.addEventListener("click", () => {
    qrInput.classList.remove("active")
    fileInp.value = "";
    document.querySelector("textarea").innerText = "";
    document.querySelector("drag-text").innerText = "Or Drag and Drop";
});


//For Camera Scanning
function onScanSuccess(result) {
    document.querySelector("textarea").innerText = result;
    html5QrcodeScanner.clear();
}
function onScanError(errorMessage) {
  //handle scan error
}
var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanError);
