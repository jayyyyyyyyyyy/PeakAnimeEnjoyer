import { Bell, CheckCircle2, Info, AlertTriangle } from "lucide-react"
import type { AppNotification } from "@/lib/types/club"
import { cn } from "@/lib/utils"

interface NotificationListProps {
  notifications: AppNotification[]
}

const priorityStyles: Record<AppNotification["priority"], string> = {
  info: "border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#7DD3FC]",
  warning: "border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B]",
  success: "border-[#22C55E]/30 bg-[#22C55E]/10 text-[#86EFAC]",
}

function NotificationIcon({
  priority,
}: {
  priority: AppNotification["priority"]
}) {
  if (priority === "success") {
    return <CheckCircle2 className="h-5 w-5" />
  }

  if (priority === "warning") {
    return <AlertTriangle className="h-5 w-5" />
  }

  return <Info className="h-5 w-5" />
}

export function NotificationList({
  notifications,
}: NotificationListProps) {
  if (notifications.length === 0) return null

  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
        <Bell className="h-5 w-5 text-[#F59E0B]" />
        Notifications
      </h2>

      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            "rounded-2xl border p-4",
            priorityStyles[notification.priority]
          )}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">
              <NotificationIcon priority={notification.priority} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-white">
                {notification.title}
              </p>
              <p className="mt-1 text-sm text-white/70">
                {notification.body}
              </p>
              <p className="mt-3 text-sm font-semibold">
                {notification.actionLabel}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
