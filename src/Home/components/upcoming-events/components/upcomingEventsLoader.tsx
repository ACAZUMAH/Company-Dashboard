import { List, Skeleton as AntdSkeleton, Badge } from "antd";

export const UpcomingEventSkeleton = () => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Badge color="transparent" />}
        title={
          <AntdSkeleton.Button
            active
            style={{
              height: "14px",
            }}
          />
        }
        description={
          <AntdSkeleton.Button
            active
            style={{
              width: "300px",
              marginTop: "8px",
              height: "16px",
            }}
          />
        }
      />
    </List.Item>
  );
};
