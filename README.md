📌 Kanban Board

A modern and responsive **Kanban Task Management Board** built with **HTML, CSS, and JavaScript**. This application allows users to create, organize, drag-and-drop, and manage tasks across different workflow stages.

🚀 Features

* ✅ Create new tasks with title and description
* ✅ Drag and drop tasks between columns
* ✅ Three workflow stages:

  * To Do
  * In Progress
  * Done
* ✅ Delete tasks instantly
* ✅ Task count badges for each column
* ✅ Local Storage support (tasks persist after page refresh)
* ✅ Responsive design for desktop and mobile devices
* ✅ Modern dark-themed UI
* ✅ Accessible modal for task creation

---

🛠️ Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript
* Local Storage API
* Drag & Drop API

---

📂 Project Structure

kanban-board/
|
├── index.html
├── style.css
├── script.js
└── README.md
|
---
 ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/kanban-board.git
```

Navigate to project folder

```bash
cd kanban-board
```

Open the project

Simply open `index.html` in your browser.

---

🎯 How It Works

Adding a Task

1. Click the **Add Task** button.
2. Enter task title and description.
3. Click **Add Task**.

Moving a Task

* Drag a task card.
* Drop it into another column.

Deleting a Task

* Click the **Delete** button on any task card.

Automatic Saving

All tasks are automatically saved in the browser's Local Storage.

Even after refreshing the page, your tasks remain available.

---

💾 Local Storage Format

```javascript
{
  todo: [],
  progress: [],
  done: []
}
```

---

🎨 UI Highlights

* Minimalist dark interface
* Animated modal popup
* Smooth hover effects
* Drag-and-drop interactions
* Responsive layout
* Custom column indicators

---

📱 Responsive Design

The board automatically adapts to:

* Desktop Screens
* Tablets
* Mobile Devices

Columns stack vertically on smaller screens for better usability.

---

🔮 Future Improvements

* Edit existing tasks
* Due dates
* Task priorities
* Search & filter functionality
* User authentication
* Multiple boards
* Team collaboration
* Dark/Light theme switcher

---

🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

📜 License

This project is licensed under the MIT License.

---

👨‍💻 Author

**Ansh Kushwaha**

Feel free to connect and contribute to the project.
