import { Portfolio } from "@/interfaces/Portfolio";
import { receivedProject } from "./Project";

export interface ProjectPageProps {
  portfolio: Portfolio;
  project: receivedProject
}