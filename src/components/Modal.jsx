import { Modal } from "flowbite-react"
import { BsBoxArrowUpRight } from "react-icons/bs"
import { useGlobalContext } from "../context"

const ModalComponent = () => {
  const { selectedMeal, closeModal } = useGlobalContext()
  const { strMealThumb: image, strMeal: title, strInstructions: text, strSource: source } = selectedMeal

  return (
    <Modal
      show={selectedMeal}
      onClose={closeModal}
      size="7xl"
      className="max-w-full"
    >
      <Modal.Header>
        <span className="text-2xl font-bold">{title}</span>
      </Modal.Header>
      <Modal.Body>
        <div className="flex items-center justify-center">
          <img src={image} alt={title} className="w-60 h-60 object-cover" />
        </div>
        <p className="leading-relaxed font-bold">Cooking Instructions</p>
        <p className="text-sm">{text}</p>
        <a href={source} target="_blank" className="flex items-center mt-2">
          Original source  <BsBoxArrowUpRight className="ml-2" />
        </a>
      </Modal.Body>
    </Modal >
  )
}

export default ModalComponent