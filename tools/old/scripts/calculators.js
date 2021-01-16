// var E6
// var E12
// var E24
// var E48
// var E96
// var E192

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

function calculateResistiveDivider(){
	
}

// function calculateBalTPad() { //only called from voltage_divider.html
    
    // var table = document.getElementById("outTable");
    // var searchValue = Number(document.getElementById("ratio").value);
    // var rOutValue = document.getElementById("rout").value;
    // var rInValue  = document.getElementById("rin") .value;
    
    // console.log(parseSizeFloat(rOutValue));
    
    // table.innerHTML = "";
    // var currentRow = table.insertRow(-1);
    // currentRow.insertCell(-1).innerHTML = "R2>";
    
    
    // for(var index = 0; index < E192.length; index++){
        // currentRow.insertCell(-1).innerHTML = E192[index];
    // }
    
    
    // for(var index = 0; index < E192.length; index++){
        
        // currentRow = table.insertRow(-1);
        // currentRow.insertCell(-1).innerHTML = E192[index];
        
        // for(var i = 0; i < E192.length; i++){
            // var attenuation = 1-((2*E192[index]) / ((2*E192[index]) + E192[i]));
            // var difference = Math.max(Math.min(Math.abs(searchValue - attenuation)*50,1),0);
            // var cell = currentRow.insertCell(-1);
            // cell.innerHTML = attenuation.toFixed(3);
            // cell.style.backgroundColor = rgb(100*difference,(1-difference)*150,0);
        // }
    // }
    
// } 

function parseSizeFloat(input){
    
    //if(Number.isNaN(Number.parseFloat(input))) return null;
    
    console.log(input);
    console.log(Number.parseFloat(input));
    
    var mul = 1;
    if(input.toString().includes("k") || input.toString().includes("K")) mul = 1000;
    else if(input.toString().includes("M")) mul = 1000000;
    else if(input.toString().includes("m")) mul = .001;
    else if(input.toString().includes("u") || input.toString().includes("U")) mul = .000001;
    
    return Number.parseFloat(input) * mul;
    
}

function rgb(r, g, b){
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  return ["rgb(",r,",",g,",",b,")"].join("");
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    