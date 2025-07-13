export interface Ball {
  id: number;
  x: number;
  y: number;
  rotate: number;
  hue: number;
  size: number;
}

export interface Prize {
  image: string;
  title: string;
}

export interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  color: string;
  rx: number;
  ry: number;
  rz: number;
  rs: number;
}
