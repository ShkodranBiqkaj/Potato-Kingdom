let body = document.querySelector("body");
let time = document.querySelector("#time");
let timeshow = document.querySelector("#timeshow");
let spring = document.querySelector("#spring");
let summer = document.querySelector("#summer");
let autumn = document.querySelector("#autumn");
let winter = document.querySelector("#winter");
let mirror = document.querySelector("button#mirror");
let rotate = document.querySelector("button#rotate");

let missions1 = document.querySelector("#missions1");
let missions2 = document.querySelector("#missions2");
let missions3 = document.querySelector("#missions3");
let missions4 = document.querySelector("#missions4");
let season = 0;

let total = document.querySelector("#total")

let mission1points = document.querySelector("#num1");
let miss1 = 0;
let mission2points = document.querySelector("#num2");
let miss2 = 0;
let mission3points = document.querySelector("#num3");
let miss3 = 0;
let mission4points = document.querySelector("#num4");
let miss4 = 0;

mission1points.style.backgroundColor='red';
mission2points.style.backgroundColor='red';

let elapsed = document.querySelector("#elapsed");
let seas = document.querySelector("#season");

let array = []
for(let i=0; i < 4; i++){
    let randomNum = Math.floor(Math.random() * 12); //16
    while(array.includes(randomNum)){
        randomNum = Math.floor(Math.random() * 12);
    }
    array.push(randomNum);
}

let increment = 0;
let seasonarray = ["Current Season: Spring (AB)","Current Season: Summer (BC)","Current Season: Autumn (CD)","Current Season: Winter (DA)"];

let springScore = 0;
let summerScore = 0;
let autumnScore = 0;
let winterScore = 0;

let count = 0;
let timenr = 28;
let shuffled = []

const missionPoints = {
  'Spring': { 'A': 0, 'B': 0, 'C': 0, 'D': 0 },
  'Summer': { 'A': 0, 'B': 0, 'C': 0, 'D': 0 },
  'Autumn': { 'A': 0, 'B': 0, 'C': 0, 'D': 0 },
  'Winter': { 'A': 0, 'B': 0, 'C': 0, 'D': 0 },
};


//i need it to count only after a certain point. How?
//so i can calculate a minus thing too to counteract. Like negative points of that. Okayyy
//make it so that the thing updates every time a new piece is put on the big table
//if summer = calculate the number of points gained from a and b. But i need to not calculate
//the ones put in when its not open. How?
//maybe make it return a number each time?
//1st solution

function customArray(){
    let randomNumber = Math.floor(Math.random() * 16); //16
    for(let i=0; i<16; i++){
        while(shuffled.includes(randomNumber)){
            randomNumber = Math.floor(Math.random() * 16); //16
        }

    shuffled.push(randomNumber);
    randomNumber = Math.floor(Math.random() * 16);
    }
    shuffled.push(randomNumber);
}

customArray();

let matrix = new Array(11);
    for(let k = 0; k < matrix.length; k++){
        matrix[k] = new Array(11);
        for(let a=0; a < 11; a++){
            //matrix.appendChild(mountainimg);
            matrix[k][a] = " ";
        }
    }    


matrix[1][1] = "M"; 
matrix[3][8] = "M";
matrix[8][9] = "M";
matrix[5][3] = "M";
matrix[9][5] = "M";


function addMountain(){
    for(let i = 0; i < 11; i++){
        let row = btable.rows[i];
        for(let j =0; j < 11; j++){
            if(matrix[i][j] === 'M'){
                let mountainimg = new Image(30, 30); 
                mountainimg.src = 'assignment_assets/assets/tiles/mountain_tile.png';
                let cell = row.cells[j];
                cell.appendChild(mountainimg);
                cell.id = "colored";
                cell.style.width = "30px";
                cell.style.height = "30px";
                cell.style.textAlign = "center";
                cell.style.verticalAlign = "middle";
                cell.style.borderRadius = "3px";
                cell.style.backgroundColor = "hsl(29, 44%, 47%)";

            }
        }
    }
}

