import { useEffect, useState } from 'react'
import Customer from '../services/api'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import '../../public/styleSheets/userDetails.css'

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

  const token = localStorage.getItem('token')

  let navigate = useNavigate()

  useEffect(() => {
    console.log('customer id' + customerId)
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
        setEditing(false)
      })
      .catch((err) => {
        alert('Failed to update user information')
      })
  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault()
    setPasswordMessage('')
    Customer.put(`/profile/update-password/${customerId}`, {
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


  const handleDelete = async (e) => {
    e.preventDefault()
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account?'
    )
    if (!confirmDelete) return
    try {
      const res = await axios.delete(
        `http://localhost:3010/auth/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      localStorage.removeItem('token')
      navigate('/home')
    } catch (err) {
      alert('Failed to delete user')
    }
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="user-details-container">
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
        >
          <h2>Edit User Details</h2>

          <div className="name">
            <label className="name-lable">Name:</label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="name-input"
            />
          </div>
          <div className="email">
            <label className="email-lable">Email: </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-lable"
            />
          </div>
          <div className="phone">
            <label className="phone-lable">Phone:</label>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="phonr-input"
            />
          </div>
          <div className="buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2>User Details</h2>
          <p className="name">
            Name: <span>{user.name}</span>
          </p>
          <br />
          <p className="email">
            Email: <span>{user.email}</span>
          </p>
          <br />

          <p className="phone">
            Phone Number: <span>{user.phone}</span>
          </p>
          <br />

          <button onClick={() => setEditing(true)} className="edit-btn">
            Edit
          </button>

          <br />

          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="changePass-btn"
          >
            {showPasswordForm ? 'Cancel Password Change' : 'Change Password'}
          </button>

          {showPasswordForm && (
            <form onSubmit={handlePasswordUpdate}>
              <label>Old Password:</label>

              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <br />
              <label>New Password:</label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <br />
              <button type="submit" className="updatePass-btn">
                Update Password
              </button>
              {passwordMessage && <p>{passwordMessage}</p>}
            </form>
          )}
          <div>
            <form onSubmit={handleDelete}>
              <button type="submit" className="delete-btn">
                Delete Account
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
export default UserDetails
