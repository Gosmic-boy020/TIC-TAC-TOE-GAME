import { toss } from "./computer.js";

import { cellsDisplay } from "./twoPlayersMod.js";
import { messageToPage } from "./publicFunctions.js";


function selectOptionsDisplay(){
  const html=`
  <buttton  class="player-mod" data-mod="0" onclick="dis()">🙎‍♂️vs🙎</buttton>
    <buttton class="player-mod" data-mod="1">🙎‍♂️ vs B🤖T</buttton>`;

  document.querySelector('.sel-opi').innerHTML=html;

//EventListener Here////////////////////////////////
  document.querySelectorAll('.player-mod').forEach((item)=>{
    item.addEventListener('click',()=>{
    
     const ele=document.querySelector('.sel-opi');
      ele.classList.remove("options-show");
  
      document.querySelectorAll('.player-mod').forEach((item)=>{
        item.classList.remove("play-mod-show");
      });
      
      const modvalue=item.dataset.mod;
      const modNam=item.innerHTML;
      if(modvalue=='0'){
       cellsDisplay(`<p class='mod-nam'>${modNam} Mode</p>`,item)
      }else if(modvalue=='1'){
        toss(`<p class='mod-nam'>${modNam} Mode</p>`,item);

      }

    });
    
  });
document.querySelector('.select-options').addEventListener('click',()=>{
  messageToPage('game-pad','');
      messageToPage('msg','');
      messageToPage('toss-area','')
  const ele=document.querySelector('.sel-opi');
  ele.classList.toggle("options-show");
  
  document.querySelectorAll('.player-mod').forEach((item)=>{
    item.classList.toggle("play-mod-show");
  });
});


}






////ALL FUNCTION FISRT CALL HERE///
selectOptionsDisplay();
