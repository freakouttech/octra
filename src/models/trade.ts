/**
 * class TradeModel. Interact with trade_activity db
 */
class TradeModel {
  /**
   * Class property set to an instance of PostGress Client
   *
   * @param {Object} PostGress Client
   * Instance of the PostGress Client
   */
  public client: any;
  constructor(client: any) {
    this.client = client;
  }

  /**
   * Calculates total sum of a specifed column for a given user
   * @param  {string} sumOfType
   * specify which column you want the sum off
   * @param  {int} customer_id
   * customer_id to query table
   * @param  {Object} params
   * activityData timestamp
   * stockId type Id
   */
  public async totalSumByCustomerId(sumOfType: string, customer_id: number, params: any) {
    const activityData = params.activityData;
    const stockId = params.stockId;
    const withActivity = activityData ? ` AND activity_date >= '${activityData}'` : "";
    const withStockType = stockId ? ` AND stock_id = ${stockId}` : "";
    const query = `SELECT SUM (${sumOfType}) AS total FROM trade_analysis WHERE customer_id = ${customer_id} ${withActivity} ${withStockType}`;
    const sum = await this.client.query(query);
    const total = sum.rows[0][0] ? sum.rows[0][0].toFixed(2) : 0;

    return {
     [`customer_${customer_id}`]: `£${total}`,
    };
  }

  /**
   * Number of transactions by user
   * @param  {int} customer_id
   * customer_id to query table
   * @param  {Object} params
   * activityData timestamp
   * stockId type Id
   */
  public async totalNumberOfTrades(customer_id: number, params: any) {
    const activityData = params.activityData;
    const stockId = params.stockId;
    const withActivity = activityData ? ` AND activity_date >= '${activityData}'` : "";
    const withStockType = stockId ? ` AND stock_id = ${stockId}` : "";
    const query = `SELECT (number_of_transactions) FROM trade_analysis WHERE customer_id = ${customer_id} ${withActivity} ${withStockType}`;
    const sum = await this.client.query(query);
    const total = sum.rows.length ? sum.rows.map((i: any) => i[0]).reduce((a: any, b: any) => a + b, 0) : 0;

    return {
     [`customer_${customer_id}`]: `${total} transactions`,
    };
  }
}

export default TradeModel;
