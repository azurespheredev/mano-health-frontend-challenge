import { AlertStatus } from "~/utils/enums";

export interface AlertMessage {
  status: AlertStatus;
  title: string | null;
  message: string | null;
}
