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
			var status = document.getElementById("status");
			status.innerHTML = "<p id='status' style='color:green;'><strong>STATUS: CONNECTED</strong></p>";
		});

		ros.on('error', function(error){
			var status = document.getElementById("status");
			status.innerHTML = "<p id='status' style='color:red;'><strong>ERROR: FAILED TO CONNECT</strong></p>";
		});
      
        ros.on('close', function(){
            var status = document.getElementById("status");
			status.innerHTML = "<p id='status' style='color:red;'><strong>STATUS: DISCONNECTED</strong></p>";
        })

		// initiate keyboardteleop object
		keyboard = new KEYBOARDTELEOP.Teleop({
			ros: ros,
			topic: '/cmd_vel_mux/input/teleop'
		});

		// update the speed      
        keyboard.scale = 0.4;

        // battery indicator
        var battery = new ROSLIB.Topic({
  	    	ros : ros,
  	     	name : '/mobile_base/sensors/core',
  	     	messageType : 'kobuki_msgs/SensorState'
  	   	});
   
    	battery.subscribe(function(message) {
    		$('#battery').val(message.battery/165 * 100);
    		$('#level').html("Battery Level: " + Math.floor(message.battery/165 * 100) + "%");
      		battery.unsubscribe();
     	});
  
        // create a new map object
        // Create the main viewer.
	    var viewer = new ROS2D.Viewer({
	      divID : 'map',
	      width : 720,
	      height : 720
	    });

	    // Setup the nav client
	    var nav = NAV2D.OccupancyGridClientNav({
	      ros : ros,
	      rootObject : viewer.scene,
	      viewer : viewer,
	      serverName : '/move_base'
	    });

		// publish cmd topic to the turtlebot
	    cmd = new ROSLIB.Topic({
			ros: ros,
			name: '/cmd_vel_mux/input/teleop',
			messageType: 'geometry_msgs/Twist'
		});
	}
}
