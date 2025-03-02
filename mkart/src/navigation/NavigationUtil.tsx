import { createNavigationContainerRef, CommonActions, StackActions } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export async function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(name, params))
  }
}

export async function replace(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params))
  }
}

export async function resetAndNavigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name, params }]
    }))
  }
}

export async function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack())
  }
}