import React,{ useState } from 'react';
import {auth , handleUserProfile} from './../../firebase/utils';
import { withRouter } from 'react-router-dom';
import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/Forminput';
import Button from './../forms/Button';
import './styles.scss';

const SignUp = props => {

    const [displayName , setDisplayName ] = useState('');
    const [email , setEmail ] = useState('');
    const [password , setPassword ] = useState('');
    const [confirmPassword , SetConfirmPassword ] = useState('');
    const [errors , setErrors ] = useState([]);

    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        SetConfirmPassword('');
        setErrors('');
    };

    const handleFormSumbit = async event => {
        event.preventDefault();

        if(password !== confirmPassword){
            const err = ['Passwords Don\'t match'];
             setErrors(err);
            return;
        }
        try {
           const {user} = await auth.createUserWithEmailAndPassword(email,password);

           await handleUserProfile(user,{displayName});
           reset();

           props.history.push('/');

        } catch (err) {
            console.log(err); 
        }

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
