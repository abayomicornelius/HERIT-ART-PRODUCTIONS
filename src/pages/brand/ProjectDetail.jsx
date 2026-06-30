import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import BrandLayout from '../../components/layout/BrandLayout'
import Badge from '../../components/ui/Badge'
import { MOCK_PROJECTS } from '../../data/mockData'

const statusVariant = { Pending: 'warning', 'In Progress': 'info', Completed: 'success' }
function fmtDate(s) { return new Date(s).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }

export default function ProjectDetail() {
  const { id } = useParams()
  const [tab, setTab] = useState('brief')
  const project = MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[0]

  const tabs = ['brief', 'assets', 'notes']

  return (
    <BrandLayout
      title={project.name}
      subtitle={`${project.id} · Submitted ${fmtDate(project.created)}`}
      actions={
        <Link to="/brand/projects" className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1.5">
          ← All Projects
        </Link>
      }>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex border-b border-hap-border mb-6">
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`tab-item capitalize ${tab === t ? 'active' : ''}`}>{t}</button>
            ))}
          </div>

          {tab === 'brief' && (
            <div className="space-y-4 animate-slide-up">
              <div className="card">
                <h4 className="font-semibold text-white mb-4">Project Brief</h4>
                {[
                  ['Content Type', project.contentType],
                  ['Deadline', fmtDate(project.deadline)],
                  ['Primary Goal', project.goal],
                  ['Target Audience', project.audience.join(', ')],
                  ['Tone of Voice', project.tone.join(', ')],
                  ['Platforms', project.platforms.join(', ')],
                ].map(([label, value]) => (
                  <div key={label} className="info-row">
                    <span className="text-xs text-white/30 font-bold uppercase tracking-wider w-36 flex-shrink-0">{label}</span>
                    <span className="text-sm text-white/70 flex-1">{value || '—'}</span>
                  </div>
                ))}
              </div>
              {project.keyFeatures && (
                <div className="card">
                  <h4 className="font-semibold text-white mb-3">Key Features</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{project.keyFeatures}</p>
                </div>
              )}
            </div>
          )}

          {tab === 'assets' && (
            <div className="animate-slide-up">
              <div className="upload-zone text-white/30">
                <span className="text-3xl block mb-3">📁</span>
                <p className="text-sm">No assets uploaded for this project.</p>
                <p className="text-xs mt-1 text-white/20">Assets are submitted with the project brief.</p>
              </div>
            </div>
          )}

          {tab === 'notes' && (
            <div className="animate-slide-up card">
              {project.notes ? (
                <>
                  <h4 className="font-semibold text-white mb-3">Notes to Production Team</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{project.notes}</p>
                </>
              ) : (
                <div className="text-center py-10">
                  <span className="text-3xl block mb-3 opacity-30">📝</span>
                  <p className="text-white/30 text-sm">No additional notes were provided.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar info */}
        <div className="space-y-5">
          <div className="card">
            <h4 className="font-semibold text-white mb-4">Status</h4>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={statusVariant[project.status]} className="text-sm px-3 py-1">{project.status}</Badge>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Submitted', value: fmtDate(project.created) },
                { label: 'Deadline', value: fmtDate(project.deadline) },
                { label: 'Assigned to', value: project.assignee || 'Unassigned' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-white/30">{label}</span>
                  <span className="text-white/70">{value}</span>
                </div>
              ))}
            </div>
            {project.status === 'Completed' && (
              <Link to={`/brand/projects/${project.id}/review`}
                className="mt-5 block text-center bg-gold hover:bg-gold-hover text-hap-bg font-bold py-2.5 rounded-xl text-sm transition-all hover:shadow-gold">
                View Delivered Content →
              </Link>
            )}
          </div>

          <div className="card">
            <h4 className="font-semibold text-white mb-3">Progress</h4>
            <div className="space-y-2">
              {[
                { label: 'Brief Submitted', done: true },
                { label: 'Production Started', done: project.status !== 'Pending' },
                { label: 'Content Ready', done: project.status === 'Completed' },
                { label: 'Approved', done: false },
              ].map(({ label, done }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                    done ? 'bg-green-500/20 border border-green-500 text-green-400' : 'bg-hap-surface3 border border-hap-border text-white/20'
                  }`}>{done ? '✓' : ''}</div>
                  <span className={`text-sm ${done ? 'text-white/70' : 'text-white/25'}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrandLayout>
  )
}
