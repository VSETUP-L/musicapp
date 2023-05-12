function getcookie(){

}
function setcookie(jsonobj,day){
    //设置过期时间
    let losttime=new Date().getTime()+day*24*60*60*1000
    for(var key in jsonobj){
        document.cookie=key+'='+jsonobj[key]+';losttime='+losttime
    }
}
function clearcookie(){

}