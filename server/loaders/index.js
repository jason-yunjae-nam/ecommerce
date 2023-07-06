const routers = require("../routes")
const expressMiddleware = require("../middleware/express");

module.exports = async (app) => {

    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(bodyParser.json());

    // load express middleware
    const expressApp = await expressMiddleware(app);

    // load authenticator middleware
    // TODO

    // load API route handlers
    await routers(app);

    // error handling
    app.use((err, req, res, next) => {

        const { message, status } = err;
        
        return res.status(status).send({ message });

    })

}