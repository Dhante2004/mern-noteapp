function NoteList({ notes, onEdit, onDelete }) {
  if (!notes.length) {
    return (
      <div className="empty-state">
        <p>No notes yet.</p>
        <p>Create your first note to start organizing your ideas.</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div className="note-item" key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <div className="note-actions">
            <button className="btn btn-secondary" onClick={() => onEdit(note)}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(note._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;