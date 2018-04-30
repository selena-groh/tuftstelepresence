var url = "localhost:9090";
var connect = false;
var ip;
//var cmd;

function init() {
  'use strict';
  var ros, keyboard, battery, viewer, nav;
  
  if (connect) {

    // initiate ros object
    ros = new ROSLIB.Ros({
      url: ip
    });

    // handle exceptions
    ros.on('connection', function () {
      var status = document.getElementById("status");
      status.innerHTML = "<p id='status' style='color:green;'><strong>STATUS: CONNECTED</strong></p>";
    });

    ros.on('error', function (error) {
      var status = document.getElementById("status");
      status.innerHTML = "<p id='status' style='color:red;'><strong>ERROR: FAILED TO CONNECT</strong></p>";
    });

    ros.on('close', function () {
      var status = document.getElementById("status");
      status.innerHTML = "<p id='status' style='color:red;'><strong>STATUS: DISCONNECTED</strong></p>";
    });

    // initiate keyboardteleop object
    keyboard = new KEYBOARDTELEOP.Teleop({
      ros: ros,
      topic: '/cmd_vel_mux/input/teleop'
    });

    // update the speed      
    keyboard.scale = 0.4;

    // hide the "no map loaded" message
    document.getElementById('no-map-loaded').style.display = 'none';
    document.getElementById('battery').style.display = 'block';

    // battery indicator
    battery = new ROSLIB.Topic({
      ros : ros,
      name : '/mobile_base/sensors/core',
      messageType : 'kobuki_msgs/SensorState'
    });

    battery.subscribe(function(message) {
      var batteryLevel = message.battery/165 * 100;
      $('#battery').width(batteryLevel.toString() + '%');
      $('#battery').html(Math.floor(batteryLevel.toString() + "%"));
      battery.unsubscribe();
    });
    
    // create a new map object
    // Create the main viewer.
    viewer = new ROS2D.Viewer({
      divID : 'map',
      width : 720,
      height : 720
    });

    // Setup the nav client
    nav = NAV2D.OccupancyGridClientNav({
      ros : ros,
      rootObject : viewer.scene,
      viewer : viewer,
      serverName : '/move_base'
    });

//		// publish cmd topic to the turtlebot
//	    cmd = new ROSLIB.Topic({
//			ros: ros,
//			name: '/cmd_vel_mux/input/teleop',
//			messageType: 'geometry_msgs/Twist'
//		});
  }
}

function updateIP() {
  'use strict';
  
  url = document.getElementById("ip").value;
  ip = "ws://" + url;
  connect = true;
  init();
}

//// move turtlebot forward
//function forward(){
//	var twist = new ROSLIB.Message({
//		linear: {
//			x: 0,
//			y: 0,
//			z: 0 
//		}, 
//		angular: {
//			x: 0,
//			y: 0, 
//			z: 0
//		}
//	});
//	cmd.publish(twist);
//}
//
//// move turtlebot backward
//function backward(){
//	var twist = new ROSLIB.Message({
//		linear: {
//			x: 0,
//			y: 0,
//			z: 0 
//		}, 
//		angular: {
//			x: 0,
//			y: 0, 
//			z: 0
//		}
//	});
//	cmd.publish(twist);
//}
//
//// move turtlebot left
//function left(){
//	var twist = new ROSLIB.Message({
//		linear: {
//			x: 0,
//			y: 0,
//			z: 0 
//		}, 
//		angular: {
//			x: 0,
//			y: 0, 
//			z: 0
//		}
//	});
//	cmd.publish(twist);
//}
//
//// move turtlebot right
//function right(){
//	var twist = new ROSLIB.Message({
//		linear: {
//			x: 0,
//			y: 0,
//			z: 0 
//		}, 
//		angular: {
//			x: 0,
//			y: 0, 
//			z: 0
//		}
//	});
//	cmd.publish(twist);
//}