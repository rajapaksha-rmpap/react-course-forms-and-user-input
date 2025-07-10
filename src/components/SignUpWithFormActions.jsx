/*
 * =================== Handling Form Inputs using React Form Actions ===================
 * available on React 19 and above
 * Issues -
 * 1. default value is not working for the `select` element upon resetting
 * 2. resetting the form doesn't work properly as we are setting the `default` values
 *  of the form control elements to their previous user inputs
 * 3. default value doesn't properly work for the 'terms and conditions` checkbox: once
 *  checked, unchecking it will not update the default value to unchecked; every time you
 *  submit the form, even you uncheck the box, the box will get checked automatically.
 */

import { useActionState } from "react";

import Input from "./Input.jsx";

import {
  validateEmail,
  validatePassword,
  validateName,
} from "../util/validation";

// step 1 - define form-action function and attach it to `action` prop of the form element
function signUpAction(prevFormState, formData) {
  const formInputs = Object.fromEntries(formData.entries());
  formInputs["acquisition"] = formData.getAll("acquisition");
  console.log(formInputs);

  // step 2 - perform input validation
  const errors = {};
  let error;
  if ((error = validateEmail(formData.get("email")))) {
    errors["email"] = error;
  }

  if ((error = validatePassword(formData.get("password")))) {
    errors["password"] = error;
  }

  if (formData.get("password") !== formData.get("confirm-password")) {
    errors["confirm-password"] = "passwords do not match";
  }

  if ((error = validateName(formData.get("first-name")))) {
    errors["first-name"] = "first " + error;
  }

  if ((error = validateName(formData.get("last-name")))) {
    errors["last-name"] = "last " + error;
  }

  if (!formData.get("terms")) {
    errors["terms"] =
      "you cannot proceed without agreeing to our terms and conditions";
  }

  if (Object.keys(errors).length === 0) {
    console.log("Form was successfully submitted.");
  } else {
    console.log(errors);
  }

  // step 3 - return the errors
  return { errors, formInputs };
}

export default function Signup() {
  const [formState, formAction] = useActionState(signUpAction, {
    errors: {},
    formInputs: {},
  });

  const submissionComplete = Object.keys(formState.errors).length === 0;

  return (
    <form action={formAction}>
      {submissionComplete && (
        <div className="success">
          <h2>The Form was submitted successfully!</h2>
        </div>
      )}
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <Input
        label="Email"
        id="email"
        type="email"
        name="email"
        error={formState.errors.email}
        defaultValue={formState.formInputs.email}
      />

      <div className="control-row">
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          error={formState.errors.password}
          defaultValue={formState.formInputs.password}
        />
        <Input
          label="Confirm Password"
          id="confirm-password"
          type="password"
          name="confirm-password"
          error={formState.errors["confirm-password"]}
          defaultValue={formState.formInputs["confirm-password"]}
        />
      </div>

      <hr />

      <div className="control-row">
        <Input
          label="First Name"
          id="first-name"
          type="text"
          name="first-name"
          error={formState.errors["first-name"]}
          defaultValue={formState.formInputs["first-name"]}
        />

        <Input
          label="Last Name"
          id="last-name"
          type="text"
          name="last-name"
          error={formState.errors["last-name"]}
          defaultValue={formState.formInputs["last-name"]}
        />
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" defaultValue={formState.formInputs.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.formInputs.acquisition?.includes(
              "google"
            )}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.formInputs.acquisition?.includes(
              "friend"
            )}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            defaultChecked={formState.formInputs.acquisition?.includes("other")}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            defaultChecked={formState.formInputs["terms"]}
          />
          I agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
