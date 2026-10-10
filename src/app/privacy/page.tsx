export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-100 px-6 py-20 max-w-3xl mx-auto">
      <a href="/" className="inline-block text-xs text-zinc-400 hover:text-zinc-200 mb-8 border border-zinc-800 rounded px-3 py-1">
        ← Back to ContentPulse
      </a>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Privacy Policy</h1>
      <p className="text-xs text-zinc-400 mb-8">Last updated: October 2026</p>

      <section className="space-y-6 text-sm text-zinc-300 leading-relaxed">
        <div>
          <h2 className="text-base font-semibold text-white mb-2">1. Overview</h2>
          <p>
            ContentPulse AI (&quot;we&quot;, &quot;our&quot;) is committed to protecting your personal data. 
            This Privacy Policy explains how we collect and use information when you use our content repurposing service.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">2. Information We Collect</h2>
          <p>
            When you sign in using Google OAuth, we receive your basic profile details: name, email address, and profile picture avatar. 
            We store these details securely to manage your account and allocate your generation credits.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">3. How Information is Used</h2>
          <p>
            Your information is used solely to authenticate your account, maintain your workspace, and save your generated marketing campaigns. 
            We never sell, rent, or distribute your email or profile information to third parties.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">4. Data Security</h2>
          <p>
            All user data is encrypted in transit via SSL/TLS and stored securely in dedicated database servers. 
            OAuth access tokens are handled with strict security standards.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-2">5. Contact</h2>
          <p>
            For privacy inquiries or account deletion requests, contact us at <span className="text-white underline">maadii1772@gmail.com</span>.
          </p>
        </div>
      </section>
    </main>
  );
}
