import { useList } from "@refinedev/core";
import gql from "graphql-tag";
import { useFetchLatestActivitiesDeals } from "./useFetchLatestDeals";

const latestActivitiesAuditsGql = gql`
  query DashboardLatestActivitiesAudits(
    $filter: AuditFilter!
    $sorting: [AuditSort!]
    $paging: OffsetPaging
  ) {
    audits(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        action
        targetEntity
        targetId
        changes {
          field
          from
          to
        }
        createdAt
        user {
          id
          name
          avatarUrl
        }
      }
    }
  }
`;

export const useFetchLatestActivities = () => {
  const {
    data: audit,
    isLoading: isLoadingAudit,
    isError,
    error,
  } = useList({
    resource: "audits",
    meta: {
      gqlQuery: latestActivitiesAuditsGql,
    },
  });

  const dealsIds = audit?.data.map((audit) => audit?.targetId);

  const { data, isLoadingDeals } = useFetchLatestActivitiesDeals(dealsIds);

  const isLoading = isLoadingAudit || isLoadingDeals;

  return { data, audit, isLoading, isError, error };
};
