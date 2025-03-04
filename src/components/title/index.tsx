import React from 'react'
import { Text } from '../text/text';

interface props {
    icon: React.ReactNode
    text: string
}

export const Title: React.FC<props> = ({ icon, text }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {icon}
      <Text size="sm" style={{ marginLeft: "0.7rem" }}>
        {text}
      </Text>
    </div>
  );
}
