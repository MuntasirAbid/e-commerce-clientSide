import React from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'

const Orders = () => {
    const { products, initialCart } = useLoaderData();
    const [cart, setCart] = useState(initialCart);

    const handleRemoveItem = (_id) => {
        const remaining = cart.filter(product => product._id !== _id);
        setCart(remaining);
        removeFromDb(_id);

    }

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='orders-container'>
                {
                    cart.map(product => <ReviewItem

                        key={product._id}
                        product={product}
                        handleRemoveItem={handleRemoveItem}
                    ></ReviewItem>)
                }
                {
                    cart.length === 0 && <h2>You have no items to review. Please <Link to="/">Shop more</Link></h2>
                }
            </div>
            <div className='cart-container'>
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to='/shipping'>
                        <button>Proceed shipping</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Orders; 