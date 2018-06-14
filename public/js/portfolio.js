$(document).ready(function() {

    var investments;

    getInvestments();

    function getInvestments() {
        $.get("/api/portfolio", function(request, response) {
            investments = request
            // console.log(investments);
            initializeTable(investments);
            // console.log(request);
            // console.log(response);
        });
    };

    // console.log(investments);

    function initializeTable(investments) {
        $("#investmentTable").empty();

        let portfolioValue = 0;

        for(var i = 0; i<investments.length; i++) {

            // console.log(investments);
            // console.log(investments[i].symbol);
            let companyTicker = investments[i].symbol;
            let totalShares = investments[i].totalShares;
            let costBasis = investments[i].costBasis;
            let purchaseDate = investments[i].purchaseDate;

            const queryURL = 'https://api.iextrading.com/1.0/stock/' + companyTicker + '/book';

            $.ajax({
                url: queryURL,
                method: 'GET',
                }).then(function(response) {
                    // console.log(response);
                    // console.log(investments[i].symbol);
                    let marketValue = totalShares * response.quote.latestPrice;
                    let originalCost = totalShares * costBasis;

                    portfolioValue += marketValue; 
                    // console.log(marketValue);
                    // console.log(portfolioValue);
                    let portfolioPercent = Math.round(((marketValue / portfolioValue) * 100) * 100)/100;

                    let rateOfReturn = ((marketValue - originalCost) / (originalCost)) * 100;
                    let gainLoss = marketValue - originalCost;

                    $("#investmentTable").append("<tr><td>" + response.quote.companyName + "</td><td>" + companyTicker + "</td><td>" + totalShares + "</td><td>" + "$"+costBasis + "</td><td>" + purchaseDate + "</td><td>" + "$"+response.quote.latestPrice + "</td><td>" + "$"+marketValue + "</td><td>" + portfolioPercent+"%" + "</td><td>" + rateOfReturn+"%" + "</td><td>" + "$"+gainLoss + "</td></tr>");
                });    

            // $("#investmentTable").append("<tr><td>" + investments[i].symbol + "</td><td>" + investments[i].costBasis + "</td></tr>");
        };

        
    };



    $('#addInvestment').on('click', function() {

        event.preventDefault();

        var tickerInput = $("#tickerInput");
        var sharesInput = $("#sharesInput");
        var costBasisInput = $("#costBasisInput");
        var dateInput = $("#dateInput");

        createNewInvestment();

        function createNewInvestment() {

            // event.preventDefault();

            if (!tickerInput.val().trim() || !sharesInput.val().trim() || !costBasisInput.val().trim() || !dateInput.val().trim()) {
                alert("Please enter all investment information");
                // Add more user validation? Correct symbol, no more than # of shares, no higher than x share price?
                return;
            } else {
                var newInvestment = {
                    symbol: tickerInput.val().trim(),
                    totalShares: sharesInput.val().trim(),
                    costBasis: costBasisInput.val().trim(),
                    purchaseDate: dateInput.val().trim(),
                };
                // console.log(newInvestment);

                $.post("/api/portfolio", newInvestment);
                // $.post("/api/portfolio", newInvestment, getInvestments);

                tickerInput.val("");
                sharesInput.val("");
                costBasisInput.val("");
                dateInput.val("");

                getInvestments();
            }
        }
    });
});