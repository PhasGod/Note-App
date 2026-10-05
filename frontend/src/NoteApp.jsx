import React, { useState, useEffect } from "react";

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Lấy danh sách ghi chú khi component được mount lần đầu
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/notes");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error("Lỗi khi tải ghi chú:", err);
      setError("Không thể tải danh sách ghi chú. Vui lòng kiểm tra backend server.");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý submit form thêm ghi chú mới
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề ghi chú!");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Lỗi khi thêm ghi chú: ${response.status}`);
      }

      const newNote = await response.json();

      // Cập nhật state UI trực tiếp mà KHÔNG reload trang
      setNotes((prevNotes) => [newNote, ...prevNotes]);

      // Reset form input
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Lỗi khi thêm ghi chú:", err);
      setError(err.message || "Không thể thêm ghi chú. Vui lòng thử lại!");
    } finally {
      setSubmitting(false);
    }
  };

  // Hàm format ngày tháng hiển thị đẹp mắt
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>NOTE APP</h1>
        <p>Ứng dụng ghi chú đơn giản với Node.js, Express, MongoDB & React</p>
      </header>

      {error && <div className="error-banner">{error}</div>}

      {/* Form thêm ghi chú */}
      <div className="note-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Tiêu đề</label>
            <input
              id="title"
              type="text"
              className="form-input"
              placeholder="Nhập tiêu đề ghi chú..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Nội dung</label>
            <textarea
              id="content"
              className="form-textarea"
              placeholder="Nhập nội dung ghi chú..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? "Đang thêm..." : "Thêm Ghi Chú"}
          </button>
        </form>
      </div>

      {/* Danh sách ghi chú */}
      <section className="notes-section">
        <h2 className="section-title">
          DANH SÁCH GHI CHÚ
          <span className="badge-count">{notes.length}</span>
        </h2>

        {loading ? (
          <div className="loading-state">Đang tải ghi chú...</div>
        ) : notes.length === 0 ? (
          <div className="empty-state">
            <p>Chưa có ghi chú nào. Hãy thêm ghi chú đầu tiên của bạn ở trên!</p>
          </div>
        ) : (
          <div className="notes-list">
            {notes.map((note) => (
              <div key={note._id || note.createdAt} className="note-item">
                <div className="note-header">
                  <h3 className="note-title">{note.title}</h3>
                  <span className="note-date">{formatDate(note.createdAt)}</span>
                </div>
                {note.content && <p className="note-content">{note.content}</p>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default NoteApp;
