import { useList } from "@refinedev/core";
import { TasksQuery, TaskStagesQuery } from "@/interfaces/graphql/types";
import gql from "graphql-tag";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

type Task = GetFieldsFromList<TasksQuery>;
type TaskStage = GetFieldsFromList<TaskStagesQuery> & { task: Task[] };
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

export const useFetchStages = () => {
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

  return { stages, isLoadingStages };
};
