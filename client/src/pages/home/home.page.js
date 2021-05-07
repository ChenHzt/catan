import Login from '../../components/login/login.component';
import SignUp from '../../components/signup/signup.component';
import {StyledBackground,StyledFormContainer} from './style'
import {StyledLogo} from '../../style'
import React,{useState} from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import authService from '../../services/auth.service';
import {setCurrentUser} from '../../store/actions/userActions'


function Home(props) {

  const history = useHistory();

  const forms = {LOGIN:'login', SIGNUP:'signup', FORGOT_PASSWORD:'forgotPassword'}
  const [form,setForm] = useState(forms.LOGIN);

  const userData = authService.getCurrentUser();
  if(userData)
  {
    props.setCurrentUser(userData.user) ;
    history.push('/profile')
  }

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

const mapStateToProps = state => {
  return { user:state.user};
};

export default connect(mapStateToProps,{setCurrentUser})(Home);

