/*
 * by Keiya Chinen
 *
 * */

// override
MUSIC.intervals = {
        'unison':           [0, 0],
        'minor second':     [3, -5],
        'major second':     [-1, 2],
        'minor third':      [2, -3],
        'major third':      [-2, 4],
        'fourth':           [1, -1],
        'augmented fourth': [-3, 6],
        'augmented fifth':  [-4, 8],
        'tritone':          [-3, 6],
        'diminished fifth': [4, -6],
        'fifth':            [0, 1],
        'minor sixth':      [3, -4],
        'major sixth':      [-1, 3],
        'minor seventh':    [2, -2],
        'major seventh':    [-2, 5],
        'octave':           [1, 0]
};

var chords = {
	'major triad' : ['unison','major third','fifth'],
	'minor triad' : ['unison','minor third','fifth'],
	'augumented triad' : ['unison','major third','augumented fifth'],
	'diminished triad' : ['unison','major third','diminished fifth'],
};

var notes = [
	[['C'],['A']],
	[['G'],['E']],
	[['D'],['B']],
	[['A'],['F#']],
	[['E'],['C#']],
	[['B'],['G#']],
	[['Gb','F#'],['Eb','D#']],
	[['Db'],['Bb']],
	[['Ab'],['F']],
	[['Eb'],['C']],
	[['Bb'],['G']],
	[['F'],['D']],
]


function triggerPenta(idx,scale) {
	var intervals = [];
	switch (scale) {
		case 'maj':
			var note = Note.fromLatin(notes[idx][0][0]+'4');
			intervals = chords['major triad'];
			break;
		case 'min':
			var note = Note.fromLatin(notes[idx][1][0]+'4');
			intervals = chords['minor triad'];
			break;
	}
	var chord = note.add(intervals);
	this.audioletApp = new AudioletAppChord(chord);
}

function init() {
    //Create a stage by getting a reference to the canvas
    var stage = new createjs.Stage("demoCanvas");
    //Create a Shape DisplayObject.
    //circle.graphics.beginStroke("black").drawCircle(0, 0, 300);
    //circle.graphics.beginStroke("black").arc(300,300,startAngle,startAngle+deg30).moveTo(300,300).closePath();
	var startAngle = -Math.PI/2;
	var deg30 = Math.PI*2/notes.length;
	//for (var idx in notes) {
	notes.forEach(function(elem,idx,notes){
    	arcMajText = new createjs.Text(elem[0][0],"20px Arial","#000033");
    	arcMinText = new createjs.Text(elem[1][0],"20px Arial","#003300");
		polar2cartesian(arcMajText,300,startAngle+deg30/2);
		polar2cartesian(arcMinText,200,startAngle+deg30/2);

    	arcMaj = new createjs.Shape();
		arcMaj.graphics.beginFill("rgba(128,128,255,1)").beginStroke("black").moveTo(300,300);
		arcMaj.graphics.arc(305,305,300,startAngle,startAngle+deg30).moveTo(305,305).closePath();

    	arcMin = new createjs.Shape();
		arcMin.graphics.beginFill("rgba(128,255,128,1)").beginStroke("black").moveTo(300,300);
		arcMin.graphics.arc(305,305,200,startAngle,startAngle+deg30).moveTo(305,305).closePath();
		startAngle += deg30;

		var maj = new Function("triggerPenta("+idx+",'maj');");
		var min = new Function("triggerPenta("+idx+",'min');");
		arcMaj.addEventListener("click",maj);
		arcMin.addEventListener("click",min);
    	stage.addChild(arcMaj);
    	stage.addChild(arcMin);
    	stage.addChild(arcMajText);
    	stage.addChild(arcMinText);
	});
    //Set position of Shape instance.
    //Add Shape instance to stage display list.
    //Update stage will render next frame
    stage.update();
}

function polar2cartesian(obj,r,theta) {
   var offset = {x:305,y:300};
   obj.x = r * Math.cos(theta) + offset.x;
   obj.y = r * Math.sin(theta) + offset.y;
   return obj;
}
