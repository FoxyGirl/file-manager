const state = {
  userName: "Anonymous",
  getName: () => this.name,
};

class MainState {
  #userName;

  constructor() {
    this.userName = "Anonymous";
    this.dirName = "";
  }

  setUserName(userName) {
    if (!!userName) {
      this.userName = userName;
    }
  }

  setDirName(dirName) {
    if (!!dirName) {
      this.dirName = dirName;
    }
  }

  getGreeting() {
    return `Welcome to the File Manager, ${this.userName}!`;
  }

  sayGoodBye() {
    return `Thank you for using File Manager, ${this.userName}, goodbye!`;
  }

  getDirNameInfo() {
    return `You are currently in ${this.dirName}\n`;
  }
}

export const mainState = new MainState();
