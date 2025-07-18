import Image from 'next/image';

export default function Home() {
  return (
    <div><h5>HELLO WORLD</h5><Image
    aria-hidden
    src="/globe.svg"
    alt="Window icon"
    width={16}
    height={16}
  /></div>
  );
}
