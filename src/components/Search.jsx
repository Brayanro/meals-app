import { Button, Navbar, TextInput } from "flowbite-react"
import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import { useGlobalContext } from "../context"

const Search = () => {
  const [text, setText] = useState('')
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext()

  const handleChange = e => {
    setText(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (text) {
      setSearchTerm(text)
      setText('')
    }
  }

  const handleRandomMeal = () => {
    setSearchTerm(text)
    setText('')
    fetchRandomMeal()
  }

  return (
    <Navbar fluid={true}>
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-bold text-purple-900">
          Meal App
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <form onSubmit={handleSubmit} className="flex justify-center space-x-4">
          <TextInput
            type="text"
            onChange={handleChange}
            value={text}
            placeholder="Search meal"
            icon={BsSearch}
          />
          <Button pill={true} onClick={handleRandomMeal} type="button" color="purple">Surprise me!</Button>
        </form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Search