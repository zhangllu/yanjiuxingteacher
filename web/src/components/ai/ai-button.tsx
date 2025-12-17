"use client";

import { Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIButtonProps {
  onClick: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

export function AIButton({ onClick, loading, children }: AIButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={loading}
      className="bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border-purple-200"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Wand2 className="w-4 h-4 mr-2" />
      )}
      {children}
    </Button>
  );
}
