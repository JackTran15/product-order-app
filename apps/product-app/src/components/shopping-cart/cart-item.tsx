import './styles.css'
import { Card, Row, Col } from "react-bootstrap"
import { useCheckoutStore } from '../../stores/checkout'
import type { CheckoutItem as CheckoutItemType } from '@product-checkout-assigment/product-lib'

interface IProps {
    data: CheckoutItemType
}
export const CheckoutItem = (props: IProps) => {
    const { data } = props

    const checkoutState = useCheckoutStore();

    return (<>
        <Card style={{}}>
            <Row className="no-gutter">
                <Col xs={5}>
                    <img className="card-img" src="/assets/pizza-0.jpg" alt="Suresh Dasari Card" />
                </Col>
                <Col xs={7}>
                    <div className="bodyCart">
                        <button className="buttonDeleteCard" onClick={() => checkoutState.remove(data.id)}>x</button>
                        <div className="w-100">
                            <h5 className="card-title">{data.name}</h5>
                            <p className="card-text d-flex justify-content-between">
                                <span>$11.99</span>
                            </p>
                        </div>
                        <div className="wrapButtonQuantity">
                            <button className="buttonQuantity" onClick={() => checkoutState.decrease(data.id)}>-</button>
                            x{data.quantities}
                            <button className="buttonQuantity" onClick={() => checkoutState.increase(data.id)}>+</button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    </>
    )
}