const person="X";
const computer="O";

let switchingKey=``;
let moves=0;
let gameEnd=false;
const spanHtml=`
  
`;

function cellsDisplay(){
switchingKey==''?messageToPage('msg',`NOW PLAYER I : X`):'';

const html=`
    <div class="X11 cell" data-cellname='X11'></div>    <div class="X12 cell" data-cellname='X12'></div>   <div class="X13 cell" data-cellname='X13'></div>

    <div class="X21 cell" data-cellname='X21'></div>   <div class="X22 cell" data-cellname='X22'></div>   <div class="X23 cell" data-cellname='X23'></div>

    <div class="X31 cell" data-cellname='X31'></div>    <div class="X32 cell" data-cellname='X32'></div>   <div class="X33 cell" data-cellname='X33'></div>
`;
document.querySelector('.game-Pad').innerHTML=html;
console.log('game started');
  document.querySelectorAll('.cell').forEach((item)=>{
    item.addEventListener('click',()=>{
      const cellValue=item.dataset.cellname;
      const htmlValue=item.innerHTML;
      //console.log(`cell: ${item.innerHTML} :clicked`);
      
      
      if(htmlValue=='X' || htmlValue=="O"){
        if(gameEnd==false){
            messageToPage('msg','CHOOSE OTHER CELL 1');
            setTimeout(()=>{
              messageToPage('msg','');
            },1500);
        }
        
      }else{
        if(htmlValue!='X' && htmlValue!=='O' && gameEnd==false){
          console.log('cellvalue:',cellValue);
          moves+=1;
          console.log(moves);
          playGame(cellValue);

          if(switchingKey=='X' && gameEnd==false ){
            messageToPage('msg',`NOW PLAYER I : ${switchingKey}`);
          }else{
            if(switchingKey=='O' && gameEnd==false){
              messageToPage('msg',`NOW PLAYER II : ${switchingKey}`);
            }
          }
          
          if(switchingKey=='X'){
            document.querySelector('.bod').classList.remove("only-body-red");
            document.querySelector('.bod').classList.add("only-body-blue");
            document.querySelectorAll('.cell').forEach((clsitem)=>{
              clsitem.classList.remove("body-blue");
            });
            document.querySelectorAll('.cell').forEach((clsitem1)=>{
              clsitem1.classList.add("add-list-red");
            });

          }else{
            if(switchingKey=='O'){
              document.querySelector('.bod').classList.remove("only-body-blue");
              document.querySelector('.bod').classList.add("only-body-red");
             document.querySelectorAll('.cell').forEach((clsitem)=>{
              clsitem.classList.remove("add-list-red");
            });
            document.querySelectorAll('.cell').forEach((clsitem1)=>{
              clsitem1.classList.add("body-blue");
            });

            }
          }

        }else{
          if(gameEnd==false){
            messageToPage('msg','CHOOSE OTHER CELL 2');
          setTimeout(()=>{
            messageToPage('msg','');
          },1500);
          }
          
        }
        
      }
      

      //console.log('item:',item);
    });

    

  });
}

cellsDisplay();


function playGame(cellval){

  ///FIRST ROW WINNER PREDICTS HERE/////

  if(switchingKey=='' && gameEnd==false){
    switchingKey='X';
  }
  if(switchingKey=='X' && gameEnd==false){
    sendSwitchingKeyResponse(cellval);
    checkGameStatus(switchingKey);   
    switchingKey='O';
    
    
    
  }else{
    if(switchingKey=='O' && gameEnd==false){
      sendSwitchingKeyResponse(cellval);
      checkGameStatus(switchingKey);
      switchingKey='X';
      

      
    }
  }

}

///CHECKING GAME STATUS AND FINALISE WINNER/////
function checkGameStatus(recentMove){
  const row11=document.querySelector('.X11').innerHTML;
  const row12=document.querySelector('.X12').innerHTML;
  const row13=document.querySelector('.X13').innerHTML;

  const row21=document.querySelector('.X21').innerHTML;
  const row22=document.querySelector('.X22').innerHTML;
  const row23=document.querySelector('.X23').innerHTML;

  const row31=document.querySelector('.X31').innerHTML;
  const row32=document.querySelector('.X32').innerHTML;
  const row33=document.querySelector('.X33').innerHTML;

  if(row11=='X' && row12=='X' && row13=='X'){
    gameOver(recentMove);
  }else{
    if(row11=='O' && row12=='O' && row13=='O'){
      
      gameOver(recentMove);
    }else{
      if(row21=='X' && row22=='X' && row23=='X'){
        gameOver(recentMove);
      }else{
        if(row21=='O' && row22=='O' && row23=='O'){
          gameOver(recentMove);
        }else{
          if(row31=='X' && row32=='X' && row33=='X'){
            gameOver(recentMove);
          }else{
            if(row31=='O' && row32=='O' && row33=='O'){
              gameOver(recentMove);
            }else{
              if(row11=='X' && row21=='X' && row31=='X'){
                gameOver(recentMove);
              }else{
                if(row11=='O' && row21=='O' && row31=='O'){
                  console.log('winner here')
                  gameOver(recentMove);
                }else{
                  if(row12=='X' && row22=='X' && row32=='X'){
                    gameOver(recentMove);
                  }else{
                    if(row12=='O' && row22=='O' && row32=='O'){
                      gameOver(recentMove);
                    }else{
                      if(row13=='X' && row23=='X' && row33=='X'){
                        gameOver(recentMove);
                      }else{
                        if(row13=='O' && row23=='O' && row33=='O'){
                          gameOver(recentMove);
                        }else{
                          if(row11=='X' && row22=='X' && row33=='X'){
                            gameOver(recentMove);
                          }else{
                            if(row11=='O' && row22=='O' && row33=='O'){
                              gameOver(recentMove);
                            }else{
                              if(row13=='X' && row22=='X' && row31=='X'){
                                gameOver(recentMove);
                              }else{
                                if(row13=='O' && row22=='O' && row31=='O'){
                                  gameOver(recentMove);
                                }else{
                                  
                                  if(moves>=9){
                                    gameOver('MATCH TIE');
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  console.log(row11,row12,row13);
  console.log(row21,row22,row23);
  console.log(row31,row32,row33);
  console.log(moves);

}


function sendSwitchingKeyResponse(cellval){

  document.querySelector(`.${cellval}`).innerHTML=switchingKey;

}

function gameOver(recentMove){
  gameEnd=true;
  if(recentMove=='MATCH TIE'){
    
    messageToPage('msg',`<a href=index.html>  ${recentMove} SO RETRY</a><br>`)
  }else if(recentMove=='X' || recentMove=='O'){
   
    document.querySelector('.msg').innerHTML=`PLAYER ${recentMove=='X'?'I':'II'} '${recentMove}' WINNER 👑${moves}<p><a href='index.html'>REPLAY</a></p>`;
    
  }
  if(recentMove==undefined){
    messageToPage('game-Pad','');
    messageToPage('msg','GAME...ENDED...BY...SCRIPT..CHECK....ONCE ')
  }
  console.log('GAME OVER......')
   
}



function messageToPage(cls,msg){
  document.querySelector(`.${cls}`).innerHTML=`${msg}`;
}

