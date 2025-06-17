import { toss } from "./computer.js";

import { cellsDisplay } from "./twoPlayersMod.js";


function selectOptionsDisplay(){
  const html=`
  <select name="" class="sel-opti">
    <option  selected>chosse option</option>
    <option  class="player-mod" data-mod="0">🙎‍♂️vs🙎</option>
    <option class="player-mod" data-mod="1">🙎‍♂️ vs B🤖T</option> 
  </select> `;

  document.querySelector('.select-options').innerHTML=html;

  document.querySelectorAll('.player-mod').forEach((item)=>{
    item.addEventListener('click',()=>{
      const modvalue=item.dataset.mod;
      const modNam=item.innerHTML;
      if(modvalue=='0'){
       cellsDisplay(`<p class='mod-nam'>${modNam} Mode</p>`,item)
      }else if(modvalue=='1'){
        toss(`<p class='mod-nam'>${modNam} Mode</p>`,item);

      }

    });
    
  });

}






////ALL FUNCTION FISRT CALL HERE///
selectOptionsDisplay();