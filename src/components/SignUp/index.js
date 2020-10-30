import React,{ useState , useEffect } from 'react';
import {useDispatch , useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/Forminput';
import Button from './../forms/Button';
import {signUpUser,resetAllAuthForms} from './../../redux/User/user.actions';
import './styles.scss';

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
});

const SignUp = props => {
    const { signUpSuccess, signUpError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [displayName , setDisplayName ] = useState('');
    const [email , setEmail ] = useState('');
    const [password , setPassword ] = useState('');
    const [confirmPassword , SetConfirmPassword ] = useState('');
    const [errors , setErrors ] = useState([]);

    useEffect(() => {
        if (signUpSuccess) {
          reset();
          dispatch(resetAllAuthForms());
          props.history.push('/');
        }
    
      }, [signUpSuccess]);
    
      useEffect(() => {
        if (Array.isArray(signUpError) && signUpError.length > 0) {
          setErrors(signUpError);
        }
    
      }, [signUpError]);

    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        SetConfirmPassword('');
        setErrors('');
    };

    const handleFormSumbit = event => {
        event.preventDefault();
        
        dispatch(signUpUser({
            displayName,
            email,
            password,
            confirmPassword
          }));
    }

        const configAuthWrapper={
            headline:'Registration'
        };

        return(
            <AuthWrapper {...configAuthWrapper}>
              
              <div className="formWrap">  
            
              {errors.length>0 && (
                   <ul>
                       {errors.map((err,index)=>{
                           return(
                            <li key={index}>
                                {err}
                            </li>
                           );
                           })
                       }
                   </ul>
               )}

                <form onSubmit={handleFormSumbit}>
               
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full Name"
                        handleChange = {e => setDisplayName(e.target.value)}
                    />
                
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Your Email Address"
                        handleChange = {e => setEmail(e.target.value)}
                    />
                      <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Your password"
                        handleChange = {e => setPassword(e.target.value)}
                    />
                      <FormInput
                        type="Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Your password"
                        handleChange = {e => SetConfirmPassword(e.target.value)}                    />

                    <Button type="submit">
                        Register With Us!
                    </Button>

                 </form>
                 </div>
    
            </AuthWrapper>
        );
    } 

export default withRouter(SignUp);
