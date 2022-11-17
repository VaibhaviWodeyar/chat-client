import { useSelector } from 'react-redux';
import Spinner from '../../pages/Spinner';
import Chat1 from '../Chat/Chat1';
const SelectedBatchList = () => {
let {user} = useSelector(state => state?.auth);
    return (
    <div >
      {user.TOKEN ? <Chat1 /> : <Spinner />}
 </div>
  )
}

export default SelectedBatchList