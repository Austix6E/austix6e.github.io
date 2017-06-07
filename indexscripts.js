function randomFloat(a, b){
    var r =  (Math.random() * (b - a) + a);
    return r;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Star(material, x, y, size){
    this.size = size;

    this.obj = new THREE.Geometry();
    this.obj.vertices.push(new THREE.Vector3(0, 0, 0));
    this.obj.vertices.push(new THREE.Vector3(0, 0, -size));
    this.obj = new THREE.Line(this.obj, material);

    this.speed = randomFloat(1, 20);

    this.refresh = function(x, y){
        this.obj.position.z = randomFloat(0, -1000);
        this.obj.position.x = x;
        this.obj.position.y = y;
    }
    this.refresh(x, y);
}

function Starfield(size, width, height){
    this.stars = [];
    this.obj = new THREE.Group();

    this.size = size;
    this.width = width;
    this.height = height;

    var colors = [0x848484,0x777777,0xafafaf,0xffffff];


    this.init = function(){
        for(var i = 0; i < this.size; i++){
            this.material = new THREE.LineBasicMaterial({color: colors[getRandomInt(0,3)]});
            this.stars.push(new Star(this.material, randomFloat(-this.width, this.width), randomFloat(-this.width, this.width), randomFloat(5, 100)));
            this.obj.add(this.stars[i].obj);
        }

        scene.add(this.obj);
    }
    this.init();

    this.update = function(){
        this.obj.rotation = camera.rotation
        for(var i = 0; i < this.size; i++){
            if(this.stars[i].obj.position.z > 50){
                this.stars[i].refresh(randomFloat(-this.width, this.width), randomFloat(-this.width, this.width));
            }
            this.stars[i].obj.position.z += this.stars[i].speed;
        }
    }
}

var camera, renderer, scene, game, mouse, mouseDelta;
mouse = [0, 0];
mouseDelta = [0, 0];
window.onload = function(){
    init();
}

function init(){
    renderer = new THREE.WebGLRenderer({antialias: false});
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(20, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 50;
    scene.background = new THREE.Color(0x000000); //black background
    canvas = document.querySelector('#b canvas');
    
    stars = new Starfield(25, 20, 20);
    render();
}

window.onresize = function(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onmousemove = function(e){
    mouseDelta = [mouse[0] - e.clientX, mouse[1] - e.clientY];
    mouse = [e.clientX, e.clientY];

}


function render(){
    renderer.render(scene, camera);
    stars.update();

    requestAnimationFrame(render);
}
