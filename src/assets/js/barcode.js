 // Crea un contesto audio
 var audioContext = new (window.AudioContext || window.webkitAudioContext)();

 function beep(duration, frequency, volume, type, callback) {
 var oscillator = audioContext.createOscillator();
 var gainNode = audioContext.createGain();

 oscillator.connect(gainNode);
 gainNode.connect(audioContext.destination);

 if (volume){gainNode.gain.value = volume;}
 if (frequency){oscillator.frequency.value = frequency;}
 if (type){oscillator.type = type;}
 if (callback){oscillator.onended = callback;}

 oscillator.start();
 setTimeout(function(){oscillator.stop()}, (duration ? duration : 500));
};

// Utilizzare la funzione

 var html5QrcodeScanner;
 var mytableID;
 var myfilterByBarcode;

 function onScanSuccess(decodedText, decodedResult)
 {
  beep(100, 440, 1, 'sine', function() { alert('beep finished'); });
  document.getElementById("barcodefilter").value =  decodedText;
  var event = new Event('change');
  document.getElementById("barcodefilter").dispatchEvent(event);
  html5QrcodeScanner.clear();
}

 function scanBarcodeForProductsList(tableID, filterByBarcode)
 {
     mytableID = tableID;
     myfilterByBarcode = filterByBarcode;
     html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
     html5QrcodeScanner.render(onScanSuccess);
 }

 function getBarcodeType(barcodeString) {
  if (isEAN13(barcodeString)) {
      return "EAN-13";
  } else if (isEAN8(barcodeString)) {
      return "EAN-8";
  } else if (isUPCA(barcodeString)) {
      return "UPC-A";
  } else if (isUPCE(barcodeString)) {
      return "UPC-E";
  } else if (isCode39(barcodeString)) {
      return "Code39";
  } else if (isCode128(barcodeString)) {
      return "CODE-128";
  } else if (isITF(barcodeString)) {
      return "";
  } else if (isCodabar(barcodeString)) {
      return "";
  } else {
      return "";
  }
}

function isEAN13(s) {
return /^\d{13}$/.test(s);
}

function isEAN8(s) {
return /^\d{8}$/.test(s);
}

function isUPCA(s) {
return /^\d{12}$/.test(s);
}

function isUPCE(s) {
return /^\d{6}$/.test(s);
}

function isCode39(s) {
// Code39 può rappresentare numeri, lettere maiuscole e alcuni caratteri speciali (- . $ / + % e spazio)
return /^[0-9A-Z\-.$/ +%]+$/.test(s);
}

function isCode128(s) {
// Code128 può includere qualsiasi carattere ASCII da 32 a 126, quindi questa è una verifica molto generica.
return /^[\x20-\x7E]+$/.test(s);
}

function isITF(s) {
// Interleaved 2 of 5 deve rappresentare solo numeri e deve avere una lunghezza pari
return /^\d*$/.test(s) && s.length % 2 === 0;
}

function isCodabar(s) {
// Codabar può rappresentare numeri e alcuni caratteri speciali (-$:/.+)
return /^[0-9\-$:/.+]+$/.test(s);
}


