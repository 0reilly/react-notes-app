import NoteItem from './NoteItem'

const NoteList = ({ notes, selectedNote, onSelectNote, onDeleteNote }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">No notes yet. Create your first note!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          isSelected={selectedNote && selectedNote.id === note.id}
          onSelect={() => onSelectNote(note)}
          onDelete={() => onDeleteNote(note.id)}
        />
      ))}
    </div>
  )
}

export default NoteList