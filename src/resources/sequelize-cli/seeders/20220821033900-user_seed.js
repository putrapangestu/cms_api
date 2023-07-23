'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

      await queryInterface.bulkInsert('users',[{
        name: "admin",
        email: "admin@admin.id",
        phone: "0879127972",
        password: await bcrypt.hash("passwordadmin",12),
        role: "admin"
      },{
        name: "user",
        email: "user@user.id",
        phone: "0879127972",
        password: await bcrypt.hash("passworduser",12),
        role: "user"
      }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users',null, {});
  }
};
