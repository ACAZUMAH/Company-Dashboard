import {  Refine, } from "@refinedev/core";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider } from "../services";
import { authProvider } from "./authProvider";

import routerBindings from "@refinedev/react-router";
import React from "react";
import { resources } from "@/configs/resources";

const refineOptions = {
  syncWithLocation: true,
  warnWhenUnsavedChanges: true,
  useNewQueryKeys: true,
  projectId: "Ph0tMD-9PAYVM-IAVA4g",
  liveMode: "auto" as "auto",
};

interface props {
  children: React.ReactNode;
}

export const RefineProvider: React.FC<props> = ({ children }) => {
  return (
    <Refine
      dataProvider={dataProvider}
      liveProvider={liveProvider}
      notificationProvider={useNotificationProvider}
      routerProvider={routerBindings}
      authProvider={authProvider}
      options={refineOptions}
      resources={resources}
    >
      {children}
    </Refine>
  );
};
