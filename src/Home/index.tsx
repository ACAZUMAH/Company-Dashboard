import { DealsChart } from "./components/dealsChart";
import { Col, Row } from "antd";
import { UpcomingEvents } from "./components/upcoming-events";
import { CountCard } from "@/components/count-card";
import { useGetTotalCounts } from "./hooks/useGetCounts";
import { LastestActivities } from "./components/latest-activities";

export const Home = () => {
  const { data, isLoading } = useGetTotalCounts();
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <CountCard
            resource="companies"
            isLoading={isLoading}
            totalCount={data?.data.companies.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <CountCard
            resource="contacts"
            isLoading={isLoading}
            totalCount={data?.data.contacts.totalCount}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <CountCard
            resource="deals"
            isLoading={isLoading}
            totalCount={data?.data.deals.totalCount}
          />
        </Col>
      </Row>
      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={8} style={{ height: "460px" }}>
          <UpcomingEvents />
        </Col>
        <Col
          xs={24}
          sm={24}
          xl={16}
          style={{
            height: "460px",
          }}
        >
          <DealsChart />
        </Col>
      </Row>
      <Row gutter={[32, 32]} style={{ marginTop: '32px' }}>
        <Col xs={24}>
          <LastestActivities />
        </Col>
      </Row>
    </div>
  );
};
