// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
};

/// fight function
var fight = function(enemy) {
    
    while (playerInfo.health > 0 && enemy.health > 0) {
      // ask player if they'd like to fight or run
      var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      // if player picks "skip" confirm and then stop the loop
      if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
        // if yes (true), leave fight
        if (confirmSkip) {
          window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
          // subtract money from playerInfo.money for skipping
          playerInfo.money = Math.max(0, playerInfo.money - 10);
          console.log("playerInfo.money", playerInfo.money)
          break;
        }
      };
      //generate random damage value based on player's attack power
      var damage = randomNumber (playerInfo.attack - 3, playerInfo.attack);
      
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
      );
  
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');
  
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
  
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
      );
  
      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    }
}; 

//function to start the game
  var startGame = function(){
      //reset player stats
     playerInfo.reset();

      for (var i = 0; i < enemyInfo.length; i++){
          if(playerInfo.health > 0){
              window.alert("Welcome to Robot Gladiators! Round " +(i+1));
              var pickedEnemyObj = enemyInfo[i];

              pickedEnemyObj.health = randomNumber(40, 60);
              
              fight(pickedEnemyObj);

              if(playerInfo.health > 0 && i < enemyInfo.length -1){
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
      if (playerInfo.health > 0){
          window.alert("Great job,you've survived the game! You now have a score of " + playerInfo.money + ".")
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
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE": 
        case "upgrade":
            playerInfo.upgradeAttack();
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


var playerInfo = {
  name : window.prompt ("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function(){
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, //comma!
    refillHealth: function(){
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.")
            this.health += 20;
            this.money -= 7;  
         }
         else{
             window.alert("you don't have enough money!");
         }
    }, //coma
    upgradeAttack: function(){
        if (this.money >=7) {
            window.alert("Upgrading plater's attack by 6 for 7 dollars.");
            this.attack +=6;
            this.money -=7;
        }
        else{
            window.alert("You don't have enough money!");
        }
    }
};
//enemy info
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber (10, 14),
        shield:{
            type: "wood",
            strength: 10
        }
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];
  //start the game when the page loads
  startGame();