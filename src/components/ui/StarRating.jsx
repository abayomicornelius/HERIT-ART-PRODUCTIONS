export default function StarRating({ rating, size = 'sm', showNum = true }) {
  const sz = size === 'lg' ? 'text-base' : 'text-xs'
  return (
    <div className="flex items-center gap-1">
      <div className={`flex gap-0.5 ${sz}`}>
        {[1,2,3,4,5].map(s => (
          <span key={s} className={s <= Math.round(rating) ? 'text-gold' : 'text-white/15'}>★</span>
        ))}
      </div>
      {showNum && <span className={`font-bold text-gold ${sz}`}>{Number(rating).toFixed(1)}</span>}
    </div>
  )
}
