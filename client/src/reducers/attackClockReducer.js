import {
  CLOCKS
} from '../constants';


const INTIAL_STATE = {
  attackClockValue: null,
  startTime: null,
  isAttackClockRunning: false,
  timeLeft: null,
  isReset: false
}

const clocksReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case CLOCKS.SET_ATTACK_CLOCK:
      return {
        ...state,
        attackClockValue: action.payload
      }
    case CLOCKS.SET_ATTACK_CLOCK_START:
      return {
        ...state,
        startTime: action.payload
      }
    case CLOCKS.START_ATTACK_CLOCK:
      return {
        ...state,
        isAttackClockRunning: true,
        isReset: false
      }
    case CLOCKS.STOP_ATTACK_CLOCK:
      return {
        ...state,
        isAttackClockRunning: false
      }
    case CLOCKS.RESET_ATTACK_CLOCK:
      return {
        ...state,
        attackClockValue: action.payload,
        isAttackClockRunning: false,
        isReset: true
      }
    case CLOCKS.SET_ATTACK_CLOCK_TIMELEFT:
      return {
        ...state,
        timeLeft: action.payload
      }
    default:
      return state;
  }
};

export default clocksReducer;
