import { useState, useEffect } from 'react'

const NoteEditor = ({ note, onSave, onDelete }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setIsEditing(true)
    } else {
      setTitle('')
      setContent('')
      setIsEditing(false)
    }
  }, [note])

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      if (isEditing) {
        onSave(note.id, title.trim(), content.trim())
      } else {
        onSave(title.trim(), content.trim())
        setTitle('')
        setContent('')
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault()
      handleSave()
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="h-full">
      {!isEditing ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No note selected
          </h3>
          <p className="text-gray-500 text-sm">
            Select a note from the list or create a new one to start editing.
          </p>
        </div>
      ) : (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title..."
                className="w-full text-2xl font-bold text-gray-800 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400"
                onKeyDown={handleKeyDown}
              />
              {note && (
                <p className="text-gray-500 text-sm mt-1">
                  Last updated: {formatDate(note.updatedAt)}
                </p>
              )}
            </div>
            
            <div className="flex space-x-2 ml-4">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Save</span>
              </button>
              
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
              )}
            </div>
          </div>

          {/* Content Editor */}
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your note here..."
              className="w-full h-full min-h-[400px] text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder-gray-400 text-base leading-relaxed"
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-500 text-xs">
              Tip: Press Ctrl+S to save your note
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteEditor