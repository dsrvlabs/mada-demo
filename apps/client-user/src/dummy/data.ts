import type { DataItem, Merchant, TransactionItems } from "../types/type";

export const userData = [
  { id: 1, name: "Razona Rakotomalala", address: "0xasfkls2o943482978503fjklksccc0000000000", age: 30 },
  { id: 2, name: "Jane Smith", address: "0xasfkls2o943482978503fjklksccc0000000000", age: 25 },
  { id: 3, name: "Alice Johnson", address: "0x1234abcd5678efghcd5678efgh0000000000000", age: 28 },
  { id: 4, name: "Bob Brown", address: "0x2345bcde6789fghicd5678efgh0000000000000", age: 35 },
  { id: 5, name: "Charlie Davis", address: "0x3456cdef7890ghijcd5678efgh0000000000000", age: 22 },
  { id: 6, name: "David Evans", address: "0x4567defg8901hijkcd5678efgh0000000000000", age: 40 },
  { id: 7, name: "Eve Foster", address: "0x5678efgh9012ijklcd5678efgh0000000000000", age: 33 },
  { id: 8, name: "Frank Green", address: "0x6789fghi0123jklmcd5678efgh0000000000000", age: 29 },
  { id: 9, name: "Grace Hill", address: "0x7890ghij1234klmncd5678efgh0000000000000", age: 26 },
  { id: 10, name: "Hank Irving", address: "0x8901hijk2345lmnocd5678efgh0000000000000", age: 31 },
  { id: 11, name: "Ivy Jenkins", address: "0x9012ijkl3456mnopcd5678efgh0000000000000", age: 27 },
  { id: 12, name: "Jack King", address: "0x0123jklm4567nopqcd5678efgh0000000000000", age: 36 },
  { id: 13, name: "Karen Lee", address: "0x1234klmn5678opqrcd5678efgh0000000000000", age: 24 },
  { id: 14, name: "Larry Moore", address: "0x2345lmno6789pqrscd5678efgh0000000000000", age: 32 },
  { id: 15, name: "Mona Neal", address: "0x3456mnop7890qrstcd5678efgh0000000000000", age: 38 },
  { id: 16, name: "Nate Olson", address: "0x4567nopq8901rstucd5678efgh0000000000000", age: 41 },
  { id: 17, name: "Oscar Perry", address: "0x5678opqr9012stuvcd5678efgh0000000000000", age: 23 },
  { id: 18, name: "Pam Quinn", address: "0x6789pqrs0123tuvcd5678efgh0000000000000w", age: 34 },
  { id: 19, name: "Quinn Roberts", address: "0x7890qrst1234cd5678efghuvwx0000000000000", age: 37 },
  { id: 20, name: "Rose Scott", address: "0x8901rstu2345vcd5678efghwxy0000000000000", age: 39 },
  { id: 21, name: "Steve Thomas", address: "0x9012stuv345cd5678efgh6wxyz0000000000000", age: 29 },
  { id: 22, name: "Tina Underwood", address: "0x0123tuvw456cd5678efgh7xyz00000000000001", age: 42 },
];

export const todayTransactions = [
  { from: "1", to: "12", datetime: "2024-06-23 15:23:56", status: "completed", detail: "see detail" },
];

export const totalTransactions = [
  { from: "52", to: "12", datetime: "2024-06-23 15:23:56", status: "completed", detail: "see detail" },
  { from: "45", to: "13", datetime: "2024-06-23 14:11:34", status: "pending", detail: "see detail" },
  { from: "39", to: "21", datetime: "2024-06-23 13:45:22", status: "completed", detail: "see detail" },
  { from: "38", to: "14", datetime: "2024-06-22 16:32:45", status: "completed", detail: "see detail" },
  { from: "37", to: "16", datetime: "2024-06-22 11:22:11", status: "completed", detail: "see detail" },
  { from: "36", to: "18", datetime: "2024-06-21 09:13:52", status: "completed", detail: "see detail" },
];

export const transactions = [
  {
    id: 1,
    date: "2024-06-20",
    item: "Fertilizer",
    quantity: 10,
  },
  {
    id: 2,
    date: "2024-06-21",
    item: "Shovel",
    quantity: 5,
  },
  {
    id: 3,
    date: "2024-06-22",
    item: "Fertilizer",
    quantity: 2,
  },
  {
    id: 4,
    date: "2024-06-23",
    item: "Pesticide",
    quantity: 1,
  },
  {
    id: 5,
    date: "2024-06-23",
    item: "Pesticide",
    quantity: 1,
  },
  {
    id: 6,
    date: "2024-06-23",
    item: "Pesticide",
    quantity: 1,
  },
  {
    id: 7,
    date: "2024-06-23",
    item: "Pesticide",
    quantity: 1,
  },
];

