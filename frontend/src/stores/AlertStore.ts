import { makeAutoObservable } from "mobx";
import { AlertMessage } from "~/types/messageTypes";
import { AlertStatus } from "~/utils/enums";

const initialState: AlertMessage = {
  status: AlertStatus.INFO,
  title: null,
  message: null,
};

class AlertStore {
  alertMessage: AlertMessage = initialState;

  constructor() {
    makeAutoObservable(this);
  }

  showAlert = (alertMessage: AlertMessage, message?: string) => {
    this.alertMessage = {
      ...alertMessage,
      message: `${alertMessage.message} ${message ? `\n${message}` : ""}`
    };
  };

  reset = () => {
    this.alertMessage = initialState;
  };
}

export const alertStore = new AlertStore();