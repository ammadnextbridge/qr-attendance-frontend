import { CircleDashed, UserCheck, UserX } from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

type Status = {
  value: string;
  label: string;
  icon?: React.ComponentType<any>;
  variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning";
};

export const statuses: Status[] = [
  {
    value: "pending",
    label: "Pending",
    icon: CircleDashed,
    variant: "warning",
  },
  {
    value: "approved",
    label: "Approved",
    icon: UserCheck,
    variant: "success",
  },
  {
    value: "rejected",
    label: "Rejected",
    icon: UserX,
    variant: "destructive",
  },
];
