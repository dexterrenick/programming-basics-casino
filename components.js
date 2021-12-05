// Arrays used to create dec of cards
var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// Allows users to toggle between dark and light mode
function toggleMode() {
  if (!lightMode) {
    document.querySelector('#moon').setAttribute('style', 'display: inline');
    document.querySelector('#sun').setAttribute('style', 'display: none');
    // Only element that isn't "toggled", but is a hard coded switch
    document.body.style = "background-color: #1A3461; padding: 0px; margin: 0px;"
    // Able to toggle between dark and light by adding/removing class attribute
    document.querySelector('.game-body').classList.add('game-body-dark');
    let text = document.querySelectorAll('.head-number');
    // Able to toggle between dark and light by adding/removing class attribute
    for(let item in text) {
      try {
        text[item].classList.add('light-text');
      } catch (e) {

      }
    }

    let buttons = document.querySelectorAll('.action-button-text')
    // Able to toggle between dark and light by adding/removing class attribute
    for(let button in buttons) {
      try {
        buttons[button].classList.add('light-text');
      } catch (e) {
      }
    }

    let winResults = document.querySelectorAll('.win-result')
    // Able to toggle between dark and light by adding/removing class attribute
    for(let result in winResults) {
      try {
        winResults[result].classList.add('light-text');
      } catch (e) {
      }
    }
    // Able to toggle between dark and light by adding/removing class attribute
    try {
      document.querySelector('#play-war').classList.add('light-text');
    } catch (e) {
    }
    // All error statements because some additional element was being included in the querySelectorAll statement, but functions fully by adding catch
    // Sets light and dark mode so on next switch will jump properly
    lightMode = true;
  } else {
    document.querySelector('#moon').setAttribute('style', 'display: none');
    document.querySelector('#sun').setAttribute('style', 'display: inline');
    // Only element that isn't "toggled", but is a hard coded switch
    document.body.style = "background-color: #e1d8ac; padding: 0px; margin: 0px;"
    // Able to toggle between dark and light by adding/removing class attribute
    document.querySelector('.game-body').classList.remove('game-body-dark');
    let text = document.querySelectorAll('.head-number');
    // Able to toggle between dark and light by adding/removing class attribute
    for(let item in text) {
      try {
        text[item].classList.remove('light-text');
      } catch (e) {

      }
    }

    let buttons = document.querySelectorAll('.action-button-text')
    // Able to toggle between dark and light by adding/removing class attribute
    for(let button in buttons) {
      try {
        buttons[button].classList.remove('light-text');
      } catch (e) {
      }
    }
    let winResults = document.querySelectorAll('.win-result')
    // Able to toggle between dark and light by adding/removing class attribute
    for(let result in winResults) {
      try {
        winResults[result].classList.remove('light-text');
      } catch (e) {
      }
    }
    // Able to toggle between dark and light by adding/removing class attribute
    try {
      document.querySelector('#play-war').classList.remove('light-text');
    } catch (e) {
    }
    // Sets light and dark mode so on next switch will jump properly
    lightMode = false;
  }
}

// Allows user to toggle between blackjack and war handling if a hand is in progress and change selected game
function showGame(displayGame) {
  // If a hand is in progress, they shouldn't be able to switch games
  if (handInProgress) {
  } else {
    let games = document.querySelectorAll(".game")
    let gameButtons = document.querySelectorAll(".game-button")
    // Make it clear which game is selected by setting opacity to 1 of open game
    for (let game in games) {
      if (games[game].id == displayGame) {
        games[game].setAttribute("style", "display: inline");
        gameButtons[game].setAttribute("style", "opacity: 1;")
      }
      // Make it clear which game is selected by setting opacity to .6 of non open game
      else {
        try {
          games[game].setAttribute("style", "display: none");
          gameButtons[game].setAttribute("style", "opacity: .6;")
        }
        catch {
        }
      }
    }
  }
  // Hide win result of previous game
  let winResult = document.querySelector('.win-result')
  winResult.setAttribute("style", "display: none");
}

// Start the website on game 1 (blackjack) with balance of 1000 and no cards on the board
function initializeGame() {
  showGame("game1");
  setBalance(balance)
  clearBoard();
  document.querySelector('#userTotal').innerHTML = "";
  toggleMode()
}

// Clear cards after a hand
function clearCards() {
  dealerCardsBlackJack = []
  userCardsBlackJack = []
}

// Allows for balance to be updated, used in win an loss
function setBalance(newBalance) {
  balance = newBalance;
  document.querySelector(".balance").innerHTML = (newBalance);
}

