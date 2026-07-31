rewireLoggingToElement(
    () => document.getElementById("log"),
    () => document.getElementById("log-container"), true);
    
function rewireLoggingToElement(eleLocator, eleOverflowLocator, autoScroll) {
    fixLoggingFunc('log');
    fixLoggingFunc('debug');
    fixLoggingFunc('warn');
    fixLoggingFunc('error');
    fixLoggingFunc('info');

    function fixLoggingFunc(name) {
        console['old' + name] = console[name];
        console[name] = function(...arguments) {
            const output = produceOutput(name, arguments);
            const eleLog = eleLocator();

            if (autoScroll) {
                const eleContainerLog = eleOverflowLocator();
                const isScrolledToBottom = eleContainerLog.scrollHeight - eleContainerLog.clientHeight <= eleContainerLog.scrollTop + 1;
                eleLog.innerHTML += output + "<br>";
                if (isScrolledToBottom) {
                    eleContainerLog.scrollTop = eleContainerLog.scrollHeight - eleContainerLog.clientHeight;
                }
            } else {
                eleLog.innerHTML += output + "<br>";
            }

            console['old' + name].apply(undefined, arguments);
        };
    }

    function produceOutput(name, args) {
        return args.reduce((output, arg) => {
            return output +
                "<span class=\"log-" + (typeof arg) + " log-" + name + "\">" +
                    (typeof arg === "object" && (JSON || {}).stringify ? JSON.stringify(arg) : arg) +
                "</span>&nbsp;";
        }, '');
    }
}

var e24array = [1.0,1.1,1.2,1.3,1.5,1.6,1.8,2.0,2.2,2.4,2.7,3.0,3.3,3.6,3.9,4.3,4.7,5.1,5.6,6.2,6.8,7.5,8.2,9.1];

