export const getCookie = (name: string): string | null => {
  try {
    const cookies = document.cookie.split("; ")
    for (const cookie of cookies) {
      const [key, value] = cookie.split("=")
      if (key == name) {
        return decodeURIComponent(value)
      }
    }
  } catch {
    return null
  }

  return null
}

