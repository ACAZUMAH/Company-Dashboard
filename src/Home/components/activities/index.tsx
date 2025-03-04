import { Card, List } from "antd";
import React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Title } from "@/components/title";
import { Conditional } from "@/components/conditional/conditional";

export const LastestActivities = () => {
  const isLoading = true;
  return (
    <div>
      <Card
        styles={{ body: { padding: "16px" }, header: { padding: "0, 1rem" } }}
        title={
          <Title icon={<UnorderedListOutlined />} text="Latest Activities" />
        }
      >
        <Conditional condition={isLoading}>
          <List
            itemLayout="horizontal"
            dataSource={Array.from({ length: 5 }).map((_, index) => ({
              id: index
            }))}
          />
        </Conditional>
        <Conditional condition={!isLoading}>
          <List />
        </Conditional>
      </Card>
    </div>
  );
};
