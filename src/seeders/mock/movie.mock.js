// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require("@faker-js/faker");

const getMovieData = async (users) => {
  const movieData = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 500; i++) {
    const movie = {
      name: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
      year: faker.random.numeric(5),
      genre: faker.lorem.word(),
      rating: faker.lorem.word(),
      posterId: faker.helpers.arrayElement([...users]),
    };

    movieData.push(movie);
  }

  return movieData;
};

module.exports = {
  getMovieData,
};
