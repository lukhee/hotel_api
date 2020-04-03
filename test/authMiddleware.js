const {expect} = require('chai')
const sinon = require('sinon')
const authMiddleware = require('../middleware/auth')
const jwt = require('jsonwebtoken')

describe('Unit testing for auth-middleware', function() {
    it('it should check if token is null', function(){
        const req = {
            header: function(){
                return null
            }
        }

    expect(authMiddleware.bind(this,req, {}, ()=>{})).to.throw()
    });

    it('Should yield user after verifying token', function(){
        const req = {
            header: function(headerName){
                return "djfkalsdjfaslfjdlas"
            },
        }

        sinon.stub(jwt, "verify");
        jwt.verify.returns({user: "abc"})
        authMiddleware(req, {}, ()=>{})
        expect(req).to.have.property('user')
        expect(req).to.have.property('user', 'abc')
        expect(jwt.verify.called).to.be.true
        jwt.verify.restore()
    });
});