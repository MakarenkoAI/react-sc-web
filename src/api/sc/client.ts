import { ScClient } from 'ts-sc-client';
import { SC_URL } from '@constants';

const TIMEOUT = 2000;

export let client: ScClient;
let onError: () => void;
let onClose: () => void;

const getClient = () => {
  if (onError) client.removeEventListener('error', onError);
  if (onClose) client.removeEventListener('close', onClose);

  client = new ScClient(SC_URL);

  onError = () => {
    console.error('error connecting to ts-client, trying to reconnect in 2 seconds');
    setTimeout(getClient, TIMEOUT);
  };

  onClose = () => {
    console.error('ts-client websocket was closed, trying to reconnect in 2 seconds');
    setTimeout(getClient, TIMEOUT);
  };

  client.addEventListener('error', onError);
  client.addEventListener('close', onClose);
};

getClient();
