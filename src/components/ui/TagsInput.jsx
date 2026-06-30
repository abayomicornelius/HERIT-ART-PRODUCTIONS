import { useState, useRef } from 'react'

export default function TagsInput({ value = [], onChange, placeholder = 'Type and press Enter…' }) {
  const [input, setInput] = useState('')
  const ref = useRef()

  function add(val) {
    const v = val.trim().replace(/,+$/, '')
    if (v && !value.includes(v)) onChange([...value, v])
    setInput('')
  }

  function remove(tag) { onChange(value.filter(t => t !== tag)) }

  function onKeyDown(e) {
    if ((e.key === 'Enter' || e.key === ',') && input) { e.preventDefault(); add(input) }
    if (e.key === 'Backspace' && !input && value.length) remove(value[value.length - 1])
  }

  return (
    <div className="flex flex-wrap gap-1.5 p-2 bg-hap-surface2 border border-hap-border rounded-xl min-h-[46px]
                    focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/10 cursor-text transition-all"
         onClick={() => ref.current?.focus()}>
      {value.map(tag => (
        <span key={tag} className="inline-flex items-center gap-1.5 bg-gold/10 text-gold border border-gold/25
                                   px-2.5 py-0.5 rounded-full text-xs font-medium">
          {tag}
          <button type="button" onClick={() => remove(tag)}
            className="opacity-60 hover:opacity-100 text-[0.6rem] leading-none bg-none border-none text-inherit cursor-pointer">✕</button>
        </span>
      ))}
      <input ref={ref} value={input} placeholder={value.length ? '' : placeholder}
        onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown}
        onBlur={() => input && add(input)}
        className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm text-white placeholder-white/20" />
    </div>
  )
}
