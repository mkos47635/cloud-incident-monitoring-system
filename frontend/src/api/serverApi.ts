import api from "./axios";

export const getServers = async () => {
  const response = await api.get("/servers");
  return response.data;
};

export const getServer = async (id: number) => {
  const response = await api.get(`/servers/${id}`);
  return response.data;
};

export const createServer = async (data: {
  name: string;
  ipAddress: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}) => {
  const response = await api.post("/servers", data);
  return response.data;
};

export const updateServerMetrics = async (
  id: number,
  data: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
  }
) => {
  const response = await api.patch(`/servers/${id}/metrics`, data);
  return response.data;
};