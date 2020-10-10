import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/Forminput';
import Button from './../forms/Button'
import {auth} from './../../firebase/utils';

import './styles.scss';

const intialState = {
    email : '',
    errors: []
};

class EmailPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...intialState
        };

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange (e){
        const { name , value } = e.target;
        this.setState({
            [name]:value
        });
    }

    handleSubmit = async (e) =>{
        e.preventDefault();


        try {
            const { email } = this.state;

            const config= {
                url: 'http://localhost:3000/login' //change this xD
            };

            await auth.sendPasswordResetEmail(email, config).then (()=>{
                this.props.history.push('./login');
            })
            .catch(()=>{
                const err = ['Email Not Found! Please Insert valid Email'];
                this.setState({
                    errors:err
                });
            });

        } catch (err) {
            console.log(err);
        }
    }

    render(){
        const { email ,errors} = this.state;

        const configAuthWrapper = {
            headline: 'Email Password'
        };

        return(
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">

                    {errors.length > 0 &&(
                    <ul>
                       {errors.map((e ,index) => {
                                return(
                                    <li key ={index}>
                                        {e}
                                    </li>
                            );
                            })}
                        </ul>
                    )}

                    <form onSubmit={this.handleSubmit}>

                        <FormInput
                        
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email Recovery"
                        onChange={this.handleChange}
                        />
                        
                        <Button type="submit">
                        Recover Password   
                         </Button>
                    </form>
                </div>

            </AuthWrapper>
        );
    }
}

export default withRouter(EmailPassword);