import { NextRequest, NextResponse } from 'next/server';
import { Client as Discogs } from 'disconnect';

const consumerKey = process.env.DISCOGS_CONSUMER_KEY;
const consumerSecret = process.env.DISCOGS_CONSUMER_SECRET;

export async function GET(req) {
    const url = new URL(req.url);
    const oauthVerifier = url.searchParams.get('oauth_verifier');

    // Retrieve requestData from cookies
    const userToken = req.cookies.get('token');
    const tokenSecret = req.cookies.get('token_secret');

    if (!oauthVerifier || !userToken || !tokenSecret) {
        return NextResponse.json({ error: `Missing OAuth verifier or request data` }, { status: 400 });
    }

    console.log(`---- callback -----`)
    console.log(`oauthVerified: ${oauthVerifier}`)
    console.log(`consumerKey: ${consumerKey}`)
    console.log(`consumerSecret: ${consumerSecret}`)
    console.log(`userToken: ${JSON.stringify(userToken)}`)
    console.log(`tokenSecret: ${JSON.stringify(tokenSecret)}`)
    console.log(`----------------------`)

    const oAuth = new Discogs('DisConnectClient/1.2.2 +https://github.com/bartve/disconnect', {
        userToken: userToken.value,
        oauth_consumer_key: consumerKey,
        consumerSecret: consumerSecret
    }).oauth();

    return new Promise((resolve, reject) => {

        oAuth.getAccessToken(oauthVerifier, (err, accessData) => {

            if (err) {
                reject(new Error('Error getting access token'));
            } else {
                // Save accessData in some persistent storage (e.g., cookies, database)
                // For simplicity, we'll use cookies here
                console.log(accessData)
                const response = NextResponse.redirect('/');
                response.cookies.set('access_token', accessData.token);
                response.cookies.set('access_token_secret', accessData.token_secret);
                resolve(response);
            }
    });
});
}
