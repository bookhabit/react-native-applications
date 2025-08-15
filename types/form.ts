export interface FormData {
  name: string;
  email: string;
  message: string;
  gender: "male" | "female" | "other";
  interests: string[];
  notifications: boolean;
  terms: boolean;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  gender?: string;
  interests?: string;
  terms?: string;
}
