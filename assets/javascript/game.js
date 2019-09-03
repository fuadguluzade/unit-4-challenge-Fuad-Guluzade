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
var enemyPower;
var remainedEnemies = 3;
var chooseYourPlayer = true;
var defenderInArea = false;
var characterArray = [$("#owk"), $("#ls"), $("#ds"), $("#dm")];
$("#owk").attr("enemyPower", 10);
$("#ls").attr("enemyPower", 15);
$("#ds").attr("enemyPower", 20);
$("#dm").attr("enemyPower", 25);

function test() {
    console.log(characterArray.length);
}



$(document).ready(function () {
    $(".imgIcon").on('click', function () {
        if (chooseYourPlayer) {
            player = $(this);
            characterArray.splice(player.index(), 1);
            $(".initImg").hide();
            $(".yourCharacter").append(player);
            playerName = $('.name', player).text();
            playerHealthPoint = $("#hp", player).text();
            $(".yourCharacter").show();

            for (var i = 0; i < characterArray.length; i++) {
                $(".enemiesSection").append(characterArray[i]);
            }

            $(".enemiesSection").show();
            chooseYourPlayer = false;
        } else {
            enemy = $(this);
            $(".defenderSection").append(enemy);
            $(".enemiesSection").css("pointer-events", "none");
            enemyName = $('.name', enemy).text();
            enemyPower = enemy.attr("enemyPower");
            enemyHealthPoint = $("#hp", enemy).text();
            defenderInArea = true;
            $(".defenderSection").show();
            $(".fightSection").show();
        }
    });

    $("#buttonAttack").on('click', function () {
        test();
        if (!defenderInArea) {
            $("#info1").text("No enemy here");
            return;
        }
        $("#hp", enemy).text(enemyHealthPoint -= playerPower);
        $("#hp", player).text(playerHealthPoint -= enemyPower);
        $('#info1').text(`You attacked ${enemyName} for ${playerPower} damage`);
        playerPower += 8;
        $('#info2').text(`${enemyName} attacked you for ${enemyPower} damage`);
        if (playerHealthPoint < 0 || enemyHealthPoint < 0) {
            if (playerHealthPoint >= enemyHealthPoint && playerHealthPoint >= 0) {
                $(enemy).hide();
                defenderInArea = false;
                remainedEnemies--;
                $("#info1").text(`You have defeated ${enemyName}, you can choose to fight another enemy`);
                $("#info2").text("");
                $(".enemiesSection").css("pointer-events", "all");
                if (remainedEnemies == 0) {
                    $("#buttonAttack").hide();
                    $("#info1").text("YOU WON!!!  GAME OVER!!!");
                    $(".controlArea").append(createRestartButton());
                }
            } else {
                $("#buttonAttack").prop("disabled", true);
                $("#info1").text(`You been defeated by ${enemyName}... GAME OVER!!!`);
                $("#info2").text("");
                $(".controlArea").append(createRestartButton());
            }
        }
    });

    function createRestartButton() {
        var $btn = $('<button/>', {
            type: 'button',
            text: 'Restart',
            id: 'restart',
            class: 'bordered'
        }).click(restart);

        return $btn;
    }

    function restart() {
        location.reload();
    }

});

