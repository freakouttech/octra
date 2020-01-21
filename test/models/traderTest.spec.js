/* eslint-env node, mocha */

import chai from "chai"; // eslint-disable-line
import "mocha";
import * as sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import sinonStubPromise from 'sinon-stub-promise';
import TradeModel from "../../src/models/trade";
let sandbox;
let queryStub;
const { expect } = chai;
sinonStubPromise(sinon);
chai.use(chaiAsPromised);
const dbCredentials = {
  dbName: "octa",
  dbUser: "postgres",
  dbPass: "postgres",
  dbHost: "localhost",
};

describe("TradeModel", () => {
  describe("TradeModel Constructor", () => {
    afterEach(() => {
      if(queryStub && queryStub.restore) {
        queryStub.restore();
      }
    })
    it("constructs", (done) => {
      const result = new TradeModel({});
      expect(result).to.have.own.property("client");
      done();
    });
  });
  describe("totalSumByCustomerId", () => {
    it("returns 13 when just customer id is provided", async () => {
      const trader = new TradeModel({query: () => {}});
      queryStub = sinon.stub(trader.client, "query").returns({
        rows: [[13]],
      });
      await trader.totalSumByCustomerId("gain_amount", 1001, {})
        .then((result) => {
          expect(result).to.have.own.property("customer_1001")
          expect(result["customer_1001"]).to.equal("£13.00");
        });
    });

    it("returns 5 when stockTypeId and Timestamp are provided", async () => {
      const trader = new TradeModel({query: () => {}});
      queryStub = sinon.stub(trader.client, "query").returns({
        rows: [[5]],
      });
      const dummyParams = {
        activityData: "2017/1/26",
        stockId: 101,
      }
      await trader.totalSumByCustomerId("gain_amount", 1002, dummyParams)
        .then((result) => {
          expect(result).to.have.own.property("customer_1002")
          expect(result["customer_1002"]).to.equal("£5.00");
        });
    });

    it("returns 0 when nothing is found", async () => {
      const trader = new TradeModel({query: () => {}});
      queryStub = sinon.stub(trader.client, "query").returns({
        rows: [[null]],
      });
      const dummyParams = {
        activityData: "2017/1/26",
        stockId: 101,
      }
      await trader.totalSumByCustomerId("gain_amount", 1006, dummyParams)
        .then((result) => {
          expect(result).to.have.own.property("customer_1006")
          expect(result["customer_1006"]).to.equal("£0");
        });
    });
  });

  describe("totalNumberOfTrades", () => {
    afterEach(() => {
      if(queryStub && queryStub.restore) {
        queryStub.restore();
      }
    })
    it("returns '5 transactions' when just customer id is provided", async () => {
      const trader = new TradeModel({query: () => {}});
      queryStub = sinon.stub(trader.client, "query").returns({
        rows: [[5]],
      });
      await trader.totalNumberOfTrades(1001, {})
        .then((result) => {
          expect(result).to.have.own.property("customer_1001")
          expect(result["customer_1001"]).to.equal("5 transactions");
        });
    });

    it("returns 15 when stockTypeId and Timestamp are provided", async () => {
      const trader = new TradeModel({query: () => {}});
      queryStub = sinon.stub(trader.client, "query").returns({
        rows: [[15]],
      });
      const dummyParams = {
        activityData: "2017/1/26",
        stockId: 101,
      }
      await trader.totalNumberOfTrades(1002, dummyParams)
        .then((result) => {
          expect(result).to.have.own.property("customer_1002")
          expect(result["customer_1002"]).to.equal("15 transactions");
        });
    });

    it("returns 0 when nothing is found", async () => {
      const trader = new TradeModel({query: () => {}});
      queryStub = sinon.stub(trader.client, "query").returns({
        rows: [],
      });
      const dummyParams = {
        activityData: "2017/1/26",
        stockId: 101,
      }
      await trader.totalNumberOfTrades(1006, dummyParams)
        .then((result) => {
          expect(result).to.have.own.property("customer_1006")
          expect(result["customer_1006"]).to.equal("0 transactions");
        });
    });
  });
});
