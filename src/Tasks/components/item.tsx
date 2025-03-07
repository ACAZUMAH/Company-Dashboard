import {
  DragOverlay,
  useDraggable,
  UseDraggableArguments,
} from "@dnd-kit/core";
import React from "react";

interface props {
  children: React.ReactNode;
  id: string;
  data?: UseDraggableArguments["data"];
}

export const KanbanItem: React.FC<props> = ({ children, id, data }) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id,
    data,
  });

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: "8px",
          position: "relative",
          cursor: "grab",
        }}
      >
        {active?.id === id && (
          <DragOverlay zIndex={1000}>
            <div
              style={{
                borderRadius: "8px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                cursor: "grabbing",
              }}
            >{children}</div>
          </DragOverlay>
        )}
        {children}
      </div>
    </div>
  );
};
