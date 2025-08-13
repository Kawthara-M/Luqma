import { useState } from "react"
import { SignInCustomer } from "../services/Auth"
import { useNavigate, Link } from "react-router-dom"

import "../../public/styleSheets/auth.css"

const SignIn = ({ setCustomer }) => {
  let navigate = useNavigate()
  const initialState = { email: "", passwordDigest: "" }
  const [errorMessage, setErrorMessage] = useState("")

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")

    try {
      const payload = await SignInCustomer(formValues)
      if (payload && payload.id) {
        setFormValues(initialState)
        setCustomer(payload)
        navigate("/Home")
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="wrapper">
      <h2>Sign In</h2>
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
              }}
              type="password"
              id="password"
              name="passwordDigest"
              value={formValues.passwordDigest}
              required
              style={{
                marginBottom: ".5rem",
              }}
            />
            {errorMessage === "" ? null : (
              <span
                style={{
                  fontSize: ".8rem",
                  color: "red",
                  marginTop: "0",
                }}
              >
                {errorMessage}
              </span>
            )}
          </div>
          <button disabled={!formValues.email || !formValues.passwordDigest}>
            Sign In
          </button>
        </form>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Don’t have an account? <Link to="/auth/sign-up">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
