import { Link } from "react-router-dom";
import { serverStatus } from "../mock/serverStatus";
import { incidents } from "../mock/incidents";

function DashboardPage() {
  const unresolvedCount = incidents.filter(
    (incident) => incident.status !== "CLOSED" && incident.status !== "RESOLVED"
  ).length;

  const highCount = incidents.filter(
    (incident) => incident.severity === "HIGH" || incident.severity === "CRITICAL"
  ).length;

  return (
    <div>
      <h1>Cloud Incident Monitoring System</h1>

      <h2>서버 상태</h2>
      <p>서버명: {serverStatus.serverName}</p>
      <p>CPU: {serverStatus.cpuUsage}%</p>
      <p>Memory: {serverStatus.memoryUsage}%</p>
      <p>Disk: {serverStatus.diskUsage}%</p>
      <p>상태: {serverStatus.status}</p>

      <h2>장애 현황</h2>
      <p>미해결 장애: {unresolvedCount}건</p>
      <p>HIGH 이상 장애: {highCount}건</p>

      <h2>최근 장애</h2>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <Link to={`/incidents/${incident.id}`}>
              {incident.title} - {incident.status} - {incident.severity}
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/incidents">장애 관리 페이지로 이동</Link>
    </div>
  );
}

export default DashboardPage;