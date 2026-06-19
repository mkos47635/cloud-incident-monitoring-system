import type { Incident } from "../types/incident";

export const incidents: Incident[] = [
  {
    id: 1,
    title: "CPU 사용률 임계치 초과",
    content: "CPU 사용률이 90%를 초과하여 자동 장애가 등록되었습니다.",
    type: "SERVER",
    severity: "HIGH",
    status: "OPEN",
    location: "EC2-WEB-01",
    assignee: "미지정",
    createdAt: "2026-06-19 15:20",
    updatedAt: "2026-06-19 15:20",
  },
  {
    id: 2,
    title: "배포 실패 발생",
    content: "Backend 서버 배포 중 오류가 발생했습니다.",
    type: "DEPLOYMENT",
    severity: "MEDIUM",
    status: "IN_PROGRESS",
    location: "Backend Server",
    assignee: "박성원",
    createdAt: "2026-06-19 14:10",
    updatedAt: "2026-06-19 14:30",
  },
];