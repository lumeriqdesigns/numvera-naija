export default function About() {
  return (
    <main className="section">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-extrabold">About Numvera Naija</h1>
        <p className="mt-5 text-lg leading-8 muted">
          Numvera Naija is a free tools platform focused on calculators that match how Nigerians actually
          work, study and move — salary and PAYE, CGPA, NYSC budgeting, inter-city fuel costs and more.
        </p>
        <div className="mt-8 card p-6">
          <h2 className="text-xl font-bold">Our approach</h2>
          <p className="mt-3 leading-7 muted">
            We keep calculations transparent and client-side. No account is required. Results are estimates
            for guidance; always verify tax, academic or legal decisions with official sources.
          </p>
        </div>
        <div className="mt-4 card p-6">
          <h2 className="text-xl font-bold">What makes us different</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 muted leading-7">
            <li>Nigeria-specific tax and school logic, not generic global templates</li>
            <li>Shareable results and clear explanations</li>
            <li>Guides that teach the method behind each tool</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
