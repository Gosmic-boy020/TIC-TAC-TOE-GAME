import { messageToPage,sendSwitchingKeyResponse,themeChanger,arr1,findValue,addList,removeList,crossLine } from "./publicFunctions.js";



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


let camMove='';
let camWinMove=''
let strategicMove='';
let finalComMove='';
let cornerMove='';


let difiLVL;
let midmoves=0;

const x=findValue("sound");
let firstmove=''

export function firstMove(modvalue,difi,lvlMod){
  difiLVL=difi;
  messageToPage('mode-in-game',lvlMod);
  if(switchingKey==''){
    switchingKey=disPerson1;
    firstmove='person';
    themeChanger(disPerson2);
    botCellsDisplay(modvalue);
    addList('player-2','highlight-1');
  }
}


  function botCellsDisplay(modValue1){
 
  camMove='';
  camWinMove='';
  strategicMove='';
  moves=0;

 
  let presentGameMode='';

  if(modValue1=='1'){
    per1=arr1[2];
    per2=arr1[3];
    presentGameMode=modValue1;
  }

messageToPage('select-options',`${computerName}`);

messageToPage('player-2',`${disPerson1}`)

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
            if(gameEnd==false && presentGameMode=='1' && switchingKey==disPerson1){

              const hisCellValue=item.dataset.cellname;
              removeList('player-2','highlight-1');
              console.log('person moved',hisCellValue,item);
              x.play();
              item.innerHTML=disPerson1;
              themeChanger(disPerson1);
              moves+=1
              checkGameStatus(switchingKey);
              switchingKey=disPerson2;
              analyseGame(hisCellValue,item);
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



function analyseGame(hisCellValue,obj1){

  if(gameEnd==false){

    findValue('select-options').classList.add("bot-thinking");

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
  

  

 if(switchingKey=disPerson2){
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


    cornerValue();
  
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

function cornerValue(){
    let arrCro=["X11","X13","X31","X33","X12","X21","X23","X32"];
    let ranCorner=arrCro[Math.floor(Math.random()*arrCro.length)];
    let cornValue=document.querySelector(`.${ranCorner}`).innerHTML;
    if(ranCorner!=hisCellValue && cornValue==''){
      cornerMove=ranCorner;
    }else if(ranCorner==hisCellValue || cornValue!=''){
      cornerValue();
    }else if(cornValue!=''){
      cornerMove='';
    }
  }



  setTimeout(()=>{
      themeChanger(disPerson2);
      console.log('computer moved',finalComMove,hisCellValue,obj1);
      sendSwitchingKeyResponse(finalComMove,disPerson2);
      x.play();
      moves+=1;

      findValue('select-options').classList.remove("bot-thinking");
      
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
                                    gameOver('MATCH TIE','tie');
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
   index=='tie'?console.log('tie'):crossLine(index);

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
      if(firstmove=='person'){
        gameEnd=false;
        themeChanger(disPerson1);
       firstmove='computer';
       switchingKey='';
       switchingKey=disPerson2;
       botCellsDisplay('1');
        analyseGame();
        addList('select-options','bot-thinking');
      }else if(firstmove=='computer'){
        gameEnd=false;
        firstmove='person';
        switchingKey='';
        switchingKey=disPerson1;
        botCellsDisplay('1');
        addList('player-2','highlight-1');
      }
      
      
      
    });

   })

    


      },1000);
}

