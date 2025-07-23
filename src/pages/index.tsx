"use client";

import supabase from "@/lib/db";
import { IMenu } from "@/types/menu";
import { useEffect, useState } from "react";

export default function Home() {
  const [menus, setMenus] = useState<IMenu[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const { data, error } = await supabase.from("menus").select("*");

      if (error) {
        console.log("error: ", error);
      } else {
        setMenus(data);
      }
    };

    fetchMenus();
  }, [supabase]);

  console.log("menus: ", menus);

  return (
    <div>
      <ul className="flex flex-col gap-3 m-3 ">
        {menus.map((menu) => (
          <li key={menu.id}>
            <div className="font-bold">
              {menu.name} - {menu.price} - {menu.category}
            </div>
            <div>
              {menu.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
