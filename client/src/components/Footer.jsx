import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook,BsInstagram,BsTwitter,BsGithub} from "react-icons/bs"

function FooterCom() {
  return (
    <Footer container className="border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="borderLogo mt-5">
            <Link
              to={"/"}
              className="whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="text-white px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
                MERNs
              </span>
              Blog
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-4  sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About"></Footer.Title>
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank">
                  About Us
                </Footer.Link>
                <Footer.Link href="#" target="_blank">
                  Careers
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Follow Us"></Footer.Title>
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank">
                  Github
                </Footer.Link>
                <Footer.Link href="#" target="_blank">
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="LEGAL"></Footer.Title>
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" target="_blank">
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="lowerFooter">
          <Footer.Copyright
            href="#"
            by="MERN blog"
            year={new Date().getFullYear()}
          />
          <div className="socialIcons flex flex-col sm:flex-row gap-4 mt-4 sm:justify-center">
          <Footer.Icon href="#" icon={BsFacebook} />
          <Footer.Icon href="#" icon={BsInstagram} />
          <Footer.Icon href="#" icon={BsTwitter} />
          <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterCom;
