import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextRequest, NextResponse } from 'next/server';

interface RSVPBody {
    name: string;
    email?: string;
    phone?: string;
    role: 'guest' | 'nas' | 'cumetru' | 'onlinesupporter';
    donation_tier?: number;
    num_guests: number;
    message?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: RSVPBody = await request.json();

        // Validate required fields
        if (!body.name || body.name.trim().length < 2) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        if (body.role !== 'onlinesupporter' && (body.num_guests < 1 || body.num_guests > 2)) {
            return NextResponse.json({ error: 'Guest count must be 1 or 2' }, { status: 400 });
        }

        if (!['guest', 'nas', 'cumetru', 'onlinesupporter'].includes(body.role)) {
            return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
        }

        const { env } = await getCloudflareContext();
        const db = env.DB;

        const result = await db.prepare(
            `INSERT INTO rsvps (name, email, phone, role, donation_tier, num_guests, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            body.name.trim(),
            body.email?.trim() || null,
            body.phone?.trim() || null,
            body.role,
            body.donation_tier || null,
            body.num_guests,
            body.message?.trim() || null
        ).run();

        return NextResponse.json({
            success: true,
            id: result.meta.last_row_id,
            message: 'RSVP submitted successfully!'
        });

    } catch (error) {
        console.error('RSVP submission error:', error);
        return NextResponse.json({ error: 'Failed to submit RSVP' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const { env } = await getCloudflareContext();
        const db = env.DB;

        const { results } = await db.prepare(
            'SELECT * FROM rsvps ORDER BY created_at DESC'
        ).all();

        return NextResponse.json({ rsvps: results });
    } catch (error) {
        console.error('RSVP fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch RSVPs' }, { status: 500 });
    }
}
