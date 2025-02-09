# TutorGo Web App

## 📌 Project Overview
TutorGo is a web application designed for students to find tutors, schedule lessons, leave reviews, and send follow requests. The application is built using **React.js**, **Firebase Firestore**, and **CSS** for a dynamic and responsive user experience.

---

## 🚀 Getting Started

### **1️⃣ Prerequisites**
Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: LTS version)
- npm (comes with Node.js) or yarn as a package manager
- Git (for cloning the repository)
- Firebase account (if testing with your own Firebase)

---

### **2️⃣ Clone the Repository**
To get a local copy of the project, run:
```sh
git clone https://github.com/XaviersHub/TutorWebpage.git
cd TutorWebpage
```
3️⃣ Install Dependencies
Navigate into the project folder and install the required npm packages:

```sh
npm install
```
This will install all dependencies listed in package.json, including:
React.js (UI Framework)
Firebase (Backend & Database)
React Router (Navigation)
JS-Cookie (For managing authentication cookies)
4️⃣ Start the development server

```sh
npm run dev
```
This will start the Vite development server.
The app will run on http://localhost:5173/ (or another available port).

---

⚡ Key Features
✔️ User Authentication (Using Cookies for session management)
✔️ Find a Tutor (Search and filter by subject & level)
✔️ Follow Requests (Students must request to follow a tutor)
✔️ Lesson Scheduling (Tutors create lessons, students view them)
✔️ Reviews & Ratings (Students can review tutors)
✔️ Real-time Firestore Updates (Auto-updates schedules, lessons)
✔️ Responsive UI (Designed for both mobile & desktop)

🔥 Useful Commands
Command	Description
npm install	Installs all dependencies
npm start	Runs the app locally on localhost:3000
npm run build	Creates a production build
npm test	Runs test cases (if implemented)
git pull origin main	Fetches the latest updates from GitHub
git push origin main	Pushes changes to the repository
🛠 Troubleshooting
Common Issues & Solutions
npm start fails with missing modules

Run npm install again to ensure dependencies are installed.

Port 3000 is already in use

Run:
```sh
kill -9 $(lsof -t -i:3000)
```
