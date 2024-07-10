import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const CartComponent = () => {
    const auth = useAuthUser();

    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`https://backend-mern-store.zelobrix.com/api/user/${auth.id}/cart`, {
                    headers: {
                        'Authorization': `Bearer your_access_token_here`,
                        'Content-Type': 'application/json'
                    }
                });
                setCartItemsCount(response.data.cartItems.length); // Counting the number of items in the cartItems array
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [auth.id]); // Ensure useEffect runs when auth.id changes

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Cart Items</h2>
            <p>Number of items in cart: {cartItemsCount}</p>
        </div>
    );
};

export default CartComponent;
