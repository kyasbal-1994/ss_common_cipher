var fileSelector = document.getElementById("fileSelector");
var keySelector = document.getElementById("keySelector");
var executeButton = document.getElementById("execute");
var key,source;
fileSelector.addEventListener("change",function(){
  var fr = new FileReader();
  fr.onload = function(){
    source = new Uint8Array(this.result);
  };
  fr.readAsArrayBuffer(fileSelector.files[0]);
});

keySelector.addEventListener("change",function(){
  var fr = new FileReader();
  fr.onload = function(){
    key = new Uint8Array(this.result);
  }
  fr.readAsArrayBuffer(keySelector.files[0]);
});

executeButton.addEventListener("click",function(){
  var dest = new  Uint8Array(source.length);
  var keyLength = key.length;
  for(var i = 0; i < source.length; i++){
    dest[i] = source[i] ^ key[i % keyLength];
  }
  var binaryData = "";
  for(var i = 0; i < dest.length; i++)
  {
    binaryData += String.fromCharCode(dest[i]);
  }
  var image = new Image();
  image.src = "data:image/jpeg;base64," + window.btoa(binaryData);
  document.body.appendChild(image);
});
