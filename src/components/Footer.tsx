import AboutMe from "./AboutMe";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 justify-between items-center p-2">
      <AboutMe />
      <div>
        <p>© 2025 Matrix Eisenhower. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
