import styles from "../page.module.css";
import Image from "next/image";

interface DogStatus {
  message: string;
  status: string;
}

export default async function Page() {
  const data = await getData();
  return (
    <main className={styles.main}>
      <h1>This is the app router</h1>
      <Image width={300} height={300} src={data.message} alt="dog" />
    </main>
  );
}

// This gets called on every request
async function getData(): Promise<DogStatus> {
  // Fetch data from external API
  const res = await fetch(`https://dog.ceo/api/breeds/image/random`, {next: {revalidate: 0}});
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data: DogStatus = await res.json();
  console.log("got data", data); // Pass data to the page via props

  return data;
}
