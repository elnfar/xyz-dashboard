
import { prismaClient } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {

    console.log('RUN');
    
    const body = await req.json()
    const { id, email_addresses, first_name, image_url } = body?.data

    const email = email_addresses[0]?.email_address
    const inviteKey = cookies().get('invite_key')?.value
    console.log('✅', body)

    await prismaClient.user.upsert({
      where: { clerkId: id },
      update: {
        email,
        name: first_name,
        profileImage: image_url,
      },
      create: {
        clerkId: id,
        email,
        name: first_name || '',
        profileImage: image_url || '',
        role:'OWNER',
        tenant: inviteKey
        ? {
            connect: {
              inviteKey
            }
          }
        : {
            create: {}
          }
      },
    })
    return new NextResponse('User updated in database successfully', {
      status: 200,
    })
  } catch (error) {
    console.error('Error updating database:', error)
    return new NextResponse('Error updating user in database', { status: 500 })
  }
}


// 
// await prisma.user.upsert({
//   where: {
//     email: profile.email
//   },
//   create: {
//     email: profile.email,
//     name: profile.name,
//     role: inviteKey ? 'USER' : 'OWNER',
//     tenant: inviteKey
//     ? {
//         connect: {
//           inviteKey
//         }
//       }