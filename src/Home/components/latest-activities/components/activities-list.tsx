import { Text } from "@/components";
import CustomAvatar from "@/components/avatar/avatar";
import { List, Space } from "antd";
import dayjs from "dayjs";
import React from "react";

interface props {
  item: any;
  deals: any;
}

export const ActivitiesList: React.FC<props> = ({ item, deals }) => {
  const deal = deals?.data.find(
    (deal: any) => deal.id === String(item.targetId) || undefined
  );
  return (
    <List.Item>
      <List.Item.Meta
        title={dayjs(deal?.createdAt).format("MMM DD, YYYY - HH:mm")}
        avatar={
          <CustomAvatar
            shape="square"
            size={48}
            src={deal?.company.avatarUrl}
            name={deal?.company.name}
          />
        }
        description={
          <Space size={4}>
            <Text strong>{item.user?.name}</Text>
            <Text>{item.action === 'CREATE' ?  'moved' : 'created'}</Text>
            <Text strong>{deal?.title}</Text>
            <Text>deal</Text>
            <Text>{item.action === 'CREATE' ? 'to' : 'in' }</Text>
            <Text strong>{deal?.stage?.title}</Text>
          </Space>
        }
      />
    </List.Item>
  );
};
