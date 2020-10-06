// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home'
import Utils from "../utils/utils";


export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  getChildRoutes(nextState, next) {
    Utils.sendRouterChange(nextState.location.pathname,nextState.location.query);

    require.ensure([], (require) => {
      next(null, [
        require('./Community').default(store),
        require('./PostDetail').default(store),
        require('./My').default(store),
        require('./MyInfo').default(store),
        require('./MyLike').default(store),
        require('./MyPost').default(store),
        require('./MyChest').default(store),
        require('./Topic').default(store),
        require('./TopicDetail').default(store),
        require('./TagDetail').default(store),
        require('./BrandMeb').default(store),
        require('./Creation').default(store),
        require('./PostPush').default(store),
        require('./Service').default(store),
        require('./ServicePush').default(store),
        require('./ServiceDetail').default(store),
        require('./Article').default(store),
        require('./MyIDValue').default(store),
        require('./MyActivity').default(store),
        require('./MyIDValueHistory').default(store),
        require('./NewsList').default(store),
        require('./Kol').default(store),
        require('./TagArDetail').default(store),
        require('./Agreement').default,
        require('./AnthemFilm').default,
        require('./Brand').default,
        require('./IntroduceCar').default,
        require('./IdFamily').default,
        require('./Privacy').default,
        require('./Setting').default,
        require('./Search').default,
        require('./SearchResult').default,
        require('./Faq').default,
        require('./ArConcert').default(store),
        require('./Didicoupon').default(store),
        require('./ShowPhoto').default,
        require('./WarmUp').default,
        require('./Techcampaign').default,
        require('./Intelligence').default,
        require('./Experience').default,
        require('./Didicoupon').default,
        require('./Design').default,
        require('./id4campaign').default,
        require('./404').default,
      ])
    })
  }
})

export default createRoutes