//Create the elements needed to be added on the field and the rotation etc
//later on make it so we can add it on the actual field and how we are going to do it

function EdgeofTheForest(){
    let point = 0;
    for(let i=0; i < 11; i ++){
        for(let j=0; j < 11; j++){
            if(matrix[i][j] === "F" && matrix[i][j] !== " " && (i === 0 || i == 10 || j === 10 || j === 0)){
                point +=1;
            }
        }
    }

    return point;
}

function SleepyValley(){
    let points = 0;
    for(let i =0; i < 11; i++){
        let count = 0;
        for(let j=0; j < 11; j++){
            if(matrix[i][j] === "F"){
                count +=1;
            }
        }
        if(count === 3){
            points +=4;
        }
    }
    return points;
}

function WateringPotatoes(){
    let points =0;
    for(let i =0; i < 11; i++){
        for(let j =0; j < 11; j++){
            if(matrix[i][j] === "P"){
                //check matrix[i][j+1], [i][j-1], [i+1][j],[i-1][j]
                if(j+1 <= 10 && matrix[i][j+1] === "W"){
                    points +=2;
                }
                if(j-1 >= 0 && matrix[i][j-1] === "W"){
                    points +=2;
                }
                if(i+1 <= 10 && matrix[i+1][j] === "W"){
                    points +=2;
                }
                if(i-1 >= 0 && matrix[i-1][j] === "W"){
                    points +=2;
                }
            }
        }
    }

    return points;
}

function TreeLine(){
    let max =0;
    for(let i=0; i < 11; i++){
        let temp=0;
        for(let j =0; j < 11; j++){
            if(matrix[j][i] === 'F'){
                temp +=1;
            }else{
                if(temp > max){
                    max = temp;
                }
                temp =0;
            }
        }
        if(temp > max){
            max = temp;
        }
    }
    return max*2;
}

function WateringCanal(){
    let total =0;
    for(let i=0; i < 11; i++){
        let water=0;
        let farm=0;    
        for(let j =0; j < 11; j++){
            if(matrix[j][i] === 'P'){
                farm +=1;
            }else if(matrix[j][i] === 'W'){
                water +=1;
            }
        }
        if(water !== 0 && water === farm){
            total +=4;
        }
    }

    return total;
}

function WealthyTown(){
    let point = 0;
    for(let i =0; i < 11; i++){
        let adjacent = "";
        for(let j =0; j < 11; j++){
            if(matrix[i][j] === "T"){
                if(j+1 <= 10 && matrix[i][j+1] !== " "){
                    if(!adjacent.includes(matrix[i][j+1])){
                        adjacent += matrix[i][j+1];
                    }
                }
                if(j-1 >= 0 && matrix[i][j-1] !== " "){
                    if(!adjacent.includes(matrix[i][j-1])){
                        adjacent += matrix[i][j+1];
                    }
                }
                if(i+1 <= 10 && matrix[i+1][j] !== " "){
                    if(!adjacent.includes(matrix[i+1][j])){
                        adjacent += matrix[i][j+1];
                    }
                }
                if(i-1 >= 0 && matrix[i-1][j] !== " "){
                    if(!adjacent.includes(matrix[i-1][j])){
                        adjacent += matrix[i][j+1];
                    }
                }
            }
        }
        if(adjacent.length >= 3){
            point +=3;
        }
    }

    return point;
}

function MagiciansValley(){
    let points =0;
    for(let i =0; i < 11; i++){
        for(let j =0; j < 11; j++){
            if(matrix[i][j] === "M"){
                if(j+1 <= 10 && matrix[i][j+1] === "W"){
                    points +=3;
                }
                if(j-1 >= 0 && matrix[i][j-1] === "W"){
                    points +=3;
                }
                if(i+1 <= 10 && matrix[i+1][j] === "W"){
                    points +=3;
                }
                if(i-1 >= 0 && matrix[i-1][j] === "W"){
                    points +=3;
                }
            }
        }
    }

    return points;    


}

