/**
 * Sample datasets shared across the tablez playground examples.
 *
 * Kept small and readable on purpose — the point of each example is the
 * column/settings config, not the data.
 */

export interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  salary: number;
  active: boolean;
  startDate: string;
  rating: number;
}

export const employees: Employee[] = [
  { id: 1, name: 'Ada Lovelace', department: 'Engineering', role: 'Principal', salary: 210000, active: true, startDate: '2019-03-11', rating: 4.9 },
  { id: 2, name: 'Grace Hopper', department: 'Engineering', role: 'Staff', salary: 185000, active: true, startDate: '2020-07-01', rating: 4.8 },
  { id: 3, name: 'Alan Turing', department: 'Research', role: 'Principal', salary: 205000, active: false, startDate: '2018-01-22', rating: 4.7 },
  { id: 4, name: 'Katherine Johnson', department: 'Research', role: 'Senior', salary: 162000, active: true, startDate: '2021-05-17', rating: 4.9 },
  { id: 5, name: 'Margaret Hamilton', department: 'Engineering', role: 'Senior', salary: 171000, active: true, startDate: '2020-11-02', rating: 4.6 },
  { id: 6, name: 'Barbara Liskov', department: 'Design', role: 'Lead', salary: 158000, active: true, startDate: '2022-02-14', rating: 4.5 },
  { id: 7, name: 'Radia Perlman', department: 'Design', role: 'Senior', salary: 149000, active: false, startDate: '2021-09-30', rating: 4.4 },
  { id: 8, name: 'Frances Allen', department: 'Research', role: 'Staff', salary: 178000, active: true, startDate: '2019-08-19', rating: 4.8 },
];

export interface Product {
  id: number;
  sku: string;
  product: string;
  price: number;
  qty: number;
  active: boolean;
  history: number[];
}

export const products: Product[] = [
  { id: 1, sku: 'TZ-001', product: 'Standing desk', price: 480, qty: 12, active: true, history: [12, 19, 14, 27, 22, 31, 28] },
  { id: 2, sku: 'TZ-002', product: 'Ergonomic chair', price: 320, qty: 30, active: true, history: [30, 24, 28, 33, 39, 35, 44] },
  { id: 3, sku: 'TZ-003', product: 'Monitor arm', price: 95, qty: 64, active: false, history: [64, 58, 51, 44, 40, 36, 29] },
  { id: 4, sku: 'TZ-004', product: 'Mechanical keyboard', price: 145, qty: 41, active: true, history: [41, 45, 39, 47, 52, 49, 58] },
  { id: 5, sku: 'TZ-005', product: 'Desk lamp', price: 60, qty: 88, active: true, history: [88, 81, 76, 82, 79, 71, 68] },
];

export interface OrgNode {
  id: number;
  name: string;
  headcount: number;
  budget: number;
  children?: OrgNode[];
}

export const orgTree: OrgNode[] = [
  {
    id: 1,
    name: 'Engineering',
    headcount: 48,
    budget: 7200000,
    children: [
      {
        id: 2,
        name: 'Front-end',
        headcount: 18,
        budget: 2700000,
        children: [
          { id: 3, name: 'Web platform', headcount: 10, budget: 1500000 },
          { id: 4, name: 'Mobile', headcount: 8, budget: 1200000 },
        ],
      },
      {
        id: 5,
        name: 'Back-end',
        headcount: 22,
        budget: 3300000,
        children: [
          { id: 6, name: 'Services', headcount: 14, budget: 2100000 },
          { id: 7, name: 'Data', headcount: 8, budget: 1200000 },
        ],
      },
      { id: 8, name: 'Platform', headcount: 8, budget: 1200000 },
    ],
  },
  {
    id: 9,
    name: 'Design',
    headcount: 12,
    budget: 1600000,
    children: [
      { id: 10, name: 'Product design', headcount: 8, budget: 1050000 },
      { id: 11, name: 'Research', headcount: 4, budget: 550000 },
    ],
  },
];

/** Generated on demand so the 10k-row virtualization example stays cheap to ship. */
export interface LargeRow {
  id: number;
  name: string;
  department: string;
  salary: number;
  rating: number;
}

export const makeLargeDataset = (rows: number): LargeRow[] => {
  const departments = ['Engineering', 'Research', 'Design', 'Sales', 'Support'];
  const out: LargeRow[] = [];

  for (let i = 1; i <= rows; i += 1) {
    out.push({
      id: i,
      name: `Employee ${i}`,
      department: departments[i % departments.length],
      salary: 60000 + ((i * 137) % 90000),
      rating: Number((3 + ((i * 7) % 20) / 10).toFixed(1)),
    });
  }

  return out;
};
