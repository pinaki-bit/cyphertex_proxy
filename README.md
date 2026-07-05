# Cyphertex Proxy (CryptoForge X)

Welcome to **Cyphertex Proxy**, an advanced cryptography learning and visualization platform. Designed with a stunning 3D-interactive frontend and a robust backend engine, this application allows users to explore, understand, and apply various encryption algorithms in real-time.

## 🌟 What is this project about?

Cyphertex Proxy is built to bridge the gap between complex cryptographic concepts and intuitive understanding. By providing a visual, hands-on ecosystem, it demystifies how encryption algorithms transform plaintext into ciphertext and vice versa. 

Whether you are a cybersecurity enthusiast, a computer science student, or a developer looking to integrate encryption, this platform offers a playground to test and visualize cryptographic methods interactively.

## 🚀 Key Benefits

- **Educational & Intuitive**: See exactly how your data gets encrypted step-by-step.
- **Rich Algorithm Support**: Supports a wide array of historical and modern encryption techniques.
- **Immersive 3D Experience**: Features a cutting-edge, cyber-themed UI built with React Three Fiber and Three.js.
- **Full-Stack Architecture**: A scalable Next.js frontend seamlessly communicating with an Express/Node.js backend, backed by PostgreSQL.

## 🔐 Supported Algorithms

The platform supports a robust registry of algorithms out of the box:
- **Modern Encryption**: AES, RSA
- **Historical Ciphers**: Caesar, Vigenère, Playfair, Hill Cipher, Affine Cipher, Rail Fence

## 🛠️ Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS, Framer Motion, Three.js (@react-three/fiber, @react-three/drei), Zustand
- **Backend**: Node.js, Express, TypeScript, Prisma ORM
- **Database**: PostgreSQL (Containerized via Docker)

---

## 💻 How to Use the App (Local Setup)

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Docker Desktop (Optional, but recommended for the database)

### 1. Database Setup
If you have Docker installed, you can spin up the PostgreSQL database easily:
```bash
docker-compose up -d
```
*Note: If you aren't using Docker, make sure you have a PostgreSQL instance running locally and update the `DATABASE_URL` in the backend accordingly.*

### 2. Running the Backend
Navigate to the backend directory, install dependencies, and start the server:
```bash
cd backend
npm install
# Push the Prisma schema to your database
npx prisma db push 
# Start the development server
npm run dev
```
The backend will run on `http://localhost:3001`.

### 3. Running the Frontend
Open a new terminal, navigate to the frontend directory, install dependencies, and start the Next.js app:
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:3000`.

### 4. Explore
Open `http://localhost:3000` in your browser. 
- Use the **Algorithm Selector** on the sidebar to pick an encryption method.
- Enter your plaintext and any required keys.
- Watch the **Encryption Engine** process your data.
- Explore the **Diagnostic Panel** for deep security insights.

---

## 🤝 Contributing
Contributions are always welcome! Feel free to open an issue or submit a pull request if you'd like to add new algorithms or improve the 3D visualization.
