import { Link } from 'react-router-dom'
import userEvent from '@testing-library/user-event';
import React , {useState } from 'react'
import { useHistory } from 'react-router';
import { auth } from './Firebase';
import './Login.css'
function Login() {
     const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const signIn = e =>{
        e.preventDefault();
        //// fancy firebase login
        auth.signInWithEmailAndPassword(email, password).then(auth => {
                history.push('/')
        }).catch(error=> alert(error.message))
    }
    const register = e =>{
        e.preventDefault();
        //// fancy firebase register
        auth.createUserWithEmailAndPassword(email,password).then((auth)=> {
            ////if seccesfuly created a new user 
            console.log(auth);
            if(auth){
                history.push('/')
            }
        }).catch(error=> alert(error.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img className='login_logo'
                 src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'/>
            </Link>
            <div className='login_conteiner'>
                <h1>Sign In</h1>
                <form>
                <h5>E-mail</h5>
                <input type='text' value ={email} onChange={
                    e => setEmail(e.target.value)
                }/>
                <h5>Password</h5>
                <input type='password' value ={password} onChange={
                    e => setPassword(e.target.value)
                }/>
                <button className='login_signinButton' type='submit' onClick={signIn}>Sign In</button>
                <p className='para'>By creating an account, you agree to Amazon's FAKE CLONE Conditions of Use and Privacy Notice.</p>
                <button  className='login_registerButton' typr='submit' onClick={register}>Create Amazone Account</button>
                </form>
            </div>
            
        </div>
    )
}

export default Login
