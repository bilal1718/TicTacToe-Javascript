//Accessing HTML Elements
const xPlayer='X';
const yPlayer='Y';
const cellElements=document.querySelectorAll('[data-cell]');
let result=document.querySelector('.win');
const restart=document.querySelector('.restart');
let currentPlayer=xPlayer;
const winningMethods=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

startGame();

//function to start the Game
function startGame(){
    cellElements.forEach(cell => {
        result.textContent=`${xPlayer}'s turn now!`
        cell.addEventListener('click',handleCellClick);
    })
};

//function to handle the cell click
function handleCellClick(event){
    const cellClicked=event.target;
    if(cellClicked.textContent==''){
        cellClicked.textContent=currentPlayer;

        //Adding css to both the elements
    if(currentPlayer==xPlayer){
       cellClicked.classList.add('playerX');
        result.textContent=`${yPlayer}'s turn now!`
    }else if(currentPlayer == yPlayer){
        cellClicked.classList.add('playerY');
        result.textContent=`${xPlayer}'s turn now!`
    }
    analyzePosition();
}};

//function to analyze the user position in game
function analyzePosition() {
    if(checkWin(currentPlayer)){
        result.textContent=`${currentPlayer}'s won`;
        disableClick();
    }else if(checkDraw()){
        result.textContent=`It's a draw`;
    }else{
        currentPlayer=currentPlayer === xPlayer ? yPlayer:xPlayer;
    }
}


//function to check win
function checkWin(user){
    return winningMethods.some(method => {
        return method.every( index => {
            return cellElements[index].textContent === user
        });
    });
}


//function to check draw
function checkDraw(){
    return [...winningMethods].every(cell=>{
        cell.textContent !== '';
     } )
    }
    

    //disable the clciks after the won
function disableClick(){
    cellElements.forEach(cell => {
        cell.removeEventListener('click',handleCellClick);
    });
}    
//when restart button is clicked
restart.addEventListener('click',function(){
    cellElements.forEach(cell=>{
      cell.innerHTML="";
    });
    startGame();
});