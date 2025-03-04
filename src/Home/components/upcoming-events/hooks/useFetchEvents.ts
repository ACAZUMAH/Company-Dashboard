import { useList } from "@refinedev/core";
import dayjs from "dayjs";
import gql from "graphql-tag";

const getUpComingEventsGql = gql`
  query DashboardCalendarUpcomingEvents(
    $filter: EventFilter!
    $sorting: [EventSort!]
    $paging: OffsetPaging!
  ) {
    events(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
        color
        startDate
        endDate
      }
    }
  }
`;

export const useFetchUpComingEvents = () => {
  const { data, isLoading } = useList({
    resource: "events",
    pagination: { pageSize: 5 },
    sorters: [
      {
        field: "startDate",
        order: "asc",
      },
    ],
    filters: [
      {
        field: "startDate",
        operator: "gte",
        value: dayjs().format("YYY-MM-DD"),
      },
    ],
    meta: {
      gqlQuery: getUpComingEventsGql,
    },
  });

  return { data, isLoading };
};
