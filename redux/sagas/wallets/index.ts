import { call, put, takeLatest } from 'redux-saga/effects';

function* addTodoSaga(action: any) {
  const data = yield call(addTodoAPI, action.payload);
  yield put(addTodo(data));
}

export function* walletSaga() {
  // yield takeLatest(addTodoAsync, addTodoSaga);
}