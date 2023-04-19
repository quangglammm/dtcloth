import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useParams } from 'react-router-dom';
import { FakeData } from "../fakedata";
import ContainerItem from '../ContainerItem';
import "./TypeProduct.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
function TypeProduct() {
    const { typeID } = useParams();

    var type = FakeData[2].find(
        function (item) {
            return item.matype === typeID
        }
    );
    var typedetails = FakeData[3].filter(
        function (item) {
            return item.matype === typeID
        }
    );
    return (
        <div className="type-product-container">
            <Header/>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href="/Products">Sản phẩm</Breadcrumb.Item>
                <Breadcrumb.Item active>{type.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="list-product-type">
                {FakeData[0].map((item) =>
                    typedetails.map((typedetail) => typedetail.matd === item.matd
                        &&
                        <ContainerItem price={item.price} name={item.name} image={item.image} masp={item.masp} />
                    )
                )}
            </div>
            <Footer/>
        </div>
    );
}
export default TypeProduct;