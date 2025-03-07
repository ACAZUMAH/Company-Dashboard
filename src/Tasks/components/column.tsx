import { Conditional, Text } from "@/components";
import { PlusOutlined } from "@ant-design/icons";
import { useDroppable, UseDroppableArguments } from "@dnd-kit/core";
import { Badge, Button, Space, Tooltip } from "antd";
import React from "react";

interface props {
    id: string
    title: string
    count: number 
    data?: UseDroppableArguments['data']
    onAddClick?: (args: { id: string }) => void
    description?: React.ReactNode
    children: React.ReactNode
}

export const KanbanColumn: React.FC<props> = ({ children, id, title, count, description, data, onAddClick }) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
  });

  const onAddClickHandler = () => {
    onAddClick?.({ id })
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
      }}
    >
      <div style={{ padding: "12px" }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space>
            <Text
              ellipsis={{ tooltip: title }}
              size="xs"
              strong
              style={{ textTransform: "uppercase", whiteSpace: "nowrap" }}
            >
              {title}
            </Text>
            <Conditional condition={!!count}>
              <Badge count={count} color="cyan" />
            </Conditional>
          </Space>
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAddClickHandler}
          />
        </Space>
        {description}
      </div>
      <div
        style={{
          flex: 1,
          overflowY: active ? "unset" : "auto",
          border: "2px dashed transparent",
          borderColor: isOver ? "#00000040" : "transparent",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
