# 🍥 NARUTODLE BREAKER

> **Unleash the secret Jutsu to reveal the daily answers for all Narutodle modes instantly.**

A lightweight browser extension (or console script) built for the ultimate Naruto fans who just need to know the answer, Dattebayo!

---

## 🌟 Features

* **⚡ Multi-Mode Decoding:** Solves CLASSIC, JUTSU, QUOTE, and EYE game modes in a single click **(You just need to enter the game modes before)**.
* **💾 LocalStorage Access:** Programmatically retrieves the encrypted answer from your browser's local storage.
* **🔒 AES Decryption:** Uses the game's static decryption keys to reverse the cipher.
* **🎨 Clean UI:** Provides results in a minimalist, themed popup window.

---

## 📸 Demo & Screenshots

Here's a quick look at the solver in action:

### Usage Example

| Mode: Classic | Mode: Quote |
| :-----------: | :---------: |
| ![Classic Mode Screenshot](https://i.ibb.co/R4yD7085/01.png) | ![Quote Mode Screenshot](https://i.ibb.co/ch7J07Kc/03.png) |
| ![Classic Mode Screenshot](https://i.ibb.co/LXKR5hm5/02.png) | ![Classic Mode Screenshot](https://i.ibb.co/B51KmypB/04.png) |

### Console "Super Snippet" Result
![snippt usage](https://i.ibb.co/35SsV3vz/Captura-de-tela-de-2025-11-20-18-16-35.png)

---

## 🚀 Installation

### A. As a Browser Extension (Recommended)

This requires setting up the `manifest.json`, HTML, CSS, and JS files (as previously discussed).

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/YourUsername/Narutodle-Ninja-Solver.git](https://github.com/YourUsername/Narutodle-Ninja-Solver.git)
    ```
2.  **Open Extensions:** Navigate to `chrome://extensions` (or `about:debugging#/runtime/this-firefox` for Firefox).
3.  **Load Unpacked:** Enable **Developer Mode** and click **"Load Unpacked"**.
4.  Select the `Narutodle-Ninja-Solver` folder.

The solver icon will appear in your toolbar!

### B. As a Console Snippet (Quick Access)

If you don't want to install the extension, you can use the raw JavaScript snippet directly in the console.

1.  Open **narutodle.net**.
2.  Chose a mode and open the Developer Console (F12).
3.  Copy the entire content from the file: **[Snippet Here](https://gist.github.com/mgluizbrito/77efa526ae592271f8cc250e9bb08b76)**
4.  Paste it into the console and press **Enter**.

---

## ⚙️ Development & Technical Details

This project works by exploiting the predictability of the AES encryption mechanism used by the game.

| Component | Function | Status |
| :--- | :--- | :--- |
| **`popup.js`** | Handles UI events, sends mode request to `content.js`, and performs final decryption. | Ready |
| **`content.js`** | Acts as a proxy; retrieves the mode-specific ciphertext from the domain's `localStorage`. | Ready |
| **`crypto-js.min.js`** | Universal library included locally for secure decryption. | Ready |
| **Decryption Keys** | Static keys used for AES decryption: `QhDZJfngdx`, `D5XCtTOObw`. | Verified |

---

## 🤝 Contribution

Contributions are welcome! If you find that the decryption keys have changed, or if the LocalStorage structure is updated, please open an issue or submit a Pull Request.

1.  Fork the project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'feat: Add new key support'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---