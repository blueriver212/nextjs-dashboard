import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      {/* <Image 
        src="/MIT-ArcLab.png"
        width={100}
        height={100}
        alt="MIT ArcLab Logo"
      /> */}
      <p className="text-[30px]">Pyssem</p>
    </div>
  );
}
