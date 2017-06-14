var APP = window.APP = window.APP || {};

APP.cashier = (function() {

    var bindEventsToUI = function() {
        addListeners();
    };

    var addListeners = function() {
        $('.calculate').click(calculateChange);
        $('.status').click(getSatus);
        $('.clear').click(CashierRegister.clearCalculator);
    };

    var calculateChange = function() {
        var price = $('.price').val();
        var cash = $('.cash').val();

        var result = CashierRegister.getChange(
            parseInt(cash),
            parseInt(price), [{
                    name: 'HUNDRED',
                    ammount: parseInt($('.hundred').val())
                },
                {
                    name: 'TWENTY',
                    ammount: parseInt($('.twenty').val())
                },
                {
                    name: 'TEN',
                    ammount: parseInt($('.ten').val())
                },
                {
                    name: 'FIVE',
                    ammount: parseInt($('.five').val())
                },
                {
                    name: 'ONE',
                    ammount: parseInt($('.one').val())
                },
                {
                    name: 'QUARTER',
                    ammount: parseInt($('.quarter').val())
                },
                {
                    name: 'DIME',
                    ammount: parseInt($('.dime').val())
                },
                {
                    name: 'NICKEL',
                    ammount: parseInt($('.nickel').val())
                },
                {
                    name: 'PENNY',
                    ammount: parseInt($('.penny').val())
                }
            ]);

        if (typeof result === 'string') {
            $(".change").html(result);
            return;
        }

        if (result != null && result.length > 0) {
            if (result[0].denominations != null && result[0].denominations.length > 0) {
                if (!Array.isArray(result[0].denominations)) {
                    result = result[0].denominations;
                } else {
                    $(".change").html("$" + result[0].changeTotal);
                    changeResult = "";

                    for (i = 0; i < result[0].denominations.length; i++) {
                        var nameVal = result[0].denominations[i].name;
                        changeResult += nameVal + "'s: " + result[0].denominations[i].value + "<br />";
                    }
                    $(".changeDenominations").html(changeResult);
                    $(".log").append("price: " + price + " cash: " + cash + " change: " + result[0].changeTotal + "<br/>");
                    result = result[0].changeResult;


                }
                $(".change").html(result);
            }
        }

        getSatus();
    };

    var getSatus = function() {
        var denomStatusText = "";

        for (i = 0; i < CashierRegister.denomination.length; i++) {
            var nameVal = CashierRegister.denomination[i].name;
            var remain = CashierRegister.denomination[i].balance / CashierRegister.denomination[i].value;
            denomStatusText += nameVal + "'s:  " + remain + " <b>($" + CashierRegister.denomination[i].balance + ")</b> <br />";
        }

        $(".cashierStatus .initialCash").html("$" + CashierRegister.initialCash);
        $(".cashierStatus .soldAmmount").html("$" + CashierRegister.soldAmmount);
        $(".cashierStatus .totalAmount").html("$" + CashierRegister.getTotalAmmount());
        $(".cashierStatus .remainDenominations").html(denomStatusText);
    };

    var UpdateCashierRegister = function(denominationsResult) {


        for (i = 0; i < denominationsResult.length; i++) {
            var nameVal = denominationsResult[i].name;

            var reamainTotal = 0;

            if (denominationsResult.find(x => x.name === nameVal).value > 0) {
                reamainTotal = CashierRegister.denomination.find(x => x.name === nameVal).value * denominationsResult.find(x => x.name === nameVal).value;
                CashierRegister.denomination.find(x => x.name === nameVal).balance += -reamainTotal;
            }
        }

        //set cashier gobla values
        CashierRegister.soldAmmount += parseInt($('.price').val());
    }

    var getChangeDenominations = function(changeTotal) {

        //get the change with different available denominations, ej. (105 - (105 % 100)) / 100 = 1hundred
        var remainderOp = changeTotal;

        var hundred = (remainderOp - (remainderOp % 100)) / 100;
        remainderOp = remainderOp % 100;

        var twenty = (remainderOp - (remainderOp % 20)) / 20;
        remainderOp = remainderOp % 20;

        var ten = (remainderOp - (remainderOp % 10)) / 10;
        remainderOp = remainderOp % 10;

        var five = (remainderOp - (remainderOp % 5)) / 5;
        remainderOp = remainderOp % 5;

        var one = (remainderOp - (remainderOp % 1)) / 1;
        remainderOp = (remainderOp % 1) * 100;

        var quarter = (remainderOp - (remainderOp % 25)) / 25;
        remainderOp = remainderOp % 25;

        var dime = (remainderOp - (remainderOp % 10)) / 10;
        remainderOp = remainderOp % 10;

        var nickel = (remainderOp - (remainderOp % 5)) / 5;
        remainderOp = remainderOp % 5;

        var penny = (remainderOp - (remainderOp % 1)) / 1;

        var denominationsResult = [{
                name: 'HUNDRED',
                value: hundred
            },
            {
                name: 'TWENTY',
                value: twenty
            },
            {
                name: 'TEN',
                value: ten
            },
            {
                name: 'FIVE',
                value: five
            },
            {
                name: 'ONE',
                value: one
            },
            {
                name: 'QUARTER',
                value: quarter
            },
            {
                name: 'DIME',
                value: dime
            },
            {
                name: 'NICKEL',
                value: nickel
            },
            {
                name: 'PENNY',
                value: penny
            }
        ];

        if (hundred > (CashierRegister.denomination.find(x => x.name === "HUNDRED").balance / CashierRegister.denomination.find(x => x.name === "HUNDRED").value) ||
            twenty > (CashierRegister.denomination.find(x => x.name === "TWENTY").balance / CashierRegister.denomination.find(x => x.name === "TWENTY").value) ||
            ten > (CashierRegister.denomination.find(x => x.name === "TEN").balance / CashierRegister.denomination.find(x => x.name === "TEN").value) ||
            five > (CashierRegister.denomination.find(x => x.name === "FIVE").balance / CashierRegister.denomination.find(x => x.name === "FIVE").value) ||
            one > (CashierRegister.denomination.find(x => x.name === "ONE").balance / CashierRegister.denomination.find(x => x.name === "ONE").value) ||
            quarter > (CashierRegister.denomination.find(x => x.name === "QUARTER").balance / CashierRegister.denomination.find(x => x.name === "QUARTER").value) ||
            dime > (CashierRegister.denomination.find(x => x.name === "DIME").balance / CashierRegister.denomination.find(x => x.name === "DIME").value) ||
            nickel > (CashierRegister.denomination.find(x => x.name === "NICKEL").balance / CashierRegister.denomination.find(x => x.name === "NICKEL").value) ||
            penny > (CashierRegister.denomination.find(x => x.name === "PENNY").balance / CashierRegister.denomination.find(x => x.name === "PENNY").value)) {
            return "Insufficient Funds";
        } else {
            UpdateCashierRegister(denominationsResult);
        }

        return denominationsResult;
    };

    var CashierRegister = {
        initialCash: 100.00,
        soldAmmount: 0.00,
        denomination: [{
                name: 'HUNDRED',
                value: 100.00,
                balance: 0.00
            },
            {
                name: 'TWENTY',
                value: 20.00,
                balance: 60.00
            },
            {
                name: 'TEN',
                value: 10.00,
                balance: 10.00
            },
            {
                name: 'FIVE',
                value: 5.00,
                balance: 10.00
            },
            {
                name: 'ONE',
                value: 1.00,
                balance: 20.00
            },
            {
                name: 'QUARTER',
                value: 0.25,
                balance: 0.00
            },
            {
                name: 'DIME',
                value: 0.10,
                balance: 0.00
            },
            {
                name: 'NICKEL',
                value: 0.05,
                balance: 0.00
            },
            {
                name: 'PENNY',
                value: 0.01,
                balance: 0.00
            }
        ],
        getTotalAmmount: function() {
            return this.initialCash + this.soldAmmount;
        },
        getChange: function(cash, price, dCash) {
            var cashTotal = 0.00;
            var changeTotal = cash - price;

            for (i = 0; i < dCash.length; i++) {
                var nameVal = this.denomination[i].name;
                var addTotal = this.denomination.find(x => x.name === nameVal).value * dCash.find(x => x.name === nameVal).ammount;

                cashTotal += addTotal;
            }

            if (cash == 0) {
                return "Cash can't be $0";
            }

            if (cash < price) {
                return "Not enough cash";
            }

            if (cashTotal !== cash) {
                return "Cash and denomination doesn't match."
            }

            //update cashier denomination's amounts
            for (i = 0; i < this.denomination.length; i++) {
                var nameVal = this.denomination[i].name;
                var addTotal = this.denomination.find(x => x.name === nameVal).value * dCash.find(x => x.name === nameVal).ammount;
                this.denomination.find(x => x.name === nameVal).balance += addTotal;
            }

            return [{
                changeTotal: changeTotal,
                denominations: getChangeDenominations(changeTotal)
            }];

        },

        clearCalculator: function() {
            $('.cash').val('0');
            $('.price').val('0');
            $('.change').html('0');
        }
    };

    var init = function() {
        console.log('APP.cashier');
        //CashierRegister.init();
        bindEventsToUI();
    };

    return {
        init: init
    };
}());


$(document).ready(function() {
    if (document.URL.indexOf("cashier.html") >= 0) {
        APP.cashier.init();
    }
});