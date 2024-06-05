// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_music_files(directory: &str) -> Vec<String> {
    if directory.is_empty() {
        return Vec::new();
    }

    let files = fs::read_dir(directory).unwrap();

    let mut music_files: Vec<String> = Vec::new();
    let extensions: Vec<&str> = vec![".mp3", ".m4a", ".wav", ".flac", ".ogg", ".aac"];

    for file in files {
        let file_name = file.unwrap().file_name().into_string().unwrap();
        if extensions.iter().any(|&ext| file_name.ends_with(ext)) {
            music_files.push(file_name);
        }
    }
    return music_files;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_music_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
