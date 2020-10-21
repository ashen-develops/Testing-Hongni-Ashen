const app = require('../api');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Get /apps', () => {
    it('should return a list of games sorted when rating is 4.5', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                let sort = true;
                let i = 0;
                while(i < res.body.length - 1){
                    const game = res.body[i]
                    const nextGame = res.body[i++]
                    if(game.Rating < nextGame.Rating) {
                        sort = false;
                        break;
                    }
                    if(game.App < nextGame.App){
                        sort = false;
                        break
                    }
                    i++
                }
                expect(sort).to.be.true;
            });

    });

    it('should return the name of genre matched', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body[0].Genres).contain(['Action'|| 'Puzzle'|| 'Strategy'|| 'Casual'|| 'Arcade'|| 'Card']);
            });
    });

});
