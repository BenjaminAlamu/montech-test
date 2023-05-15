require("dotenv").config();
process.env.PORT = 7777;
process.env.DB_CONN = `${process.env.DB_CONN}_test`;
const logger = require("../helpers/logger");
const { faker } = require("@faker-js/faker");

const mongoose = require("mongoose");
let app = require("../index");
let chai = require("chai");
let chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");
let should = chai.should();
let expect = chai.expect;
let assert = chai.assert;
const { User, Movie } = require("../models");
const moment = require("moment");

chai.use(chaiHttp);

const connectDB = async () => {
  logger.info("connecting to db");

  await mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

const clearDB = async () => {
  logger.warn("clearing db");
  await Promise.all(
    Object.values(mongoose.connection.collections).map(async (collection) =>
      collection.deleteMany()
    )
  );
};

//Our parent block
describe("Tests", async () => {
  beforeEach((done) => {
    //Before each test we empty the database
    // connectDB();
    // clearDB();
    done();
  });

  describe("/POST Successfully Create a Movie", () => {
    it("Successfully create a movie", async (done) => {
      const userData = {
        userName: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
        password: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
      };
      const poster = await User.create(userData);

      const movieData = {
        name: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
        year: faker.random.numeric(5),
        genre: faker.lorem.word(),
        rating: faker.lorem.word(),
      };

      const payload = {
        user: poster,
        iat: moment().unix(),
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      chai
        .request(app)
        .post("/api/v1/movie")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...movieData })
        .end((err, res) => {
          res.should.have.status(201);
          assert.isDefined(res.body.data);
          assert.isDefined(res.body.message);
          done();
        });
    });
  });

  describe("/POST Successfully Get a Movie", () => {
    it("Successfully get a Movie", async (done) => {
      const userData = {
        userName: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
        password: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
      };
      const poster = await User.create(userData);

      const movieData = {
        name: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
        year: faker.random.numeric(5),
        genre: faker.lorem.word(),
        rating: faker.lorem.word(),
        posterId: poster,
      };

      const payload = {
        user: poster,
        iat: moment().unix(),
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      const movie = await Movie.create(movieData);
      chai
        .request(app)
        .get(`/api/v1/movie/${movie._id}`)
        .end((err, res) => {
          console.log({ err });
          res.should.have.status(200);
          assert.isDefined(res.body.data);
          assert.isDefined(res.body.message);
          done();
        });
    });
  });

  describe("/POST Successfully Get all Movie", () => {
    it("Successfully get all Movie", async (done) => {
      const userData = {
        userName: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
        password: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
      };
      const poster = await User.create(userData);
      const payload = {
        user: poster,
        iat: moment().unix(),
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      const movieData = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= 5; i++) {
        let movie = {
          name: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
          year: faker.random.numeric(5),
          genre: faker.lorem.word(),
          rating: faker.lorem.word(),
          posterId: poster,
        };

        movieData.push(movie);
      }
      await Movie.create(movieData);
      chai
        .request(app)
        .get(`/api/v1/movie/all`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          assert.isDefined(res.body.data);
          assert.isDefined(res.body.message);
          done();
        });
    });
  });

  describe("/POST Successfully Update a movie", () => {
    it("Successfully update a movie", async (done) => {
      const userData = {
        userName: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
        password: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
      };
      const poster = await User.create(userData);

      const movieData = {
        name: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
        year: faker.random.numeric(5),
        genre: faker.lorem.word(),
        rating: faker.lorem.word(),
        posterId: poster,
      };

      const movie = await Movie.create(movieData);

      const payload = {
        user: poster,
        iat: moment().unix(),
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      chai
        .request(app)
        .put(`/api/v1/movie/${movie._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ cost: 100 })
        .end((err, res) => {
          res.should.have.status(200);
          assert.isDefined(res.body.data);
          assert.isDefined(res.body.message);
          done();
        });
    });
  });

  describe("/POST Successfully Delete a movie", () => {
    it("Successfully delete a movie", async (done) => {
      const userData = {
        userName: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
        password: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
      };
      const poster = await User.create(userData);

      const movieData = {
        name: `${faker.lorem.word()}-${faker.random.numeric(5)}`,
        year: faker.random.numeric(5),
        genre: faker.lorem.word(),
        rating: faker.lorem.word(),
        posterId: poster,
      };

      const movie = await Movie.create(movieData);

      const payload = {
        user: poster,
        iat: moment().unix(),
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      chai
        .request(app)
        .delete(`/api/v1/movie/${movie._id}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          assert.isDefined(res.body.data);
          assert.isDefined(res.body.message);
          done();
        });
    });
  });
});
