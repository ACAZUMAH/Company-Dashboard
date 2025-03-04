import { DollarOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Text } from '@/components/text/text'
import { Area, AreaConfig } from '@ant-design/plots'
import { useFetchChartData } from './hooks/useFetchChartData'
import { Title } from '@/components/title'

export const DealsChart = () => {

  const { deals } = useFetchChartData()

  const config: AreaConfig = {
    data: deals,
    xField: 'timeText',
    yField: 'value',
    isStack: false,
    seriesField: 'state',
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: {
      offsetY: -6,
    },
    yAxis: {
      tickCount: 4,
      label: {
        formatter: (v: string) => {
          return `$${Number(v) /1000}k`
        }
      }
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: data.state,
          value: `${Number(data.value) /1000}k`
        }
      }
    },
    areaStyle: (datum) => {
      const won = "l(270) 0:#ffffff 0.5:#b7eb8f 1:#52c41a";
      const lost = "l(270) 0:#ffffff 0.5:#f3b7c2 1:#ff4d4f";
      return { fill: datum.state === "Won" ? won : lost };
    },
    color: (datum) => {
      return datum.state === "Won" ? "#52C41A" : "#F5222D";
    },
  };

  return (
    <Card
      style={{ height: "100%" }}
      styles={{
        body: { padding: "24px 24px 0 24px" },
        header: { padding: "8px, 16px" },
      }}
      title={<Title icon={<DollarOutlined />} text="Deals" />}
    >
      <Area {...config} height={325} />
    </Card>
  );
}
