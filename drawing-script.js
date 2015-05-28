// Make the paper scope global, by injecting it into window:
paper.install(window);

//run the program after the window has loaded
window.onload = function() {
	
	// call the first paper.js canvas
	loadDrawingSpace();
	// call the second paper.js canvas
	loadButtonSpace();


function loadDrawingSpace(){
	
	//show something in the console just to check
	console.log("window is loaded");
	console.log("drawing canvas is loaded");		
		
		// make the canvas
		paper.setup('canvasTop');		

/*
		// testing out to see what the properties give us
		console.log("pixel ratio: " + view.pixelRatio);	// read only
		console.log("element: " + view.element);		// read only
		console.log("resolution: " + view.resolution);	// read only
		console.log("viewSize: " + view.viewSize);
		console.log("bounds: " + view.bounds);		// read only
		console.log("size: " + view.size);			// read only
		console.log("center: " + view.center);		
		console.log("zoom: " + view.zoom);			
*/
		
		// change the size of our view - width, height
		// view.viewSize = new Size(400, 100);			
		// console.log("viewSize: " + view.viewSize);
		// I'm doing this with CSS now

		// make a rectangle with rounded corners approximately the same size as our #canvasTop
		var wrapperRectangle = new Rectangle(new Point(1, 1), new Point(808, 308));
		var wrapperCornerSize = new Size(10, 10);
		var pathWrapperRectangle = new Path.RoundRectangle(wrapperRectangle, wrapperCornerSize);
		pathWrapperRectangle.fillColor = '#C8C8C8';
		pathWrapperRectangle.strokeColor = 'black';
		pathWrapperRectangle.strokeWidth = 2;

		// we need to create a tool to talk to each event handler we create
		// we want to keep this as a global variable
		var toolK = new Tool();	
	
		// the pathK is the line that will be drawn by the user
		var pathK = new Path();
		pathK.strokeColor = '#3D3D3D';
		pathK.strokeJoin = "round";	// change the look of the end points when the line changes direction
		//pathK.opacity = 0.75;	// make the line transparent

		pathK.strokeWidth = 2;		// set the width of the line to 1 by default
		console.log("path stroke: " + pathK.strokeWidth);
/* TURN THIS BACK ON LATER TO PROMPT USER OR ADD A BUTTON
		// let the user choose the width of the line
		function getUserStrokeWidth(userStrokeWidth){
			userStrokeWidth = prompt("How wide would you like your line to be? Give me a number between 1 and 8.");
			pathK.strokeWidth = userStrokeWidth;
		}
		getUserStrokeWidth();
		console.log("path stroke: " + pathK.strokeWidth);
*/
		

		var step = 5;	// The amount we will move when one of the keys is pressed is 2 by default
		console.log("step: " + step);
/* not working...line goes huge!	
		// let the user choose the length of the steps that the path jumps each time a key is pressed
		function getUserStepLength(userStepLength){
			userStepLength = prompt("How far would you like your line to move each time you press a key? Give me a number between 1 and 5.");
			step = userStepLength;
		}
		getUserStepLength();
		console.log("step: " + step);
*/
		
		// The starting position of the line
		var position = new Point(10, 300);	//x or width, y or vertical
		// we tell it to start at the Point we specified above
		pathK.add(position);	

/* I don't think this makes a difference? I also set resize to false in the HTML. Not sure.
		// use onResize to get the item to stay in a specified position 
		// if the window is resized
		
		//tell canvas? to stay in center of window when window is resized
		toolK.onResize = function(event) {
			// Whenever the window is resized, recenter the path:
			pathK.position = (10, 10);
			console.log("window resized");
		}
*/	
		

		toolK.onKeyDown = function(event) {
			if(event.key == 'z') {
				position.x -= step;
			}

			if(event.key == 'x') {
				position.x += step;
			}

			if(event.key == 'up') {
				event.preventDefault();  //turn off default behavior for arrow keys
				position.y -= step;
			}

			if(event.key == 'down') {
				event.preventDefault();
				position.y += step;
			}
			pathK.add(position);
		
			if(event.key == 'space'){
				//pathK.remove();			//remove the drawing
				pathK.visible = false;
			}
		}

		
		view.draw(); // needed to make the drawing go faster
		
//	} 	// close the "with paper" setup
}		// close the window.onload function



function loadButtonSpace(){
	//show something in the console just to check
	console.log("window is loaded");
	console.log("buttons canvas is loaded");			
		
		// make the canvas
		paper.setup('canvasBottom');		

/* ANIMATION TO TEST
		var pathG = new Path.Rectangle(new Point(50, 50), new Size(100, 50));
		pathG.style = {
			fillColor: 'white',
			strokeColor: 'black'
		};

		// Create a copy of the path and set its stroke color to red:
		var copyMe = pathG.clone();
		copyMe.strokeColor = 'red';

		// Need to include view. before onFrame since we are using JavaScript
		view.onFrame = function() {
			// Each frame, rotate the copy by 1 degree:
			copyMe.rotate(1);
		}
*/		

		var circleLeftBack = new Path.Circle(new Point(50, 152), 50);
		circleLeftBack.fillColor = 'black';
		circleLeftBack.opacity = 0.5;	// make the line transparent
				
		var circleLeftFront = new Path.Circle(new Point(50, 152), 46);
		circleLeftFront.fillColor = 'white';
				
		var circleRightBack = circleLeftBack.clone();
		circleRightBack.position.x = 834;
		
		var circleRightFront = circleLeftFront.clone();
		circleRightFront.position.x = 834;
		
		
		view.draw(); // needed to make the drawing go faster
		
//	} 	// close the "with paper" setup
}		// close the window.onload function

}




