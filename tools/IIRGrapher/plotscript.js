var layout1 = {
  xaxis: {
    type: 'log',
    autorange: true
  },
  xaxis2: {
    type: 'log',
    autorange: true
  },
  yaxis: {
    range:[-21,21]
  },
  yaxis2: {
    range:[-185,185]
  },
  grid: {rows: 1, columns: 2, pattern: 'independent'}
};
var bq = {a0 : 0, a1 : 0, a2 : 0, b0 : 0, b1 : 0, b2 : 0};

function FG_CalculateAllpass(f, q, sr, order){
    
    w = (2*3.1415926*f)/sr;
    
    if(order == 2){
        
        a = Math.sin(w)/(2*q);

        //second order
        a0 = 1+a;
        a1 = (-2*Math.cos(w))/a0; 
        a2 = (1-a       )/a0;
        
        b0 = (1-a       )/a0;
        b1 = (-2*Math.cos(w))/a0;
        b2 = (1+a       )/a0;
        
        a0 = 1;
        
    }
    
    else if(order == 1){
        
        //first order
        z = (1-Math.tan(w/2))/(1+Math.tan(w/2));

        a0 = 1;
        a1 = -z;
        a2 = 0;

        b0 = z;
        b1 = -1;
        b2 = 0;
    
    }
    
    return {a0: a0, a1: a1, a2: a2, b0: b0, b1: b1, b2: b2};
}

function FG_CalculateHighPass(f, q, sr){
    
    w = (2 * 3.1415926 * f/sr);
    a = Math.sin(w)/(2*q);
    cw = Math.cos(w);
    
    b0 =  (1+cw)/2;
    b1 =  -(1+cw);
    b2 =  (1+cw)/2;
    a0 =   1+a;
    a1 =  -2*cw;
    a2 =  (1-a);
    
    a1 = a1 / a0;
    a2 = a2 / a0;
    b0 = b0 / a0;
    b1 = b1 / a0;
    b2 = b2 / a0;
    a0 = 1;
    
    return {a0: a0, a1: a1, a2: a2, b0: b0, b1: b1, b2: b2};
}

function FG_CalculatePeakingBiquad(f, a, q, sr){
    
    /*
    //printf("BQ: Q %f\tF %f\tA %f\t%f\t%f\t%f\t%f\t%f\t%f \n" ,bq->q,bq->frequency,bq->amplitude,bq->b0,bq->b1,bq->b2,bq->a0,bq->a1,bq->a2);
    if(amplitude == 0){ //bypass filter
        FG_CalculatePassive(bq);
        return;
    }*/
    
    w0 = (2 * 3.14159265359 * f)/sr;

    A = Math.pow(10,(a/40));
    alpha = Math.sin(w0)/(2*q);

    
    a0 =  1 + alpha/A;
    b0 = ( 1 + alpha*A       )/a0;
    b1 = (-2 * Math.cos(w0)      )/a0;
    b2 = ( 1 - alpha*A       )/a0;
    a1 = (-2 * Math.cos(w0)      )/a0;
    a2 = ( 1 - alpha/A       )/a0;
    a0 = 1;
    
    return {a0: a0, a1: a1, a2: a2, b0: b0, b1: b1, b2: b2};

}

function calculateAmpAndPhaseAtF(bq, f, sr){
    
    w = (3.1415926*2*f)/sr;
    
    si2 = Math.sin(2*w);
    si = Math.sin(w);
    co2 = Math.cos(2*w);
    co = Math.cos(w);
    
    x = bq.a0 + bq.a1*co + bq.a2*co2;
    y = bq.a1*si + bq.a2*si2;
    
    c = bq.b0 + bq.b1*co + bq.b2*co2;
    d = bq.b1*si + bq.b2*si2;
    
    phase = Math.atan2((y*c-x*d),(c*x+d*y)); //phase
    //float result = 20*log10(sqrt(pow((c*x+d*y)/(x*x+y*y),2) + pow((y*c-x*d)/(x*x+y*y),2))); //db magnitude
    amp = 20*Math.log10(Math.sqrt(c*c+d*d)/Math.sqrt(x*x+y*y)); //db magnitude
    
    return [amp, phase];
    
}

function plotBQ(bq, sr, pts, start, end){
        
    var trace1 = {
        x: [],
        y: [],
        type: 'scatter',
        name:"dB"
    };
    var trace2 = {
        x: [],
        y: [],
        xaxis: 'x2',
        yaxis: 'y2',
        type: 'scatter',
        name:"phase(deg)"
    };

    beg = Math.log10(start);
    sto = Math.log10(end);
    dft = sto-beg;
    df = dft/pts;
    
    for(indx = 0; indx < pts; indx++){
        freq = Math.pow(10,beg+df*indx);
        point = calculateAmpAndPhaseAtF(bq,freq,sr);
        trace1.y.push(point[0]);
        trace1.x.push(freq);
        trace2.y.push(point[1]*180/3.14159265359);
        trace2.x.push(freq);
    }

    //return [trace1,trace2];
    Plotly.newPlot('ampGraph', [trace1,trace2], layout1);
    //Plotly.newPlot('phaseGraph', [trace2], layout2);
}

