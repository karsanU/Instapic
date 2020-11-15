import server from './../api/server'

export default function attemptSignup(credentials) {
  return async function (dispatch, getState) {
    const credentials = { credentials };
    const reponse = await server.post()
  };
}
