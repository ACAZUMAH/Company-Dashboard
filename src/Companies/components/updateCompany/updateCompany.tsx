import { Col, Row } from "antd";
import { UpdateForm } from "./components/updateForm";
import { CompanyContactsTable } from "./components/contactTable";

export const UpdateCompany = () => {
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <UpdateForm />
        </Col>
        <Col xs={24} xl={12}>
        <CompanyContactsTable />
        </Col>
      </Row>
    </div>
  );
};
