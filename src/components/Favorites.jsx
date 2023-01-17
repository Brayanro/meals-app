import { Button } from "flowbite-react"
import { useGlobalContext } from "../context"

const Favorites = () => {
  const { favorites, selectMeal, removeFromFavorites } = useGlobalContext()

  return (
    <section className="bg-zinc-200 p-4">
      <h1 className="text-3xl font-bold text-center mb-2 text-purple-600">Favorites</h1>
      <div className="flex gap-2 flex-wrap justify-center">
        {favorites.map(item => {
          const { idMeal, strMeal: title, strMealThumb: image } = item
          return <div key={idMeal}>
            <span className="font-bold flex justify-center">{title}</span>
            <img src={image} alt={title} className="w-32 h-32 object-cover rounded-full cursor-pointer" onClick={() => selectMeal(idMeal, true)} />
            <div className="flex justify-center my-3">
              <Button color="failure"  pill={true} onClick={() => removeFromFavorites(idMeal)}>Remove</Button>
            </div>
          </div>
        })}
      </div>
    </section>
  )
}

export default Favorites