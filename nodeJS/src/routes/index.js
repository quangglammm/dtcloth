// import siteRouter from './site.js';
const siteRouter = require('./site');
const adminRouter = require('./admin');
const productRouter = require('./product');
const userRouter = require('./user');
const orderRouter = require('./order');

const route = (app) => {
    app.use('/admin', adminRouter);
    app.use('/product', productRouter);
    app.use('/user', userRouter);
    app.use('/order', orderRouter);
    app.use('/', siteRouter);

};
module.exports = route;
