export const addNewExpert = {
    subtitle: "Nominate an Expert to Add to an Expert Panel",
    radioDescr: "Select the Panel to which you want to add an Expert",
    radioBtnName: "type-proposal",
    radioBtn: ["Q Fees & Incentives Expert Panel", "Q DeFi (Decentralized Finance) Expert Panel"],
    subtitleInputUp: "Provide Candidate Q Address",
    inputTitleDescrUp: "Candidate to add",
    inputUp: ["Address"],
    inputUpObj: {"address": ''},
    subtitleInputDown: "Provide a reference link to external source",
    inputDown: ["External Link"],
    inputDownObj: {"external-link": ''},
};

export const removeExpert = {
    subtitle: "Nominate an Expert to Remove from an Expert Panel",
    radioDescr: "Select the Panel to which you want to remove an Expert",
    radioBtnName: "type-proposal",
    radioBtn: ["Q Fees & Incentives Expert Panel", "Q DeFi (Decentralized Finance) Expert Panel"],
    subtitleInputUp: "Provide Candidate Q Address",
    inputTitleDescrUp: "Expert to remove",
    inputUp: ["Address"],
    inputUpObj: {"address": ''},
    subtitleInputDown: "Provide a reference link to external source",
    inputDown: ["External Link"],
    inputDownObj: {"external-link": ''},
};

export const parameterVote = {
    subtitle: "Create a Proposal to Change a Q System Parameter.",
    radioDescr: "Select the Panel which governs the parameter",
    radioBtnName: "type-proposal",
    radioBtn: ["Q Fees & Incentives Expert Panel", "Q DeFi (Decentralized Finance) Expert Panel"],
    subtitleInputUp: "Please provide exact Key-Name, Type and new Value for Parameter",
    inputUp: ["Key", "Value"],
    inputUpObj: {"key": '', "value": '',},
    radioBtnTitleDown: "Choose type",
    radioBtnNameDown: "type-value-proposal",
    radioBtnDown: ["Address", "Boolean", "String", "Bytes", "Uint"],
    // radioBtnDown: ["Address", "Boolean", "String", "Bytes", "Uint", "Asset Uint"],
    subtitleInputDown: "Provide a reference link to external source",
    inputDown: ["External Link"],
    inputDownObj: {"external-link": ''},
};
