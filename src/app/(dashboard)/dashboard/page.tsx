import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { formatCurrency, formatDate } from '@/lib/utils'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  // Fetch affiliate data
  const affiliate = await prisma.affiliate.findUnique({
    where: { userId: session.user.id },
    include: {
      _count: {
        select: {
          clicks: true,
          conversions: true,
          campaigns: true,
        },
      },
    },
  })

  if (!affiliate) {
    return <div>Affiliate profile not found</div>
  }

  // Calculate stats
  const conversionRate = affiliate._count.clicks > 0
    ? ((affiliate._count.conversions / affiliate._count.clicks) * 100).toFixed(2)
    : '0.00'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, {session.user.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {affiliate.tier}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                affiliate.status === 'ACTIVE'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {affiliate.status}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Affiliate Code */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 mb-8 text-white">
          <h2 className="text-lg font-semibold mb-2">Your Affiliate Code</h2>
          <div className="flex items-center gap-4">
            <code className="text-2xl font-mono font-bold">{affiliate.affiliateCode}</code>
            <button className="px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-sm font-medium">
              Copy Code
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(Number(affiliate.totalEarnings))}
                </p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(Number(affiliate.pendingEarnings))}
                </p>
              </div>
              <div className="text-3xl">⏳</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Clicks</p>
                <p className="text-2xl font-bold text-gray-900">{affiliate._count.clicks}</p>
              </div>
              <div className="text-3xl">👆</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Conversions</p>
                <p className="text-2xl font-bold text-green-600">{affiliate._count.conversions}</p>
                <p className="text-xs text-gray-500">{conversionRate}% rate</p>
              </div>
              <div className="text-3xl">🎯</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <a
            href="/campaigns"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg mb-2">Create Campaign</h3>
            <p className="text-gray-600 text-sm">Start a new marketing campaign</p>
          </a>

          <a
            href="/reports"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg mb-2">View Reports</h3>
            <p className="text-gray-600 text-sm">Analyze your performance</p>
          </a>

          <a
            href="/payments"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg mb-2">Payment Settings</h3>
            <p className="text-gray-600 text-sm">Manage payout methods</p>
          </a>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity</p>
            <p className="text-sm mt-2">Start promoting to see your activity here</p>
          </div>
        </div>
      </main>
    </div>
  )
}
