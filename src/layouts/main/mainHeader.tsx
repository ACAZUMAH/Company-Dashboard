import { Layout, Space } from "antd";
import CurrentUser from "./components/currentUser";

const MainHeader = () => {
  return (
    <Layout.Header
      style={{
        background: "#ffff",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: 'center',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 999
      }}
    >
      <Space>
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};

export default MainHeader;
