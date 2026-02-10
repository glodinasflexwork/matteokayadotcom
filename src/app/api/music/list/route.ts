import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';



export async function GET() {
    console.log("Music Request Started");
    try {
        const { env } = await getCloudflareContext();
        console.log("Env keys:", Object.keys(env));

        // @ts-ignore
        const bucket = env.matteo_media;
        console.log("Bucket found:", !!bucket);

        if (!bucket) {
            console.error('R2 bucket binding not found');
            return NextResponse.json({ error: 'Bucket not configured', envKeys: Object.keys(env) }, { status: 500 });
        }

        const listed = await bucket.list();

        // Map to a clean format
        const files = listed.objects.map((obj: any) => ({
            key: obj.key,
            size: obj.size,
            uploaded: obj.uploaded,
        }));

        return NextResponse.json({ files });
    } catch (error) {
        console.error('R2 list error:', error);
        return NextResponse.json({ error: 'Failed to list music' }, { status: 500 });
    }
}
