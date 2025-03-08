
import { TasksQuery } from "@/interfaces/graphql/types";
import { useList } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import gql from "graphql-tag";

const taskQueryGql = gql`
  query Tasks(
    $filter: TaskFilter!
    $sorting: [TaskSort!]
    $paging: OffsetPaging!
  ) {
    tasks(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount # Get the total count of tasks
      nodes {
        id
        title
        description
        dueDate
        completed
        stageId
        # Get user details associated with this task
        users {
          id
          name
          avatarUrl
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const useFetchTasks = (stages: any) => {
      const { data: tasks, isLoading: isLoadingTasks } = useList<
        GetFieldsFromList<TasksQuery>
      >({
        resource: "tasks",
        sorters: [{ field: "dueDate", order: "asc" }],
        queryOptions: { enabled: !!stages },
        pagination: { mode: "off" },
        meta: {
          gqlQuery: taskQueryGql,
        },
      });

    return { tasks, isLoadingTasks }
}