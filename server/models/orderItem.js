const db = require("../db");
const moment = require("moment");

module.exports = class OrderItemModel {

    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.description = data.description;
        this.modified = moment.utc().toISOString();
        this.name = data.name;
        this.price = data.price || 0;
        this.productid = data.id;
        this.qty = data.qty || 1;
        this.orderid = data.orderid || null;
    }

    /**
     * Create new order item
     * @param {Object} data order item data
     * @return {Object|null} created order item
     */
    static async create(data) {
        try {

            const statement = `INSERT INTO orderitems (qty, created, price, name, description, orderid, productid)
                               VALUES ($1, $2, $3, $4, $5, $6, $7)
                               RETURNING *`;
            const values = [this.qty, this.created, this.price, this.name, this.description, this.orderid, this.productid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Retrieve order items for an order
     * @param {Object} orderid order id
     * @return {Array} created cart item
     */
    static async getOrderItem(orderid) {
        try {

            const statement = `SELECT oi.qty, oi.id AS cartitemid, p.*
                               FROM orderitems oi
                               INNER JOIN products p ON p.id = oi.productid
                               WHERE orderid = $1`
            const values = [orderid];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return [];

        } catch(err) {
            throw new Error(err);
        }
    }
}