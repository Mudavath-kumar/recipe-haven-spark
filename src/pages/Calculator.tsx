
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calculator as CalculatorIcon, Plus, Minus, X, Divide, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Calculator = () => {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [operation, setOperation] = useState<string>("1");
  const [result, setResult] = useState<number | string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getNumber = (value: string): number | null => {
    try {
      const num = parseFloat(value);
      if (isNaN(num)) {
        return null;
      }
      return num;
    } catch (error) {
      return null;
    }
  };

  const calculateResult = () => {
    setError(null);
    
    const number1 = getNumber(num1);
    const number2 = getNumber(num2);
    
    if (number1 === null) {
      setError("Please enter a valid first number");
      return;
    }
    
    if (number2 === null) {
      setError("Please enter a valid second number");
      return;
    }
    
    try {
      let calculatedResult: number | string;
      
      switch (operation) {
        case "1": // Addition
          calculatedResult = number1 + number2;
          break;
        case "2": // Subtraction
          calculatedResult = number1 - number2;
          break;
        case "3": // Multiplication
          calculatedResult = number1 * number2;
          break;
        case "4": // Division
          if (number2 === 0) {
            setError("Error: Division by zero is not allowed");
            return;
          }
          calculatedResult = number1 / number2;
          break;
        case "5": // Exponentiation
          calculatedResult = Math.pow(number1, number2);
          break;
        default:
          calculatedResult = 0;
      }
      
      setResult(calculatedResult);
      toast.success("Calculation completed successfully!");
    } catch (error) {
      setError("An error occurred during calculation");
      console.error("Calculation error:", error);
    }
  };

  const clearCalculator = () => {
    setNum1("");
    setNum2("");
    setOperation("1");
    setResult(null);
    setError(null);
  };

  const getOperationIcon = () => {
    switch (operation) {
      case "1":
        return <Plus className="h-6 w-6 text-recipe-600" />;
      case "2":
        return <Minus className="h-6 w-6 text-recipe-600" />;
      case "3":
        return <X className="h-6 w-6 text-recipe-600" />;
      case "4":
        return <Divide className="h-6 w-6 text-recipe-600" />;
      case "5":
        return <span className="text-xl font-bold text-recipe-600">^</span>;
      default:
        return <Plus className="h-6 w-6 text-recipe-600" />;
    }
  };

  return (
    <div className="container py-12 max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Simple Calculator
        </h1>
        <p className="text-muted-foreground">
          Perform basic arithmetic operations with this calculator
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-recipe-100 p-3 rounded-full">
              <CalculatorIcon className="h-8 w-8 text-recipe-700" />
            </div>
          </div>
          <CardTitle className="text-2xl">Calculator</CardTitle>
          <CardDescription>
            Enter two numbers and select an operation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="num1" className="text-sm font-medium">
              First Number
            </label>
            <Input
              id="num1"
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="Enter first number"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="operation" className="text-sm font-medium">
              Operation
            </label>
            <Select
              value={operation}
              onValueChange={setOperation}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Addition (+)</SelectItem>
                <SelectItem value="2">Subtraction (-)</SelectItem>
                <SelectItem value="3">Multiplication (*)</SelectItem>
                <SelectItem value="4">Division (/)</SelectItem>
                <SelectItem value="5">Exponentiation (^)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="num2" className="text-sm font-medium">
              Second Number
            </label>
            <Input
              id="num2"
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="Enter second number"
              className="text-lg"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-14 w-14 flex items-center justify-center border-2 border-recipe-100 rounded-full">
              {getNumber(num1) !== null ? getNumber(num1) : "?"}
            </div>
            <div className="h-10 w-10 flex items-center justify-center">
              {getOperationIcon()}
            </div>
            <div className="h-14 w-14 flex items-center justify-center border-2 border-recipe-100 rounded-full">
              {getNumber(num2) !== null ? getNumber(num2) : "?"}
            </div>
            <div className="h-10 w-10 flex items-center justify-center">
              <ArrowRight className="h-5 w-5" />
            </div>
            <div className="h-14 w-14 flex items-center justify-center bg-recipe-100 text-recipe-800 rounded-full font-bold">
              {result !== null ? result : "?"}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4 justify-between">
          <Button variant="outline" onClick={clearCalculator}>
            Clear
          </Button>
          <Button onClick={calculateResult} className="bg-recipe-700 hover:bg-recipe-800">
            Calculate
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Calculator;
