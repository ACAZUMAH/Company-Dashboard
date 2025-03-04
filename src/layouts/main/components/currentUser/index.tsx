import { Button, Popover } from "antd";
import { useGetIdentity } from "@refinedev/core";
import type { User } from "@/interfaces/graphql/graphql";
import { Text } from "../../../../components/text/text";
import { SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { AccountSettings } from "../account-setting";
import { Conditional } from "@/components/conditional/conditional";
import CustomAvatar from "../../../../components/avatar/avatar";

const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useGetIdentity<User>();

  const content = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Text strong style={{ padding: "12px 20px" }}>
        {user?.name}
      </Text>
      <div
        style={{
          borderTop: "1px solid #d9d9d9",
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Button
          style={{ textAlign: "left" }}
          icon={<SettingOutlined />}
          type="text"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Account Setting
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        styles={{ body: { padding: 0 }, root: { zIndex: 999 } }}
        content={content}
      >
        <CustomAvatar
          name={user?.name}
          src={user?.avatarUrl}
          size="default"
          style={{ cursor: "pointer" }}
        />
      </Popover>
      <Conditional condition={user}>         
        <AccountSettings
          opened={isOpen}
          setOpened={setIsOpen}
          userId={user?.id || ""}
        /></Conditional>
    </>
  );
};

export default CurrentUser;
