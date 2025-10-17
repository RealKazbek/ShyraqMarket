import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ToggleField({
  id,
  label,
  value,
  onChange,
  disabled,
}: any) {
  return (
    <div className="flex items-center gap-3">
      <Switch
        id={id}
        checked={value}
        onCheckedChange={onChange}
        disabled={disabled}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
