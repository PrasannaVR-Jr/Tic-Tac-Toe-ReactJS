import "./App.css"
import { useState } from "react";

function Square({ value, handleOnClick }) {
  return (
    <button className="square" onClick={handleOnClick}>
      {value}
    </button>
  );
}

function Board({isXTurn,handleStateChange,tileContents}) {
 
  function declareWinner(){
    const consistentCells=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(let i=0;i<consistentCells.length;i++){
      const [a,b,c] = consistentCells[i];
      if(tileContents[a] && tileContents[a]===tileContents[b] && tileContents[a]===tileContents[c])
        return tileContents[a];
    }

    return null;
  }
  function handleValueChange(sqId) {
    
    const arr = tileContents.slice();
    if(arr[sqId] || declareWinner())
      return;

    if(isXTurn)
      arr[sqId] = "X";
    else
      arr[sqId]="O";

    handleStateChange(arr);
  }

  

  return (
    <>
    <div className="status">
      {declareWinner()?`Winner : ${declareWinner()}`:`Next Player :${isXTurn ? " X" : " O"}`}
    </div>
      <div className="board-row">
        {/* prevent infinite rendering by NOT calling functions directly in handle clicks or onclicks */}
        <Square value={tileContents[0]} handleOnClick={()=>handleValueChange(0)}/>
        <Square value={tileContents[1]} handleOnClick={()=>handleValueChange(1)}/>
        <Square value={tileContents[2]} handleOnClick={()=>handleValueChange(2)}/>
      </div>
      <div className="board-row">
        <Square value={tileContents[3]} handleOnClick={()=>handleValueChange(3)}/>
        <Square value={tileContents[4]} handleOnClick={()=>handleValueChange(4)}/>
        <Square value={tileContents[5]} handleOnClick={()=>handleValueChange(5)}/>
      </div>
      <div className="board-row">
        <Square value={tileContents[6]} handleOnClick={()=>handleValueChange(6)}/>
        <Square value={tileContents[7]} handleOnClick={()=>handleValueChange(7)}/>
        <Square value={tileContents[8]} handleOnClick={()=>handleValueChange(8)}/>
      </div>
    </>
  );
}

export default function Game()
{
  let [histories,setHistory]=useState([Array(9).fill(null)]);

  const [currMove,setCurrMove]=useState(0);
  let isXturn=currMove%2===0;

  const currSquares=histories[currMove];

  function handleState(nextSquares)
  {
    let nextHistory=[...histories.slice(0,currMove+1),nextSquares];
    setHistory(nextHistory);
    setCurrMove(nextHistory.length-1);
    console.log(nextHistory);
  }
  
  function jumpState(nextmove)
  {
      setCurrMove(nextmove);

  }

  const steps = histories.map((history,index)=>{
    let btnText="";
    if(index<1)
        btnText="Reset Board";
    else
        btnText="Go to move #"+index;
    return (
      <li key={index}>
        <button onClick={()=>jumpState(index)}>{btnText}</button>
      </li>
    );
  }
  );

  return(
  <div className="game">

    <div className="game-board">
      <Board isXTurn={isXturn} handleStateChange={handleState} tileContents={currSquares}/>
    </div> 

    <div className="game-history">
      <ol>
        {steps}
      </ol>
    </div>

  </div>);
}
