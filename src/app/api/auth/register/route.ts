import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { generateAffiliateCode } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Generate unique affiliate code
    let affiliateCode = generateAffiliateCode()
    let codeExists = await prisma.affiliate.findUnique({
      where: { affiliateCode },
    })

    // Ensure unique code
    while (codeExists) {
      affiliateCode = generateAffiliateCode()
      codeExists = await prisma.affiliate.findUnique({
        where: { affiliateCode },
      })
    }

    // Create user and affiliate in a transaction
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'AFFILIATE',
        affiliate: {
          create: {
            affiliateCode,
            tier: 'BRONZE',
            status: 'PENDING',
          },
        },
      },
      include: {
        affiliate: true,
      },
    })

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          affiliateCode: user.affiliate?.affiliateCode,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
