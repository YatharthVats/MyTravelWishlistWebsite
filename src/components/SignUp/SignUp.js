import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const clearVal = () => {
    setValue("");
  };

  return {
    value,
    onChange: handleChange,
    clearVal,
  };
}

const SignUp = () => {
  const user_name = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const submitted = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user_name.value, email.value, password.value);
    let user_namels = localStorage.getItem("user_names")
      ? localStorage.getItem("user_names")
      : "";
    let emaills = localStorage.getItem("emails")
      ? localStorage.getItem("emails")
      : "";

    console.log(user_namels, emaills);

    if (user_namels !== user_name.value && emaills !== email.value) {
      dispatch({ type: "HAS_AUTHENTICATED" });
      localStorage.setItem("user_names", user_name.value);
      localStorage.setItem("emails", email.value);
      localStorage.setItem("passwords", password.value);
    } else {
      setError(true);
    }
  };

  let err_note = error ? (
    <div>Error! The entered user name or id is already in use.</div>
  ) : null;
  let val;

  if (!submitted) {
    val = (
      <div className="sign-up-form">
        <Form id="user-info" onSubmit={handleSubmit}>
          <Form.Input
            required
            label="User Name"
            placeholder="User Name"
            value={user_name.value}
            onChange={user_name.onChange}
          />
          <Form.Input
            label="Email"
            required
            type="email"
            onChange={email.onChange}
            value={email.value}
            placeholder="abcd@gmail.com"
          />
          <Form.Input
            label="Password"
            type="password"
            required
            onChange={password.onChange}
            value={password.value}
            placeholder="Password"
          />
          <Form.Button content="Submit"></Form.Button>
        </Form>
        {err_note}
      </div>
    );
  } else {
    val = <Redirect to="/"></Redirect>;
  }
  return val;
};

export default SignUp;
