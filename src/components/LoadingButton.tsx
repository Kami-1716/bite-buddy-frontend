import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const LoadingButton = () => {
  return (
    <Button disabled className="w-full">
      <Loader2 className="animate-spin mr-2 h-4 w-4" />
      Loading
    </Button>
  );
};

export default LoadingButton;
