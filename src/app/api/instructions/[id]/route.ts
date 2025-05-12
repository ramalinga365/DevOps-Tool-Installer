import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'src/app/tools/instructions', `${params.id}.md`);
    const content = await fs.readFile(filePath, 'utf8');
    
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load instructions' },
      { status: 404 }
    );
  }
} 