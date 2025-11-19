import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Spinner className="w-12 h-12 text-primary-500" />
    </div>
  )
}
