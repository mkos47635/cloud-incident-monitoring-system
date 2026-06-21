import api from "./axios";

export const getIncidents = async () => {
  const response = await api.get("/api/incidents");
  return response.data;
};

export const getIncident = async (id: number) => {
  const response = await api.get(`/api/incidents/${id}`);
  return response.data;
};

export const createIncident = async (data: {
  title: string;
  content: string;
  type: string;
  severity: string;
  location: string;
  assignee: string;
}) => {
  const response = await api.post("/api/incidents", data);
  return response.data;
};

export const updateIncidentStatus = async (
  id: number,
  status: string
) => {
  const response = await api.patch(
    `/api/incidents/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};

export const deleteIncident = async (id: number) => {
  const response = await api.delete(`/api/incidents/${id}`);
  return response.data;
};