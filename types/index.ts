export interface Exercise {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  duration: string;
}

export interface AdminStat {
  id: string;
  title: string;
  value: number;
  color: string;
  icon: string;
}