function EmptySite(){
    let points =0;
    for(let i =0; i < 11; i++){
        for(let j =0; j < 11; j++){
            if(matrix[i][j] === "T"){
                if(j+1 <= 10 && matrix[i][j+1] === " "){
                    points +=2;
                }
                if(j-1 >= 0 && matrix[i][j-1] === " "){
                    points +=2;
                }
                if(i+1 <= 10 && matrix[i+1][j] === " "){
                    points +=2;
                }
                if(i-1 >= 0 && matrix[i-1][j] === " "){
                    points +=2;
                }
            }
        }
    }
    return points;
}

function TerracedHouse(){
    let max =0;    
    for(let i=0; i <11; i++){
        let length =0;
        for(let k=0; k <11; k++){
            if(matrix[i][k] === 'T'){
                length +=1;
            }else{
                let j = 1;
                let found = false;
                while(j < 11 && !found){
                    if((i-j)>=0 && matrix[i-j][k] === 'T'){
                        length +=1;
                        found = true;
                    }
                    if((i+j) < 11 && matrix[i+j][k] === 'T'){
                        length +=1
                        found = true;
                    }
                    j++;
                }
                if(!found && length > max){
                    max = length;
                }
            }
        }
        if(length > max){
            max = length;
        }
    }
    return max*2;
}

function OddNumber(){
    let points =0;
    for(let i=0; i < 11; i++){
        let oddfull = true;
        if(i % 2 !== 0){
            i++;
        }
        for(let j=0;j<11;j++){
            if(matrix[j][i] === " "){
                oddfull = false;
            }
        }
        if(oddfull){
            points+=10;
        }
    }
    return points;
}

function RichCountry(){
    let point = 0;
    for(let i =0; i < 11; i++){
        let hastype = "";
        for(let j =0; j < 11; j++){
                if(matrix[i][j] !== ""){
                    if(!hastype.includes(matrix[i][j])){
                        hastype += matrix[i][j];
                    }
                }
            }

        if(hastype.length >= 5){
            point +=4;
        }
    }
    return point;
}

const missions = 
    {
      "basic": [
        {
          "title": "Edge of the forest",
          "description": "You get one point for each forest field adjacent to the edge of your map.",
          function:EdgeofTheForest,
          address: "assignment_assets/assets/missions_eng/Group_69.png"
        },
        {
          "title": "Sleepy valley",
          "description": "For every row with three forest fields, you get four points.",
          function: SleepyValley,
          address: "assignment_assets/assets/missions_eng/Group_74.png"
        },
        {
          "title": "Watering potatoes",
          "description": "You get two points for each water field adjacent to your farm fields.",
          function: WateringPotatoes,
          address: "assignment_assets/assets/missions_eng/Group_70.png"
        },
        {
          "title": "Borderlands",
          "description": "For each full row or column, you get six points.",
          function : Borderlands,
          address: "assignment_assets/assets/missions_eng/Group_78.png"
        },
        {
          "title": "Tree line",
          "description": "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts.",
          function : TreeLine,
          address: "assignment_assets/assets/missions_eng/Group_68.png"
        },
        {
          "title": "Watering canal",
          "description": "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points.",
          function : WateringCanal,
          address: "assignment_assets/assets/missions_eng/Group_75.png"
        },
        {
          "title": "Wealthy town",
          "description": "You get three points for each of your village fields adjacent to at least three different terrain types.",
          function : WealthyTown,
          address: "assignment_assets/assets/missions_eng/Group_71.png"
        },
        {
          "title": "Magicians' valley",
          "description": "You get three points for your water fields adjacent to your mountain fields.",
          function : MagiciansValley,
          address: "assignment_assets/assets/missions_eng/Group_76.png"
        },
        {
          "title": "Empty site",
          "description": "You get two points for empty fields adjacent to your village fields.",
          function : EmptySite,
          address: "assignment_assets/assets/missions_eng/Group_77.png"
        },
        {
          "title": "Terraced house",
          "description": "For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points.",
          function : TerracedHouse,
          address: "assignment_assets/assets/missions_eng/Group_72.png"
        },
        {
          "title": "Odd numbered silos",
          "description": "For each of your odd numbered full columns you get 10 points.",
          function : OddNumber,
          address: "assignment_assets/assets/missions_eng/Group_73.png"
        },
        {
          "title": "Rich countryside",
          "description": "For each row with at least five different terrain types, you will receive four points.",
          function : RichCountry,
          address: "assignment_assets/assets/missions_eng/Group_79.png"
        }
  ],
}

