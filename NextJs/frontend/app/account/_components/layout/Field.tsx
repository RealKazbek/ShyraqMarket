import { Label } from "@/components/ui/label";

export default function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-2 block text-sm">{label}</Label>
      {children}
    </div>
  );
}
