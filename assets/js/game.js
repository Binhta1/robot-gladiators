var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack,playerHealth)

var enemyNames = ["Roborto","Amy Android","Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
};

/// fight function
var fight = function(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
      // ask player if they'd like to fight or run
      var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      // if player picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
          window.alert(playerName + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerMoney for skipping
          playerMoney = Math.max(0, playerMoney - 10);
          console.log("playerMoney", playerMoney)
          break;
        }
      };
      //generate random damage value based on player's attack power
      var damage = randomNumber (playerAttack - 3, playerAttack);
      
      enemyHealth = Math.max(0, enemyHealth - damage);
      console.log(
        playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
      );
  
      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + ' has died!');
  
        // award player money for winning
        playerMoney = playerMoney + 20;
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
      }
  
      var damage = randomNumber(enemyAttack - 3, enemyAttack);
      
      playerHealth = Math.max(0, playerHealth - damage);
      console.log(
        enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
      );
  
      // check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerName + ' still has ' + playerHealth + ' health left.');
      }
    }
}; 

//function to start the game
  var startGame = function(){
      //reset player stats
      playerHealth = 100;
      playerAttack =10;
      playerMoney =10;
      for (var i = 0; i < enemyNames.length; i++){
          if(playerHealth > 0){
              window.alert("Welcome to Robot Gladiators! Round " +(i+1));

              var pickedEnemyName = enemyNames[i];
              
              enemyHealth = randomNumber(40, 60);

              fight(pickedEnemyName);

              if(playerHealth > 0 && i < enemyNames.length -1){
                  //ask if player want to use the store before next round
                  var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                  
                  if (storeConfirm){
                  shop();
                    }
                }
          }
          else {
              window.alert("You have lose robot in battle! Game Over!");
              break;
          }
      }
      endGame();
  };
  
  var endGame = function(){
      window.alert("the game has now ended. lets see how you did!");
      // if player is still alive, player wins!
      if (playerHealth > 0){
          window.alert("Great job,you've survived the game! You now have a score of " + playerMoney + ".")
      }
      else{
          window.alert("You've lost your robot in battle.");
        }
        //ask player if they'd like to play again
        var playAgainConfirm = window.confirm("would you like to play again?");
    
        if(playAgainConfirm){
            //restart the game
            startGame();
        }
        else{
            window.alert("thank you for playing Robot Gladiator! Come back soon!");
        }
    };

  var shop = function(){
     //ask player what they'd like to do
     var shopOptionPromt = window.prompt(
         "would you like to REFILL, your health, UPGRADE yout attack, or LEAVE the store? Please enter one: 'REFILL','UPGRADE', or 'LEAVE' to make a choice." 
        );
        
     switch (shopOptionPromt){
        case "REFILL": //new case
        case "refill":
            if (playerMoney >= 7){
             window.alert( "Refilling player's health by 20 for 7 dollars.");

             // increase health and decrease money
             playerHealth = playerHealth + 20;
             playerMoney = playerMoney - 7;

            }
            else {
                window.alert("You dont hvae enough Money!");
            }
            break;
        case "UPGRADE": //new case
        case "upgrade":
            if (playerMoney >= 7){
            window.alert("upgrading player's attack by 6 for 7 dollars.");


            //incease attack and decrease money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney -7;
            }
            else {
            window.alert("You dont have enought money!");
            }
            break;
        case "LEAVE": //new case
        case "leave":
            window.alert("Leaving the store.");

            //do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option, Try agian.");
            shop();
            break;
        }   
    };
  
  //start the game when the page loads
  startGame();