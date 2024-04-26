export const PATH = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  NEW_USER: 'new',
  EDIT_USER: '/edit/:username',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  ERROR_403: '/forbidden',
  ANY: '*'
}

export const PAGE_DOCUMENT_TITLE: Record<string, string> = {
  [PATH.LOGIN]: 'Login'
}
