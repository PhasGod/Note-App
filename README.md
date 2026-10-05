# Note App - Bài Thực Hành MERN Stack Cơ Bản

Một ứng dụng ghi chú đơn giản được xây dựng với **Node.js, Express, MongoDB (Mongoose)** ở Backend và **React (Vite, Hooks, Fetch API)** ở Frontend.

---

## 📁 Cấu Trúc Project

```text
note-app/
├── backend/
│   ├── models/
│   │   └── Note.js          # Mongoose Schema cho Note
│   ├── routes/
│   │   └── noteRoutes.js    # Express REST API routes (GET, POST /api/notes)
│   ├── server.js            # Entry point kết nối MongoDB & Express server
│   ├── .env                 # File biến môi trường local
│   ├── .env.example         # File mẫu biến môi trường
│   └── package.json         # Backend dependencies (express, mongoose, cors, dotenv, nodemon)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main App component
│   │   ├── NoteApp.jsx      # Component chính xử lý Form & Danh sách Note
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Giao diện CSS
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Cấu hình Vite & Proxy
│   └── package.json         # Frontend dependencies (react, react-dom, vite)
│
└── README.md                # Hướng dẫn chạy và thông tin project
```

---

## 🚀 Hướng Dẫn Yêu Cầu & Chạy Project

### 1. Yêu Cầu Tiền Đề (Prerequisites)
- [Node.js](https://nodejs.org/) (v16 trở lên)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) hoặc MongoDB Service đang chạy tại port local `27017` (URI default: `mongodb://127.0.0.1:27017/note_app`).

---

### 2. Cài Đặt Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

---

### 3. Chạy Ứng Dụng

#### Bước 1: Khởi Động MongoDB Service (nếu chưa chạy)
Đảm bảo MongoDB daemon (`mongod`) hoặc dịch vụ MongoDB Service đã khởi động trên máy tính của bạn.

#### Bước 2: Chạy Backend Server
```bash
cd backend
npm run dev
```
Backend sẽ khởi chạy tại: **`http://localhost:5000`**

#### Bước 3: Chạy Frontend App
Mở một cửa sổ terminal mới:
```bash
cd frontend
npm run dev
```
Frontend sẽ khởi chạy tại: **`http://localhost:3000`**

---

## 📡 Chi Tiết REST API

| Method | Endpoint | Description | Body (JSON) | Response Status |
|--------|----------|-------------|-------------|-----------------|
| `GET` | `/api/notes` | Lấy toàn bộ ghi chú (xếp theo thời gian mới nhất lên đầu) | None | `200 OK` |
| `POST` | `/api/notes` | Tạo mới một ghi chú | `{"title": "Học React", "content": "Ôn useState"}` | `201 Created` |

### Ví Dụ Test API POST:
```json
{
  "title": "Học Node.js",
  "content": "Ôn Express và MongoDB"
}
```

---

## 💡 Độc Đáo Trong Logic React
- **Hiển thị ban đầu**: Gọi `GET /api/notes` trong `useEffect(() => { ... }, [])`.
- **Cập nhật UI tức thì**: Sau khi bấm **"Thêm Ghi Chú"** và `POST /api/notes` thành công, Note mới (`newNote`) được prepend thẳng vào state:
  ```javascript
  setNotes(prevNotes => [newNote, ...prevNotes]);
  ```
  Không reload trang (`window.location.reload()`), giúp trải nghiệm người dùng mượt mà và trực quan!
