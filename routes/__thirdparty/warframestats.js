const router = require("express").Router();
const Warframestat = require("../../controllers/warframestat/warframestat");

//
/**
 *! 3rd API warframestat.us
 *! all warframestats.us API have this:
 *? 	- parameter : :platform ("pc" "ps4" "xb1" "swi")
 *? 	- query : language= ("de" "es" "fr" "it" "ko" "pl" "pt" "ru" "zh" "en") //! default will be 'en'
 */

//primary fetch
router.get("/:platform/alerts", Warframestat.alerts);
router.get("/:platform/news", Warframestat.news);
router.get("/:platform/events", Warframestat.events);
router.get("/:platform/cycles", Warframestat.cycles);
router.get("/:platform/fissures", Warframestat.fissures);
router.get("/:platform/invasions", Warframestat.invasions);
router.get("/:platform/syndicates", Warframestat.syndicate);
router.get("/:platform/nightwave", Warframestat.nightwave);
router.get("/:platform/sortie", Warframestat.sortie);

//secondary fetch
router.get("/:platform/arbitration", Warframestat.arbitration);
router.get("/:platform/railjackOutpost", Warframestat.railjackOutpost);
router.get("/:platform/steelpath", Warframestat.steelpath);
router.get("/:platform/construction", Warframestat.construction);
router.get("/:platform/simaris", Warframestat.simaris);
router.get("/:platform/eventBooster", Warframestat.eventBooster);

//deals fetch
router.get("/:platform/dailyDeals", Warframestat.dailyDeals);
router.get("/:platform/flashSales", Warframestat.flashSales);

//
module.exports = router;
