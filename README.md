# rosTalker
code to send amazon echo speech to text information to a ros topic

To get this running, you need to change the ``APP_ID`` variable to your own app_id, and change the ``url`` variable to the address of your websocket server.

Then you'll need to install the roslibjs library with npm ``npm install roslib``.

After that, start your websocket server on your local machine with ``roslaunch rosbridge_server rosbridge_websocket.launch``.

Now enable the skill though Amazon's web interface, and you're good to go! The topic name is ``/speech_recognition``, but feel free to change that.
