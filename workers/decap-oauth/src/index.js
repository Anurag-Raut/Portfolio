// Cloudflare Worker for Decap CMS GitHub OAuth proxy
// Deploy this worker to handle authentication for Decap CMS

const CLIENT_ID = 'YOUR_GITHUB_OAUTH_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_GITHUB_OAUTH_CLIENT_SECRET';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Auth endpoint - redirects to GitHub OAuth
    if (url.pathname === '/auth') {
      const redirectUri = `${url.origin}/callback`;
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID || CLIENT_ID,
        redirect_uri: redirectUri,
        scope: 'repo,user',
        state: crypto.randomUUID(),
      });
      return Response.redirect(
        `https://github.com/login/oauth/authorize?${params}`,
        302
      );
    }

    // Callback endpoint - exchanges code for token
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return new Response('Missing code parameter', { status: 400 });
      }

      const tokenResponse = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID || CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET || CLIENT_SECRET,
            code: code,
          }),
        }
      );

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        return new Response(JSON.stringify(tokenData), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // Return HTML that posts the token to the Decap CMS window
      const html = `
<!doctype html>
<html>
<body>
  <script>
    (function() {
      const token = '${tokenData.access_token}';
      const provider = 'github';
      window.opener.postMessage(
        'authorization:github:success:{"token":"' + token + '","provider":"' + provider + '"}',
        '*'
      );
      window.close();
    })();
  </script>
</body>
</html>`;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html', ...corsHeaders },
      });
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  },
};
