import { messageToPage,sendSwitchingKeyResponse,themeChanger,arr1 } from "./publicFunctions.js";

import { findValue,addList,removeList,crossLine } from "./publicFunctions.js";



let per1='';
let per2='';
const disPerson1=`<p class="logo-X">X</p>`;
const disPerson2=`<p class="logo-O">O</p>`;



let switchingKey=``;
let moves=0;
let gameEnd=false;
// let presentGameMode='';
const spanHtml=`
  
`;
let spareModName;
let spareObj;
const sound=findValue("sound");
export function cellsDisplay(modNam,obj){
  themeChanger(disPerson2)
  moves=0;
  spareModName=modNam;
  spareObj=obj;
  switchingKey=disPerson1;
 console.log(obj.innerHTML);
  const modValue1=obj.dataset.mod;
  let presentGameMode='';

  if(modValue1=='0'){
    per1=arr1[0];
    per2=arr1[1];
    presentGameMode=modValue1;
  }

messageToPage('select-options',disPerson1);




const html=`
    <div class="X11 cell" data-cellname='X11'></div>    <div class="X12 cell" data-cellname='X12'></div>   <div class="X13 cell" data-cellname='X13'></div>

    <div class="X21 cell" data-cellname='X21'></div>   <div class="X22 cell" data-cellname='X22'></div>   <div class="X23 cell" data-cellname='X23'></div>

    <div class="X31 cell" data-cellname='X31'></div>    <div class="X32 cell" data-cellname='X32'></div>   <div class="X33 cell" data-cellname='X33'></div>
`;
document.querySelector('.game-Pad').innerHTML=html;
console.log('game started');

messageToPage('player-2',disPerson2);


const hig1=findValue('select-options');
const hig2=findValue('player-2');

 hig1.classList.add("highlight-1");

  document.querySelectorAll('.cell').forEach((item)=>{
    item.addEventListener('click',()=>{
      const cellValue=item.dataset.cellname;
      const htmlValue=item.innerHTML;
      //console.log(`cell: ${item.innerHTML} :clicked`);
      
      
      if(htmlValue==disPerson1 || htmlValue==disPerson2){
        if(gameEnd==false ){
            messageToPage('msg2','CHOOSE OTHER CELL 1');
            setTimeout(()=>{
              messageToPage('msg2','');
            },1500);
        }
        
      }else{
        if(htmlValue!=disPerson1 && htmlValue!==disPerson2 && gameEnd==false){
          console.log('cellvalue:',cellValue);
          
          console.log(moves);

          ////game played here////
          if(gameEnd==false && presentGameMode=='0'){
              if(switchingKey==disPerson1 && gameEnd==false){
              sound.play()
              item.innerHTML=disPerson1;
                
              moves+=1;

              checkGameStatus(switchingKey); 
              themeChanger(disPerson1);  
              switchingKey=disPerson2;
              
  
              
            }else{
              if(switchingKey==disPerson2 && gameEnd==false){
                sound.play();
                item.innerHTML=disPerson2;
                moves+=1;
                checkGameStatus(switchingKey);
                themeChanger(disPerson2);
                switchingKey=disPerson1;
                

                
              }
            }
          }
          /////ended here/////
          
          if(switchingKey==disPerson1 && gameEnd==false ){
             hig2.classList.remove("highlight-2");
            messageToPage('select-options',`${disPerson1}`);
             hig1.classList.add("highlight-1");
          }else{
            if(switchingKey==disPerson2 && gameEnd==false){
               hig1.classList.remove("highlight-1");
              messageToPage('player-2',`${disPerson2}`);
               hig2.classList.add("highlight-2");
            }
          }
          
          
          

        }else{
          if(gameEnd==false){
            messageToPage('msg2','CHOOSE OTHER CELL 2');
          setTimeout(()=>{
            messageToPage('msg2','');
          },1500);
          }
          
        }
        
      }
      

      //console.log('item:',item);
    });

    

  });


}



