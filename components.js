var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function toggleMode() {
  if (!lightMode) {
    document.querySelector('#moon').setAttribute('style', 'display: inline');
    document.querySelector('#sun').setAttribute('style', 'display: none');
    document.body.style = "background-color: #1A3461; padding: 0px; margin: 0px;"
    document.querySelector('.game-body').classList.add('game-body-dark');
    let text = document.querySelectorAll('.head-number');
    for(let item in text) {
      try {
        text[item].classList.add('light-text');
      } catch (e) {

      }
    }

    let buttons = document.querySelectorAll('.action-button-text')
    for(let button in buttons) {
      try {
        buttons[button].classList.add('light-text');
      } catch (e) {
      }
    }

    let winResults = document.querySelectorAll('.win-result')
    console.log(winResults)
    for(let result in winResults) {
      try {
        winResults[result].classList.add('light-text');
      } catch (e) {
      }
    }
    lightMode = true;
  } else {
    document.querySelector('#moon').setAttribute('style', 'display: none');
    document.querySelector('#sun').setAttribute('style', 'display: inline');
    document.body.style = "background-color: #e1d8ac; padding: 0px; margin: 0px;"
    document.querySelector('.game-body').classList.remove('game-body-dark');
    let text = document.querySelectorAll('.head-number');
    for(let item in text) {
      try {
        text[item].classList.remove('light-text');
      } catch (e) {

      }
    }

    let buttons = document.querySelectorAll('.action-button-text')
    for(let button in buttons) {
      try {
        buttons[button].classList.remove('light-text');
      } catch (e) {
      }
    }
    let winResults = document.querySelectorAll('.win-result')
    for(let result in winResults) {
      try {
        winResults[result].classList.remove('light-text');
      } catch (e) {
      }
    }
    lightMode = false;
  }
}