// Updates the current bet and handles if they have the money to do so/if the bet is a double
function updateBet(amount, userDouble) {
  // Can't bet in middle of hand
  if (handInProgress && !userDouble) {
  } else {
    if (currentBet + amount <= balance) {
      // Play betting sound
      var sound = new Audio('./assets/chips.mp3');
      sound.loop = false;
      sound.play();
      currentBet += amount;
    }
    else {
      currentBet = balance;
    }
    document.querySelector(".bet").innerHTML = (currentBet);
  }
}

// Creates the deck of cards from the initial array
function getDeck() {
  // Simple for loops to compile the deck into an object with values, suits, value
	let deck = new Array();
	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
      let v = values[x];
      if (v == "J" || v == "Q" || v == "K") {
        v = '10'
      }
      // Special case for ace having value of 11 in balckjack
      if (v == "A") {
        v = '11'
      }
      v = parseInt(v);
			let card = {Face: values[x], Suit: suits[i], value: v};
			deck.push(card);
		}
	}
	return deck;
}

// Pick random card in deck of 52
function getCard() {
  return deck[Math.floor(Math.random() * (deck.length))];
}

// Deals cards in blackjack by giving user and dealer cards
function dealCardsBlackJack() {
  // Plays deal sound
  var sound = new Audio('./assets/deal.mp3');
  sound.loop = false;
  sound.play();
  for (let i = 0; i < 4; i++) {
    // mod 2 so it goes back and forth from user to dealer getting a card
    if (i%2 == 0) {
      dealerCardsBlackJack.push(getCard());
    }
    else {
      userCardsBlackJack.push(getCard());
    }
  }
  // displayCards is false so you can't see one of the dealers cards
  displayCards(false)
  // set to true so you can no longer make bets or switch between games
  handInProgress = true;
}

// Updates cards to what is in hand to display image and display card totals
function displayCards(showDealerHand) {
  // Initially set to nothing so it doesn't add to cards that are already on table
  document.querySelector('#dealerHand').innerHTML = "";
  document.querySelector('#userHand').innerHTML = "";
  // Gets dealer cards from array and adds appropriate image if all cards should be shown
  if (showDealerHand) {
    for (let card in dealerCardsBlackJack) {
      let c = document.createElement('img');
      c.src = getCardSource(dealerCardsBlackJack[card].Face, dealerCardsBlackJack[card].Suit)
      c.classList.add('card');
      document.querySelector('#dealerHand').append(c)
    }
  }
  // Gets dealer cards from array and adds appropriate image if all but initial card should be shown
  else {
    for (let card in dealerCardsBlackJack) {
      let c = document.createElement('img');
      // card 0 being their first card which should be face down in this case
      if (card==0) {
        c.src = ('./assets/allcards_allcardsback.jpg');
      } else {
        c.src = getCardSource(dealerCardsBlackJack[card].Face, dealerCardsBlackJack[card].Suit)
      }
      c.classList.add('card');
      document.querySelector('#dealerHand').append(c)
    }
  }
  // Gets user cards from array and adds appropriate image if all cards should be shown, don't need special case because always should be shown
  for (let card in userCardsBlackJack) {
    let c = document.createElement('img');
    c.classList.add('card');
    c.src = getCardSource(userCardsBlackJack[card].Face, userCardsBlackJack[card].Suit)
    document.querySelector('#userHand').append(c)
  }

  // Setting user total appjropriately, so if it is over 21 with an ace, then we show the min, if under 21 with max, then we show both
  if (getMin(getUserTotal()) != getMax(getUserTotal()) && getMax(getUserTotal()) <= 21) {
    if (getMax(getUserTotal()) > 21) {
      document.querySelector('#userTotal').innerHTML = (`Total: ${getMin(getUserTotal())}`)
    } else {
      document.querySelector('#userTotal').innerHTML = (`Total: ${getMin(getUserTotal())}/${getMax(getUserTotal())}`)
    }
  } else {
    document.querySelector('#userTotal').innerHTML = (`Total: ${getMin(getUserTotal())}`)
  }

  // Display appropriate buttons
  // IF hand is in progress, and first turn, allow user to hit, stay, or double
  if (handInProgress) {
    document.querySelector('#play-button').setAttribute('style', 'display: none;');
    document.querySelector('#hit-button').setAttribute('style', 'display: flex;');
    document.querySelector('#stay-button').setAttribute('style', 'display: flex;');
    if (userTurnNum < 2) {
      document.querySelector('#user-double').setAttribute('style', 'display: flex;');
    } else {
      document.querySelector('#user-double').setAttribute('style', 'display: none;');
    }
  } else {
    document.querySelector('#play-button').setAttribute('style', 'display: flex;');
    document.querySelector('#hit-button').setAttribute('style', 'display: none;');
    document.querySelector('#stay-button').setAttribute('style', 'display: none;');
    document.querySelector('#user-double').setAttribute('style', 'display: none;');
  }
}

