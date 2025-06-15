import Link from 'next/link';

const Footer = () => (
  <footer className="footer">
    <div>Contact Us</div>
    <div>Email: support@cctv.com</div>
    <div>Phone: +123 456 7890</div>
    <div>
      <Link href="/about_us" className="about-us-button">
        About Us
      </Link>
    </div>
  </footer>
);

export default Footer;
