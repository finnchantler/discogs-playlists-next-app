import { Client as Discogs } from 'disconnect';

const client = new Discogs().user().collection();

export async function GET(request) {
  // Log the incoming request URL
  console.log('Incoming request URL:', request.url);

  // Extract query parameters
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user');
  
  // Log the extracted parameters
  console.log('Extracted user from query:', user);

  try {
    // Attempt to fetch the folders
    console.log('Attempting to fetch folders...');
    const data = await client.getFolders(user);
    
    // Log successful data retrieval
    console.log('Successfully fetched folders:', data);
    
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    // Log the error and the stack trace
    console.error('Error fetching folders:', error);
    
    // Return a 500 status code with the error message
    return new Response(JSON.stringify({ error: 'Error fetching folders' }), { status: 500 });
  }
}
