import api, { endpoints } from "@/utils/api";

interface QRCode {
  id: string;
  token: string;
  generatedAt: string;
  expiresAt: string;
}

export const qrService = {
  getCurrentQR: async () => {
    const { data } = await api.get<QRCode>(endpoints.qrCode.current);
    return data;
  },

  generateNewQR: async () => {
    const { data } = await api.post<QRCode>(endpoints.qrCode.create);
    return data;
  },
};
