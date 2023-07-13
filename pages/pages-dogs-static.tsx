import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "../app/page.module.css";

interface DogStatus {
  message: string;
  status: string;
}

export default function Page() {
  const [data, setData] = useState<DogStatus>();

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <main className={styles.main}>
      <h3>This is pages (client side)</h3>
      {data &&   <Image width={300} height={300} src={data.message} alt="dog" />}
    </main>
  );
}

// This gets called on every request
async function getData(): Promise<DogStatus> {
  // Fetch data from external API
  const res = await fetch(`https://dog.ceo/api/breeds/image/random`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data: DogStatus = await res.json();
  console.log("got data", data); // Pass data to the page via props

  return data;
}
