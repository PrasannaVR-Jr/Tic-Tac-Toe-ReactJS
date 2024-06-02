import "./App.css"
import { useState } from "react";

function Square({ value, handleOnClick }) {
  return (
    <button className="square" onClick={handleOnClick}>
      {value}
    </button>
  );
}

export default function Board() {
  let [isXTurn,setXTurn]=useState(true);
  const [tileContents, setTileContents] = useState(Array(9).fill(null));
 
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
    console.log("checking winner");
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

    setTileContents(arr);
    setXTurn(!isXTurn);
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
