import { CartItem } from './cart-item'
import { useCheckoutStore } from '../../stores/checkout'
import './styles.css'
import { usecompanyState } from '../../stores/company';

export const ShoppingCart = () => {

    const checkoutState = useCheckoutStore();
    const companyState = usecompanyState();

    return (
        <div className="wrapListCartSidebar">
            <div className="title mb-2">
                <div className="row">
                    <strong className='titleSidebar'>Shopping cart</strong>
                </div>
            </div>
            <div className="listCartSidebar">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {
                        checkoutState.checkout.cartItems.length > 0 ?
                            checkoutState.checkout.cartItems.map((e, i) => (
                                <CartItem data={e} key={i} />
                            )) :
                            <p className="text-empty">Cart is empty</p>
                    }
                </div>
            </div>

            {
                checkoutState.checkout.cartItems.length > 0 &&
                <div className="buttonCheckout">
                    Total checkout ${checkoutState.total(companyState.company).toFixed(2)}
                </div>
            }
        </div>
    )
}