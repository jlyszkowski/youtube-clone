import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recommended from '../../Components/Recommended/Recommended'
import { useParams } from 'react-router-dom'

const Video = () => {

  const {videoID, categoryID} = useParams();

  return (
    <div className='play-container'>
      <PlayVideo videoId={videoID} />
      <Recommended categoryID={categoryID}/>
    </div>
  )
}

export default Video