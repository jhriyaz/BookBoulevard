import { TypeAnimation } from "react-type-animation";
import "./banner.css";
const Banner = () => {
  return (
    <div className="banner  lg:min-h-[650px]  min-h-[300px] w-full mx-auto leading-snug items-center flex justify-center lg:text-3xl text-[#A21942] text-2xl text-center -z-10">
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed once, initially
          "BookBoulevard: Read",
          2000,
          "BookBoulevard: Borrow",
          2000,
          "BookBoulevard: Learn 📚",
          2000,
          "BookBoulevard: Be 🤓",
          2000,
        ]}
        speed={50}
        style={{ fontSize: "1.5em" }}
        repeat={Infinity}
      />
    </div>
  );
};

export default Banner;
