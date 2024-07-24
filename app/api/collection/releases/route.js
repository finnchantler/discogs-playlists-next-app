import { Client as Discogs } from 'disconnect';

const client = new Discogs().user().collection();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get('user');
    const folder = searchParams.get('folder');
    const page = searchParams.get('page');
    const per_page = searchParams.get('per_page');

    console.log('Received request with parameters:', {
        user,
        folder,
        page,
        per_page
    });

    try {
        console.log('Fetching releases with parameters:', {
            user,
            folder,
            page,
            per_page
        });

        const data = await client.getReleases(user, folder, { page, per_page });
        console.log('Fetched data:', data);

        // Ensure data structure is as expected
        if (data && data.releases) {
            console.log('Data structure valid:', {
                releasesCount: data.releases.length
            });
        } else {
            console.warn('Unexpected data structure:', data);
        }

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Error fetching releases:', error);
        return new Response(JSON.stringify({ error: 'Error fetching releases' }), { status: 500 });
    }
}
