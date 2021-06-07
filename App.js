import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from './base';

//import components
import Menu from './components/menu';

function App() {
  // Get data from firestore database
  const ref = firebase.firestore().collection("products");

  //global variable array that will hold all the data fetched from the database
  let items = [];

  //state that will hold the current selected product data (initialize it to 'Empty')
  const [product, setProduct] = useState("Empty");

  //state that will hold the user's cart items
  const [cart, setCart] = useState([]);

  //state will hold the total amount. This will be updated everytime the user adds an item to the cart
  const [total, setTotal] = useState(0);

  //set whether animation executes or not
  const [animate, setAnimate] = useState(true);

  //fetch the data from the firestore database in the products collection
  //and add it to the product state to display the selected products
  function updateData(category){
    setProduct("");
    setAnimate(true);

    //scroll to make nav bar be at the top of the page
    var navBar = document.getElementById("nav-bar");
    navBar.scrollIntoView({behavior: 'smooth'});

    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      for(let i = 0; i < items.length; i++){
        if(items[i].category === category){
          setProduct((product) => [...product, {
            id: items[i].id,
            image: items[i].image,
            name: items[i].name,
            price: items[i].price,
            category: items[i].category
          }])
        }
      }
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Everly Coffee</h1>

        <div className="reviews-container">
          <div className="review" id="review-1">
            <h3>This is the best place ever! I've never had coffee that tasted so good. The apple pie was also the best I've ever had!</h3>
            <p>-John Smith</p>
          </div>

          <div className="review" id="review-2">
            <h3>Honestly, this place feels like a home away from home.</h3>
            <p>-Jane Doe</p>
          </div>

          <div className="review" id="review-3">
            <h3>This is a coffee shop, but their PIE! Oh my god their pie is other-worldly!</h3>
            <p>-Billy Bob</p>
          </div>

          <div className="review" id="review-4">
            <h3>Staff is super friendly! I definitely recommend!</h3>
            <p>-Mark Cuban</p>
          </div>

          <div className="review" id="review-5">
            <h3>I feel like a kid in a candy store everytime I come here!</h3>
            <p>-Mr. Wonderful</p>
          </div>
        </div>

        <div id="nav-bar" className="nav-bar">
          <p onClick={() => updateData("hot drink")}>Hot Drinks</p>
          <p onClick={() => updateData("cold drink")}>Cold Drinks</p>
          <p onClick={() => updateData("dessert")}>Desserts</p>
        </div>
      </header>

      {/* If product is 'Empty', then do not display the Menu component */}
      {product !== "Empty" ? 
      <Menu
      product={product}
      setProduct={setProduct}
      cart={cart}
      setCart={setCart}
      total={total}
      setTotal={setTotal}
      animate={animate}
      setAnimate={setAnimate}
    /> : null}
    </div>
  );
}

export default App;
