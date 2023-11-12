import logo from "../../src/assets/images/logo.png";
const Footer = () => {
    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content py-10 mt-28 mb-0">
            <img className=" flex mx-auto justify-center w-24" src={logo} alt="" />
        <aside>
          <p>Copyright © 2023 - All right reserved by Md Jahid Hasan Riyaz</p>
        </aside>
      </footer>
    );
};

export default Footer;