import { Particles } from "./Particles";

interface ParticleBackgroundProps {
  className?: string;
  quantity?: number;
  color?: string;
  // Add any other props you want to pass down
}
const ParticleBackground = ({className, quantity,color}:ParticleBackgroundProps) => {
  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        className={className}
        quantity={quantity}
        size={0.5}
        color={color}
        vx={0.01}
        vy={0.05}
      />
    </div>
  );
};

export default ParticleBackground;