//have to choose 4 missions

let missions1img = new Image(250,100);
missions1img.src = missions.basic[array[0]].address;
missions1.appendChild(missions1img);

let missions3img = new Image(250,100);
missions3img.src = missions.basic[array[2]].address;
missions3.appendChild(missions3img);

let missions4img = new Image(250,100);
missions4img.src = missions.basic[array[3]].address;
missions4.appendChild(missions4img);

let missions2img = new Image(250,100);
missions2img.src = missions.basic[array[1]].address;
missions2.appendChild(missions2img);

const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]

let btable = document.querySelector("table#bigtable");
let stable = document.querySelector("table#smalltable");

function addfieldstosmalltable(){ //adds the field to the small table
    for(let i =0; i < 3;i++){
        let row = stable.rows[i];
        for(let j =0; j <3; j++){
            let cell = row.cells[j];
            while (cell.firstChild) {
                cell.removeChild(cell.firstChild);
            }
        }
    }

    for(let i =0; i < 3; i++){
        let row = stable.rows[i];
        for(let j =0; j < 3; j++){
            if(count < 17 &&  elements[shuffled[count]].shape[i][j] === 1){
                let cell = row.cells[j];
                if(elements[shuffled[count]].type === 'water'){
                    let water = new Image(30, 30);
                    water.src = 'assignment_assets/assets/tiles/water_tile.png';    
                    cell.appendChild(water);
                }
                if(count < 17 && elements[shuffled[count]].type === 'forest'){
                        let forest = new Image(30, 30); 
                        forest.src = 'assignment_assets/assets/tiles/forest_tile.png';    
                        cell.appendChild(forest);
                }
                if(count < 17 && elements[shuffled[count]].type === 'farm'){
                    let farm = new Image(30, 30); 
                    farm.src = 'assignment_assets/assets/tiles/plains_tile.png';    
                    cell.appendChild(farm);
                }
                if(count < 17 && elements[shuffled[count]].type === 'town'){
                    let town = new Image(30, 30); 
                    town.src = 'assignment_assets/assets/tiles/village_tile.png';    
                    cell.appendChild(town);
                }
            }        
        }
    }
    if(count < 17){
    time.innerText = "Time: " + elements[shuffled[count]].time;
    }
}

function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector)
        if (this.contains(targetElement)) handler.call(targetElement, event)
    })
}

function mouseover(event){
    if(timenr > 0){
    let row = this.parentNode;

    let invalid = false;
    let starti = 0;
    let startj =0;
    let startsat = false;

    for(let i =0; i < 3; i++){
        for(let j =0; j < 3; j++){
            if(elements[shuffled[count]].shape[i][j] === 1 && !startsat){
                starti = i;
                startj = j;
                startsat = true;
            }
        }
    }

    let cell = this.cellIndex -startj;
    let rowind = row.rowIndex- starti;

    for(let i =0; i < 3; i++){
        for(let j =0; j < 3; j++){
            if(elements[shuffled[count]].shape[i][j] === 1){
                if((rowind+i) / 11 >= 1 || (cell+j) / 11 >= 1 
                    || matrix[rowind+i][cell+j] === 'M' || btable.rows[rowind+i].cells[cell+j].id === "colored"){
                    invalid = true;
            }
        }
    }
}

    for(let i = starti; i < 3; i++){
        for(let j =0; j < 3; j++){
            
            if(elements[shuffled[count]].shape[i][j] === 1){
                if(!invalid){
                    btable.rows[rowind+i].cells[cell+j].style.backgroundColor = "green";
                }else{                    
                    if((rowind+i) / 11 < 1 && (cell+j) / 11 < 1){
                        if(btable.rows[rowind+i].cells[cell+j].id !== "colored"){
                        btable.rows[rowind+i].cells[cell+j].style.backgroundColor = "red";
                        }
                    }
                }
        }
        }
        
    }
    }
}

