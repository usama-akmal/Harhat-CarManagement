import {
  Breadcrumb,
  Layout,
  Button,
  Form,
  Space,
  Input,
  Typography,
  theme,
} from "antd";

const { Content } = Layout;
const { Title } = Typography;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 4 },
};

const tailLayout = {
  wrapperCol: { offset: 0, span: 8 },
};

const NewRegistry = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Content style={{ padding: "0 50px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>New Registry</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-content"
        style={{ background: colorBgContainer }}
      >
        <Title level={2}>Add New Car Details</Title>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="carNumber"
            label="Car Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="carColor"
            label="Car Color"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="carModel"
            label="Car Model"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default NewRegistry;
