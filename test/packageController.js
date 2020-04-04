let mongoose = require("mongoose");
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let router = require('../app');
let should = chai.should();
let Package = require('../Models/PackageSchema')

chai.use(chaiHttp);

describe('Package', () => {
    before((done) => { //Before test we setUp a testing database
        mongoose.connect('mongodb://mongo:27017/hotel_api_testing',)    
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
            let package = {
                "type": "Standard Double Room",
                "genders": "male and female",
                "no_of_beds": "2",
                "cost": 70000
            }

        chai.request(router)
            .post('/api/package')
            .send(package)
            .end((err, res) => {
                console.log(res)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('cost');
            done();
            });
        });
    });

        describe('/GET packages', () => {
            it('it should GET all the package', (done) => {
                chai.request(router)
                    .get('/api/package')
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
                    package.save((err, package) => {
                        chai.request(router)
                            .delete('/api/package/' + package.id)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('msg').eql("Package deleted successfully");
                            done();
                        });
                    });
                });
            });
        });
