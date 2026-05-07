"use client"

import UseAuth from "@/hooks/UseAuth";

const CartPage = () => {
    const { isAuth } = UseAuth();
    console.log(isAuth);
    return ( 
        <h1>Cart Page</h1>
     );
}
 
export default CartPage;