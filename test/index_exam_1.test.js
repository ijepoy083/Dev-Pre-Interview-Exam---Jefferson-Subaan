const assert = require('assert');
const request = require('supertest');

const app = require('./index_exam_1');

describe('Phone Numbers API', () => {
    let server;

    beforeEach((done) => {
        server = app.listen(3000, () => {
            // Reset the server or the in-memory storage before each test
            request(server)
                .post('/reset')
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
        });
    });

    afterEach((done) => {
        server.close(done);
    });

    it('should create a new phone number', (done) => {
        request(server)
            .post('/phoneNumbers')
            .send({ phoneNumber: '1234567890' })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.body.message, 'Phone Number Successfully Added');
                assert.deepStrictEqual(res.body.Data, { id: 1, phoneNumber: '1234567890' });
                done();
            });
    });

    it('should retrieve a phone number by id', (done) => {
        request(server)
            .post('/phoneNumbers')
            .send({ phoneNumber: '1234567890' })
            .then(() => {
                request(server)
                    .get('/phoneNumbers/1')
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        assert.deepStrictEqual(res.body, { id: 1, phoneNumber: '1234567890' });
                        done();
                    });
            })
            .catch(err => done(err));
    });

    it('should update a phone number by id', (done) => {
        request(server)
            .post('/phoneNumbers')
            .send({ phoneNumber: '1234567890' })
            .then(() => {
                request(server)
                    .post('/phoneNumbers/1')
                    .send({ phoneNumber: '0987654321' })
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        assert.strictEqual(res.body.message, 'Phone Number Successfully Updated');
                        assert.deepStrictEqual(res.body.Data, { id: 1, phoneNumber: '0987654321' });
                        done();
                    });
            })
            .catch(err => done(err));
    });

    it('should delete a phone number by id', (done) => {
        request(server)
            .post('/phoneNumbers')
            .send({ phoneNumber: '1234567890' })
            .then(() => {
                request(server)
                    .post('/delete/phoneNumbers/1')
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        assert.strictEqual(res.body.message, 'Phone Number Successfully Deleted');
                        assert.deepStrictEqual(res.body.Data[0], { id: 1, phoneNumber: '1234567890' });
                        done();
                    });
            })
            .catch(err => done(err));
    });

    it('should return 404 for a non-existent phone number', (done) => {
        request(server)
            .get('/phoneNumbers/999')
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                assert.strictEqual(res.body.message, 'phoneNumber not found');
                done();
            });
    });
});
