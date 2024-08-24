import { useDir } from '../context/DirectoryContext';
import { useAudio } from '../context/AudioContext';

function PlaylistPage() {
  const { directory } = useDir();

  return (
    <div>PlaylistPage {directory}</div>
  )
}

export default PlaylistPage;