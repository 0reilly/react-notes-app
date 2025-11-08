const NoteItem = ({ note, isSelected, onSelect, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const truncateContent = (content, maxLength = 50) => {
    if (!content) return 'No content'
    return content.length > maxLength 
      ? content.substring(0, maxLength) + '...'
      : content
  }

  return (
    <div
      className={`
        p-3 rounded-lg border cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'bg-blue-50 border-blue-200 shadow-sm' 
          : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
        }
      `}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800 text-sm line-clamp-1">
          {note.title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      <p className="text-gray-600 text-xs mb-2 line-clamp-2">
        {truncateContent(note.content)}
      </p>
      
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-xs">
          {formatDate(note.updatedAt)}
        </span>
        {isSelected && (
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            Active
          </span>
        )}
      </div>
    </div>
  )
}

export default NoteItem