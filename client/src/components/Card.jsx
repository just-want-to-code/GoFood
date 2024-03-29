import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const priceRef = useRef();
  const dispatch = useDispatchCart();
  const data = useCart();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const available = options[size] ? options[size][1] : 0;
  const handleAddToCart = async () => {
    //console.log(size);
    let food = {};
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.size) {
      if (food.size === size) {
        await dispatch({
          type: 'UPDATE',
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: 'ADD',
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
    }
    await dispatch({
      type: 'ADD',
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };
  const finalPrice = qty * parseInt(options[size] ? options[size][0] : '0');
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  const setNewPrice = async (e) => {
    e.preventDefault();
    const data = { item: props.foodItem.name, opt: size, newprice: price };
    const response = await fetch('http://localhost:5000/price/change', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    //console.log(json);

    if (!json.success) {
      alert('Error occured!');
    }
    if (json.success) {
      alert('Price Changed');
      options[size] = price;
      setPrice('');
      //location.reload();
    }
  };
  console.log(available, size, options);
  return (
    <div>
      <div
        className="card mt-3 bg-dark text-white"
        style={{ width: '18rem', maxHeight: '360px' }}
      >
        <img
          className="card-img-top"
          src={props.foodItem.img}
          alt="Card image cap"
          style={{ height: '180px', width: '120 px', objectFit: 'contain' }}
        />

        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            {localStorage.getItem('role') === 'Sales' ? (
              <select
                className="m-2 h-100 bg-success rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from({ length: available }, (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
            ) : (
              ''
            )}
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div>Available: {available}</div>
            <div className="d-inline h-100 fs-5">Rs {finalPrice}</div>

            {localStorage.getItem('role') === 'Manager' ? (
              <form>
                <label htmlFor="newprice">Enter new price: </label>
                <input
                  id="newprice"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <button onClick={setNewPrice}>Change Price</button>
              </form>
            ) : (
              ''
            )}

            {localStorage.getItem('role') === 'Sales' ? (
              <button
                className="btn btn-success justify-center ms-2"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
