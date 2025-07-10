import { useState } from "react";

export default function Login() {
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });

  const [isEdited, setIsEdited] = useState({
    email: false,
    password: false,
  });

  const isEmailInvalid = isEdited.email && !userInputs.email.includes("@");

  function handleChange(event) {
    setUserInputs((prevUserInputs) => ({
      ...prevUserInputs,
      [event.target.name]: event.target.value,
    }));

    setIsEdited((prev) => ({
      ...prev,
      [event.target.name]: false,
    }));
  }

  function handleBlur(event) {
    setIsEdited((prev) => ({
      ...prev,
      [event.target.name]: true,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(userInputs);

    // // to reset the form
    // setUserInputs({
    //   email: "",
    //   password: "",
    // });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={userInputs.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="control-error">
            {isEmailInvalid && <p>Please enter a valid email address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={userInputs.password}
            onChange={handleChange}
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
