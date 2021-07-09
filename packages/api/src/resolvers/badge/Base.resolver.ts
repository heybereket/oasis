import Badge from '@entities/Badge';
import { createResolver } from '@utils/files/createResolver';

// @bcg-resolver(query, paginateBadges, badge)
// @bcg-resolver(query, getBadge, badge)

export default createResolver('Badge', Badge);
