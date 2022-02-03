import Link from "next/link";
import { useRouter } from "next/router";

const menu = [
  { href: "/", label: "About" },
  { href: "/records", label: "Records" },
  { href: "/photos", label: "Photos" },
];

function Nav() {
  const { asPath } = useRouter();
  const showBack = asPath.split("/").length > 2;
  const backHref = asPath.split("/").slice(0, -1).join("/");
  return (
    <ul className="flex justify-end">
      {showBack && (
        <li className="mr-auto inline-block">
          <NavItem label="back" href={backHref} active />
        </li>
      )}
      {menu.map((item) => (
        <li key={item.href} className="ml-3 inline-block">
          <NavItem href={item.href} label={item.label} />
        </li>
      ))}
    </ul>
  );
}

function NavItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  const { asPath } = useRouter();
  const activeClass =
    href === asPath || active ? "text-stone-700" : "text-stone-400";
  return (
    <Link href={href}>
      <a
        className={`${activeClass} transition-color p-1 text-sm uppercase duration-300 hover:text-stone-700 focus:outline-dotted focus:outline-1`}
      >
        {label}
      </a>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="mb-16">
      <h1 className="font-FSC select-none py-16 text-center text-4xl">
        <ruby className="group transition-color text-stone-300 duration-300  hover:text-stone-700">
          K
          <span className="relative">
            <span className="invisible">Ξ</span>
            <span className="absolute left-0 transition-opacity  duration-300 group-hover:opacity-0">
              Ξ
            </span>
            <span className="absolute left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              E
            </span>
          </span>
          I<rp>(</rp>
          <rt className="text-center text-sm text-stone-400 opacity-0 group-hover:opacity-100">
            ケイ
          </rt>
          <rp>)</rp>
        </ruby>
      </h1>
      <Nav />
    </header>
  );
}
