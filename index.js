let canvas = document.getElementById('mycanvas')
let ctx = canvas.getContext('2d')
let cnvmeasures = 500
let snkmeasures = 20 
let snkcolor = '#67eb34'

document.getElementById('mycanvas').width = cnvmeasures 
document.getElementById('mycanvas').height = cnvmeasures

/*the snake starts in the center*/
let x = cnvmeasures/2 - snkmeasures/2
let y = cnvmeasures/2 - snkmeasures/2
let fx = 0
let fy = 0
let score = 0
let L = 3
let tail = []
let head = []
let pos = []
let foodpos = []
let animation = null
/*start button*/
document.getElementById('startbutton').onclick = function (){
    document.getElementById('startbutton').disabled = true
    //create first food
    foodpos == foodcre(tail,head)
    /**reset button */
    document.getElementById('resetbutton').onclick = function (){
        location.reload()
    }
    /*make snake using info from track*/
    function snakecreation(x,y,snkmeasures,snkcolor,tail,L){
        ctx.beginPath()
        ctx.rect(x,y,snkmeasures,snkmeasures) 
        ctx.fillStyle = snkcolor
        ctx.fill()
        //ctx.stroke()
        ctx.beginPath()
        if(tail.length > 1){
            ctx.rect(tail[L-1][0],tail[L-1][1],snkmeasures,snkmeasures)
            ctx.fillStyle = 'white'
            ctx.fill()
            //ctx.stroke()
        }
        else{
            ctx.rect(tail[0],tail[1],snkmeasures,snkmeasures)
            ctx.fillStyle = 'white'
            ctx.fill()
            //ctx.stroke()
        }
    }
    //track length of the snake and which extra square to delete
    function track(tail,L,x,y,pos){
        if(tail.length < L && L > 1){
            pos = [x, y]
            tail.unshift(pos)
        }
        else if(tail.length == L){
            pos = [x, y]
            tail.pop()
            tail.unshift(pos)
        }
        else if(L == 1){
            tail = [[x, y]]
        }
    }
    //check win, loss and score
    function statuscheck(tail,head,foodpos){
        if(tail.length == (cnvmeasures-20)*(cnvmeasures-20)){
            clearInterval(animation)
            window.alert('you win')
            location.reload()
        }
        //collision with tail or border
        if(headcol(tail,head) == true || head[0] > 480 || head[1] > 480 || head[0] < 0 || head[1] < 0){
            clearInterval(animation)
            window.alert('you lost')
            location.reload()
        }
        //eating
        if(head[0] == foodpos[0] && head[1] == foodpos[1]){
            L += 1
            score += 1
            foodpos = foodcre(tail,head)
            document.getElementById('score').innerHTML = 'score: ' + score
        }


    }
    //to check if head hits the body
    function headcol(tail,head){
        let c = 0
        for(let i = 0; i < tail.length; ++i){
            for(let j = 0; j < 2; ++j){
                if(head[j] == tail[i][j]){
                    c += 1
                }
                if(c == 2){
                    return true
                }
            }
            c = 0
        }
        return false
    }
    //food creation
    function foodcre(tail,head){
        fx = Math.floor(Math.random()*((cnvmeasures-20)/20)) * 20
        fy = Math.floor(Math.random()*((cnvmeasures-20)/20)) * 20
        foodpos = [fx, fy]
        while(headcol(tail, foodpos) == true || (head[0] == foodpos[0] && head[1] == foodpos[1])){
            fx = Math.floor(Math.random()*24) * 20
            fy = Math.floor(Math.random()*24) * 20
            foodpos = [fx, fy]
        }
        ctx.beginPath()
        ctx.arc(fx+10,fy+10,snkmeasures/2,0,2*Math.PI)
        ctx.fillStyle = 'red'
        ctx.fill()
        return foodpos
    }
    /*movement*/
    window.addEventListener('keydown', movement)
    
    function movement(event){
        
        function arrowdown(){
            track(tail,L,x,y,pos,head)
            y += snkmeasures
            head = [x ,y]
            snakecreation(x,y,snkmeasures,snkcolor,tail,L)
            statuscheck(tail,head,foodpos)
        }
        function arrowup(){
            track(tail,L,x,y,pos,head)
            y -= snkmeasures
            head = [x ,y]
            snakecreation(x,y,snkmeasures,snkcolor,tail,L)
            statuscheck(tail,head,foodpos)
        }
        function arrowleft(){
            track(tail,L,x,y,pos,head)
            x -= snkmeasures
            head = [x ,y] 
            snakecreation(x,y,snkmeasures,snkcolor,tail,L)
            statuscheck(tail,head,foodpos)
        }
        function arrowright(){
            track(tail,L,x,y,pos,head)
            x += snkmeasures
            head = [x ,y] 
            snakecreation(x,y,snkmeasures,snkcolor,tail,L)
            statuscheck(tail,head,foodpos)
        }
        switch(event.key){
            case 'ArrowDown':
                clearInterval(animation)
                animation = setInterval(arrowdown, 80)
                break
            case 'ArrowUp':
                clearInterval(animation)
                animation = setInterval(arrowup, 80)
                break
            case 'ArrowRight':
                clearInterval(animation)
                animation = setInterval(arrowright, 80)
                break
            case 'ArrowLeft':
                clearInterval(animation)
                animation = setInterval(arrowleft, 80)
                break
        }

    }

}
