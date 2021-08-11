import React from 'react';
import AuthFooter from '../components/Auth/AuthFooter';
import AuthNav from '../components/Auth/AuthNav';
import LoginForm from '../components/Auth/LoginForm';

const Login: React.FC = () => {
  return (
    <React.Fragment>
      <AuthNav />
      <LoginForm />
      <AuthFooter />
    </React.Fragment>
  );
};

export default Login;