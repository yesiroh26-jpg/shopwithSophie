// Simple placeholder background — soft overlapping shapes in the brand
// colors, not an attempt at photorealism. Swap for a real photo when ready:
// replace <HeroIllustration /> in Home.jsx with
//   <img src="/images/hero.jpg" alt="" className="h-full w-full object-cover" />
export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 700 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="700" height="500" fill="#FFFDF9" />
      <circle cx="560" cy="150" r="220" fill="#4C5232" opacity="0.08" />
      <circle cx="620" cy="380" r="160" fill="#E8622C" opacity="0.1" />
      <circle cx="480" cy="420" r="90" fill="#4C5232" opacity="0.07" />
    </svg>
  )
}