///CHECKING GAME STATUS AND FINALISE WINNER/////
export function checkGameStatus(recentMove){
  let index=0;

  const row11=document.querySelector('.X11').innerHTML;
  const row12=document.querySelector('.X12').innerHTML;
  const row13=document.querySelector('.X13').innerHTML;

  const row21=document.querySelector('.X21').innerHTML;
  const row22=document.querySelector('.X22').innerHTML;
  const row23=document.querySelector('.X23').innerHTML;

  const row31=document.querySelector('.X31').innerHTML;
  const row32=document.querySelector('.X32').innerHTML;
  const row33=document.querySelector('.X33').innerHTML;

  if(row11==disPerson1 && row12==disPerson1 && row13==disPerson1){
    index=0;
    gameOver(recentMove,index);
  }else{
    if(row11==disPerson2 && row12==disPerson2 && row13==disPerson2){
      index=0;
      gameOver(recentMove,index);
    }else{
      if(row21==disPerson1 && row22==disPerson1 && row23==disPerson1){
        index=1;
        gameOver(recentMove,index);
      }else{
        if(row21==disPerson2 && row22==disPerson2 && row23==disPerson2){
          index=1
          gameOver(recentMove,index);
        }else{
          if(row31==disPerson1 && row32==disPerson1 && row33==disPerson1){
            index=2;
            gameOver(recentMove,index);
          }else{
            if(row31==disPerson2 && row32==disPerson2 && row33==disPerson2){
              index=2;
              gameOver(recentMove,index);
            }else{
              if(row11==disPerson1 && row21==disPerson1 && row31==disPerson1){
                index=3;
                gameOver(recentMove,index);
              }else{
                if(row11==disPerson2 && row21==disPerson2 && row31==disPerson2){
                  index=3;
                  gameOver(recentMove,index);
                }else{
                  if(row12==disPerson1 && row22==disPerson1 && row32==disPerson1){
                    index=4;
                    gameOver(recentMove,index);
                  }else{
                    if(row12==disPerson2 && row22==disPerson2 && row32==disPerson2){
                      index=4;
                      gameOver(recentMove,index);
                    }else{
                      if(row13==disPerson1 && row23==disPerson1 && row33==disPerson1){
                        index=5
                        gameOver(recentMove,index);
                      }else{
                        if(row13==disPerson2 && row23==disPerson2 && row33==disPerson2){
                          index=5
                          gameOver(recentMove,index);
                        }else{
                          if(row11==disPerson1 && row22==disPerson1 && row33==disPerson1){
                            index=6
                            gameOver(recentMove,index);
                          }else{
                            if(row11==disPerson2 && row22==disPerson2 && row33==disPerson2){
                              index=6
                              gameOver(recentMove,index);
                            }else{
                              if(row13==disPerson1 && row22==disPerson1 && row31==disPerson1){
                                index=7
                                gameOver(recentMove,index);
                              }else{
                                if(row13==disPerson2 && row22==disPerson2 && row31==disPerson2){
                                  index=7
                                  gameOver(recentMove,index);
                                }else{
                                  
                                  if(moves>=9){
                                    gameOver('MATCH TIE','');
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





 function gameOver(recentMove,index){
  gameEnd=true;
 index!=''?crossLine(index):console.log('tie');
  setTimeout(()=>{
    addList('msg','msg-cover');
  
  if(recentMove=='MATCH TIE'){
  
    messageToPage('msg',`<button class='replay'>${recentMove} SO RETRY</button><br>`)
  }else if(recentMove==disPerson1 || recentMove==disPerson2){
   recentMove==disPerson1?themeChanger(disPerson2):themeChanger(disPerson1);
    document.querySelector('.msg').innerHTML=`${recentMove==disPerson1?`${per1}`:`${per2}`} ${recentMove} WINNER 👑<p><button class='replay'>REPLAY</button></p>`;
    
  }
  if(recentMove==undefined){
    messageToPage('game-Pad','');
    messageToPage('msg','GAME...ENDED...BY...SCRIPT..CHECK....ONCE ')
  }
  console.log('GAME OVER......');
  document.querySelectorAll('.replay').forEach((item)=>{
    addList('replay','play-btns');
      item.addEventListener('click',()=>{
        removeList('msg','msg-cover');
        removeList('player-2','highlight-2')
        messageToPage('game-pad','');
        messageToPage('msg','');
        findValue('cross-line').style.width='0';
        gameEnd=false;
        cellsDisplay(spareModName,spareObj);
        switchingKey=disPerson1
      })
     })
  
      moves=0;

         },1000);
}






