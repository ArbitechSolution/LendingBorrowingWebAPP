import "./Hero.css";
import React from "react";
import video from "../../videos/video.mp4";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [firstRender, setFirstRender] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setFirstRender(true);
  }, []);
  return (
    <div className="Hero">
      <div className="HeroBg">
        <video src={video} className="VideoBg" loop autoPlay muted />
        <div className="videoOverLay">
          <div className={firstRender ? "videoContentRender" : "videoContent"}>
            <h1>
              Welcome to <b className="BoldText">ArcherFi</b>
            </h1>
            <p>The Future of Trust in Decentralized Finance.</p>
            <button
              className="HeroButton"
              onClick={() => navigate("/Dashboard")}
            >
              Explore
            </button>
          </div>
        </div>
      </div>

      <div className="Info">
        <h1>
          {" "}
          A Free Market <b style={{ color: "#38B6FF" }}> Environment </b>
        </h1>
        <p>
          ArcherFi stands at the frontier of financial innovation, offering a
          seamlessly integrated decentralized P2P lending and borrowing
          ecosystem. Our platform isn't just about transactions; it's about
          creating a transparent and self-regulating free market where all
          participants thrive. At the core of ArcherFi is a revolutionary loan
          marketplace. But we don't stop there. We've also established a robust
          default marketplace, underpinned by a global cadre of underwriters and
          scorers. This comprehensive system ensures not just fluidity but also
          trustworthiness in every transaction. Our commitment? To empower both
          borrowers and lenders with the tools they need while ensuring all
          engagements are legally sound and mutually beneficial. Join ArcherFi
          and be a part of the movement setting new standards in decentralized
          finance. Trust, transparency, and innovation await you."
        </p>
      </div>

      <div className="InfoCards">
        <div className="InfoCard">
          <h2>No Intermediaries</h2>
          <p>
            "ArcherFi redefines P2P lending, eliminating middlemen through our
            Smart Loan Contract. Seamlessly transact directly via your wallet,
            ensuring transparency, efficiency, and utmost security. Trust
            ArcherFi for streamlined financial freedom."
          </p>
        </div>

        <div className="InfoCard middlecard">
          <h2>Trusted and Secure</h2>
          <p>
            "ArcherFi combines Smart Contracts with traditional lending
            protocols, ensuring a seamless, trusted, and ultra-secure lending
            experience for all users."
          </p>
        </div>

        <div className="InfoCard">
          <h2>Decentralized and Anonymous</h2>
          <p>
            "Explore ArcherFi, the new age of decentralized lending. Lenders
            craft loan requests effortlessly, borrowers choose freely, and all
            stake AFT tokens for trust. Fees turn into rewards for stakers,
            ensuring lucrative APRs. With ArcherFi, experience lending and
            borrowing that's simple, innovative, and private."
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
