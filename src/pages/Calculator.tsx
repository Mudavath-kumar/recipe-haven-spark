
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Calculator = () => {
  const [num1, setNum1] = useState<number | string>("");
  const [num2, setNum2] = useState<number | string>("");
  const [operation, setOperation] = useState<string>("addition");
  const [result, setResult] = useState<number | string>("");
  const { toast } = useToast();

  const validateInput = (input: string): boolean => {
    if (input.trim() === "") {
      toast({
        title: "Input Error",
        description: "Please enter numbers in both fields",
        variant: "destructive"
      });
      return false;
    }
    if (isNaN(Number(input))) {
      toast({
        title: "Input Error",
        description: "Please enter valid numbers",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleCalculation = () => {
    // Validate inputs
    if (!validateInput(num1.toString()) || !validateInput(num2.toString())) {
      return;
    }

    const parsedNum1 = parseFloat(num1.toString());
    const parsedNum2 = parseFloat(num2.toString());

    try {
      let calculatedResult: number;

      switch (operation) {
        case "addition":
          calculatedResult = parsedNum1 + parsedNum2;
          break;
        case "subtraction":
          calculatedResult = parsedNum1 - parsedNum2;
          break;
        case "multiplication":
          calculatedResult = parsedNum1 * parsedNum2;
          break;
        case "division":
          if (parsedNum2 === 0) {
            toast({
              title: "Calculation Error",
              description: "Division by zero is not allowed",
              variant: "destructive"
            });
            return;
          }
          calculatedResult = parsedNum1 / parsedNum2;
          break;
        case "exponentiation":
          calculatedResult = Math.pow(parsedNum1, parsedNum2);
          break;
        default:
          calculatedResult = parsedNum1 + parsedNum2;
      }

      setResult(calculatedResult);
      toast({
        title: "Calculation Complete",
        description: `Result: ${calculatedResult}`,
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "An error occurred during calculation",
        variant: "destructive"
      });
    }
  };

  const clearInputs = () => {
    setNum1("");
    setNum2("");
    setResult("");
    setOperation("addition");
  };

  return (
    <div className="container py-8 max-w-md mx-auto">
      <Card className="shadow-lg border-0">
        <CardHeader className="space-y-1 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Simple Calculator</CardTitle>
          <CardDescription>Perform basic arithmetic operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="num1">
              First Number
            </label>
            <Input
              id="num1"
              type="text"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="Enter first number"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="operation">
              Operation
            </label>
            <div className="grid grid-cols-5 gap-2">
              <Button
                type="button"
                variant={operation === "addition" ? "default" : "outline"}
                onClick={() => setOperation("addition")}
                className="text-lg"
              >
                +
              </Button>
              <Button
                type="button"
                variant={operation === "subtraction" ? "default" : "outline"}
                onClick={() => setOperation("subtraction")}
                className="text-lg"
              >
                -
              </Button>
              <Button
                type="button"
                variant={operation === "multiplication" ? "default" : "outline"}
                onClick={() => setOperation("multiplication")}
                className="text-lg"
              >
                ×
              </Button>
              <Button
                type="button"
                variant={operation === "division" ? "default" : "outline"}
                onClick={() => setOperation("division")}
                className="text-lg"
              >
                ÷
              </Button>
              <Button
                type="button"
                variant={operation === "exponentiation" ? "default" : "outline"}
                onClick={() => setOperation("exponentiation")}
                className="text-lg"
              >
                ^
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="num2">
              Second Number
            </label>
            <Input
              id="num2"
              type="text"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="Enter second number"
            />
          </div>

          <div className="pt-2">
            <div className="flex items-baseline justify-between">
              <label className="text-sm font-medium">Result</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearInputs}
                className="h-auto py-0 px-2 text-xs"
              >
                Clear
              </Button>
            </div>
            <div className="mt-1 p-3 bg-muted rounded-md font-mono text-lg min-h-[3rem] flex items-center justify-end">
              {result !== "" ? result : "—"}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleCalculation}>
            Calculate
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Calculator;