function testStuff(){
    a = Math.random()*20-10;
    bs = FG_CalculatePeakingBiquad(1000,a,1,96000);
    //am = calculateAmpAndPhaseAtF(bs,1000,96000);
    
    bla = plotBQ(bs, 96000, 1000, 10, 20000);
   
    Plotly.newPlot('myDiv', [bla], layout);
    
    bla = null;
    
}

var as = document.getElementById("amplitude");
var qs = document.getElementById("q");
var fs = document.getElementById("freq");

var at = document.getElementById("amplitudeText");
var qt = document.getElementById("qText");
var ft = document.getElementById("freqText");

var sel = document.getElementById("filttype");

as.oninput = function() {
    
    at.innerHTML = as.value+"db";
    
    switch(sel.options.selectedIndex){
        case 0:
            bs = FG_CalculatePeakingBiquad(Math.pow(10,1+parseFloat(fs.value)),as.value,qs.value,96000);
        break;
        case 1:
            bs = FG_CalculateHighPass(Math.pow(10,1+parseFloat(fs.value)),qs.value,96000);
        break;
        case 2:
            bs = FG_CalculateAllpass(Math.pow(10,1+parseFloat(fs.value)),qs.value,96000,2);
        break;
        case 3:

        break;
    }
    //am = calculateAmpAndPhaseAtF(bs,1000,96000);

    bla = plotBQ(bs, 96000, 1000, 10, 20000);

    bla = null;
    
}
qs.oninput = function() {
    
    qt.innerHTML = qs.value;
    
    switch(sel.options.selectedIndex){
        case 0:
            bs = FG_CalculatePeakingBiquad(Math.pow(10,1+parseFloat(fs.value)),as.value,qs.value,96000);
        break;
        case 1:
            bs = FG_CalculateHighPass(Math.pow(10,1+parseFloat(fs.value)),qs.value,96000);
        break;
        case 2:
            bs = FG_CalculateAllpass(Math.pow(10,1+parseFloat(fs.value)),qs.value,96000,2);
        break;
        case 3:

        break;
    }
    //am = calculateAmpAndPhaseAtF(bs,1000,96000);

    bla = plotBQ(bs, 96000, 1000, 10, 20000);

    //Plotly.newPlot('ampGraph', [bla[0]], layout);
    //Plotly.newPlot('phaseGraph', [bla[1]], layout);

    bla = null;
    
}
fs.oninput = function() {
    
    ft.innerHTML = Math.pow(10,1+parseFloat(fs.value))+"Hz";
    
    switch(sel.options.selectedIndex){
        case 0:
            bs = FG_CalculatePeakingBiquad(Math.pow(10,1+parseFloat(fs.value)),as.value,qs.value,96000);
        break;
        case 1:
            bs = FG_CalculateHighPass(Math.pow(10,1+parseFloat(fs.value)),qs.value,96000);
        break;
        case 2:
            bs = FG_CalculateAllpass(Math.pow(10,1+parseFloat(fs.value)),qs.value,96000,2);
        break;
        case 3:

        break;
    }
    //am = calculateAmpAndPhaseAtF(bs,1000,96000);

    bla = plotBQ(bs, 96000, 1000, 10, 20000);

    //Plotly.newPlot('ampGraph', [bla[0]], layout);
    //Plotly.newPlot('phaseGraph', [bla[1]], layout);

    bla = null;
    
}


at.innerHTML = as.value+"db";

bs = FG_CalculatePeakingBiquad(Math.pow(10,1+parseFloat(fs.value)),as.value,qs.value,96000);
//am = calculateAmpAndPhaseAtF(bs,1000,96000);

bla = plotBQ(bs, 96000, 1000, 10, 20000);

//Plotly.newPlot('ampGraph', [bla[0]], layout);
//Plotly.newPlot('phaseGraph', [bla[1]], layout);

bla = null;

function selectionchanged(){    
   
   console.log(sel.options.selectedIndex);
   
    switch(sel.options.selectedIndex){
        case 0:
            bs = FG_CalculatePeakingBiquad(Math.pow(10,1+parseFloat(fs.value)),as.value,qs.value,96000);
        break;
        case 1:
            bs = FG_CalculateHighPass(Math.pow(10,1+parseFloat(fs.value)),qs.value,96000);
        break;
        case 2:
            bs = FG_CalculateAllpass(Math.pow(10,1+parseFloat(fs.value)),qs.value,96000,2);
        break;
        case 3:

        break;
    }
   
    bla = plotBQ(bs, 96000, 1000, 10, 20000);

    bla = null;
}

sel.addEventListener("change", selectionchanged, false);