// gets the file path of card with given face suit
function getCardSource(face, suit) {
  return `./assets/cards_${face}${suit}.jpg`;
}

// Gets the user total cards in an array because they could have two values if there is an ace
function getUserTotal() {
  // array becuase if they have an ace, two different values, this is handled with min/max when checking cards
  let userTotal = [];
  let total = 0;
  let hasA = false;
  for (let card in userCardsBlackJack) {
    if (userCardsBlackJack[card].Face == 'A') {
      hasA = true;
    }
    else {
      total += userCardsBlackJack[card].value;
    }
  }
  if (hasA) {
    userTotal.push(total+1)
    userTotal.push(total+11)
  }
  else {
    userTotal.push(total);
  }
  return userTotal;
}

function userBust() {
  return (getMin(getUserTotal()) > 21);
}

// Gets the dealer total cards in an array because they could have two values if there is an ace
function getDealerTotal() {
  // array becuase if they have an ace, two different values, this is handled with min/max when checking cards
  let dealerTotal = [];
  let total = 0;
  let hasA = false;
  for (let card in dealerCardsBlackJack) {
    if (dealerCardsBlackJack[card].Face == 'A') {
      hasA = true;
    } else {
      total += dealerCardsBlackJack[card].value;
    }
  }
  if (hasA) {
    dealerTotal.push(total+1)
    dealerTotal.push(total+11)
  } else {
    dealerTotal.push(total);
  }
  return dealerTotal;
}

// Check if users lowest amount of cards is over 21, if yes, they busted
function userBust() {
  return (getMin(getUserTotal()) > 21);
}

// Starts the blackjack game by clearing the board and setting hand to in progress and dealing hands
function playBlackJack() {
  clearBoard()
  handInProgress = true;
  dealCardsBlackJack()
}

// Adds to user cards, checks if they busted, if so, they lose
function userHit() {
  userTurnNum++;
  if (handInProgress) {
    userCardsBlackJack.push(getCard());
    displayCards(false)
    if (userBust()) {
      handleWinner()
    }
    // If they hit 21, their turn is automatically done
    if (getMax(getUserTotal()) == 21 || getMin(getUserTotal()) == 21) {
      blackJackDealerPlay();
    }
  }
}

// If user has enough money to double, doubles their bets, adds to their card, and ends turn
function userDouble() {
  if (handInProgress) {
    if (currentBet * 2 <= balance) {
      updateBet(currentBet, true);
      userHit();
      blackJackDealerPlay();
    } else {
      // TODO add something that says something like inssuficient funds
    }
  }
}

// Adds pause for given delay time in milliseconds
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

// Dealer play in blackjack where they hit until they have 17, bust, or more than user total
function blackJackDealerPlay() {
  // If they don't have 21 and have an ace
  if (getMin(getDealerTotal()) != getMax(getDealerTotal())) {
    if (getMax(getDealerTotal()) > 21) {
      document.querySelector('#dealerTotal').innerHTML = (`Total: ${getMin(getDealerTotal())}`);
    }
    else {
      document.querySelector('#dealerTotal').innerHTML = (`Total: ${getMin(getDealerTotal())}/${getMax(getDealerTotal())}`);
    }
  }
  // If they have an ace show both possible totals
  else {
    document.querySelector('#dealerTotal').innerHTML = (`Total: ${getMin(getDealerTotal())}`)
  }
  // Show dealer cards, user turn is up, so display all dealer cards
  displayCards(true);
  // Play until they have 17, bust, or more than user total
  if (handInProgress) {
    while (getDealerTotal() < 17 && getDealerTotal() <= 21) {
      sleep(500);
      dealerCardsBlackJack.push(getCard());
      if (getMin(getDealerTotal()) != getMax(getDealerTotal()) && getMax(getDealerTotal()) <= 21) {
        document.querySelector('#dealerTotal').innerHTML = (`Total: ${getMin(getDealerTotal())}/${getMax(getDealerTotal())}`)
      } else {
        document.querySelector('#dealerTotal').innerHTML = (`Total: ${getMin(getDealerTotal())}`)
      }
      displayCards(true);
    }
    handleWinner()
  }
}

