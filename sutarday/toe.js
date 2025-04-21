//declaring var

var cells= document.querySelector(".cell");
var results = document.querySelector(".results");
var Restart = document.querySelector(".Restart");


var playerX = "X";
var playerO = "O";


//DEFINE POSSIBLE WINNING COMBINATION

var winningCombinations = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[3,4,6],


]
//get the cell element

function getComboCells(combo){
    return combo.map(i => cells[i]);
}

//looks for way to block apponent or complret or wiinning


function tryCombo(firstCell,secondCell,thirdCell,target){

    if (firstCell.textContent === target && 
        secondCell.textContent === target && 
        thirdCell.textContent === ""){
        thirdCell.textContent = playerO;
        return true;
    }
return false;

}

// Bot tries to win or block the play

function botMoves(){
    for (let i =0; i < winningCombinations.length;i++){
        var [firstCell,secondCell,thirdCell]  = getComboCells(winningCombinations[i]);

        
        if (
            tryCombo(firstCell, secondCell, thirdCell, playerO) ||
            tryCombo(firstCell, thirdCell, secondCell, playerO) ||
            tryCombo(secondCell, thirdCell, firstCell, playerO)
        ) {
            return playerO;
        }
        //try to block player x from winning
    if (
        tryCombo(firstCell, secondCell, thirdCell, playerX)
     ) {
        return playerO;
    }
    }
    //check if player has won
    function checkPlayer() {
        for (let i = 0; i < winningCombinations.length; i++) {
            var [firstCell, secondCell, thirdCell] = getComboCells(winningCombinations[i]);
    
            if (
                firstCell.textContent === playerX &&
                secondCell.textContent === playerX &&
                thirdCell.textContent === playerX
            ) {
                results.textContent = "Player X Wins!";
                return;
            }
    
            if (
                firstCell.textContent === playerO &&
                secondCell.textContent === playerO &&
                thirdCell.textContent === playerO
            ) {
                results.textContent = "Player O Wins!";
                return;
            }
        }
    
        // Check if all cells are filled and no winner
        if ([...cells].every(cell => cell.textContent !== "")) {
            results.textContent = "It's a Draw!";
            return;
        }
    }
    
    function gameOver(winner) {
        results.style.display = "block";
    
        if (winner) {
            results.textContent = `${winner} Wins!! `;
            cells.forEach((cell) => cell.classList.add("disabled"));
        } else {
            results.textContent = "It's Tie!!";
        }

    }
}