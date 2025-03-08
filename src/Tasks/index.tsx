import { useNavigation, useUpdate } from "@refinedev/core";
import {
  KanbanBoard,
  KanbanBoardContainer,
  KanbanColumn,
  KanbanItem,
  ProjectCardMemo,
  KanbanAddCardButton,
  TaskSkeleton,
  ProjectCardSkeleton,
} from "./components";
import { useFetchTasks, useFetchStages, updateStageGql } from "./hooks";
import { useMemo } from "react";
import { Conditional } from "@/components";
import { DragEndEvent } from "@dnd-kit/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { TasksQuery, TaskStagesQuery } from "@/interfaces/graphql/types";

type Task = GetFieldsFromList<TasksQuery>

type TaskStage = GetFieldsFromList<TaskStagesQuery> & { tasks: Task[] }

export const TaskList = ({ children }: React.PropsWithChildren) => {
  const { replace } = useNavigation();

  const { stages, isLoadingStages } = useFetchStages();

  const { tasks, isLoadingTasks } = useFetchTasks(stages);

  const { mutate: updateTask } = useUpdate();

  const taskStages = useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unnasignedStage: [],
        stages: [],
      };
    }
    const unasignedStage = tasks.data.filter((task) => task.stageId === null);

    const grouped: TaskStage[] = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks.data.filter((task) => task.stageId?.toString() === stage.id),
    }));
    return {
      unasignedStage,
      columns: grouped,
    };
  }, [stages, tasks]);

  const handleAddCard = (args: { stageId: string }) => {
    const path =
      args.stageId === "unassigned"
        ? "/tasks/new"
        : `/tasks/new?stageId=${args.stageId}`;

    replace(path);
  };

  const handlOnDragEnd = (event: DragEndEvent) => {
    let stageId = event.over?.id as undefined | string | null;
    const taskId = event.active.id as string;
    const taskStageId = event.active.data.current?.stageId;

    if (taskStageId === stageId) return;

    if (stageId === "unassigned") stageId = null;

    updateTask({
      resource: "tasks",
      id: taskId,
      values: {
        stageId: stageId,
      },
      successNotification: false,
      mutationMode: "optimistic",
      meta: {
        gqlMutation: updateStageGql,
      },
    });
  };

  const isLoading = isLoadingStages || isLoadingTasks;

  if (isLoading) return <TaskSkeleton />;

  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handlOnDragEnd}>
          <KanbanColumn
            id="unassigned"
            title={"unassigned"}
            count={taskStages?.unasignedStage?.length || 0}
            onAddClick={() => handleAddCard({ stageId: "unasigned" })}
          >
            {taskStages?.unasignedStage?.map((task) => (
              <KanbanItem
                key={task.id}
                id={task.id}
                data={{ ...task, stageId: "unasigned" }}
              >
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate || undefined}
                />
              </KanbanItem>
            ))}
            <Conditional condition={!taskStages?.unasignedStage?.length}>
              <KanbanAddCardButton
                onClick={() => handleAddCard({ stageId: "unasigned" })}
              />
            </Conditional>
          </KanbanColumn>
          {taskStages.columns?.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              count={column.tasks.length}
              onAddClick={() => handleAddCard({ stageId: column.id })}
            >
              <Conditional condition={isLoading}>
                <ProjectCardSkeleton />
              </Conditional>
              <Conditional condition={!isLoading}>
                {column.tasks.map((task) => (
                  <KanbanItem key={task.id} id={task.id} data={task}>
                    <ProjectCardMemo
                      {...task}
                      dueDate={task.dueDate || undefined}
                    />
                  </KanbanItem>
                ))}
              </Conditional>
              <Conditional condition={!column.tasks.length}>
                <KanbanAddCardButton
                  onClick={() => handleAddCard({ stageId: column.id })}
                />
              </Conditional>
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  );
};
