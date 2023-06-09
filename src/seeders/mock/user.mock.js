// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require("@faker-js/faker");

const getUserData = async () => {
  const userData = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 100; i++) {
    const user = {
      userName: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
      password: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
    };
    userData.push(user);
  }

  return userData;
};

module.exports = {
  getUserData,
};
