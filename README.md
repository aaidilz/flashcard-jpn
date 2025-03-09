# Simple Flashcard with firebase
ini cuman sebuah project sederhana yang menggunakan firebase sebagai database untuk menyimpan data flashcard. Project ini dibuat menggunakan React

project ini cuman dibuat karena gabut pas puasa :)

## Cara menjalankan project
1. Edit file `firebase-config.tsx` di folder `src` dengan mengganti `firebaseConfig` dengan konfigurasi firebase kalian.
2. Pastikan nama collection di firebase kalian adalah `cards`.

| Field    | Type   |
|----------|--------|
| kanji    | string |
| hiragana | string |
| katakana | string |
| romaji   | string |
| bahasa   | string |