import { useDir } from '../context/DirectoryContext';
import { open } from '@tauri-apps/api/dialog';

import './DirectoryButton.css';

export default function DirectoryButton() {
  const { setDirectory } = useDir();

  async function openDirectory() {
    try {
      const path = await open({
        title: 'Select Music Directory',
        buttonLabel: 'Select',
        directory: true,
      });
      setDirectory(path);
    } catch (error) {
      console.error("Error opening directory:", error);
    }
  }

  return (
    <button className='dir-button' onClick={openDirectory}>Select Music Directory</button>
  );
}
