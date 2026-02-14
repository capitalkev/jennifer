export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none bg-rose-50/30">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-rose-300/20 mix-blend-multiply filter blur-[80px] opacity-70 animate-[blob_15s_infinite]"></div>
      <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-300/20 mix-blend-multiply filter blur-[80px] opacity-70 animate-[blob_18s_infinite_2s]"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-orange-200/20 mix-blend-multiply filter blur-[80px] opacity-70 animate-[blob_20s_infinite_4s]"></div>
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </div>
  )
}
