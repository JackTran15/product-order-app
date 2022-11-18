import { Product } from "@product-checkout-assigment/product-lib";
import { Card, Button } from "react-bootstrap";
import { useCheckoutStore } from '../../stores/checkout'
import './style.css'

interface IProps {
    data: Product
}

export const ProductCard = (props : IProps) => {
    const { data } = props
    return (
        <div className="wrapOuter">
            <div className="outer productItem" data-name={data.name}>
                <div className="content">
                    <span className="bg animated fadeInDown">PIZZA</span>
                    <h3>{ data.name }</h3>
                    <p> { data.description }</p>
                    <div className="button">
                        <a>${ data.price }</a>
                        <a className="cart-btn" onClick={() => useCheckoutStore.getState().add(data)} >
                            <i className="cart-icon ion-bag"></i>
                            ADD TO CART
                        </a>
                    </div>  
                </div>
                <img src="/assets/pizza-0.jpg"  />
            </div>
        </div>
    )
}