var tail_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 
'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];
var memory_values = [];
var tile_ids = [];
var tile_flipped = 0;

const click = new Audio("./music/claps.mp3");
document.getElementById('game_board').addEventListener("click", e => click.play());
click.volume = 0.1;

Array.prototype.memory_tile_shuffle = function(){
  var i = this.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
}

function newBoard(){
  tile_flipped = 0;
  var output = '';
  tail_array.memory_tile_shuffle();
  for(var i = 0 ; i < tail_array.length ; i++){
    output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+tail_array[i]+'\')"></div>';
  }
  document.getElementById('game_board').innerHTML = output;
}

function memoryFlipTile(tile,val){
  
if(tile.innerHTML == "" && memory_values.length < 2){
    tile.style.background = '#FFF';
    tile.innerHTML = val;
    
    if(memory_values.length == 0){
      memory_values.push(val);
      tile_ids.push(tile.id);
      
    } else if(memory_values.length == 1){
      memory_values.push(val);
      tile_ids.push(tile.id);
      
      if(memory_values[0] == memory_values[1]){
        tile_flipped += 2;
        
        memory_values = [];
        tile_ids = [];
        
        if(tile_flipped == tail_array.length){
          alert("The Game Is Over. The New Game will start soon.");
          document.getElementById('game_board').innerHTML = "";
          newBoard();
        }
        
      } else {
        
        function flip2Back(){
          var tile_1 = document.getElementById(tile_ids[0]);
          var tile_2 = document.getElementById(tile_ids[1]);
          
          tile_1.style.background = 'url(./images/cover.jpg)  center no-repeat ';
          tile_1.innerHTML = "";
          
          tile_2.style.background = 'url(./images/cover.jpg)  center no-repeat';
          tile_2.innerHTML = "";
          
          memory_values = [];
          tile_ids = [];
        }
        setTimeout(flip2Back, 700);
      }
    }
  }
}   

newBoard(); 

