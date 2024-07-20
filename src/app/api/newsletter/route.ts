
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NewsletterValidator } from '@/lib/types.validators';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';



const prisma = new PrismaClient();



export async function POST(req: NextRequest) {
  const user = await auth()

  console.log(user);
  

  try {


    if(!user) {
      return NextResponse.json({msg:"User must be authorized to create a newsletter"}, {
        status:401
      })
    }
    
    console.log(user?.user?.id);
    

    const body = await req.json();
    const {title} = NewsletterValidator.parse(body);


  
  

    
    if(!title) {
      return NextResponse.json({ error: 'No title found' }, { status: 500 });
    }

  
    await prisma.newsletter.create({
      data: {
        title,
        userId:user?.user?.id || ''
      },
    });

    revalidatePath('/')
    return new NextResponse("created", { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
