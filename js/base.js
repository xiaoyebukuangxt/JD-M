/**
 * Created by Administrator on 2017/6/14.
 */
window.mjd={};

mjd.tap=function(obj,callback){
    if(typeof obj != 'object'){
        return
    }
    var duration = 300;
    var isMoved = false;
    var startTS = 0;
    obj.addEventListener('touchstart',function(e){
        startTS = Date.now()
    })
     obj.addEventListener('touchmove',function(e){
         isMoved = true
    })
     obj.addEventListener('touchend',function(e){
         if(Date.now()-startTS < duration &&  isMoved == false){
             if (callback){
                 callback(e);
             }
         }

         isMoved = false;
         startTS = 0;
    })


}

function changeShortcutState() {
    // 1.拿标签
    var base_header = document.getElementsByClassName('jd_base_header')[0];
    var btn = base_header.getElementsByClassName('icon_shortcut')[0];
    var shortcut = base_header.getElementsByClassName('shortcut')[0];

    // 添加点击事件
    mjd.tap(btn, function (e) {

        // 2.获取相关参数
        var shortcut_display_str = shortcut.style.display;
        // console.log('console.log(e); ',shortcut_display_str);
        // notice: 如果要获取元素的style的dispaly,需要在h5页面中的标签内,写它的style才能get到
        // 3.切换显示效果
        if (shortcut_display_str == 'table'){
            shortcut.style.display = 'none';
        }else if(shortcut_display_str == 'none'){
            shortcut.style.display = 'table';

        }
    });


}

