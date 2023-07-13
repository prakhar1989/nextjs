import Image from "next/image";

import styles from "../app/page.module.css";

interface DogStatus {
  message: string;
  status: string;
}

type Props = {
  data: DogStatus
}

export default function Page({data}: Props) {
  return (
    <main className={styles.main}>
      <Image width={300} height={300} src={data.message} alt="dog" />
    </main>
  );
}

export async function getServerSideProps() {
  const data = await getData();

  return {
    props: {
      data
    },
  }
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
