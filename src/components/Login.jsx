import { useState, useRef } from "react";

export default function Login() {
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });

  // two refs for the two input fields
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    console.log("email: " + emailRef.current.value);
    console.log("password: " + passwordRef.current.value);

    setUserInputs({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    // to reset the form
    // ----- not recommended -----
    // emailRef.current.value = "";
    // passwordRef.current.value = "";

    // ----- recommended -----
    // event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            id="password"
            type="password"
            name="password"
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
