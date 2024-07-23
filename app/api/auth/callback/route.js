import { NextRequest, NextResponse } from 'next/server';
import { Client as Discogs } from 'disconnect';

export async function GET(req) {
    const url = new URL(req.url);
    const oauthVerifier = url.searchParams.get('oauth_verifier');

    // Retrieve requestData from cookies
    const requestData = {
        method: req.cookies.get('method'),
        level: req.cookies.get('level'),
        consumerKey: req.cookies.get('consumerKey'),
        consumerSecret: req.cookies.get('consumerSecret'),
        token: req.cookies.get('token'),
        tokenSecret: req.cookies.get('tokenSecret'),
        authorizeUrl: req.cookies.get('authorizeUrl')
    }

    if (!oauthVerifier || !requestData.token || !requestData.tokenSecret) {
        return NextResponse.json({ error: `Missing OAuth verifier or request data` }, { status: 400 });
    }

    const oAuth = new Discogs(requestData).oauth();

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
