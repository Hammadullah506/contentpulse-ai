export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-20 max-w-3xl mx-auto">
      <a href="/" className="inline-block text-xs text-zinc-400 hover:text-zinc-200 mb-8 border border-zinc-800 rounded px-3 py-1">
        ← Back to ContentPulse
      </a>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Terms of Service</h1>
      <p className="text-xs text-zinc-400 mb-8">Last updated: October 2026</p>

      <section className="space-y-6 text-sm text-zinc-300 leading-relaxed">
        <div>
          <h2 className="text-base font-semibold text-white mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ContentPulse AI, you agree to comply with and be bound by these Terms of Service.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">2. Service Usage</h2>
          <p>
            ContentPulse AI provides AI-assisted content transformation and repurposing tools. You are responsible for ensuring that any content you input or generate complies with applicable copyright laws and platform community guidelines.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">3. Accounts & Credits</h2>
          <p>
            Each user account receives generation credits upon registration. Misuse of the API, automated scraping, or unauthorized account creation may result in suspension.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">4. Contact</h2>
          <p>
            For support questions, reach out to <span className="text-white underline">maadii1772@gmail.com</span>.
          </p>
        </div>
      </section>
    </main>
  );
}
