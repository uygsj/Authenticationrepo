import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const ProfileForm = () => {
  const navigate = useNavigate();
  const newPasswordInputRef = useRef()
  const authCtx = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredPassword = newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBZnsryIn3EL7dA9W-HgnP0X6EXabzgASU', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password:enteredPassword,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(res => {

      navigate('/');
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="6" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
