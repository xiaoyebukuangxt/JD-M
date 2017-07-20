/**
 * Created by Administrator on 2017/6/15.
 */
window.onload = function () {
     // 重置main的高度
    resetMainH();
    activeCategoryMain();
    changeShortcutState()
}

window.onresize = function () {
    setTimeout(function () {
        resetMainH();
    }, 111);
}

/** 重置main的高度
 *  mainH = screenH - headerH
 * */
function resetMainH() {
    // 1.获取标签
    var header = document.getElementsByClassName('jd_base_header')[0];
    var mainBox = document.getElementsByClassName('jd_category_main')[0];
    // 2.获取用到的参数

    var screenH = window.screen.height;
    // console.log(window.screen.height);
    // console.log(window.screen.availHeight);
    var headerH = header.offsetHeight;
    var mainH = screenH - headerH;
    // 3.赋值
    mainBox.style.height = mainH + 'px';
}

function  activeCategoryMain(){
    // 1.拿到标签
    var mainBox = document.getElementsByClassName('jd_category_main')[0];
    var main_left = mainBox.getElementsByClassName('category_main_left')[0];
    var main_right = mainBox.getElementsByClassName('category_main_right')[0];
    var ul_list = main_left.getElementsByClassName('category_left_con')[0];
    var all_li = ul_list.getElementsByTagName('li');

    var ul_list_topY = 0;
    var maxY = 0;
    var minY= mainBox.offsetHeight - ul_list.offsetHeight;
    var bufferH=150;
    var buffer_minY = minY - bufferH;
    var buffer_maxY = maxY + bufferH;

    var startY,movingY,changedY;
    startY = 0;
    movingY = 0;
    changedY = 0;
    var tempY = 0;

    var setTransition = function(){
        ul_list.style.transition = 'all .2s ease'
        ul_list.style.webkitTransition = 'all .2s ease'
    }
     var removeTranstion = function(){
        ul_list.style.transition = 'none'
        ul_list.style.webkitTransition = 'none'
    }
     var translateY = function(y){
        ul_list.style.transform = 'translateY('+y+'px)'
        ul_list.style.webkitTransform = 'translateY('+y+'px)'
    }
    ul_list.addEventListener('touchstart',function(e){
        startY= e.touches[0].clientY
    })
     ul_list.addEventListener('touchmove',function(e){
         e.preventDefault();
         movingY= e.touches[0].clientY;
         changedY = movingY - startY;
         tempY=changedY + ul_list_topY
         removeTranstion()
         if(tempY > buffer_minY && tempY<buffer_maxY){
             translateY(tempY);
         }

    })
     ul_list.addEventListener('touchend',function(e){
        ul_list_topY = tempY;
         if(ul_list_topY > maxY){
             ul_list_topY = maxY;
             setTransition();
         }else if(ul_list_topY < minY){// 小于最小的,就变回最小的
             ul_list_topY = minY;
             setTransition();
         }else{
             removeTranstion()
         }
         translateY(ul_list_topY)
         startY = 0;
         movingY = 0;
         changedY = 0;
         tempY = 0;
    })

    mjd.tap(ul_list,function(e){
        var cur_li = e.target;
        if(e.target.parentNode.className == 'category_left_con'){
            cur_li = e.target;
        }else{
            cur_li = e.target.parentNode
        }

        if(cur_li.className == 'current'){
            setTransition();
            ul_list_topY = -cur_li.index * cur_li.offsetHeight;
           if(ul_list_topY < minY) ul_list_topY = minY;

            translateY(ul_list_topY)
            return
        }
        for (var i = 0; i < all_li.length; i++) {
            all_li[i].className = ""
            all_li[i].index = i
        }
        cur_li.className = 'current'
        setTransition();
        ul_list_topY = -cur_li.index * cur_li.offsetHeight;
        if(ul_list_topY < minY) ul_list_topY = minY;
        translateY(ul_list_topY)

        main_right.style.display = 'none';
        setTimeout(function(){
            main_right.style.display = 'block';
        },200)


    })



}