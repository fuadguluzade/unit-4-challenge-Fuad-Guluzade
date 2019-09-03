$(".yourCharacter").hide();
$(".enemiesSection").hide();
$(".fightSection").hide();
$(".defenderSection").hide();
var player;
var enemy;
var playerName;
var enemyName;
var playerHealthPoint;
var enemyHealthPoint;
var playerPower = 8;
var enemyPower = 25;
var chooseYourPlayer = true;
var imgArray = [$("#owk"), $("#ls"), $("#ds"), $("#dm")];


$(document).ready(function () {
    $(".imgIcon").on('click', function () {
        if (chooseYourPlayer) {
            player = $(this);
            imgArray.splice(player.index(), 1);
            $(".initImg").hide();
            $(".yourCharacter").append(player);
            playerName = $('.name', player).text();
            playerHealthPoint = $("#hp", player).text();
            $(".yourCharacter").show();

            for (var i = 0; i < imgArray.length; i++) {
                $(".enemiesSection").append(imgArray[i]);
            }

            $(".enemiesSection").show();
            chooseYourPlayer = false;
        } else {
            enemy = $(this);
            $(".defenderSection").append(enemy);
            enemyName = $('.name', enemy).text();
            enemyHealthPoint = $("#hp", enemy).text();
            $(".defenderSection").show();
            $(".fightSection").show();
        }
    });

    $("#buttonAttack").on('click', function () {
            $("#hp", enemy).text(enemyHealthPoint -= playerPower);
            $("#hp", player).text(playerHealthPoint -= enemyPower);
            $('#info1').text(`You attacked ${enemyName} for ${playerPower} damage`);
            playerPower += 8;
            $('#info2').text(`${enemyName} attacked you for ${enemyPower} damage`); 
            if (playerHealthPoint < 0 || enemyHealthPoint < 0) {
            if (playerHealthPoint >= enemyHealthPoint) {
                $(".defenderSection").hide();
                $("#info1").text(`You have defeated ${enemyName}, you can choose to fight another enemy`);
                $("#info2").text("");
            } else {
                $("#info1").text(`You been defeated by ${enemyName}... GAME OVER!!!`);
                $("#info2").text("");
                $(".controlArea").append("<button class='bordered'>Restart</Button>");
            }
        }
    });
});

