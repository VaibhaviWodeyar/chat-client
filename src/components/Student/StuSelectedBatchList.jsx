import { useSelector } from 'react-redux';
import ChatComponent from './Chat/StdChatComponent';
const StuSelectBatchList = () => {
let {user} = useSelector(state => state?.auth);
    return (
    <div >
      {user.TOKEN ? <ChatComponent />: 'loading...'}
 </div>
  )
}

export default StuSelectBatchList