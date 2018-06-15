// var moment = require('moment');

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
        // let tableData = investments;
        // let investmentDataPromises = [];

        for(var i = 0; i<investments.length; i++) {

            // console.log(investments);
            // console.log(investments[i].symbol);
            let companyTicker = investments[i].symbol;
            let totalShares = investments[i].totalShares;
            let costBasis = investments[i].costBasis;
            let purchaseDate = investments[i].purchaseDate;

            const queryURL = 'https://api.iextrading.com/1.0/stock/' + companyTicker + '/book';

            // investmentDataPromises.push($.ajax({
            //     url: queryURL,
            //     method: 'GET',
            // }));

            $.ajax({
                url: queryURL,
                method: 'GET',
                }).then(function(response) {
                    // console.log(response);
                    // console.log(investments[i].symbol);
                    let marketValue = parseFloat(Math.round(totalShares * response.quote.latestPrice)).toFixed(0);
                    let originalCost = totalShares * costBasis;

                    // portfolioValue += marketValue; 
                    // console.log(marketValue);
                    // console.log(portfolioValue);
                    // let portfolioPercent = ((marketValue / portfolioValue) * 100);

                    // parseFloat(Math.round(num3 * 100) / 100).toFixed(2);

                    let rateOfReturn = parseFloat(Math.round(((marketValue - originalCost) / originalCost) * 100)).toFixed(1);
                    let gainLoss = Math.round(marketValue - originalCost);

                    $("#investmentTable").append("<tr><td>" + response.quote.companyName + "</td><td>" + companyTicker + "</td><td>" + totalShares + "</td><td>" + "$"+costBasis + "</td><td>" + purchaseDate + "</td><td>" + "$"+response.quote.latestPrice + "</td><td>" + "$"+marketValue + "</td><td>" + rateOfReturn+"%" + "</td><td>" + "$"+gainLoss + "</td></tr>");
                });    
        };

        // Promise.all(investmentDataPromises)
        // .then(function(response) {
        //     console.log(response);
        //     console.log(investments);

            // $("#investmentTable").append("<tr><td>" + response.quote.companyName + "</td><td>" + companyTicker + "</td><td>" + totalShares + "</td><td>" + "$"+costBasis + "</td><td>" + purchaseDate + "</td><td>" + "$"+response.quote.latestPrice + "</td><td>" + "$"+marketValue + "</td><td>" + portfolioPercent+"%" + "</td><td>" + rateOfReturn+"%" + "</td><td>" + "$"+gainLoss + "</td></tr>");

            // responses.forEach(function(response, i) {
            //     tableData[i]['latestPrice'] = response.quote.latestPrice;
            // });

            // console.log(tableData);
            // var investmentTr = ("<tr>");
            // investmentTr.append(numericTd(response.quote.latestPrice))
            // investmentTr.appendTo($('#investmentTable'));

        // });
        
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