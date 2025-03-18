import { DmedLogo } from '~/shared/ui/svg';

import * as S from './styles';

export const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <S.Layout>
      <S.Content>
        <S.ContentInner>{children}</S.ContentInner>
      </S.Content>

      <S.Footer>
        <DmedLogo width="82px" /> <span>©{new Date().getFullYear()} Created by DMED team</span>
      </S.Footer>
    </S.Layout>
  );
};
