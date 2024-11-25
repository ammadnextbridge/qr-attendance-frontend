import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

interface AttendanceRecord {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  markedAt: string;
  qrToken: string;
}

export const attendanceService = {
  getRecords: api
    .get<GetAttendenceRecordsResponse>("/attendance")
    .then((res) => res.data),

  markAttendance: async (qrToken: string) => {
    const { data } = await api.post("/attendance/mark", { qrToken });
    return data;
  },
};

//-------------------------------------------------------------------

interface GetAttendenceRecordsResponse {
  data: AttendanceRecord[];
  meta: {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}
export function useGetAttendance() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["attendanceRecords"],
    queryFn: () => attendanceService.getRecords,
  });

  return {
    records: data?.data || [],
    meta: data?.meta,
    isLoading: isLoading || isFetching,
  };
}
