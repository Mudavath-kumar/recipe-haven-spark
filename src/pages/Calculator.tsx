
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Calculator = () => {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [operation, setOperation] = useState<string>("add");
  const [result, setResult] = useState<number | string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to validate number input
  const validateNumber = (value: string): boolean => {
    // Allow empty string (for clearing input)
    if (value === "") return true;
    
    // Check if it's a valid number
    return !isNaN(Number(value));
  };

  const handleNum1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNumber(value)) {
      setNum1(value);
      setError(null);
    }
  };

  const handleNum2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNumber(value)) {
      setNum2(value);
      setError(null);
    }
  };

  const calculate = () => {
    // Reset errors and results
    setError(null);
    setResult(null);
    
    // Validate inputs
    if (num1 === "" || num2 === "") {
      setError("Please enter both numbers");
      return;
    }
    
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    
    try {
      let calculatedResult: number | string;
      
      switch (operation) {
        case "add":
          calculatedResult = number1 + number2;
          break;
        case "subtract":
          calculatedResult = number1 - number2;
          break;
        case "multiply":
          calculatedResult = number1 * number2;
          break;
        case "divide":
          if (number2 === 0) {
            throw new Error("Division by zero is not allowed");
          }
          calculatedResult = number1 / number2;
          break;
        case "exponent":
          calculatedResult = Math.pow(number1, number2);
          break;
        default:
          calculatedResult = 0;
      }
      
      setResult(calculatedResult);
      toast.success("Calculation completed!");
    } catch (err: any) {
      setError(err.message || "An error occurred during calculation");
      toast.error(err.message || "Calculation error");
    }
  };

  const clearCalculator = () => {
    setNum1("");
    setNum2("");
    setOperation("add");
    setResult(null);
    setError(null);
    toast.info("Calculator cleared");
  };

  // Get operation display text
  const getOperationText = () => {
    switch (operation) {
      case "add": return "Addition (+)";
      case "subtract": return "Subtraction (-)";
      case "multiply": return "Multiplication (×)";
      case "divide": return "Division (÷)";
      case "exponent": return "Exponentiation (^)";
      default: return "Select operation";
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Simple Calculator</h1>
      
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Calculator</CardTitle>
            <CardDescription>
              Enter two numbers and select an operation
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="num1">First Number</Label>
              <Input 
                id="num1" 
                type="text" 
                placeholder="Enter first number"
                value={num1}
                onChange={handleNum1Change}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="operation">Operation</Label>
              <Select value={operation} onValueChange={setOperation}>
                <SelectTrigger id="operation">
                  <SelectValue placeholder={getOperationText()} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Addition (+)</SelectItem>
                  <SelectItem value="subtract">Subtraction (-)</SelectItem>
                  <SelectItem value="multiply">Multiplication (×)</SelectItem>
                  <SelectItem value="divide">Division (÷)</SelectItem>
                  <SelectItem value="exponent">Exponentiation (^)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="num2">Second Number</Label>
              <Input 
                id="num2" 
                type="text" 
                placeholder="Enter second number"
                value={num2}
                onChange={handleNum2Change}
              />
            </div>
            
            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {result !== null && (
              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-4 rounded-md">
                <p className="font-medium">Result:</p>
                <p className="text-2xl font-bold">{result}</p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={clearCalculator}>
              Clear
            </Button>
            <Button onClick={calculate}>
              Calculate
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Calculator;
