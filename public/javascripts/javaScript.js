// console.log(document.getElementById('genderMale').value == "male");

function updateLength(val) {
    document.getElementById('length').value=val
    document.getElementById('lengthValue').innerHTML= "Length: " + val + " Cm";
    // document.getElementById('sizeImage').style.height = val + "px";
    document.getElementById('sizeImage').style.transform = "scale(" + normalize(val, 10, 180) + ")";

//     if(document.getElementById('sizeImage').src="/images/lilli.png" && val > 140){
//         document.getElementById('sizeImage').src="/images/lilliRed.png";
//     }

//     else{
//          document.getElementById('sizeImage').src="/images/lilliman blue.png";
//         }
}

function normalize(val, min, max){
    return ((val - min) / (max - min)/2)  ;
}

function updateDistance(val) {
    document.getElementById('distance').value=val
    document.getElementById('distanceValue').innerHTML= "Distance: " + val + " Km";

  }

//  document.getElementById('gender').addEventListener("click", genderSelection);

var radioButtons =  document.getElementsByName('gender');
for (var i=0; i<radioButtons.length;i++){
    radioButtons[i].addEventListener("click", genderSelection);
}

  
 function genderSelection(){
    var x= document.getElementById('gender').checked;
    console.log(x);
    var chromozone = document.getElementsByName('gender');
    console.log(chromozone[1].value);


    if(document.getElementById('gender').checked == true){
        document.getElementById('sizeImage').src ="/images/lilliman blue.png"
    }
    else{
        document.getElementById('sizeImage').src ="/images/lilli.png"
    }
 };
