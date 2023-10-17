//import { useState, useRef } from 'react';
import { useState, useRef , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const navigate = useNavigate(); 
  const emailref = useRef();
  const passwordref = useRef();
  const authCtx = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setisLoading]=useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailref.current.value;
    const enteredPassword = passwordref.current.value;
    setisLoading(true)

    let url
    if(isLogin) {
        url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZnsryIn3EL7dA9W-HgnP0X6EXabzgASU";
    } 
    else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZnsryIn3EL7dA9W-HgnP0X6EXabzgASU"
    }
    fetch(url,{
      method:'POST',
      body:JSON.stringify({
        email:enteredEmail,
        password:enteredPassword,
        returnSecureToken:true
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response=>{
      setisLoading(false)
      if(response.ok){
        return response.json()
      }else{
        return response.json().then(data=>{
          let errorMessage = 'Authentication failed'
          if(data&&data.error&&data.error.message){
            errorMessage = data.error.message 
            throw new Error(errorMessage)
        }

        console.log(data)
      })
    }
  }).then(data=>{
    authCtx.login(data.idToken)

  }).catch((error)=>{
      alert(error.message)
      navigate('/');
  })
}

return (
  <section className={classes.auth}>
    <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
    <form onSubmit={submitHandler} >
      <div className={classes.control}>
        <label htmlFor='email'>Your Email</label>
        <input type='email' id='email' ref={emailref} required />
      </div>
      <div className={classes.control}>
        <label htmlFor='password'>Your Password</label>
        <input
          type='password'
          id='password'
          autoComplete='on'
          ref={passwordref}
          required
        />
      </div>
      <div className={classes.actions}>
        <button>{isLogin ? 'login' : 'create account'  }</button>
        {isLoading&&<p>sending request.........</p>}
        <button
          type='button'
          className={classes.toggle}
          onClick={switchAuthModeHandler}
        >
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </button>
      </div>
    </form>
  </section>
);
};
export default AuthForm

        