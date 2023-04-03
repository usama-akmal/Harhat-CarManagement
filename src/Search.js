import {
  Breadcrumb,
  Layout,
  theme,
  Form,
  Input,
  Button,
  Typography,
  Space,
} from "antd";
import { useState } from "react";

const { Content } = Layout;
const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 4 },
};

const tailLayout = {
  wrapperCol: { offset: 0, span: 8 },
};

const Search = ({execute}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [form] = Form.useForm();

  const [carDetails, setCarDetails] = useState(null);

  const onFinish = async ({ carNumber }) => {
    const data = await execute(carNumber);
    setCarDetails(data);
  };

  const onReset = () => {
    form.resetFields();
  };
  return (
    <Content style={{ padding: "0 50px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Search</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-content"
        style={{ background: colorBgContainer }}
      >
        <Title level={2}>Search Car Details</Title>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="carNumber"
            label="Car Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
        {carDetails && (
          <div>
            <Title level={2}>Car Details Found</Title>
            <Space direction="vertical">
              <Text>
                Car Number: <Text keyboard>{carDetails.number}</Text>
              </Text>
              <Text>
                Car Color: <Text italic>{carDetails.color}</Text>
              </Text>
              <Text>
                Car Model: <Text italic>{carDetails.model}</Text>
              </Text>
              <Text>
                Car Owner: <Text code>{carDetails.owner}</Text>
              </Text>
            </Space>
          </div>
        )}
      </div>
    </Content>
  );
};

export default Search;
