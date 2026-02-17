import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";

export default function ProfileCard() {
  const { profile, isLoading, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const startEdit = () => {
    setName(profile?.name ?? "");
    setEmail(profile?.email ?? "");
    setEditing(true);
  };

  const save = async () => {
    if (!name.trim() || !email.trim()) return;
    try {
      await updateProfile.mutateAsync({ name: name.trim(), email: email.trim() });
      toast.success("Profile updated");
      setEditing(false);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) return <Card><CardContent className="p-6"><div className="h-20 animate-pulse rounded bg-muted" /></CardContent></Card>;

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <User className="h-4 w-4 text-accent" /> Profile
        </CardTitle>
        {!editing && (
          <Button variant="ghost" size="sm" onClick={startEdit}>
            <Pencil className="mr-1 h-3 w-3" /> Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {editing ? (
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={save} disabled={updateProfile.isPending}>
                <Check className="mr-1 h-3 w-3" /> Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(false)}>
                <X className="mr-1 h-3 w-3" /> Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="font-medium">{profile?.name || "No name set"}</p>
            <p className="text-sm text-muted-foreground">{profile?.email}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
