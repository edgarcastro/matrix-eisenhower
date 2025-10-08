export type ListItem = {
  id: string;
  text: string;
  completed: boolean;
};

export type List = {
  id: string;
  title: string;
  urgent: boolean;
  important: boolean;
  color: string;
  items?: ListItem[];
};

export type EisenhowerList = List[];