export const farmertransactions: TransactionItems[] = [
  {
    id: 1,
    farmer: "Razona Rakotomalala",
    farmerAddress: "0x1234567890abcdef1234567890abcdef12345678",
    date: "2024-06-20",
    items: [
      { id: "item1", name: "Chemical Fertilizer", quantity: 10 },
      { id: "item2", name: "Improved Seeds", quantity: 5 },
    ],
    status: "Completed",
  },
  {
    id: 2,
    farmer: "Jane Smith",
    farmerAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    date: "2024-06-18",
    items: [
      { id: "item3", name: "Improved Seeds", quantity: 8 },
      { id: "item4", name: "Agricultural Tools - Shovel", quantity: 2 },
    ],
    status: "Completed",
  },
  {
    id: 3,
    farmer: "Emily Johnson",
    farmerAddress: "0x7890abcdef1234567890abcdef1234567890abcd",
    date: "2024-06-15",
    items: [{ id: "item5", name: "Agricultural Tools- Shovel", quantity: 3 }],
    status: "Pending",
  },
];

export const merchantsData: Merchant[] = [
  {
    id: 1,
    name: "Vendor One",
    address: "123 Main St",
    age: 45,
    location: { lat: -18.8792, lng: 47.5079 },
    inventory: {
      fertilizer: 50,
      seeds: 100,
      shovel: 20,
      pesticide: 30,
    },
    transactions: [
      { id: 1, date: "2024-01-01", item: "fertilizer", quantity: 10 },
      { id: 2, date: "2024-01-02", item: "seeds", quantity: 20 },
    ],
    region: "Region 1", // Add this line
  },
  {
    id: 2,
    name: "Vendor Two",
    address: "456 Elm St",
    age: 38,
    location: { lat: -19.8792, lng: 46.5079 },
    inventory: {
      fertilizer: 60,
      seeds: 120,
      shovel: 25,
      pesticide: 35,
    },
    transactions: [
      { id: 1, date: "2024-01-03", item: "shovel", quantity: 15 },
      { id: 2, date: "2024-01-04", item: "pesticide", quantity: 25 },
    ],
    region: "Region 2", // Add this line
  },
  {
    id: 3,
    name: "Vendor Three",
    address: "789 Oak St",
    age: 52,
    location: { lat: -18.8791, lng: 47.508 },
    inventory: {
      fertilizer: 70,
      seeds: 140,
      shovel: 35,
      pesticide: 40,
    },
    transactions: [
      { id: 1, date: "2024-01-05", item: "fertilizer", quantity: 20 },
      { id: 2, date: "2024-01-06", item: "seeds", quantity: 30 },
    ],
    region: "Region 1", // Add this line
  },
  {
    id: 4,
    name: "Vendor Four",
    address: "321 Pine St",
    age: 40,
    location: { lat: -19.8791, lng: 46.508 },
    inventory: {
      fertilizer: 80,
      seeds: 160,
      shovel: 40,
      pesticide: 45,
    },
    transactions: [
      { id: 1, date: "2024-01-07", item: "shovel", quantity: 25 },
      { id: 2, date: "2024-01-08", item: "pesticide", quantity: 35 },
    ],
    region: "Region 2", // Add this line
  },
  {
    id: 5,
    name: "Vendor Five",
    address: "654 Cedar St",
    age: 47,
    location: { lat: -18.8793, lng: 47.5078 },
    inventory: {
      fertilizer: 90,
      seeds: 180,
      shovel: 45,
      pesticide: 50,
    },
    transactions: [
      { id: 1, date: "2024-01-09", item: "fertilizer", quantity: 30 },
      { id: 2, date: "2024-01-10", item: "seeds", quantity: 40 },
    ],
    region: "Region 1", // Add this line
  },
  {
    id: 6,
    name: "Vendor Six",
    address: "987 Maple St",
    age: 36,
    location: { lat: -19.8793, lng: 46.5078 },
    inventory: {
      fertilizer: 100,
      seeds: 200,
      shovel: 50,
      pesticide: 55,
    },
    transactions: [
      { id: 1, date: "2024-01-11", item: "shovel", quantity: 35 },
      { id: 2, date: "2024-01-12", item: "pesticide", quantity: 45 },
    ],
    region: "Region 2", // Add this line
  },
  {
    id: 7,
    name: "Vendor Seven",
    address: "246 Birch St",
    age: 50,
    location: { lat: -18.8794, lng: 47.5077 },
    inventory: {
      fertilizer: 110,
      seeds: 220,
      shovel: 55,
      pesticide: 60,
    },
    transactions: [
      { id: 1, date: "2024-01-13", item: "fertilizer", quantity: 40 },
      { id: 2, date: "2024-01-14", item: "seeds", quantity: 50 },
    ],
    region: "Region 1", // Add this line
  },
];

