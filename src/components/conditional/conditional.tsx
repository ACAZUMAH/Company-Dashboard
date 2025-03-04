import React from "react";

export interface ConditionalProps {
  condition: any;
  children: React.ReactNode;
}

export const Conditional: React.FC<ConditionalProps> = ({
  condition,
  children,
}) => {
  if (!condition) return null;

  return <>{children}</>;
};
