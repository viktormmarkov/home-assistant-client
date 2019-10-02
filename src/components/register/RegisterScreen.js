import AuthLayout from '../../containers/AuthLayout';
import Register from './Register';
import React, { Component } from 'react';

class RegisterScreen extends Component {
    render() {
        return (
            <AuthLayout>
                <Register/>
            </AuthLayout>
        )
    }
}

export default RegisterScreen