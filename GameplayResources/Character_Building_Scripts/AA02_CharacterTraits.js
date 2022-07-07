class CharacterTrait {
    constructor(name, kind, isObvious, isTransitory, value, isBuyable, isTrainable, isConcealable, isFakeable){
        this.name = name
        if (this.checkKind(kind) == false){
            throw "Invalid kind. Can't create CharacterTrait"
        }
        this.kind = kind
        this.isObvious = isObvious
        this.isTransitory = isTransitory
        this.value = value
        if (isBuyable !== undefined){
            this.isBuyable = isBuyable
        } else {
            this.isBuyable = false
        }
        if (isTrainable !== undefined){
            this.isTrainable = isTrainable
        } else {
            this.isTrainable = false
        }
        if (isConcealable !== undefined){
            this.isConcealable = isConcealable
        } else {
            this.isConcealable = false
        }
        if (isFakeable !== undefined){
            this.isFakeable = isFakeable
        } else {
            this.isFakeable = false
        }
    }
    toString(){
        return this.name + String(this.value)
    }
    checkKind(kind){
        kind = kind.toLowerCase()
        switch(kind){
            case "physical":
            case "attitude":
            case "status":
            case "historic":
                return true
            default:
                return false
        }
    }
}

function ageGroupStringFromAge(age, gender, isHot){
    if (age < 18){
        throw "Can't create characters of less than 18 years of age."
    }
    if (age <= 20){
        if (gender == "male"){
            return "teenage boy"
        } else if (gender == "female"){
            return "teenage girl"
        } else {
            return "teenager"
        }
    } else if (age <= 25){
        if (gender == "male"){
            if (isHot == true){
                return "beefcake"
            } else {
                return "young man"
            }
        } else if (gender == "female"){
            if (isHot == true){
                return "hottie"
            } else {
                return "young woman"
            }
        } else {
            return "young adult"
        }
    } else if (age <= 30){
        if (gender == "male"){
            if (isHot == true){
                return "hunk"
            } else {
                return "adult man"
            }
        } else if (gender == "female"){
            if (isHot == true){
                return "babe"
            } else {
                return "adult woman"
            }
        } else {
            return "adult"
        }
    } else if (age <= 40){
        if (gender == "male"){
            if (isHot == true){
                return "silver fox"
            } else {
                return "mature man"
            }
        } else if (gender == "female"){
            if (isHot == true){
                return "milf"
            } else {
                return "mature woman"
            }
        } else {
            return "mature person"
        }
    } else {
        if (gender == "male"){
            if (isHot == true){
                return "old man"
            } else {
                return "geezer"
            }
        } else if (gender == "female"){
            if (isHot == true){
                return "old woman"
            } else {
                return "crone"
            }
        } else {
            return "elder"
        }
    }
}

function ageGroupTraitFromAge(age){
    let ageGroup = ageGroupStringFromAge(age)
    return new CharacterTrait(ageGroup, "physical", true, true, age, false, false, true, true)
}

function genderTraitFromGender(gender){
    gender = gender.toLowerCase()
    if ((gender != "male") && (gender != "female")){
        throw "Can't create gender trait with gender string '" + gender + "'."
    }
    return new CharacterTrait(gender, "physical", true, false, undefined, false, false, true, true)
}

function buildEthnicityTrait(ethnicity){
    ethnicity = normalizeEthnicity()
    return new CharacterTrait("ethnicity", "physical", true, false, ethnicity, false, false, false, false)
}

function normalizeEthnicity(ethnicity){
    ethnicity = ethnicity.toLowerCase()
    switch(ethnicity){
        case "caucasian":
        case "black":
        case "asian":
            return ethnicity
        case "latinx":
        case "latino":
        case "latina":
            return "latinx"
        default:
            throw "Unrecognized ethnicity: '" + ethnicity + "'."
    }
}

function buildFaceBeautyTrait(faceBeautyRating){
    faceBeautyRating = faceBeautyRating.toLowerCase()
    switch (faceBeautyRating){
        case "hideous":
        case "ugly":
        case "average":
        case "pretty":
        case "handsome":
        case "gorgeous":
            break
        default:
            "Can't build faceBeautyTrait from unrecognized rating '" + faceBeautyRating + "'."
    }
    return new CharacterTrait("faceBeauty", "physical", true, false, faceBeautyRating, true, false, false, false)
}

function buildTallnessTrait(tallnessRating){
    tallnessRating = tallnessRating.toLowerCase()
    switch (tallnessRating){
        case "tall":
        case "average":
        case "short":
            break
        default:
            "Can't build tallnessTrait from unrecognized rating '" + tallnessRating + "'."
    }
    return new CharacterTrait("tallness", "physical", true, false, tallnessRating, false, false, false, false)
}

function buildBreastSizeTrait(size){
    size = size.toLowerCase()
    switch (size){
        case "enormous":
        case "big":
        case "modest":
        case "small":
            break
        default:
            "Can't build breastSizeTrait from unrecognized size '" + size + "'."
    }
    return new CharacterTrait("breast size", "physical", true, false, size, true, false, true, true)
}

function buildPenisSizeTrait(size){
    size = size.toLowerCase()
    switch (size){
        case "enormous":
        case "big":
        case "modest":
        case "small":
            break
        default:
            "Can't build penisSizeTrait from unrecognized size '" + size + "'."
    }
    return new CharacterTrait("penis size", "physical", false, false, size, false, false, true, true)
}

function buildHairColorTrait(hairColor){
    hairColor = hairColor.toLowerCase()
    switch(hairColor){
        case "black":
        case "brown":
        case "blond":
        case "red":
        case "unnatural":
            break
        default:
            "Can't build hairColorTrait from unrecognized color '" + hairColor + "'."
    }
    return new CharacterTrait(hairColor + " hair", "physical", true, true, undefined, true, false, true, true)
}

function buildHairLengthTrait(hairLength){
    hairLength = hairLength.toLowerCase()
    switch(hairLength){
        case "bald":
        case "short":
        case "long":
            break
        default:
            "Can't build hairLengthTrait from unrecognized length '" + hairLength + "'."
    }
    return new CharacterTrait(hairLength + " hair", "physical", true, true, undefined, false, true, true, true)
}

function buildStyledHairTrait(){
    return new CharacterTrait("styled hair", "physical", true, true, undefined, true, false, true, false)
}

function buildMuscledTrait(){
    return new CharacterTrait("muscled", "physical", true, true, undefined, true, true, true, false)
}

function buildWellDressedTrait(){
    return new CharacterTrait("well dressed", "physical", true, true, undefined, true, false, false, false)
}

function buildpersonalCareTrait(personalCareLevel){
    personalCareLevel = personalCareLevel.toLowerCase()
    switch(personalCareLevel){
        case "excessive":
        case "great":
        case "good":
        case "acceptable":
        case "poor":
        case "bad":
        case "terrible":
            break
        default:
            "Can't build personalCareTrait from unrecognized level '" + personalCareLevel + "'."
    }
    return new CharacterTrait("personal care", "physical", true, true, personalCareLevel, true, false, true, false)
}
