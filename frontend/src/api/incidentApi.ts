import api from "./axios";

export const getIncidents = async () => {
  const response = await api.get("/incidents");
  return response.data;
};

export const getIncident = async (id: number) => {
  const response = await api.get(`/incidents/${id}`);
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
  const response = await api.post("/incidents", data);
  return response.data;
};

export const updateIncidentStatus = async (
  id: number,
  status: string
) => {
  const response = await api.patch(
    `/incidents/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};

export const deleteIncident = async (id: number) => {
  const response = await api.delete(`/incidents/${id}`);
  return response.data;
};