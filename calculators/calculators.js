var E6 = [ 10 , 15 , 22 , 33 , 47 , 68 ]

var E12 = [10 , 12 , 15 , 18 , 22 , 27 ,
           33 , 39 , 47 , 56 , 68 , 82   ]

var E24 = [ 10 , 11 , 12 , 13 , 15 , 16 ,
            18 , 20 , 22 , 24 , 27 , 30 ,
            33 , 36 , 39 , 43 , 47 , 51 ,
            56 , 62 , 68 , 75 , 82 , 91   ]

var E48 = [ 100 , 105 , 110 , 115 , 121 , 127 ,
            133 , 140 , 147 , 154 , 162 , 169 ,
            178 , 187 , 196 , 205 , 215 , 226 ,
            237 , 249 , 261 , 274 , 287 , 301 ,
            316 , 332 , 348 , 365 , 383 , 402 ,
            422 , 442 , 464 , 487 , 511 , 536 ,
            562 , 590 , 619 , 649 , 681 , 715 ,
            750 , 787 , 825 , 866 , 909 , 953   ]

var E96 = [ 100 , 102 , 105 , 107 , 110 , 113 , 115 , 118 ,
            121 , 124 , 127 , 130 , 133 , 137 , 140 , 143 ,
            147 , 150 , 154 , 158 , 162 , 165 , 169 , 174 ,
            178 , 182 , 187 , 191 , 196 , 200 , 205 , 210 ,
            215 , 221 , 226 , 232 , 237 , 243 , 249 , 255 ,
            261 , 267 , 274 , 280 , 287 , 294 , 301 , 309 ,
            316 , 324 , 332 , 340 , 348 , 357 , 365 , 374 ,
            383 , 392 , 402 , 412 , 422 , 432 , 442 , 453 ,
            464 , 475 , 487 , 499 , 511 , 523 , 536 , 549 ,
            562 , 576 , 590 , 604 , 619 , 634 , 649 , 665 ,
            681 , 698 , 715 , 732 , 750 , 768 , 787 , 806 ,
            825 , 845 , 866 , 887 , 909 , 931 , 953 , 976   ]

var E192 = [100 , 101 , 102 , 104 , 105 , 106 , 107 , 109 ,
            110 , 111 , 113 , 114 , 115 , 117 , 118 , 120 ,
            121 , 123 , 124 , 126 , 127 , 129 , 130 , 132 ,
            133 , 135 , 137 , 138 , 140 , 142 , 143 , 145 ,
            147 , 149 , 150 , 152 , 154 , 156 , 158 , 160 ,
            162 , 164 , 165 , 167 , 169 , 172 , 174 , 176 ,
            178 , 180 , 182 , 184 , 187 , 189 , 191 , 193 ,
            196 , 198 , 200 , 203 , 205 , 208 , 210 , 213 ,
            215 , 218 , 221 , 223 , 226 , 229 , 232 , 234 ,
            237 , 240 , 243 , 246 , 249 , 252 , 255 , 258 ,
            261 , 264 , 267 , 271 , 274 , 277 , 280 , 284 ,
            287 , 291 , 294 , 298 , 301 , 305 , 309 , 312 ,
            316 , 320 , 324 , 328 , 332 , 336 , 340 , 344 ,
            348 , 352 , 357 , 361 , 365 , 370 , 374 , 379 ,
            383 , 388 , 392 , 397 , 402 , 407 , 412 , 417 ,
            422 , 427 , 432 , 437 , 442 , 448 , 453 , 459 ,
            464 , 470 , 475 , 481 , 487 , 493 , 499 , 505 ,
            511 , 517 , 523 , 530 , 536 , 542 , 549 , 556 ,
            562 , 569 , 576 , 583 , 590 , 597 , 604 , 612 ,
            619 , 626 , 634 , 642 , 649 , 657 , 665 , 673 ,
            681 , 690 , 698 , 706 , 715 , 723 , 732 , 741 ,
            750 , 759 , 768 , 777 , 787 , 796 , 806 , 816 ,
            825 , 835 , 845 , 856 , 866 , 876 , 887 , 898 ,
            909 , 919 , 931 , 942 , 953 , 965 , 976 , 988   ]

function calculateVoltageDivider() { //only called from voltage_divider.html
    
    var table = document.getElementById("outTable");
    var searchValue = Number(document.getElementById("ratio").value);
    
    console.log(searchValue);
    
    table.innerHTML = "";
    var currentRow = table.insertRow(-1);
    currentRow.insertCell(-1);
    
    
    for(var index = 0; index < E96.length; index++){
        currentRow.insertCell(-1).innerHTML = E96[index];
    }
    
    
    for(var index = 0; index < E96.length; index++){
        
        currentRow = table.insertRow(-1);
        currentRow.insertCell(-1).innerHTML = E96[index];
        
        for(var i = 0; i < E96.length; i++){
            var attenuation = E96[index] / (E96[index] + E96[i]);
            var difference = Math.max(Math.min(Math.abs(searchValue - attenuation)*50,1),0);
            var cell = currentRow.insertCell(-1);
            cell.innerHTML = attenuation.toFixed(3);
            cell.style.backgroundColor = rgb(100*difference,(1-difference)*150,0);
        }
    }
    
} 

function calculateHPad() { //only called from voltage_divider.html
    
    var table = document.getElementById("outTable");
    var searchValue = Number(document.getElementById("ratio").value);
    
    console.log(searchValue);
    
    table.innerHTML = "";
    var currentRow = table.insertRow(-1);
    currentRow.insertCell(-1).innerHTML = "R2>";
    
    
    for(var index = 0; index < E192.length; index++){
        currentRow.insertCell(-1).innerHTML = E192[index];
    }
    
    
    for(var index = 0; index < E192.length; index++){
        
        currentRow = table.insertRow(-1);
        currentRow.insertCell(-1).innerHTML = E192[index];
        
        for(var i = 0; i < E192.length; i++){
            var attenuation = 1-((2*E192[index]) / ((2*E192[index]) + E192[i]));
            var difference = Math.max(Math.min(Math.abs(searchValue - attenuation)*50,1),0);
            var cell = currentRow.insertCell(-1);
            cell.innerHTML = attenuation.toFixed(3);
            cell.style.backgroundColor = rgb(100*difference,(1-difference)*150,0);
        }
    }
    
} 

function rgb(r, g, b){
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  return ["rgb(",r,",",g,",",b,")"].join("");
}