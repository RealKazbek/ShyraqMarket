import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full py-8">
      <Card className="border rounded-2xl shadow-sm">
        <CardContent className="p-6 md:p-8 space-y-8">
          {children}
          <Separator className="my-6" />
        </CardContent>
      </Card>
    </div>
  );
}
