import { useEffect, useState } from 'react'
import Customer from '../services/api'

const UserDetails = ({ customerId }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (!customerId) return
    Customer.get(`/profile/${customerId}`)
      .then((res) => {
        setUser(res.data)
        setName(res.data.name)
        setEmail(res.data.email)
        setPhone(res.data.phone)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [customerId])

  const handleSave = () => {
    Customer.put(`/profile/${customerId}`, { name, email, phone })
      .then((res) => {
        setUser(res.data)
        setIsEditing(false)
      })
      .catch((err) => {
        alert('Failed to update user info')
      })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
        >
          <label>
            Name:{' '}
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Email:{' '}
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Phone:{' '}
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>User Details</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  )
}
export default UserDetails
