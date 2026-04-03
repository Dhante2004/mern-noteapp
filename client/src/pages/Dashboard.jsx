import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../api/notes";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingNote) {
        await updateNote(editingNote._id, formData);
        setEditingNote(null);
      } else {
        await createNote(formData);
      }

      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Unable to save note");
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      if (editingNote && editingNote._id === id) {
        setEditingNote(null);
      }
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Unable to delete note");
    }
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <div className="dashboard-shell">
        <div className="dashboard-header">
          <div>
            <h1>Matcha Notes</h1>
            <p className="section-subtitle">
              Organize your ideas in a calm, simple, and focused workspace.
            </p>
          </div>

          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="dashboard-grid">
          <div className="form-card">
            <h2>{editingNote ? "Edit note" : "Create note"}</h2>
            <p className="section-subtitle">
              {editingNote
                ? "Update your selected note."
                : "Write a new note and save it to your collection."}
            </p>

            <NoteForm
              onSubmit={handleCreateOrUpdate}
              editingNote={editingNote}
              onCancel={handleCancelEdit}
            />
          </div>

          <div className="notes-card">
            <h2>Your notes</h2>
            <p className="section-subtitle">
              View, update, and manage all your saved notes.
            </p>

            <NoteList
              notes={notes}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;