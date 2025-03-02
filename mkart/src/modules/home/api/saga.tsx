import { call,put, takeEvery } from 'redux-saga/effects';
import { fetchApiData } from './api';
import { setData, setError, setLoading } from './slice';
import { GET_HOME_CONTENT } from './constants';
function* fetchApiDataSaga():any{
    try {
        yield put(setLoading());
        const data = yield call(fetchApiData, 'https://jsonplaceholder.typicode.com/posts');
        yield put(setData(data));
    } catch (error:any) {
        yield put(setError(error.message));
    }
}


function* homeSaga() {
    yield takeEvery(GET_HOME_CONTENT, fetchApiDataSaga);
}

export default homeSaga;