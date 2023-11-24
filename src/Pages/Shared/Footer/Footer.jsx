import logo from "/faviconwhite.png"
const Footer = () => {
    return (
        <footer className='mt-20 bg-[#0077b6] text-white'>
            <footer data-aos="fade-down" className="footer p-10 md:p-20 lg:p-28">


                <aside>
                    <img src={logo} alt="" />
                    <p className="text-xl">ForumFiesta</p>
                </aside>

                <nav className="lg:ml-28 text-lg">
                    <header className="footer-title">Links</header>
                    <a className="link link-hover hover:text[#caf0f8]">About</a>
                    <a className="link link-hover hover:text[#caf0f8]">Terms and Condition</a>
                    <a className="link link-hover hover:text[#caf0f8]">FAQ</a>
                    <a className="link link-hover hover:text[#caf0f8]">Category</a>
                </nav>

                <nav className="lg:ml-28 text-lg">
                    <header className="footer-title">Forum</header>
                    <a className="link link-hover hover:text-[#caf0f8]">Forum</a>
                    <a className="link link-hover hover:text-[#caf0f8]">Topics</a>
                    <a className="link link-hover hover:text-[#caf0f8]">Blog Grid</a>
                    <a className="link link-hover hover:text-[#caf0f8]">Single Forum</a>
                </nav>

                <nav className="lg:ml-28 text-lg">
                    <header className="footer-title">Support</header>
                    <a className="link link-hover hover:text-[#caf0f8]">Get Involved</a>
                    <a className="link link-hover hover:text-[#caf0f8]">Help Topics</a>
                    <a className="link link-hover hover:text-[#caf0f8]">Contact Us</a>
                </nav>

            </footer>
            <aside className="text-center p-5">
                <hr className="p-2" />
                <p>Copyright © 2023 - All right reserved by ForumFiesta Ltd</p>
            </aside>
        </footer>
    );
};

export default Footer;