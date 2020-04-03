let mongoose = require("mongoose");
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let router = require('../Routes/packageRoute');
let should = chai.should();
let Package = require('../Models/PackageSchema')

chai.use(chaiHttp);

describe('Package', () => {
    before((done) => { //Before test we setUp a testing database
        mongoose.connect("mongodb+srv://balogun:Balogun007.@hotel-api-blrc9.mongodb.net/test-try?retryWrites=true&w=majority", { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false
        })    
        .then(result=> {
            console.log("connected");
            done()
        })  
    });

    beforeEach((done) => { //Before each test we empty the database
        Package.deleteMany({}, (err) => { 
            done();           
        });        
    });

    describe('/POST package', () => {
        it('it should create a new package', (done) => {
            let package ={
                "type": "Standard Double Room",
                "genders": "male and female",
                "no_of_beds": "2",
                "cost": 70000
            }

        chai.request(router)
            .post('/')
            .send(package)
            .end((err, res) => {
                console.log(res)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('type');
            done();
            });
        });
    });

        describe('/GET packages', () => {
            it('it should GET all the package', (done) => {
                chai.request(router)
                    .get('/')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
                });
            });

            describe('/DELETE/:id Package', () => {
                it('it should DELETE a package given the id', (done) => {
                    let package = new Package({
                        "type": "Double Standard Room",
                        "genders": "male and female",
                        "no_of_beds": "4",
                        "cost": 80000
                    })
                    book.save((err, package) => {
                        chai.request(router)
                            .delete('/book/' + package.id)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('msg').eql('"Package deleted successfully"');
                            done();
                        });
                    });
                });
            });
        });