function showGame(displayGame) {
  if (handInProgress) {
  } else {
    let games = document.querySelectorAll(".game")
    let gameButtons = document.querySelectorAll(".game-button")
    for (let game in games) {
      if (games[game].id == displayGame) {
        games[game].setAttribute("style", "display: inline");
        gameButtons[game].setAttribute("style", "opacity: 1;")
      }
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
  let winResult = document.querySelector('.win-result')
  winResult.setAttribute("style", "display: none");
}

function initializeGame() {
  showGame("game1");
  setBalance(balance)
  clearBoard();
  document.querySelector('#userTotal').innerHTML = "";
  toggleMode()
}

function clearCards() {
  dealerCardsBlackJack = []
  userCardsBlackJack = []
}

function setBalance(newBalance) {
  balance = newBalance;
  document.querySelector(".balance").innerHTML = (newBalance);
}

function updateBet(amount, userDouble) {
  if (handInProgress && !userDouble) {
  } else {
    if (currentBet + amount <= balance) {
      currentBet += amount;
    }
    else {
      currentBet = balance;
    }
    document.querySelector(".bet").innerHTML = (currentBet);
  }
}

function getDeck()
{
	let deck = new Array();
	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
      let v = values[x];
      if (v == "J" || v == "Q" || v == "K") {
        v = '10'
      }
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

function getCard() {
  return deck[Math.floor(Math.random() * (deck.length))];
}

function dealCardsBlackJack() {
  for (let i = 0; i < 4; i++) {
    if (i%2 == 0) {
      dealerCardsBlackJack.push(getCard());
    }
    else {
      userCardsBlackJack.push(getCard());
    }
  }
  displayCards(false)
  handInProgress = true;
}

function displayCards(showDealerHand) {
  document.querySelector('#dealerHand').innerHTML = "";
  document.querySelector('#userHand').innerHTML = "";
  if (showDealerHand) {
    for (let card in dealerCardsBlackJack) {
      let c = document.createElement('img');
      c.src = getCardSource(dealerCardsBlackJack[card].Face, dealerCardsBlackJack[card].Suit)
      c.classList.add('card');
      document.querySelector('#dealerHand').append(c)
    }
  }
  else {
    for (let card in dealerCardsBlackJack) {
      let c = document.createElement('img');
      if (card==0) {
        c.src = ('./assets/allcards_allcardsback.jpg');
      } else {
        c.src = getCardSource(dealerCardsBlackJack[card].Face, dealerCardsBlackJack[card].Suit)
      }
      c.classList.add('card');
      document.querySelector('#dealerHand').append(c)
    }
  }
  for (let card in userCardsBlackJack) {
    let c = document.createElement('img');
    c.classList.add('card');
    c.src = getCardSource(userCardsBlackJack[card].Face, userCardsBlackJack[card].Suit)
    document.querySelector('#userHand').append(c)
  }

  if (getMin(getUserTotal()) != getMax(getUserTotal()) && getMax(getUserTotal()) <= 21) {
    if (getMax(getUserTotal()) > 21) {
      document.querySelector('#userTotal').innerHTML = (`Total: ${getMin(getUserTotal())}`)
    } else {
      document.querySelector('#userTotal').innerHTML = (`Total: ${getMin(getUserTotal())}/${getMax(getUserTotal())}`)
    }
  } else {
    document.querySelector('#userTotal').innerHTML = (`Total: ${getMin(getUserTotal())}`)
  }

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

function getCardSource(face, suit) {
  return `./assets/cards_${face}${suit}.jpg`;
}

function getUserTotal() {
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

function getDealerTotal() {
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

function userBust() {
  return (getMin(getUserTotal()) > 21);
}

function playBlackJack() {
  clearBoard()
  handInProgress = true;
  dealCardsBlackJack()
}

function userHit() {
  userTurnNum++;
  if (handInProgress) {
    userCardsBlackJack.push(getCard());
    displayCards(false)
    if (userBust()) {
      handleWinner()
    }
    if (getMax(getUserTotal()) == 21 || getMin(getUserTotal()) == 21) {
      blackJackDealerPlay();
    }
  }
}

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

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function blackJackDealerPlay() {
  if (getMin(getDealerTotal()) != getMax(getDealerTotal()) && getMax(getDealerTotal()) <= 21) {
    document.querySelector('#dealerTotal').innerHTML = (`Total: ${getMin(getDealerTotal())}/${getMax(getDealerTotal())}`)
  } else {
    document.querySelector('#dealerTotal').innerHTML = (`Total: ${getMin(getDealerTotal())}`)
  }
  displayCards(true);
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

function handleWinner() {
  let winResult = document.querySelector('.win-result')
  if (getMin(getUserTotal()) > 21) {
    setBalance(balance - currentBet);
    winResult.innerHTML = "YOU LOSE"
  if (getMax(getDealerTotal() > 21)) {
    winResult.innerHTML = "YOU WIN"
    setBalance(balance + currentBet);
  }
  } else if (getMax(getDealerTotal()) == getMax(getUserTotal())) {
    winResult.innerHTML = "PUSH"
  } else if (getMin(getDealerTotal()) > 21 || getMax(getUserTotal()) > getMax(getDealerTotal())) {
    winResult.innerHTML = "YOU WIN"
    setBalance(balance + currentBet);
  } else {
    setBalance(balance - currentBet);
    winResult.innerHTML = "YOU LOSE"
  }
  winResult.setAttribute("style", "display: inline");
  handInProgress = false;
  displayCards(true);
}

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

function clearBet() {
  currentBet = 0;
  document.querySelector(".bet").innerHTML = (currentBet);
}

function getMin(array) {
  currentMin = array[0]
  for (item in array) {
    if (array[item] < currentMin) {
      currentMin = array[item];
    }
  }
  return currentMin;
}

function getMax(array) {
  currentMax = array[0]
  for (item in array) {
    if (array[item] > currentMax) {
      currentMax = array[item];
    }
  }
  return currentMax;
}

function playWar() {
  document.querySelector('#userHandWar').innerHTML = "";
  document.querySelector('#dealerHandWar').innerHTML = "";
  document.querySelector('#play-war').setAttribute('style', 'display: none;')
  dealerCardsWar[0] = (getCard());
  userCardsWar[0] = (getCard());

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
  // clearBoardWar()
  document.querySelector('#play-war').setAttribute('style', 'display: block;')
}

function handleWinnerWar() {
  document.querySelector('.win-result').setAttribute('style', 'display: block;');
  if (dealerCardsWar[0].value > userCardsWar[0].value) {
    document.querySelector('.win-result').innerHTML = "YOU WIN!"
    setBalance(balance+currentBet);
  } else if (dealerCardsWar[0].value < userCardsWar[0].value) {
    document.querySelector('.win-result').innerHTML = "YOU LOSE"
    setBalance(balance-currentBet);
  } else {
    document.querySelector('.win-result').innerHTML = "TIE"
  }
}

function clearBoardWar() {

}
