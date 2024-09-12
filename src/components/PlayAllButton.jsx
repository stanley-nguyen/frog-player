import './PlayAllButton.css';
import { useDir } from '../context/DirectoryContext'
import { invoke } from '@tauri-apps/api/tauri';
import { useQueue } from '../context/QueueContext'

function PlayAllButton() {
    const { directory } = useDir();
    const { queue, setQueue } = useQueue();

    async function playAll() {
        const files = Object.values(await invoke('get_music_files', { directory: directory })).sort();
        setQueue(files);
    }

    return (
        <button className="play-all-button" onClick={playAll}>Play All</button>
    )
}

export default PlayAllButton;