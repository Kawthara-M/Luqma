import { useState } from "react"
import { SignInCustomer } from "../services/Auth"
import { useNavigate, Link } from "react-router-dom"
import validator from "validator"

import '../../public/styleSheets/auth.css'

const SignIn = ({ setCustomer }) => {
  let navigate = useNavigate()
  const initialState = { email: "", passwordDigest: "" }
  const [errorMessage, setErrorMessage] = useState("")


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
      setErrorMessage("Invalid!")
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (errorMessage) {
      return
    } else {
      const payload = await SignInCustomer(formValues)
      setFormValues(initialState)
      setCustomer(payload)
    }

    navigate('/Home')
  }

  return (
    <div className="wrapper">
      <div className="SignIn-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              id="email"
              type="email"
              name="email"
              placeholder="Luqma@gmail.com"
              value={formValues.email}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                handleChange(e)
                validate(e.target.value)
              }}
              type="password"
              id="password"
              name="passwordDigest"
              value={formValues.passwordDigest}
              required
            />
          </div>
          <button
            disabled={
              !formValues.email || !formValues.passwordDigest || errorMessage
            }
          >
            Sign In
          </button>
        </form>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Don’t have an account? <Link to="/auth/sign-up">Sign Up</Link>
        </p>
      </div>

      {errorMessage === "" ? null : (
        <span
          style={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          {errorMessage}
        </span>
      )}

    </div>
  )
}

export default SignIn
