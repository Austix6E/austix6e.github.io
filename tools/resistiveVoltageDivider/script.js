

function calculateVoltageDivider() { //only called from voltage_divider.html
    
var decade = ['m','R','k','Meg'];
    var table = document.getElementById("outTable");
	
    var ratio = parseSizeFloat(document.getElementById("ratio").value);
	var r1 = parseSizeFloat(document.getElementById("r1").value);
	var r2 = parseSizeFloat(document.getElementById("r2").value);
    
    console.log(r1);
    console.log(r2);
    console.log(ratio);
	
	if(r1 < 0) document.getElementById("r1").value = "nein";
	if(r2 < 0) document.getElementById("r2").value = "nyet";
	if(ratio < 0 || ratio >= 1) document.getElementById("ratio").value = "nope";
	if(r1 > 0 && r2 > 0) document.getElementById("ratio").value = (r2/(r1+r2));
	else if(ratio > 0 && (r1 > 0 || r2 > 0)){
		
		if(r1 > 0){
			r2 = (ratio * r1)/(1 - ratio);
			var dec = Math.floor((Math.log10(r2)/3) + 1);
			if(dec < 0) dec = 0;
			if(dec > 3) dec = 3;
			document.getElementById("r2").value =  ''.concat(r2,decade[dec]);
		}else{
			r1 = ((1-ratio)*r2)/ratio;
			document.getElementById("r1").value = r1;
		}
		
	}
    
    // table.innerHTML = "";
    // var currentRow = table.insertRow(-1);
    // currentRow.insertCell(-1);
    
    // for(var index = 0; index < E96.length; index++){
        // currentRow.insertCell(-1).innerHTML = E96[index];
    // }
    
    
    // for(var index = 0; index < E96.length; index++){
        
        // currentRow = table.insertRow(-1);
        // currentRow.insertCell(-1).innerHTML = E96[index];
        
        // for(var i = 0; i < E96.length; i++){
            // var attenuation = E96[index] / (E96[index] + E96[i]);
            // var difference = Math.max(Math.min(Math.abs(searchValue - attenuation)*50,1),0);
            // var cell = currentRow.insertCell(-1);
            // cell.innerHTML = attenuation.toFixed(3);
            // cell.style.backgroundColor = rgb(100*difference,(1-difference)*150,0);
        // }
    // }
    
} 

function parseSizeFloat(input){
    
    if(Number.isNaN(Number.parseFloat(input))) return 0;
    
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    