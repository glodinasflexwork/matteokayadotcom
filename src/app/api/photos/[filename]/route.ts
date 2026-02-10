import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ filename: string }> }
) {
    try {
        const params = await props.params;
        const filename = decodeURIComponent(params.filename);
        const { env } = await getCloudflareContext();
        // @ts-ignore
        const bucket = env.matteo_media;

        if (!bucket) {
            return new NextResponse('Bucket not configured', { status: 500 });
        }

        const object = await bucket.get(filename);

        if (!object) {
            return new NextResponse('File not found', { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');

        return new NextResponse(object.body, { headers });
    } catch (error) {
        console.error('R2 photo stream error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
