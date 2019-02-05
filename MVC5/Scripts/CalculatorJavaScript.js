$(document).ready(function () {
    "use strict"; // https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Strict_mode

    // VARIABLES
    var newCalculate = 0;

    var calc = $('.calculator'); // http://gearmobile.github.io/javascript/javascript-calculator/
    var calcDisplay = calc.find('#calculator_display');
    var calcButton = calc.find('.calculator_button');
    var calcComa = calc.find('.calculator_button_coma');
    var calcClear = calc.find('.calculator_clear');
    var calcEqual = calc.find('.calculator_key_equal');
    var calcSpace = calc.find('.calculator_backspace');
    var calcPower = calc.find('.calculator_power');

    // ADD NUMBERS TO TEXTBOX
    calcButton.click(function () { // Є і інші цікаві функції -> https://javascript.ru/forum/misc/48363-vyvesti-znachenie-knopki-v-tekstovoe-pole.html
        if (newCalculate === 1) {
            calcDisplay.val('');
            newCalculate = 0;
        }
        var buttonValue = calcDisplay.val() + $(this).val();
        calcDisplay.val(buttonValue);
    });

    // ADD COMA TO TEXTBOX
    calcComa.click(function () {
        if (newCalculate === 1) {
            calcDisplay.val('');
            newCalculate = 0;
        }
        //if (calcDisplay.val().search()) // - перевір чи є в останнй цифрі кома і якщо є блокуй введення!!!
        var buttonValue = calcDisplay.val() + $(this).val();
        calcDisplay.val(buttonValue);
    });

    // CLEAR TEXTBOX
    calcClear.click(function () {
        calcDisplay.val('');
    });

    // SEARCH AND REPLACE DOT    <--   ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?
    function CultivatedDot(entredCalkulate) {
        var string = "'" + entredCalkulate + "'";
        var cultivatedCalkulateDot = string.replace(/\./g, ',');
        var clear = cultivatedCalkulateDot.replace(/'/g, '');
        return clear;
    }

    // CLEAR ENTRED CALKULATE(entredCalkulate)
    function ClearEntredCalculate(entredCalkulate) {
        while (entredCalkulate.match(/,|÷|x/ig) !== null) { // 
            entredCalkulate = entredCalkulate.replace(/,/g, '.');
            entredCalkulate = entredCalkulate.replace(/÷/g, '/');
            entredCalkulate = entredCalkulate.replace(/x/ig, '*');
        }
        return entredCalkulate;
    }

    // SHOW RESULT
    calcEqual.on('click', function () {
        //debugger;
        var entredCalkulate = calcDisplay.val();
        var clearCalkulate = ClearEntredCalculate(entredCalkulate);
        var resulte;

        try {
            if (entredCalkulate === "" || entredCalkulate === null) {
                alert("You do`t entred function!");
                return;
            }
            else {
                resulte = eval(clearCalkulate);
                if (resulte === "=undefined") {
                    resulte = 'У ВВЕДЕНІЙ ФОРМУЛІ ПОМИЛКА! ПЕРЕВІРТЕ ФОРМУЛУ І ПОВТОРІТЬ СПРОБУ. зроби блок так, щоб він підлаштовув свої розміри під розмір вмісту. І встанови розміри через min!';
                    return;
                }
                resulte = entredCalkulate + "=" + resulte;
            }
        }
        catch (e) {
            document.getElementById('exeptionMessage').innerHTML = "There was an error while calculating the function!";
            document.getElementById('parent_popup').style.display = 'inline';
        }
        calcDisplay.val(resulte);
        newCalculate = 1;
    });

    // BACKSPACE BUTTON
    calcSpace.on('click', function () {
        calcDisplay.val(calcDisplay.val().substring(0, calcDisplay.val().length - 1));
    });

    // POWER BUTTON
    calcPower.on('click', function () {
        calcDisplay.val(Math.pow(eval(calcDisplay.val()), 2));
        newCalculate = 1;
    });



    ////////////////////////////////////////////
    // https://stackoverflow.com/questions/4911577/jquery-click-toggle-between-two-functions
    /////////////////////////////////////////////
    //var x = false;
    //$(element).on('click', function () {
    //    if (!x) {
    //        //function
    //        x = true;
    //    }
    //    else {
    //        //function
    //        x = false;
    //    }
    //});
    ////////////////////////////////////////////// ---------------------------
    //function toggleAB() {
    //    var el = this; // `this` is the "button" Element Obj reference`
    //    return [
    //        function () { console.log("b"); },
    //        function () { console.log("a"); }
    //    ][el.tog ^= 1]();
    //}

    //$("selector").click(toggleAB);
    //////////////////////////////////////////////
    //function a() { console.log("a"); }
    //function b() { console.log("b"); }
    //var ab = [a, b];

    //$("selector").click(function () {
    //    ab.reverse()[1](); // Reverse and Execute! // >> "a","b","a","b"...
    //});
    //////////////////////////////////////////////
    //jQuery.fn.clickToggle = function (a, b) {
    //    function cb() { [b, a][this._tog ^= 1].call(this); }
    //    return this.on("click", cb);
    //};
    //$("selector").clickToggle(function () {
    //    // Do something here
    //}, function () {
    //    // Do thething here
    //}); // (you can chain here other jQuery methods)
    ////////////////////////////////////////////// настуний не працював
    //function handler1() {
    //    alert('First handler: ' + $(this).text());
    //    $(this).one("click", handler2);
    //}
    //function handler2() {
    //    alert('Second handler: ' + $(this).text());
    //    $(this).one("click", handler1);
    //}
    //$("div").one("click", handler1);
    //////////////////////////////////////////////


    // SELECT DATA FROM SAVE CALCULATE ON CLICK TO REPEAT RESULT
    $('.SelectCalculate').click(function () {
        var selectRecord = this.innerText.split("=");
        calcDisplay.val(selectRecord[0]);
    }); // .toString([this])

    // SHOW/HIDE WINDOW WITH TEXT ERROR
    function HideWindowError() {
        document.getElementById('parent_popup').style.display = 'none';
    }
    $('.windowError').click(function () {
        HideWindowError();
    });
});