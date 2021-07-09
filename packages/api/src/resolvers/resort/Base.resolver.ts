import Resort from '@entities/Resort';
import { createResolver } from '@utils/files/createResolver';

// @bcg-resolver(query, paginateResorts, resort)
// @bcg-resolver(query, getResort, resort)

export default createResolver('Resort', Resort);
