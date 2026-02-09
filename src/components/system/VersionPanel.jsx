import { useState } from 'react'
import { getVersions, saveVersion, deleteVersion } from '../../lib/version-control'
import { useFlow } from '../../lib/flow-context'
import { cn } from '../../lib/wireframe-system'
import { History, Save, Trash2, RotateCcw } from 'lucide-react'

export function VersionPanel({ open, onClose }) {
  const { state } = useFlow()
  const [versions, setVersions] = useState(getVersions)
  const [label, setLabel] = useState('')

  if (!open) return null

  const handleSave = () => {
    const name = label.trim() || `Snapshot ${new Date().toLocaleString('pt-BR')}`
    saveVersion(name, state)
    setVersions(getVersions())
    setLabel('')
  }

  const handleDelete = (id) => {
    deleteVersion(id)
    setVersions(getVersions())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-[480px] max-h-[600px] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-wire-border">
          <div className="flex items-center gap-2">
            <History size={18} />
            <span className="text-sm font-bold">Histórico de Versões</span>
          </div>
          <button onClick={onClose} className="text-wire-text-muted hover:text-wire-text-primary text-lg">
            ×
          </button>
        </div>

        {/* Save form */}
        <div className="px-5 py-3 border-b border-wire-border flex gap-2">
          <input
            type="text"
            placeholder="Nome do snapshot..."
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="flex-1 text-sm border border-wire-border rounded-md px-3 py-1.5 outline-none focus:border-gray-400"
          />
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-wire-bg-dark text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <Save size={13} />
            Salvar
          </button>
        </div>

        {/* Version list */}
        <div className="flex-1 overflow-y-auto p-2">
          {versions.length === 0 ? (
            <div className="text-center text-wire-text-muted text-sm py-8">
              Nenhuma versão salva ainda
            </div>
          ) : (
            [...versions].reverse().map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 group"
              >
                <div>
                  <div className="text-sm font-medium">{v.label}</div>
                  <div className="text-xs text-wire-text-muted">
                    {new Date(v.timestamp).toLocaleString('pt-BR')}
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="p-1.5 rounded text-wire-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
