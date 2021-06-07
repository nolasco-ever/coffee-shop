import React, { useState } from 'react';
import {useTrail, animated} from 'react-spring';

//import components
import CartItem from './cart_item';

function Menu({product, setProduct, cart, setCart, total, setTotal, animate, setAnimate}){

    //Animation that will execute when a menu item is to be displayed. Fade in
    const trailProps = useTrail(9, {
        opacity: 1,
        height: "15vw",
        width: "15vw",

        from: {
            opacity: 0,
            height: "0vw",
            width: "0vw"
        },

        config: {
            mass: 1,
            tension: 350,
            friction: 25,
        },

        reset: true
    })

    //add item information to the cart state
    function addToCart(item_name, item_price){
        setAnimate(false);
        setCart((cart) => [...cart, {
        name: item_name,
        price: item_price,
        id: Math.random()*1000
        }])

        setTotal(total + item_price);
    }

    if(product === ""){
        return(
            <div className="menu-container">
                Loading...
            </div>
        );
    }
    else{
        return(
            //Divide this component into two sections: the menu and the shopping cart
            <div className="menu-cart">
                <div className="menu-container">
                    {/* Loop through the entire product state and display the information in a 3x3 grid and 
                        appear one after the other using the animated useTrail hook*/}
                    {product.map((data, index) => (
                        <animated.div key={index} className="menu-item" style={animate ? trailProps[index] : null} onClick={() => addToCart(data.name, data.price)}>
                            <img src={data.image}/>
                            <p>{data.name}</p>
                        </animated.div>
                    ))}
                </div>

                <div className="cart-container">
                    <h2>Cart</h2>
                    <div className="items-list-container">
                        {cart.map((data, index) => (
                            <CartItem
                                key={index}
                                id={data.id}
                                name={data.name}
                                price={data.price}
                                cart={cart}
                                setCart={setCart}
                                total={total}
                                setTotal={setTotal}
                            />
                        ))}
                    </div>
                    <div className="cart-item">
                        <p>Total</p>
                        <p>{'$'+total.toFixed(2)}</p>
                    </div>
                    <div className="pay-container">
                        <button>Pay</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;