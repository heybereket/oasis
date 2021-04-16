import { useTokenStore } from '../global-stores/useTokenStore';

// to retreive realtime data:
useTokenStore.getState().token;

// to set data:
useTokenStore.getState().setData({ token: 'new token' });
