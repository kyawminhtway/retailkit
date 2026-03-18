import { LoginPage } from '#/features/auth/components/LoginPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex items-center justify-center h-screen min-h-screen bg-[radial-gradient(circle_at_top,rgba(108,0,180,0.15),transparent_60%)]">
        <LoginPage />
    </div>
}