// Set appropriate win, loss, or push and play appropriate sound effect
function handleWinner() {
  // Win loss sounds to play
  var winSound = new Audio('./assets/win.mp3');
  winSound.loop = false;
  var loseSound = new Audio('./assets/lose.mp3');
  loseSound.loop = false;
  let winResult = document.querySelector('.win-result')
  let dealerTotal = 0;
  if (getMax(getDealerTotal()) <= 21) {
    dealerTotal = getMax(getDealerTotal())
  } else {
    dealerTotal = getMin(getDealerTotal())
  }
  // If statements to handle who won
  if (getMin(getUserTotal()) > 21) {
    setBalance(balance - currentBet);
    winResult.innerHTML = "YOU LOSE"
    loseSound.play();
  }
  else if (getMin(getDealerTotal()) > 21) {
    winResult.innerHTML = "YOU WIN"
    setBalance(balance + currentBet);
    winSound.play();
  }
   else if (getMax(getDealerTotal()) == getMax(getUserTotal())) {
    winResult.innerHTML = "PUSH"
    winSound.play();
  } else if (getMax(getUserTotal()) <= 21 && getMax(getUserTotal()) > dealerTotal) {
    winResult.innerHTML = "YOU WIN"
    setBalance(balance + currentBet);
    winSound.play();
  } else if (getMin(getUserTotal()) <= 21 && getMin(getUserTotal()) > dealerTotal) {
    winResult.innerHTML = "YOU WIN"
    setBalance(balance + currentBet);
    winSound.play();
  }
   else {
    setBalance(balance - currentBet);
    winResult.innerHTML = "YOU LOSE"
    loseSound.play();
  }
  // Make win result visible
  winResult.setAttribute("style", "display: inline");
  handInProgress = false;
  displayCards(true);
}

// Reset the game, reset cards, reset win result, reset turn number
function clearBoard() {
  dealerCardsBlackJack = [];
  userCardsBlackJack = [];
  displayCards(false)
  let playButton = document.querySelector('#play-button');
  playButton.setAttribute('style', 'display: inline;')
  let winResult = document.querySelector('.win-result')
  winResult.setAttribute("style", "display: none");
  handInProgress = false;
  document.querySelector('#userHand').innerHTML = "";
  document.querySelector('#dealerHand').innerHTML = "";
  document.querySelector('#dealerTotal').innerHTML = "";
  userTurnNum = 1;
}

// Clears user bet to 0
function clearBet() {
  currentBet = 0;
  document.querySelector(".bet").innerHTML = (currentBet);
}

// get smallest item in array
function getMin(array) {
  currentMin = array[0]
  for (item in array) {
    if (array[item] < currentMin) {
      currentMin = array[item];
    }
  }
  return currentMin;
}

// get largest item in array
function getMax(array) {
  currentMax = array[0]
  for (item in array) {
    if (array[item] > currentMax) {
      currentMax = array[item];
    }
  }
  return currentMax;
}

// Handles almost all game functionality, deals cards, plays sounds, calls handlewinner
function playWar() {
  // Deal sound
  var sound = new Audio('./assets/deal.mp3');
  sound.loop = false;
  sound.play();
  // Resets their hands so cards aren't added on top of what is already there
  document.querySelector('#userHandWar').innerHTML = "";
  document.querySelector('#dealerHandWar').innerHTML = "";
  document.querySelector('#play-war').setAttribute('style', 'display: none;')
  // Deal cards
  dealerCardsWar[0] = (getCard());
  userCardsWar[0] = (getCard());

  // Add images for their cards
  let c = document.createElement('img');
  c.src = getCardSource(dealerCardsWar[0].Face, dealerCardsWar[0].Suit)
  c.classList.add('card-war');
  let dealerHand = document.querySelector('#dealerHandWar')
  dealerHand.append(c)

  let c2 = document.createElement('img');
  c2.src = getCardSource(userCardsWar[0].Face, userCardsWar[0].Suit)
  c2.classList.add('card-war');
  document.querySelector('#userHandWar').append(c2);
  handleWinnerWar();
  document.querySelector('#play-war').setAttribute('style', 'display: block;')
}

// Handles winner of game war and displays appropriate text
function handleWinnerWar() {
  var winSound = new Audio('./assets/win.mp3');
  winSound.loop = false;
  var loseSound = new Audio('./assets/lose.mp3');
  loseSound.loop = false;
  document.querySelector('.win-result').setAttribute('style', 'display: block;');
  // Conditionals to handle who won and add to their balance
  if (dealerCardsWar[0].value > userCardsWar[0].value) {
    document.querySelector('.win-result').innerHTML = "YOU LOSE"
    setBalance(balance-currentBet);
    loseSound.play();
  } else if (dealerCardsWar[0].value < userCardsWar[0].value) {
    document.querySelector('.win-result').innerHTML = "YOU WIN!"
    setBalance(balance+currentBet);
    winSound.play();
  } else {
    document.querySelector('.win-result').innerHTML = "PUSH"
    winSound.play();
  }
}

// Splash screen function that hides opening banner when user clicks
function fadeOutEffect() {
    document.getElementById("splashscreen").setAttribute('style', 'display: none')
}
