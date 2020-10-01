//Create variables here
var database;
var dog,dogImg,happyDogImg;
var foodS,foodStock;


function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  happyDogImg = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);
  dog = createSprite(400,300,20,20);
  dog.addImage(dogImg);
  console.log(dog);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }


  drawSprites();
  //add styles here
  
  fill("purple");
  textSize(20);
  text("Food remaining:  "+foodS,150,200);
  textSize(15);
  text("Press UP Arrow key to feed Drago Milk",150,100);
  

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food : x
  })

}