export const statisticsData = {
  tokens: [
    { name: "Fertilizer", totalIssued: 500 },
    { name: "Seeds", totalIssued: 300 },
    { name: "Shovel", totalIssued: 150 },
    { name: "Pesticide", totalIssued: 200 },
  ],
};

export const supplyData = {
  Daily: [
    { name: "2024-01-01", totalIssuance: 2400, actualUsage: 30 },
    { name: "2024-01-02", totalIssuance: 2210, actualUsage: 20 },
    { name: "2024-01-03", totalIssuance: 2290, actualUsage: 25 },
    { name: "2024-01-04", totalIssuance: 2000, actualUsage: 27 },
    { name: "2024-01-05", totalIssuance: 2181, actualUsage: 24 },
    { name: "2024-01-06", totalIssuance: 2500, actualUsage: 23 },
    { name: "2024-01-07", totalIssuance: 2100, actualUsage: 28 },
    { name: "2024-01-08", totalIssuance: 2150, actualUsage: 22 },
    { name: "2024-01-09", totalIssuance: 2300, actualUsage: 26 },
    { name: "2024-01-10", totalIssuance: 2400, actualUsage: 29 },
  ],
  Weekly: [
    { name: "Week 1", totalIssuance: 1200, actualUsage: 150 },
    { name: "Week 2", totalIssuance: 980, actualUsage: 200 },
    { name: "Week 3", totalIssuance: 1100, actualUsage: 180 },
    { name: "Week 4", totalIssuance: 950, actualUsage: 170 },
    { name: "Week 5", totalIssuance: 1000, actualUsage: 190 },
    { name: "Week 6", totalIssuance: 1150, actualUsage: 160 },
    { name: "Week 7", totalIssuance: 1000, actualUsage: 210 },
    { name: "Week 8", totalIssuance: 990, actualUsage: 220 },
    { name: "Week 9", totalIssuance: 1080, actualUsage: 230 },
    { name: "Week 10", totalIssuance: 1200, actualUsage: 240 },
  ],
  Monthly: [
    { name: "January", totalIssuance: 3000, actualUsage: 500 },
    { name: "February", totalIssuance: 4000, actualUsage: 600 },
    { name: "March", totalIssuance: 3500, actualUsage: 700 },
    { name: "April", totalIssuance: 4500, actualUsage: 800 },
    { name: "May", totalIssuance: 5000, actualUsage: 900 },
    { name: "June", totalIssuance: 6000, actualUsage: 1000 },
    { name: "July", totalIssuance: 7000, actualUsage: 1100 },
    { name: "August", totalIssuance: 7500, actualUsage: 1200 },
    { name: "September", totalIssuance: 8000, actualUsage: 1300 },
    { name: "October", totalIssuance: 8500, actualUsage: 1400 },
  ],
};

export const RegionalData: DataItem[] = [
  { region: 1, volume: "10,000 EA" },
  { region: 2, volume: "15,000 EA" },
  { region: 3, volume: "20,000 EA" },
  { region: 4, volume: "25,000 EA" },
  { region: 5, volume: "30,000 EA" },
  { region: 6, volume: "40,000 EA" },
  { region: 7, volume: "45,000 EA" },
  { region: 8, volume: "50,000 EA" },
  { region: 9, volume: "60,000 EA" },
  { region: 10, volume: "65,000 EA" },
  { region: 11, volume: "70,000 EA" },
  { region: 12, volume: "80,000 EA" },
  { region: 13, volume: "85,000 EA" },
  { region: 14, volume: "90,000 EA" },
  { region: 15, volume: "100,000 EA" },
  { region: 16, volume: "105,000 EA" },
  { region: 17, volume: "110,000 EA" },
  { region: 18, volume: "120,000 EA" },
  { region: 19, volume: "123,000 EA" },
  { region: 20, volume: "123,000 EA" },
  { region: 21, volume: "123,000 EA" },
  { region: 22, volume: "125,000 EA" },
];


