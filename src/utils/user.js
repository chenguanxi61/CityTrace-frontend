export function getCurrentUser() {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return user && user.id ? user : null
  } catch {
    return null
  }
} 