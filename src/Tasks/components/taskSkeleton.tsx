import { KanbanBoardContainer } from "./board";
import { KanbanColumnSkeleton } from "./kanbanColumnSkeleton";
import { ProjectCardSkeleton } from "./projectCardSkeleton";

export const TaskSkeleton = () => {
  return (
    <KanbanBoardContainer>
      {Array.from({ length: 5 }).map((_, index) => (
        <KanbanColumnSkeleton key={index}>
          {Array.from({ length: 3 }).map((_, index) => (
            <ProjectCardSkeleton key={index}/>
          ))}
        </KanbanColumnSkeleton>
      ))}
    </KanbanBoardContainer>
  );
};
