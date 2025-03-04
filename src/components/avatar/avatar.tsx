import { Avatar as AntdAvatar } from "antd";
import { Props } from "./interfaces";
import { getNameInitials } from "@/helpers";

const UserAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt={name}
      size="small"
      style={{
        backgroundColor: "#87d068",
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style,
      }}
      { ...rest }
    >
      {getNameInitials(name || '')}
    </AntdAvatar>
  );
};

export default UserAvatar;
