var num = 100;
var num1 = 58;
var word = "hello";
var word1 = "goodbye"


console.log(num);

console.log(num + num1);

console.log(word + word1);

console.log(word + num);

//console.log(word - num);


//Single comment

/*
    This is 
    a 
    long
    Comment
*/

console.log(document.getElementById("box1"));

document.getElementById("box1").style.fontSize = "25px";

document.getElementById("box2").innerHTML = "Hello";

var box3 = document.getElementById("box3");

box3.style.display = "none";

changeBC("box4", "purple");

changeText();

function changeBC(id, color){
    var currentId = document.getElementById(id);
    currentId.style.backgroundColor = color;
}

function changeText(){
    var h1List = document.getElementsByTagName("H1");
    console.log(h1List.length);
    h1List[0].innerHTML = "goodbye";
}

function mDown(obj){
    obj.style.backgroundColor = "turquoise";
    obj.innerHTML = "Release Me"
}

function mUp(obj) {
    obj.style.backgroundColor = "red";
    obj.innerHTML = "Thank You";
}

function mOver(obj) {
    obj.innerHTML = "Over";
}

function mOut(obj) {
    obj.innerHTML = "And Out";
}

function addElement(){
    var parent = document.createElement("div");
    parent.id = "box7";
    parent.classList.add("boxes");
    parent.innerHTML = "Box 7";
    parent.style.backgroundColor = "orange";
    document.body.appendChild(parent);
}







