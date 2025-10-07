import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const steps = [
  "Initial Questions",
  "Information Confirmation",
  "Sign Contract",
  "View Homes",
  "Send Offer",
  "Complete Deal",
];

export default function OrdersPage() {
  return (
    <div className="px-6 py-10 space-y-8">
      {/* Order 1 */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Order 1</CardTitle>
            <p className="text-sm text-muted-foreground">Agent: Sample Agent</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-bold">Complete 45%</span>
            <span className="text-sm text-muted-foreground">
              Expected: Oct 12, 2025 (13 days)
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center flex-1"
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 
                  ${
                    i <= 2
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-xs mt-2">{step}</span>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-muted p-4 rounded-md space-y-3">
            <div className="flex items-center justify-between">
              <span>
                23% increase in home listing — would you like to view?
              </span>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  Yes
                </Button>
                <Button variant="outline" size="sm">
                  No
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>
                We recommend that you purchase soon, prices are 11% below
                average.
              </span>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  Yes
                </Button>
                <Button variant="outline" size="sm">
                  No
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order 2 */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Order 2</CardTitle>
            <p className="text-sm text-muted-foreground">Task: Day Property</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-bold">Complete 75%</span>
            <span className="text-sm text-muted-foreground">
              Expected: Oct 20, 2025 (5 days)
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={75} className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
