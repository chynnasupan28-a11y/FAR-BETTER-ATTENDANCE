const API_URL = "https://script.google.com/macros/s/AKfycbwggPlGl4NZsmDoqaG-K9a1M9B892EhCtsCvPRH0NNUiLzop-eU8kdUo4j-vg9YdYMJ/exec";

let scannedID = "";
let scanned = false;


function onScanSuccess(decodedText){

  if(scanned) return;

  scanned = true;

  scannedID = decodedText;

  document.getElementById("result").innerHTML =
  "QR Scanned: " + decodedText;

  html5QrcodeScanner.clear();

  document.getElementById("devotion").style.display = "block";

}


function sendAttendance(devotion){

  document.getElementById("result").innerHTML =
  "Saving...";


  fetch(API_URL, {

    method:"POST",

    body: JSON.stringify({

      memberID: scannedID,
      devotion: devotion

    })

  })

  .then(response => response.json())

  .then(data => {

    document.getElementById("result").innerHTML =
    data.result;

    setTimeout(function(){
      location.reload();
    },3000);

  })

  .catch(error => {

    document.getElementById("result").innerHTML =
    "ERROR: " + error;

  });

}



function onScanFailure(error){
}



let html5QrcodeScanner = new Html5QrcodeScanner(

  "reader",

  {
    fps:10,
    qrbox:250,
    rememberLastUsedCamera:true,
    showTorchButtonIfSupported:true
  },

  false

);


html5QrcodeScanner.render(
  onScanSuccess,
  onScanFailure
);
