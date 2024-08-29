import './PlayAllButton.css';
import { useDir } from '../context/DirectoryContext'
import { invoke } from '@tauri-apps/api/tauri';

function PlayAllButton() {
    const { directory } = useDir();

    async function playAll() {
        const files = await invoke('get_music_files', { directory: directory });
        console.log(files);
    }

    return (
        <button className="play-all-button" onClick={playAll}>Play All</button>
    )
}

export default PlayAllButton;