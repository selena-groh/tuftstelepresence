var url = "localhost:9090";
var connect = false;
var cmd;

function updateIP(){
		url = document.getElementById("ip").value;
		ip = "ws://" + url;
		connect = true;
		init(); 
}

function init(){

	if (connect){

		// initiate ros object
		ros = new ROSLIB.Ros({
			url: ip
		});

		// handle exceptions
		ros.on('connection', function(){

		});

		ros.on('error', function(){

		});

		// initiate keyboardteleop object
		keyboard = new KEYBOARDTELEOP.Teleop({
			ros: ros,
			topic: '/cmd_vel_mux/input/teleop'
		});

		// publish cmd topic to the turtlebot
	    cmd = new ROSLIB.Topic({
			ros: ros,
			name: '/',
			messageType: 'geometry_msgs/Twist'
		});
	}
}

// move turtlebot forward
function forward(){
	var twist = new ROSLIB.Message({
		linear: {
			x: 0,
			y: 0,
			z: 0 
		}, 
		angular: {
			x: 0,
			y: 0, 
			z: 0
		}
	});
	cmd.publish(twist);
}

// move turtlebot backward
function backward(){
	var twist = new ROSLIB.Message({
		linear: {
			x: 0,
			y: 0,
			z: 0 
		}, 
		angular: {
			x: 0,
			y: 0, 
			z: 0
		}
	});
	cmd.publish(twist);
}

// move turtlebot left
function left(){
	var twist = new ROSLIB.Message({
		linear: {
			x: 0,
			y: 0,
			z: 0 
		}, 
		angular: {
			x: 0,
			y: 0, 
			z: 0
		}
	});
	cmd.publish(twist);
}

// move turtlebot right
function right(){
	var twist = new ROSLIB.Message({
		linear: {
			x: 0,
			y: 0,
			z: 0 
		}, 
		angular: {
			x: 0,
			y: 0, 
			z: 0
		}
	});
	cmd.publish(twist);
}