function drawCode4Product(barcodeimg, barcode)
{
  let format = '';
  let formatName = getBarcodeType(barcode);
  if (formatName=="CODE-128")
  {
    format = 'CODE128';
  }
  else if (formatName=="CODE-39")
  {
    format = 'CODE39';
  }
  else if (formatName=="EAN-13")
  {
    format = 'EAN13';
  }
  else if (formatName=="EAN-8")
  {
    format = 'EAN8';
  }
  else if (formatName=="EAN-5")
  {
    format = 'EAN5';
  }
  else if (formatName=="EAN-2")
  {
    format = 'EAN2';
  }
  else if (formatName=="UPC-A")
  {
    format = 'UPC';
  }
  else if (formatName=="UPC-E")
  {
    format = 'UPC';
  }
  else if (formatName=="ITF-14")
  {
    format = 'ITF14';
  }
  else if (formatName=="ITF-6")
  {
    format = 'ITF';
  }
  else if (formatName=="MSI")
  {
    format = 'MSI';
  }
  else if (formatName=="MSI-10")
  {
    format = 'MSI10';
  }
  else if (formatName=="MSI-11")
  {
    format = 'MSI11';
  }
  else if (formatName=="MSI-1010")
  {
    format = 'MSI1010';
  }
  else if (formatName=="MSI-1110")
  {
    format = 'MSI1110';
  }
  else if (formatName=="pharmacode")
  {
    format = 'pharmacode';
  }
  else if (formatName=="codabar")
  {
    format = 'codabar';
  }
  else if (formatName=="Generic")
  {
    format = 'GenericBarcode';
  }
  else if (formatName=="Generic2")
  {
    format = 'GenericBarcode2';
  }
  else if (formatName=="Generic3")
  {
    format = 'GenericBarcode3';
  }
  else if (formatName=="Generic4")
  {
    format = 'GenericBarcode4';
  }
  else if (formatName=="Generic5")
  {
    format = 'GenericBarcode5';
  }
  else if (formatName=="Generic6")
  {
    format = 'GenericBarcode6';
  }
  else if (formatName=="Generic7")
  {
    format = 'GenericBarcode7';
  }
  else if (formatName=="Generic8")
  {
    format = 'GenericBarcode8';
  }
  else if (formatName=="Generic9")
  {
    format = 'GenericBarcode9';
  }
  else if (formatName=="Generic10")
  {
    format = 'GenericBarcode10';
  }
  else if (formatName=="Generic11")
  {
    format = 'GenericBarcode11';
  }
  else if (formatName=="Generic12")
  {
    format = 'GenericBarcode12';
  }
  else if (formatName=="Generic13")
  {
    format = 'GenericBarcode13';
  }
  else if (formatName=="Generic14")
  {
    format = 'GenericBarcode14';
  }
  else if (formatName=="Generic15")
  {
    format = 'GenericBarcode15';
  }
  if (formatName!="")
  {
    JsBarcode(barcodeimg, barcode, {
      format: format,
      displayValue: true,
    });
  }
}

/*
drawCode4PieceOfProduct(barcode: string)
    {
      let format = '';
      let formatName = getBarcodeType(barcode);
      if (formatName=="CODE-128")
      {
        format = 'CODE128';
      }
      else if (formatName=="CODE-39")
      {
        format = 'CODE39';
      }
      else if (formatName=="EAN-13")
      {
        format = 'EAN13';
      }
      else if (formatName=="EAN-8")
      {
        format = 'EAN8';
      }
      else if (formatName=="EAN-5")
      {
        format = 'EAN5';
      }
      else if (formatName=="EAN-2")
      {
        format = 'EAN2';
      }
      else if (formatName=="UPC-A")
      {
        format = 'UPC';
      }
      else if (formatName=="UPC-E")
      {
        format = 'UPC';
      }
      else if (formatName=="ITF-14")
      {
        format = 'ITF14';
      }
      else if (formatName=="ITF-6")
      {
        format = 'ITF';
      }
      else if (formatName=="MSI")
      {
        format = 'MSI';
      }
      else if (formatName=="MSI-10")
      {
        format = 'MSI10';
      }
      else if (formatName=="MSI-11")
      {
        format = 'MSI11';
      }
      else if (formatName=="MSI-1010")
      {
        format = 'MSI1010';
      }
      else if (formatName=="MSI-1110")
      {
        format = 'MSI1110';
      }
      else if (formatName=="pharmacode")
      {
        format = 'pharmacode';
      }
      else if (formatName=="codabar")
      {
        format = 'codabar';
      }
      else if (formatName=="Generic")
      {
        format = 'GenericBarcode';
      }
      else if (formatName=="Generic2")
      {
        format = 'GenericBarcode2';
      }
      else if (formatName=="Generic3")
      {
        format = 'GenericBarcode3';
      }
      else if (formatName=="Generic4")
      {
        format = 'GenericBarcode4';
      }
      else if (formatName=="Generic5")
      {
        format = 'GenericBarcode5';
      }
      else if (formatName=="Generic6")
      {
        format = 'GenericBarcode6';
      }
      else if (formatName=="Generic7")
      {
        format = 'GenericBarcode7';
      }
      else if (formatName=="Generic8")
      {
        format = 'GenericBarcode8';
      }
      else if (formatName=="Generic9")
      {
        format = 'GenericBarcode9';
      }
      else if (formatName=="Generic10")
      {
        format = 'GenericBarcode10';
      }
      else if (formatName=="Generic11")
      {
        format = 'GenericBarcode11';
      }
      else if (formatName=="Generic12")
      {
        format = 'GenericBarcode12';
      }
      else if (formatName=="Generic13")
      {
        format = 'GenericBarcode13';
      }
      else if (formatName=="Generic14")
      {
        format = 'GenericBarcode14';
      }
      else if (formatName=="Generic15")
      {
        format = 'GenericBarcode15';
      }
      if (formatName!="")
      {
        JsBarcode(this.barcode4pieceofproduct!.nativeElement, barcode, {
          format: format,
          displayValue: true,
        });
      }
    }
*/
