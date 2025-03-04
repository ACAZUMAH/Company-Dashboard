import dayjs from "dayjs";
import React from "react";
import { List, Badge } from "antd";
import { Text } from "../../../../components/text/text";
import { BaseKey } from "@refinedev/core";

interface item {
  id?: BaseKey | undefined;
  startDate: string;
  endDate: string;
  color: string;
  title: string;
}

export const EventList: React.FC<item> = (item) => {
  const renderDate = () => {
    const start = dayjs(item.startDate).format("MMM DD, YYYY - HH:mm");

    const end = dayjs(item.endDate).format("MMM DD, YYYY - HH:mm");
    return `${start} -${end}`;
  };
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Badge color={item.color} />}
        title={<Text size="xs">{`${renderDate()}`}</Text>}
        description={
          <Text ellipsis={{ tooltip: true }} strong>
            {item.title}
          </Text>
        }
      />
    </List.Item>
  );
};
