import React, { useState } from "react";
import BasicForm from "../form/form.component";
import { StyledButton, StyledLink } from "../../style";
import AuthService from "../../services/auth.service";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      if(password1 !== password2)
        throw new Error('both passwords has to be the same');
      const userData = await AuthService.register(name, email, password1);
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
      inputType: "text",
      value: name,
      placeholder: "name",
      onChange: (event) => setName(event.target.value),
    },
    {
      inputType: "password",
      value: password1,
      placeholder: "password",
      onChange: (event) => setPassword1(event.target.value),
    },
    {
      inputType: "password",
      value: password2,
      placeholder: "validate password",
      onChange: (event) => setPassword2(event.target.value),
    },
  ];

  return (
    <>
      {error && <div>{error}</div>}

      <BasicForm
        fields={fields}
        submitText="Sign Up"
        submitCallback={handleSignUp}
      />
      <StyledLink onClick={() => props.changeForm('login')}>already registered? login here</StyledLink>
    </>
  );
}

export default SignUp;
