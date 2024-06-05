import { useContext } from 'react'
import DirectoryContext from '../context/DirectoryContext';

function PlaylistPage() {
  const { directory } = useContext(DirectoryContext);
  return (
    <div>PlaylistPage {directory}</div>
  )
}

export default PlaylistPage;