import {NextResponse} from 'next/server';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/common/configs/auth.config';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({status: 'fail', message: 'You are not logged in'}), {status: 401});
  }

  return NextResponse.json({
    authenticated: !!session,
    session
  });
}
