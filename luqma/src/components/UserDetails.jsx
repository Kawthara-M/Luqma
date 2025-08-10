import { useEffect, useState } from 'react'
import Customer from '../services/api'

const UserDetails = ({ customerId }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  useEffect(() => {
    console.log('customer id' + customerId)
    if (!customerId) return

    Customer.get(`/customer/profile/${customerId}`)
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
    Customer.put(`/customer/profile/${customerId}`, { name, email, phone })
      .then((res) => {
        setUser(res.data)
        setEditing(false)
      })
      .catch((err) => {
        alert('Failed to update user information')
      })
  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault()
    setPasswordMessage('')
    Customer.put(`/customer/update-password/${customerId}`, {
      oldPassword,
      newPassword
    })
      .then((res) => {
        setPasswordMessage(res.data.status)
        setOldPassword('')
        setNewPassword('')
        setShowPasswordForm(false)
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.msg) {
          setPasswordMessage(err.response.data.msg)
        } else {
          setPasswordMessage('Failed to update password')
        }
      })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      {editing ? (
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
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>User Details</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phone}</p>
          <button onClick={() => setEditing(true)}>Edit</button>

          <br />

          <button onClick={() => setShowPasswordForm(!showPasswordForm)}>
            {showPasswordForm ? 'Cancel Password Change' : 'Change Password'}
          </button>

          {showPasswordForm && (
            <form onSubmit={handlePasswordUpdate}>
              <label>
                Old Password:{' '}
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </label>
              <br />
              <label>
                New Password:{' '}
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </label>
              <br />
              <button type="submit">Update Password</button>
              {passwordMessage && <p>{passwordMessage}</p>}
            </form>
          )}
        </>
      )}
    </div>
  )
}
export default UserDetails
