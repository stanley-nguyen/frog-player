import { appWindow } from '@tauri-apps/api/window'
import "./TitleBar.css";

const TitleBar = () => {
    return (
        <div data-tauri-drag-region className="title-bar" onDoubleClick={() => appWindow.toggleMaximize()}>
            <div className="title-bar-button" onClick={() => appWindow.minimize()}>
                <img
                    src="https://api.iconify.design/mdi:window-minimize.svg"
                />
            </div>
            <div className="title-bar-button" onClick={() => appWindow.toggleMaximize()}>
                <img
                    src="https://api.iconify.design/mdi:window-maximize.svg"
                />
            </div>
            <div className="title-bar-button" onClick={() => appWindow.close()}>
                <img src="https://api.iconify.design/mdi:close.svg" />
            </div>
        </div>
    );
}

export default TitleBar;