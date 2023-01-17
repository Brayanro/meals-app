import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

export const AppContext = createContext()

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites')

  if (favorites) {
    favorites = JSON.parse(localStorage.getItem('favorites'))
  } else {
    favorites = []
  }
  return favorites
}

export const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage())

  // Fetching data from the API
  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios(url)
      if (data.meals) {
        setMeals(data.meals)
      } else {
        setMeals([])
      }
    } catch (error) {
      console.log(error.response)
    }
    setLoading(false)
  }

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl)
  }

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal
    if (favoriteMeal) {
      meal = favorites.find(meal => meal.idMeal === idMeal)
    } else {
      meal = meals.find(meal => meal.idMeal === idMeal)
    }
    setSelectedMeal(meal)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const addToFavorites = idMeal => {
    const alreadyFavorite = favorites.find(meal => meal.idMeal === idMeal)
    if (alreadyFavorite) return
    const meal = meals.find(meal => meal.idMeal === idMeal)
    const updatedFavorites = [...favorites, meal]
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const removeFromFavorites = idMeal => {
    const updatedFavorites = favorites.filter(meal => meal.idMeal !== idMeal)
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])

  useEffect(() => {
    if (!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])

  return (
    <AppContext.Provider value={{
      meals,
      loading,
      setSearchTerm,
      fetchRandomMeal,
      showModal,
      selectedMeal,
      selectMeal,
      closeModal,
      addToFavorites,
      removeFromFavorites,
      favorites
    }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}