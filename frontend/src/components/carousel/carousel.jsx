import "./carouselStyle.css";

export default function Carousel() {
  return (
    <div id="carouselExample" className="carousel carousel-dark slide">
      <div className="carousel-inner">
        <div className="carousel-item position-relative active">
          <img src="../../../public/carousel-1.jpg" className="d-block w-100" alt="..." />
          <div className="carousel-caption bg-light d-none d-md-block p-5">
            <h5 className="display-5 fw-bold">Benefit big-time</h5>
            <p>Join our email list for special offers, personalized course recommendations, and more.</p>
          </div>
        </div>
        <div className="carousel-item position-relative">
          <img src="../../../public/carousel-2.png" className="d-block w-100" alt="..." />
          <div className="carousel-caption bg-light d-none d-md-block p-5">
            <h5 className="display-5 fw-bold">Skills for everyone & everything</h5>
            <p>Our big sale is on. Get courses from $249.99 for your career & your life. Sale ends August 29.</p>
          </div>
        </div>
        <div className="carousel-item position-relative">
          <img src="../../../public/carousel-3.jpg" className="d-block w-100" alt="..." />
          <div className="carousel-caption bg-light d-none d-md-block p-5">
            <h5 className="display-5 fw-bold">Ready for an upgrade?
            </h5>
            <p>Explore our top-rated development courses. Skill up fast with features like coding exercises and practice tests.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}
