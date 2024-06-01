import Link from "next/link";
import Image from "next/image";

const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image
          src="/logo.svg"
          alt="Logo"
          height={200}
          width={200}
        />
      </div>
    </Link>
  );
};

export default HeaderLogo;