function mouseout(event){
    if(timenr > 0){
    let starti = 0;
    let startj =0;
    let startsat = false;

    for(let i =0; i < 3; i++){
        for(let j =0; j < 3; j++){
            if(elements[shuffled[count]].shape[i][j] === 1 && !startsat){
                starti = i;
                startj = j;
                startsat = true;
            }
        }
    }
    let row = this.parentNode;
    let cell = this.cellIndex-startj;
    let rowind = row.rowIndex-starti;


    for(let i =starti; i < 3; i++){
        for(let j =0; j < 3; j++){
            if(count < 17 && elements[shuffled[count]].shape[i][j] === 1){
                if((rowind+i) / 11 < 1 && (cell+j) / 11 < 1){
                    if(btable.rows[rowind+i].cells[cell+j].id === "colored"){
                    }else{
                    btable.rows[rowind+i].cells[cell+j].style.backgroundColor = "";
                }
            }
            }
        }
    }
}
}

function addSmalltoBig(event){
    if(timenr > 0){
    let invalid = false;

    let starti = 0;
    let startj =0;
    let startsat = false;

    for(let i =0; i < 3; i++){
        for(let j =0; j < 3; j++){
            if(elements[shuffled[count]].shape[i][j] === 1 && !startsat){
                starti = i;
                startj = j;
                startsat = true;
            }
        }
    }
    let row = this.parentNode;
    let cell = this.cellIndex - startj;
    let rowind = row.rowIndex - starti;


    for(let i =starti; i < 3; i++){
        for(let j =0; j < 3; j++){
            if(elements[shuffled[count]].shape[i][j] === 1){
                if(btable.rows[rowind+i].cells[cell+j] === undefined 
                    || matrix[rowind+i][cell+j] === 'M' || btable.rows[rowind+i].cells[cell+j].id === "colored"){
                    invalid = true;
                }
            }
        }
    }

    if(!invalid){
        for(let i =0; i < 3; i++){
            for(let j =0; j < 3; j++){
                if(elements[shuffled[count]].shape[i][j] === 1){
                    switch (elements[shuffled[count]].type) {
                        case 'water':
                            matrix[rowind+i][cell+j] = 'W';
                            let water = new Image(30, 30);
                            water.src = 'assignment_assets/assets/tiles/water_tile.png';    
                            btable.rows[rowind+i].cells[cell+j].appendChild(water);
                            btable.rows[rowind+i].cells[cell+j].style.verticalAlign = "middle";
                            btable.rows[rowind+i].cells[cell+j].style.textAlign = "center";
                            btable.rows[rowind+i].cells[cell+j].id = "colored";
                            btable.rows[rowind+i].cells[cell+j].style.backgroundColor = "hsl(191, 79%, 64%)";
                        break;
                        case 'town':
                            matrix[rowind+i][cell+j] = 'T';
                            let town = new Image(30, 30); 
                            town.src = 'assignment_assets/assets/tiles/village_tile.png';    
                            btable.rows[rowind+i].cells[cell+j].appendChild(town);
                            btable.rows[rowind+i].cells[cell+j].style.verticalAlign = "middle";
                            btable.rows[rowind+i].cells[cell+j].style.textAlign = "center";
                            btable.rows[rowind+i].cells[cell+j].id = "colored";
                            btable.rows[rowind+i].cells[cell+j].style.backgroundColor = "hsl(0, 57%, 44%)";
                          break;
                        case 'forest':
                            matrix[rowind+i][cell+j] = 'F';
                            let forest = new Image(30, 30); 
                            forest.src = 'assignment_assets/assets/tiles/forest_tile.png';    
                            btable.rows[rowind+i].cells[cell+j].appendChild(forest);
                            btable.rows[rowind+i].cells[cell+j].style.verticalAlign = "middle";
                            btable.rows[rowind+i].cells[cell+j].style.textAlign = "center";
                            btable.rows[rowind+i].cells[cell+j].id = "colored";
                            btable.rows[rowind+i].cells[cell+j].style.backgroundColor = "hsl(122, 41%, 39%)";
                          break;
                        case 'farm':
                            matrix[rowind+i][cell+j] = 'P';
                            let farm = new Image(30, 30); 
                            farm.src = 'assignment_assets/assets/tiles/plains_tile.png';    
                            btable.rows[rowind+i].cells[cell+j].appendChild(farm);
                            btable.rows[rowind+i].cells[cell+j].style.verticalAlign = "middle";
                            btable.rows[rowind+i].cells[cell+j].style.textAlign = "center";
                            btable.rows[rowind+i].cells[cell+j].id = "colored";
                            btable.rows[rowind+i].cells[cell+j].style.backgroundColor = "hsl(54, 100%, 60%)";
                          break;
                        default:
                        break;
                      }
                }
            }
        }

    time.innerText = "Time: " + elements[shuffled[count]].time;
    timenr-=elements[shuffled[count]].time;    
    count++;
    let tempseason = season;
    season = 1+Math.floor((28-timenr) / 7);
    

    if(season !== tempseason){
        if(tempseason === 1){
            missionPoints['Spring'].A= missions.basic[array[0]].function();
            missionPoints['Spring'].B= missions.basic[array[1]].function();
            missionPoints['Spring'].C= missions.basic[array[2]].function();
            missionPoints['Spring'].D= missions.basic[array[3]].function();
            springScore = missionPoints['Spring'].A + missionPoints['Spring'].B;
            spring.innerText = "Spring: " + springScore;
            miss1 += missionPoints['Spring'].A;
            mission1points.innerText = "Points " + missionPoints['Spring'].A;
            miss2 += missionPoints['Spring'].B;
            mission2points.innerText = "Points " + missionPoints['Spring'].B;
            
            mission1points.style.backgroundColor='';
            mission2points.style.backgroundColor='red';
            mission3points.style.backgroundColor='red';
  
        }else if(tempseason === 2){
            missionPoints['Summer'].A= missions.basic[array[0]].function();
            missionPoints['Summer'].B= missions.basic[array[1]].function();
            missionPoints['Summer'].C= missions.basic[array[2]].function();
            missionPoints['Summer'].D= missions.basic[array[3]].function();
            summerScore = ((missionPoints['Summer'].B+ missionPoints['Summer'].C)-(missionPoints['Spring'].B+missionPoints['Spring'].C));
            summer.innerText = "Summer: " + summerScore;
            if(missionPoints['Summer'].B-missionPoints['Spring'].B>0){
            miss2 += missionPoints['Summer'].B-missionPoints['Spring'].B;
            }
            mission2points.innerText = "Points " + (miss2);
            if(missionPoints['Summer'].C-missionPoints['Spring'].C >0){
            miss3 += missionPoints['Summer'].C-missionPoints['Spring'].C;
            }
            mission3points.innerText = "Points " + (miss3);
            mission2points.style.backgroundColor='';
            mission3points.style.backgroundColor='red';
            mission4points.style.backgroundColor='red';

        }else if(tempseason === 3){
            missionPoints['Autumn'].A= missions.basic[array[0]].function();
            missionPoints['Autumn'].B= missions.basic[array[1]].function();
            missionPoints['Autumn'].C= missions.basic[array[2]].function();
            missionPoints['Autumn'].D= missions.basic[array[3]].function();
            autumnScore = ((missionPoints['Autumn'].C+ missionPoints['Autumn'].D)-(missionPoints['Summer'].C+missionPoints['Summer'].D));
            autumn.innerText = "Autumn: " + autumnScore;
            if(missionPoints['Autumn'].C-missionPoints['Summer'].C > 0){
            miss3 += (missionPoints['Autumn'].C-missionPoints['Summer'].C);
            }
            mission3points.innerText = "Points " + (miss3);
            if(missionPoints['Autumn'].D-missionPoints['Summer'].D){
            miss4 += (missionPoints['Autumn'].D-missionPoints['Summer'].D);
            }
            mission4points.innerText = "Points " + (miss4);
            mission3points.style.backgroundColor='';
            mission4points.style.backgroundColor='red';
            mission1points.style.backgroundColor='red';            
        }else if(tempseason === 4)
        {
            missionPoints['Winter'].A= missions.basic[array[0]].function();
            missionPoints['Winter'].B= missions.basic[array[1]].function();
            missionPoints['Winter'].C= missions.basic[array[2]].function();
            missionPoints['Winter'].D= missions.basic[array[3]].function();
            winterScore = ((missionPoints['Winter'].D + missionPoints['Winter'].A)-(missionPoints['Autumn'].D+missionPoints['Autumn'].A));
            winter.innerHTML = "Winter: " + winterScore;
            if(missionPoints['Winter'].D - missionPoints['Autumn'].D > 0){
            miss4 += (missionPoints['Winter'].D - missionPoints['Autumn'].D);
            }
            mission4points.innerText = "Points " + (miss4);
            if(missionPoints['Winter'].A - missionPoints['Autumn'].A > 0){
            miss1 += missionPoints['Winter'].A - missionPoints['Autumn'].A;
            }
            mission1points.innerText = "Points " + (miss1);
            mission4points.style.backgroundColor='';
            mission1points.style.backgroundColor='';
        }
    }

    if(season !== tempseason && increment < 4){
        seas.innerText = seasonarray[increment++];
    }

    elapsed.innerText = "Elapsed Time in this season: " + (7-(timenr % 7)) + "/7";
    
    if(timenr >= 0){
    timeshow.innerText = "Time left: " + timenr;
    }else{
        timeshow.innerText = "Time left: 0";
    }
    addfieldstosmalltable();
    }
}else{
    console.log("TIME IS FINISHED!!")
    elapsed.innerText = "Elapsed Time in this season: 7/7";
    let score = springScore+summerScore+autumnScore+winterScore;
    total.innerText = "Total score = " + score;
    }
}

