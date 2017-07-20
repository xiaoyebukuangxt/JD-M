/**
 * Created by HSAEE on 2017/6/17.
 */
window.onload=function(){
    changeShortcutState();

    ashcanClick();
    checkBoxClick()

}

function ashcanClick(){
    var all_ashcan = document.getElementsByClassName('delete_goods');
    var jd_cover = document.getElementsByClassName('jd_alert_cover')[0];
    var jd_alert = jd_cover.getElementsByClassName('jd_alert')[0];

    var cancle = jd_alert.getElementsByClassName('left_cancle')[0];
    var sure = jd_alert.getElementsByClassName('right_sure')[0];

    var up;
    for (var i = 0; i < all_ashcan.length; i++) {
        (function(index){
            var ashcan = all_ashcan[index];
            mjd.tap(ashcan,function(e){
                up = ashcan.getElementsByClassName('up')[0];
                 up.style.transition = 'all .2s ease'
                 up.style.webkeiTransition = 'all .2s ease'

                up.style.transformOrigin = 'left 3px'
                up.style.webkitTransformOrigin = 'left 3px'

                up.style.transform='rotate(-30deg)'
                up.style.webkitTransform='rotate(-30deg)'

                jd_cover.style.display = 'block';
                jd_alert.className = 'jd_alert jd_spring_jump'
            })

        })(i)

    }

    mjd.tap(cancle,function(e){
        up.style.transform = 'none';
        up.style.webkitTransform = 'none';
        setTimeout(function(){
            jd_cover.style.display = 'none';
        },500)
    })

    mjd.tap(sure,function(e){
        up.style.transform = 'none';
        up.style.webkitTransform = 'none';
        setTimeout(function(){
            jd_cover.style.display = 'none';

            for(var ele = up;ele.className != 'ul_shop_goods';ele=ele.parentNode){
                if(ele.className == 'goods'){
                    ele.parentNode.removeChild(ele)
                    break
                }

            }
        },500)


    })



}
function checkBoxClick(){
    var all_checkBox = document.getElementsByClassName('checkbox');
    for (var i = 0; i < all_checkBox.length; i++) {
        mjd.tap(all_checkBox[i],function(e){
            if(e.target.hasAttribute('checked')){
                e.target.removeAttribute('checked')
            }else{
                e.target.setAttribute('checked','')
            }
        })

    }

}