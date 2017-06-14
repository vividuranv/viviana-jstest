var APP = window.APP = window.APP || {};

APP.pairwise = (function() {

    var arr = [];
    var matchIndices = [];

    var bindEventsToUI = function() {
        $('.btn-submit').click(getPairWise);
    };

    var getPairWise = function() {
        $(".pairwise__result").html(findPairs());
    }

    var findPairs = function() {
        var argument = parseInt($('.argument-val').val());
        arr = JSON.parse($('.array-val').val());
        var sum = 0;

        //go though all elements to start comparing
        for (var i = 0; i < arr.length - 1; i++) {
            //go though all elements for each i element to compare with j
            for (var j = i + 1; j < arr.length; j++) {
                var a = arr[i];
                var b = arr[j];
                //check if the add operation matches the argument value
                if ((a + b) === argument) {
                    //check if the elements haven't been entered before in the matchIndices array
                    if (!elementsExists(a, b)) {
                        //adds both index to the matchIndices
                        sum += i + j;
                        matchIndices.push([a, b]);
                    }
                }
            }
        }
        matchIndices = [];
        return sum;
    };

    var elementsExists = function(a, b) {
        var exists = false;
        var item;
        //go thought all the existing pairs previously pushed into matchIndices
        for (var k = 0; k < matchIndices.length; k++) {
            item = matchIndices[k];
            //test if the elements matches in any order
            if ((item[0] === a && item[1] === b) || (item[0] === b && item[1] === a)) {
                exists = true;
                break;
            }
        }
        return exists;
    }

    var init = function() {
        console.log('APP.pairwise');
        bindEventsToUI();
    };

    return {
        init: init
    };

}());

$(document).ready(function() {
    if (document.URL.indexOf("pairwise.html") >= 0) {
        APP.pairwise.init();
    }
});