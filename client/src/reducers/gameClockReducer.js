import {
  CLOCKS
} from '../constants';


const INTIAL_STATE = {
  gameClockValue: null,
  isGameClockRunning: false
}

const clocksReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case CLOCKS.SET_GAME_CLOCK:
      return {
        ...state,
        gameClockValue: action.payload
      }
    case CLOCKS.START_GAME_CLOCK:
      return {
        ...state,
        isGameClockRunning: true
      }
    case CLOCKS.STOP_GAME_CLOCK:
      return {
        ...state,
        isGameClockRunning: false
      }
    case CLOCKS.RESET_GAME_CLOCK:
      return {
        ...state,
        gameClockValue: action.payload,
        isGameClockRunning: false
      }
    default:
      return state;
  }
};

export default clocksReducer;
