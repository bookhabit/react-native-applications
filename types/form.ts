export interface FormData {
  name: string;
  email: string;
  message: string;
  gender: "male" | "female" | "other";
  interests: string[];
  notifications: boolean;
  terms: boolean;
  category: string;
  priority: string;
  birthDate: Date;
  birthTime: Date;
  age: number;
  rating: number;
  quantity: number;
  profileImage: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  gender?: string;
  interests?: string;
  terms?: string;
}
