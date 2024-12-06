import { IUser } from "@/types/user";
import api, { endpoints } from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface IChangeUserStatusPayload {
  userId: string;
  status: "approved" | "rejected";
  rejectionReason?: string;
}

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: string;
  centerId: string
}

export const userService = {
  getAllUsers: () =>
    api.get<IUser[]>(endpoints.user.root).then((res) => res.data),

  changeUserStatus: ({
    userId,
    status,
    rejectionReason,
  }: IChangeUserStatusPayload) =>
    api.post(endpoints.user.updateStatus(userId), { status, rejectionReason }),
};

export function useUpdateUserStatus() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["updateStatus"],
    mutationFn: (payload: IChangeUserStatusPayload) =>
      userService.changeUserStatus(payload),
  });

  return {
    updateStatus: mutate,
    isUpdating: isPending,
  };
}

export function useCreateUser() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["Create User"],
    mutationFn: (user: CreateUserPayload) =>
      api.post(endpoints.user.root, user).then((res) => res.data),
  });

  return {
    createUser: mutate,
    isCreating: isPending,
  };
}

export function useGetActiveUsers() {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["activeUsers"],
    queryFn: () =>
      api.get<IUser[]>(endpoints.user.active).then((res) => res.data),
  });

  return {
    activeUsers: data || [],
    usersLoading: isLoading || isFetching,
    refetchUsers: refetch,
  };
}
