import { Card, List } from "antd";
import React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Title } from "@/components";
import { Conditional } from "@/components/conditional/conditional";
import { ActivitiesLoader } from "./components";
import { useFetchLatestActivities } from "./hooks/usefetchActivities";
import { ActivitiesList } from "./components";

export const LastestActivities = () => {
  const { data, audit, isLoading, isError, error } = useFetchLatestActivities();

  if (isError) {
    console.log(error);
    return null;
  }

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
              id: index,
            }))}
            renderItem={(_, index) => <ActivitiesLoader key={index} />}
          />
        </Conditional>
        <Conditional condition={!isLoading}>
          <List
            itemLayout="horizontal"
            dataSource={audit?.data}
            renderItem={(item) => <ActivitiesList item={item} deals={data}/>}
          />
        </Conditional>
      </Card>
    </div>
  );
};
