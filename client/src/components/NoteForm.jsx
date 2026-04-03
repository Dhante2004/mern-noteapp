import { useState, useEffect } from "react";

function NoteForm({ onSubmit, editingNote, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title || "",
        content: editingNote.content || "",
      });
    } else {
      setFormData({
        title: "",
        content: "",
      });
    }
  }, [editingNote]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    if (!editingNote) {
      setFormData({
        title: "",
        content: "",
      });
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="note-title">Title</label>
        <input
          id="note-title"
          type="text"
          name="title"
          placeholder="Enter note title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="note-content">Content</label>
        <textarea
          id="note-content"
          name="content"
          placeholder="Write your note here"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn-primary" type="submit">
        {editingNote ? "Update Note" : "Add Note"}
      </button>

      {editingNote && (
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default NoteForm;