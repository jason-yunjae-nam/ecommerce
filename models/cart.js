const db = require("../db");
const moment = require("moment");

module.exports = class CartModel {

    constructor(data = {}) {
        // TODO
    }

    /**
     * Create a cart for user
     * @param {Object} userId user id
     * @return {Object|null} created cart record
     */
    async createCart(userId) {
        try {

            // TODO
            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Load a cart by user id
     * @param {number} userId user id
     * @return {Object|null} cart record
     */
    static async loadByUser(userId) {
        try {

            // TODO
            return null;

        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     * Load a cart by id
     * @param {number} id cart id
     * @return {Object|null} cart record
     */
    static async loadById(id) {
        try {

            // TODO
            return null;

        } catch(err) {
            throw new Error(err);
        }
    }
}