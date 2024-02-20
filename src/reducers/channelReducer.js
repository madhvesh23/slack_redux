const initialState = {
  channel: [],
  selectedChannel: null,
};

const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CHANNEL_NAME":
      return { ...state, channel: action.payload };

    case "SET_SELECTED_CHANNEL":
      return { ...state, selectedChannel: action.payload };

    default:
      return state;
  }
};

export default channelReducer;
