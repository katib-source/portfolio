export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[--surface]">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-[--primary-light] border-t-[--primary]"
        aria-label="Chargement"
      />
    </div>
  )
}
