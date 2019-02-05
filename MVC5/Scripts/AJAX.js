$(function () {
    var calcDisplay = $('#calculator_display');
    var calcDispla2 = $('#calculator_display');

    $(".calculator_key_equal").click(function () {
        makeRequest("Addalculate");
    });

    $(".calculator_power").click(function () {
        makeRequest("Addalculate");
    });

    $(".display_button_clear").click(function () {
        makeRequest("DeleteCalculate");
        document.getElementById("calculator_history").innerHTML = ""; // Так робити не правильно! Цей рядок повинен бути у вкладеній функції $.ajax у її властивості success. Та оскільки фиклик функції хоча і проходить успішно, проте спрацьовує блок error у$.ajax-функції і тому ти прописав цей рядок тут.
    });

    function makeRequest(nameAct) {
        // Отправка асинхронного запроса на сервер.
        // url - адрес ресурса, которому направляется запрос.
        // type - HTTP метод используемый для отправки запроса.
        // data - данные передаваемые на сервер.
        // success - функция, которая запустится при успешной обработке запроса.
        $.ajax({
            url: "AddDeleteCalculate", // ВИКЛИКАЄМО МЕТОД ДІЇ: ShowStoryColculate. | ПРИ РОЗМІЩЕНІ AJAX-СКРІПТА НА HTML-СТОРІНЦІ - ЗВЕРНЕННЯ ДО МЕТОДУ ДІЇ ЙДЕ ТАК: url: "@Url.Action("Home","AddDeleteCalculate")", | ІНОДІ ПОТРІБНО ВКАЗУВАТИ КОНТРОЛЕР, ІНОДІ НЕ ПОТРІБНО: потрібно - "Home/AddDeleteCalculate"; непотрібно - "Colculater/AddDeleteCalculate".
            type: "GET",
            data: {
                nameAct: nameAct,
                calculate: function () {
                    var calculate = $('#calculator_display').val();
                    if (calculate !== null) return calculate;
                }   // БУЛО: "nameAct=" + nameAct, || $('#calculator_display').val() | calcDisplay.val()  
            },
            success: function () {
                //UppdateCalculateDisplay();
                $.ajax({
                    url: "_ShowStoryColculate",// ВИКЛИКАЄМО МЕТОД ДІЇ: ShowStoryColculate. | ПРИ РОЗМІЩЕНІ AJAX-СКРІПТА НА HTML-СТОРІНЦІ - ЗВЕРНЕННЯ ДО МЕТОДУ ДІЇ ЙДЕ ТАК: url: "@Url.Action("Home","ShowStoryColculate")", | ІНОДІ ПОТРІБНО ВКАЗУВАТИ КОНТРОЛЕР, ІНОДІ НЕ ПОТРІБНО: потрібно - "$$/AddDeleteCalculate"; непотрібно - "Colculater/AddDeleteCalculate".
                    type: "GET",
                    success: function (dataResult) { //#111 Дана функція дозволяє очистити вміст об'єкту(table_calculator_history) і вставити в нього новий текст при умові що метод дії контролера до якго звертається дана AJAX-функція(AddDeleteCalculate) буде повертати наступний код: return Json(resulteAddData, JsonRequestBehavior.AllowGet); - див. самий контролер з тегом #111! ДОДАВ ДРУГИЙ КОМІТ

                        // ДАЛІ ЙДЕ БЛОК НЕРОБОЧИХ КОДІВ:
                        //var htmlObject = $(dataResult);
                        //var tr = $('dataResult tr: last')
                        //var regEx = /^\<tr\>((\s|[a-z]|[0-9]|[\D])*)\<\/tr\>\Z/ig; // ((\s|[a-z]|[0-9]|[\D])*)\<\/tr\>\Z
                        //var regEx2 = /\d*/ig;
                        //var regEx3 = /^tr/ig;
                        //var dataResult2 = dataResult.appendChild(textElem);
                        //var textElem = htmlObject.match(regEx2);
                        //var textElem2 = htmlObject.match(regEx3);
                        //var selected = $(htmlObject > tr);

                        document.getElementById("calculator_history").innerHTML = "";
                        //setTimeout($("#calculator_history").append(dataResult), 3000); - не працює
                        $("#calculator_history").append(dataResult);

                        //console.log("dataResult = " + htmlObject);
                        //console.log("typeof = " + typeof htmlObject);
                        //console.log("textElem2 = " + textElem);
                        //console.log("textElem3 = " + textElem2);
                        //console.log("selected = " + selected);

                        // ПОВТОРНО ДОДАЄШ ОБРОБНИКА ОСКІЛЬКИ НОВІ ОБ'ЄКТИ HTML, ЩО ДОДАНІ ЗА ДОПОМОГОЮ innerHTML НЕ МАЮТЬ ПРИКРІПЛЕНОГО ОБРОБНИКА!!!!
                        $('.SelectCalculate').click(function () {
                            var selectRecord = this.innerText.split("=");
                            calcDisplay.val(selectRecord[0]);
                        });
                    },
                    error: function () {
                        document.getElementById('exeptionMessage').innerHTML = "Don't call 'ShowStoryColculate' function!";
                        document.getElementById('parent_popup').style.display = 'inline';
                    }
                });
            },
            error: function () {
                document.getElementById('exeptionMessage').innerHTML = "Don't call 'AddDeleteCalculate' function!";
                document.getElementById('parent_popup').style.display = 'inline';
            } //

        });
    }
});

