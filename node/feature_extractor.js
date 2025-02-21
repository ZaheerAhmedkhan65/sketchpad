const constants = require("../public/common/constants.js");
const features = require("../public/common/features.js");
// const utils = require("../common/utils.js");
const fs = require("fs");

const samples = JSON.parse(
    fs.readFileSync(constants.SAMPLES)
);

for(const sample of samples){
    const paths = JSON.parse(
        fs.readFileSync(
            constants.JSON_DIR + "/" + sample.id + ".json"
        )
    );
    sample.point = [
        features.getPathCount(paths),
        features.getPointCount(paths)
    ];
}

const featureNames = ["Path Count","Point Count"];

fs.writeFileSync(constants.FEATURES,
    JSON.stringify({
        featureNames,
        samples: samples.map(s=>{
            return {
                point:s.point,
                label:s.label
            }
        })
    }) 
);

fs.writeFileSync(constants.FEATURES_JS,
    `const features = 
    ${JSON.stringify({featureNames,samples})};`
);
