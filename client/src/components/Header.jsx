import { Navbar, Dropdown, TextInput, Button, Avatar } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon,FaSun } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeFeatures/themeSlice";
import { useEffect, useState } from "react";

function Header() {
  const location = useLocation();
  const [searchTerm,setSearchTerm] = useState('')
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.theme);
  const { currentUser } = useSelector((state) => state.user);
  const navigateTo = useNavigate()
  
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])

  const HandleSearch = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('searchTerm',searchTerm)
    const searchQuery = urlParams.toString()
    navigateTo(`/search?${searchQuery}`)
  }
  return (
    <Navbar className="border-b-2 ">
      <Link
        to={"/"}
        className="whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="text-white px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
          MERNs
        </span>
        Blog
      </Link>

      <form onSubmit={HandleSearch}>
        <TextInput
          placeholder="Search..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      <Button className="w-12 h-10 lg:hidden" pill color="gray">
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button color="gray" className="w-12 h-10 hidden sm:inline" pill>
          {currentTheme === 'dark' ? <FaSun onClick={() => dispatch(toggleTheme())}/> : <FaMoon onClick={() => dispatch(toggleTheme())}/>}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User Image"
                img={currentUser.profilePicture}
                rounded   
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>

            <Dropdown.Divider />
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Link>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button outline gradientDuoTone="purpleToBlue">
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle></Navbar.Toggle>
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={location === "/"} as="div">
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={location === "/about"} as="div">
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={location === "/projects"} as="div">
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
