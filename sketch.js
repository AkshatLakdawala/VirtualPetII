//Create variables here
var database;
var dog,dogImg,happyDogImg;
var foodS,foodStock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;


function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  happyDogImg = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();

  createCanvas(800, 800);
  dog = createSprite(400,300,20,20);
  dog.addImage(dogImg);
  console.log(dog);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  foodObj = new FoodS();

  feed = createButton("Feed the dog");
  feed.position(650,100);
  feed.mousePressed(feedDog);

  addFood = createButton("Add the food");
  addFood.position(750,100);
  addFood.mousePressed(addFoods);

  
  
}


function draw() {  
  background(46,139,87);

  


  drawSprites();
  //add styles here
  
  fill("purple");
  textSize(20);
  text("Food remaining:  "+foodS,150,200);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

   //fiil(255,255,254);
    
    if(lastFed>=12){
      text("Last Feed: "+lastFed%12+"PM",550,100);
    }
    else if(lastFed===0){
      text("Last Fed 12 AM",550,100);
    }
    else{
      text("Last Feed: "+lastFed+"AM",550,100);
    }
 
  
  

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

function feedDog(){
  dog.addImage(happyDogImg);

  /*foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    foodStock: foodObj.getFoodStock(),
    FeedTime: hour(),
    
  })*/

  

    foodS--;
    database.ref('/').update({
    Food: foodS,
    FeedTime: hour(),
  })
  

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}



