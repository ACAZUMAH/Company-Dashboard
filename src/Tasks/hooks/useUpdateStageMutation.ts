import gql from "graphql-tag";

export const updateStageGql = gql`
  mutation UpdateTaskStage($input: UpdateOneTaskInput!) {
    updateOneTask(input: $input) {
      id
    }
  }
`;