const Product = require('../models/products/product');
const ProductDetail = require('../models/products/product_detail');
const User = require('../models/user/user');
const Order = require('../models/order/order');
const OrderDetail = require('../models/order/order_detail');

// const ProductDetail = require('../models/products/product_detail');
// const CategoryDetail = require('../models/products/category_detail');
const { multipleMongooseToObject } = require('../../util/mongoose');

class AdminController {
    // GET /admin/product
    ShowProduct(req, res, next) {
        const page = req.query.page || 1;
        Product.paginate({}, { page: page, limit: 10 })
            .then((product) => {
                res.json(product);
            })
            .catch((err) => next(err));
    }

    // GET /admin/product/:id/product-detail
    ShowProductDetail(req, res, next) {
        ProductDetail.find({ product_id: req.params.id })
            .exec()
            .then((productDetail) => res.json(productDetail))
            .catch(next);
    }

    // POST /admin/product/store
    StoreProduct(req, res, next) {
        const product = new Product(req.body);
        product
            .save()
            .then(() => res.send('THÊM SẢN PHẨM THÀNH CÔNG'))
            .catch(() => res.send('THÊM KHÔNG THÀNH CÔNG'));
    }

    // POST /admin/product-detail/store
    StoreProductDetail(req, res, next) {
        const productDetail = new ProductDetail(req.body);
        productDetail
            .save()
            .then(() => res.send('THÊM CHI TIẾT SẢN PHẨM THÀNH CÔNG'))
            .catch(() => res.send('THÊM KHÔNG THÀNH CÔNG'));
    }

    // PUT /admin/product/:id
    UpdateProduct(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .exec()
            .then(() => res.send('Update sản phẩm thành công'))
            .catch(() => res.send('Update sản phẩm thất bại'));
    }

    // delete /admin/product/delete/:id
    DestroyProduct(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .exec()
            .then(() => res.send('Xóa sản phẩm thành công'))
            .catch(() => res.send('Xóa sản phẩm thất bại'));
    }

    // GET /admin/user/show
    ShowUser(req, res, next) {
        const page = req.query.page || 1;
        User.paginate({ level: false }, { page: page, limit: 10 })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => next(err));
    }

    // POST /admin/user/store
    StoreUser(req, res, next) {}

    // PUT /admin/user/edit/:id
    EditUser(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .exec()
            .then(() => res.send('Update người dùng thành công'))
            .catch(() => res.send('Update người dùng thất bại'));
    }

    // DELETE /admin/user/delete/:id
    DestroyUser(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .exec()
            .then(() => res.send('Xóa người dùng thành công!!'))
            .catch(() => res.send('Xóa người dùng thất bại!!'));
    }

    ShowOrder(req, res, next) {
        const page = req.query.page || 1;
        Order.paginate({}, { page: page, limit: 10 })
            .then((order) => {
                res.json(order);
            })
            .catch((err) => next(err));
    }

    ShowOrderDetail(req, res, next) {
        OrderDetail.find({ order_id: req.params.id })
            .exec()
            .then((orderDetail) => res.json(orderDetail))
            .catch(next);
    }
}

module.exports = new AdminController();

// export default SiteController;
