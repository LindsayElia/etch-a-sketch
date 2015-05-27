console.log("document ready");	// check that this file is loading


// Get a reference to the canvas object - we always need this
var canvas = document.getElementById('myCanvas');
// Create an empty project and a view for the canvas - we always need this
paper.setup(canvas);



// MAKING LINES AND SHAPES

	var path1 = new Path();
	path1.strokeColor = 'black';
	path1.add(new Point(10, 10));
	path1.add(new Point(200, 300));
	
	var path2 = new Path();
	path2.strokeColor = 'green';
	path2.add(new Point(300, 10));		// try adding paper. before Point after wrapping in jquery
	path2.add(new Point(-200, 700));
	
	var topLeft = new Point(50, 20);
	var rectSize = new Size(200, 100);
	var rect = new Path.Rectangle(topLeft, rectSize);
	console.log(rect); 
	rect.fillColor = '#baddb2';
	//rect.selected = true;
	
	// 2 circles in the same location, the slightly larger radius is first so it appears as an outline on the second one
	var circle1 = new Path.Circle(new Point(75, 200), 35);//first two are x and y, which are the center point, and third number is the radius length
	circle1.fillColor = 'brown';
	
	var circle2 = new Path.Circle(new Point(75, 200), 30);//first two are x and y, which are the center point, and third number is the radius length
	circle2.fillColor = 'pink';
	
	//rectangle with rounded corners
	var rectangleR = new Rectangle(new Point(65, 30), new Point(150, 100));
	var cornerSize = new Size(5, 5);
	var path = new Path.RoundRectangle(rectangleR, cornerSize);
	path.fillColor = 'white';
	
	
	// Create a triangle shaped path 
	var triangle = new Path.RegularPolygon(new Point(400, 70), 3, 50);
	triangle.fillColor = '#d4b2dd';

	// Create a 15 sided shaped path 
	var fifteensides = new Path.RegularPolygon(new Point(400, 150), 15, 50);
	fifteensides.fillColor = '#f3ef86';
	
	
	var checkmark = new Path({
		segments: [[40, 115], [80, 180], [200, 20]],
	});
	checkmark.strokeColor = '#ff0000';
	checkmark.strokeWidth = 6;
	checkmark.strokeCap = 'round';
	checkmark.strokeJoin = 'round';
	checkmark.dashArray = [8, 10];
	

	
// MOUSE EVENTS
	
	function onMouseDown(event) {
		console.log('You pressed the mouse!');
	}

	function onMouseDrag(event) {
		console.log('You dragged the mouse!');
	}

	function onMouseUp(event) {
		console.log('You released the mouse!');
	}
	
	var path;
	function onMouseDown(event) {
		// Create a path:
		path = new Path();
		path.strokeColor = 'black';
		// Add the mouse down position:
		path.add(event.point);
		console.log(event.point);
	}

	function onMouseUp(event) {
		// Add the mouse up position:
		path.add(event.point);
		console.log(event.point);
	}

	

// KEY EVENTS

	// The starting position of the line
	var position = new Point(100, 100);

	// The amount we will move when one of the keys is pressed:
	var step = 10;

	var path = new Path();
	path.strokeColor = 'black';
	path.add(position);

	function onKeyDown(event) {
		if(event.key == 'a') {
			position.x -= step;
		}

		if(event.key == 'd') {
			position.x += step;
		}

		if(event.key == 'w') {
			position.y -= step;
		}

		if(event.key == 's') {
			position.y += step;
		}
		path.add(position);
	}
	
	
	
// Draw the view now - we always need this, if drawing paths
paper.view.draw();
	
	
