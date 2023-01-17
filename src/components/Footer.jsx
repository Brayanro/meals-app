import { Footer } from "flowbite-react"

const date = new Date()

const FooterApp = () => {
  return (
    <Footer container={true}>
      <div className="w-full text-center">
        <Footer.Copyright
          year={date.getFullYear()}
          by="Meals App"
          className="text-purple-600 font-bold"
        />
      </div>
    </Footer>
  )
}

export default FooterApp