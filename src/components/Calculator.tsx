
import React, { useState } from 'react';
import { 
  Calculator as CalculatorIcon, 
  Plus, 
  Minus, 
  X, 
  Divide, 
  Percent,
  AlignJustify
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type Operation = "add" | "subtract" | "multiply" | "divide" | "exponent";

const Calculator = () => {
  const [display, setDisplay] = useState<string>("0");
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [secondNumber, setSecondNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNumberClick = (num: number) => {
    if (display === "0" || shouldResetDisplay) {
      setDisplay(num.toString());
      setShouldResetDisplay(false);
    } else {
      setDisplay(display + num.toString());
    }
  };

  const handleDecimalClick = () => {
    if (shouldResetDisplay) {
      setDisplay("0.");
      setShouldResetDisplay(false);
      return;
    }
    
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleClearClick = () => {
    setDisplay("0");
    setFirstNumber(null);
    setSecondNumber(null);
    setOperation(null);
  };

  const handleOperationClick = (op: Operation) => {
    setFirstNumber(parseFloat(display));
    setOperation(op);
    setShouldResetDisplay(true);
  };

  const handleEqualsClick = () => {
    if (firstNumber === null || operation === null) return;
    
    const second = parseFloat(display);
    setSecondNumber(second);
    let result: number | string = 0;
    
    switch (operation) {
      case "add":
        result = firstNumber + second;
        navigateToRecipe(101);
        break;
      case "subtract":
        result = firstNumber - second;
        navigateToRecipe(102);
        break;
      case "multiply":
        result = firstNumber * second;
        navigateToRecipe(103);
        break;
      case "divide":
        if (second === 0) {
          result = "Error";
          toast.error("Cannot divide by zero!");
        } else {
          result = firstNumber / second;
          navigateToRecipe(104);
        }
        break;
      case "exponent":
        result = Math.pow(firstNumber, second);
        navigateToRecipe(105);
        break;
    }
    
    // Only convert to string if it's a number (not already an error string)
    if (typeof result === 'number') {
      // Handle floating point precision issues
      result = parseFloat(result.toFixed(10)).toString();
    }
    
    setDisplay(result.toString());
    setFirstNumber(null);
    setOperation(null);
    setShouldResetDisplay(true);
  };

  const navigateToRecipe = (recipeId: number) => {
    toast.success("Recipe found! Redirecting...");
    // Navigate to the recipe after a short delay
    setTimeout(() => {
      navigate(`/recipe/${recipeId}`);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg border-2 border-recipe-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalculatorIcon className="h-5 w-5 text-recipe-700" />
            <h2 className="text-lg font-semibold">Math Recipe Calculator</h2>
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-3 mb-4 text-right">
          <p className="text-2xl font-mono tracking-wider overflow-hidden text-ellipsis">
            {display}
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" onClick={handleClearClick} className="font-bold">
            AC
          </Button>
          <Button variant="outline" onClick={() => setDisplay(display.startsWith('-') ? display.substring(1) : `-${display}`)}>
            +/-
          </Button>
          <Button variant="outline" onClick={() => handleOperationClick("exponent")}>
            ^
          </Button>
          <Button variant="outline" onClick={() => handleOperationClick("divide")} className="bg-recipe-100 hover:bg-recipe-200">
            <Divide className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" onClick={() => handleNumberClick(7)}>7</Button>
          <Button variant="outline" onClick={() => handleNumberClick(8)}>8</Button>
          <Button variant="outline" onClick={() => handleNumberClick(9)}>9</Button>
          <Button variant="outline" onClick={() => handleOperationClick("multiply")} className="bg-recipe-100 hover:bg-recipe-200">
            <X className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" onClick={() => handleNumberClick(4)}>4</Button>
          <Button variant="outline" onClick={() => handleNumberClick(5)}>5</Button>
          <Button variant="outline" onClick={() => handleNumberClick(6)}>6</Button>
          <Button variant="outline" onClick={() => handleOperationClick("subtract")} className="bg-recipe-100 hover:bg-recipe-200">
            <Minus className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" onClick={() => handleNumberClick(1)}>1</Button>
          <Button variant="outline" onClick={() => handleNumberClick(2)}>2</Button>
          <Button variant="outline" onClick={() => handleNumberClick(3)}>3</Button>
          <Button variant="outline" onClick={() => handleOperationClick("add")} className="bg-recipe-100 hover:bg-recipe-200">
            <Plus className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" onClick={() => handleNumberClick(0)} className="col-span-2">
            0
          </Button>
          <Button variant="outline" onClick={handleDecimalClick}>.</Button>
          <Button onClick={handleEqualsClick} className="bg-recipe-700 hover:bg-recipe-800 text-white">=</Button>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="text-center flex items-center justify-center gap-1">
            <AlignJustify className="h-3 w-3" />
            <span>Try different operations to discover recipes!</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
