export const CarManagementABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_carNumber",
        type: "string",
      },
    ],
    name: "retrieveCarDetails",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "number",
            type: "string",
          },
          {
            internalType: "string",
            name: "color",
            type: "string",
          },
          {
            internalType: "string",
            name: "model",
            type: "string",
          },
        ],
        internalType: "struct CarManagement.Car",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_carNumber",
        type: "string",
      },
    ],
    name: "retrieveOwnerOfCar",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "number",
            type: "string",
          },
          {
            internalType: "string",
            name: "color",
            type: "string",
          },
          {
            internalType: "string",
            name: "model",
            type: "string",
          },
        ],
        internalType: "struct CarManagement.Car",
        name: "_carDetail",
        type: "tuple",
      },
    ],
    name: "storeCarDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_carNumber",
        type: "string",
      },
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];