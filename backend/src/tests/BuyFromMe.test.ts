import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import StatusCode from '../interfaces/StatusCodes'
import { app } from '../app';
import { Response } from 'superagent';
import { PrismaClient, Users } from '@prisma/client';

chai.use(chaiHttp);
const { expect } = chai;
const client = new PrismaClient();

describe('1 - Testa se e possivel logar o usuario atraves do endpoint /login', () => {
  describe('1.1 - Se o email e a senha estao corretas', () => {
    let chaiHttpResponse: Response;
    const loginPayload = {
      user: {
        id: '1',
        username: 'user',
        email: 'user@email.com'
      },
      token: 'bearer token'
    }
    const userPayload = {
      id: '1',
      name: 'name',
      lastName: 'lastName',
      email: 'user@email.com',
      password: 'password',
      contact: 123456789,
      addressId: 1,
    }
    before(async () => {
      sinon
        .stub(client.users, 'findUnique')
        .resolves( userPayload as Users);
    });
    after(()=>{
      (client.users.findUnique as sinon.SinonStub).restore();
    });

    it('Retorna os dados do usuario e um token', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .set('X-API-Key', 'foobar')
         .send({ email: 'user@email.com', password: 'password' })
      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(chaiHttpResponse.body).to.deep.equal(loginPayload);
    });
  });
});
