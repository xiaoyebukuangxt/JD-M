/**
 * Created by HSAEE on 2017/6/15.
 */
window.onload=function(){
    changeTopAlpha()
    activeBanner()
    seckillTimer()
}

window.onresize=function(){
    setTimeout(function(){
        window.location.reload()
    },200)
}

function changeTopAlpha(){
    var jdtobbar=document.getElementsByClassName('jd_tobbar')[0]
    var jdbanner=document.getElementsByClassName('jd_banner')[0]

    var max=0.8;
    var min=0;
    var bannerH=jdbanner.offsetHeight;
    var alpha=0
    window.onscroll=function(){
        var scrollT=document.body.scrollTop
        if(scrollT<bannerH){
            alpha=(max-min)*scrollT/bannerH
        }else{
            alpha=max
        }
        jdtobbar.style.background='rgba(201, 21, 35,'+alpha+')'

    }


}

function activeBanner(){
    var banner=document.getElementsByClassName('jd_banner')[0];
    var oul=banner.getElementsByTagName('ul')[0];
    var ol=banner.getElementsByTagName('ol')[0];
    var imgs=oul.children
    var pages = ol.getElementsByTagName('li');

    var timer;
    var duration = 1000;
    var imgW=banner.offsetWidth;
    var imgCount=imgs.length;
    var index=1;
    var LeftX=-index*imgW

    var setTransition=function(){
        oul.style.transition='all .2s ease'
        oul.style.webkitTransition='all .2s ease'
    }
    var removeTransition=function(){
        oul.style.transition='none'
        oul.style.webkitTransition='none'
    }
    var translateX=function (x){
        oul.style.transform='translateX('+x+'px)'
        oul.style.webkitTransform='translateX('+x+'px)'
    }
    timer = setInterval(scrollImg,duration)
    function scrollImg(){
        index++;
        setTransition()
        LeftX=-index * imgW;
        translateX(LeftX)

    }
    oul.addEventListener('transitionend',keepIndexSafe)
    oul.addEventListener('webkitTransitionend',keepIndexSafe)

    function keepIndexSafe(){
        if(index >= imgCount-1){
            index = 1
        }else if(index<=0){
            index=imgCount-2
        }
        removeTransition();
        LeftX=-index * imgW;
        translateX(LeftX)
          for (var i = 0; i < pages.length; i++) {
         pages[i].className=''
         }

         pages[index-1].className='current'
    }

    var startX,movingX,changedX;
    startX=0;
    movingX=0;
    changedX=0;
    var tempLeftX=0;

    oul.addEventListener('touchstart',function(e){
        clearInterval(timer)
        startX= e.touches[0].clientX;
    })
 oul.addEventListener('touchmove',function(e){
     e.preventDefault()
     movingX= e.touches[0].clientX;
     changedX=movingX - startX
     removeTransition();
     tempLeftX = LeftX + changedX;
     translateX(tempLeftX);
})
    oul.addEventListener('touchend',function(e){
        if(changedX >0.49*banner.offsetWidth){
            index --
        }else if(changedX < -0.49*banner.offsetWidth){
            index ++
        }else{

        }
        timer = setInterval(scrollImg,duration);
        setTransition()

         LeftX=-index*imgW
        translateX(LeftX);


    })








}

function seckillTimer(){
    var seckill_left_link=document.getElementsByClassName('seckill_left_link')[0];
    var em_nth=seckill_left_link.getElementsByTagName('em')[0];
    var spans=seckill_left_link.getElementsByTagName('span')

    var duration=8;
    var nth=0
    var timer=setInterval(function(){
        var now=new Date();
        var hour=now.getHours();
        var min=now.getMinutes();
        var second=now.getSeconds();

        var h1= 0,m1= 0,s1=0;

        if(hour >=0&& hour<8){
            nth = 0;
        }else{
            nth=Math.floor(hour/duration)*duration
        }

        h1=(min == 0 && second ==0)? nth+duration-hour : nth+duration-hour-1;
        m1= (second == 0)? 60 -min:59-min;
        s1 = (second == 0) ? 0: 60-second

        em_nth.innerHTML = nth;
        spans[1].innerHTML = h1;
        spans[3].innerHTML = Math.floor(m1/10);
        spans[4].innerHTML = m1 % 10;
        spans[6].innerHTML = Math.floor(s1/10);
        spans[7].innerHTML = s1 % 10;;

    },1000)



}