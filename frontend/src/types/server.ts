export interface Server {
  id: number;
  name: string;
  ipAddress: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  status: "NORMAL" | "WARNING" | "CRITICAL" | "DOWN";
  createdAt: string;
  updatedAt: string;
}