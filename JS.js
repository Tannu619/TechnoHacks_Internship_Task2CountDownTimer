
var StopBtnFlag=0;
var StopBtnReff = document.getElementById("STOP");
StopBtnReff.addEventListener("click", () => {
    if(StopBtnFlag===0){
        alert("Please select time!!!");
    }
    else{
        StopBtnFlag = true;
        StopBtnReff.style.display = "none";
        ResetBtnReff.style.display = "block";
        ResumeBtnReff.style.display = "block";
        RestartBtnReff.style.display = "block";
    }
});

var ResumeBtnReff = document.getElementById("RESUME");
ResumeBtnReff.addEventListener("click", () => {
    StopBtnFlag = false;
    StopBtnReff.style.display = "block";
    HandleChange();
});

var ResetBtnReff = document.getElementById("RESET");
ResetBtnReff.addEventListener("click", () => {
    InputReff.value = "00:00:01";
    StopBtnFlag = true;
});

var PreviousHour;
var PreviousMinute;
var PreviousSecond;

var RestartBtnReff = document.getElementById("RESTART");
RestartBtnReff.addEventListener("click",function(){

    StopBtnFlag = true;

    var h = formateDate(PreviousHour);
    var m = formateDate(PreviousMinute);
    var s = formateDate(PreviousSecond);

    var StringTime = h+':'+m+':'+s;
    InputReff.value = StringTime;

    HandleChange();

});

//taking time as input and maintaining countdown
var InputReff = document.getElementById("Time");
InputReff.value = "00:00:01";

InputReff.addEventListener("change",HandleChange);

function formateDate(num){
    if(num>9){
        return num;
    }
    else {
        return `0${num}`;
    }
}

function HandleChange(){
    let [hours, minutes, seconds] = InputReff.value.split(":");
    // console.log(hours,minutes,seconds);
    
    var tempDate = new Date();
    tempDate.setHours(hours);
    tempDate.setMinutes(minutes);
    tempDate.setSeconds(seconds);

    PreviousHour = tempDate.getHours();
    PreviousMinute = tempDate.getMinutes();
    PreviousSecond = tempDate.getSeconds();

    // console.log(tempDate);
    StopBtnFlag = false;
    StopBtnReff.style.display = "block";
    ResetBtnReff.style.display = "none";
    ResumeBtnReff.style.display = "none";
    RestartBtnReff.style.display = "none";

    var SetInterFun = setInterval(()=>{
        if(StopBtnFlag==false){
            if(tempDate.getSeconds()==0 && tempDate.getHours()==0 && tempDate.getMinutes()==0){
                clearInterval(SetInterFun);
                StopBtnReff.style.display = "none";
                ResetBtnReff.style.display = "block";
                ResumeBtnReff.style.display = "none";
                RestartBtnReff.style.display = "block";
                var audio = new Audio('CoundownFinish.wav');
                audio.play();
            }
            else {
                seconds--;
                tempDate.setHours(hours);
                tempDate.setMinutes(minutes);
                tempDate.setSeconds(seconds);
    
                var h = tempDate.getHours();
                var m = tempDate.getMinutes();
                var s = tempDate.getSeconds();
    
                h = formateDate(h);
                m = formateDate(m);
                s = formateDate(s);

                var StringTime = h+':'+m+':'+s;
                // console.log(StringTime);
    
                InputReff.value = StringTime;
            }
        }
        else{
            clearInterval(SetInterFun);
        }
    },1000);
}