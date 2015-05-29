// Make the paper scope global, by injecting it into window:
paper.install(window);

//run the program after the window has loaded
window.onload = function() {
	
	//test that jQuery is loaded
	//var backDiv = $('#container');
	//backDiv.css("backgroundColor", "blue");
	
	//show something in the console just to check
	console.log("window is loaded");
	console.log("drawing canvas is loaded");
	
	// declare our global variables
	var pathWR;	// gray rectangle
	var group;
	var path;
	var groupsArray;
	var pathsArray;
	var counter;
	var toolK = new Tool(); // we need to create a tool to talk to each event handler we create
							// we want to keep this as a global variable
	var startingPoint = new Point(150, 350); // The starting position of the line
	var step = 2; // The amount we will move when one of the keys is pressed is 2 by default

	// make the canvas
	paper.setup('canvasTop');

/* TESTING THINGS OUT
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

// BACKGROUND GRAY RECTANGLE WITH ROUNDED CORNERS
	// make a rectangle with rounded corners approximately the same size as our #canvasTop
	var wrapperRectPoints = new Rectangle(new Point(75, 1), new Point(808, 400));
	var wrapperRectSize = new Size(10, 10);
	wrapperRectangle = new Path.RoundRectangle(wrapperRectPoints, wrapperRectSize);
	wrapperRectangle.fillColor = '#C8C8C8';  // light gray
	wrapperRectangle.strokeColor = 'black';
	wrapperRectangle.strokeWidth = 3;		


	counter = 0;
	groupsArray = [];
	pathsArray = [];
	
	function makeNewGroups(){	
		for (var i = 0; i < 100; i++){
			// Create an empty group:
			group = new Group();
			// add the group into our groupsArray
			groupsArray.push(group)
		}
	} // close makeNewGroup
	makeNewGroups();
	console.log(groupsArray);
	
	function makeNewPaths(){
		for (var j = 0; j < 100; j++){
			// Create an empty group:
			path = new Path({
				strokeColor: '#3D3D3D',	// some sort of "lighter" black color
				strokeJoin: "round", 	// round corners when line changes direction
				strokeWidth: 2,
			});
			// add the group into our groupsArray
			pathsArray.push(path)
		}
		return pathsArray;
	} // close makeNewGroup
	makeNewPaths();
	console.log(pathsArray);
	
/* TURN THIS BACK ON LATER?? TO PROMPT USER OR ADD A BUTTON
		// let the user choose the width of the line
		function getUserStrokeWidth(userStrokeWidth){
			userStrokeWidth = prompt("How wide would you like your line to be? Give me a number between 1 and 8.");
			pathK.strokeWidth = userStrokeWidth;
		}
		getUserStrokeWidth();
		console.log("path stroke: " + pathK.strokeWidth);
*/

// KEY DOWN EVENTS -- MAKE THE LINE THE USER DRAWS
	function makeNewLine() {
		
		// set current path to the starting position
		pathsArray[counter].add(startingPoint);
	
		toolK.onKeyDown = function(event) {
							
			if (event.key == 'left') {
				event.preventDefault(); //turn off default behavior for arrow keys
				console.log("key 'left' pressed");
				startingPoint.x -= step;
				// MOVE THE DASHED LINES INSIDE OF THE LEFT WHEEL	
				pathCR.rotate(-1);
				pathTinyR.rotate(-1);
			}
			
			if (event.key == 'right') {
				console.log("key 'right' pressed");
				startingPoint.x += step;
				pathCR.rotate(1);
				pathTinyR.rotate(1);
			}
			
			if (event.key == 'up') {
				event.preventDefault();
				console.log("key 'up' pressed");
				startingPoint.y -= step;
				pathCL.rotate(-1);
				pathTinyL.rotate(-1);
			}
			
			if (event.key == 'down') {
				event.preventDefault();
				console.log("key 'down' pressed");
				startingPoint.y += step;
				pathCL.rotate(1);
				pathTinyL.rotate(1);
			}
							
			// add the new locations to the path
			pathsArray[counter].add(startingPoint);	
			
		}	// close toolK.onKeyDown()
	} // close makeNewLine
			

// MOUSE OVER EVENT - PLAIN JAVASCRIPT - ACTIVATES THE KEYDOWN EVENTS
	var divFun = document.getElementById("canvasTop");
	divFun.onmouseover = function(event){
		console.log("mouse over");
			makeNewLine();
	}	// close onmouseover()
		
	
// MAKE THE WHEELS
	var circleLeftBack = new Path.Circle(new Point(50, 458), 50);
	circleLeftBack.fillColor = 'black';
	circleLeftBack.opacity = 0.5; // make the line transparent

	var circleLeftFront = new Path.Circle(new Point(50, 458), 45);
	circleLeftFront.fillColor = '#F0EEF1'; // off-white color

	var circleRightBack = circleLeftBack.clone();
	circleRightBack.position.x = 834;

	var circleRightFront = circleLeftFront.clone();
	circleRightFront.position.x = 834;

// MAKE THE DASHED LINES INSIDE OF THE WHEELS
	var pathCL = new Path.Circle({
		center: [50, 458],		// same y coord as the circles
		radius: 40,
		strokeWidth: 2,
		strokeColor: 'black',
		dashArray: [10, 4], // Set the dashed stroke to [10pt dash, 4pt gap]:
	});

	var pathCR = pathCL.clone();
	pathCR.position.x = 834;
	
	var pathTinyL = new Path();
	pathTinyL.strokeColor = 'black';
	pathTinyL.add(new Point(45, 453));
	pathTinyL.add(new Point(55, 463));
	
	var pathTinyR = new Path();
	pathTinyR.strokeColor = 'black';
	pathTinyR.add(new Point(839, 453));
	pathTinyR.add(new Point(829, 463));


// MAKE BUTTON RECTANGLES
	// make a rectangle with rounded corners for the CLEAR button
	// is on the right side of the page
	var clearButton = new Rectangle(new Point(650, 430), new Point(720, 490));
	var clearButtonCornerSize = new Size(5, 5);
	var pathCB = new Path.RoundRectangle(clearButton, clearButtonCornerSize);
	pathCB.fillColor = '#E1BF5C';	// light yellow
	pathCB.strokeColor = 'black';
	pathCB.strokeWidth = 2;
	
	// Create text inside the CLEAR button
	var text1 = new PointText(new Point(656,454));
	text1.fillColor = 'black';
	text1.content = 'Click Me';
	text1.fontFamily = 'Cabin Sketch';
	text1.fontSize = '1em';
	
	var text2 = text1.clone();
	text2.position.y = 470;
	text2.fillColor = 'black';
	text2.content = 'to Erase';

	// make a rectangle with rounded corners for the START button
	// is on the left side of the page
	var pathSB = pathCB.clone();
	pathSB.fillColor = '#C8C8C8';  // light gray
	pathSB.position = new Point(200, 460);
	
	// Create text inside the START button
	var text3 = text1.clone();
	text3.position.x = 199;
	
	var text4 = text2.clone();
	text4.position.x = 201;
	text4.content = 'to Start';

	var text5 = text1.clone();
	text5.position.x = 380;
	text5.content = 'Use arrow keys to move.';
	text5.fillColor = '#F0EEF1'; // off-white color
	
	// sign my name!
	var text6 = text5.clone();
	text6.position.x = 455;
	text6.position.y = 470;
	text6.content = 'created by Lindsay Elia';
	text6.fontSize = '.85em';


// MAKE MOUSE DOWN EVENTS FOR THE BUTTONS TO CLEAR AND START THE DRAWINGS
	toolK.onMouseDown = function(event) {
		if (pathCB.bounds.contains(event.point)){
			console.log("clear button clicked");
		
		//	this works to rasterize, but not disapper
		//	var raster = groupsArray[counter].rasterize();
		//	raster.scale(5);
			
			//hide the line we've drawn so far
			groupsArray[counter].visible = false;
		
			// play the "erasing" sound
			document.getElementById('sound').play()
			
			// if 'erase' is clicked before anything else is done on the canvas,
			// hide the "start" mark
			if (counter === 0){
				pathsArray[counter].position.x -= 1;
				pathsArray[counter].position.y -= 1;
			}
		}
		
		if (pathSB.bounds.contains(event.point)){
			console.log("start button clicked");
			counter = counter + 1;
			// Add the paths to one of the group items in the groupsArray
			groupsArray[counter].addChild(pathsArray[counter]);
			console.log(groupsArray[counter]);
			// show a piece of the line to the user
			pathsArray[counter].add(startingPoint);
			pathsArray[counter].position.x += 1;
			pathsArray[counter].position.y += 1;
			pathsArray[counter].add(startingPoint);
		}
	}
		
	
	

// TELL OUR CANVAS TO DRAW RIGHT AWAY				
	view.draw(); // needed to make the drawing go faster

} // close the window.onload() function
