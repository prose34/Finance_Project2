module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('User', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        username: {
            type: Sequelize.TEXT
        },
 
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
        last_login: {
            type: Sequelize.DATE
        },
    });

    // User.associate = function(models) {
    //     // Associating User with Investments
    //     // When an User is deleted, also delete any associated Investments
    //     User.hasMany(models.Investment, {
    //       onDelete: "cascade"
    //     });
    // };
 
    return User;
 
}