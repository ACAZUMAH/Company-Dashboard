import { CalendarOutlined } from "@ant-design/icons";
import { Card, List } from "antd";;
import { useFetchUpComingEvents } from "./hooks/useFetchEvents";
import { EmptyEvents, EventList, UpcomingEventSkeleton } from "./components";
import { Conditional, Title } from "@/components";

export const UpcomingEvents = () => {
  const { data, isLoading } = useFetchUpComingEvents();

  return (
    <Card
      style={{ height: "100%" }}
      styles={{
        body: { padding: "0, 1rem" },
        header: { padding: "8px, 16px" },
      }}
      title={<Title icon={<CalendarOutlined />} text="Upcoming Events" />}
    >
      <Conditional condition={isLoading}>
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <UpcomingEventSkeleton />}
        />
      </Conditional>
      <Conditional condition={!isLoading}>
        <List
          itemLayout="horizontal"
          dataSource={data?.data || []}
          renderItem={(item) => {
            return (
              <EventList
                key={item.id}
                startDate={item.startDate}
                endDate={item.endDate}
                color={item.color}
                title={item.title}
              />
            );
          }}
        />
      </Conditional>
      <Conditional condition={!isLoading && data?.data.length === 0}>
        <EmptyEvents />
      </Conditional>
    </Card>
  );
};
