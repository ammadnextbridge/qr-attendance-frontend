
export interface IUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: "string";
  updatedAt: "string";
  status: "approved" | "rejected" | "pending";
  center: Center[];
}


export interface Center{
  id: string;
  name:string;
}