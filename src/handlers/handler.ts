"use strict";

import { Client } from "ts-postgres";
import TradeModel from "./../models/trade";
// the total gain amount for a given customer,
const totalGainsByCustomerId = async (event: any) => {
  const client = new Client({
    host: "localhost",
    database: "octra",
    user: "postgres",
    password: "postgres",
    port: 5432,
  });
  await client.connect();
  if (!client) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Unexpected Error",
        },
        null,
        2,
      ),
    };
  }
  const trade = new TradeModel(client);
  const customerId =
    event.queryStringParameters &&
    event.queryStringParameters.customerId ?
    parseInt(event.queryStringParameters.customerId, 10) :
    false;
  if (!customerId) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Please enter Valid ID",
        },
        null,
        2,
      ),
    };
  }
  try {
    const results = await trade.totalSumByCustomerId("gain_amount", customerId, event.queryStringParameters);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          results,
        },
        null,
        2,
      ),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          error,
        },
        null,
        2,
      ),
    };
  } finally {
     await client.end();
  }
};

// the total transaction amount for a given customer, and
const totalTransactionAmountByCustomer = async (event: any) => {
  const client = new Client({
    host: "localhost",
    database: "octra",
    user: "postgres",
    password: "postgres",
    port: 5432,
  });
  await client.connect();
  if (!client) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Unexpected Error",
        },
        null,
        2,
      ),
    };
  }
  const trade = new TradeModel(client);
  const customerId =
    event.queryStringParameters &&
    event.queryStringParameters.customerId ?
    parseInt(event.queryStringParameters.customerId, 10) :
    false;
  if (!customerId) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Please enter Valid ID",
        },
        null,
        2,
      ),
    };
  }
  try {
    const results = await trade.totalSumByCustomerId("transaction_amount", customerId, event.queryStringParameters);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          results,
        },
        null,
        2,
      ),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          error,
        },
        null,
        2,
      ),
    };
  } finally {
     await client.end();
  }
};

// the number of trades made by a given customer.
const totalNumberOfTradesByCustomer = async (event: any) => {
  const client = new Client({
    host: "localhost",
    database: "octra",
    user: "postgres",
    password: "postgres",
    port: 5432,
  });
  await client.connect();
  if (!client) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Unexpected Error",
        },
        null,
        2,
      ),
    };
  }
  const trade = new TradeModel(client);
  const customerId =
    event.queryStringParameters &&
    event.queryStringParameters.customerId ?
    parseInt(event.queryStringParameters.customerId, 10) :
    false;
  if (!customerId) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Please enter Valid ID",
        },
        null,
        2,
      ),
    };
  }
  try {
    const results = await trade.totalNumberOfTrades(customerId, event.queryStringParameters);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          results,
        },
        null,
        2,
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          error,
        },
        null,
        2,
      ),
    };
  } finally {
     await client.end();
  }
};

export {
  totalGainsByCustomerId,
  totalTransactionAmountByCustomer,
  totalNumberOfTradesByCustomer,
}; // eslint-disable-line
