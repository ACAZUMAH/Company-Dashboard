import { TaskStage } from "@/graphql/schema.types";
import { useList } from "@refinedev/core";
import gql from "graphql-tag";
 
const taskStagesGql = gql`
  query TaskStages(
    $filter: TaskStageFilter!
    $sorting: [TaskStageSort!]
    $paging: OffsetPaging!
  ) {
    taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount # Get the total count of task stages
      nodes {
        id
        title
      }
    }
  }
`;


export const useFetchStages = ()  => {
      const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
        resource: "taskStages",
        filters: [
          {
            field: "title",
            operator: "in",
            value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
          },
        ],
        sorters: [{ field: "createdAt", order: "asc" }],
        meta: {
          gqlQuery: taskStagesGql,
        },
      });

      return { stages, isLoadingStages }
}