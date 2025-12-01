# WikiSongs 🎵

[![React](https://img.shields.io/badge/React-19.x-blue?logo=react)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/rayep/rk_wikisongs?style=social)](https://github.com/rayep/rk_wikisongs)

A simple React-based app to explore a composer’s discography or filmography from Wikipedia and keep track of your favorite songs.

---

## 📖 About
**WikiSongs** lets you:
- Pull a composer’s discography or filmography from Wikipedia (via regular URL or REST API).
- Browse albums and mark songs as **liked** or **skipped**.
- Track progress: albums visited, completed, and songs marked.

> **Note:** This app is **frontend-only**. All data is stored in the browser’s `localStorage`. Nothing is transmitted externally.

---

## 🚀 Live Demo
The app is live and accessible via GitHub Pages:
[**Click here to use WikiSongs**](https://rayep.github.io/rk_wikisongs/)

---

## 🛠 Tech Stack
- **React** with [GitHub Primer React](https://primer.style/react) components.
- **jQuery** for fetching Wikipedia pages.

---

## ✨ Features
✅ **Create** – Start by providing a Wikipedia URL for the composer.  
✅ **Search** – Quickly find albums.  
✅ **Import** – Load a JSON file matching the app’s state structure.  
✅ **Export** – Save current composer data as JSON for later use.  
✅ **Save & Load** – Persist data locally and reload anytime.  
✅ **Mark Progress** – Albums → mark as **complete**, Songs → mark as **liked**.  

---

## 📱 Caveats
- Built for **desktop view** (regular & wide). Mobile view is not optimized.

---

## 🚀 Getting Started
```bash
git clone https://github.com/rayep/rk_wikisongs.git
cd rk_wikisongs
npm install
npm run dev
```
Open in browser: `http://localhost:8080/index.html`

---

## 💾 Data Storage
- All data is stored in **browser localStorage**.
- No backend, no external data transmission.

---

## ⚠ Known Limitations
- **Wikipedia formatting inconsistency**: Composer pages vary in structure (tables, lists, rowspan). Current logic assumes album names are in italic or hyperlink tags. This may fail for some pages.

---

## 🔮 Future Enhancements
- Improve Wikipedia parsing logic.
- Add mobile-friendly UI.
- Integrate Wikidata for structured album/film data.

---

## 🤝 Contributing

Contributions are welcome! If you’d like to help improve **WikiSongs**, here’s how you can get started:

1.  **Fork the repository**  
    Click the **Fork** button at the top of this page to create your own copy.

2.  **Clone your fork**
    ```bash
    git clone https://github.com/rayep/rk_wikisongs.git
    cd wikisongs
    ```

3.  **Create a new branch**
    ```bash
    git checkout -b feature-name
    ```

4.  **Make your changes**  
    Add your improvements or bug fixes.

5.  **Commit and push**
    ```bash
    git commit -m "Describe your changes"
    git push origin feature-name
    ```

6.  **Open a Pull Request**  
    Go to the original repo and submit a PR with a clear description of your changes.

---

## 📜 License
MIT License.
