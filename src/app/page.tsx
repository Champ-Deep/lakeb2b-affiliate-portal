import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Lake B2B Affiliate Portal
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our affiliate program and start earning commissions today
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <Link
              href="/register"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors"
            >
              Sign In
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Track Performance</h3>
              <p className="text-gray-600">
                Real-time analytics and reporting on your affiliate performance
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Earn Commissions</h3>
              <p className="text-gray-600">
                Competitive commission rates with tier-based bonuses
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Marketing Tools</h3>
              <p className="text-gray-600">
                Access to banners, templates, and promotional materials
              </p>
            </div>
          </div>

          <div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Why Join Lake B2B?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2">✓ High Conversion Rates</h4>
                <p className="text-gray-600 text-sm">
                  Our products convert well with B2B audiences
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✓ Timely Payments</h4>
                <p className="text-gray-600 text-sm">
                  Regular monthly payouts via your preferred method
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✓ Dedicated Support</h4>
                <p className="text-gray-600 text-sm">
                  Our team is here to help you succeed
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✓ Advanced Tracking</h4>
                <p className="text-gray-600 text-sm">
                  Detailed analytics to optimize your campaigns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Lake B2B. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
