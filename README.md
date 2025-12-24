##  Codesync – Real-Time Collaborative Code Editor

Codesync is a sophisticated real-time collaborative platform that allows developers to join a shared room and write code together simultaneously. Built with a focus on low latency and synchronization, it provides a seamless **Google Docs–like experience for programming**.

---

##  Features

- **Real-Time Synchronization**  
  Instant code updates across all connected users via WebSockets.

- **Room-Based Sessions**  
  Create or join specific rooms using unique IDs for private or group collaboration.

- **Syntax Highlighting**  
  Support for multiple programming languages powered by the CodeMirror engine.

- **User Presence**  
  Real-time tracking of collaborators within the same workspace.

- **Clean UI**  
  A minimalist, distraction-free interface designed for productivity.

---

## Tech Stack

### Frontend
- **React.js** – Component-based UI development  
- **CodeMirror** – Advanced in-browser code editor  
- **HTML5 / CSS3 / JavaScript** – Core web technologies  

### Backend
- **Node.js** – Scalable server-side runtime  
- **Express.js** – Minimalist web framework  
- **Socket.IO** – Real-time, bidirectional communication  

### Tools
- **Git & GitHub** – Version control and repository hosting  
- **npm** – Package management  

---

##  Project Structure

realtime-codeeditor/

├── client/                                
React frontend application

│   ├── public/            
Static assets and index.html

│   ├── src/               
UI components, logic, and styles

│   └── package.json       
Frontend dependencies

├── server/                
Node.js & Socket.IO backend

│   ├── index.js           
Entry point for WebSocket logic

│   └── package.json       
Backend dependencies

├── .gitignore             
Excluded files (node_modules, etc.)

└── README.md             
Project documentation


---

##  Installation and Setup

Follow the steps below to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/VigneshDeekonda/Codesync-Collaborative-editor.git
cd realtime-codeeditor
```
2. **Install Dependencies**  

**Backend Setup**

```bash
cd server
npm install
```
**Frontend Setup**

```bash
cd ../client
npm install
```

**3. Run the Application**

Start the backend first, then the frontend

**Start Server**

```bash
Copy code
cd server
npm start
```

**Start Client**
```bash
cd ../client
npm start
```

**4. Open in Browser**
```Visit:
http://localhost:3000
```
## How It Works
* Handshake :
When a user enters a Room ID, a WebSocket handshake is initiated via Socket.IO.

* Rooms
The server assigns each socket connection to a specific room channel.

* Broadcasting
CodeMirror detects code changes and emits events to the server, which broadcasts them to all users in the same room.

* Synchronization
All connected clients update their local editor state in real time without page refresh.

## Future Enhancements
 * Code Execution with integrated terminal

* Authentication using JWT and saved project history

 * Voice and Video Chat using WebRTC

* Cloud Persistence with MongoDB or PostgreSQL

## Contributing
* Contributions are welcome.

* Please fork the repository, create a feature branch, and submit a pull request.

## License
* This project is licensed under the MIT License.

## Author
**Vignesh Deekonda GitHub** : https://github.com/VigneshDeekonda

**Vignesh Deekonda Github** : https://www.linkedin.com/in/vigneshdeekonda/

