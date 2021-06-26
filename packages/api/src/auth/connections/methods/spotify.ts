const SpotifyWebApi = require('spotify-web-api-node');
import { Router } from 'express';

export default (): Router => {
  const scopes = ['user-read-currently-playing'];

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.OASIS_API_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.OASIS_API_SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.OASIS_API_SPOTIFY_CALLBACK_URL,
  });

  const router = Router();

  router.get('/', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
  });

  router.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;

    if (error) {
      console.error('Callback Error:', error);
      res.status(400).send(`Callback Error`);
      return;
    }

    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        const access_token = data.body.access_token;
        const refresh_token = data.body.refresh_token;
        const expires_in = data.body.expires_in;

        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);

        console.log(
          `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );
        res.send('Success! You can now close the window.');
      })
      .catch((error) => {
        console.error('Error getting Tokens:', error);
        res.status(400).send(`Error getting Tokens`);
      });
  });

  router.get('/userinfo', async (req, res) => {
    try {
      const result = await spotifyApi.getMe();
      console.log(result.body);
      res.status(200).send(result.body);
    } catch (err) {
      res.status(400).send('Error');
    }
  });
  router.get('/currentplayingtrack', async (req, res) => {
    try {
      const result = await spotifyApi.getMyCurrentPlayingTrack();
      console.log(result.body);
      res.status(200).send(result.body);
    } catch (err) {
      console.log('Error: ', err);
      res.status(400).send('There was an error getting current track');
    }
  });

  return router;
};
