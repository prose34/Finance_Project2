module.exports = function(sequelize, DataTypes) {

    var Investment = sequelize.define("Investment", {
        // Giving the Investment model a name type of String
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // insert here
            }
        },
        purchasePrice: {
            type: DataTypes.FLOAT(10, 2), //is this correct?
            allowNull: false,
            validate: {
                // insert here
            }
        },
        totalShares: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                // insert here
            }

        },
        purchaseDate: {
            type: DataTypes.DATE, //what is correct input format?
            allowNull: false,
            validate: {
                // insert here
            }
        },   
   
    });
    
    
    // add validation
   
    Investment.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Investment.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
    

    };
    
    return Investment;
}



  