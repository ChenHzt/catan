import React, { useState } from "react";
import BasicForm from "../form/form.component";
import { connect } from 'react-redux';
import { StyledButton, StyledLink } from "../../style";
import AuthService from "../../services/auth.service";
import { useHistory } from "react-router-dom";
import {setCurrentUser} from '../../store/actions/userActions'

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();


  const handleLogin = async () => {
    try {
      const userData = await AuthService.login(email, password);
      props.setCurrentUser(userData.user);

      history.push(`/profile`);
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setError(resMessage);
    }
  };

  const fields = [
    {
      inputType: "email",
      value: email,
      placeholder: "email",
      onChange: (event) => setEmail(event.target.value),
    },
    {
      inputType: "password",
      value: password,
      placeholder: "password",
      onChange: (event) => setPassword(event.target.value),
    },
  ];

  return (
    <>
      {error && <div>{error}</div>}
      <BasicForm
        fields={fields}
        submitText="Login"
        submitCallback={handleLogin}
      />
      <StyledLink onClick={() => props.changeForm("forgotPassword")}>
        forgot password?
      </StyledLink>
      <StyledButton onClick={() => props.changeForm("signup")}>
        Sign Up
      </StyledButton>
    </>
  );
}

const mapStateToProps = state => {
  return { user:state.user};
};

export default connect(mapStateToProps,{setCurrentUser})(Login);;
