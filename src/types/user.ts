export interface IUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: "string";
  updatedAt: "string";
  status: "approved" | "rejected" | "pending";
}
