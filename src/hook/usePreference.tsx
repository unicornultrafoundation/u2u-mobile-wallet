import { useMemo } from "react"
import { usePreferenceStore } from "../state/preferences"
import { darkTheme, lightTheme } from "../theme/color"

export const usePreference = () => {
  const {darkMode} = usePreferenceStore()

  const preferenceTheme = useMemo(() => {
    return darkMode ? darkTheme : lightTheme
  }, [darkMode])

  return {
    darkMode,
    preferenceTheme
  }
}