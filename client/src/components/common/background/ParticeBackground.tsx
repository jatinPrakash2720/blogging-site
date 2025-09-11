interface BackgroundProps {
  className?: string;
  // The 'quantity' prop is no longer used but kept for compatibility
  quantity?: number;
}

const ParticleBackground = ({ className }: BackgroundProps) => {
  // Path to the image you uploaded.
  // This assumes the image is placed in the `public` folder of your project.
  // const imageUrl1 = "/pexels-juanpphotoandvideo-1242348.jpg";
  // const imageUrl2 = "/pexels-codioful-7130475.jpg";
  // const imageUrl3 = "/pexels-splitshire-1526.jpg";
  // const imageUrl4 = "/pexels-cottonbro-9694697.jpg";
  // const imageUrl5 = "/pexels-umkreisel-app-956981.jpg";
  // const imageUrl6 = "/9f74e4d8-4c67-4ec1-b03a-410678eaef59.jpg";
  const imageUrl7 = "/abstract-grainy-texture.jpg";

  return (
    <div
      className={`fixed inset-0 -z-10 bg-cover bg-card transition-all duration-500 ease-in-out ${className}`}
      style={{ backgroundImage: `url(${imageUrl7})` }}
    >
      {/* A subtle overlay to ensure text on top is readable */}
      <div className="absolute inset-0" />
    </div>
  );
};

export default ParticleBackground;

// import { Particles } from "./Particles";

// interface ParticleBackgroundProps {
//   className?: string;
//   quantity?: number;
//   // Add any other props you want to pass down
// }
// const ParticleBackground = ({
//   className,
//   quantity,
// }: ParticleBackgroundProps) => {
//   return (
//     <Particles
//       className={className}
//       quantity={quantity}
//       size={0.8}
//       vx={0.01}
//       vy={0.05}
//     />
//   );
// };

// export default ParticleBackground;
