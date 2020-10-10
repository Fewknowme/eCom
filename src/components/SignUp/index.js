import React,{ Component } from 'react';
import {auth , handleUserProfile} from './../../firebase/utils';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/Forminput';
import Button from './../forms/Button';
import './styles.scss';

const intialState= {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
    errors:[]
};

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...intialState
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const {name,value} = e.target;

        this.setState({
            [name]: value
        });
    }

    handleFormSumbit = async event => {
        event.preventDefault();

        const { displayName , email ,password , confirmPassword , errors } = this.state;
        if(password !== confirmPassword){
            const err = ['Passwords Don\'t match'];
            this.setState({
                errors:err
            })
            return;
        }
        try {
           const {user} = await auth.createUserWithEmailAndPassword(email,password);

           await handleUserProfile(user,{displayName});

           this.setState({
             ...intialState
           });

        } catch (err) {
            console.log(err); 
        }


    }


    render() {
        const { displayName , email ,password , confirmPassword, errors } = this.state;

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

                <form onSubmit={this.handleFormSumbit}>
               
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full Name"
                        onChange={this.handleChange}
                    />
                
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Your Email Address"
                        onChange={this.handleChange}
                    />
                      <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Your password"
                        onChange={this.handleChange}
                    />
                      <FormInput
                        type="Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Your password"
                        onChange={this.handleChange}
                    />

                    <Button type="submit">
                        Register With Us!
                    </Button>

                 </form>
                 </div>
    
            </AuthWrapper>
        );
    }
}

export default SignUp;