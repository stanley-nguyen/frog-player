import { useContext } from 'react';
import DirectoryContext from '../context/DirectoryContext';
import { open } from '@tauri-apps/api/dialog';

export default function DirectoryButton() {
  const { directory, setDirectory } = useContext(DirectoryContext);

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
