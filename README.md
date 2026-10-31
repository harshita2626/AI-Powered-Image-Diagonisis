# MediScan AI: AI-Powered Medical Imaging Diagnosis System

A web application that analyzes brain MRI scans for tumor detection and classification, and explains each prediction visually with Grad-CAM heatmaps.

**Tumor classes:** Glioma · Meningioma · Pituitary · No Tumor

> Group project at the Tinkering Lab, Vignan Institute of Information Technology (Nov 2025).

---

## Screenshots

### Image Upload
Drag and drop (or browse for) a CT/MRI scan. Supports DICOM, PNG and JPG.

<img width="1392" height="852" alt="image" src="https://github.com/user-attachments/assets/4f6d843f-c82f-40da-9554-b01bbde21f11" />


### Analysis and Grad-CAM Visualization
The result page shows the detection status, confidence score, tumor details, and a Grad-CAM heatmap with an adjustable opacity slider.

<img width="1266" height="887" alt="image" src="https://github.com/user-attachments/assets/e7150145-91bd-424a-9d03-dfa63f28bdee" />


---

## Features

- **Image upload:** drag-and-drop or file browser, with support for DICOM (.dcm), PNG and JPG files (up to 50MB)
- **Tumor detection and classification** with a confidence score
- **Grad-CAM heatmap** showing which regions of the scan influenced the prediction, with a toggle and opacity slider
- **Detailed analysis panel:** malignancy, size, location, and other findings
- **Actions and report:** download report, 3D model view, and second-opinion options
- **Three-tab interface:** Image Upload, Analysis, and Patient History
- Responsive UI built with React and Tailwind CSS

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons |
| Backend | Flask (Python) |
| Model | VGG16 transfer learning with a custom CNN classifier head |
| Explainability | Grad-CAM |
| Preprocessing | 224x224 resize, data augmentation, 80/20 train-test split |

## Project Structure

```
.
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── eslint.config.js
├── screenshots/
│   ├── upload-page.png
│   └── analysis-page.png
└── src/
    ├── main.tsx
    ├── App.tsx
    └── index.css
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- The Flask backend running locally (see the Backend section)

### Run the frontend

```bash
# 1. Clone the repository
git clone https://github.com/harshita2626/AI-Powered-Image-Diagonisis.git
cd AI-Powered-Image-Diagonisis

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the address shown in the terminal (usually `http://localhost:5173`).

### Other scripts

| Command | What it does |
|---|---|
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

## Backend

The frontend sends the uploaded scan to a Flask API, which runs the VGG16-based model and returns the predicted class, confidence score, and Grad-CAM heatmap.

```bash
# In the backend folder
pip install -r requirements.txt
python app.py
```

By default the API runs at `http://127.0.0.1:5000`. Make sure the frontend points to this address.

## How It Works

1. The user uploads an MRI image.
2. The image is resized to 224x224 and normalized.
3. The VGG16 model, with a custom classifier on top, predicts one of the four classes.
4. Grad-CAM highlights the regions that contributed most to the decision.
5. The prediction, confidence score, and heatmap are displayed in the interface.

## Disclaimer

This project is for educational purposes only. It is not a medical device and must not be used for real clinical diagnosis. The scan shown in the screenshots is a sample image used for demonstration.

## Team

Group project by a team of five students. Maintained by [Masapu Harshita](https://github.com/harshita2626).
