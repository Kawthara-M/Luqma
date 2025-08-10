import { useState } from 'react'
import { SignInCustomer } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const SignIn = ({ setCustomer }) => {
  let navigate = useNavigate()
  const initialState = { email: '', passwordDigest: '' }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInCustomer(formValues)
    setFormValues(initialState)
    setCustomer(payload)
    console.log('in handle submit')
    navigate('/Home')
  }

  return (
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
            onChange={handleChange}
            type="password"
            id="password"
            name="passwordDigest"
            value={formValues.passwordDigest}
            required
          />
        </div>
        <button disabled={!formValues.email || !formValues.passwordDigest}>
          Sign In
        </button>
      </form>
    </div>
  )
}

export default SignIn
