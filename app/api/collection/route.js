import { NextRequest, NextResponse } from 'next/server';
import { Client as Discogs } from 'disconnect';

export async function GET(req) {
    const access_token = req.cookies.get('access_token')?.value;
    const access_token_secret = req.cookies.get('access_token_secret')?.value;

    if (!access_token || !access_token_secret) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const dis = new Discogs({ access_token, access_token_secret });
    const collection = await new Promise((resolve, reject) => {
        dis.user().collection().getReleases('your_discogs_username', 0, { page: 1, per_page: 50 }, (err, data) => {
        
            if (err) {
                reject(new Error('Error fetching collection'));
            } else {
                resolve(data.releases);
            }
        });
    });

    return NextResponse.json(collection);
}
