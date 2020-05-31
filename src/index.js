const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

app.get('/v1/stock_details', (async (req, res) => {
    const company = req.query.stock;
    const interval = req.query.interval;
    const range = req.query.range;
    if(typeof(company) === 'string') {
            const response = await axios({
                url: 'https://query1.finance.yahoo.com/v8/finance/chart/'+
                        company+
                        '?region=US&lang=en-US&includePrePost=false&' +
                        'interval='+interval +
                        '&range='+range +
                        '&corsDomain=finance.yahoo.com&.tsrc=finance',
                method: 'get'
            }).then ((response) => {
                res.status(200).send(response.data);
            }).catch ((error) => {
                console.log(error);
                res.status(error.response.status).send(error.message);
            })
            
        
    } else {
        res.status(400).send('Cannot find the company name');
    }
    
}));

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});


app.get('/v1/stock_name', (async (req, res) => {
    const company = req.query.stock;
    if(typeof(company) === 'string') {
            const response = await axios({
                url: 'https://query2.finance.yahoo.com/v1/finance/search?q='+
                        company+
                        '&lang=en-US&region=US&quotesCount=6&newsCount=4&enableFuzzyQuery=false&' +
                        'quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&' +
                        'newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true',
                method: 'get'
            }).then ((response) => {
                res.status(200).send(response.data);
            }).catch ((error) => {
                console.log(error);
                res.status(error.response.status).send(error.message);
            })
            
        
    } else {
        res.status(400).send('Cannot find the company name');
    }
    
}));

app.get('/',async(req, res) => {
    const response = await axios({
        url: 'https://finance.yahoo.com/_finance_doubledown/api/resource?bkt=fd-strm-mab%2Cfd-wf-notifications%2Cfd-qsp-ncp-eem%2Cfd-fin-instapage&crumb=Bz4dMqvKu1g&device=desktop&feature=adsMigration%2CcanvassOffnet%2CccOnMute%2Cdebouncesearch100%2CdeferDarla%2CemptyServiceWorker%2CenableCMP%2CenableConsentData%2CenableTheming%2CenableNavFeatureCue%2CenableFeatureTours%2CenableFreeFinRichSearch%2CenableGuceJs%2CenableGuceJsOverlay%2CenableNewResearchInsights%2CenablePfSummaryForEveryone%2CenablePremiumSingleCTA%2CenablePremiumScreeners%2CenablePrivacyUpdate%2CenableVideoURL%2CenableYahooSans%2CnewContentAttribution%2CnewLogo%2CoathPlayer%2Cpremium35%2CrelatedVideoFeature%2CreportReactMarkupDiff%2CthreeAmigos%2CwaferHeader%2CvideoNativePlaylist%2CenableCCPAFooter%2Clivecoverage%2CdarlaFirstRenderingVisible%2CenableTradeit%2CenableFeatureBar%2CenableSearchEnhancement%2CenableUserSentiment%2CenableBankrateWidget%2CncpHpStream%2Cload6Items%2CcanvassReplies%2CresearchFilter%2CenableSingleRail%2CenablePremiumFinancials%2CenhanceAddToWL%2CsponsoredAds%2CenableStageAds%2CenableTradeItLinkBrokerSecondaryPromo%2CpremiumPromoHeader%2CenableQspPremiumPromoSmall%2CclientDelayNone%2CthreeAmigosMabEnabled%2CthreeAmigosAdsEnabledAndStreamIndex0%2CmabHpStream%2CenableNotification%2CncpQspReverseChronoStream%2CenableInstapage&intl=us&lang=en-US&partner=none&prid=e7aqiudf7ef3r&region=US&site=finance&tz=America%2FLos_Angeles&ver=0.102.3400',
        method: 'post'
    }).then ((response) => {
        res.status(200).send(response.data);
    }).catch ((error) => {
        console.log(error);
        res.status(error.response.status).send(error.message);
    })
})