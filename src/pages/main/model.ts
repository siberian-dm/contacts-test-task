import { sessionModel } from '~/entities/session';
import { routes } from '~/shared/config/routing';

sessionModel.chainAuthorized({ route: routes.browse });
