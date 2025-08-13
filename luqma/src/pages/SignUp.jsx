import { useState } from "react"
import { SignUpCustomer } from "../services/Auth"
import { useNavigate, Link } from "react-router-dom"

import "../../public/styleSheets/auth.css"

import validator from "validator"

const SignUp = () => {
  let navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")

  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("")
    } else {
      setErrorMessage(
        "Weak Password! Have a mix of capital and lower letters, digits, and unique symbols!"
      )
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")

    try {
      const payload = await SignUpCustomer(formValues)
      if (payload) {
        setFormValues(initialState)
        navigate("/auth/sign-in")
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="wrapper wrapper-up">
      <h2 className="form-title">Sign Up</h2>
      <div className="signUp-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            value={formValues.name}
            required
            autoComplete="name"
          />
          <br />
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="Luqma@gmail.com"
            onChange={handleChange}
            value={formValues.email}
            required
            autoComplete="email"
          />
          <br />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            name="phone"
            pattern="^\+973\s?\d{4}\s?\d{4}$"
            placeholder="+973 0000 0000"
            onChange={handleChange}
            value={formValues.phone}
            required
            autoComplete="tel"
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            placeholder="Password"
            onChange={(e) => {
              handleChange(e)
              validate(e.target.value)
            }}
            value={formValues.password}
            required
            autoComplete="off"
            style={{
              marginBottom: ".5rem",
            }}
          />

          <br />
          <label htmlFor="confirmPassword">Comfirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
            value={formValues.confirmPassword}
            required
            autoComplete="off"
          />
          <br />
          <button
            disabled={
              !formValues.name ||
              !formValues.email ||
              !formValues.phone ||
              !formValues.password ||
              !formValues.confirmPassword ||
              (!formValues.password &&
                formValues.password === formValues.confirmPassword)
            }
          >
            Sign Up
          </button>
        </form>
        {errorMessage === "" ? null : (
          <span
            style={{
              fontSize: ".8rem",
              color: "red",
              marginTop: "0",
              marginBottom: ".5rem",
            }}
          >
            {errorMessage}
          </span>
        )}
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Already have an account? <Link to="/auth/sign-in">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
