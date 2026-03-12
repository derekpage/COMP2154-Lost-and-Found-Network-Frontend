import { useState } from "react";
import { validateRegister } from "../utils/registerValidation.js";
// Registration form component 

export default function RegisterForm({ onSubmit, isLoading = false, error = "" }) {
  // Stores form field values
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // Stores validation errors for each field
  const [errors, setErrors] = useState({});

  // Updates form state when user types in an input field
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handles form submission and runs validation before calling onSubmit
  function handleSubmit(e) {
    e.preventDefault();

    // Run validation on current form values
    const validationErrors = validateRegister(form);
    setErrors(validationErrors);

    // Stop submission if there are validation errors
    if (Object.keys(validationErrors).length > 0) return;

    // Call parent submit handler if provided and form is valid
    if (typeof onSubmit === "function") {
      onSubmit(form);
    }
  }

  // Render registration form UI
  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="first_name">First Name</label>
      <input
        id="first_name"
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
      />
      {errors.first_name && <p style={{ color: "red" }}>{errors.first_name}</p>}

      <label htmlFor="last_name">Last Name</label>
      <input
        id="last_name"
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
      />
      {errors.last_name && <p style={{ color: "red" }}>{errors.last_name}</p>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}