/* eslint-env node, mocha */

import chai from "chai"; // eslint-disable-line
import "mocha";
import * as sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import sinonStubPromise from 'sinon-stub-promise';
import { Client } from "ts-postgres";
import {
  totalGainsByCustomerId,
  totalTransactionAmountByCustomer,
  totalNumberOfTradesByCustomer,
} from "../../src/handlers/handler";
import TradeModel from "../../src/models/trade";

let sandbox;
let clientStub;
let connectStub;
let TradeHandler;
let modelStub;
const { expect } = chai;

const dbCredentials = {
  dbName: "octa",
  dbUser: "postgres",
  dbPass: "postgres",
  dbHost: "localhost",
};
sinonStubPromise(sinon);
chai.use(chaiAsPromised);

describe("Handler", () => {
  afterEach(() => {
    if (modelStub && modelStub.restore) {
      modelStub.restore();
    }
  })
  describe("totalGainsByCustomerId handler", () => {
    afterEach(() => {
      if (modelStub && modelStub.restore) {
        modelStub.restore();
      }
    })
    it('Returns query data', async () => {
      const dummyEvent = {
        queryStringParameters: {
          customerId: '1001'
        }
      };
      const dummyClient = new Client();
      connectStub = sinon.stub(dummyClient, "connect").returns(Promise.resolve(true));
      modelStub = sinon.stub(TradeModel.prototype, "totalSumByCustomerId").returns(Promise.resolve({
        "customer_1001": "£3"
      }));
      const results = await totalGainsByCustomerId(dummyEvent);
      const body = JSON.parse(results.body);
      expect(body.results['customer_1001']).to.equal("£3")
      modelStub.restore();
      connectStub.restore();
    });

    it('throws error if customer ID is malfomed', async () => {
      const dummyEvent = {
        queryStringParameters: {
          customerId: 'enfaefa efn23n 23nj3n3kj nfj'
        }
      };
      let out;
      const results = await totalGainsByCustomerId(dummyEvent);
      
      const body = JSON.parse(results.body);
      expect(body.message).to.equal("Please enter Valid ID");
    });
  });
  describe("totalTransactionAmountByCustomer handler", () => {
    afterEach(() => {
      if (modelStub && modelStub.restore) {
        modelStub.restore();
      }
    })
    it('Returns query data', async () => {
      const dummyEvent = {
        queryStringParameters: {
          customerId: '1001'
        }
      };
      const dummyClient = new Client();
      connectStub = sinon.stub(dummyClient, "connect").returns(Promise.resolve(true));
      modelStub = sinon.stub(TradeModel.prototype, "totalSumByCustomerId").returns(Promise.resolve({
        "customer_1001": "£3"
      }));
      const results = await totalTransactionAmountByCustomer(dummyEvent);
      const body = JSON.parse(results.body);
      expect(body.results['customer_1001']).to.equal("£3")
      modelStub.restore();
      connectStub.restore();
    });

    it('throws error if customer ID is malfomed', async () => {
      const dummyEvent = {
        queryStringParameters: {
          customerId: 'enfaefa efn23n 23nj3n3kj nfj'
        }
      };
      let out;
      const results = await totalTransactionAmountByCustomer(dummyEvent);
      
      const body = JSON.parse(results.body);
      expect(body.message).to.equal("Please enter Valid ID");
    });
  });
  describe("totalNumberOfTradesByCustomer handler", () => {
    afterEach(() => {
      if (modelStub && modelStub.restore) {
        modelStub.restore();
      }
    })
    it('Returns query data', async () => {
      const dummyEvent = {
        queryStringParameters: {
          customerId: '1001'
        }
      };
      const dummyClient = new Client();
      connectStub = sinon.stub(dummyClient, "connect").returns(Promise.resolve(true));
      modelStub = sinon.stub(TradeModel.prototype, "totalNumberOfTrades").returns(Promise.resolve({
        "customer_1234": "5 transactions"
      }));
      const results = await totalNumberOfTradesByCustomer(dummyEvent);
      const body = JSON.parse(results.body);
      modelStub.restore();
      connectStub.restore();
      expect(body.results['customer_1234']).to.equal("5 transactions")
    });

    it('throws error if customer ID is malfomed', async () => {
      const dummyEvent = {
        queryStringParameters: {
          customerId: 'enfaefa efn23n 23nj3n3kj nfj'
        }
      };
      let out;
      const results = await totalNumberOfTradesByCustomer(dummyEvent);
      
      const body = JSON.parse(results.body);
      expect(body.message).to.equal("Please enter Valid ID");
    });
  });
});
