import { Navbar, TextInput,Button } from "flowbite-react"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"

function Header() {
  const location = useLocation();
  return (
    <Navbar className="border-b-2 ">
        <Link to={"/"} className="whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"> 
            <span className="text-white px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">MERNs</span>
            Blog
        </Link>

        <form>
            <TextInput 
              placeholder="Search..."
              type="text"
              rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
             />
        </form>

             <Button className="w-12 h-10 lg:hidden" pill color='gray'>
                <AiOutlineSearch />
             </Button>

             <div className="flex gap-2 md:order-2">
              <Button color="gray" className="w-12 h-10 hidden sm:inline" pill>
                <FaMoon/>
              </Button>

              <Link to='/signin'>
              <Button gradientDuoTone='purpleToBlue'>
                Sign In
              </Button>
                
              </Link>
              <Navbar.Toggle>

              </Navbar.Toggle>
             </div>
              <Navbar.Collapse>
                <Navbar.Link active={location === '/'} as="div">
                  <Link to='/'>
                    Home
                  </Link>
                </Navbar.Link>
                <Navbar.Link active={location === '/about'} as="div">
                  <Link to='/about'>
                    About
                  </Link>
                </Navbar.Link>
                <Navbar.Link active={location === '/projects'} as="div" >
                  <Link to='/projects' >
                    Projects
                  </Link>
                </Navbar.Link>

              </Navbar.Collapse>
    </Navbar>
  )
}

export default Header