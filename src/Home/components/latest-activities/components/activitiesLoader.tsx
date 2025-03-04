import React from "react";
import { List, Skeleton as AntdSkeleton } from "antd";

export const ActivitiesLoader = () => {
  return (
    <>
      <List.Item>
        <List.Item.Meta
          avatar={
            <AntdSkeleton.Avatar
              active
              size={48}
              shape="square"
              style={{
                borderRadius: "4px",
              }}
            />
          }
          title={
            <AntdSkeleton.Button
              active
              style={{
                height: "16px",
              }}
            />
          }
          description={
            <AntdSkeleton.Button
              active
              style={{
                width: "300px",
                height: "16px",
              }}
            />
          }
        />
      </List.Item>
    </>
  );
};
