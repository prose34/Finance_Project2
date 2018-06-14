$(document).ready(function() {

    $('#searchTest').on('click', function() {

        event.preventDefault();
        let searchWord = $('#searchStock').val().trim();

        // const queryURL = 'https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v1/entries/en/' + searchWord;
        const queryURL = 'https://api.iextrading.com/1.0/stock/' + searchWord + '/stats';

        // https://api.iextrading.com/1.0/stock/aapl/stats


        $.ajax({
            url: queryURL,
            method: 'GET',
            }).then(function(response) {
                // console.log(response);

                //check if definition exists otherwise do error word not found
                
                // for (var i = 0; i < response.length; i++);
                // for (var property in response) {
                //     console.log(response[property]);
                //     $('#APIresponse').text(response[property]);
                // }

                $('#APIresponse').text(response.week52high - response.week52low);

                console.log(response.week52high - response.week52low);

                // var newWord = {
                //     word: searchWord,
                //     time: moment().format('MMMM Do YYYY, h:mm:ss a')
                // }

                // console.log(response);
                console.log(searchWord);
                // callGoogle();
            });   

    });

    $('#addInvestment').on('click', function() {

        event.preventDefault();

        var tickerInput = $("#tickerInput");
        var sharesInput = $("#sharesInput");
        var costBasisInput = $("#costBasisInput");
        var dateInput = $("#dateInput");

        createNewInvestment();

        function createNewInvestment(event) {

            // event.preventDefault();

            if (!tickerInput.val().trim() || !sharesInput.val().trim() || !costBasisInput.val().trim() || !dateInput.val().trim()) {
                alert("Please enter all investment information");
                return;
            } else {
                var newInvestment = {
                    symbol: tickerInput.val().trim(),
                    totalShares: sharesInput.val().trim(),
                    costBasis: costBasisInput.val().trim(),
                    purchaseDate: dateInput.val().trim(),
                };


                console.log(newInvestment);

                // $.post("/portfolio", newInvestment, getInvestments);
                // tickerInput.val("");
                // sharesInput.val("");
                // costBasisInput.val("");
                // dateInput.val("");
            }
        }


    });



});