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

const Login = () => {
  const id = useFormInput("");
  const password = useFormInput("");
  const submitted = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(id.value, password.value);

    let user_namels = localStorage.getItem("user_names")
      ? localStorage.getItem("user_names")
      : "";
    let emaills = localStorage.getItem("emails")
      ? localStorage.getItem("emails")
      : "";
    let passwordls = localStorage.getItem("passwords")
      ? localStorage.getItem("passwords")
      : "";

    if (
      (user_namels === id.value || emaills === id.value) &&
      password.value === passwordls
    ) {
      dispatch({ type: "HAS_AUTHENTICATED" });
    } else {
      setError(true);
    }
  };

  let err_note = error ? (
    <div>Error! The entered credentials are not valid.</div>
  ) : null;
  let val;

  if (!submitted) {
    val = (
      <div className="sign-up-form">
        <Form id="user-info" onSubmit={handleSubmit}>
          <Form.Input
            required
            label="User Name or Email"
            placeholder="User Name or Email-id"
            value={id.value}
            onChange={id.onChange}
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

export default Login;
