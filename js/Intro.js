function Intro(i_parent) {
    var that = this;
    that.parent = i_parent;

    that.mustLeave = false;

    that.setUp = function () {
        that.parent.data.canvasContext.drawImage(that.parent.data.images.MenuBG, 0, 0);
        that.parent.data.canvasContext.drawImage(that.parent.data.images.introduction, 15, 15);

        that.parent.data.canvasContext.fillStyle = "rgba(255,255,255,0.4)";
        that.parent.data.canvasContext.fillRect(20, 80, that.parent.data.canvas.width - 45, 30);
        that.parent.data.canvasContext.fillRect(20, 120, that.parent.data.canvas.width - 45, that.parent.data.canvas.height - 170);
        that.parent.data.canvasContext.font = "20pt arial";
        that.parent.data.canvasContext.fillStyle = "rgba(0,0,0,1)";
        wrapText(that.parent.data.canvasContext, that.data[that.parent.data.currentLevel].title, 25, 104, that.parent.data.canvas.width - 45, 25);
        that.parent.data.canvasContext.font = "12pt arial";
        wrapText(that.parent.data.canvasContext, that.data[that.parent.data.currentLevel].text, 25, 140, that.parent.data.canvas.width - 55, 25);
        that.parent.data.canvasContext.font = "20pt arial";
        that.parent.data.canvasContext.fillStyle = "rgba(255,255,255,1)";
        wrapText(that.parent.data.canvasContext, "Press anywhere to start the game", 20, 580, that.parent.data.canvas.width - 55, 25);
        that.parent.data.canvasContext.font = "10px sans-serif";


    }

    that.pointerUp = function(evt) { 
        that.mustLeave = true;
    }

    that.pointerDown = function () {

    }

    that.data = {
        1: {
            title: " Sputnik1 - general satellites (215 km / 133.6 miles)",
            text : "A satellite is an object that goes around, or orbits, a larger object, such as a planet. While there are natural satellites, like the moon, hundreds of man-made satellites also orbit the Earth.\n\nSatellites have 3 components: communication capabilities (to talk to Earth), a power source and a control system. They have large solar panels in order to benefit from the sun’s energy and recharge.\nHow are satellites launched? They are propelled into space by a rocket, but the tricky part is to find the right speed in order to start orbiting. The satellite is being pulled back to Earth by gravity and its inertia is what keeps it up. At a speed of 17000 mph, the forward momentum will balance gravity, and it will circle the Earth. On the other hand, if the satellite is launched faster than 23,500 mph, it will leave the gravitational pull of the Earth. \nBased on the orbits, we have 2 different kinds of satellites: the low orbi ones and the high altitude geostationary orbit ones. The low orbiting satellites are orbiting at a height between several hundred miles and several thousand miles from Earth, and they circle around Earth about 14 times per day. The high orbiting satellites are always above the same Earth point, and at a height of 22,237 miles above the Earth. From here, they can see half of Earth’s surface; this is called the satellite's footprint.\nThe first satellite to be launched was Sputnick 1, by the Soviet Union, in 1957. It marked the start of the space race in the Cold War. The Americans and the Soviets achieved great progress in the field of space exploration, culminating with Neil Armstrong’s landing on the Moon in 1969. Sputnik 1burned up on 4 January 1958, as it fell from orbit upon reentering Earth's atmosphere.\nIn this level, you will have to reach the altitude of Sputnick 1’s orbit with you rocket. Good luck!\n"
        },
        2: {
            title: "International Space Station (340 km / 211.3 miles)",
            text : "International Space Station is a habitable artificial satellite. It is located in Low Earth Orbit on altitude between  330 km (205 mi) and 435 km (270 mi) and it makes 15.7 orbits around the Earth every day.. It allows people to stay there and do research in biology, physics, astronomy and meteorology. It was launched in 1998 and is now maintained by American, Russian, European, Japanese and Canadian space agencies. ISS is now largest artificial body in the orbit, and can sometimes be seen by naked eye."
        },
        4: {
            title: "Polar orbiting satellites (700 - 1700 km)",
            text : "A polar orbiting satellite is one that passes over both poles of the object being orbited on each revolution. Only polar geosynchronous orbit satellites pass over the Equator at the same longitude in each orbit.\nThe main uses for these satellites are reconnaissance satellites and weather satellites. In most cases, the orbit is sun-synchronous, meaning that each successive orbital pass occurs at the same local time of day. In order for this to happen throughout the year, the satellite doesn’t pass directly over the poles, but has a slight inclination (8 degrees) and so it is subject to a torque which causes precession"
        },
        3: {
            title : "Hubble Space Telescope (559 km 369.7 miles)",
            text : "Hubble Space Telescope is a telescope that is orbiting the Earth. It was carried to orbit by Space shuttle in 1990. It has 2.4 meters in diameter and orbits on altitude of 559 km. Because it orbits outside of the Earths atmosphere images it makes are not distorted by it and do not have background light, so  they are much more detailed than images taken by telescopes on earth. Hubble can also take image of ultraviolet and infrared light that is not visible by humans. All repairs and improvements on Hubble are made by astronauts in space. Until now 4 missions were sent to the telescope."
        }
    }

    that.nextStep = function () {
        if (that.mustLeave) {
            return "game";
        }
        else {
            return -1;
        }
    }

    
}