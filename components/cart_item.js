import React from "react";

function CartItem({key, id, name, price, cart, setCart, total, setTotal}){

    //delete item information from the cart state AND subtract price from total
    function removeFromCart(){
        setTotal(total - price);
        setCart(cart.filter((element) => element.id !== id))
    }

    return(
        <div className="cart-item">
            <div>
                <img className="delete-btn" onClick={removeFromCart} src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png"/>
                <p>{name}</p>
            </div>
            <p>{'$'+price.toFixed(2)}</p>
        </div>
    );
}

export default CartItem;