import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import TaskList from "@/components/TaskList";

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-accent" />
            <span className="font-heading text-lg font-semibold">TaskFlow</span>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="mr-1 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-4xl py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your tasks and profile</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <aside>
            <ProfileCard />
          </aside>
          <section>
            <TaskList />
          </section>
        </div>
      </main>
    </div>
  );
}
