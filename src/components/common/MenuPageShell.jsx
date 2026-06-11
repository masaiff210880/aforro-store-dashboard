export default function MenuPageShell({ title, description }) {
  return (
    <div className="mx-auto max-w-8xl">
      <div className="rounded-[14px] bg-white p-6 shadow-[0_4px_20px_rgba(238,238,238,0.5)] sm:p-8">
        <h2 className="text-xl font-bold text-[#202224] sm:text-2xl">{title}</h2>
        <p className="mt-2 text-sm text-[#8B8D97]">{description}</p>
      </div>
    </div>
  )
}
