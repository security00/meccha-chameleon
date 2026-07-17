import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-copy">
        <p>404 / Missing field file</p>
        <h1>Target lost.</h1>
        <p>
          This route does not exist, or the field guide moved while you were scanning the room.
        </p>
        <Link href="/">
          Return to the field guide
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <div className="not-found-signal" aria-hidden="true">
        <span>404</span>
        <i />
      </div>
    </main>
  );
}
