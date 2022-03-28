import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import StatusCode from '../interfaces/StatusCodes'
import { app } from '../app';
import { Response } from 'superagent';
import { PrismaClient, Users } from '@prisma/client';

chai.use(chaiHttp);

const { expect } = chai;
const prisma = new PrismaClient();

describe('Testa se e possivel logar o usuario atraves do endpoint /login', () => {
  describe('Se o email e a senha estao corretas', () => {
    let chaiHttpResponse: Response;
    const loginPayload = {
      user: {
        id: '1',
        name: 'Roberto',
        lastName: 'Vendedor',
        email: 'roberto@email.com',
        contact: 987654321,
        password: '$2b$10$Wqd2FoGq/7Rk3BUVR1tcMuitl.SX32bmFLz5lvXYu7VF0V7NXdrTO',//roberto_password
        addressId: 1,
      },
      token: 'bearer token'
    }
    const userPayload = {
      id: '1',
      name: 'Roberto',
      lastName: 'Vendedor',
      email: 'roberto@email.com',
      contact: 987654321,
      password: '$2b$10$Wqd2FoGq/7Rk3BUVR1tcMuitl.SX32bmFLz5lvXYu7VF0V7NXdrTO',//roberto_password
      addressId: 1,
    };

    let test: sinon.SinonStub;
    before(() => {
      test = sinon
        .stub(prisma.users, 'findUnique')
        .resolves( userPayload as Users);
    });
    after(()=>{
     test.restore();
    });

    it('Retorna os dados do usuario e um token', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/users/login')
         .set('X-API-Key', 'foobar')
         .send({ email: 'user@email.com', password: 'roberto_password' })

         console.log(chaiHttpResponse.body);
         
    //   expect(chaiHttpResponse).to.have.status(StatusCode.OK);
    //   expect(chaiHttpResponse.body).to.deep.equal(loginPayload);
    });
  });
});
