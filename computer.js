import { messageToPage,sendSwitchingKeyResponse,themeChanger,arr1,findValue,addList,removeList,crossLine } from "./publicFunctions.js";


let toss_winner='';
const person="X";
const computer="O";
const computerName='BOT'

const disPerson1=`<p class="logo-X">X</p>`;
const disPerson2=`<p class="logo-O">O</p>`;

let per1='';
let per2='';

let switchingKey=``;
let moves=0;
let gameEnd=false;

let randomMove='';
let camMove='';
let camWinMove=''
let strategicMove='';
let finalComMove='';
let cornerMove='';
let senter='';
let tosVal1;
let tossVal2;
let difiLVL;
let midmoves=0;
const x=findValue("sound");



 export function toss(val1,val2,lvlMod){
  
  addList('select-options','display-none');
  removeList('display-none','select-options');
  addList('player-2','display-none');
  removeList('display-none','player-2');
  
  tosVal1=val1;
  tossVal2=val2;
  difiLVL=lvlMod;
  const html=`
  <h2 class="formal-text">WIN TOSS TO PUT FIRST MOVE</h2>
  <h2 class="formal-text">CHOOSE ONE</h2>
 <button class="sty-btn head" data-hed="0">HEADS</button>
 <button class="sty-btn tail" data-tai="1">TAILS</button>
  `;
  document.querySelector('.toss-area').innerHTML=html;

    addList('toss-area','toss-area-styles');

  document.querySelectorAll('.sty-btn').forEach((item)=>{
    item.classList.add('play-btns')
    item.addEventListener('click',()=>{
      HTrandom(val1,val2,item);
    });
    
  })
 }
 function HTrandom(val1,val2,obj){
 const ranVal =Math.random();
 if(ranVal>=0 && ranVal<=1/2){
  toss_winner='X';
  switchingKey=disPerson1;

  messageToPage('toss-area','<p class="mod-nam">You Won Toss</p>');

  setTimeout(()=>{
    themeChanger(disPerson2);
    botCellsDisplay(val1,val2);
    addList('player-2','highlight-1');
  },3000)
 }else if(ranVal>=1/2 && ranVal<=1){
  toss_winner='O';
  messageToPage('toss-area','<p class="mod-nam">Bot Won Toss</p>')
  setTimeout(()=>{
    botCellsDisplay(val1,val2);
    themeChanger(disPerson1)
    analyseGame();
  },3000)
 }

  
 }
 function botCellsDisplay(modNam,obj){
  removeList('toss-area','toss-area-styles');

  addList('display-none','select-options');
  removeList('select-options','display-none');

  addList('display-none','player-2');
  removeList('player-2','display-none');

camMove='';
camWinMove='';
strategicMove='';
moves=0;

 console.log(obj.innerHTML);
  const modValue1=obj.dataset.mod;
  let presentGameMode='';

  if(modValue1=='1'){
    per1=arr1[2];
    per2=arr1[3];
    presentGameMode=modValue1;
  }

messageToPage('select-options',`${computerName}`);

messageToPage('player-2',`${disPerson1}`)

messageToPage('toss-area','');


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

            ////play game method////
            if(gameEnd==false && presentGameMode=='1'){
              playGame(cellValue,item);
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
 function playGame(val1,obj){

  if(switchingKey==disPerson1 && gameEnd==false){
    personMove(val1,obj);
    themeChanger(disPerson1);
    analyseGame(val1,obj);
  }
   
}
function personMove(cellValue,obj){
  removeList('player-2','highlight-1');
  console.log('person moved',cellValue,obj);
  x.play();
  sendSwitchingKeyResponse(cellValue,disPerson1);
  moves+=1;

  checkGameStatus(switchingKey);
  switchingKey=disPerson2;
  
}
function analyseGame(hisCellValue,obj1){

  if(gameEnd==false){

    const campi=findValue('select-options');
    campi.classList.add("bot-thinking");

 messageToPage('select-options','Thinking');
 console.log('bot Thinking..')
  const row11=document.querySelector('.X11').innerHTML;
  const row12=document.querySelector('.X12').innerHTML;
  const row13=document.querySelector('.X13').innerHTML;

  const row21=document.querySelector('.X21').innerHTML;
  const row22=document.querySelector('.X22').innerHTML;
  const row23=document.querySelector('.X23').innerHTML;

  const row31=document.querySelector('.X31').innerHTML;
  const row32=document.querySelector('.X32').innerHTML;
  const row33=document.querySelector('.X33').innerHTML;

  let randomValue='';
  let thatcellValue='';

    function randomGene(){
    
    let ranValue= Math.random();

    if(ranValue>=0 && ranValue<=1/9){
      randomValue='X11';
    }else if(ranValue>=1/9 && ranValue<=2/9){
      randomValue='X12';
    }else if(ranValue>=2/9 && ranValue<=3/9){
      randomValue='X13';
    }else if(ranValue>=3/9 && ranValue<=4/9){
      randomValue='X21'
    }else if(ranValue>=4/9 && ranValue<=5/9){
      randomValue='X22';
    }else if(ranValue>=5/9 && ranValue<=6/9){
      randomValue='X23';
    }else if(ranValue>=6/9 && ranValue<=7/9){
      randomValue='X31';
    }else if(ranValue>=7/9 && ranValue<=8/9){
      randomValue='X32';
    }else if(ranValue>=8/9 && ranValue<=1){
      randomValue='X33';
    }
    
    thatcellValue=document.querySelector(`.${randomValue}`).innerHTML;
  }
  

  

 if(toss_winner==person || toss_winner==computer){
console.log('BOT TRYING TO Win>>');
  
if(difiLVL.value=='1'){
  Easy();
  
 }else if(difiLVL.value=='2'){
  medium();
 }else if(difiLVL.value=='3'){
  dificult();
 }
  
};



function Easy(){
  finalComMove='';
console.log('working easy mode');
  randomGene();
  if(randomValue==hisCellValue){
    randomGene();
    Easy();
  }else {
      if(randomValue!=hisCellValue && thatcellValue!=''){
      randomGene();
      Easy();
    }else{
      if(randomValue!=hisCellValue && thatcellValue==''){
        finalComMove=randomValue;
        console.log('random value assigned in Easy>>>>')
      }
    }
  }
};

function medium(){
 
console.log('working medium mode');
if(midmoves==1){
dificult();
midmoves-=1
}else if(midmoves==0){
  Easy();
  midmoves+=1;
}
  
  
};

function dificult(){
  finalComMove='';
  console.log('working dificult mode');
  thinking();
  thinkForWin();
  if(moves<=5){
    thinkForStratagicMove();
    if(strategicMove!='' || camMove!=''||cornerMove!=''||camWinMove!='' ||randomValue==''){

      if(row22=='' || camWinMove!=''){
        if(row22==''){
          finalComMove='X22';

        }else{
          if(camWinMove!='');
          finalComMove=camWinMove;
        }
      }else {
          if(camMove!='' &&camWinMove==''){
            finalComMove=camMove;
          }else{
            if(strategicMove!='' &&camMove==''&&camWinMove==''){
              finalComMove=strategicMove;
            }else{
              if(strategicMove==''&&camMove==''&&cornerMove!=''&&camWinMove==''){
                finalComMove=cornerMove;
              }else{
                  if(camMove==''&&strategicMove==''&&cornerMove==''&&camWinMove==''){
                    randomGene();
                    if(randomValue==hisCellValue){
                      randomGene();
                      dificult();
                    }else {
                        if(randomValue!=hisCellValue && thatcellValue!=''){
                        randomGene();
                        dificult();
                      }else{
                        if(randomValue!=hisCellValue && thatcellValue==''){
                          finalComMove=randomValue;
                        }
                      }
                    }
                  }
                
              }
            }
          }
        
      }

    }

  }else if(moves>=6){
    if(camWinMove!=''){
      finalComMove=camWinMove;
    }else if(camMove!=''){
      finalComMove=camMove;
    }else if(camWinMove==''&&camMove==''&&cornerMove!=''){
      finalComMove=cornerMove
    }else{
      randomGene();
      if(randomValue==hisCellValue){
        randomGene();
        dificult();
      }else {
          if(randomValue!=hisCellValue && thatcellValue!=''){
          randomGene();
          dificult();
        }else{
          if(randomValue!=hisCellValue && thatcellValue==''){
            finalComMove=randomValue;
          }
        }
      }
    }
      
    
  }
};




function thinking(){
camMove='';
if(row11==disPerson1 && row12==disPerson1 && row13==''){
  camMove='X13';
}else if(row21==disPerson1 && row22==disPerson1 && row23==''){
    camMove='X23';
  }else if(row31==disPerson1 && row32==disPerson1 && row33==''){
      camMove='X33';
  }else if(row13==disPerson1 && row12==disPerson1 && row11==''){
    camMove='X11';
  }else if(row23==disPerson1 && row22==disPerson1 && row21==''){
    camMove='X21';
  }else if(row33==disPerson1 && row32==disPerson1 && row31==''){
    camMove='X31';
  }else if(row11==disPerson1 && row21==disPerson1 && row31==''){
    camMove='X31';
  }else if(row12==disPerson1 && row22==disPerson1 && row32==''){
    camMove='X32';
  }else if(row13==disPerson1 && row23==disPerson1 && row33==''){
    camMove='X33';
  }else if(row31==disPerson1 && row21==disPerson1 && row11==''){
    camMove='X11';
  }else if(row32==disPerson1 && row22==disPerson1 && row12==''){
    camMove='X12';
  }else if(row33==disPerson1 && row23==disPerson1 && row13==''){
    camMove='X13';
  }else if(row11==disPerson1 && row22==disPerson1 && row33==''){
    camMove='X33';
  }else if(row33==disPerson1 && row22==disPerson1 && row11==''){
    camMove='X11';
  }else if(row13==disPerson1 && row22==disPerson1 && row31==''){
    camMove='X31';
  }else if(row31==disPerson1 && row22==disPerson1 && row13==''){
    camMove='X13';
  }else if(row11==disPerson1 && row31==disPerson1 && row21==''){
    camMove='X21';
  }else if(row13==disPerson1 && row33==disPerson1 && row23==''){
    camMove='X23';
  }else if(row11==disPerson1 && row13==disPerson1 && row12==''){
    camMove='X12';
  }else if(row31==disPerson1 && row33==disPerson1 && row32==''){
    camMove='X32';
  }

  


    
          
          
      
      
      
  
  



  
    

  

}

function thinkForWin(){

camWinMove='';
cornerMove='';
if((row11==disPerson2 && row12==disPerson2 && row13=='')){
  camWinMove='X13';
}else if((row21==disPerson2 && row22==disPerson2 && row23=='')){
    camWinMove='X23';
  }else if((row31==disPerson2 && row32==disPerson2 && row33=='')){
      camWinMove='X33';
  }else if((row13==disPerson2 && row12==disPerson2 && row11=='')){
    camWinMove='X11';
  }else if((row23==disPerson2 && row22==disPerson2 && row21=='')){
    camWinMove='X21';
  }else if((row33==disPerson2 && row32==disPerson2 && row31=='')){
    camWinMove='X31';
  }else if((row11==disPerson2 && row21==disPerson2 && row31=='')){
    camWinMove='X31';
  }else if((row12==disPerson2 && row22==disPerson2 && row32=='')){
    camWinMove='X32';
  }else if((row13==disPerson2 && row23==disPerson2 && row33=='')){
    camWinMove='X33';
  }else if((row31==disPerson2 && row21==disPerson2 && row11=='')){
    camWinMove='X11';
  }else if((row32==disPerson2 && row22==disPerson2 && row12=='')){
    camWinMove='X12';
  }else if((row33==disPerson2 && row23==disPerson2 && row13=='')){
    camWinMove='X13';
  }else if((row11==disPerson2 && row22==disPerson2 && row33=='')){
    camWinMove='X33';
  }else if((row33==disPerson2 && row22==disPerson2 && row11=='')){
    camWinMove='X11';
  }else if((row13==disPerson2 && row22==disPerson2 && row31=='')){
    camWinMove='X31';
  }else if((row31==disPerson2 && row22==disPerson2 && row13=='')){
    camWinMove='X13';
  }else if((row11==disPerson2 && row31==disPerson2 && row21=='')){
    camWinMove='X21';
  }else if((row13==disPerson2 && row33==disPerson2 && row23=='')){
    camWinMove='X23';
  }else if((row11==disPerson2 && row13==disPerson2 && row12=='')){
    camWinMove='X12';
  }else if((row31==disPerson2 && row33==disPerson2 && row32=='')){
    camWinMove='X32';
  }


    

if( row11=='' ||row13=='' || row31==''|| row33==''){
console.log('Corner value assigning in think For Win...');
  if(row11==''){
  cornerMove='X11';
}else if(row13==''){
  cornerMove='X13';
}else if(row31==''){
  cornerMove='X31'
}else if(row33==''){
  cornerMove='X33'
}

}


  

}

function thinkForStratagicMove(){
  strategicMove='';
  if(moves==2){

  if((row22==disPerson2 && row12==disPerson1) || (row22==disPerson2 && row21==disPerson1) || (row22==disPerson2 && row23==disPerson1) || (row22==disPerson2 && row32==disPerson1)){
    console.log('one strategic move trigger');
    if((row22==disPerson2 && row12==disPerson1 && row31=='')){
      strategicMove='X31';
    }else if((row22==disPerson2 && row21==disPerson1 && row13=='')){
      strategicMove='X13';
    }else if((row22==disPerson2 && row23==disPerson1 && row11=='')){
      strategicMove='X11';
    }else if((row22==disPerson2 && row32==disPerson1 && row11=='')){
      strategicMove='X11';
    }
  }
  }else{
      if(moves==4){
        if(row22==disPerson2 && row12==disPerson1 && row31==disPerson2 && row13==disPerson1 && row11==''){
          strategicMove='X11';
        }else if(row22==disPerson2 && row21==disPerson1 && row13==disPerson2 && row31==disPerson1 && row11==''){
          strategicMove='X11';
        }else if(row22==disPerson2 && row23==disPerson1 && row11==disPerson2 && row33==disPerson1 && row13==''){
          strategicMove='X13';
        }else if(row22==disPerson2 && row32==disPerson1 && row11==disPerson2 && row33==disPerson1 && row31==''){
          strategicMove='X31';
        }
      }
    }
}



  setTimeout(()=>{
      themeChanger(disPerson2);
      console.log('computer moved',finalComMove,hisCellValue,obj1);
      sendSwitchingKeyResponse(finalComMove,disPerson2);
      x.play();
      moves+=1;

      campi.classList.remove("bot-thinking");
      
      checkGameStatus(switchingKey)
      switchingKey=disPerson1;
      addList('player-2','highlight-1');
      messageToPage('select-options',`${computerName}`);
},2000);

  }


   
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
   index!=''?crossLine(index):'';

  setTimeout(()=>{



  addList('msg','msg-cover');

  if(recentMove=='MATCH TIE'){
    
    messageToPage('msg',`<button class='replay'>${recentMove} SO RETRY</button><br>`);
    addList('replay','play-btns');
  }else if(recentMove==disPerson1 || recentMove==disPerson2){
    recentMove==computer?themeChanger(disPerson1):themeChanger(disPerson2);
    document.querySelector('.msg').innerHTML=`${recentMove==disPerson1?`${per1}`:`${per2}`} '${recentMove}' WINNER 👑<p><button class='replay'>REPLAY</button></p>`;
    
    
  }
  if(recentMove==undefined){
    messageToPage('game-Pad','');
    messageToPage('msg','GAME...ENDED...BY...SCRIPT..CHECK....ONCE ')
  }
  console.log('GAME OVER......')
   document.querySelectorAll('.replay').forEach((item)=>{
    addList('replay','play-btns');
    item.addEventListener('click',()=>{
      findValue('cross-line').style.width='0px';
      removeList('msg','msg-cover');
      messageToPage('game-pad','');
      messageToPage('msg','');
      messageToPage('select-options','');
      messageToPage('player-2','');
      removeList('player-2','highlight-1');
      
      gameEnd=false;
      toss(tosVal1,tossVal2,difiLVL);
    })
   })

    


      },1000);
}

