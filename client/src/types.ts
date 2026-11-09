export type Meal = {
  id: string;
  name: string;
  description: string;
  menuDate: string;
  availablePortions: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MenuResponse = {
  date: string;
  items: Meal[];
};
