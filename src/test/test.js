process.env.NODE_ENV = 'TEST';

const chai = require("chai");
const chaiHttp = require("chai-http");
const _ = require("lodash");

//define server for test
const server = require("../../index");

//DBcontroller
const TestDbController = require("../controller/db/DbController.test");
const { resolve } = require("bluebird");

//set Chai-Http to use server and send request
chai.use(chaiHttp);


//test body
describe("API Test", () => {
    
    /**
     * @description DB prepare db before start test
     */
    describe('DB Preparation', () => {

        /**
         * @description clear test tabels with null
         */
        it("It should clear all test DB", (done) => {
            TestDbController.clearAllDataFromDB();
            resolve();
            done()
        })

        /**
         * @description fetch data and store on My SQL DB
         */
        it("Fetch Data and add to DB", (done) => {
            TestDbController.addDataToDB();
            resolve();
            done()
        })
    })


    /**
     * @description Api test here
     */
    describe("API Call", () => {

        /**
         * @description api with only timestamp query
         */
        it("Call '/api/v1/stations?timestamp'", async (done) => {
            chai.request(server)
                .get(`/api/v1/stations?at=${new Date(_.now()).toISOString()}`)
                .end(async (err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
            resolve();
            done();
        })

        /**
         * @description api with id and timestamp query
         */
        it("Call '/api/v1/stations/kioskId?timestamp'", async (done) => {
            chai.request(server)
                .get(`/api/v1/stations/${3004}?at=${new Date(_.now()).toISOString()}`)
                .end(async (err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
            resolve();
            done();
        })

        /**
         * @description send bad request and receive 404 status
         */
        it("Test 404 response", async (done) => {
            chai.request(server)
                .get(`/api/v1/stations/${0000}?at=${new Date(1000).toISOString()}`)
                .end(async (err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                })
            resolve();
            done();
        })
    })
})