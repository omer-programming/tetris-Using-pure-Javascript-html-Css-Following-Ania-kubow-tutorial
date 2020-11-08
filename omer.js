//start your code here ...
document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');

    let squares = Array.from(document.querySelectorAll('.grid div'));

    const scoreDisplay = document.querySelector('#score');

    const startBtn = document.querySelector("#start-button");

    const width = 10;

    let nextRandom = 0;

    let timerId;

    let score = 0;

    const colors = [

        "orange", 

        "yellow", 

        "Moccasin", 

        "#62bf3b", 

        "#db2961"

    ];
    

    // The Tetrominoes

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

const theTetrominoes = [lTetromino, sTetromino, tTetromino, oTetromino, iTetromino, xTetromino];

let currentPosition = 4; 

let currentRotation = 0;

let random = Math.floor(Math.random()*theTetrominoes.length);

let current = theTetrominoes[random][0];

   //draw function
   function draw() {
       
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
        function movedown() {
         
        undraw();
         
        currentPosition += width;
         
        draw();
            
        freeze();
         
   };
    
    //freeze function
    function freeze (){

        if (current.some (index => squares[ currentPosition + index + width].classList.contains('taken'))){
            
            current.forEach (index => squares[ currentPosition + index].classList.add('taken'));
            
            //new tetromino falling
            random = nextRandom ;
            
            nextRandom = Math.floor(Math.random()*theTetrominoes.length);
            
            current = theTetrominoes[random][currentRotation];
            
            currentPosition = 4;
            
            draw();
			
			displayShape();
			
			addScore();
			
			gameOver();
            
        }
    }

    
    // allows the tetromino to move left
    function moveleft (){
    
    undraw();
        
    
    const isAtLeftEdge = current.some( index => (currentPosition + index) % width === 0);
        
    
    if(!isAtLeftEdge) currentPosition-= 1;   

    
    if(current.some ( index => squares[currentPosition + index].classList.contains('taken'))){
      
    
        currentPosition += 1;
    }
      draw();  
    }
    
  //allows the tetromino to move right
    function moveRight() {
		
		undraw();
		
		
		const isAtRightEdge = current.some( index => (currentPosition + index)% width === width - 1);
		
		
		if (!isAtRightEdge) currentPosition += 1;
		
		
		if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
			
			
			currentPosition -= 1 ;
		}
		
	    draw();
	    
      }

    //allows the tetromino to rotate
    function rotate(){
        
        undraw();
        
        currentRotation++
        
        if(currentRotation === current.length){
		
		currentRotation = 0;
		
		}
		
		current= theTetrominoes[random][currentRotation];
		
		draw();
    }
    
  const displaySquares = document.querySelectorAll('.mini-grid div');
  
	const displayWidth = 4;
   
	const displayPosition = 0;
	
	
	//tetrominoes without rotation
	
	const upNextTetrominoes = [
		
    [1, displayWidth+1, displayWidth*2+1, 2],  //lTetromino

    [0, displayWidth,displayWidth+1,displayWidth*2+1], //zTetromino

    [1,displayWidth,displayWidth+1,displayWidth+2], //tTetromino

    [0,1,displayWidth,displayWidth+1], //oTetromino

    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1], //iTetromino
		
	[displayWidth,displayWidth*2+1,displayWidth*3+2,displayWidth+2,displayWidth*3] //xTetromino
	
	]
    
    function displayShape(){
       
		displaySquares.forEach(square => {
         
			square.classList.remove('tetromino');
          
			square.style.backgroundColor= "";
        });
		
		upNextTetrominoes[nextRandom].forEach(index => {
			
			displaySquares[displayPosition + index].classList.add('tetromino');
			
			displaySquares[displayPosition + index].style.backgroundColor = colors[nextRandom];
		});
        
		
    }
		
	//adding functionality to Button
	startBtn.addEventListener('click', () => {
		
		if (timerId){
			
			clearInterval(timerId);
			
			timerId = null ;
		
		} else {
			 
			draw();
			
			timerId = setInterval(movedown , 1000);
			
			nextRandom = Math.floor(Math.random()*theTetrominoes.length);
			
			displayShape();
		}
	})
	
	function addScore(){
		
		for( let i = 0 ; i < 199 ; i+= width){
			
			const row = [ i , i+1 , i+2 , i+3 , i+4 , i+5 , i+6 , i+7 , i+8 , i+9 ];
			
			if(row.every(index => squares[index].classList.contains('taken'))){
				
				score += 10;
				
				scoreDisplay.innerHTML = score;
				
				row.forEach( index => {
					
					squares[index].classList.remove('taken');
					
					squares[index].classList.remove('tetromino');
					
					squares[index].style.backgroundColor = '';
				});
				
				const squaresRemoved = squares.splice(i, width);
				
				squares = squaresRemoved.concat(squares);
				
				squares.forEach(cell => grid.appendChild(cell));
				
				
			
			}
		}
	}

	
	//game over function 
	function gameOver(){
		 
		if(current.some (index => squares[currentPosition + index].classList.contains('taken'))){
			
			scoreDisplay.innerHTML = 'GAME OVER! PLAY AGAIN :)';
			
			clearInterval(timerId);
		}
	}
	
	

	
	







	
	  
      
      
      
      
      
      
      
    
});