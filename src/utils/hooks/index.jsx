// nouveau hook pour gérer nos calls API

import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context'

export function useFetch(url) {
  // je passe en paramètre du hook l'URL de l'API

  var [data, setData] = useState({})
  var [isLoading, setLoading] = useState(true)
  var [error, setError] = useState(false)
  // state interne pour stocker la data, savoir si elle charge avec isLoading et s'il y a une erreur

  useEffect(() => {
    if (!url) return
    // si le paramètre de l'url est vide, alors le hook fait un return vide
    async function fetchData() {
      // fonction qui appelle fetch, parse ce qui est retourné avec data.json et change l'état de isLoading
      try {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
      } catch (err) {
        setError(true)
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    setLoading(true)
    // on commence avec isLoading à true
    fetchData()
    // on appel la fonction fetchData
  }, [url])

  return { data, isLoading, error }
}

export function useTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return { theme, toggleTheme }
}