function calculateVoltageDivider() { //only called from voltage_divider.html
    const af = new Intl.NumberFormat('en-US', { 
        signDisplay: 'always', 
        minimumFractionDigits: 10,      // Forces at least 2 decimal places
        maximumFractionDigits: 10
    });

    var decade = ['m','R','k','Meg'];
    var table = document.getElementById("outTable");
	
    var ratio = parseSizeFloat(document.getElementById("ratio").value);
	var r1 = parseSizeFloat(document.getElementById("r1").value);
	var r2 = parseSizeFloat(document.getElementById("r2").value);
	
	if(r1 < 0) document.getElementById("r1").value = "x > 0";
	if(r2 < 0) document.getElementById("r2").value = "x > 0";
	if(ratio < 0 || ratio >= 1) document.getElementById("ratio").value = "0 < x < 1";

	if(r1 > 0 && r2 > 0) console.info("ratio: " + (r2/(r1+r2)));

	else if(ratio > 0 && (r1 > 0 || r2 > 0)){
		
		if(r1 > 0){
			r2 = (ratio * r1)/(1 - ratio);
			var dec = Math.floor((Math.log10(r2)));

            console.info("R1: " + r1 + "&Omega; | R2: " + (r2) + "&Omega; | Ratio: " + ratio);
            console.log("");
            var re24 = findClosest(e24array,r2/(Math.pow(10,dec))) * Math.pow(10,dec);
            console.log("Closest E24: " + formatResistor(re24) + "&Omega; | Ratio: " + af.format(re24/(re24+r1)) + " | Diff: " + af.format((re24/(re24+r1))-ratio));
            console.log("");
            var re48 = Math.log10(r2/(Math.pow(10,dec)))*48;
            var he48 = (Math.pow(10,Math.ceil(re48)/48).toFixed(2)) * Math.pow(10,dec);
            var le48 = (Math.pow(10,Math.floor(re48)/48).toFixed(2)) * Math.pow(10,dec);
            console.log("High  E48: " + formatResistor(he48) + "&Omega; | Ratio: " + af.format(he48/(he48+r1)) + " | Diff: " + af.format((he48/(he48+r1))-ratio));
            console.log("Low   E48: " + formatResistor(le48) + "&Omega; | Ratio: " + af.format(le48/(le48+r1))+ " | Diff: " + af.format((le48/(le48+r1))-ratio));
            console.log("");
            var re96 = Math.log10(r2/(Math.pow(10,dec)))*96;
            var he96 = (Math.pow(10,Math.ceil(re96)/96).toFixed(2)) * Math.pow(10,dec);
            var le96 = (Math.pow(10,Math.floor(re96)/96).toFixed(2)) * Math.pow(10,dec);
            console.log("High  E96: " + formatResistor(he96) + "&Omega; | Ratio: " + af.format(he96/(he96+r1)) + " | Diff: " + af.format((he96/(he96+r1))-ratio));
            console.log("Low   E96: " + formatResistor(le96) + "&Omega; | Ratio: " + af.format(le96/(le96+r1))+ " | Diff: " + af.format((le96/(le96+r1))-ratio));
            console.log("");
            var re192 = Math.log10(r2/(Math.pow(10,dec)))*192;
            var he192 = (Math.pow(10,Math.ceil(re192)/192).toFixed(2)) * Math.pow(10,dec);
            var le192 = (Math.pow(10,Math.floor(re192)/192).toFixed(2)) * Math.pow(10,dec);
            console.log("High E192: " + formatResistor(he192) + "&Omega; | Ratio: " + af.format(he192/(he192+r1)) + " | Diff: " + af.format((he192/(he192+r1))-ratio));
            console.log("Low  E192: " + formatResistor(le192) + "&Omega; | Ratio: " + af.format(le192/(le192+r1))+ " | Diff: " + af.format((le192/(le192+r1))-ratio));
            console.log("");

		}else{
			r1 = ((1-ratio)*r2)/ratio;
            
			var dec = Math.floor((Math.log10(r1)));

            console.info("R1: " + r1 + "&Omega; | R2: " + r2 + "&Omega; | Ratio: " + ratio);
            console.log("");
            var re24 = findClosest(e24array,r1/(Math.pow(10,dec))) * Math.pow(10,dec);
            console.log("Closest E24: " + formatResistor(re24) + "&Omega; | Ratio: " + af.format(r2/(r2+re24)) + " | Diff: " + af.format((r2/(r2+re24))-ratio));
            console.log("");
            var re48 = Math.log10(r1/(Math.pow(10,dec)))*48;
            var he48 = (Math.pow(10,Math.ceil(re48)/48).toFixed(2)) * Math.pow(10,dec);
            var le48 = (Math.pow(10,Math.floor(re48)/48).toFixed(2)) * Math.pow(10,dec);
            console.log("High  E48: " + formatResistor(he48) + "&Omega; | Ratio: " + af.format(r2/(r2+he48)) + " | Diff: " + af.format((r2/(r2+he48))-ratio));
            console.log("Low   E48: " + formatResistor(le48) + "&Omega; | Ratio: " + af.format(r2/(r2+le48))+ " | Diff: " + af.format((r2/(r2+le48))-ratio));
            console.log("");
            var re96 = Math.log10(r1/(Math.pow(10,dec)))*96;
            var he96 = (Math.pow(10,Math.ceil(re96)/96).toFixed(2)) * Math.pow(10,dec);
            var le96 = (Math.pow(10,Math.floor(re96)/96).toFixed(2)) * Math.pow(10,dec);
            console.log("High  E96: " + formatResistor(he96) + "&Omega; | Ratio: " + af.format(r2/(r2+he96)) + " | Diff: " + af.format((r2/(r2+he96))-ratio));
            console.log("Low   E96: " + formatResistor(le96) + "&Omega; | Ratio: " + af.format(r2/(r2+le96))+ " | Diff: " + af.format((r2/(r2+le96))-ratio));
            console.log("");
            var re192 = Math.log10(r1/(Math.pow(10,dec)))*192;
            var he192 = (Math.pow(10,Math.ceil(re192)/192).toFixed(2)) * Math.pow(10,dec);
            var le192 = (Math.pow(10,Math.floor(re192)/192).toFixed(2)) * Math.pow(10,dec);
            console.log("High E192: " + formatResistor(he192) + "&Omega; | Ratio: " + af.format(r2/(r2+he192)) + " | Diff: " + af.format((r2/(r2+he192))-ratio));
            console.log("Low  E192: " + formatResistor(le192) + "&Omega; | Ratio: " + af.format(r2/(r2+le192))+ " | Diff: " + af.format((r2/(r2+le192))-ratio));
            console.log("");
		}
		
	}
    
} 

const findClosest = (arr, target) => 
  arr.reduce((prev, curr) => Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);

function formatResistor(ohms, sigDigits = 3) {
  //ai may be sloppy but damn if its not useful
  if (!isFinite(ohms)) return String(ohms);
  const sign = ohms < 0 ? '-' : '';
  const v = Math.abs(ohms);

  if (v === 0) return '0';

  let scaled;
  let suffix = '';

  if (v >= 1e6) {
    scaled = v / 1e6;
    suffix = 'M';
  } else if (v >= 1e3) {
    scaled = v / 1e3;
    suffix = 'k';
  } else if (v >= 1) {
    scaled = v;
    suffix = 'R';
  } else {
    // use milliohms for values < 1 ohm
    scaled = v * 1e3;
    suffix = 'm';
  }

  // Format to sigDigits significant figures and strip unnecessary zeros
  const formatted = parseFloat(scaled.toPrecision(sigDigits)).toString();
  return sign + formatted + suffix;
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    