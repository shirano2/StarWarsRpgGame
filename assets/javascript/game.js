$(document).ready(function(){

    var kenobi = {
        "Name":"Obi-Wan Kenobi",
        "Health Points":120,
        "Attack Power":8,
        "Counter Attack":24
    }
    var skywalker= {
        "Name":"Luke Skywalker",
        "Health Points":100,
        "Attack Power":6,
        "Counter Attack":5
    }
    var sidious = {
        "Name":"Darth Sidious",
        "Health Points":150,
        "Attack Power":10,
        "Counter Attack":20
    }
    var maul = {
        "Name":"Darth Maul",
        "Health Points":180,
        "Attack Power":12,
        "Counter Attack":25
    }
    
    var nameArray=["kenobi","skywalker","sidious","maul"];
    var characterArray=[kenobi,skywalker,sidious,maul];
    var isEnemy=false;
    var userIndex;
    var enemyIndex;
    var attackCount=0;
    var killNum=0;
    var userHp=0;
    var enemyHp=0;

    function reset() {
        isEnemy=false;
        attackCount=0;
        killNum=0;
        $(".restart").hide();
        $(".attack").show();
        $(".left").hide();
        $(".right").hide();
        $(".startMessage").show();
        $("#message1").text("");
        $("#message2").text("");
        for(var i=0; i<nameArray.length; i++) {
            $(".start").append($("#"+nameArray[i]).show().css("background-color","transparent"));
            $("span."+nameArray[i]).text(characterArray[i]["Health Points"]);
        }
    }

    function message(m) {
        if(m=="win") {
            $("#message1").text("You have defeated "+characterArray[enemyIndex]["Name"]+".");
            $("#message2").text("You can choose to fight another enemy.");
        } else if(m=="killAll") {
            $("#message1").text("You Won!!! GAME OVER");
            $("#message2").text("");
            $(".restart").show();
            $(".attack").hide();
        } else if(m=="lose") {
            $("#message1").text("You have been defeated.");
            $("#message2").text("GAME OVER");
            $(".restart").show();
            $(".attack").hide();
        } else {
            var message1="You attacked "+characterArray[enemyIndex]["Name"]+" for "+characterArray[userIndex]["Attack Power"]*attackCount+" damage";
            $("#message1").text(message1);
            var message2=characterArray[enemyIndex]["Name"]+" attacked you back for "+characterArray[enemyIndex]["Counter Attack"]+" damage";
            $("#message2").text(message2);
            $("span."+nameArray[enemyIndex]).text(enemyHP);
            $("span."+nameArray[userIndex]).text(userHP);
        }
    }

    $(".left").hide();
    $(".right").hide();
    $(".restart").hide();

    $(".start").on("click",function(e){
        var name=$(e.target).attr("class");
        if(nameArray.indexOf(name)>=0) {
            userIndex=nameArray.indexOf(name);
            userHP=characterArray[userIndex]["Health Points"];
            $(".you").append($("#"+name).css("background-color", "rgb(44, 144, 226)"));
            for(var i=0; i<nameArray.length;i++) {
                if(nameArray[i]!=name) {
                    $(".choose").append($("#"+nameArray[i]).css("background-color", "red"));
                }
            }
            $(".left").show();
            $(".startMessage").hide();
            $(".enemyMessage").show();
            $(".enemy").hide();
        }
    });

    $(".choose").on("click",function(e){
        if(isEnemy==false) {
            var name=$(e.target).attr("class");
            if(nameArray.indexOf(name)>=0) {
                enemyIndex=nameArray.indexOf(name);
                enemyHP=characterArray[enemyIndex]["Health Points"];
                $(".enemy").append($("#"+name).css("background-color", "black"));
            }
            isEnemy=true;
            $(".enemyMessage").hide();
            $(".enemy").show();
            $(".right").show();
        } 
    });
    
    $(".attack").on("click",function(e){
        if(isEnemy==true) {
            attackCount++;
            enemyHP=enemyHP-characterArray[userIndex]["Attack Power"]*attackCount;
            userHP=userHP-characterArray[enemyIndex]["Counter Attack"];
            message("attack");
            if(enemyHP<=0) {
                killNum++;
                isEnemy=false;
                $("#"+nameArray[enemyIndex]).hide();
                message("win");
                if(killNum==3) {
                    message("killAll");
                }
            }
            if(userHP<=0) {
                message("lose");
            }  
        } 
    });

    $(".restart").on("click",function(){
        reset();
    });
});