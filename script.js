	console.log("document ready");	

// Get a reference to the canvas object - we always need this
var canvas = document.getElementById('myCanvas');
// Create an empty project and a view for the canvas - we always need this
paper.setup(canvas);
	
	// need to draw a smaller canvas/container
	// let the user decide where to start the position at -OR-
	// let the user clear the canvas and start over - can I save the position of the path
	// and start from there?
	
	
	// KEY EVENTS

	// The starting position of the line
	var position = new Point(10, 10);

	// The amount we will move when one of the keys is pressed:
	var step = 2;

	var path = new Path();
	path.strokeColor = 'black';
	path.add(position);

	function onKeyDown(event) {
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
		path.add(position);
		
		if(event.key == 'space'){
			path.remove();
		}
	}
		
	
	
// Draw the view now - we always need this, if drawing paths
paper.view.draw();
	
	
