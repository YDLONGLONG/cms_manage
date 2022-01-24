// interface IState {
//     username: string;
//     player: string;
//     avatar: string;
//   }
  
  // 定义默认数据
  const defaultState = {
    // username: "",
    // player: "",
    // avatar: "",
    key:1
  };
  
  interface IAction {
    type: string;
    value?: any;
  }
  
export default (state = defaultState, action: IAction) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // case "ChangeUsername":	// 修改名称
    //   newState.username = action.value;
    //   break;
    // case "ChangePlayer":	// 修改角色
    //   newState.player = action.value;
    //   break;
    // case "ChangeAvatar": 	// 修改头像
    //   newState.avatar = action.value;
    //   break;
    case "changeKey":
      newState.key++;
      break;
    default:
      break;
  }
  return newState;
};
  