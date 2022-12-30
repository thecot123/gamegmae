
var canvas= document.getElementById('gamezone');
var context= canvas.getContext('2d');
var scoreshow=document.getElementById('score');

var birdimg= new Image();
var hinhnenchinh=new Image();
var ongtren= new Image();
var ongduoi=new Image();
birdimg.src="images/bird.png";
hinhnenchinh.src="images/nenchinh.png";
ongtren.src="images/ongtren.png";
ongduoi.src="images/ongduoi.png";


var score=0;
var khoangcachhaiong=140; 
var khoangcachdenongduoi; 

var bird={
    x: hinhnenchinh.width/5,
    y: hinhnenchinh.height/2
}
var ong=[]; //tạo mảng ống để chứa các ống di chuỷen
ong[0]={
    x:canvas.width,
    y:0 // khởi tạo ống đầu tiên nằm bên phải ngoài cùng và y=0;
}

//tạo function để chạy trò chơi
function run(){
    // load hình ảnh vào
    context.drawImage(hinhnenchinh,0,0);
    context.drawImage(birdimg,bird.x,bird.y);

    for(var i=0;i<ong.length;i++){
        khoangcachdenongduoi=ongtren.height+khoangcachhaiong;
        context.drawImage(ongtren,ong[i].x,ong[i].y);
        // vẽ ống trên theo tọa độ của ống đó
        //  ống dưới phụ thuộc ống trên
        context.drawImage(ongduoi,ong[i].x,ong[i].y+khoangcachdenongduoi);
        
        ong[i].x-=5; //để ống di chuyển

        
        if(ong[i].x ==canvas.width/2){
            ong.push({
                x:canvas.width,
                y:Math.floor(Math.random()*ongtren.height)-ongtren.height
                
            })
        }
        if(ong[i].x ==0 )ong.splice(0,1);
        
        if(ong[i].x==bird.x)score++;  
        // giờ làm cái khó nhất là thua  
        if(bird.y+birdimg.height==canvas.height||
        bird.x+birdimg.width>= ong[i].x && bird.x <= ong[i].x +ongtren.width
        && (bird.y<=ong[i].y+ongtren.height||
        bird.y +birdimg.height>= ong[i].y+ khoangcachdenongduoi)    
        ){
            return;
        }                   
    }
   


      
    // cho bird rơi xuống
    bird.y+=3;
    requestAnimationFrame(run);
}
//thêm function cho nó bay lên khi nhấn
document.addEventListener("mousedown",function(){
    bird.y-=72;   
})

run();