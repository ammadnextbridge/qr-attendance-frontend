import { Center } from "@/types/center"; // Assuming you have a Center type defined
import api, { endpoints } from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";

// Define the payload for creating and updating centers
interface CreateCenterPayload {
  name: string;
}

interface UpdateCenterPayload {
  centerId: string;
  name: string;
}

export const centerService = {
  // Get all centers
  getAllCenters: () =>
    api.get<Center[]>(endpoints.center.root).then((res) => res.data),

  // Create a new center
  createCenter: (center: CreateCenterPayload) =>
    api.post(endpoints.center.root, center).then((res) => res.data),

  // Update an existing center's information
  updateCenter: ({ centerId, name }: UpdateCenterPayload) =>
    api.put(endpoints.center.update(centerId), { name }).then((res) => res.data),
};


export function useCreateCenter() {
    const { mutate, isPending } = useMutation({
      mutationKey: ["createCenter"],
      mutationFn: (center: CreateCenterPayload) =>
        centerService.createCenter(center),
    });
  
    return {
      createCenter: mutate,
      isCreating: isPending,
    };
  }
  
  // Hook for updating an existing center
  export function useUpdateCenter() {
    const { mutate, isPending } = useMutation({
      mutationKey: ["updateCenter"],
      mutationFn: (payload: UpdateCenterPayload) =>
        centerService.updateCenter(payload),
    });
  
    return {
      updateCenter: mutate,
      isUpdating: isPending,
    };
  }
  
  // Hook for getting all centers
  export function useGetAllCenters() {
    const { data, isLoading, isFetching, refetch } = useQuery({
      queryKey: ["allCenters"],
      queryFn: () => centerService.getAllCenters(),
    });
  
    return {
      centers: data || [],
      isLoadingCenters: isLoading || isFetching,
      refetchCenters: refetch,
    };
  }