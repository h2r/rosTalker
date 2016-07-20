# rosTalker
This code sends the speech to text output of the Amazon Echo across a ROS network on a topic.

To get this running, first you need to go into ``src/index.js`` and you need to change the ``APP_ID`` variable to your own app_id, and change the ``url`` variable to the address of your websocket server.

Then you'll need to install the roslibjs library with npm ``npm install roslib``.

Then you'll need to zip the files and folders in src into a single zip, upload that to a lambda function with Amazon, and link that function to an Alexa skill. Check [here](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function) for more detailed instructions.


After that, start your websocket server on your local machine with ``roslaunch rosbridge_server rosbridge_websocket.launch``.

Now enable the skill though Amazon's web interface, and you're good to go! The topic name is ``/speech_recognition``, but feel free to change that.
