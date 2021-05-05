import Login from '../../components/login/login.component';
import SignUp from '../../components/signup/signup.component';
import {StyledBackground,StyledFormContainer} from './style'
import {StyledLogo} from '../../style'
import React,{useState} from 'react';

function Home(props) {
  const forms = {LOGIN:'login', SIGNUP:'signup', FORGOT_PASSWORD:'forgotPassword'}
  const [form,setForm] = useState(forms.LOGIN);

  const renderForm = () =>{
    if(form===forms.LOGIN) return <Login changeForm={(newForm) => setForm(forms[newForm])}/>
    else return <SignUp changeForm={() => setForm(forms.LOGIN)}/>
  }

  return (
    <StyledBackground >
      <StyledFormContainer className='flexContainer flexContainer--col'>
        <StyledLogo/>
        {renderForm()}
      </StyledFormContainer>
    </StyledBackground>
  )
}

export default Home;
