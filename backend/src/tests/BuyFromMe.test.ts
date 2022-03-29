import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import StatusCode from '../interfaces/StatusCodes'
import { app } from '../app';
import { Response } from 'superagent';
import { PrismaClient } from '@prisma/client';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint POST users/login', () => {
  describe('Se o campo email estiver vazio', () => {
    let chaiHttpResponse: Response;

    it('Retorna o erro  com status 400 e mensagem "email" is required', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/users/login')
         .set('X-API-Key', 'foobar')
         .send({ password: 'roberto_password' })
        
      expect(chaiHttpResponse).to.have.status(StatusCode.BAD_REQUEST);
      expect(chaiHttpResponse.body.error).to.be.equal('"email" is required');
    });
  });
  describe('Se o campo password estiver vazio', () => {
    let chaiHttpResponse: Response;

    it('Retorna o erro  com status 400 e mensagem "password" is required', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/users/login')
         .set('X-API-Key', 'foobar')
         .send({ email: 'roberto@email.com' })
        
      expect(chaiHttpResponse).to.have.status(StatusCode.BAD_REQUEST);
      expect(chaiHttpResponse.body.error).to.be.equal('"password" is required');
    });
  });
  describe('Se o email esta incorreto', () => {
    let chaiHttpResponse: Response;
    const prisma = new PrismaClient();

    let findUnique: sinon.SinonStub;
    before(() => {
      findUnique = sinon
        .stub(prisma.users, 'findUnique')
        .resolves(undefined);
    });
    after(()=>{
      findUnique.restore();
    });

    it('Retorna o erro "User not found"', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/users/login')
         .set('X-API-Key', 'foobar')
         .send({ email: 'robertos@email.com', password: 'roberto_password' })
          
      expect(chaiHttpResponse).to.have.status(StatusCode.NOT_FOUND);
      expect(chaiHttpResponse.body).to.deep.equal({ error: 'User not found' });
    });
  });
  describe('Se a senha esta incorreta', () => {
    let chaiHttpResponse: Response;
    const prisma = new PrismaClient();
    const userPayload = {
      id: '1',
      name: 'Roberto',
      lastName: 'Vendedor',
      email: 'roberto@email.com',
      contact: 987654321,
      password: '$2b$10$Wqd2FoGq/7Rk3BUVR1tcMuitl.SX32bmFLz5lvXYu7VF0V7NXdrTO',//roberto_password
      addressId: 1,
    };
    let findUnique: sinon.SinonStub;
    before(() => {
      findUnique = sinon
        .stub(prisma.users, 'findUnique')
        .resolves(userPayload);
    });
    after(()=>{
      findUnique.restore();
    });

    it('Retorna o erro "Invalid password"', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/users/login')
         .set('X-API-Key', 'foobar')
         .send({ email: 'roberto@email.com', password: 'roberto_passwo' })
          
      expect(chaiHttpResponse).to.have.status(StatusCode.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.deep.equal({ error: 'Invalid password' });
    });
  });
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
    let findUnique: sinon.SinonStub
    before(() => {
      const prisma =  new PrismaClient()
      findUnique = sinon.stub(prisma.users, 'findUnique').resolves(userPayload)
    });
    after(()=>{
      findUnique.restore();
    });

    it('Retorna os dados do usuario e um token', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/users/login')
         .set('X-API-Key', 'foobar')
         .send({ email: 'roberto@email.com', password: 'roberto_password' })
                  
      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(chaiHttpResponse.body.user).to.deep.equal(loginPayload.user);
      expect(chaiHttpResponse.body).to.have.deep.keys(loginPayload);
    });
  });
});

describe('Testa o endponit POST users', () => {
  describe('Se algum dos campos estiver vazio ou com o formato invalido', () => {
    let chaiHttpResponse: Response;

    it('Retorna o erro  com status 400 e mensagem "name" is required', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/users')
         .set('X-API-Key', 'foobar')
         .send({
          lastName: 'Vendedor',
          email: 'pedro@email.com',
          password: '123456789asd',
          contact: 31123456789,
          street: 'Avamarela',
          number: '500A',
          district: 'Santa Barbara',
          zipcode: 321654000,
          city: 'Santa Avamarela',
          statesId: 1
      })
        
      expect(chaiHttpResponse).to.have.status(StatusCode.BAD_REQUEST);
      expect(chaiHttpResponse.body.error).to.be.equal('"name" is required');
    });
    it('Retorna o erro  com status 400 e mensagem "number" is required', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/users')
         .set('X-API-Key', 'foobar')
         .send({
          name: 'Pedro',
          lastName: 'Vendedor',
          email: 'pedro@email.com',
          password: '123456789asd',
          contact: 31123456789,
          street: 'Avamarela',
          district: 'Santa Barbara',
          zipcode: 321654000,
          city: 'Santa Avamarela',
          statesId: 1
      })
        
      expect(chaiHttpResponse).to.have.status(StatusCode.BAD_REQUEST);
      expect(chaiHttpResponse.body.error).to.be.equal('"number" is required');
    });
    it('Retorna o erro  com status 400 e mensagem "contact" must be a number', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/users')
         .set('X-API-Key', 'foobar')
         .send({
          name: 'Pedro',
          lastName: 'Vendedor',
          email: 'pedro@email.com',
          password: '123456789asd',
          contact: '31123456789',
          street: 'Avamarela',
          number: '500A',
          district: 'Santa Barbara',
          zipcode: 321654000,
          city: 'Santa Avamarela',
          statesId: 1
      })
        
      expect(chaiHttpResponse).to.have.status(StatusCode.BAD_REQUEST);
      expect(chaiHttpResponse.body.error).to.be.equal('"contact" must be a number');
    });
  });
  describe.only('Se todos os dados estiverem corretos', () => {
    let chaiHttpResponse: Response;
    const prisma =  new PrismaClient()
    const userPayload = {
      id: '7e49fec8-f187-4b44-a9b4-a14e77adbb27',
      name: 'Pedro',
      lastName: 'Vendedor',
      email: 'pedro@email.com',
      password: '$2b$10$Me6r/JZt7R4w2fDhUpPrUuTJarRP2F1VLIEF6wP8QWnVA7n75lYcO',
      contact: 1058685717,
      addressId: 7
    }
    let findUnique: sinon.SinonStub
    before(() => {
      findUnique = sinon.stub(prisma.users, 'findUnique').resolves(undefined)
    });
    after(()=>{
      findUnique.restore();
    });
    it('Retorna o usuario criado', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/users')
         .set('X-API-Key', 'foobar')
         .send({
          name: 'Pedro',
          lastName: 'Vendedor',
          email: 'pedro@email.com',
          password: '123456789asd',
          contact: 31123456789,
          street: 'Avamarela',
          number: '500A',
          district: 'Santa Barbara',
          zipcode: 321654000,
          city: 'Santa Avamarela',
          statesId: 1
      })
        
      expect(chaiHttpResponse).to.have.status(StatusCode.CREATED);
      expect(chaiHttpResponse.body.error).to.be.equal('"name" is required');
    });
  });
})
