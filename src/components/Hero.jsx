import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden border border-white/10">
      <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
        <div>
          <h2 className="text-white text-2xl md:text-3xl font-semibold">Stay on budget, buy what matters</h2>
          <p className="text-blue-200/80 text-sm">Track spending automatically and see what you can afford this month</p>
        </div>
      </div>
    </div>
  )
}
