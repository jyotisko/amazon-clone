import React from 'react';
import AuthFooter from '../components/Auth/AuthFooter';
import AuthNav from '../components/Auth/AuthNav';
import SignupForm from '../components/Auth/SignupForm';

const Signup: React.FC = () => {
  return (
    <React.Fragment>
      <AuthNav />
      <SignupForm />
      <AuthFooter />
    </React.Fragment>
  );
};

export default Signup;