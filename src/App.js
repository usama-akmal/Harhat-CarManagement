import { useState } from "react";
import { Layout, Menu, Space, Button, Row } from "antd";
import Search from "./Search";
import NewRegistry from "./NewRegistry";
import TransferOwnership from "./TransferOwnership";
import { AppContext } from "./context/AppContext";

const { Header } = Layout;
function App() {
  const [selectedKey, setSelectedKey] = useState(1);

  const menu = [
    {
      key: 1,
      label: "Search",
    },
    {
      key: 2,
      label: "Add New Registry",
    },
    {
      key: 3,
      label: "Transfer Ownership",
    },
  ];

  const { ethereum } = window;
  let [account, setAccount] = useState("");
  let [contractData, setContractData] = useState("");

  const connectMetamask = async () => {
    return;
  };

  const connectContract = async () => {
    return;
  };
  const getData = async () => {
    return;
  };
  const changeData = async () => {
    return;
  };
  return (
    <div className="App">
      {/* <button onClick={connectMetamask}>CONNECT TO METAMASK</button>
      <p>{account}</p>
      <button onClick={connectContract}>CONNECT TO CONTRACT</button>
      <button onClick={changeData}>CHANGE DATA</button>
      <button onClick={getData}>READ FROM CONTRACT</button>
      <p>{contractData}</p> */}

      {account ? (
        <AppContext.Provider value={{ account }}>
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                items={menu}
                onClick={({ key }) => setSelectedKey(key)}
              />
            </Header>
          </Layout>
          {getContentComponent(selectedKey)}
        </AppContext.Provider>
      ) : (
        <Row style={{ display: "flex" }} align="middle" justify="center">
          <div className="main-wallet-contract">
            <Space align="center">
              <Button type="primary">Connect Wallet</Button>
              <Button secondary>Connect Contract</Button>
            </Space>
          </div>
        </Row>
      )}
    </div>
  );
}

const getContentComponent = (key) => {
  if (key === "1") return <Search />;
  if (key === "2") return <NewRegistry />;
  if (key === "3") return <TransferOwnership />;
  return <Search />;
};
export default App;
