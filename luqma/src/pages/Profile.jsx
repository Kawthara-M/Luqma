import UserDetails from '../components/UserDetails'
// import PreviousOrderList from '../components/PreviousOrderList'

import { useParams } from 'react-router-dom'

const Profile = () => {
  const { id } = useParams()
  return (
    <div>
      <UserDetails customerId={id} />
    </div>
  )
}
export default Profile
