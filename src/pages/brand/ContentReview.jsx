import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import BrandLayout from '../../components/layout/BrandLayout'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import { useToast } from '../../context/ToastContext'
import { MOCK_PROJECTS } from '../../data/mockData'

const DELIVERED = [
  { name: 'Summer_Campaign_Main_Video.mp4', size: '48.2 MB', icon: '🎬', type: 'Video' },
  { name: 'Instagram_Story_Set.zip',         size: '12.4 MB', icon: '📦', type: 'Archive' },
  { name: 'Brand_Stills_Collection.zip',     size: '28.7 MB', icon: '📦', type: 'Archive' },
  { name: 'Campaign_Copy_Deck.pdf',          size: '2.1 MB',  icon: '📄', type: 'Document' },
]

export default function ContentReview() {
  const { id } = useParams()
  const toast = useToast()
  const [approved, setApproved] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const project = MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[2]

  function handleApprove() {
    setApproved(true)
    setShowConfirm(false)
    toast.success('Content approved! Thank you.')
  }

  return (
    <BrandLayout title="Content Review" subtitle={project.name}
      actions={<Link to="/brand/projects" className="text-sm text-white/40 hover:text-white">← Projects</Link>}>

      {/* Status banner */}
      {approved ? (
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-2xl px-5 py-4 mb-8">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-semibold text-green-400">Content Approved</p>
            <p className="text-xs text-green-400/60 mt-0.5">You've approved this content delivery. Our team has been notified.</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-gold/10 border border-gold/20 rounded-2xl px-5 py-4 mb-8">
          <span className="text-2xl">📬</span>
          <div className="flex-1">
            <p className="font-semibold text-gold">Your content is ready!</p>
            <p className="text-xs text-gold/60 mt-0.5">Download your files below, review them and mark as approved when satisfied.</p>
          </div>
          <Badge variant="gold">Delivered</Badge>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Files */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card">
            <h3 className="font-semibold text-white mb-5">Delivered Files</h3>
            <div className="space-y-3">
              {DELIVERED.map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-hap-surface2 border border-hap-border rounded-xl hover:border-hap-borderl transition-all">
                  <span className="text-2xl flex-shrink-0">{f.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{f.name}</p>
                    <p className="text-xs text-white/30">{f.type} · {f.size}</p>
                  </div>
                  <button onClick={() => toast.success(`Downloading ${f.name}…`)}
                    className="flex items-center gap-2 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/25 px-4 py-2 rounded-lg text-xs font-semibold transition-all">
                    ↓ Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notes from production */}
          <div className="card">
            <h3 className="font-semibold text-white mb-3">Notes from Production Team</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              All deliverables are packaged as requested. The main video has been optimised for Instagram
              Reels, TikTok and YouTube. Please review the brand stills — we've included two alternate
              colour versions. The copy deck covers all platform captions with hashtag suggestions.
              Let us know if any revisions are needed!
            </p>
          </div>
        </div>

        {/* Approval sidebar */}
        <div className="space-y-5">
          <div className="card">
            <h4 className="font-semibold text-white mb-4">Approval</h4>
            {approved ? (
              <div className="text-center py-4">
                <span className="text-4xl block mb-3">🎉</span>
                <p className="font-semibold text-green-400 mb-1">Approved!</p>
                <p className="text-xs text-white/30">Thank you for your confirmation.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-white/40 leading-relaxed mb-5">
                  Once you've reviewed all files and are satisfied with the delivery, mark this project as approved.
                </p>
                <button onClick={() => setShowConfirm(true)}
                  className="w-full bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/30 font-bold py-3 rounded-xl text-sm transition-all">
                  ✓ Mark as Approved
                </button>
              </>
            )}
          </div>

          <div className="card">
            <h4 className="font-semibold text-white mb-3">Project Info</h4>
            <div className="space-y-2">
              {[
                ['Project', project.name],
                ['Content Type', project.contentType],
                ['Delivered', 'Jun 28, 2026'],
                ['Files', `${DELIVERED.length} files`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-white/30">{label}</span>
                  <span className="text-white/70">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal open={showConfirm} onClose={() => setShowConfirm(false)} title="Approve Content"
        footer={
          <>
            <button onClick={() => setShowConfirm(false)} className="text-sm text-white/40 hover:text-white px-4 py-2 rounded-xl transition-colors">Cancel</button>
            <button onClick={handleApprove} className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all">Confirm Approval</button>
          </>
        }>
        <p className="text-sm text-white/60 leading-relaxed">
          By approving, you confirm that you've reviewed and are satisfied with the delivered content for <strong className="text-white">{project.name}</strong>.
          This will notify the production team that the project is complete.
        </p>
      </Modal>
    </BrandLayout>
  )
}
