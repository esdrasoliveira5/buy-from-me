// import * as sinon from 'sinon';
// import * as chai from 'chai';
// import chaiHttp = require('chai-http');

// import { app } from '../app';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Testa o endpoint /Login', () => {
//   describe('Se o email existe', () => {
//     let chaiHttpResponse: Response;
//     const newToken = new Token()
//     const loginPayload = {
//       user: {
//         id: 1,
//         username: 'Admin',
//         role: 'admin',
//         email: 'admin@admin.com'
//       },
//       token: newToken.generate(1, 'admin@admin.com')
//     }
//     const userPayload = {
//       id: 1,
//       username: 'Admin',
//       role: 'admin',
//       email: 'admin@admin.com',
//       password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
//     }
//     before(async () => {
//       sinon
//         .stub(Users, 'findOne')
//         .resolves( userPayload as Users);
//     });
//     after(()=>{
//       (Users.findOne as sinon.SinonStub).restore();
//     })
//     it('Retorna os dados do usuario cadastrado', async () => {
//       chaiHttpResponse = await chai
//          .request(app)
//          .post('/login')
//          .set('X-API-Key', 'foobar')
//          .send({ email: 'admin@admin.com', password: 'secret_admin' })
//       expect(chaiHttpResponse).to.have.status(StatusCodes.OK);
//       expect(chaiHttpResponse.body.user).to.deep.equal(loginPayload.user);
//     });
//   });
