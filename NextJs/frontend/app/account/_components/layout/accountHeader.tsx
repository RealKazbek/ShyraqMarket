"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { logout } from "@/api/auth";
import { AccountHeaderForm } from "@/types";

type AccountHeaderProps = {
  form: AccountHeaderForm;
};

export default function AccountHeader({ form }: AccountHeaderProps) {
  const firstInitial = form.first_name?.[0]?.toUpperCase() ?? "?";
  const lastInitial = form.last_name?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={form.avatar} alt="User avatar" />
          <AvatarFallback>
            {firstInitial}
            {lastInitial}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">
            {form.first_name} {form.last_name}
          </h2>
          <div className="mt-2 flex gap-2 flex-wrap">
            <Badge variant="default">
              {form.is_active ? "Active" : "Blocked"}
            </Badge>
            {form.role !== "USER" && (
              <Badge variant="outline">
                Role:{" "}
                {form.role.charAt(0).toUpperCase() +
                  form.role.slice(1).toLowerCase()}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <h3 className="text-3xl tracking-wide font-bold">Добро пожаловать</h3>

      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