function Borderlands(){
    let points =0;
        let array = new Array(11).fill(true);
        for(let i=0; i < 11; i++){
            let row = true;
            for(let j=0; j <11; j++){

                if(matrix[i][j] === " "){
                    row = false;
                    array[j] = false;
                }
            }

            if(row){
                points +=6;
            }
        }


        for(let i = 0; i < 11; i++){
            if(array[i] === true){
                points +=6;
            }
        }

    return points;
}

function handleRotateClick(){
    let res = new Array(3).fill(null).map(() => new Array(3));

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          res[j][2-i] = elements[shuffled[count]].shape[i][j];
        }
    }
    elements[shuffled[count]].shape = res;
    addfieldstosmalltable();    
    elements[shuffled[count]].rotation = (elements[shuffled[count]].rotation+1)%4;
}

function handleMirrorFunction(){
    let mirrorarray = new Array(3).fill(0).map(() => new Array(3));

    for(let i=0; i < 3; i++){
        for(let j=0; j < 3; j++){
            if(elements[shuffled[count]].shape[i][j] === 1){
                if(j === 2){
                    mirrorarray[i][0] = 1;
                }else if(j === 0){
                    mirrorarray[i][2] = 1;
                }else{
                    mirrorarray[i][j] = 1;
                }
            }
        }
    }
    console.log("!@#");

    elements[shuffled[count]].shape = mirrorarray;
    addfieldstosmalltable();
}
function checkifover(){
    if(timenr <= 0){
    console.log("TIME IS FINISHED!!")
    elapsed.innerText = "Elapsed Time in this season: 7/7";
    let score = springScore+summerScore+autumnScore+winterScore;
    total.innerText = "Total score = " + score;
    timeshow.innerHTML = "GAME OVER";
    }
}

body.addEventListener("mouseover",checkifover);
rotate.addEventListener("click",handleRotateClick);
mirror.addEventListener("click", handleMirrorFunction);
delegate(btable, "mouseover","td",mouseover);
delegate(btable, "mouseout","td",mouseout);
delegate(btable,"click","td",addSmalltoBig);
addMountain();
addfieldstosmalltable();
