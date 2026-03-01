import React from 'react';

interface BodyTextProps {
  children: React.ReactNode;
}

export function BodyText({ children }: BodyTextProps) {
  return (
    <p>{children}</p>
  );
}
