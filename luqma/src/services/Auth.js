import Customer from './api'

export const SignUpCustomer = async (data) => {
  try {
    const res = await Customer.post('/auth/sign-up', data)
    return res.data
  } catch (error) {
    throw error
  }
}

// for sign in
// export const SignInUser = async (data) => {
//   try {
//     const res = await Customer.post('/auth/sign-in', data)
//     // Set the current signed in users token to localStorage
//     localStorage.setItem('token', res.data.token)
//     return res.data.user
//   } catch (error) {
//     throw error
//   }
// }

// if customer still has a valid session
// export const CheckSession = async () => {
//   try {
//     const res = await Customer.get('/auth/session')
//     // Checks if there is a token and if it is valid
//     return res.data
//   } catch (error) {
//     throw error
//   }
// }
