import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      Welcome to the Druid SDK Demo!
      <br />
      Go to the <Link href="/blog">Blog</Link> page to see the magic.
    </div>
  );
}
