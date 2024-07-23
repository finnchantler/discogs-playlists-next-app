import { NextRequest, NextResponse } from 'next/server';
import { Client as Discogs } from 'disconnect';

const consumerKey = process.env.DISCOGS_CONSUMER_KEY;
const consumerSecret = process.env.DISCOGS_CONSUMER_SECRET;
const callbackUrl = process.env.DISCOGS_CALLBACK_URL;

export async function GET(req) {
    
    const oAuth = new Discogs().oauth();
    
    return new Promise((resolve, reject) => {
    
        oAuth.getRequestToken(consumerKey, consumerSecret, callbackUrl, (err, requestData) => {
            if (err) {
                reject(new Error('Error getting request token'));
            } else {
                // Save requestData in some persistent sctorage (e.g., cookies, database)
                // For simplicity, we'll use cookies here
                
                const response = NextResponse.redirect(requestData.authorizeUrl);
                console.log(`REQUEST DATA`)
                console.log(requestData)
                console.log(`-------------------------------`)

                response.cookies.set('method', requestData.method);
                response.cookies.set('level', requestData.level);
                response.cookies.set('consumerKey', requestData.consumerKey);
                response.cookies.set('consumerSecret', requestData.consumerSecret);
                response.cookies.set('token', requestData.token);
                response.cookies.set('tokenSecret', requestData.tokenSecret);
                response.cookies.set('authorizeUrl', requestData.authorizeUrl);

                resolve(response);
            }
        });

    });
}
