import { useSelector } from 'react-redux';
import ChatComponent from './Chat/ChatComponent';
const SelectedBatchList = () => {
let {user} = useSelector(state => state?.auth);
    return (
    <div >
      {user.TOKEN ? <ChatComponent />: 'loading...'}
 </div>
  )
}

export default SelectedBatchList