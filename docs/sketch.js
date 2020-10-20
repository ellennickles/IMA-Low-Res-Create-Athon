let spinButton;
let data, resourceData;

let inputSection;

let inputWheel, outputWheel;

let inputs = [];
let outputs = [];

let currentOutput, currentInput; 

// number of items in slot machine window
// an odd number is recommended for a clear midpoint
let itemsInSlotWindow = 5;

// we will be using position of element to move things
let slotWindowStartPos;
let distBetweenItemsInWindow;

let clickSound, endSound, gameShow;

let isSpinning = false;
let resourcesAvailable = false;

function preload() {
  data = loadJSON('data/generator.json');

  //sounds are public domain
  clickSound = loadSound('sound/faded_sine.mp3');
  endSound = loadSound('sound/Electronic_Chime-KevanGC-495939803.mp3');
  gameShow = loadSound('sound/gameshow_short.mp3');
}

function setup() {
  frameRate(60);
 
  clickSound.setVolume(0.4);
  gameShow.setVolume(0.5);

  inputWheel = new Wheel(
    '#inputs',
    data.input,
    itemsInSlotWindow,
    floor(data.input.length + random(data.input.length))
  );
  outputWheel = new Wheel(
    '#outputs',
    data.output,
    itemsInSlotWindow,
    floor(data.output.length + random(data.output.length))
  );

  let params = getURLParams();
  console.log(params);

  startSpin(
    null,
    (params.input)?params.topic:floor(random(data.input.length)),
    (params.output)?params.output:floor(random(data.output.length)),
  );

  spinButton = select('button');
  spinButton.mouseClicked(startSpin);
}

function draw() {
  if (inputWheel.spin) {
    inputWheel.move();
  }
  if (outputWheel.spin) {
    outputWheel.move();
  }

  if(isSpinning){
    // select('#permalink').hide();

    if(inputWheel.difference == 0 && outputWheel.difference == 0){
      endSound.play();
      setTimeout(() => {  gameShow.play(); }, 300);
      
      // select('#permalink').show();
      isSpinning = false;
    }
  }

}

function startSpin(
  clickEvent,
  targetInput = floor(random(data.input.length)),
  targetOutput = floor(random(data.output.length)),
) {

  isSpinning = true;

  inputWheel.target = targetInput;
  inputWheel.spin = true;
  inputWheel.resetAriaHidden();

  outputWheel.target = targetOutput;
  outputWheel.spin = true;
  outputWheel.resetAriaHidden();

  // let permalink = `?input=${targetInput}&output=${targetOutput}`;
  // console.log(permalink);

  // select('#permalink').attribute('href', permalink);

  console.log(
    'make a something where the input is ' +
      data.input[targetInput] +
      ' and an output is ' +
      data.output[targetOutput]
  );
}
