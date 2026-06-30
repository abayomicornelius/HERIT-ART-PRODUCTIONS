import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductionLayout from '../../components/layout/ProductionLayout'
import Badge from '../../components/ui/Badge'
import { MOCK_PROJECTS, MOCK_TEAM } from '../../data/mockData'
import { useToast } from '../../context/ToastContext'

const statusVariant = { Pending: 'warning', 'In Progress': 'info', Completed: 'success' }
function fmtDate(s) { return new Date(s).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }

const FILE_ICONS = { mp4:'🎬', mov:'🎬', png:'🖼️', jpg:'🖼️', jpeg:'🖼️', pdf:'📄', zip:'📦', ai:'✏️', psd:'🎨' }

export default function ProdProjectDetail() {
  const { id } = useParams()
  const toast = useToast()
  const fileRef = useRef()
  const [tab, setTab] = useState('brief')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [status, setStatus] = useState(null)
  const [assignee, setAssignee] = useState(null)
  const project = MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[0]
  const curStatus = status || project.status

  function onFileChange(e) {
    const list = [...(e.target.files || [])]
    const mapped = list.map(f => ({
      name: f.name,
      size: f.size > 1048576 ? (f.size/1048576).toFixed(1)+' MB' : (f.size/1024).toFixed(0)+' KB',
      icon: FILE_ICONS[f.name.split('.').pop().toLowerCase()] || '📎',
    }))
    setUploadedFiles(prev => [...prev, ...mapped])
    toast.success(`${list.length} file(s) uploaded`)
  }

  function deliver() {
    if (uploadedFiles.length === 0) { toast.error('Upload at least one file before delivering'); return }
    setStatus('Completed')
    toast.success('Content delivered! Brand has been notified by email.')
  }

  return (
    <ProductionLayout
      title={project.name}
      subtitle={`${project.id} · ${project.brand}`}
      actions={<Link to="/production/projects" className="text-sm text-white/40 hover:text-white">← All Projects</Link>}>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2">
          <div className="flex border-b border-hap-border mb-6">
            {['brief', 'assets', 'upload', 'notes'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`tab-item capitalize ${tab === t ? 'active' : ''}`}>{t}</button>
            ))}
          </div>

          {tab === 'brief' && (
            <div className="card animate-slide-up">
              <h4 className="font-semibold text-white mb-5">Project Brief</h4>
              {[
                ['Content Type', project.contentType],
                ['Brand',        project.brand],
                ['Deadline',     fmtDate(project.deadline)],
                ['Primary Goal', project.goal],
                ['Audience',     project.audience.join(', ')],
                ['Tone',         project.tone.join(', ')],
                ['Platforms',    project.platforms.join(', ')],
              ].map(([label, value]) => (
                <div key={label} className="info-row">
                  <span className="text-xs text-white/30 font-bold uppercase tracking-wider w-36 flex-shrink-0">{label}</span>
                  <span className="text-sm text-white/70 flex-1 leading-relaxed">{value || '—'}</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'assets' && (
            <div className="animate-slide-up card text-center py-12">
              <span className="text-4xl block mb-3 opacity-30">📁</span>
              <p className="text-white/30 text-sm">No assets uploaded by the brand for this project.</p>
            </div>
          )}

          {tab === 'upload' && (
            <div className="space-y-4 animate-slide-up">
              <div className="upload-zone" onClick={() => fileRef.current?.click()}>
                <span className="text-3xl block mb-3">📤</span>
                <p className="text-sm text-white/50"><strong className="text-gold">Upload deliverables</strong> for the brand</p>
                <p className="text-xs text-white/25 mt-1">Images, Videos, Documents — all formats accepted</p>
                <input ref={fileRef} type="file" multiple className="hidden" onChange={onFileChange} />
              </div>

              {uploadedFiles.length > 0 && (
                <>
                  <div className="space-y-2">
                    {uploadedFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-hap-surface2 border border-hap-border rounded-xl">
                        <span className="text-xl flex-shrink-0">{f.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{f.name}</p>
                          <p className="text-xs text-white/30">{f.size}</p>
                        </div>
                        <button onClick={() => setUploadedFiles(fs => fs.filter((_, j) => j !== i))}
                          className="text-white/30 hover:text-red-400 transition-colors">✕</button>
                      </div>
                    ))}
                  </div>
                  <button onClick={deliver}
                    className="w-full bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/30 font-bold py-3 rounded-xl text-sm transition-all">
                    ✓ Mark as Delivered & Notify Brand
                  </button>
                </>
              )}
            </div>
          )}

          {tab === 'notes' && (
            <div className="card animate-slide-up">
              {project.notes ? (
                <>
                  <h4 className="font-semibold text-white mb-3">Brand Notes</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{project.notes}</p>
                </>
              ) : (
                <div className="text-center py-10">
                  <span className="text-3xl block mb-3 opacity-30">📝</span>
                  <p className="text-white/30 text-sm">No additional notes from the brand.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="card">
            <h4 className="font-semibold text-white mb-4">Status</h4>
            <Badge variant={statusVariant[curStatus]} className="mb-4 text-sm">{curStatus}</Badge>
            <div className="space-y-3 mt-3">
              {[
                ['Brand', project.brand],
                ['Submitted', fmtDate(project.created)],
                ['Deadline', fmtDate(project.deadline)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-white/30">{label}</span>
                  <span className="text-white/70">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h4 className="font-semibold text-white mb-3">Assign To</h4>
            <select value={assignee || project.assignee || ''} onChange={e => { setAssignee(e.target.value); toast.success(`Assigned to ${e.target.value}`) }}
              className="input text-sm">
              <option value="">Select team member</option>
              {MOCK_TEAM.map(m => <option key={m.id} value={m.name}>{m.name} — {m.role}</option>)}
            </select>
            {(assignee || project.assignee) && (
              <p className="text-xs text-white/30 mt-2">Assigned to <span className="text-gold">{assignee || project.assignee}</span>. They'll be notified.</p>
            )}
          </div>

          <div className="card">
            <h4 className="font-semibold text-white mb-3">Actions</h4>
            <div className="space-y-2">
              <button onClick={() => { setStatus('In Progress'); toast.info('Status set to In Progress') }}
                className="w-full text-left text-sm px-4 py-2.5 rounded-xl bg-hap-surface2 border border-hap-border hover:border-blue-400/30 hover:text-blue-400 text-white/60 transition-all">
                ⚙️ Mark as In Progress
              </button>
              <button onClick={() => setTab('upload')}
                className="w-full text-left text-sm px-4 py-2.5 rounded-xl bg-hap-surface2 border border-hap-border hover:border-gold/30 hover:text-gold text-white/60 transition-all">
                📤 Upload Content
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
  )
}
