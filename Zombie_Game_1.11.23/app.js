

//the object that holds all the story's info

let scenes = {
  start: {
    image: "Zombies.jpg",
    text: "",
    buttons: [["Start", "proceedTo(scenes.one)"]]
  },
  one: {
    image: "Zombie_Apoc_1.jpg", 
    text: "As the zombie apocalypse sweeps across the nation, you find yourself trapped in your middle school. The once distant thud of undead footsteps boom ever nearer. Panic takes hold amongst the students as the first windows crash in. You must find and save your little sister before it's too late. What is your sister's name?",
  },
  two: {
    image: "Trophy_1.jpg", 
    text: "On your way out of the classroom you notice a trophy on the shelf. This could make a decent weapon. Would you like to pick it up?",
    buttons: [["No Thanks", "proceedTo(scenes.seven)"],["Yep...Yoink", "inventory1.addItem(item1);proceedTo(scenes.three)"],[]]
  },
  three: {
    image: "Crowded_Hallway_3.jpg", 
    text: "The hallway convulses with students and faculty desperately trying to escape. Over the throng of bodies, you manage to glimpse Your sister being chased by a zombie into a classroom. There's no way you can push your way through. What do you want to do?",
    buttons: [["Run Away", "proceedTo(scenes.four)"],["Climb over the people", "proceedTo(scenes.five)"]]
  },
  four: {
    image: "Gang_Zombies_2.jpg",
    text: "A gang of Zombies cuts off your path of escape. Against your better judgement, you turn back and throw yourself over the crowd.",
    buttons: [["Continue", "proceedTo(scenes.five)"]]
  },
    five: {
    image: "Trapped_3.jpg",
    text: "You see Your sister in the corner of the classroom - trapped by a zombie. The zombie is huge and super scary. What do you want to do?",
    buttons: [["Leave. Your sister will prob be ok.", "proceedTo(scenes.seven)"],["Use that trophy you picked up to smash the zombie and save Your sister", "inventory1.removeItem(item1);proceedTo(scenes.six);"]]
  },
    six: {
    image: "Win_Screen_2.jpg",
    text: "Nicely done. You defeated the Zombie and escaped with Your sister!",
    buttons: [["Reset", "inventory1.removeItem();proceedTo(scenes.start)"]]

  },
    seven: {
    image: "Game_Over_1.jpg",
    text: "You and Your sister were unable to get away from the Zombie. Try again",
    buttons: [["Reset", "inventory1.removeItem();proceedTo(scenes.start)"]]

  },
  
};



//Getting the HTML elements so we can manipulate them

let images = document.getElementById("images"); 
let text = document.getElementById("text"); 
let buttonBox = document.getElementById('buttonBox');
let input = document.getElementById('input');
let container = document.getElementById('container');
let inventoryBox = document.getElementById('inventoryBox');
let backpack = document.getElementById('backpack');



//Declare the variable for the sister's name

let sister;



//Gets the input, adds the input to the sister variable, removes the input field and advances 
//the story

input.addEventListener('keydown', function(event) {
  console.log(input.value);
  if (event.key == "Enter") {
    sister =  input.value;
    input.style.display = "none";
    proceedTo(scenes.two)
  }
});



//Items and Inventory classes

class InventoryItem {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}


class Inventory {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
    inventoryBox.innerHTML = "";
    console.log(inventory1);
    for (let i = 0; i < this.items.length; i++) {
      inventoryBox.innerHTML += `
    <div>
      ${this.items[i].name} - ${this.items[i].description}
    </div>`
    };
  }

  removeItem() {
    this.items.shift();
    inventoryBox.innerHTML = "";
    console.log(inventory1);
      for (let i = 0; i < this.items.length; i++) {
        inventoryBox.innerHTML += `
     <div>
        ${this.items[i].name} - ${this.items[i].description}
      </div>`
      };
    }
  }



  //Creates new instances of the classes
const inventory1 = new Inventory();
const item1 = new InventoryItem("Trophy", "A blunt object with some heft...can deal moderate damage.");
const item2 = new InventoryItem("Key", "Opens doors.");



//Replaces text with user input, splits the string and displays one character at a time
let changeText = function(words) {

  updatedText = words.replace("Your sister", sister).split("");
  text.innerHTML = "";
  for (let i=0; i < updatedText.length; i++) {
      setTimeout(function() {
      text.innerHTML += updatedText[i];
    }, 35 * i);
  }
};


//Gets image link and formats to display as HTML
let changeImage = function(img) {
  images.style.backgroundImage = `url(${img})`;
};



//Creates a button for each option we add to a scenes 
let changeButtons = function(buttonList) {
  buttonBox.innerHTML = "";
  for (let i = 0; i < buttonList.length; i++) {
    buttonBox.innerHTML += `<button onClick=${buttonList[i][1]}>${buttonList[i][0].replace("Your sister", sister)}</button>`;
  };
};



//Advances the game 
let proceedTo = function(scenes) {

  if (!scenes.buttons) {
    input.value = "";
    input.style.display = "";  
  }  else {
    input.style.display = "none";
  }

  if (inventory1.items.length > 0) {
    backpack.style.display = "";
    inventoryBox.style.display = "";
  } else {
    backpack.style.display = "none";
    inventoryBox.style.display = "none";
  }

  changeImage(scenes.image)
  changeText(scenes.text)
  changeButtons(scenes.buttons)
};



//starts the game
proceedTo(scenes.start);
