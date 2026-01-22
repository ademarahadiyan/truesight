"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  const Menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analyze", path: "/analyze" },
    { name: "History", path: "/history" },
  ];

  return (
    <aside className="w-60 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="font-bold text-xl mb-4">SmartInov</h2>

      <ul className="space-y-2">
        {Menu.map((m) => (
          <li key={m.path}>
            <Link
              href={m.path}
              className={`block px-3 py-2 rounded ${
                path.startsWith(m.path)
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              {m.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
