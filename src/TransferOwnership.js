import {
  Breadcrumb,
  Layout,
  theme,
  Form,
  Input,
  Typography,
  Space,
  Button,
} from "antd";

const { Title } = Typography;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 4 },
};

const tailLayout = {
  wrapperCol: { offset: 0, span: 8 },
};

const { Content } = Layout;

const TransferOwnership = ({ execute }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [form] = Form.useForm();

  const onFinish = async ({ carNumber, ownerAccount }) => {
    await execute(carNumber, ownerAccount);
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Content style={{ padding: "0 50px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Transfer Ownership</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-content"
        style={{ background: colorBgContainer }}
      >
        <Title level={2}>Transfer Ownership</Title>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="carNumber"
            label="Car Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ownerAccount"
            label="New Owner Account"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Transfer
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

export default TransferOwnership;
