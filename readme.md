# Cat remote control base project

Project to kick start newcomers to the node>arduino world in the nodebot's day event.

it is built to be simple, exposing control of key elements that could lead to more exploration (lights,servo,connection via web, sensors are missing tho)

feel free to use abuse and play with it (the code, not the cat, at least do not abuse it)

Build robots to make cat's happy, closing the gap between cats and internet, my small contribution to make a better world 



###things to do :

- [x] tool list
- [x] material list (done but not sure if i should point to hardware site)
- hardware set up 
    - [x] hardware tutorial 
    - [x] pict and illustration
  - [x] text for the led 
  - [x] diagram for servo
  - [x] diagram for laser
- [x] clean the repo
- software tutorial
  - nodebot part
    - [ ] finish board initialisation / application logic separation
    - [x] basic led example
    - [x] repl test
    - [X] connecting the servos
    - [ ] event chaining
    - [X] link to socket.io ?
    - [ ] begin controller part
        - [x] web controller
          - [x] give basic html markup and system to control the device, since it all about the bots
          - [x] link input of the widget to socket.io
          - [x] extend the bot to act after the messages
        - [X] basic leapmotion control
        - [ ] hardware joystick
          - [ ] hardware wirering
          - [ ] extend the bot to act after joystick input
        - [ ] game pad via html api
          - [ ] get the value from the pad
          - [ ] link input of the widget to socket.io
          - [ ] extend the bot to act after the messages
          - [ ] smoothing value ?
        - [x] creative cam
          - demo since the hardware is not fully available
        - webcam
          - [ ] js hand tracking