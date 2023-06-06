import React, { useState, useEffect } from "react";
import "./OrderDetail.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import { Link, useParams, useLocation } from "react-router-dom";
import OrderDataService from "../../services/orders";
export default function OrderDetail() {
  const { orderID } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getOrderDetail();
  }, []);

  const getOrderDetail = () => {
    OrderDataService.getOrderDetail(orderID)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      <div className="orderDetails">
        <div className="orderInfor">
          <div className="orderInforItem">
            <span className="orderInfortitle">Thông tin giao hàng </span>
            <div className="orderInforDetail">
              <p>
                <span>Họ tên:</span>
                {location.state.order.name}{" "}
              </p>
              <p>
                <span>Địa chỉ:</span>
                {location.state.order.address}
              </p>
              <p>
                <span>SĐT:</span>
                {location.state.order.phone}{" "}
              </p>
            </div>
          </div>
          <div className="orderInforItem">
            <span className="orderInfortitle">Thông tin thanh toán </span>
            <div className="orderInforDetail">
              {location.state.order.pay_method === "cod" ? (
                location.state.order.status === "Đã giao hàng" ? (
                  <div className="">
                    <p>Thanh toán khi nhận hàng</p>
                    <p className="success">Thanh toán thành công</p>
                  </div>
                ) : (
                  <div className="">
                    <p>Thanh toán khi nhận hàng</p>
                    <p className="success">Chưa thanh toán</p>
                  </div>
                )
              ) : (
                <div>
                  <p>Thanh toán qua {location.state.order.pay_method}</p>
                  <p className="success">Thanh toán thành công</p>
                </div>
              )}
            </div>
          </div>
          <div className="orderInforItem">
            <div className="orderInfortitle">Thông báo </div>
            <div className="orderInforDetail">
              <p className="success">{location.state.order.status}</p>
            </div>
          </div>
        </div>
        <div className="orderProducts">
          <table className="orderProductsTable">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th> Giá </th>
                <th> Số lượng </th>
                <th> Giảm giá</th>
                <th> Tạm tính</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr>
                  <td>
                    <div className="orderProductItem">
                      <img src={product.path} alt="Img" />
                      <div className="orderProductInfor">
                        <p>{product.name}</p>
                        <p>
                          <span style={{marginRight:"10px"}}>Màu:</span>
                          <span style={{backgroundColor: product.color, 
                            borderRadius:"50%", 
                            border:"1px solid black",
                            padding:"0 0 0px 20px "}}></span>
                        </p>
                        <p>
                          <span>Size: {product.size}</span>
                        </p>
                        <Link to={"/Products/"+product.product_id}>
                          <button>Xem chi tiết</button>
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>{Number(product.amount).toLocaleString("vi-VN")} đ</td>
                  <td>{product.qty}</td>
                  <td>0đ</td>
                  <td>{Number(product.total).toLocaleString("vi-VN")} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="orderProductsTable-Mobile">
            <div className="orderItem-Mobile">
              <img src=" " alt="img" />
              <div className="orderProduct-Mobile">
                <p>Áo thun đến từ đại dương</p>
                <p>
                  <span>Màu: </span>
                  <span
                    className=""
                    style={{ background: "black", padding: "2px 7px" }}
                  ></span>
                  <span> | Size:</span>
                  36
                </p>
                <p>
                  <span>Số lượng: </span>
                  {1}
                  <span> | Giá: </span>330.000đ
                </p>
              </div>
              <div className="buttonDetail">
                <Link>
                  <button> Xem chi tiết </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
