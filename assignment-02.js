/*
document.addEventListener('DOMContentLoaded', (event) => {
    const topLeft = document.querySelector(".one");
    const topRight = document.querySelector(".two");
    const bottomLeft = document.querySelector(".four");
    const bottomRight = document.querySelector(".three");

    const getRandomPanel = () => {
        const panels = [topLeft, topRight, bottomLeft, bottomRight];
        return panels[parseInt(Math.random() * panels.length)];
    };

    const flash = (panel) => {
        return new Promise((resolve) => {
            panel.classList.add('active');
            setTimeout(() => {
                panel.classList.remove('active');
                resolve();
            }, 500);
        });
    };

    const main = async () => {
        const sequence = [
            getRandomPanel(),
            getRandomPanel(),
            getRandomPanel(),
            getRandomPanel()
        ];

        for (const panel of sequence) {
            await flash(panel);
        }

        // Now, we will remove the 'active' class from all buttons to revert to original color
        const allPanels = [topLeft, topRight, bottomLeft, bottomRight];
        allPanels.forEach(panel => panel.classList.remove('active'));
    };

    main();
});
*/


//When the start button is pressed the following code runs
function startGame() {
    //Gets the red button from html
    const startCircle = document.getElementById('light');
    //Ensures when game is started or restarted the sign to start is red
    startCircle.style.backgroundColor = "red";
    //unsures player cannot press anything during sequence 
    canClick = false;
    clearTimeout(responseTimeout);
  
    // Reset the sequence back to 0 colors pattern and adds one color to the pattern and changes score to 0 while ensuring user cant click
    sequence.length = 0; // Clear the sequence array
    sequence.push(getRandomPanel()); // Start with a new random panel
    sequenceToGuess = [...sequence]; // Reset the sequence to guess
    currentScore = 0; // Reset the current score
    document.querySelector(".score").textContent = '00'; // Reset the score to display 00 again
    canClick = false; // Prevent clicking during the setup
  
    //wait for the game to start after pressing start
    setTimeout(function() {
      startCircle.style.backgroundColor = "green"; // changes color to green to show game start
      startFlashing(); // start flashing the sequence when the game starts shown by green button
    }, 3000); //wait 3 seconds e.g. 3000ms
  }
  
  //show the sequence then allow the user to click the buttons
  let responseTimeout;
  
  const startFlashing = async () => {
    canClick = false;
    for (const panel of sequence) {
      await flash(panel);
    }
    canClick = true;
  
    // Set a timeout for player response
    clearTimeout(responseTimeout); // Clear any previous timeout
    responseTimeout = setTimeout(() => {
      flashAllButtons().then(() => {
        alert('Too slow! Game over!');
      });
    startGame();
  }, 5000); // 5 seconds to respond
  };
  
  
  
  const flashAllButtons = () => {
    return new Promise((resolve) => {
      let count = 0;
      const interval = setInterval(() => {
        greenButton.classList.toggle('active');
        redButton.classList.toggle('active');
        blueButton.classList.toggle('active');
        yellowButton.classList.toggle('active');
  
        count++;
        if (count === 10) {
          clearInterval(interval);
          resolve();
        }
      }, 250);
    });
  };
  
  
  
  
  
  const greenButton = document.querySelector('.one'); // gets the green button in a variable
  const redButton = document.querySelector('.two'); // gets the red button in a variable
  const blueButton = document.querySelector('.three'); // gets the blue button in a variable
  const yellowButton = document.querySelector('.four'); // gets the yellow button in a variable
  
  
  
  //gets all the 4 colored panels and picks a random one
  const getRandomPanel = () => { 
    const panels = [
      greenButton,
      redButton,
      blueButton,
      yellowButton
    ];
    return panels[parseInt(Math.random()* panels.length)];
  }
  //forms the sequence with a random panel
  const sequence = [
    getRandomPanel()
  ];
  
  //ensures user guesses the exact sequence which was randomly made
  let sequenceToGuess = [...sequence];
  
  //Changes flashing speed depending on score of user
  const flash = panel => {
    let flashDuration = 1000; // Default flash duration
  
    // Adjust flash duration based on currentScore
    if (currentScore <= 5) {
      flashDuration = 750;
    } else if (currentScore <= 9) {
      flashDuration = 500;
    } else if (currentScore <= 13) {
      flashDuration = 250;
    }
  
    return new Promise((resolve, reject) => { //creates a promise that if the user successfully does the sequence it creates a new promise however if not a error occurs
      panel.classList.add('active'); //flashes colour
      setTimeout(() => { 
        panel.classList.remove('active'); // unflash colour
        setTimeout(() => {
          resolve();
        }, 250);
      }, flashDuration); //depending on current score, its sets the delay between sequence
    });
  };
  
  
  
  let canClick = false; // ensures user cant click
  let currentScore = 0; // creates the currentscore
  let highScore = currentScore; // set the highScore equal to currentscore
  
  const panelClicked = panelClicked => {
    if (!canClick) return; // Ensures user can't click if not allowed
  
    const expectedPanel = sequenceToGuess.shift(); // Removes panel from sequence if guessed
    if (expectedPanel === panelClicked) { // If the guess matches
      if (sequenceToGuess.length === 0) { // If the sequence length = 0, wins round
        sequence.push(getRandomPanel()); // Add new panel to sequence
        sequenceToGuess = [...sequence]; // Changes the new sequence to guess
        currentScore++; // Increment the score
        if (highScore < currentScore) {
          highScore = currentScore; // Updates the high score
        }
        document.querySelector(".score").textContent = currentScore.toString(); // Update the score display
        document.querySelector(".highscore").textContent = highScore.toString(); // Update the high score display
        clearTimeout(responseTimeout); // Clear the "Too slow" timeout
        startFlashing(); // Start flashing the new sequence including the new panel
      }
    } else {
      clearTimeout(responseTimeout); // IMPORTANT: Clear the "Too slow" timeout upon wrong answer
      flashAllButtons().then(() => {
        // Optionally, you might want to delay showing the alert and restarting to let the flash finish
        setTimeout(() => {
          alert('Game over!'); // Show game over alert
          startGame(); // Restart the game
        }, 1000); // Delay to ensure the flashAllButtons animation can be seen
      });
    }
  };
  
  
  