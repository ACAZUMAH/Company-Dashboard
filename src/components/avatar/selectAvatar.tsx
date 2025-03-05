import React from "react";
import { options } from "./interfaces";
import CustomAvatar from "./avatar";
import { Text } from "../text/text";

export const SelectOptionWithAvatar: React.FC<options> = ({
  avatarUrl,
  name,
  shape,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <CustomAvatar shape={shape} name={name} src={avatarUrl} />
      <Text>{name}</Text>
    </div>
  );
};
