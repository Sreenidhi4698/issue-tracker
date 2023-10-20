import { NextRequest, NextResponse } from 'next/server';
import { patchIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession();

  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { userId, title, description } = body;

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user)
      return NextResponse.json({ error: 'Invalid user' }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
  }

  const updatedissue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      userId,
    },
  });

  return NextResponse.json(updatedissue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  await prisma.issue.delete({ where: { id: issue.id } });

  return NextResponse.json({});
}
