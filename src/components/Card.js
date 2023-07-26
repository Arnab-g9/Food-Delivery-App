import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';


export default function Card(props) {
    let dispatch = useDispatchCart();
    let data =  useCart()
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("") 

    const handleAddToCart = async ()=>{
        await dispatch({type:"ADD", id: props.foodItem._id, name: props.foodItem.name, price:finalPrice, qty: qty, size: size})
        await console.log(data)
    }

    let finalPrice = qty*parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "460px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"180px",objectFit:"fill"}} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        
                        <div className='container w-100'>

                            <select className='m-2 h-100  bg-success rounded' 
                            onChange={(e)=>setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}> {i + 1} </option>
                                    )
                                })}
                            </select>

                            <select className='m-2 h-100  bg-success rounded' ref={priceRef} 
                            onChange={(e)=>setSize(e.target.value)}>
                               {priceOptions.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                               })}
                            </select>

                            <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                            </div>
                        </div>
                        <hr></hr>
                        <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
    )
}
