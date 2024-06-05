const Footer = () => {
  return (
    <footer className="footer">
      <div id="footer-top" className="footer-top">
        <div id="footer-quick-links" className="footer-content">
          <h2>Shipping</h2>
          <p>Available within USA only</p>
          <p> It takes 2-7 business days for delivery</p>
        </div>
        <div id="footer-contact" className="footer-content" aria-label="contact">
          <h2>Contact</h2>
          <div>
            <p title="email" className="contact-txt">
              Email: contactus@pinkrose.com
            </p>
            <p title="phone" className="contact-txt">
              Phone: 026987452
            </p>
          </div>
        </div>
        <div id="footer-social-media" className="footer-content">
          <h2>Follow Us</h2>
          <div aria-label="social-media">
            <a href="#" className="icons">
              <i className="fa-brands fa-instagram icon-style"></i>
            </a>
            <a href="#" className="icons">
              <i className="fa-brands fa-x-twitter icon-style"></i>
            </a>
          </div>
        </div>
      </div>

      <hr />
      <p id="copyright">&copy; 2024 | Designed & developed by Suzan Arrubaee</p>
    </footer>
  )
}

export default Footer
