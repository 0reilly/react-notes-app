import { useState, useEffect } from 'react'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'

function App() {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = (title, content) => {
    const newNote = {
      id: Date.now().toString(),
      title: title || 'Untitled Note',
      content: content || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setNotes([newNote, ...notes])
    setSelectedNote(newNote)
  }

  const updateNote = (id, title, content) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, title, content, updatedAt: new Date().toISOString() }
        : note
    ))
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
    if (selectedNote && selectedNote.id === id) {
      setSelectedNote(null)
    }
  }

  const selectNote = (note) => {
    setSelectedNote(note)
  }

  const createNewNote = () => {
    setSelectedNote(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Notes App</h1>
          <p className="text-gray-600">A simple and elegant note-taking application</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar with note list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Your Notes</h2>
                <button
                  onClick={createNewNote}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  + New Note
                </button>
              </div>
              <NoteList 
                notes={notes}
                selectedNote={selectedNote}
                onSelectNote={selectNote}
                onDeleteNote={deleteNote}
              />
            </div>
          </div>
          
          {/* Main editor area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <NoteEditor
                note={selectedNote}
                onSave={selectedNote ? updateNote : addNote}
                onDelete={selectedNote ? () => deleteNote(selectedNote.id) : null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App