import { Alert, Card, Spinner } from "flowbite-react"
import { BsExclamationCircle, BsHeart } from "react-icons/bs"
import { useGlobalContext } from "../context"

const Meals = () => {
  const { meals, loading, selectMeal, addToFavorites } = useGlobalContext()

  if (loading) {
    return <section className="text-center">
      <Spinner size="xl" />
      <span>Loading...</span>
    </section>
  }

  if (meals.length < 1) {
    return <section>
      <Alert
        color="failure"
        icon={BsExclamationCircle}
      >
        <span>No meals matched your search term. Please try again</span>
      </Alert>
    </section>
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center m-4">
      {meals.map(singleMeal => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
        return (
          <div className="max-w-sm mb-4" key={idMeal}>
            <Card>
              <img src={image} alt={title} onClick={() => selectMeal(idMeal)} />
              <div className="flex justify-between">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                  {title}
                </h5>
                <div
                  onClick={() => addToFavorites(idMeal)}
                  className="flex items-center cursor-pointer text-red-700 text-3xl"
                >
                  <BsHeart className="hover:animate-pulse" />
                </div>
              </div>
            </Card>
          </div>
        )
      })}
    </section>
  )
}

export default Meals