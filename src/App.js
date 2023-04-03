import { useState } from "react";
import { ethers } from "ethers";
import { Layout, Menu, Space, Button, Row, notification } from "antd";
import Search from "./Search";
import NewRegistry from "./NewRegistry";
import TransferOwnership from "./TransferOwnership";
import { CarManagementABI } from "./contractABIs";

const { Header } = Layout;
function App() {
  const [selectedKey, setSelectedKey] = useState(1);
  const [api, contextHolder] = notification.useNotification();

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

  const connectMetamask = async () => {
    if (window.ethereum !== "undefined") {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    }
  };

  let contract;
  const connectContract = async () => {
    const Address = "0x2F5E6ca839D63797753577bEB14599C8bE8c60f1";
    const ABI = CarManagementABI;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(Address, ABI, signer);
    console.log(contract.address);
  };

  const createNewRegistry = async (data) => {
    await connectContract();
    try {
      const transaction = await contract.storeCarDetails(data);
      const receipt = await transaction.wait();
      console.log(receipt);
      api.success({
        message: `Add New Registry Success!`,
        placement: "top",
      });
    } catch (exc) {
      api.error({
        message: `Add New Registry Failed!`,
        description: exc.error.message,
        placement: "top",
      });
    }
  };

  const searchCar = async (carNumber) => {
    await connectContract();
    const carDetails = await contract.retrieveCarDetails(carNumber);
    const owner = await contract.retrieveOwnerOfCar(carNumber);
    if (owner === "0x0000000000000000000000000000000000000000") {
      api.info({
        message: `Search Completed`,
        description: `Record not found for car number ${carNumber}`,
        placement: "top",
      });
    } else {
      api.success({
        message: `Search Completed`,
        description: `Record not found for car number ${carNumber}`,
        placement: "top",
      });
    }
    return { ...carDetails, owner };
  };

  const transferOwnership = async (carNumber, newOwner) => {
    await connectContract();
    try {
      const transaction = await contract.transferOwnership(carNumber, newOwner);
      const receipt = await transaction.wait();
      console.log(receipt);
      api.success({
        message: `Transfer Ownership Success!`,
        placement: "top",
      });
    } catch (exc) {
      api.error({
        message: `Transfer Ownership Failed!`,
        description: exc.error.message,
        placement: "top",
      });
    }
  };

  const getContentComponent = (key) => {
    if (key === "1") return <Search execute={searchCar} />;
    if (key === "2") return <NewRegistry execute={createNewRegistry} />;
    if (key === "3") return <TransferOwnership execute={transferOwnership} />;
    return <Search execute={searchCar} />;
  };

  return (
    <div className="App">
      {!!account ? (
        <div>
          {contextHolder}
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
        </div>
      ) : (
        <Row style={{ display: "flex" }} align="middle" justify="center">
          <div className="main-wallet-contract">
            <Space align="center">
              <Button type="primary" onClick={connectMetamask}>
                Connect Wallet
              </Button>
              {/* <Button secondary onClick={connectContract}>
                Connect Contract
              </Button> */}
            </Space>
          </div>
        </Row>
      )}
    </div>
  );
}

export default App;
