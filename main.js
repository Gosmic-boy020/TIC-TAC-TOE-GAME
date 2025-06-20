import { toss } from "./computer.js";

import { cellsDisplay } from "./twoPlayersMod.js";
import { messageToPage } from "./publicFunctions.js";

import { findValue } from "./computer.js";

//EventListener Here////////////////////////////////
  document.querySelectorAll('.play-btns').forEach((item)=>{
    item.addEventListener('click',()=>{
    const html=`
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
        toss(`<p class='mod-nam'>${modNam} Mode</p>`,item);

      }
      //console.log(item.dataset.mod)

    });
    
  });











////ALL FUNCTION FISRT CALL HERE///
