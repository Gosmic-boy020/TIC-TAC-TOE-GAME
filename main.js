import { toss } from "./computer.js";

import { cellsDisplay } from "./twoPlayersMod.js";
import { addList, messageToPage, removeList } from "./publicFunctions.js";

import { findValue } from "./publicFunctions.js";
let lvlMod='';
const lvl=findValue('dificulti');
//EventListener Here////////////////////////////////
  document.querySelectorAll('.play-btns').forEach((item)=>{
    item.addEventListener('click',()=>{
    const html=`
    <div class="cross-line"></div>
    <button class='back-btn' onclick='window.location.reload()' title='back'>🔙</button>
        <div class="select-options"></div>
            <div class="game-related">
              <div class="game-Pad"></div>
          
                <p class="msg"></p>
                <p class="msg2"></p>

                  <div class="toss-area"></div>
                
            </div>
          <div class="select-options player-2"></div>

       `
      messageToPage('all-container',html);
      
      const ele=findValue('all-container');
      

      ele.classList.remove('all-container');
      ele.classList.add('tow-all-container');
      const modvalue=item.dataset.mod;
      const modNam=item.innerHTML;
      if(modvalue=='0'){
       cellsDisplay(`<p class='mod-nam'>${modNam} Mode</p>`,item)
      }else if(modvalue=='1'){
        toss(`<p class='mod-nam'>${modNam} Mode</p>`,item,lvl);

      }
      //console.log(item.dataset.mod)

    });
    
  });



lvl.addEventListener('touchmove',()=>{
botBtn()
});
lvl.addEventListener('mousemove',()=>{
 botBtn()
});


function botBtn(){
if(lvl.value==1){
    lvlMod='Easy'
    removeList('btn2','btn-medium');
    removeList('btn2','btn-dificult');
    removeList('img-container','img-med');
    messageToPage('btn2','🙎vs B😊T');

  }else if(lvl.value==2){
    lvlMod='Medium';
    removeList('btn2','btn-dificult');
    removeList('img-container','img-difi');
    addList('btn2','btn-medium');
    addList('img-container','img-med')
    messageToPage('btn2','🙎vs B😏T');

  }else if(lvl.value==3){
    lvlMod='Dificult';
    removeList('img-container','img-med')
    addList('btn2','btn-dificult');
    addList('img-container','img-difi');
    messageToPage('btn2','🙎vs B😈T');
  }
  messageToPage('mode',lvlMod);

}









////ALL FUNCTION FISRT CALL HERE///
