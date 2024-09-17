import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import { Link } from 'react-router-dom'; // navigate to the game details page

const Banner = () => {
  const bannerImages = [
    { id: -1, url: '/bannerimages/logo.png' },
    { id: 41494, url: '/bannerimages/bannerimg1.avif' },
    { id: 481913, url: '/bannerimages/bannerimg4.jpg' },
    { id: 28, url: '/bannerimages/bannerimg6.jpg' },
    { id: 3328, url: '/bannerimages/bannerimg8.jpg' },
    { id: 'cod-black-ops-ii', url: '/bannerimages/bannerimg9.jpg' },
    { id: 3498, url: '/bannerimages/bannerimg10.jpg' },
    { id: 58175, url: '/bannerimages/bannerimg11.webp' }
  ];

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    fade: true,  
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <div className="banner banner-slider">
      <Slider {...settings}>
        {bannerImages.map((image) => (
          <div key={image.id}>
            {image.id > 0 || image.id==="cod-black-ops-ii" ? (
              <Link to={`/games/${image.id}`}>
                <img src={image.url} alt={`Banner ${image.id}`} />
              </Link>
            ) : (
              <img src={image.url} alt={`Banner ${image.id}`} />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
