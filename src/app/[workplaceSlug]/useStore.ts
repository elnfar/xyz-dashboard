import { makeAutoObservable } from "mobx";

class UserStore {
  currentUser = null;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }
}

const userStore = new UserStore();
export default userStore;
