Title: Dexter & Gwen Casino
Author: Dexter Renick, Gwen Egan
Version: 12/3/21

Overview:
Welcome to Dexter and Gwen’s casino! Our project’s purpose is to entertain the user and
take some stress off. In our project the user can play Blackjack and War and place bets
before each hand using the chip icons. Users are not allowed to change games or make additional bets if a hand has started.
The user can also see their current bet and the balance they have left.
There is a splash screen when the website is initially opened. There is also background music that
can be played using the player in the top left corner. It does not autoplay due to browser compatibility.
Click on the sun/moon to see dark/light mode. There are also sound effects on hand dealt, bet made,
win, loss, and push. Have fun!

Files & Directories:
assets - all images and sound used in the project
style.css - our styling sheet
index.html - html for the website, single page, so all html is there
components.js - all javascript functions 
readme.txt - explanation of project

Functions:
toggleMode() - Allows users to toggle between dark and light mode
showGame() - Allows user to toggle between blackjack and war handling if a hand is in progress and change selected game
initializeGame() - Start the website on game 1 (blackjack) with balance of 1000 and no cards on the board
clearCards() - Clear cards after a hand
setBalance(newBalance) - PARAM: newBalance - what the updated balance will be - Allows for balance to be updated, used in win an loss
updateBet(amount, userDouble) - PARAM: amount - amount to be added to current bet, userDouble - if in a game of blackjack, did the user want to double - Updates the current bet and handles if they have the money to do so/if the bet is a double
getDeck() - Creates the deck of cards from the initial array
getCard() - Pick random card in deck of 52
dealCardsBlackJack() - Deals cards in blackjack by giving user and dealer cards
displayCards(showDealerHand) - PARAM: showDealerHand - defines if dealers initial card should be shown (true) or not (false) - Updates cards to what is in hand to display image and display card totals
getCardSource(face, suit) - PARAM: face - card face, suit - suit of card - gets the file path of card with given face suit
getUserTotal() - Gets the user total cards in an array because they could have two values if there is an ace
getDealerTotal() - Gets the dealer total cards in an array because they could have two values if there is an ace
userBust() - Check if users lowest amount of cards is over 21, if yes, they busted
playBlackJack() - Starts the blackjack game by clearing the board and setting hand to in progress and dealing hands
userHit() - Adds to user cards, checks if they busted, if so, they lose
userDouble() - If user has enough money to double, doubles their bets, adds to their card, and ends turn
sleep(delay) - PARAM: delay - time in milliseconds to pause for - Adds pause for given delay time in milliseconds
blackJackDealerPlay() - Dealer play in blackjack where they hit until they have 17, bust, or more than user total
handleWinner() - Set appropriate win, loss, or push and play appropriate sound effect
clearBoard() - Reset the game, reset cards, reset win result, reset turn number
clearBet() - Clears user bet to 0
getMin() - get smallest item in array
getMax() - get largest item in array
playWar() - Handles almost all game functionality, deals cards, plays sounds, calls handleWinner()
handleWinnerWar() - Handles winner of game war and displays appropriate text
fadeOutEffect() - Splash screen function that hides opening banner when user clicks
