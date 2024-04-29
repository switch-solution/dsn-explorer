export type EstablishmentObject = {
    siren: string,
    nic: string,
    apet: string,
    adress1: string,
    adress2?: string,
    adress3?: string,
    zipCode: string,
    country: string,
    idcc: string,
    legalStatus: string,
    opco: string,
    codeZip: string
    city: string,
    date: string
}

export type Data = {
    id: string;
    value: string;
    label: string;
    field: string;
}


export type EmployeeObject = {
    numSS: string,
    lastname: string,
    surname: string,
    firstname: string,
    sex: string,
    birthday: string,
    placeOfBith: string,
    address1: string,
    codeZip: string,
    city: string,
    country: string,
    codeZipBith: string,
    countryBirth: string,
    address2?: string,
    address3?: string,
    email?: string,
    employeeId: string,
    graduate?: string,
    studies?: string,
    date: string,
    ntt?: string

}


export type WorkContractObject = {
    employeeId: string,
    numSS: string,
    startDate: string,
    status: string,
    retirement: string,
    pcs: string,
    pcsBis: string,
    employmentLabel: string,
    contract: string,
    contractId: string,
    publicDispPolitic: string,
    contractEndDate: string,
    DNACodeUnitTime: string,
    DSNWorkQuotaEstablishment: string,
    DSNWorkQuotaWorkContract: string,
    workTime: string,
    ss: string,
    idcc: string,
    mal: string,
    estabWorkPlace: string,
    vieillesse: string,
    pattern: string,
    vacation: string,
    rateProfessionalFess: string,
    foreigner: string,
    exclusionDsn: string,
    statusEmployment: string,
    unemployment: string,
    idPublicEmployer: string,
    methodUnemployment: string,
    joiningDate: string,
    denunciationDate: string,
    dateManagementAgreement: string,
    idAgreement: string,
    healthRiskDelegate: string,
    multipleJobCode: string,
    multipleEmployerCode: string,
    workAccidentRisk: string,
    idWorkAccidentRisk: string,
    positionCollectiveAgreement: string,
    apecita: string,
    rateAt: string,
    contributingFullTime: string,
    tip: string,
    useEstablishmentId: string,
    livePerfomances: string,
    licences: string,
    showId: string,
    showrunner: string,
    fpPcs?: string,
    typePosition?: string,
    fpQuotite?: string,
    partTimeWork?: string,
    serviceCode?: string,
    fpIndice?: string,
    fpIndiceMaj?: string,
    NBI?: string,
    indiceOriginal?: string,
    article15?: string,
    oldEstablishment?: string,
    oldIndice?: string,
    SPP?: string,
    contractual?: string,
    secondment?: string,
    browsing?: string,
    activityDutyRate?: string,
    payLevel?: string,
    echelon?: string,
    coefficient?: string,
    boeth: string,
    addPublicPolicy?: string,
    arrangement?: string,
    finaly?: string,
    navy?: string,
    cnieg?: string,
    activityRate?: string,
    grade?: string,
    cti?: string,
    finess?: string,
    date: string
}

export type PayroolObject = {
    employeeId: string,
    numSS: string,
    startDatePayrool: string,
    endDatePayrool: string,
    contractId: string,
    type: string,
    hours: string,
    amount: string,
    fpRate?: string,
    rateNuclearPlant?: string,
    datePayTypement: string,
    contributedrate: string,
    increaseRate: string
}

export type MutualEmployeeObject = {
    employeeId: string,
    numSS: string,
    option: string,
    pop: string,
    children: string,
    assign: string,
    numberAssign: string,
    otherAssign: string,
    idTechAffiliation: string,
    idTech: string,
    date: string,
    idTechAffiliationMutual: string,
    startDateMutualEmployee: string,
    endDateMutualEmployee: string
}

export type MutualObject = {
    contractId?: string,
    organisme?: string,
    delegate?: string,
    covererd?: string,
    techId?: string,
    date: string
}

export type BonusObject = {
    siren: string,
    date: string
    employeeId: string,
    numSS: string,
    typeBonus: string,
    amountBonus: string,
    dateStartBonus: string,
    dateEndBonus: string,
    contractIdBonus: string,
    datePaymentBonus: string
}

export type RateAtObject = {
    idWorkAccidentRisk: string,
    rateAt: string,
    nic: string,

}

export type DsnObject = {
    softwareName: string,
    provider: string,
    softwareVersion: string,
    dsnVersion: string,
    month: string,
    type: string,
    totalRows: string,

}

export type SenderObject = {
    nicSender: string,
    nameSender: string,
    addressSender: string,
    zipCodeSender: string,
    citySender: string,
    countrySender: string,
    foreignDistributionCodeSender: string,
    complementLocalisationSender: string,
    distributionServiceSender: string

}

export type SocietyObject = {
    siren: string,
    nic: string,
    apen: string,
    adress1: string,
    adress2?: string,
    adress3?: string,
    zipCode: string,
    city: string,
    date: string,
    averageWorkForce31DecemberSociety: string,
    countrySociety: string,
    foreignDistributionCode: string,
    establishmentOfTheCompany: string,
    idcc: string
}


export type WorkStoppingObject = {
    employeeId: string,
    numSS: string,
    reasonStop: string,
    lastDayWorked: string,
    estimatedEndDate: string,
    subrogation?: string,
    subrogationStartDate?: string,
    subrogationEndDate?: string,
    iban?: string,
    bic?: string,
    recoveryDate?: string,
    reasonRecovery?: string,
    dateWorkAccident?: string,
    SIRETCentralizer?: string,
    date: string,
    siret: string
}

export type ContributionObject = {
    employeeId: string,
    numSS: string,
    idContribution: string,
    ops: string,
    baseContribution: string,
    amountContribution: string,
    idInsee?: string,
    crmContribution?: string,
    rateContribution?: string,
    date: string
}

export type BankObject = {
    contributionFundBIC: string,
    contributionFundIBAN: string,
}



