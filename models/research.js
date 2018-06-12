module.exports = function(sequelize, DataTypes) {
    var Investment = sequelize.define("Investment", {
        // Giving the Investment model a name type of String
        name: DataTypes.STRING
    });
    
    return Investment;
}

// add validation, date, quantity, purchase price