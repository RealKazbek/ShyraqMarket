"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { logout } from "@/api/auth";

type AccountHeaderForm = {
  first_name: string;
  last_name: string;
  email: string;
};

type AccountHeaderProps = {
  form: AccountHeaderForm;
  editing: boolean;
  setEditing: (state: boolean) => void;
  onSave: () => void;
};

export default function AccountHeader({
  form,
  editing,
  setEditing,
  onSave,
}: AccountHeaderProps) {
  const firstInitial = form?.first_name?.[0]?.toUpperCase() ?? "?";
  const lastInitial = form?.last_name?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/placeholder.jpg" alt="User avatar" />
          <AvatarFallback>
            {firstInitial}
            {lastInitial}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">
            {form.first_name} {form.last_name}
          </h2>
          <p className="text-sm text-muted-foreground">{form.email}</p>
          <div className="mt-2 flex gap-2 flex-wrap">
            <Badge variant="default">Active</Badge>
            <Badge variant="outline">Role: USER</Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {!editing ? (
          <>
            <Button onClick={logout}>Logout</Button>
            <Button onClick={() => setEditing(true)}>Edit</Button>
          </>
        ) : (
          <>
            <Button onClick={onSave}>Save</Button>
            <Button variant="outline" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
