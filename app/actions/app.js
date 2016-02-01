export const SET_APP_BOOL = 'SET_APP_BOOL'
export function setAppBool(key, bool) {
  return {
    type: SET_APP_BOOL, 
    payload: {
      bool,
      key
    }
  }
}