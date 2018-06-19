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
        costBasis: {
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
            type: DataTypes.DATEONLY, //what is correct input format?
            allowNull: false,
            validate: {
                // insert here
            }
        },        
    });

    Investment.associate = function(models) {
        // We're saying that an Investment should belong to a User
        // An investment can't be created without a User due to the foreign key constraint
        Investment.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
    };
    
    return Investment;
}

// add validation
  

  