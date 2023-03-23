import PrimaryButton from "@/components/atom/PrimaryButton";
import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>TODO LIST</title>
      </Head>
      <Header />
      <div className="text-center">
        <h3 className="text-3xl font-bold">TODO LIST</h3>
        <Link href='/todos/create'>
          <PrimaryButton>TODO作成</PrimaryButton>
        </Link>
      </div>
    </>
  )
}
