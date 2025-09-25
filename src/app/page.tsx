import Link from "next/link";

export default function Home() {
  return (
    <section>
      <p className="py-4">
        Welcome to the{" "}
        <Link className="text-blue-500" href="https://druid.sh" target="_blank">
          Druid
        </Link>{" "}
        SDK Demo
      </p>
      Go to the <Link href="/blog">Blog</Link> page to see the magic.
    </section>
  );
}
