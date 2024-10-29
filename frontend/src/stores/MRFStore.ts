import { makeAutoObservable } from "mobx";
import type { MRFEntity } from "shared/src/types/mrfTypes";

const initialState: MRFEntity[] = [];

class MRFStore {
  mrfData: MRFEntity[] = initialState;

  constructor() {
    makeAutoObservable(this);
  }

  updateList = async (newData: MRFEntity[]) => {
    this.mrfData = newData;
  };
}

export const mrfStore = new MRFStore();