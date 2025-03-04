import { totalCountVariants } from "@/constants";
import { Card, Skeleton } from "antd";
import React from "react";
import { Text } from "../text/text";
import { Area, AreaConfig } from "@ant-design/plots";

interface props {
  resource: "companies" | "contacts" | "deals";
  isLoading: boolean | undefined;
  totalCount: number;
}

export const CountCard: React.FC<props> = ({
  resource,
  isLoading,
  totalCount,
}) => {
  const { primaryColor, secondaryColor, icon, title } =
    totalCountVariants[resource];

   const config: AreaConfig = {
    data: totalCountVariants[resource].data,
    xField: 'index',
    yField: 'value',
    appendPadding: [1, 0, 0, 0],
    padding: 0,
    syncViewPadding: true,
    autoFit: true,
    tooltip: false,
    animation: false,
    xAxis: false,
    smooth: true,
    yAxis: {
        tickCount: 12,
        label: {
            style: {
                stroke: 'transparent'
            }
        },
        grid: {
            line: {
                style: {
                    stroke: 'transparent'
                }
            }
        }
    },
    line: {
        color: primaryColor
    },
    areaStyle: () => {
        return {
            fill: `l(270) 0:#fff 0.2${secondaryColor} 1:${primaryColor}`
        }
    }
   } 
  return (
    <Card
      style={{ height: "96px", padding: "0" }}
      styles={{ body: { padding: "8px 8px 8px 12px" } }}
      size="small"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        {icon}
        <Text size="md" className="secondary" style={{ marginLeft: "8px" }}>
          {title}
        </Text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text
          size="xxxl"
          strong
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            flexShrink: 0,
            textAlign: "start",
            marginLeft: "48px",
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {isLoading ? (
            <Skeleton.Button style={{ marginTop: "8px", width: "74px" }} />
          ) : (
            totalCount
          )}
        </Text>
        <Area {...config} style={{ width: '50%'}}/>
      </div>
    </Card>
  );
};
