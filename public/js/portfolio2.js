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

    function renderNumericTd(number) {
        var td = $("<td>$" + number + "</td>");

        if (number > 0) {
            td.addClass('greenProfitFontColor');
        } else {
            td.addClass('redLossFontColor');
        }

        return td;
    }


    function renderNumericTdPercent(number) {
        var td = $("<td>" + number + "%</td>");

        if (number > 0) {
            td.addClass('greenProfitFontColor');
        } else {
            td.addClass('redLossFontColor');
        }

        return td;
    }


    function initializeTable(investments) {
        $("#investmentTable").empty();
        $("#totalProfitLossTable").empty();

        let investmentDataPromises = [];

        for(var i = 0; i<investments.length; i++) {

            // console.log(investments);
            // console.log(investments[i].symbol);
            let companyTicker = investments[i].symbol;

            const queryURL = 'https://api.iextrading.com/1.0/stock/' + companyTicker + '/book';

            investmentDataPromises.push($.ajax({
                url: queryURL,
                method: 'GET',
            }));
 
        };

        Promise.all(investmentDataPromises)
        .then(function(response) {
            console.log(response);
            console.log(investments);
            // console.log(investmentDataPromises);

            let portfolioValue = 0;    
            let totalProfitLoss = 0;  
            let totalInvestmentCost = 0;     

            // let marketValue = parseFloat(Math.round(totalShares * latestPrice)).toFixed(0);
            // portfolioValue += marketValue; 
            // let portfolioPercent = ((marketValue / portfolioValue) * 100);

            // let originalCost = totalShares * costBasis;
            // let rateOfReturn = parseFloat(Math.round(((marketValue - originalCost) / originalCost) * 100)).toFixed(1);
            // let gainLoss = Math.round(marketValue - originalCost);



            for (var i = 0; i < response.length; i++) {

                let latestPrice = response[i].quote.latestPrice;
                let totalShares = investments[i].totalShares;

                let marketValue = parseFloat(Math.round(totalShares * latestPrice)).toFixed(0);
                portfolioValue += parseFloat(marketValue); 

                // console.log(marketValue);
                // console.log(portfolioValue);
                // $("#investmentTable").append("<tr><td>" + companyName + "</td><td>" + companyTicker + "</td><td>" + totalShares + "</td><td>" + "$"+costBasis + "</td><td>" + purchaseDate + "</td><td>" + "$"+latestPrice + "</td><td>" + "$"+marketValue + "</td><td>" + portfolioPercent+"%" + "</td><td>" + rateOfReturn+"%" + "</td><td>" + "$"+gainLoss + "</td></tr>");
            }

            // console.log(portfolioValue)

            for (var i = 0; i < response.length; i++) {
                let companyName = response[i].quote.companyName;
                let latestPrice = parseFloat(response[i].quote.latestPrice).toFixed(2);
    
                let companyTicker = investments[i].symbol; 
                let totalShares = investments[i].totalShares;
                let costBasis = investments[i].costBasis;
                let purchaseDate = investments[i].purchaseDate;

                let marketValue = parseFloat(Math.round(totalShares * latestPrice)).toFixed(0);
                let portfolioPercent = parseFloat(((marketValue / portfolioValue) * 100)).toFixed(2);

                let originalCost = totalShares * costBasis;
                let rateOfReturn = parseFloat(Math.round(((marketValue - originalCost) / originalCost) * 100)).toFixed(1);
                let gainLoss = Math.round(marketValue - originalCost);

                totalInvestmentCost += Math.round((costBasis * totalShares));
                totalProfitLoss += gainLoss;


                // $("#investmentTable").append("<tr><td>" + companyName + "</td><td>" + companyTicker + "</td><td>" + totalShares + "</td><td>" + "$"+costBasis + "</td><td>" + purchaseDate + "</td><td>" + "$"+latestPrice + "</td><td>" + "$"+marketValue + "</td><td>" + portfolioPercent+"%" + "</td><td>" + rateOfReturn+"%" + "</td><td class='gainLossColor'>" + "$"+gainLoss + "</td></tr>");

                var row = $('<tr>');
                row.append($("<td>" + companyName + "</td>"));
                row.append($("<td>" + companyTicker + "</td)>"));
                row.append($("<td>" + totalShares + "</td>"));
                row.append($("<td>" + "$"+costBasis + "</td>"));
                row.append($("<td>" + purchaseDate + "</td>"));
                row.append($("<td>" + "$"+latestPrice + "</td>"));
                row.append($("<td>" + "$"+marketValue + "</td>"));
                row.append($("<td>" + portfolioPercent+"%" + "</td>"));
                row.append(renderNumericTdPercent(rateOfReturn));
                row.append(renderNumericTd(gainLoss));

                $("#investmentTable").append(row);                


                // var counter = 0;

                // $(".gainLossColor").each(function () {
                //     counter++;
                //     var currentCell = $(this);
                //     currentCell.addClass("row_"+counter);

                //     console.log(gainLoss);

                //     if(gainLoss > 0) {
                //         $('.row_'+counter).addClass("greenProfitFontColor");
                //     } else if (gainLoss < 0) {
                //         $('.row_'+counter).addClass("redLossFontColor");
                //     }


                // })
                
            }

            let overallROR = parseFloat(Math.round(((portfolioValue - totalInvestmentCost) / totalInvestmentCost) * 100)).toFixed(1);

            $("#totalProfitLossTable").append("<tr><td>" + "$"+totalInvestmentCost + "</td><td>" + "$"+portfolioValue + "</td><td class='rorColor'>" + overallROR+"%" +"</td><td class='totalGainLossColor'>" + "$"+totalProfitLoss+ "</td></tr>");

            // $(".rorColor").each(function () {

            // })
            if(overallROR > 0) {
                $(".rorColor").addClass("greenProfitFontColor")
            } else if (overallROR < 0) {
                $(".rorColor").addClass("redLossFontColor")
            }
            

            if(totalProfitLoss > 0) {
                $(".totalGainLossColor").addClass("greenProfitFontColor")
            } else if (totalProfitLoss < 0) {
                $(".totalGainLossColor").addClass("redLossFontColor")
            }

            if(totalInvestmentCost === 0) {
                $("#totalProfitLossTable").empty();
            }
            // $("#investmentTable").append("<tr><td>" + companyName + "</td><td>" + companyTicker + "</td><td>" + totalShares + "</td><td>" + "$"+costBasis + "</td><td>" + purchaseDate + "</td><td>" + "$"+latestPrice + "</td><td>" + "$"+marketValue + "</td><td>" + portfolioPercent+"%" + "</td><td>" + rateOfReturn+"%" + "</td><td>" + "$"+gainLoss + "</td></tr>");

            // $("#investmentTable").append("<tr><td>" + response.quote.companyName + "</td><td>" + companyTicker + "</td><td>" + totalShares + "</td><td>" + "$"+costBasis + "</td><td>" + purchaseDate + "</td><td>" + "$"+response.quote.latestPrice + "</td><td>" + "$"+marketValue + "</td><td>" + portfolioPercent+"%" + "</td><td>" + rateOfReturn+"%" + "</td><td>" + "$"+gainLoss + "</td></tr>");

        });
        
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