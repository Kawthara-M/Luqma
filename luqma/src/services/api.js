import Axios from 'axios'

export const BASE_URL = 'https://luqma.onrender.com'

const Customer = Axios.create({ baseURL: BASE_URL })

Customer.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config

  },
  async (error) => {
    console.log({ msg: 'Axios Interceptor Error!', error })
    throw error
  }
)

export default Customer
