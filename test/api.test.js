const app = require('../api');
const supertest = require('supertest')
const { expect } = require('chai');

describe('Get /apps', () => {
    it('should return a list of games sorted when rating is 4.5', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body[0].Rating).equal(4.5)
                expect(res.body).contains(res.body[0])
            })

    });
})