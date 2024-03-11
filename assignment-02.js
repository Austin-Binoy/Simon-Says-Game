/*

FIRST CODE OF JAVASFRIPT THAT WASN'T WORKING


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

        const allPanels = [topLeft, topRight, bottomLeft, bottomRight];
        allPanels.forEach(panel => panel.classList.remove('active'));
    };

    main();
});
*/


function startGame() {
    const startCircle = document.getElementById('light');
    startCircle.style.backgroundColor = "red";
    canClick = false;
    clearTimeout(responseTimeout);
  
    sequence.length = 0; 
    sequence.push(getRandomPanel()); 
    sequenceToGuess = [...sequence]; 
    currentScore = 0; 
    document.querySelector(".score").textContent = '00'; // Reset the score to display 00 again
    canClick = false; 
  
    setTimeout(function() {
      startCircle.style.backgroundColor = "green"; // changes color to green to show game start
      startFlashing();
    }, 3000); //wait 3 seconds
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
  
  
  
  
  
  const greenButton = document.querySelector('.one'); 
  const redButton = document.querySelector('.two'); 
  const blueButton = document.querySelector('.three'); 
  const yellowButton = document.querySelector('.four'); 
  
  
  
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
  
  let sequenceToGuess = [...sequence];
  
  const flash = panel => {
    let flashDuration = 1000; // Default flash duration
  
    if (currentScore <= 5) {
      flashDuration = 750;
    } else if (currentScore <= 9) {
      flashDuration = 500;
    } else if (currentScore <= 13) {
      flashDuration = 250;
    }
  
    return new Promise((resolve, reject) => {
      panel.classList.add('active'); //flashes colour
      setTimeout(() => { 
        panel.classList.remove('active'); // unflash colour
        setTimeout(() => {
          resolve();
        }, 250);
      }, flashDuration);
    });
  };
  
  
  
  let canClick = false; // ensures user cant click
  let currentScore = 0; 
  let highScore = currentScore; 
  
  const panelClicked = panelClicked => {
    if (!canClick) return; 
  
    const expectedPanel = sequenceToGuess.shift(); 
    if (expectedPanel === panelClicked) { 
      if (sequenceToGuess.length === 0) { 
        sequence.push(getRandomPanel()); 
        sequenceToGuess = [...sequence]; 
        currentScore++; // Increment the score
        if (highScore < currentScore) {
          highScore = currentScore; // Updates the high score
        }
        document.querySelector(".score").textContent = currentScore.toString(); // Update the score display
        document.querySelector(".highscore").textContent = highScore.toString(); // Update the high score display
        clearTimeout(responseTimeout);
        startFlashing(); // Start flashing the new sequence including the new panel
      }
    } else {
      clearTimeout(responseTimeout); 
      flashAllButtons().then(() => {
        setTimeout(() => {
          alert('Game over!');
          startGame();
        }, 1000); 
      });
    }
  };
  
  
  


//https://youtu.be/n_ec3eowFLQ?si=7FGRCORWugzpaA2G