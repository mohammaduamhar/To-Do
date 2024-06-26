import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  
  BsTwitter,
  BsGithub,
  BsWhatsapp,
  BsLinkedin,
  BsFacebook,
} from "react-icons/bs";
export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
          <Link to="/" className="self-center whitespace-nowrap text-sm  sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-600 rounded-lg text-white ">To-Do</span>
        List
      </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                   To-Do List
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/mohammaduamhar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="https://www.linkedin.com/in/mohammadu-amhar-4016a0243/">Linkedin</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="To-Do List"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="https://api.whatsapp.com/qr/JNJZZ4HXTSADL1?autoload=1&app_absent=0" icon={BsWhatsapp} />
            <Footer.Icon href="https://www.linkedin.com/in/mohammadu-amhar-4016a0243/" icon={BsLinkedin} />
            <Footer.Icon href="https://www.facebook.com/mhd.amhar.75" icon={BsFacebook} />
            <Footer.Icon
              href="https://github.com/mohammaduamhar"
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
