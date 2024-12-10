import api, { endpoints } from "@/utils/api";

interface QRCode {
  id: string;
  token: string;
  generatedAt: string;
  expiresAt: string;
}

export const qrService = {
  getCurrentQR: async (centerId: string) => {
    const { data } = await api.get<QRCode>(`${endpoints.qrCode.current}/${centerId}`); // Include centerId in the URL
    return data;
  },

  generateNewQR: async (centerId: string) => {
    const { data } = await api.post<QRCode>(endpoints.qrCode.create, { centerId }); // Send centerId in the body
    return data;
  },
  GetAllCenters: async () => {
    const { data } = await api.get<QRCode>(endpoints.qrCode.allCenters);
    return data;
  },
};
