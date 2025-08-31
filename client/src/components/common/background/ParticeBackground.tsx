import { Particles } from "./Particles";

interface ParticleBackgroundProps {
  className?: string;
  quantity?: number;
  // Add any other props you want to pass down
}
const ParticleBackground = ({
  className,
  quantity,
}: ParticleBackgroundProps) => {
  return (
    <Particles
      className={className}
      quantity={quantity}
      size={0.8}
      vx={0.01}
      vy={0.05}
    />
  );
};

export default ParticleBackground;
