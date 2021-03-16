import React, { useState , useEffect } from 'react'
import './Payment.css'
import {getBasketTotal} from './reducer'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link , useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format'
import axios from './axios';
import { db } from './Firebase';
function Payment() {
    const [{basket , user} , dispatch ] = useStateValue();
    const history = useHistory();
    const [error , setError] = useState(null); 
    const [disabled ,setDisabled] = useState(true);
    const [succeeded , setSucceeded] = useState(false);
    const [processing ,setProcessing] = useState ("");
    const stripe = useStripe();
    const Elements = useElements();
    const [clientSecret , setClientSecret] = useState(true);
    useEffect(() => {
        //// generate the special stripe secret which allows us to chargz a customer 
        const getClientSecret = async () =>{
            const responce = await axios({
                method : 'post',
                //Stripe expects the total in currencies submits
                url : `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(responce.data.clientSecret);
        }
        getClientSecret();
    }, [basket])
    
    
    const handleSubmit = async event =>{
        // do all the fancy stripe stuff ...
        event.preventDefault();
        setProcessing(true);
        
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method : {
                card : Elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            ///payment = payment confirmation 
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type :'EMPTY_BASKET'
            })
            history.replace('/orders')
        }) ;
    }
    const handleChange = event => {
        /// listen for changes in the cardelement
        //and display any errors as customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");



    }
    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>Checkout ( <Link to='checkout'>{basket?.length} items </Link>)</h1>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery adress : </h3>

                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>123 react</p>
                        <p>casablanca , maroc</p>
                    </div>
                    
                </div>
                <div className='payment_section'>
                <div className='payment_title'>
                        <h3>Review item and delivery </h3>

                        </div>
                        <div className='payment_item'>
                        {basket.map(item =>(
                            <CheckoutProduct
                                id = {item.id}
                                title= {item.title}
                                image = {item.image}
                                price = {item.price}
                                rating = {item.rating}
                            />
                ))}
                    </div> 
                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Methode</h3>
                    </div>
                    <div className='payment_details'>
                             {/* stripe magic here */}
                             <form onClick={handleSubmit}>
                                 <CardElement onChange={handleChange} />
                                 <div className='payment_price'>
                                 <CurrencyFormat
                                        renderText={(value)=>(
                                                <>
                                          <h3>Order total : {value}</h3>
                                                
                                                </>
                                         )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeperator={true}
                                    prefix ={"$"}
                                />
                                <button disabled={processing ||disabled ||succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                                 </div> 
                                 {/* error */}
                                 {error && <div>{error}</div>}
                             </form>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Payment
