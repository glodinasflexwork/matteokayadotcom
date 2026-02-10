import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { env } = await getCloudflareContext();
        // @ts-ignore
        const bucket = env.matteo_media;

        if (!bucket) {
            return NextResponse.json({ error: 'Bucket not configured' }, { status: 500 });
        }

        const listed = await bucket.list();

        // Filter for image files only
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic'];
        const photos = listed.objects
            .filter((obj: any) => {
                const key = obj.key.toLowerCase();
                return imageExtensions.some(ext => key.endsWith(ext));
            })
            .map((obj: any) => ({
                key: obj.key,
                size: obj.size,
                uploaded: obj.uploaded,
            }));

        return NextResponse.json({ photos });
    } catch (error) {
        console.error('R2 photos list error:', error);
        return NextResponse.json({ error: 'Failed to list photos' }, { status: 500 });
    }
}
