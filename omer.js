//start your code here ...
// listens for the DOM html (document), fires when html has been loaded
document.addEventListener('DOMContentLoaded', () => {
    // selects the grid
    const grid = document.querySelector('.grid');
    // selects all the divs inside grid and puts in a array
    let squares = Array.from(document.querySelectorAll('.grid div'));
    // can replace this line by document.getElementById
    const scoreDisplay = document.querySelector('#score');
    // can replace this line by document.getElementById
    const startBtn = document.querySelector("#start-button");
    // each row has 10 squares, so to refer to the row below we add 10, and so on
    const width = 10;

    let nextRandom = 0;
    // declaring timerID like this initializes it equal to null 
    let timerId;
    // keep score
    let score = 0;

    const colors = [

        "orange", 

        "yellow", 

        "Moccasin", 

        "#62bf3b", 

        "#db2961"

    ];
    

    // The Tetrominoes

    // L shaped Tetromino
    // each Tetromino has 4 rotation, each rotatio is represented by one array here

    // to refer to the colum to the right we add 1, to refer to the column right of this last column we add 2, and so on. As our tetrominos only have 3x3 sizes we will be only adding 1 or 2 move right (1 or 2 columns) or 10 or 20 to move down (1 or 2 rows)

    // each row has 10 squares, so to refer to the row below we add 10, and so on
    const lTetromino =  [
        
        [1, width+1, width*2+1, 2], 

        [width, width+1, width+2, width*2+2], 

        [1, width+1, width*2+1, width*2], 

        [width, width*2, width*2+1, width*2+2],
		
		[1, width+1, width*2+1, 2]


    ];



    const sTetromino = [
        
        [0,width,width+1,width*2+1],

        [width+1, width+2,width*2,width*2+1],

        [0,width,width+1,width*2+1],

        [width+1, width+2,width*2,width*2+1],
		 
		[0,width,width+1,width*2+1]    


      ];

    

      const tTetromino = [
          
        [1,width,width+1,width+2],

        [1,width+1,width+2,width*2+1],

        [width,width+1,width+2,width*2+1],

        [1,width,width+1,width*2+1],
		  
		[1,width,width+1,width+2]
		  		  
      ];

    

      const oTetromino = [
          
        [0,1,width,width+1],

        [0,1,width,width+1],

        [0,1,width,width+1],

        [0,1,width,width+1],
		  
		[0,1,width,width+1]
		  
      ];

    

      const iTetromino = [
          
        [1,width+1,width*2+1,width*3+1],

        [width,width+1,width+2,width+3],

        [1,width+1,width*2+1,width*3+1],

        [width,width+1,width+2,width+3],
		  
		[1,width+1,width*2+1,width*3+1]

      ];
	
	const xTetromino = [
		
		[width,width*2+1,width*3+2,width+2,width*3],
		
		[width*3,width+2,width*3+2,width*2+1,width],
		
		[width,width*2+1,width*3+2,width+2,width*3],
		
		[width*3,width+2,width*3+2,width*2+1,width],
		
		[width,width*2+1,width*3+2,width+2,width*3]
		
	];

// array that groups all tetrominos
const theTetrominoes = [lTetromino, sTetromino, tTetromino, oTetromino, iTetromino, xTetromino];
// start postion for tetromino, square of index 4, we draw all the squares relative to this current position. ex: lshaped tetromino starts with the squares 4+1, 4+11,4+21,4+2 =5,15,25,6
let currentPosition = 4; 

let currentRotation = 0;
// randomly select a tetromino and its first rotation
let random = Math.floor(Math.random()*theTetrominoes.length);
// current tetromino (random) in first rotation position, returns something like 1,11,21,22 which are the positions to draw this tetromino relative to the current position.
let current = theTetrominoes[random][0];

    //draw function
    // draw the first rotation in the first tetromino
   function draw() {
       // classList access add class
       current.forEach( index => {
                squares[currentPosition+index].classList.add('tetromino');
                squares[currentPosition+index].style.backgroundColor = colors[random]; //color(random)
	        })
       
      };
     
    //undraw function
    function undraw() {
        
        current.forEach( index => {
            squares[currentPosition+index].classList.remove('tetromino');
            squares[currentPosition+index].style.backgroundColor = ""; 
         })
     };
           
    draw();

    //  movedown every seconds
   
   //timerId = setInterval(movedown , 1000);   

   // assign functions to keyCodes
   function control(e){
       
        if(e.keyCode === 37){
          
         moveleft ();
        
        }else if(e.keyCode === 38){
            
         rotate();
       
          }else if (e.keyCode === 39){
          
         moveRight();
       
        }else if (e.keyCode === 40){
           
            movedown();
       }
  }
    
    document.addEventListener("keyup", control);
                          
        //movedown function allows to tetromino to move down
        // moves the tetromino down every second
        function movedown() {
        // erases previous position
        undraw();
        // increases base position
        currentPosition += width;
        // draw tetromino in new position  
        draw();
        // check if it hit the bottom and freezes it   
        freeze();
         
   };
    
    // freeze function
    function freeze (){
        // for the next tetromino step (+width), if at least one of the squares has the class taken, which means the tetromino hit the bottom squares, we assign taken to all of the tetromino's squares
        if (current.some (index => squares[ currentPosition + index + width].classList.contains('taken'))){
            
            current.forEach (index => squares[ currentPosition + index].classList.add('taken'));
            
            //new tetromino falling
            // select a new tetromino to be our current one
            random = nextRandom ;
            
            nextRandom = Math.floor(Math.random()*theTetrominoes.length);
            
            current = theTetrominoes[random][currentRotation];
            
            currentPosition = 4;
            
            draw();
			
			displayShape();
			//add to the score and replaces full bottom row for a new clean row on the top
			addScore();
			
			gameOver();
            
        }
    }

    
    // allows the tetromino to move left
    // moves the tetromino left, unless it is at the edge or there is a blockage
    function moveleft (){
    
    undraw();
        
    // checks if tetromino is in position 10, 20, 30 and so on. Equivalent to check if divided by width (10) they left no remainder
    const isAtLeftEdge = current.some( index => (currentPosition + index) % width === 0);
        
    // if not at the edge, can move backward
    if(!isAtLeftEdge) currentPosition-= 1;   

    // stop if there is another tetromino occupying the space
    if(current.some ( index => squares[currentPosition + index].classList.contains('taken'))){
      
        // moves the tetromino forward so it doesnt overlap the other tetromino
        currentPosition += 1;
    }
      draw();  
    }
    
    //allows the tetromino to move right
    // moves the tetromino right, unless it is at the edge or there is a blockage
    function moveRight() {
		
		undraw();
		
		// checks if tetromino is in position 9, 18, 27 and so on. Equivalent to check if divided by width (10) they left no remainder
		const isAtRightEdge = current.some( index => (currentPosition + index)% width === width - 1);
		
		// if not at the edge, can move forward
		if (!isAtRightEdge) currentPosition += 1;
		
		// stop if there is another tetromino occupying the space
		if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
			
			// moves the tetromino backwards so it doesnt overlap the other tetromino
			currentPosition -= 1 ;
		}
		
	    draw();
	    
      }

    // rotate the tetromino
    function rotate(){
        
        undraw();
        
        currentRotation++
        // check if rotation is the last in the array
        if(currentRotation === current.length){
		// goes back to first rotation
		currentRotation = 0;
		
		}
		
		current= theTetrominoes[random][currentRotation];
		
		draw();
    }
  
  
  const displaySquares = document.querySelectorAll('.mini-grid div');
    
    // show up-next tetromino in mini-grid display
	const displayWidth = 4;
   
	const displayPosition = 0;
	
	
	//tetrominoes without rotation
	// the tetrominos without rotations (first rotations) to display
	const upNextTetrominoes = [
		
    [1, displayWidth+1, displayWidth*2+1, 2],  //lTetromino

    [0, displayWidth,displayWidth+1,displayWidth*2+1], //zTetromino

    [1,displayWidth,displayWidth+1,displayWidth+2], //tTetromino

    [0,1,displayWidth,displayWidth+1], //oTetromino

    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1], //iTetromino
		
	[displayWidth,displayWidth*2+1,displayWidth*3+2,displayWidth+2,displayWidth*3] //xTetromino
	
	]
    
    // display the shape in the mini-grid display
    function displayShape(){
       // remove any trace of tetrominos from the entire the mini grid
		displaySquares.forEach(square => {
         
			square.classList.remove('tetromino');
          
			square.style.backgroundColor= "";
        });
		
        // add block in display mini-grid , used next Random because the next random ( or upcoming block ) in main grid And mini-grid Should be Same.
		upNextTetrominoes[nextRandom].forEach(index => {
			
			displaySquares[displayPosition + index].classList.add('tetromino');
			
			displaySquares[displayPosition + index].style.backgroundColor = colors[nextRandom];
		});
        
		
    }
		
    // add functionality to the start button
	startBtn.addEventListener('click', () => {
		// if we have a timerId value, which means timerId is not null
		if (timerId){
			// pause the game
			clearInterval(timerId);
			
			timerId = null ;
		
		} else {
            // starts or resume the game
			draw();
			// we add a timerId so we can stop setInterval by pressing the button
			timerId = setInterval(movedown , 1000);  //tetromino moves down after Every 1 seconds
			
			nextRandom = Math.floor(Math.random()*theTetrominoes.length); //displaying next random Tetromino falling down
			//display shape in the mini-grid 
			displayShape();
		}
	})
	
    // addscore function
	function addScore(){
		
		for( let i = 0 ; i < 199 ; i+= width){
			// array with all the squares in the row
			const row = [ i , i+1 , i+2 , i+3 , i+4 , i+5 , i+6 , i+7 , i+8 , i+9 ];
			// check for every square in row if every one of them contain div with class = taken
			if(row.every(index => squares[index].classList.contains('taken'))){
				// increase score count
				score += 10;
				
				scoreDisplay.innerHTML = score;
				
                // remove the class tetromino so this row will be ready (and yellow) to be cut and put on top of the grid
				row.forEach( index => {
					
					squares[index].classList.remove('taken');
					
					squares[index].classList.remove('tetromino');
					
					squares[index].style.backgroundColor = '';
				});
				
                // take out the row
				const squaresRemoved = squares.splice(i, width);
				// append new squares to the html grid so the grid doesn't look smaller after removing the bottom squares.
				squares = squaresRemoved.concat(squares);
				
				squares.forEach(cell => grid.appendChild(cell));
				
				
			
			}
		}
	}

	
	//game over function 
	function gameOver(){
        // if for some of the current block2 who hasn't been play, if some of his positions contais a class of taken, it is game over. Means that the grid is full and there is no space for the tetromino.
		if(current.some (index => squares[currentPosition + index].classList.contains('taken'))){
			
			scoreDisplay.innerHTML = 'GAME OVER! PLAY AGAIN :)'; //writes and add in the score
			
			clearInterval(timerId); //stops the game
		}
	}
	
	

	
	







	
	  
      
      
      
      
      
      
      
    
});